/**
 * BPMN Data Context Resource
 * URI: bpmn://process/{dataTypeId}/data-context
 * Возвращает DATA-контекст процесса: dataTypeProperties, rdmStructures,
 * postTemplates, userGroups, bpmnMessages, views.
 * Связывает BPMN слой со слоем данных.
 */
import { McpServer } from '@modelcontextprotocol/server';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';

const resources = [
  {
    name: 'data-context' as const,
    uri: 'bpmn://process/{dataTypeId}/data-context' as const,
    config: {
      title: 'BPMN Data Context',
      description:
        'DATA-контекст процесса: свойства данных (dataTypeProperties), RDM структуры (rdmStructures), шаблоны писем (postTemplates), группы пользователей, BPMN сообщения, представления. Используй для настройки UserTask (generic decisions), ServiceTask (API привязки), Gateway (rdmStructure (ветвление по справочнику)/realNumber (числовое условие)), SendTask (шаблоны писем).',
      mimeType: 'application/json',
    },
    read: async (uri: URL) => {
      try {
        const parts = uri.pathname.split('/');
        const dataTypeId = parts[2]; // process/{id}/data-context → index 2

        if (!dataTypeId) {
          return {
            contents: [
              {
                uri: uri.href,
                text: JSON.stringify(
                  {
                    error:
                      'dataTypeId is required in URI: bpmn://process/{dataTypeId}/data-context',
                  },
                  null,
                  2,
                ),
              },
            ],
          };
        }

        const state = await bpmnSchemaService.loadAndParseProcess(dataTypeId);
        const userGroups = await bpmnSchemaService.loadUserGroups();

        const result = {
          dataTypeId,
          processName: state.data.name,
          processDisplayName: state.data.displayName,
          dataTypeProperties: state.data.dataTypeProperties,
          rdmStructures: state.data.rdmStructures,
          postTemplates: state.data.postTemplates,
          userGroups,
          bpmnMessages: state.data.bpmnMessages,
          views: state.data.views,
          summary: {
            totalProperties: countProperties(state.data.dataTypeProperties),
            rdmStructuresCount: Object.keys(state.data.rdmStructures).length,
            postTemplatesCount: state.data.postTemplates.length,
            bpmnMessagesCount: state.data.bpmnMessages.length,
            userGroupsCount: userGroups.length,
            viewsCount: state.data.views.length,
          },
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
                  error: 'Failed to fetch BPMN data context',
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

function countProperties(
  dataTypeProperties: Record<string, Record<string, any>> | undefined,
) {
  if (!dataTypeProperties) return 0;
  let count = 0;
  for (const category of Object.values(dataTypeProperties)) {
    if (Array.isArray(category)) {
      count += category.length;
    } else if (typeof category === 'object') {
      count += Object.keys(category).length;
    }
  }
  return count;
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
