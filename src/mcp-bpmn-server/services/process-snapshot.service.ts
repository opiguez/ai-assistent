/**
 * Process Snapshot Service
 * Единый источник данных для ресурса process-state и инструмента get-process-schema.
 * Устраняет дублирование вызовов loadAndParseProcess / extractElements / extractConnections.
 */
import { bpmnSchemaService, BpmnProcessState } from './bpmn-schema.service.js';
import { bpmnXmlService, ProcessElement, ProcessConnection } from './bpmn-xml.service.js';

export interface ProcessSnapshot {
  state: BpmnProcessState;
  elements: ProcessElement[];
  connections: ProcessConnection[];
}

export async function getProcessSnapshot(dataTypeId: string): Promise<ProcessSnapshot> {
  const state = await bpmnSchemaService.loadAndParseProcess(dataTypeId);
  const elements = bpmnXmlService.extractElements(state.parsed);
  const connections = bpmnXmlService.extractConnections(state.parsed);

  return { state, elements, connections };
}
