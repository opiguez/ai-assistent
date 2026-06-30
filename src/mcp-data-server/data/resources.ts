import { McpServer } from '@modelcontextprotocol/server';
import { rabisClient } from '../../shared/services/rabisClient.service.js';

async function getSchemaState() {
  const app = await rabisClient.chain.query.application.get({
    modules: {
      id: true,
      name: true,
      displayName: true,
      description: true,
      dataTypes: {
        id: true,
        name: true,
        displayName: true,
        versionable: true,
        canHaveChildren: true,
        properties: {
          id: true,
          name: true,
          displayName: true,
          properties: {
            id: true,
            key: true,
            name: true,
            displayName: true,
            propertyType: { propertyTypeEnum: true },
            required: true,
            readonly: true,
          },
        },
      },
      lifecycles: {
        id: true,
        name: true,
        displayName: true,
      },
      workspaces: {
        id: true,
        name: true,
        displayName: true,
      },
    },
  });
  return app;
}

const resources = [
  {
    name: 'schema-state' as const,
    uri: 'lowcode://schema/state' as const,
    config: {
      title: 'GraphQL Schema State',
      description: 'Актуальный слепок структуры системы: модули, типы данных, поля, жизненные циклы, рабочие области.',
      mimeType: 'application/json',
    },
    read: async (uri: URL) => {
      try {
        const state = await getSchemaState();
        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify(state, null, 2),
            },
          ],
        };
      } catch (e) {
        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify({ error: 'Failed to fetch schema state', details: (e as Error).message }, null, 2),
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
