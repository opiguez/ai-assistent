/**
 * BPMN XML Service
 * Парсинг и генерация BPMN XML через bpmn-moddle (Node.js).
 * Работает с bpmn:Definitions — корневым элементом BPMN 2.0.
 */
import { BpmnModdle } from 'bpmn-moddle';

// Если TypeScript ругается на отсутствие типов,
// можно дополнительно вытянуть тип (в зависимости от установленных @types)
// Если типы не подхватились автоматически, импортируйте их отдельно:

// ─── Types ────────────────────────────────────────────────

export interface BpmnElement {
  id: string;
  $type: string;
  name?: string;
  [key: string]: any;
}

export interface ParsedProcess {
  definitions: any;
  rootElement: any;
  elementsById: Record<string, any>;
  warnings: any[];
}

export interface ProcessElement {
  id: string;
  type: string;
  name?: string;
  incoming: string[];
  outgoing: string[];
  properties: Record<string, any>;
}

export interface ProcessConnection {
  id: string;
  type: string;
  source: string;
  target: string;
  name?: string;
  conditionExpression?: string;
}

// ─── Service ──────────────────────────────────────────────

class BpmnXmlService {
  private moddle;

  constructor() {
    this.moddle = new BpmnModdle();
  }

  /**
   * Парсит BPMN XML строку в объектный граф.
   */
  async fromXML(xml: string): Promise<ParsedProcess> {
    const { rootElement, elementsById, warnings } =
      await this.moddle.fromXML(xml);

    return {
      definitions: rootElement,
      rootElement: this.getProcessElement(rootElement),
      elementsById: elementsById || {},
      warnings: warnings || [],
    };
  }

  /**
   * Генерирует BPMN XML из объектного графа.
   */
  async toXML(definitions: any): Promise<string> {
    const { xml } = await this.moddle.toXML(definitions);
    return xml;
  }

  /**
   * Получает bpmn:Process из bpmn:Definitions.
   */
  private getProcessElement(definitions: any): any {
    if (!definitions) return null;

    const diagrams = definitions.diagrams || [];
    if (!diagrams.length) return null;

    const plane = diagrams[0]?.plane;
    if (!plane) return null;

    // Process is referenced by plane.bpmnElement
    return plane.bpmnElement || null;
  }

  /**
   * Извлекает все элементы процесса (Tasks, Events, Gateways, etc.)
   * Рекурсивно обходит SubProcess.
   */
  extractElements(parsed: ParsedProcess): ProcessElement[] {
    const process = parsed.rootElement;
    if (!process) return [];

    const flowElements = process.get('flowElements') || [];
    const elements: ProcessElement[] = [];

    for (const el of flowElements) {
      elements.push(this.mapElement(el));

      // Рекурсивно извлекаем элементы из SubProcess
      if (el.$type === 'bpmn:SubProcess') {
        const subFlowElements = el.get('flowElements') || [];
        for (const subEl of subFlowElements) {
          elements.push(this.mapElement(subEl));
        }
      }
    }

    return elements;
  }

  /**
   * Извлекает все связи (SequenceFlow) процесса.
   */
  extractConnections(parsed: ParsedProcess): ProcessConnection[] {
    const process = parsed.rootElement;
    if (!process) return [];

    const flowElements = process.get('flowElements') || [];
    const connections: ProcessConnection[] = [];

    for (const el of flowElements) {
      if (el.$type === 'bpmn:SequenceFlow') {
        connections.push({
          id: el.id,
          type: el.$type,
          source: el.get('sourceRef')?.id || '',
          target: el.get('targetRef')?.id || '',
          name: el.name || undefined,
          conditionExpression: el.get('conditionExpression')?.body || undefined,
        });
      }
    }

    return connections;
  }

