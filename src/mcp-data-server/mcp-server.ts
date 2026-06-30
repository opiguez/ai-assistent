import { McpServer } from '@modelcontextprotocol/server';
import express from 'express';
import { NodeStreamableHTTPServerTransport } from '@modelcontextprotocol/node';
import { createMcpExpressApp } from '@modelcontextprotocol/express';
import registerResources from './data/resources.js';
import registerHistoryPrompt from './data/history-prompt.js';
import registerDataLayerTools from './data/tools.js';
import { ENV } from '../config/base.js';

const app = createMcpExpressApp();

app.use(express.json());

const server = new McpServer({
  name: 'web-mcp_data',
  version: '1.0.0',
});
const transport = new NodeStreamableHTTPServerTransport({
  sessionIdGenerator: undefined,
});

//регистрация для MCP(dataLayer) tools/promts/resources
registerDataLayerTools(server);
registerResources(server);
registerHistoryPrompt(server);

await server.connect(transport);

app.post('/mcp', (req, res) => {
  transport.handleRequest(req, res, req.body);
});

const host = new URL(ENV.LOCAL_SERVER_URL_NO_PORT).hostname;

app.listen(ENV.PORT_MCP1, host, () => {
  console.log(
    `MCP сервер успешно запущен на ${ENV.LOCAL_SERVER_URL_NO_PORT}:${ENV.PORT_MCP1}`,
  );
});
