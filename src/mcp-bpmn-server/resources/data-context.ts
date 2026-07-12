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

        МАППИНГ ПОЛЕЙ → ИНСТРУМЕНТЫ:

        ## userGroups (группы пользователей) — [{ uid, name, displayName }]
        - bpmn_add_user_task → assignee.type='group', value=group.name

        ## users (пользователи) — [{ uid, name, displayName }]
        - bpmn_add_user_task → assignee.type='user', value=user.name
        - bpmn_add_send_task → recipients: user.name (обернётся в userOf(name))

        ## postTemplates (шаблоны писем) — [{ id, name, displayName, subjectTemplate }]
        - bpmn_add_send_task → template: postTemplate.id (UUID, извлекается из строки)

        ## bpmnMessages (сообщения) — [{ id, name, displayName, status, properties: { dataJson } }]
        - bpmn_set_message_event → messageId, eventName (произвольные, сохраняются в decor)

        ## rdmStructures (справочники) — { [referenceDataTypeId]: { rdmObjects: [{ id, label, value, isDefault }] } }
        - bpmn_set_rdm_or_number_structure → typeProperty='rdmStructure', propertyValue=key SELECT-поля из dataTypeProperties.singleSelect
        - bpmn_set_condition_expression → value=rdmObject.value для RDM-ветвления

        ## dataTypeProperties (переменные процесса)
        ### realNumber — { [id]: { key, displayName, jsonSchema, sourceRdmStructure } }
        - bpmn_set_rdm_or_number_structure → typeProperty='realNumber', propertyValue=field.key
        - bpmn_set_condition_expression → value=число, operator=">","<","==" и т.д.

        ### singleSelect — { [id]: { key, displayName, sourceRdmStructure } }
        - bpmn_set_rdm_or_number_structure → typeProperty='rdmStructure', propertyValue=field.key (если sourceRdmStructure задан)

        ### genericProperties — { [typeEnum]: Array<{ key, displayName, propertyTypeEnum }> }
        - USER → bpmn_add_user_task: assignee.type='variable', value=field.key
        - USER / SELECTION → bpmn_add_send_task: recipients: field.key (USER→valueOf(key), SELECTION→selectOf(key))
        - любые типы → bpmn_add_script_task: rawRequire/rawProduce = field.key

        ## views (формы) — [{ id, name, displayName, viewType: { viewTypeEnum, displayName }, status }]
        - bpmn_add_user_task → navigateView, editView: view.id или view.name

        ПРАВИЛО: этот контекст статичен и меняется только при выходе из редактора процесса.
        Не читай его перед каждым вызовом — достаточно прочитать один раз в начале работы.`,
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

        const result = {
          dataTypeId,
          processName: state.data.name,
          processDisplayName: state.data.displayName,
          dataTypeProperties: state.data.dataTypeProperties,
          rdmStructures: state.data.rdmStructures,
          postTemplates: state.data.postTemplates,
          userGroups: state.data.userGroups,
          users: state.data.users,
          bpmnMessages: state.data.bpmnMessages,
          views: state.data.views,
          summary: {
            totalProperties: countProperties(state.data.dataTypeProperties),
            rdmStructuresCount: Object.keys(state.data.rdmStructures).length,
            postTemplatesCount: state.data.postTemplates.length,
            bpmnMessagesCount: state.data.bpmnMessages.length,
            userGroupsCount: state.data.userGroups.length,
            viewsCount: state.data.views.length,
            users: state.data.users.length,
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
