import { McpServer } from '@modelcontextprotocol/server';
import express from 'express';
import { NodeStreamableHTTPServerTransport } from '@modelcontextprotocol/node';
import { createMcpExpressApp } from '@modelcontextprotocol/express';
import registerBpmnTools from './tools/index.js';
import registerBpmnResources from './resources/index.js';
import registerBpmnPrompts from './prompts/index.js';
import { ENV } from '../config/base.js';

const app = createMcpExpressApp();

app.use(express.json());

const server = new McpServer({
  name: 'web-mcp_bpmn',
  version: '1.0.0',
});

const transport = new NodeStreamableHTTPServerTransport({
  sessionIdGenerator: undefined,
});

registerBpmnTools(server);
registerBpmnResources(server);
registerBpmnPrompts(server);

await server.connect(transport);

app.post('/mcp', (req, res) => {
  transport.handleRequest(req, res, req.body);
});

const host = new URL(ENV.LOCAL_SERVER_URL_NO_PORT).hostname;
const port = Number(ENV.PORT_MCP_BPMN) || 3003;

app.listen(port, host, () => {
  console.log(
    `BPMN MCP сервер успешно запущен на ${ENV.LOCAL_SERVER_URL_NO_PORT}:${port}`,
  );
});
