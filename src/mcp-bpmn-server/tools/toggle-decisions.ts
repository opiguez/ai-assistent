import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';

const ToggleDecisionsSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementId: z.string().describe('ID UserTask'),
  enabled: z.boolean().describe('Включить или выключить decisions'),
  decisions: z
    .array(z.string())
    .optional()
    .describe(
      'Список решений (лейблов). Сохраняется в custom model для справки. Не создаёт flows — используй bpmn_connect_elements с conditionName.',
    ),
});

async function handleToggleDecisions(args: {
  dataTypeId: string;
  elementId: string;
  enabled: boolean;
  decisions?: string[];
}) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);
    const element = bpmnXmlService.getElementById(state.parsed, args.elementId);

    if (!element) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Элемент с ID "${args.elementId}" не найден`,
            }),
          },
        ],
      };
    }

    // Валидация: Механизм решений работает исключительно с UserTask
    if (element.$type !== 'bpmn:UserTask') {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Элемент "${args.elementId}" имеет тип "${element.$type}". Decisions поддерживаются только для bpmn:UserTask.`,
            }),
          },
        ],
      };
    }

    const newModel = { ...state.model };
    const userTaskId = element.id;
    const defaultDecisions = ['Подтвердить', 'Отклонить'];

    newModel[userTaskId] = {
      ...newModel[userTaskId],
      decisionsEnabled: args.enabled,
      decisionsUnused: args.enabled ? args.decisions || defaultDecisions : [],
    };

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
              message: saveResult.error || 'Ошибка сохранения изменений в БД',
            }),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'success',
            elementId: userTaskId,
            decisionsEnabled: args.enabled,
            decisions: args.enabled ? args.decisions || defaultDecisions : null,
            message: args.enabled
              ? `Decisions успешно включены для UserTask "${userTaskId}". Используй инструмент "bpmn_connect_elements" с параметром "conditionName" для создания логических ветвлений.`
              : `Decisions выключены для UserTask "${userTaskId}".`,
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
            message:
              e?.message ||
              'Внутренняя ошибка при переключении решений (decisions)',
          }),
        },
      ],
    };
  }
}

export const toggleDecisionsTools = [
  defineTool(
    'bpmn_toggle_decisions',
    {
      title: 'Toggle Decisions',
      description: `Включает или выключает decisions для UserTask. Только устанавливает флаг decisionsEnabled в custom model и 
        базовый набор decisionsUnused - когда использованы, массив пустой. Создание элементов и связей — через bpmn_add_element и bpmn_connect_elements.`,
      inputSchema: ToggleDecisionsSchema,
    },
    handleToggleDecisions,
  ),
];
