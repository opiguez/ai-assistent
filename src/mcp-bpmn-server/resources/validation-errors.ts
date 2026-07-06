/**
 * BPMN Validation Errors Catalog Resource
 * URI: bpmn://catalog/validation-errors
 * Возвращает полный каталог ошибок валидации с сообщениями и действиями по исправлению.
 */
import { McpServer } from '@modelcontextprotocol/server';
import { VALIDATION_ERROR_CATALOG } from '../knowledge/validation-error-catalog.js';

const resources = [
  {
    name: 'validation-errors' as const,
    uri: 'bpmn://catalog/validation-errors' as const,
    config: {
      title: 'Validation Error Catalog',
      description:
        'Каталог ошибок валидации BPMN процесса. Содержит сообщения (ru/en), действия по исправлению, рекомендуемые инструменты, severity и категорию для каждой ошибки.',
      mimeType: 'application/json',
    },
    read: async (uri: URL) => {
      try {
        const catalog = Object.entries(VALIDATION_ERROR_CATALOG).map(
          ([code, entry]) => ({
            code,
            message: entry.message,
            fix: entry.fix,
            tool: entry.tool || null,
            severity: entry.severity,
            category: entry.category,
          }),
        );

        const result = {
          totalErrors: catalog.length,
          byCategory: {
            structure: catalog.filter((e) => e.category === 'structure').length,
            element: catalog.filter((e) => e.category === 'element').length,
            decision: catalog.filter((e) => e.category === 'decision').length,
            data: catalog.filter((e) => e.category === 'data').length,
            expression: catalog.filter((e) => e.category === 'expression').length,
            workflow: catalog.filter((e) => e.category === 'workflow').length,
          },
          errors: catalog,
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
                  error: 'Failed to load validation error catalog',
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
