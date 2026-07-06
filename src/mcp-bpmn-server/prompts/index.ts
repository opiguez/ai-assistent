/**
 * BPMN Prompts Registry
 * Регистрация всех MCP промтов для BPMN сервера.
 */
import { McpServer } from '@modelcontextprotocol/server';
import registerAnalyzeProcessPrompt from './analyze-process.js';
import registerModifyProcessPrompt from './modify-process.js';
import registerDesignPatternsPrompt from './design-patterns.js';
import registerCreateProcessPrompt from './create-process.js';
import registerExtendProcessPrompt from './extend-process.js';

export default function registerBpmnPrompts(server: McpServer) {
  registerAnalyzeProcessPrompt(server);
  registerModifyProcessPrompt(server);
  registerDesignPatternsPrompt(server);
  registerCreateProcessPrompt(server);
  registerExtendProcessPrompt(server);
}
