import { McpServer } from '@modelcontextprotocol/server';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { getProcessSnapshot } from '../services/process-snapshot.service.js';

const resources = [
  {
    name: 'process-state' as const,
    uri: 'bpmn://process{dataTypeId}/state' as const,
    config: {
      title: 'BPMN Process State',
      description:
        'Текущее состояние BPMN процесса: элементы (Tasks, Events, Gateways), связи (SequenceFlow), custom model, статус валидации.',
      mimeType: 'application/json',
    },
    read: async (uri: URL) => {
      try {
        const parts = uri.pathname.split('/');
        const dataTypeId = parts[2];

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

        const { state, elements, connections } =
          await getProcessSnapshot(dataTypeId);

        let valid = false;

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
          valid,
          validationErrors: extractValidationErrors(
            state.data.validationResults,
          ),
          elementsCount: elements.length,
          connectionsCount: connections.length,
          elements,
          connections,
          model: state.model,
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

interface ValidationError {
  elementType: string;
  elementId: string;
  message: string;
  invalidElement: string;
}

function extractValidationErrors(data: Record<string, any> | null) {
  if (!data) return [];
  const errors: Array<ValidationError> = [];

  function traverse(node: Record<string, any>) {
    if (Array.isArray(node)) {
      for (const item of node) {
        traverse(item);
      }
      return;
    }

    if (typeof node === 'object' && node !== null) {
      if (
        Array.isArray(node.validationResults) &&
        node.validationResults.length > 0
      ) {
        const elementType = node['@type'] || 'unknown_type';
        const elementId = node.id || 'unknown_id';

        for (const res of node.validationResults) {
          if (res && res.message) {
            errors.push({
              elementType: elementType,
              elementId: elementId,
              message: res.message,
              invalidElement:
                res.element || (res.messageParams ? res.messageParams[0] : ''),
            });
          }
        }
      }

      for (const key in node) {
        if (Object.prototype.hasOwnProperty.call(node, key)) {
          traverse(node[key]);
        }
      }
    }
  }

  traverse(data);
  return errors;
}

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
