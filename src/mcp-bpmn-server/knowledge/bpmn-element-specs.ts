/**
 * BPMN Element Specifications
 * Полный каталог элементов, доступных в.palette wf-modeler,
 * с описанием свойств, ограничений и панели свойств.
 */

// ─── Palette Elements ─────────────────────────────────────

export const PALETTE_ELEMENTS = {
  // ── Events ──
  'bpmn:StartEvent': {
    category: 'event',
    displayName: 'Start Event',
    description: 'Начало процесса. Один StartEvent обязателен.',
    customizableProperties: ['name', 'eventDefinitions'],
    canHaveBoundaryEvents: false,
    canBeInSubprocess: true,
    isInterrupting: true, // по умолчанию
  },
  'bpmn:StartEvent:Message': {
    category: 'event',
    displayName: 'De-archive Event',
    description:
      'Message StartEvent для деархивации. Только на верхнем уровне процесса.',
    customType: 'Dearchive',
    canBeInSubprocess: false,
    requiresParent: 'bpmn:Process',
  },
  'bpmn:EndEvent': {
    category: 'event',
    displayName: 'End Event',
    description: 'Завершение процесса.',
    customizableProperties: ['name'],
    canHaveBoundaryEvents: false,
  },
  'bpmn:IntermediateCatchEvent:Message': {
    category: 'event',
    displayName: 'Message Catch Event',
    description: 'Промежуточное событие перехвата сообщения.',
    eventDefinitionType: 'bpmn:MessageEventDefinition',
  },
  'bpmn:IntermediateThrowEvent:Message': {
    category: 'event',
    displayName: 'Message Throw Event',
    description: 'Промежуточное событие отправки сообщения.',
    eventDefinitionType: 'bpmn:MessageEventDefinition',
  },
  'bpmn:IntermediateCatchEvent:Timer': {
    category: 'event',
    displayName: 'Timer Catch Event',
    description: 'Промежуточное событие таймера.',
    eventDefinitionType: 'bpmn:TimerEventDefinition',
  },
  'bpmn:BoundaryEvent:Error': {
    category: 'event',
    displayName: 'Error Boundary Event',
    description: 'Граничное событие ошибки. Только для ServiceTask.',
    canAttachTo: ['bpmn:ServiceTask'],
    requiresAttachment: true,
  },

  // ── Activities ──
  'bpmn:UserTask': {
    category: 'activity',
    displayName: 'User Task',
    description:
      'Задача для пользователя. Поддерживает decisions, candidates, simplifiedView.',
    customizableProperties: ['name', 'candidateGroups', 'decisionsEnabled'],
    hasCustomPanel: 'NAME',
    supportsDecisions: true,
    supportsCandidates: true,
    supportsSimplifiedView: true,
  },
  'bpmn:SendTask': {
    category: 'activity',
    displayName: 'Send Task',
    description:
      'Отправка email уведомлений. Использует шаблоны (postTemplates).',
    customType: 'email', // по умолчанию, может быть KafkaMessage
    hasCustomPanel: 'NAME',
    supportsTemplate: true,
  },
  'bpmn:ScriptTask': {
    category: 'activity',
    displayName: 'Script Task',
    description: 'Скриптовая задача для автоматизации.',
    customizableProperties: ['scriptFormat', 'script'],
    hasCustomPanel: 'NAME',
  },
  'bpmn:ServiceTask:BM': {
    category: 'activity',
    displayName: 'BM Service Task',
    description: 'Сервисная задача для вызова внешних API (модуль + метод).',
    customType: 'BM Service Task',
    topic: 'BM Service Task',
    hasCustomPanel: 'NAME',
    supportsModuleConfig: true,
    supportsInputOutputMappings: true,
  },
  'bpmn:ServiceTask:Sync': {
    category: 'activity',
    displayName: 'Rabis Sync Task',
    description: 'Задача синхронизации с Rabis.',
    customType: 'Rabis Sync Task',
    topic: 'Rabis Sync Task',
    hasCustomPanel: 'NAME',
    supportsModuleConfig: true,
  },

  // ── Gateways ──
  'bpmn:ExclusiveGateway': {
    category: 'gateway',
    displayName: 'Exclusive Gateway',
    description:
      'Эксклюзивный шлюз. Используется для generic decision, NUMBERS и RDM структур. Замыкающий элемент перед следующим элементом',
    customizableProperties: ['name', 'default'],
    supportsDecisions: true,
    supportsRdmStructure: true,
    supportsRealNumber: true,
  },

  'bpmn:InclusiveGateway': {
    category: 'gateway',
    displayName: 'Inclusive Gateway',
    description:
      'Инклюзивный шлюз (OR). Параллельное слияние всех активных входов.',
    customizableProperties: ['name'],
  },

  // ── SubProcesses ──
  'bpmn:SubProcess': {
    category: 'activity',
    displayName: 'General Subprocess',
    description: 'Подпроцесс. Может содержать StartEvent/EndEvent.',
    triggeredByEvent: false,
    canHaveBoundaryEvents: true,
  },
  'bpmn:SubProcess:Triggered': {
    category: 'activity',
    displayName: 'Triggered-by-Event Subprocess',
    description: 'Подпроцесс, запускаемый событием.',
    triggeredByEvent: true,
  },
  'bpmn:SubProcess:Cancel': {
    category: 'activity',
    displayName: 'Cancel Message Subprocess',
    description: 'Подпроцесс для обработки Cancel событий.',
    customType: 'cancel',
    hasCancelDeleteEvents: true,
  },
  'bpmn:SubProcess:Delete': {
    category: 'activity',
    displayName: 'Delete Message Subprocess',
    description: 'Подпроцесс для обработки Delete событий.',
    customType: 'delete',
    hasCancelDeleteEvents: true,
  },
} as const;

