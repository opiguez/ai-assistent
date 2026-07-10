/**
 * BPMN Process State Resource
 * URI: bpmn://process/{dataTypeId}/state
 * Возвращает текущее состояние BPMN процесса: элементы, связи, custom model.
 */
import { McpServer } from '@modelcontextprotocol/server';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';

const resources = [
  {
    name: 'process-state' as const,
    uri: 'bpmn://process/{dataTypeId}/state' as const,
    config: {
      title: 'BPMN Process State',
      description:
        'Текущее состояние BPMN процесса: элементы (Tasks, Events, Gateways), связи (SequenceFlow), custom model, статус валидации.',
      mimeType: 'application/json',
    },
    read: async (uri: URL) => {
      try {
        // Извлекаем dataTypeId из URI: bpmn://process/{dataTypeId}/state
        const parts = uri.pathname.split('/');
        const dataTypeId = parts[2]; // process/{id}/state → index 2

        if (!dataTypeId) {
          return {
            contents: [
              {
                uri: uri.href,
                text: JSON.stringify(
                  {
                    error:
                      'dataTypeId is required in URI: bpmn://process/{dataTypeId}/state',
                  },
                  null,
                  2,
                ),
              },
            ],
          };
        }

        const state = await bpmnSchemaService.loadAndParseProcess(dataTypeId);
        const elements = bpmnXmlService.extractElements(state.parsed);
        const connections = bpmnXmlService.extractConnections(state.parsed);

        const processElement = state.parsed.rootElement;
        const processId = processElement?.id || null;

        let valid = false;
        let validationErrors: string[] = [];
        try {
          valid = await bpmnSchemaService.isProcessValid(
            dataTypeId,
            state.data.bpmnXml,
            JSON.stringify(state.model),
          );
        } catch {
          valid = false;
        }

        const result = {
          dataTypeId,
          name: state.data.name,
          displayName: state.data.displayName,
          processId,
          valid,
          validationErrors,
          elementsCount: elements.length,
          connectionsCount: connections.length,
          elements,
          connections,
          model: state.model,
          bpmnMessages: state.data.bpmnMessages,
          postTemplates: state.data.postTemplates,
        };

        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (e) {
        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify(
                {
                  error: 'Failed to fetch BPMN process state',
                  details: (e as Error).message,
                },
                null,
                2,
              ),
            },
          ],
        };
      }
    },
  },
];

export default function registerResources(server: McpServer) {
  resources.forEach((resource) => {
    server.registerResource(
      resource.name,
      resource.uri,
      resource.config,
      resource.read,
    );
  });
}
