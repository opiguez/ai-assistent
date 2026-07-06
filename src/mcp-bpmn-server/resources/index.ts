/**
 * BPMN Resources Registry
 * Регистрация всех bpmn:// ресурсов для MCP сервера.
 */
import { McpServer } from '@modelcontextprotocol/server';
import registerProcessStateResources from './process-state.js';
import registerDataContextResources from './data-context.js';
import registerElementCatalogResources from './element-catalog.js';
import registerRulesCatalogResources from './rules-catalog.js';
import registerValidationErrorsResources from './validation-errors.js';

export default function registerBpmnResources(server: McpServer) {
  registerProcessStateResources(server);
  registerDataContextResources(server);
  registerElementCatalogResources(server);
  registerRulesCatalogResources(server);
  registerValidationErrorsResources(server);
}
