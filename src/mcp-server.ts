import { McpServer } from '@modelcontextprotocol/server';
import express from 'express';
import { NodeStreamableHTTPServerTransport } from '@modelcontextprotocol/node';
import { createMcpExpressApp } from '@modelcontextprotocol/express';
import { registerHistoryRoutes } from './mcp/controllers/history.controller';
import registerResources from './mcp/dataLayer/resources';
import registerHistoryPrompt from './mcp/dataLayer/history-promt';
import registerTools from './mcp/dataLayer/tools';

const app = createMcpExpressApp();

app.use(express.json());

const server = new McpServer({
  name: 'rabis-lowcode-mcp-server',
  version: '1.0.0',
});
const transport = new NodeStreamableHTTPServerTransport({
  sessionIdGenerator: undefined,
});

//регистрация для MCP tools/promts/resources
registerTools(server);
registerResources(server);
registerHistoryPrompt(server);

await server.connect(transport);

//регистрация роутинга history в MCP сервер для доступа снаружи
registerHistoryRoutes(app);

app.post('/mcp', (req, res) => {
  transport.handleRequest(req, res, req.body);
});

app.listen(3002, '127.0.0.1', () => {
  console.log(`MCP Express Server running on port ${3002}`);
});