  /**
   * Маппит элемент в плоскую структуру.
   */
  private mapElement(el: any): ProcessElement {
    const incoming = (el.get('incoming') || []).map((sf: any) => sf.id);
    const outgoing = (el.get('outgoing') || []).map((sf: any) => sf.id);

    const properties: Record<string, any> = {
      $type: el.$type,
      id: el.id,
    };

    // Извлекаем базовые свойства в зависимости от типа
    if (el.name !== undefined) properties.name = el.name;

    // Event definitions
    if (el.get('eventDefinitions')?.length) {
      properties.eventDefinitions = el
        .get('eventDefinitions')
        .map((ed: any) => ({
          $type: ed.$type,
        }));
    }

    // Condition expression (для ConditionalEventDefinition)
    if (el.$type === 'bpmn:ConditionalEventDefinition') {
      const conditionExpr = el.get('condition');
      if (conditionExpr) {
        properties.conditionExpression = conditionExpr.body;
      }
    }

    // Extension elements (Camunda)
    const extElements = el.get('extensionElements');
    if (extElements) {
      properties.extensionElements = this.extractExtensionElements(extElements);
    }

    // Task-specific properties
    if (el.$type === 'bpmn:ServiceTask') {
      if (el.topic) properties.topic = el.topic;
      if (el.delegateExpression)
        properties.delegateExpression = el.delegateExpression;
    }

    if (el.$type === 'bpmn:SendTask') {
      if (el.topic) properties.topic = el.topic;
    }

    if (el.$type === 'bpmn:ScriptTask') {
      if (el.scriptFormat) properties.scriptFormat = el.scriptFormat;
      if (el.script) properties.script = el.script;
    }

    // UserTask
    if (el.$type === 'bpmn:UserTask') {
      if (el.assignee) properties.assignee = el.assignee;
      if (el.candidateGroups) properties.candidateGroups = el.candidateGroups;
    }

    // Gateway
    if (
      el.$type === 'bpmn:ExclusiveGateway' ||
      el.$type === 'bpmn:InclusiveGateway'
    ) {
      if (el.default) properties.default = el.default?.id;
    }

    // SubProcess
    if (el.$type === 'bpmn:SubProcess') {
      properties.triggeredByEvent = el.triggeredByEvent || false;
    }

    return {
      id: el.id,
      type: el.$type,
      name: el.name,
      incoming,
      outgoing,
      properties,
    };
  }

  /**
   * Извлекает extension elements (Camunda) в плоский объект.
   */
  private extractExtensionElements(extElements: any): Record<string, any> {
    const result: Record<string, any> = {};
    const values = extElements.get('values') || [];

    for (const val of values) {
      const type = val.$type;

      // Camunda properties
      if (type === 'camunda:Properties') {
        const props = val.get('values') || [];
        for (const prop of props) {
          if (prop.name && prop.value) {
            result[prop.name] = prop.value;
          }
        }
      }

      // Camunda inputOutput
      if (type === 'camunda:InputOutput') {
        const inputParams = val.get('inputParameters') || [];
        const outputParams = val.get('outputParameters') || [];
        result.inputParameters = inputParams.map((p: any) => ({
          name: p.name,
          value: p.get('value')?.body,
        }));
        result.outputParameters = outputParams.map((p: any) => ({
          name: p.name,
          value: p.get('value')?.body,
        }));
      }
    }

    return result;
  }

  /**
   * Находит элемент по ID в parsed структуре.
   */
  getElementById(parsed: ParsedProcess, elementId: string): any {
    return parsed.elementsById[elementId] || null;
  }

  /**
   * Находит процесс по ID.
   */
  getProcessById(parsed: ParsedProcess): any {
    return parsed.rootElement;
  }

  /**
   * Генерирует XML из parsed структуры.
   */
  async generateXml(parsed: ParsedProcess): Promise<string> {
    return this.toXML(parsed.definitions);
  }

  /**
   * Обновляет имя элемента.
   */
  async updateElementName(
    parsed: ParsedProcess,
    elementId: string,
    name: string,
  ): Promise<string> {
    const element = parsed.elementsById[elementId];
    if (element) {
      element.name = name;
    }
    return this.toXML(parsed.definitions);
  }

