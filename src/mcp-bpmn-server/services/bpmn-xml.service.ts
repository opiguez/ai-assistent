/**
 * BPMN XML Service
 * Парсинг и генерация BPMN XML через bpmn-moddle (Node.js).
 * Работает с bpmn:Definitions — корневым элементом BPMN 2.0.
 */
import {
  BaseElement,
  BpmnModdle,
  BPMNModel,
  Option,
  RootElement,
} from 'bpmn-moddle';
import { createRequire } from 'module';

// Безопасный способ загрузки JSON в ESM/Node.js без поломки сборщика esbuild/tsup
const require = createRequire(import.meta.url);
const camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda.json');

// ─── Types ────────────────────────────────────────────────
export interface ProcessElement {
  id: string;
  type: string;
  name?: string;
  incoming: string[];
  outgoing: string[];
  parentId: string;
  properties: Record<string, any>;
}
export interface ProcessConnection {
  id: string;
  type: string;
  source: string;
  target: string;
  name?: string;
  conditionExpression?: string;
  parentId?: string;
}

export type ModdleElement<T = BaseElement> = T & {
  set(property: string, value: any): void;
  get(property: string): any;
  name?: string;
  $type: string;
  $attrs: Record<string, any>;
  $parent?: ModdleElement;
};

// ─── Service ──────────────────────────────────────────────
class BpmnXmlService {
  private moddle;

  constructor() {
    this.moddle = new BpmnModdle({
      camunda: camundaModdleDescriptor,
    });
  }

  /**
   * Парсит BPMN XML строку в объектный граф.
   */
  async fromXML(
    xmlStr: string,
    typeNameOrOptions?: Option | string,
  ): Promise<BPMNModel> {
    const { rootElement, elementsById, warnings, references } =
      await this.moddle.fromXML(xmlStr, typeNameOrOptions);

    return {
      references,
      rootElement,
      elementsById: elementsById || {},
      warnings: warnings || [],
    };
  }

  /**
   * Генерирует BPMN XML из объектного графа.
   */
  async toXML(element: RootElement, options?: Option) {
    const { xml } = await this.moddle.toXML(element, options);
    return xml;
  }

  /**
   * Извлекает все элементы процесса, рекурсивно обходя SubProcess.
   * Каждому элементу проставляется актуальный parentId.
   */
  extractElements(parsed: BPMNModel): ProcessElement[] {
    const definitions = parsed.rootElement;
    if (!definitions) return [];

    const elements: ProcessElement[] = [];
    const defAny = definitions as any;
    const rootElements =
      defAny.rootElements || defAny.get?.('rootElements') || [];

    for (const rootEl of rootElements) {
      if (rootEl.$type === 'bpmn:Process') {
        const flowElements =
          rootEl.flowElements || rootEl.get?.('flowElements') || [];

        // Передаем ID корневого процесса в качестве parentId
        const processElements = this.extractFlowElementsRecursively(
          flowElements,
          rootEl.id,
        );
        elements.push(...processElements);
      }
    }

    return elements;
  }

  private extractFlowElementsRecursively(
    flowElements: any[],
    parentId: string,
  ): ProcessElement[] {
    const elements: ProcessElement[] = [];

    for (const el of flowElements) {
      if (!el) continue;

      // Маппим текущий элемент и прокидываем ему текущий parentId
      elements.push(this.mapElement(el, parentId));

      // Рекурсия для подпроцессов
      if (el.$type === 'bpmn:SubProcess') {
        const subFlowElements =
          el.flowElements ||
          (typeof el.get === 'function' ? el.get('flowElements') : []) ||
          [];

        // Спускаемся глубже, теперь родителем для внутренних элементов становится ID этого SubProcess
        const childElements = this.extractFlowElementsRecursively(
          subFlowElements,
          el.id,
        );
        elements.push(...childElements);
      }
    }

    return elements;
  }

