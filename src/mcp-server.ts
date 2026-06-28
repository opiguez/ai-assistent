import { McpServer } from '@modelcontextprotocol/server';
import { NodeStreamableHTTPServerTransport } from '@modelcontextprotocol/node';
import { createMcpExpressApp } from '@modelcontextprotocol/express';
import { registerHistoryRoutes } from './mcp/controllers/history.controller';
import registerResources from './mcp/dataLayer/resources';
import registerHistoryPrompt from './mcp/dataLayer/history-promt';
import registerTools from './mcp/dataLayer/tools';

const app = createMcpExpressApp();

const server = new McpServer({
  name: 'rabis-lowcode-mcp-server',
  version: '1.0.0',
});
const transport = new NodeStreamableHTTPServerTransport({
  sessionIdGenerator: undefined,
});
await server.connect(transport);

//регистрация для MCP tools/promts/resources
registerTools(server);
registerResources(server);
registerHistoryPrompt(server);

//регистрация роутинга history в MCP сервер для доступа снаружи
registerHistoryRoutes(app);

app.listen(3002, () => {
  console.log('[MCP Server] Успешно запущен на порту 3002');
});