// ─── Custom Model Properties ──────────────────────────────

export const CUSTOM_MODEL_PROPERTIES = {
  type: {
    description: 'Кастомный тип элемента',
    allowedValues: [
      'BM Service Task',
      'KafkaMessage',
      'Rabis Sync Task',
      'email',
    ],
  },
  DataTypeProperty: {
    description: 'Тип данных для Decision Gateway (rdmStructure | realNumber)',
    allowedValues: ['rdmStructure', 'realNumber'],
  },
  DataTypePropertyValue: {
    description: 'ID свойства типа данных, используемого для decision',
  },
  decisionsEnabled: {
    description: 'Включены ли generic decisions для UserTask',
    type: 'boolean',
  },
  // isManualTask: {
  //   description: 'Отрисовать UserTask как ManualTask',
  //   type: 'boolean',
  // },
  topic: {
    description: 'Kafka topic или service task topic',
    type: 'string',
  },
  template: {
    description: 'ID шаблона уведомления для SendTask',
    type: 'string',
  },
  name: {
    description:
      'Кастомная метка элемента (перезаписывает businessObject.name)',
    type: 'string',
  },
  simplifiedViewStep: {
    description: 'Номер шага в упрощённом представлении',
    type: 'number',
  },
  simplifiedViewSteps: {
    description: 'Массив шагов упрощённого представления',
    type: 'array',
  },
  isCancelEvent: {
    description: 'Является ли событие Cancel',
    type: 'boolean',
  },
  isDeleteEvent: {
    description: 'Является ли событие Delete',
    type: 'boolean',
  },
  isDearchiveEvent: {
    description: 'Является ли событие Dearchive',
    type: 'boolean',
  },
  eventName: {
    description: 'Имя события для message events',
    type: 'string',
  },
  messageId: {
    description: 'ID сообщения для message events',
    type: 'string',
  },
  rabisModel: {
    description: 'Временные данные при создании элемента',
    type: 'object',
  },
} as const;

// ─── Component Types (Panel Mapping) ──────────────────────

export const COMPONENT_TYPES = {
  NONE: 'NONE',
  NAME: 'NAME',
  DECISIONS: 'DECISIONS',
  REAL_NUMBER: 'REAL_NUMBER',
  DEARCHIVE_EVENT: 'DEARCHIVE_EVENT',
  TEXT_ANNOTATION: 'TEXT_ANNOTATION',
  RDM_STRUCTURE: 'RDM_STRUCTURE',
  DECISIONS_SELECT: 'DECISIONS_SELECT',
  DEFAULT_SEQUENCE_FLOW: 'DEFAULT_SEQUENCE_FLOW',
} as const;

// ─── Command Handlers ─────────────────────────────────────

export const COMMAND_HANDLERS = {
  serviceTask: {
    setModule: 'bpmn_add_element (params.targetModule)',
    setMethod: 'bpmn_add_element (params.targetService, params.targetMethod)',
    setThreadCount: 'bpmn_add_element (params.threadCount)',
    setConfig: 'bpmn_set_service_task_config',
  },
  decisions: {
    toggle: 'bpmn_toggle_decisions',
    assign: 'bpmn_connect_elements (conditionName)',
    change: 'bpmn_set_condition_expression (conditionName)',
  },
  rdmStructure: {
    assign: 'bpmn_set_rdm_structure',
  },
  simplifiedView: {
    toggle: 'bpmn_update_element_property (simplifiedViewStep)',
    setSteps: 'bpmn_update_element_property (simplifiedViewStep)',
  },
  messageEvent: {
    catchMessage: 'bpmn_set_message_event',
    throwMessage: 'bpmn_set_message_event',
    kafkaMessage: 'bpmn_set_message_event',
  },
  sendTask: {
    set: 'bpmn_set_send_task_template',
  },
} as const;