  /**
   * Устанавливает conditionExpression для SequenceFlow.
   */
  async setConditionExpression(
    parsed: ParsedProcess,
    connectionId: string,
    expression: string,
  ): Promise<string> {
    const element = parsed.elementsById[connectionId];
    if (element && element.$type === 'bpmn:SequenceFlow') {
      const moddle = (this as any).moddle;
      const condition = moddle.create('bpmn:FormalExpression', {
        body: expression,
      });
      element.set('conditionExpression', condition);
    }
    return this.toXML(parsed.definitions);
  }

  // ─── Element Creation ─────────────────────────────────────

  /**
   * Генерирует уникальный ID для нового элемента.
   */
  private generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  /**
   * Создаёт новый BPMN элемент и добавляет его в процесс.
   */
  createElement(
    parsed: ParsedProcess,
    elementType: string,
    name?: string,
    parentId?: string,
  ): { elementId: string; element: any } | null {
    const parent = parentId
      ? parsed.elementsById[parentId]
      : parsed.rootElement;
    if (!parent) return null;

    const moddle = (this as any).moddle;
    const id = this.generateId(elementType.replace('bpmn:', '').toLowerCase());

    const elementProps: Record<string, any> = { id };
    if (name) elementProps.name = name;

    const element = moddle.create(elementType, elementProps);
    parent.get('flowElements').push(element);

    // Обновляем elementsById
    parsed.elementsById[id] = element;

    return { elementId: id, element };
  }

  /**
   * Создаёт SequenceFlow между двумя элементами.
   */
  addSequenceFlow(
    parsed: ParsedProcess,
    sourceId: string,
    targetId: string,
    conditionExpression?: string,
    parentId?: string,
  ): { flowId: string; flow: any } | null {
    const source = parsed.elementsById[sourceId];
    const target = parsed.elementsById[targetId];
    if (!source || !target) return null;

    const parent = parentId
      ? parsed.elementsById[parentId]
      : parsed.rootElement;
    if (!parent) return null;

    const moddle = (this as any).moddle;
    const id = this.generateId('flow');

    const flowProps: Record<string, any> = {
      id,
      sourceRef: source,
      targetRef: target,
    };

    const flow = moddle.create('bpmn:SequenceFlow', flowProps);

    // Добавляем conditionExpression если задан
    if (conditionExpression) {
      const condition = moddle.create('bpmn:FormalExpression', {
        body: conditionExpression,
      });
      flow.set('conditionExpression', condition);
    }

    // Добавляем в родительский элемент (process или subprocess)
    parent.get('flowElements').push(flow);

    // Связываем source → outgoing и target → incoming
    source.get('outgoing').push(flow);
    target.get('incoming').push(flow);

    // Обновляем elementsById
    parsed.elementsById[id] = flow;

    return { flowId: id, flow };
  }

  /**
   * Удаляет элемент и все связанные SequenceFlow.
   */
  deleteElement(parsed: ParsedProcess, elementId: string): boolean {
    const element = parsed.elementsById[elementId];
    if (!element) return false;

    const process = parsed.rootElement;
    if (!process) return false;

    // Нельзя удалять StartEvent и EndEvent
    if (
      element.$type === 'bpmn:StartEvent' ||
      element.$type === 'bpmn:EndEvent'
    ) {
      return false;
    }

    // Удаляем связанные SequenceFlow
    const incoming = [...(element.get('incoming') || [])];
    const outgoing = [...(element.get('outgoing') || [])];

    for (const flow of [...incoming, ...outgoing]) {
      this.deleteFlow(parsed, flow.id);
    }

    // Удаляем элемент из flowElements
    const flowElements = process.get('flowElements');
    const idx = flowElements.indexOf(element);
    if (idx !== -1) {
      flowElements.splice(idx, 1);
    }

    // Удаляем BPMNShape из diagram
    this.removeShapeFromDiagram(parsed, elementId);

    // Удаляем из elementsById
    delete parsed.elementsById[elementId];

    return true;
  }

