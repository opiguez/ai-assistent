/**
 * BPMN Rules Catalog Resource
 * URI: bpmn://catalog/rules
 * Статический справочник правил валидации и типовых конфигураций.
 */
import { McpServer } from '@modelcontextprotocol/server';
import {
  BPMN_RULES,
  STRUCTURAL_RULES,
  ELEMENT_CONFIGURATIONS,
} from '../knowledge/custom-rules.js';

const resources = [
  {
    name: 'rules-catalog' as const,
    uri: 'bpmn://catalog/rules' as const,
    config: {
      title: 'BPMN Rules Catalog',
      description:
        'Правила валидации BPMN: что нельзя удалять, какие связи допустимы, ограничения элементов. Типовые конфигурации: decisions, ServiceTask, RDM, SendTask, SubProcess.',
      mimeType: 'application/json',
    },
    read: async (uri: URL) => {
      try {
        const catalog = {
          rules: BPMN_RULES,
          structuralRules: STRUCTURAL_RULES,
          typicalConfigurations: ELEMENT_CONFIGURATIONS,
          summary: {
            deletionRules: [
              'bpmn:Process — никогда не удалять',
              'StartEvent/EndEvent внутри SubProcess — нельзя удалять',
            ],
            structureRules: [
              'Процесс ОБЯЗАН иметь ровно 1 StartEvent и 1 EndEvent',
              'Все элементы должны быть связаны SequenceFlow от Start до End',
              'Task (UserTask, SendTask, ScriptTask, ServiceTask) — ровно 1 incoming + 1 outgoing SequenceFlow',
              'Gateway — минимум 2 исходящих для ветвления',
            ],
            connectionRules: [
              'Task может иметь только одну исходящую non-Association связь',
              'Нельзя создавать связи из элемента с decisionsEnabled',
              'BoundaryEvent не может иметь входящих связей при создании',
            ],
            creationRules: [
              'Error Boundary Event — только на ServiceTask',
              'IntermediateThrow/CatchEvent — только на Process/SubProcess/SequenceFlow',
              'BoundaryEvent нельзя переприкрепить',
            ],
            directEditDisabled: [
              'Decision SequenceFlow',
              'SendTask',
              'Custom Structure SequenceFlow',
            ],
            commonBackendErrors: STRUCTURAL_RULES.commonBackendErrors,
          },
        };

        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify(catalog, null, 2),
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
                  error: 'Failed to build rules catalog',
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
