import { McpServer } from '@modelcontextprotocol/server';

const resources = [
  {
    name: 'schema-state' as const,
    uri: 'lowcode://schema/state' as const,
    config: {
      title: 'GraphQL Schema State',
      description: 'Актуальный слепок структуры системы',
      mimeType: 'application/json',
    },
    read: async (uri: URL) => {
      const mockState = {}; // Ваш метод мока БД
      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(mockState, null, 2),
          },
        ],
      };
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