  /**
   * Маппит элемент в безопасную плоскую структуру.
   */
  private mapElement(el: any, parentId: string): ProcessElement {
    const incoming = Array.isArray(el.incoming)
      ? el.incoming.map((sf: any) => sf.id).filter(Boolean)
      : (typeof el.get === 'function' ? el.get('incoming') : [])?.map(
          (sf: any) => sf.id,
        ) || [];

    const outgoing = Array.isArray(el.outgoing)
      ? el.outgoing.map((sf: any) => sf.id).filter(Boolean)
      : (typeof el.get === 'function' ? el.get('outgoing') : [])?.map(
          (sf: any) => sf.id,
        ) || [];

    const properties: Record<string, any> = {};
    if (el.name !== undefined) properties.name = el.name;

    // Извлечение Event definitions
    const eventDefs =
      el.eventDefinitions ||
      (typeof el.get === 'function' ? el.get('eventDefinitions') : null);
    if (Array.isArray(eventDefs) && eventDefs.length) {
      properties.eventDefinitions = eventDefs.map((ed: any) => ({
        $type: ed.$type,
      }));
    }

    // Condition для условных событий
    if (el.$type === 'bpmn:ConditionalEventDefinition') {
      const conditionExpr =
        el.condition ||
        (typeof el.get === 'function' ? el.get('condition') : null);
      if (conditionExpr?.body)
        properties.conditionExpression = conditionExpr.body;
    }

    // Кастомные расширения (Extension elements)
    const extElements =
      el.extensionElements ||
      (typeof el.get === 'function' ? el.get('extensionElements') : null);
    if (extElements) {
      properties.extensionElements = this.extractExtensionElements(extElements);
    }

    // Свойства разных типов Task
    if (el.$type === 'bpmn:ServiceTask') {
      if (el.topic) properties.topic = el.topic;
      if (el.delegateExpression)
        properties.delegateExpression = el.delegateExpression;
    }
    if (el.$type === 'bpmn:SendTask' && el.topic) properties.topic = el.topic;
    if (el.$type === 'bpmn:ScriptTask') {
      if (el.scriptFormat) properties.scriptFormat = el.scriptFormat;
      if (el.script) properties.script = el.script;
    }
    if (el.$type === 'bpmn:UserTask') {
      if (el.assignee) properties.assignee = el.assignee;
      if (el.candidateGroups) properties.candidateGroups = el.candidateGroups;
    }

    // Шлюзы и подпроцессы
    if (
      el.$type === 'bpmn:ExclusiveGateway' ||
      el.$type === 'bpmn:InclusiveGateway'
    ) {
      if (el.default) properties.default = el.default.id;
    }
    if (el.$type === 'bpmn:SubProcess') {
      properties.triggeredByEvent = el.triggeredByEvent || false;
    }

    return {
      id: el.id,
      type: el.$type,
      name: el.name,
      incoming,
      outgoing,
      parentId, // <-- Добавили в возвращаемый DTO элемент
      properties,
    };
  }

  /**
   * Извлекает все связи (SequenceFlow) процесса, включая связи внутри SubProcess.
   */
  extractConnections(parsed: BPMNModel): ProcessConnection[] {
    const definitions = parsed.rootElement;
    if (!definitions) return [];

    const connections: ProcessConnection[] = [];
    const defAny = definitions as any;
    const rootElements =
      defAny.rootElements || defAny.get?.('rootElements') || [];

    for (const rootEl of rootElements) {
      if (rootEl.$type === 'bpmn:Process') {
        const flowElements =
          rootEl.flowElements || rootEl.get?.('flowElements') || [];

        // Передаем ID корневого процесса в качестве parentId
        const processConnections = this.extractConnectionsRecursively(
          flowElements,
          rootEl.id,
        );
        connections.push(...processConnections);
      }
    }

    return connections;
  }

