import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { getProcessSnapshot } from '../services/process-snapshot.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';

export const GetProcessSchemaSchema = z.object({
  dataTypeId: z
    .string()
    .describe('ID BPMN типа данных (dataTypeId) процесса для чтения схемы'),
  summary: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      'Компактный режим: возвращает только плоский список элементов (id, type, name) и связей без глубоких Low-Code метаданных. Идеально для экономии контекста.',
    ),
});

export async function handleGetProcessSchema(
  args: z.infer<typeof GetProcessSchemaSchema>,
) {
  try {
    const { state, elements, connections } = await getProcessSnapshot(args.dataTypeId);

    if (args.summary) {
      const summaryElements = elements.map((el) => ({
        id: el.id,
        type: el.type,
        name: state.model[el.id]?.name || el.name || null,
      }));

      return successResponse({
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
      });
    }

    const enrichedElements = elements.map((el) => {
      const modelProps = state.model[el.id] || {};
      return {
        id: el.id,
        type: el.type,
        name: modelProps.name || el.name || null,
        customElementType: modelProps.elementType || null,
        bpmnProperties: el.properties || {},
        customProperties: modelProps,
        incoming: el.incoming || [],
        outgoing: el.outgoing || [],
      };
    });

    const hasDecisions = enrichedElements.some(
      (el) => el.customProperties?.decisionsEnabled,
    );
    const hasCustomStructures = enrichedElements.some(
      (el) => el.customProperties?.DataTypeProperty,
    );
    const hasServiceTasks = enrichedElements.some(
      (el) =>
        el.type === 'bpmn:ServiceTask' &&
        el.customProperties?.topic === 'BM Service Task',
    );

    return successResponse({
      dataTypeId: args.dataTypeId,
      processName: state.data.name,
      processDisplayName: state.data.displayName,
      elements: enrichedElements,
      connections: connections,
      metadata: {
        totalElements: enrichedElements.length,
        totalConnections: connections.length,
        hasDecisions,
        hasCustomStructures,
        hasServiceTasks,
        hasBpmnMessages: (state.data.bpmnMessages || []).length > 0,
        postTemplatesCount: (state.data.postTemplates || []).length,
      },
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка при получении схемы процесса',
    );
  }
}

export const getProcessSchemaTools = [
  defineTool(
    'bpmn_get_process_schema',
    {
      title: 'Get Process Schema',
      description: `Возвращает полную структуру BPMN схемы с Low-Code метаданными.
    summary: true — плоский список элементов (id, type, name) и связей, экономия контекста.
    summary: false — детальные свойства каждого узла (bpmnProperties, customProperties, assignee, конфигурации шлюзов).
    Доступные данные из контекста (bpmn://process/{dataTypeId}/state): элементы, связи, модель, ошибки валидации.`,
      inputSchema: GetProcessSchemaSchema,
    },
    handleGetProcessSchema,
  ),
];