  /**
   * Удаляет SequenceFlow и отвязывает его от source/target.
   */
  private deleteFlow(parsed: ParsedProcess, flowId: string): boolean {
    const flow = parsed.elementsById[flowId];
    if (!flow || flow.$type !== 'bpmn:SequenceFlow') return false;

    const process = parsed.rootElement;
    if (!process) return false;

    // Отвязываем от source
    const source = flow.get('sourceRef');
    if (source) {
      const outIdx = source.get('outgoing').indexOf(flow);
      if (outIdx !== -1) source.get('outgoing').splice(outIdx, 1);
    }

    // Отвязываем от target
    const target = flow.get('targetRef');
    if (target) {
      const inIdx = target.get('incoming').indexOf(flow);
      if (inIdx !== -1) target.get('incoming').splice(inIdx, 1);
    }

    // Удаляем BPMNEdge из diagram
    this.removeEdgeFromDiagram(parsed, flowId);

    // Удаляем из flowElements
    const flowElements = process.get('flowElements');
    const idx = flowElements.indexOf(flow);
    if (idx !== -1) {
      flowElements.splice(idx, 1);
    }

    // Удаляем из elementsById
    delete parsed.elementsById[flowId];

    return true;
  }

  // ─── DI (Diagram Interchange) ──────────────────────────────

  /**
   * Получает BPMNPlane из definitions.
   */
  private getPlane(parsed: ParsedProcess): any {
    const diagrams = parsed.definitions.diagrams || [];
    if (!diagrams.length) return null;
    return diagrams[0]?.plane || null;
  }

  /**
   * Добавляет BPMNShape для элемента в диаграмму.
   */
  addShapeToDiagram(
    parsed: ParsedProcess,
    elementId: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    const element = parsed.elementsById[elementId];
    if (!element) return;

    const plane = this.getPlane(parsed);
    if (!plane) return;

    const moddle = (this as any).moddle;
    const shapeId = `${elementId}_di`;

    const shape = moddle.create('bpmndi:BPMNShape', {
      id: shapeId,
      bpmnElement: element,
      bounds: moddle.create('dc:Bounds', {
        x: x,
        y: y,
        width: width,
        height: height,
      }),
    });

    plane.get('planeElement').push(shape);
  }

  /**
   * Удаляет BPMNShape для элемента из диаграммы.
   */
  private removeShapeFromDiagram(
    parsed: ParsedProcess,
    elementId: string,
  ): void {
    const plane = this.getPlane(parsed);
    if (!plane) return;

    const shapeId = `${elementId}_di`;
    const planeElements = plane.get('planeElement') || [];
    const idx = planeElements.findIndex((el: any) => el.id === shapeId);
    if (idx !== -1) {
      planeElements.splice(idx, 1);
    }
  }

  /**
   * Добавляет BPMNEdge для SequenceFlow в диаграмму.
   */
  addEdgeToDiagram(
    parsed: ParsedProcess,
    flowId: string,
    waypoints: Array<{ x: number; y: number }>,
  ): void {
    const flow = parsed.elementsById[flowId];
    if (!flow) return;

    const plane = this.getPlane(parsed);
    if (!plane) return;

    const moddle = (this as any).moddle;
    const edgeId = `${flowId}_di`;

    const waypointObjects = waypoints.map((wp) =>
      moddle.create('di:Waypoint', { x: wp.x, y: wp.y }),
    );

    const edge = moddle.create('bpmndi:BPMNEdge', {
      id: edgeId,
      bpmnElement: flow,
      waypoint: waypointObjects,
    });

    plane.get('planeElement').push(edge);
  }

  /**
   * Удаляет BPMNEdge для SequenceFlow из диаграммы.
   */
  private removeEdgeFromDiagram(parsed: ParsedProcess, flowId: string): void {
    const plane = this.getPlane(parsed);
    if (!plane) return;

    const edgeId = `${flowId}_di`;
    const planeElements = plane.get('planeElement') || [];
    const idx = planeElements.findIndex((el: any) => el.id === edgeId);
    if (idx !== -1) {
      planeElements.splice(idx, 1);
    }
  }
}

export const bpmnXmlService = new BpmnXmlService();
