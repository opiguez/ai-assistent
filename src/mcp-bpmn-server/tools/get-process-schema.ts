import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';

const GetProcessSchemaSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (dataTypeId)'),
  summary: z
    .boolean()
    .optional()
    .describe('Компактный режим: только список элементов (id, type, name) без custom model и data context'),
});

async function handleGetProcessSchema(args: { dataTypeId: string; summary?: boolean }) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const elements = bpmnXmlService.extractElements(state.parsed);
    const connections = bpmnXmlService.extractConnections(state.parsed);

    // Компактный режим
    if (args.summary) {
      const summaryElements = elements.map((el) => ({
        id: el.id,
        type: el.type,
        name: state.model[el.id]?.name || el.name,
      }));

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                status: 'success',
                dataTypeId: args.dataTypeId,
                processName: state.data.name,
                elementsCount: summaryElements.length,
                connectionsCount: connections.length,
                elements: summaryElements,
                connections: connections.map((c) => ({
                  id: c.id,
                  source: c.source,
                  target: c.target,
                })),
              },
              null,
              2,
            ),
          },
        ],
      };
    }

    // Полный режим

    // Обогащаем элементы данными из custom Model
    const enrichedElements = elements.map((el) => {
      const modelProps = state.model[el.id] || {};
      return {
        id: el.id,
        type: el.type,
        name: modelProps.name || el.name,
        customType: modelProps.type,
        bpmnProperties: el.properties,
        customProperties: modelProps,
        incoming: el.incoming,
        outgoing: el.outgoing,
      };
    });

    // Метаданные
    const hasDecisions = enrichedElements.some(
      (el) => el.customProperties?.decisionsEnabled,
    );
    const hasCustomStructures = enrichedElements.some(
      (el) => el.customProperties?.DataTypeProperty,
    );
    const hasServiceTasks = enrichedElements.some(
      (el) =>
        el.type === 'bpmn:ServiceTask' &&
        el.customProperties?.type === 'BM Service Task',
    );

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              status: 'success',
              dataTypeId: args.dataTypeId,
              processName: state.data.name,
              processDisplayName: state.data.displayName,
              elements: enrichedElements,
              connections,
              metadata: {
                totalElements: enrichedElements.length,
                totalConnections: connections.length,
                hasDecisions,
                hasCustomStructures,
                hasServiceTasks,
                hasBpmnMessages: state.data.bpmnMessages.length > 0,
                postTemplatesCount: state.data.postTemplates.length,
              },
              dataContext: {
                dataTypeProperties: state.data.dataTypeProperties,
                rdmStructures: state.data.rdmStructures,
                postTemplates: state.data.postTemplates,
              },
            },
            null,
            2,
          ),
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
            message: e?.message || 'Ошибка получения схемы процесса',
          }),
        },
      ],
    };
  }
}

export const getProcessSchemaTools = [
  defineTool(
    'bpmn_get_process_schema',
    {
      title: 'Get Process Schema',
      description:
        'Возвращает полную схему BPMN процесса: элементы (Tasks, Events, Gateways), связи (SequenceFlow), кастомные свойства из Model, и метаданные. Используй для понимания текущей структуры процесса перед внесением изменений.',
      inputSchema: GetProcessSchemaSchema,
    },
    handleGetProcessSchema,
  ),
];
