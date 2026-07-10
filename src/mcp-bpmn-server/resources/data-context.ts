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
      mimeType: 'application/json',
      description: `DATA-контекст процесса (переменные, справочники, пользователи, группы, шаблоны). 
        СТРОГИЕ ПРАВИЛА НАСТРОЙКИ ЭЛЕМЕНТОВ ДЛЯ ИИ:
        1. UserTask (Пользовательские задачи): Использовать массивы 'userGroups'(группы), переменные(dataTypeProperties.genericProperties). Можно назначить конкретную view'.
        2. ServiceTask (Системные задачи / API): Настраивать привязки и маппинг параметров исключительно через переменные из 'dataTypeProperties'.
        3. Gateway (Исключающий/Параллельный шлюз): Для ветвления по справочникам использовать 'rdmStructures'. Для числовых условий использовать 'dataTypeProperties.realNumber'
        4. SendTask (Отправка уведомлений): Использовать списки 'postTemplates' (шаблоны писем), 'users' (адресаты) и.
        Перед настройкой любого элемента ты ОБЯЗАН прочитать этот контекст, чтобы не выдумать несуществующие ID ролей или переменных.`,
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

        const [stateResult, groupsResult, usersResult] =
          await Promise.allSettled([
            bpmnSchemaService.loadAndParseProcess(dataTypeId),
            bpmnSchemaService.loadUserGroups(),
            bpmnSchemaService.loadUsers(),
          ]);

        if (stateResult.status === 'rejected') {
          throw new Error(
            `Критическая ошибка загрузки схемы процесса: ${stateResult.reason?.message || stateResult.reason}`,
          );
        }
        const state = stateResult.value;

        const userGroups =
          groupsResult.status === 'fulfilled' ? groupsResult.value || [] : [];
        const users =
          usersResult.status === 'fulfilled' ? usersResult.value || [] : [];

        if (groupsResult.status === 'rejected') {
          console.error(
            '[MCP Resource] Не удалось загрузить группы пользователей:',
            groupsResult.reason,
          );
        }
        if (usersResult.status === 'rejected') {
          console.error(
            '[MCP Resource] Не удалось загрузить список пользователей:',
            usersResult.reason,
          );
        }

        const result = {
          dataTypeId,
          processName: state.data.name,
          processDisplayName: state.data.displayName,
          dataTypeProperties: state.data.dataTypeProperties,
          rdmStructures: state.data.rdmStructures,
          postTemplates: state.data.postTemplates,
          userGroups,
          users,
          bpmnMessages: state.data.bpmnMessages,
          views: state.data.views,
          summary: {
            totalProperties: countProperties(state.data.dataTypeProperties),
            rdmStructuresCount: Object.keys(state.data.rdmStructures).length,
            postTemplatesCount: state.data.postTemplates.length,
            bpmnMessagesCount: state.data.bpmnMessages.length,
            userGroupsCount: userGroups.length,
            viewsCount: state.data.views.length,
            users: users.length,
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
