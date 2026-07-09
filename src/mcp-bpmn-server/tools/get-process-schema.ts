import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
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
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const elements = bpmnXmlService.extractElements(state.parsed);
    const connections = bpmnXmlService.extractConnections(state.parsed);

    // ====================================================================
    // КЕЙС 1: КОМПАКТНЫЙ РЕЖИМ (SUMMARY)
    // ====================================================================
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

    // ====================================================================
    // КЕЙС 2: ПОЛНЫЙ РЕЖИМ (С ОБОГАЩЕНИЕМ LOW-CODE МЕТАДАННЫМИ)
    // ====================================================================
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

    // Метаданные для аналитики ИИ
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
      description: `Возвращает полную структуру текущей BPMN схемы и её Low-Code метаданных.
    Обязательно вызывайте этот инструмент ПЕРЕД началом проектирования или внесением любых изменений, чтобы увидеть текущий граф элементов и связей.
    Используйте параметр summary: true для быстрого и компактного чтения топологии схемы (экономит контекст).
    Полный режим (summary: false) возвращает детальные свойства каждого узла, включая исполнителей (assignee) задач и Low-Code конфигурации шлюзов.`,
      inputSchema: GetProcessSchemaSchema,
    },
    handleGetProcessSchema,
  ),
];
