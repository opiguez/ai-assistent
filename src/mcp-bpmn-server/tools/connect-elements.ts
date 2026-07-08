import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';

const ConnectElementsSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  sourceId: z.string().describe('ID исходного элемента'),
  targetId: z.string().describe('ID целевого элемента'),
  conditionExpression: z
    .string()
    .optional()
    .describe(
      'Условие для ветвления. Формат: ${gatewayId==numericId} (напр. ${Gateway_1==2}). Используй ${GatewayId==1} для "Подтвердить" и ${GatewayId==2} для "Отклонить"',
    ),
  conditionName: z
    .string()
    .optional()
    .describe(
      'Отображаемое имя условия (лейбл на стрелке, напр. "Подтвердить" или "Отклонить")',
    ),
});

async function handleConnectElements(args: {
  dataTypeId: string;
  sourceId: string;
  targetId: string;
  conditionExpression?: string;
  conditionName?: string;
}) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const source = bpmnXmlService.getElementById(state.parsed, args.sourceId);
    const target = bpmnXmlService.getElementById(state.parsed, args.targetId);

    if (!source) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Исходный элемент "${args.sourceId}" не найден`,
            }),
          },
        ],
      };
    }

    if (!target) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Целевой элемент "${args.targetId}" не найден`,
            }),
          },
        ],
      };
    }

    // --- НАЧАЛО БЛОКА ВАЛИДАЦИИ DECISIONS И ШЛЮЗОВ ---
    const sourceModel = state.model[args.sourceId] || {};
    const isDecisionsEnabled = !!sourceModel.decisionsEnabled;
    let updatedDecisionsUnused: string[] = [];

    if (isDecisionsEnabled) {
      // КРИТИЧЕСКАЯ ПРОВЕРКА: Целевой элемент обязан быть шлюзом
      const isGateway = target.$type && target.$type.includes('Gateway');
      if (!isGateway) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                status: 'error',
                message: `Невозможно соединить элемент напрямую. Для "${args.sourceId}" включен режим Decisions, поэтому его можно связать ТОЛЬКО со шлюзом (например, bpmn:ExclusiveGateway). Текущий целевой элемент имеет тип "${target.$type}".`,
              }),
            },
          ],
        };
      }

      const currentUnused = sourceModel.decisionsUnused || [];

      // 1. Проверяем, передан ли conditionName
      if (!args.conditionName) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                status: 'error',
                message: `Для элемента "${args.sourceId}" включен режим Decisions. Передайте "conditionName" (одно из доступных решений: ${JSON.stringify(currentUnused)}).`,
              }),
            },
          ],
        };
      }

      // 2. Проверяем, доступно ли еще это решение в массиве unused
      if (!currentUnused.includes(args.conditionName)) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                status: 'error',
                message: `Решение "${args.conditionName}" не найдено в списке доступных или уже было использовано. Доступные варианты: ${JSON.stringify(currentUnused)}.`,
              }),
            },
          ],
        };
      }

      // 3. Вычисляем новый массив неиспользованных решений (удаляем текущее)
      updatedDecisionsUnused = currentUnused.filter(
        (d: string) => d !== args.conditionName,
      );
    }
    // --- КОНЕЦ БЛОКА ВАЛИДАЦИИ DECISIONS И ШЛЮЗОВ ---

    // Создаем связь в XML
    const result = bpmnXmlService.addSequenceFlow(
      state.parsed,
      args.sourceId,
      args.targetId,
      args.conditionExpression,
    );

    if (!result) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: 'Не удалось создать связь между элементами',
            }),
          },
        ],
      };
    }

    const targetModel = state.model[args.targetId] || {};
    const sourceBounds = sourceModel.bpmndi?.bounds;
    const targetBounds = targetModel.bpmndi?.bounds;

    let waypoints = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
    ];
    if (sourceBounds && targetBounds) {
      const sx = sourceBounds.x + (sourceBounds.width || 100);
      const sy = sourceBounds.y + (sourceBounds.height || 80) / 2;
      const tx = targetBounds.x;
      const ty = targetBounds.y + (targetBounds.height || 80) / 2;
      waypoints = [
        { x: sx, y: sy },
        { x: tx, y: ty },
      ];
    }

    bpmnXmlService.addEdgeToDiagram(state.parsed, result.flowId, waypoints);

    // Клонируем и обновляем кастомную модель процессов
    const newModel = { ...state.model };

    // Создаем запись для нового SequenceFlow
    newModel[result.flowId] = {
      bpmndi: { waypoint: waypoints },
      require: [],
      produce: [],
    };

    if (args.conditionName) {
      newModel[result.flowId].name = args.conditionName;
    }

    // Обновляем исходный элемент
    if (newModel[args.sourceId]) {
      newModel[args.sourceId] = {
        ...newModel[args.sourceId],
        outgoing: result.flowId, // Так как связь идет только к одному шлюзу, строка здесь идеальна
      };

      // Если решения были включены, сохраняем обновленный отфильтрованный массив
      if (isDecisionsEnabled) {
        newModel[args.sourceId].decisionsUnused = updatedDecisionsUnused;
      }
    }

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);

    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: saveResult.error || 'Ошибка сохранения',
            }),
          },
        ],
      };
    }

    // Формируем финальное сообщение о статусе решений
    let decisionStatusMessage = '';
    if (isDecisionsEnabled) {
      decisionStatusMessage =
        updatedDecisionsUnused.length === 0
          ? ' Все решения этой задачи успешно распределены по веткам шлюза.'
          : ` Связь со шлюзом создана. Остались нераспределенные решения: ${JSON.stringify(updatedDecisionsUnused)}. Направьте их в этот же шлюз (или другие шлюзы, если применимо).`;
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'success',
            flowId: result.flowId,
            source: args.sourceId,
            target: args.targetId,
            conditionExpression: args.conditionExpression || null,
            decisionsUnused: isDecisionsEnabled
              ? updatedDecisionsUnused
              : undefined,
            message: `SequenceFlow создан: ${args.sourceId} → ${args.targetId}.${decisionStatusMessage}`,
          }),
        },
      ],
    };
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: e?.message || 'Ошибка создания связи',
          }),
        },
      ],
    };
  }
}

export const connectElementsTools = [
  defineTool(
    'bpmn_connect_elements',
    {
      title: 'Connect BPMN Elements',
      description:
        'Создаёт SequenceFlow между двумя BPMN элементами. Для условий используй формат ${gatewayId==numericId} (напр. ${Gateway_1==2}). Для лейблов на стрелках используй conditionName.',
      inputSchema: ConnectElementsSchema,
    },
    handleConnectElements,
  ),
];
