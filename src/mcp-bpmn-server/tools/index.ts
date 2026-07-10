/**
 * BPMN Tools Registry
 * Регистрация всех bpmn_* инструментов для MCP сервера.
 */
import { McpServer } from '@modelcontextprotocol/server';
import type { ToolDef } from '../tools/types.js';

// Phase 2: READ instruments
import { getProcessSchemaTools } from './get-process-schema.js';
import { getElementPropertiesTools } from './get-element-properties.js';
import { getAvailableElementTypesTools } from './get-available-element-types.js';
import { getElementConstraintsTools } from './get-element-constraints.js';
import { getDataTypesTools } from './get-data-types.js';
import { getApiSpecTools } from './get-api-spec.js';
import { getProcessTopologyTools } from './get-process-topology.js';
import { suggestImprovementsTools } from './suggest-improvements.js';
import { validateProcessTools } from './validate-process.js';

// Phase 3: WRITE instruments
import { updateElementPropertyTools } from './update-element-property.js';
import { setConditionExpressionTools } from './set-condition-expression.js';
import { toggleDecisionsTools } from './toggle-decisions.js';
import { setRdmAndNumberStructureTools } from './set-rdm-and-number-structure.js';
import { setMessageEventTools } from './set-message-event.js';
import { addElementTools } from './add-element/index.js';
import { connectElementsTools } from './connect-elements.js';
import { deleteElementTools } from './delete-element.js';

// Phase 4: CRUD for metadata
import { crudPostTemplateTools } from './crud-post-template.js';
import { crudBpmnMessageTools } from './crud-bpmn-message.js';
import { getUsersTools } from './get-user-groups-and-users.js';

// Diagnostics
import { logValidationErrorsTools } from './log-validation-errors.js';

// Undo
import { snapshotProcessTools } from './snapshot-process.js';

const bpmnTools: ToolDef[] = [
  ...getProcessSchemaTools,
  ...getElementPropertiesTools,
  ...getAvailableElementTypesTools,
  ...getElementConstraintsTools,
  ...getDataTypesTools,
  ...getApiSpecTools,
  ...getProcessTopologyTools,
  ...suggestImprovementsTools,
  ...validateProcessTools,
  ...updateElementPropertyTools,
  ...setConditionExpressionTools,
  ...toggleDecisionsTools,
  ...setRdmAndNumberStructureTools,
  ...setMessageEventTools,
  ...addElementTools,
  ...connectElementsTools,
  ...deleteElementTools,
  ...crudPostTemplateTools,
  ...crudBpmnMessageTools,
  ...getUsersTools,
  ...logValidationErrorsTools,
  ...snapshotProcessTools,
];

export default function registerBpmnTools(server: McpServer) {
  bpmnTools.forEach((tool) => {
    server.registerTool(tool.name, tool.config, tool.cb as any);
  });
}
