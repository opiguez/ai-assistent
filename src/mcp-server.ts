import { McpServer } from '@modelcontextprotocol/server';
import express from 'express';
import { NodeStreamableHTTPServerTransport } from '@modelcontextprotocol/node';
import { createMcpExpressApp } from '@modelcontextprotocol/express';
import { registerHistoryRoutes } from './mcp/controllers/history.controller';
import registerResources from './mcp/dataLayer/resources';
import registerHistoryPrompt from './mcp/dataLayer/history-promt';
import registerTools from './mcp/dataLayer/tools';
import { ENV } from './config/base';

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

const host = new URL(ENV.LOCAL_SERVER_URL_NO_PORT).hostname;

app.listen(ENV.PORT_MCP1, host, () => {
  console.log(
    `MCP сервер успешно запущен на ${ENV.LOCAL_SERVER_URL_NO_PORT}:${ENV.PORT_MCP1}`,
  );
});
