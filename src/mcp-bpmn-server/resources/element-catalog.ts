/**
 * BPMN Element Catalog Resource
 * URI: bpmn://catalog/elements
 * Статический справочник всех элементов BPMN палитры с описаниями.
 */
import { McpServer } from '@modelcontextprotocol/server';
import {
  PALETTE_ELEMENTS,
  CUSTOM_MODEL_PROPERTIES,
  COMMAND_HANDLERS,
} from '../knowledge/bpmn-element-specs.js';

const resources = [
  {
    name: 'element-catalog' as const,
    uri: 'bpmn://catalog/elements' as const,
    config: {
      title: 'BPMN Element Catalog',
      description:
        'Полный каталог элементов BPMN палитры: Events, Activities, Gateways, SubProcesses. С описанием свойств, ограничений и доступных операций.',
      mimeType: 'application/json',
    },
    read: async (uri: URL) => {
      try {
        const catalog = {
          paletteElements: PALETTE_ELEMENTS,
          customModelProperties: CUSTOM_MODEL_PROPERTIES,
          commandHandlers: COMMAND_HANDLERS,
          categories: {
            event: Object.entries(PALETTE_ELEMENTS)
              .filter(([, spec]) => spec.category === 'event')
              .map(([key, spec]) => ({
                key,
                displayName: spec.displayName,
                description: spec.description,
              })),
            activity: Object.entries(PALETTE_ELEMENTS)
              .filter(([, spec]) => spec.category === 'activity')
              .map(([key, spec]) => ({
                key,
                displayName: spec.displayName,
                description: spec.description,
              })),
            gateway: Object.entries(PALETTE_ELEMENTS)
              .filter(([, spec]) => spec.category === 'gateway')
              .map(([key, spec]) => ({
                key,
                displayName: spec.displayName,
                description: spec.description,
              })),
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
                  error: 'Failed to build element catalog',
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
