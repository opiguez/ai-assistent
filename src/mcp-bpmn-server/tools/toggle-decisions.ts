import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService, ModdleElement } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';
import { checkConstraint } from '../services/constraint-utils.js';

export const ToggleDecisionsSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (модуля/процесса)'),
  elementId: z.string().describe('ID элемента bpmn:UserTask на схеме'),
  enabled: z
    .boolean()
    .describe(
      'Флаг переключения: true — активировать режим решений, false — деактивировать',
    ),
  decisions: z
    .array(z.string())
    .optional()
    .describe(
      'Список текстовых названий кнопок (лейблов) (по умолчанию - ["Одобрить", "Отклонить"] - можно использовать, если подходят по смыслу и не передавать). Сохраняется в custom model для автоматического расчета индексов ветвления.',
    ),
});

export async function handleToggleDecisions(
  args: z.infer<typeof ToggleDecisionsSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const element = bpmnXmlService.getElementById(
      state.parsed,
      args.elementId,
    ) as ModdleElement | null;
    if (!element) {
      return errorResponse(
        `Элемент с ID "${args.elementId}" не найден в BPMN XML`,
      );
    }

    if (element.$type !== 'bpmn:UserTask') {
      return errorResponse(
        `Элемент "${args.elementId}" имеет тип "${element.$type}". Decisions поддерживаются исключительно для bpmn:UserTask.`,
      );
    }

    const newModel = { ...state.model };
    const userTaskId = element.id;
    const modelProps = newModel[userTaskId] || {};

    if (args.enabled) {
      const constraint = checkConstraint(
        'addDecision',
        element,
        modelProps,
        state,
      );
      if (!constraint.allowed) {
        return errorResponse(
          `Включение Decisions запрещено валидатором: ${constraint.reason}`,
        );
      }
    }

    const defaultDecisions = ['Подтвердить', 'Отклонить'];
    const finalDecisions = args.decisions || defaultDecisions;

    newModel[userTaskId] = {
      ...modelProps,
      decisionsEnabled: args.enabled,
      decisionsUnused: args.enabled ? finalDecisions : [],
    };

    // Генерируем XML и сохраняем процесс в базу данных
    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return errorResponse(
        saveResult.error ||
          'Ошибка при сохранении изменений UserTask в базу данных',
      );
    }

    return successResponse({
      elementId: userTaskId,
      decisionsEnabled: args.enabled,
      decisionsUnused: args.enabled ? finalDecisions : null,
      message: args.enabled
        ? `Режим Decisions успешно активирован для UserTask "${userTaskId}". Задано кнопок: ${JSON.stringify(finalDecisions)}. Далее (строгая последовательность):
1. Создай ExclusiveGateway через bpmn_add_exclusive_gateway
2. Соедини UserTask → Gateway: bpmn_connect_elements(sourceId="${userTaskId}", targetId=<Gateway_ID>)
3. Для КАЖДОЙ кнопки соедини Gateway → целевую задачу: bpmn_connect_elements(sourceId=<Gateway_ID>, targetId=<Task_ID>, conditionName="<имя кнопки>")
4. ВАЖНО: для КАЖДОЙ ветки вызови bpmn_set_condition_expression(connectionId=<Flow_ID>, value="<номер кнопки: 1, 2, ...>") — это установит техническое XML-выражение`
        : `Режим Decisions успешно отключен для UserTask "${userTaskId}". Списки решений очищены.`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка при переключении решений (decisions)',
    );
  }
}

export const toggleDecisionsTools = [
  defineTool(
    'bpmn_toggle_decisions',
    {
      title: 'Toggle Decisions',
      description: `Включает или выключает decisions для UserTask. Только устанавливает флаг decisionsEnabled в custom model и 
        базовый набор decisionsUnused - когда использованы, массив пустой. Создание элементов и связей — через bpmn_add_element и bpmn_connect_elements.
Данные из контекста не требуются — decisions — это просто флаги/кнопки, не связанные с переменными.`,
      inputSchema: ToggleDecisionsSchema,
    },
    handleToggleDecisions,
  ),
];
