import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService, ModdleElement } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';

export const SetConditionExpressionSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (модуля/процесса)'),
  connectionId: z
    .string()
    .describe('ID линии SequenceFlow, на которую ставится условие'),
  value: z
    .string()
    .describe(
      'Значение условия. ' +
        '1. Для шлюза решений (UserTask) — порядковый номер кнопки строками "1", "2" и т.д. в соответствии с массивом decisions исходной задачи. ' +
        '2. Для RDM-справочников (rdmStructure) — значение конкретной записи из справочника (напр., "1"). ' +
        '3. Для числовых шлюзов (realNumber) — число для сравнения (напр., "500000"). Знак сравнения передаётся отдельно в operator.',
    ),
  operator: z
    .enum(['==', '>', '<', '>=', '<=', '!='])
    .optional()
    .default('==')
    .describe(
      'Оператор сравнения. Используется ТОЛЬКО для числовых шлюзов (realNumber). Для RDM-справочников (rdmStructure) всегда передавайте "==".',
    ),
});

export async function handleSetConditionExpression(
  args: z.infer<typeof SetConditionExpressionSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const flowElement = bpmnXmlService.getElementById(
      state.parsed,
      args.connectionId,
    ) as ModdleElement | null;
    if (!flowElement || flowElement.$type !== 'bpmn:SequenceFlow') {
      return errorResponse(
        `SequenceFlow с ID "${args.connectionId}" не найден в XML`,
      );
    }

    const flowDecor = state.model[args.connectionId];
    if (!flowDecor) {
      return errorResponse(
        `Запись стрелки "${args.connectionId}" не найдена в JSON-decor.`,
      );
    }

    const sourceId = flowDecor.sourceRef;
    const sourceNode = state.model[sourceId];
    if (!sourceNode) {
      return errorResponse(
        `Исходный узел "${sourceId}" для стрелки не найден в модели.`,
      );
    }

    // ====================================================================
    // АВТОГЕНЕРАЦИЯ СТРОКИ ВЫРАЖЕНИЯ НА ОСНОВЕ ПРАВИЛ ПЛАТФОРМЫ
    // ====================================================================
    let expressionText = '';
    let isJavaScript = false;

    // Проверяем, что стрелка действительно выходит из шлюза
    if (
      sourceNode.elementType === 'bpmn:ExclusiveGateway' ||
      sourceNode.elementType === 'bpmn:InclusiveGateway'
    ) {
      const propType = sourceNode.DataTypeProperty; // 'rdmStructure', 'realNumber' или undefined

      if (!propType) {
        // КЕЙС 1: Шлюз решений UserTask
        const incomingToGateway = Object.entries(state.model).find(
          ([_, entry]: [string, any]) => {
            return (
              entry.elementType === 'bpmn:SequenceFlow' &&
              entry.targetRef === sourceId
            );
          },
        );

        let userTaskWithDecisions: any = null;
        let parentUserTaskId: string | null = null;

        if (incomingToGateway) {
          const [_, parentFlow]: [string, any] = incomingToGateway;
          const potentialUserTask = state.model[parentFlow.sourceRef];

          if (
            potentialUserTask &&
            potentialUserTask.elementType === 'bpmn:UserTask' &&
            potentialUserTask.decisionsEnabled
          ) {
            userTaskWithDecisions = potentialUserTask;
            parentUserTaskId = parentFlow.sourceRef;
          }
        }

        if (!userTaskWithDecisions) {
          return errorResponse(
            `Шлюз "${sourceId}" еще не сконфигурирован. Сначала вызовите инструмент "bpmn_set_rdm_or_number_structure", чтобы задать тип условий (RDM или Number), либо убедитесь, что перед шлюзом стоит UserTask с активированными решениями (decisionsEnabled: true).`,
          );
        }

        // Получаем массив ID всех стрелок, выходящих из текущего шлюза
        const gatewayOutgoingFlowIds: string[] = Array.isArray(
          sourceNode.outgoing,
        )
          ? sourceNode.outgoing
          : sourceNode.outgoing
            ? [sourceNode.outgoing]
            : [];

        // Собираем их человеческие имена из модели decor в порядке их создания
        const allGatewayButtons = gatewayOutgoingFlowIds
          .map((flowId) => state.model[flowId]?.name)
          .filter(Boolean);

        const currentFlowName = flowDecor.name;

        // Ищем индекс кнопки среди ВСЕХ созданных веток этого шлюза
        let buttonIndex = args.value; // Оставляем фолбэк на значение от ИИ
        const foundIdx = allGatewayButtons.indexOf(currentFlowName);

        if (foundIdx !== -1) {
          buttonIndex = String(foundIdx + 1); // Нумерация строго по порядку: 1, 2, 3...
        } else {
          // Если по какой-то причине имя стрелки не совпало
          return errorResponse(
            `Ветка шлюза с названием "${currentFlowName}" не найдена среди выходящих линий шлюза "${sourceId}". Убедитесь, что вы правильно соединили элементы.`,
          );
        }
        isJavaScript = false;
        expressionText = `\${${sourceId}==${buttonIndex}}`;
      } else if (propType === 'rdmStructure') {
        // КЕЙС 2: RDM Справочник -> JUEL: ${test_test1_select=='1'}
        const rawVariable = sourceNode.DataTypePropertyValue || 'variable';
        const cleanVariable = rawVariable.replace(/[:\-]/g, '_');
        expressionText = `\${${cleanVariable}=='${args.value}'}`;
      } else if (propType === 'realNumber') {
        // КЕЙС 3: Числовой шлюз -> JS: test_test1_number.prop("value").numberValue()>5
        const rawVariable = sourceNode.DataTypePropertyValue || 'variable';
        const cleanVariable = rawVariable.replace(/[:\-]/g, '_');
        isJavaScript = true;
        expressionText = `${cleanVariable}.prop("value").numberValue()${args.operator}${args.value}`;
      }
    }

    if (!expressionText) {
      return errorResponse(
        `Не удалось определить контекст шлюза "${sourceId}" для генерации условия.`,
      );
    }

    const successXmlUpdate = bpmnXmlService.setFlowCondition(
      state.parsed,
      args.connectionId,
      expressionText,
      isJavaScript ? 'javascript' : undefined,
    );

    if (!successXmlUpdate) {
      return errorResponse('Не удалось вшить conditionExpression в объект XML');
    }

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(state.model),
    });

    if (!saveResult.success) {
      return errorResponse(
        saveResult.error || 'Ошибка сохранения изменений в базе',
      );
    }

    return successResponse({
      connectionId: args.connectionId,
      generatedExpression: expressionText,
      message: `На стрелку "${args.connectionId}" успешно установлено техническое условие: "${expressionText}"`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка установки выражения на SequenceFlow',
    );
  }
}

export const setConditionExpressionTools = [
  defineTool(
    'bpmn_set_condition_expression',
    {
      title: 'Set Condition Expression',
      description: `Устанавливает условное выражение (conditionExpression) для SequenceFlow. Используется для ExclusiveGateway и decisions.
Для шлюзов решений (UserTask Decisions): value=порядковый номер кнопки (строка "1", "2" и т.д.), operator не используется.
Для RDM-шлюзов (rdmStructure): value=значение записи из справочника, operator="==" (по умолчанию).
Для числовых шлюзов (realNumber): value=число (строка, напр. "500000"), operator=">", "<", ">=", "<=", "==", "!=".
Доступные данные из контекста (bpmn://process/{dataTypeId}/data-context):
  - rdmStructures[i].rdmObjects → value (RDM condition), label (имя ветки)
  - dataTypeProperties.realNumber → key (для числовых условий)`,
      inputSchema: SetConditionExpressionSchema,
    },
    handleSetConditionExpression,
  ),
];
