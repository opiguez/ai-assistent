import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';

const ToggleDecisionsSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementId: z.string().describe('ID UserTask'),
  enabled: z.boolean().describe('Включить или выключить decisions'),
});

async function handleToggleDecisions(args: {
  dataTypeId: string;
  elementId: string;
  enabled: boolean;
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

    if (element.$type !== 'bpmn:UserTask') {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Decisions можно настроить только на UserTask (тип: ${element.$type})`,
            }),
          },
        ],
      };
    }

    const newModel = { ...state.model };
    newModel[args.elementId] = {
      ...newModel[args.elementId],
      decisionsEnabled: args.enabled,
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
              message: saveResult.error || 'Ошибка сохранения',
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
            elementId: args.elementId,
            decisionsEnabled: args.enabled,
            message: args.enabled
              ? `Decisions включены для UserTask "${args.elementId}". Теперь добавьте Decision SequenceFlows и настройте условия.`
              : `Decisions выключены для UserTask "${args.elementId}". Связанные Decision SequenceFlows удалены.`,
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
            message: e?.message || 'Ошибка переключения decisions',
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
      description:
        'Включает или выключает decisions для UserTask. При включении — Decision SequenceFlows могут быть привязаны к Decision элементам. При выключении — Decision SequenceFlows удаляются.',
      inputSchema: ToggleDecisionsSchema,
    },
    handleToggleDecisions,
  ),
];
