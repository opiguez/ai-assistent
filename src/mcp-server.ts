import {
  CreateModuleSchema,
  CreateDataTypeSchema,
  CreateDataTypeFieldSchema,
  CreateModuleFieldSchema,
} from './mcp/schema';

import {
  handleCreateModule,
  handleCreateDataType,
  handleCreateDataTypeField,
  handleCreateModuleField,
} from './mcp/handlers';
import { McpServer } from '@modelcontextprotocol/server';
import { NodeStreamableHTTPServerTransport } from '@modelcontextprotocol/node';
import { createMcpExpressApp } from '@modelcontextprotocol/express';

const server = new McpServer({
  name: 'rabis-lowcode-mcp-server',
  version: '1.0.0',
});

server.registerTool(
  'createModule',
  {
    title: 'Create Module',
    description:
      'Создает новый модуль (верхнеуровневый контейнер). При создании модуля автоматически создается дефолтная рабочая область (DEFAULT_WORKSPACE_ID). Не создавай несколько модулей за раз.',
    inputSchema: CreateModuleSchema,
  },
  handleCreateModule,
);

server.registerTool(
  'createDataType',
  {
    title: 'Create Data Type',
    description:
      'Создает новый тип данных (сущность) внутри модуля. Помни: тип не существует отдельно от модуля.',
    inputSchema: CreateDataTypeSchema,
  },
  handleCreateDataType,
);

server.registerTool(
  'createDataTypeField',
  {
    title: 'Create Data Type Field',
    description:
      'Создает специфичное поле внутри конкретного Типа Данных. Вызывай для описания уникальных атрибутов объекта.',
    inputSchema: CreateDataTypeFieldSchema,
  },
  handleCreateDataTypeField,
);

server.registerTool(
  'createModuleField',
  {
    title: 'Create Module Field',
    description:
      "Создает ОБЩЕЕ (сквозное) поле на уровне Модуля. Все типы данных внутри этого модуля автоматически унаследуют это поле (например, 'дата создания', 'автор').",
    inputSchema: CreateModuleFieldSchema,
  },
  handleCreateModuleField,
);

const transport = new NodeStreamableHTTPServerTransport({
  sessionIdGenerator: undefined,
});

await server.connect(transport);

const app = createMcpExpressApp();

// Если вам нужно привязать транспорт к конкретным эндпоинтам или использовать
// middleware, теперь это делается стандартным для @modelcontextprotocol/express путем.
// (По умолчанию фабрика уже умеет работать с NodeStreamableHTTPServerTransport)

app.listen(3002, () => {
  console.log('[MCP Server] Успешно запущен на порту 3002');
});