  private extractConnectionsRecursively(
    flowElements: BaseElement[],
    parentId: string,
  ): ProcessConnection[] {
    const connections: ProcessConnection[] = [];

    for (const el of flowElements) {
      if (!el) continue;

      if (el.$type === 'bpmn:SequenceFlow') {
        const sf = el as any;

        connections.push({
          id: sf.id,
          type: sf.$type,
          source: sf.sourceRef?.id || '',
          target: sf.targetRef?.id || '',
          name: sf.name || undefined,
          conditionExpression: sf.conditionExpression?.body || undefined,
          parentId, // <-- Привязываем связь к контейнеру, где она находится
        });
      }

      if (el.$type === 'bpmn:SubProcess') {
        const subFlowElements = (el as any).flowElements || [];
        // Спускаемся глубже, подпроцесс становится новым parentId для внутренних связей
        const childConnections = this.extractConnectionsRecursively(
          subFlowElements,
          el.id,
        );
        connections.push(...childConnections);
      }
    }

    return connections;
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
  getElementById(parsed: BPMNModel, elementId: string) {
    return parsed.elementsById[elementId] || null;
  }

  /**
   * Находит процесс по ID.
   */
  getProcessById(parsed: BPMNModel) {
    return parsed.rootElement;
  }

  /**
   * Генерирует XML из parsed структуры.
   */
  async generateXml(parsed: BPMNModel): Promise<string> {
    return this.toXML(parsed.rootElement);
  }

  /**
   * Обновляет имя элемента.
   */
  async updateElementName(
    parsed: BPMNModel, // Передаем только родной тип из либы
    elementId: string,
    name: string,
  ): Promise<string> {
    const element = parsed.elementsById[elementId] as any;

    if (element) {
      element.name = name;
    }

    // Генерируем XML от корневого элемента той же модели
    return this.toXML(parsed.rootElement);
  }

  /**
   * Устанавливает conditionExpression для SequenceFlow.
   */
  async setConditionExpression(
    parsed: BPMNModel,
    connectionId: string,
    expression: string,
  ): Promise<string> {
    const element = parsed.elementsById[connectionId];

    if (element && element.$type === 'bpmn:SequenceFlow') {
      // Приводим элемент к any локально, чтобы TypeScript разрешил добавлять любые свойства SequenceFlow
      const sequenceFlow = element as any;

      const condition = this.moddle.create('bpmn:FormalExpression', {
        body: expression,
      });

      sequenceFlow.conditionExpression = condition;
    }

    return this.toXML(parsed.rootElement);
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
    parsed: BPMNModel,
    elementType: string,
    name?: string,
    parentId?: string,
  ): { elementId: string; element: ModdleElement; parentId: string } | null {
    // Ищем родителя
    let parent: any = parentId ? parsed.elementsById[parentId] : null;

    // Если parentId не передан — это автоматический режим (ищем главный процесс)
    if (!parent && parsed.rootElement) {
      const root = parsed.rootElement as any;
      if (root.$type === 'bpmn:Definitions') {
        parent = root.rootElements?.find(
          (el: any) => el.$type === 'bpmn:Process',
        );
      } else if (root.$type === 'bpmn:Process') {
        parent = root;
      }
    }

    // Если вообще ничего не нашли, фолбэчимся на корень
    if (!parent) {
      parent = parsed.rootElement;
    }

    if (!parent) return null;

    const parentElement = parent as any;
    const actualParentId = parentElement.id as string;
    const id = this.generateId(elementType.replace('bpmn:', '').toLowerCase());

    const elementProps: Record<string, any> = { id };
    if (name) elementProps.name = name;

    const element = this.moddle.create(
      elementType,
      elementProps,
    ) as ModdleElement;

    // Инициализируем массив для элементов (работает и для Process, и для SubProcess)
    const currentFlowElements = parentElement.get('flowElements') || [];
    currentFlowElements.push(element);

    // Записываем обновленный массив обратно через .set()
    parentElement.set('flowElements', currentFlowElements);

    parsed.elementsById[id] = element;
    return { elementId: id, element, parentId: actualParentId };
  }

  /**
   * Создаёт SequenceFlow между двумя элементами.
   */
  addSequenceFlow(
    parsed: BPMNModel,
    sourceId: string,
    targetId: string,
    parentId?: string,
  ): { flowId: string; flow: any } | null {
    const source = parsed.elementsById[sourceId];
    const target = parsed.elementsById[targetId];
    if (!source || !target) return null;

    const sourceEl = source as any;
    const targetEl = target as any;

    // 1. ОПРЕДЕЛЯЕМ ПРАВИЛЬНОГО РОДИТЕЛЯ
    let parent = parentId ? parsed.elementsById[parentId] : sourceEl.$parent;

    if (!parent && parsed.rootElement) {
      const root = parsed.rootElement as any;
      if (root.$type === 'bpmn:Definitions') {
        parent = root.rootElements?.find(
          (el: any) => el.$type === 'bpmn:Process',
        );
      } else if (root.$type === 'bpmn:Process') {
        parent = root;
      }
    }

    if (!parent) return null;
    const parentEl = parent as any;

    const id = this.generateId('flow');

    const flowProps: Record<string, any> = {
      id,
      sourceRef: source,
      targetRef: target,
    };

    const flow = this.moddle.create('bpmn:SequenceFlow', flowProps) as any;
    flow.$parent = parentEl;

    // 2. ДОБАВЛЯЕМ В КОНТЕЙНЕР (PROCESS/SUBPROCESS)
    const currentFlowElements = parentEl.get('flowElements') || [];
    currentFlowElements.push(flow);
    parentEl.set('flowElements', currentFlowElements);

    // 3. СВЯЗЫВАЕМ С ИСХОДЯЩИМ ЭЛЕМЕНТОМ (SOURCE)
    const currentOutgoing = sourceEl.get('outgoing') || [];
    currentOutgoing.push(flow);
    sourceEl.set('outgoing', currentOutgoing);

    // 4. СВЯЗЫВАЕМ С ВХОДЯЩИМ ЭЛЕМЕНТОМ (TARGET)
    const currentIncoming = targetEl.get('incoming') || [];
    currentIncoming.push(flow);
    targetEl.set('incoming', currentIncoming);

    parsed.elementsById[id] = flow;

    return { flowId: id, flow };
  }

  setFlowCondition(
    parsed: BPMNModel,
    flowId: string,
    expressionText: string,
    language: string = 'javascript',
  ): boolean {
    const flow = parsed.elementsById[flowId];
    if (!flow) return false;

    const flowEl = flow as any;

    const condition = this.moddle.create('bpmn:FormalExpression', {
      body: expressionText,
      'xsi:type': 'bpmn:tFormalExpression',
      language: language,
    });

    flowEl.conditionExpression = condition;
    return true;
  }

  /**
   * Служебный рекурсивный хелпер для поиска массива flowElements,
   * в котором физически находится целевой элемент (на верхнем уровне или внутри SubProcess).
   */
  private findParentFlowElementsList(
    definitions: any,
    targetElement: any,
  ): any[] | null {
    if (!definitions) return null;

    const rootElements = definitions.rootElements || [];

    for (const rootEl of rootElements) {
      if (rootEl.$type === 'bpmn:Process') {
        const result = this.searchElementInContainerRecursively(
          rootEl,
          targetElement,
        );
        if (result) return result;
      }
    }
    return null;
  }

  /**
   * Рекурсивный поиск внутри конкретного процесса или подпроцесса
   */
  private searchElementInContainerRecursively(
    container: any,
    targetElement: any,
  ): any[] | null {
    const flowElements = container.flowElements || [];

    // Если элемент найден в текущем контейнере, возвращаем ссылку на этот массив
    if (flowElements.includes(targetElement)) {
      return flowElements;
    }

    // Если не нашли, но в контейнере есть подпроцессы, уходим вглубь них
    for (const el of flowElements) {
      if (el.$type === 'bpmn:SubProcess') {
        const deepResult = this.searchElementInContainerRecursively(
          el,
          targetElement,
        );
        if (deepResult) return deepResult;
      }
    }

    return null;
  }

  /**
   * Удаляет элемент и все связанные SequenceFlow.
   */
  deleteElement(parsed: BPMNModel, elementId: string): boolean {
    const element = parsed.elementsById[elementId];
    if (!element) return false;

    // Нельзя удалять StartEvent и EndEvent
    if (
      element.$type === 'bpmn:StartEvent' ||
      element.$type === 'bpmn:EndEvent'
    ) {
      return false;
    }

    const elAny = element as any;

    // Безопасно копируем массивы связей, чтобы избежать проблем при их мутации во время цикла
    const incoming = Array.isArray(elAny.incoming) ? [...elAny.incoming] : [];
    const outgoing = Array.isArray(elAny.outgoing) ? [...elAny.outgoing] : [];

    // Удаляем все входящие и исходящие SequenceFlow
    for (const flow of [...incoming, ...outgoing]) {
      if (flow && flow.id) {
        this.deleteFlow(parsed, flow.id);
      }
    }

    // Находим родительский массив flowElements, где физически лежит этот элемент
    // Мы ищем по всей схеме (включая SubProcess), используя наш приватный хелпер
    const flowElementsList = this.findParentFlowElementsList(
      parsed.rootElement,
      element,
    );

    if (flowElementsList) {
      const idx = flowElementsList.indexOf(element);
      if (idx !== -1) {
        flowElementsList.splice(idx, 1);
      }
    }

    // Удаляем BPMNShape визуального отображения из диаграммы
    this.removeShapeFromDiagram(parsed, elementId);

    // Удаляем из встроенного плоского индекса
    delete parsed.elementsById[elementId];

    return true;
  }

  /**
   * Удаляет SequenceFlow и отвязывает его от source/target.
   */
  private deleteFlow(parsed: BPMNModel, flowId: string): boolean {
    const flow = parsed.elementsById[flowId];
    if (!flow || flow.$type !== 'bpmn:SequenceFlow') return false;

    const sf = flow as any;

    // Отвязываем от исходного элемента (sourceRef)
    const source = sf.sourceRef;
    if (source && Array.isArray(source.outgoing)) {
      const outIdx = source.outgoing.indexOf(flow);
      if (outIdx !== -1) source.outgoing.splice(outIdx, 1);
    }

    // Отвязываем от целевого элемента (targetRef)
    const target = sf.targetRef;
    if (target && Array.isArray(target.incoming)) {
      const inIdx = target.incoming.indexOf(flow);
      if (inIdx !== -1) target.incoming.splice(inIdx, 1);
    }

    // Удаляем визуальный BPMNEdge из диаграммы
    this.removeEdgeFromDiagram(parsed, flowId);

    // Находим родительский массив, где физически лежала эта стрелка, и удаляем из него
    const flowElementsList = this.findParentFlowElementsList(
      parsed.rootElement,
      flow,
    );
    if (flowElementsList) {
      const idx = flowElementsList.indexOf(flow);
      if (idx !== -1) {
        flowElementsList.splice(idx, 1);
      }
    }

    // Удаляем из встроенного плоского индекса
    delete parsed.elementsById[flowId];

    return true;
  }

  // ─── DI (Diagram Interchange) ──────────────────────────────

  /**
   * Получает BPMNPlane из корневого элемента схемы (Definitions).
   */
  private getPlane(parsed: BPMNModel) {
    // В bpmn-moddle диаграммы лежат в массиве diagrams прямо на rootElement
    const rootAny = parsed.rootElement as any;
    const diagrams = rootAny?.diagrams || [];
    if (!diagrams.length) return null;
    return diagrams[0]?.plane || null;
  }

  /**
   * Добавляет BPMNShape для элемента в диаграмму.
   */
  addShapeToDiagram(
    parsed: BPMNModel,
    elementId: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    const element = parsed.elementsById[elementId];
    if (!element) return;

    const plane = this.getPlane(parsed);
    if (!plane) return;

    const shapeId = `${elementId}_di`;

    const shape = this.moddle.create('bpmndi:BPMNShape', {
      id: shapeId,
      bpmnElement: element,
      bounds: this.moddle.create('dc:Bounds', {
        x: x,
        y: y,
        width: width,
        height: height,
      }),
    });

    // Инициализируем массив графических элементов плоскости, если его нет
    const planeElements = plane.get('planeElement') || [];
    planeElements.push(shape);
    plane.set('planeElement', planeElements);
  }

  /**
   * Удаляет BPMNShape для элемента из диаграммы.
   */
  private removeShapeFromDiagram(parsed: BPMNModel, elementId: string): void {
    const plane = this.getPlane(parsed);
    if (!plane) return;

    const shapeId = `${elementId}_di`;
    const planeElements = plane.get('planeElement') || [];

    const idx = planeElements.findIndex((el: any) => el.id === shapeId);
    if (idx !== -1) {
      planeElements.splice(idx, 1);
      plane.set('planeElement', planeElements);
    }
  }

  /**
   * Добавляет BPMNEdge для SequenceFlow в диаграмму.
   */
  addEdgeToDiagram(
    parsed: BPMNModel,
    flowId: string,
    waypoints: Array<{ x: number; y: number }>,
  ) {
    const flow = parsed.elementsById[flowId];
    if (!flow) return;

    const plane = this.getPlane(parsed);
    if (!plane) return;

    const edgeId = `${flowId}_di`;

    const points = waypoints.map((wp) =>
      this.moddle.create('dc:Point', { x: wp.x, y: wp.y }),
    );

    const edge = this.moddle.create('bpmndi:BPMNEdge', {
      id: edgeId,
      bpmnElement: flow,
      waypoint: points,
    });

    const planeElements = plane.get('planeElement') || [];
    planeElements.push(edge);
    plane.set('planeElement', planeElements);
  }

  /**
   * Удаляет BPMNEdge для SequenceFlow из диаграммы.
   */
  private removeEdgeFromDiagram(parsed: BPMNModel, flowId: string) {
    const plane = this.getPlane(parsed);
    if (!plane) return;

    const edgeId = `${flowId}_di`;
    const planeElements = plane.get('planeElement') || [];

    const idx = planeElements.findIndex((el: any) => el.id === edgeId);
    if (idx !== -1) {
      planeElements.splice(idx, 1);
      plane.set('planeElement', planeElements);
    }
  }
}

export const bpmnXmlService = new BpmnXmlService();
