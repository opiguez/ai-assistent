/**
 * BPMN Element Specifications
 * Полный каталог элементов, доступных в.palette wf-modeler,
 * с описанием свойств, ограничений и панели свойств.
 */

// ─── Palette Elements ─────────────────────────────────────

export const PALETTE_ELEMENTS = {
  // ── Events (События) ──
  'bpmn:StartEvent': {
    category: 'event',
    displayName: 'Start Event',
    description:
      'Начало процесса. По правилам платформы на схеме допускается строго один StartEvent.',
    customizableProperties: ['name'],
    canBeInSubprocess: true,
  },
  'bpmn:EndEvent': {
    category: 'event',
    displayName: 'End Event',
    description:
      'Завершение процесса. По правилам платформы на схеме допускается строго один EndEvent.',
    customizableProperties: ['name'],
    canBeInSubprocess: true,
  },
  'bpmn:IntermediateCatchEvent': {
    category: 'event',
    displayName: 'Intermediate Catch Event',
    description:
      'Промежуточное событие перехвата (ожидания). Создает базовый каркас. Конкретный тип (Таймер/Сообщение) настраивается следующим шагом.',
    customizableProperties: ['name'],
  },
  'bpmn:IntermediateThrowEvent': {
    category: 'event',
    displayName: 'Intermediate Throw Event',
    description:
      'Промежуточное генерирующее событие (отправка сигнала/сообщения). Создает базовый каркас.',
    customizableProperties: ['name'],
  },
  'bpmn:BoundaryEvent': {
    category: 'event',
    displayName: 'Boundary Event',
    description:
      'Граничное промежуточное событие. Обязательно прикрепляется к контексту родительской задачи (Task или SubProcess).',
    customizableProperties: ['name', 'attachedToRef'],
  },

  // ── Gateways (Шлюзы) ──
  'bpmn:ExclusiveGateway': {
    category: 'gateway',
    displayName: 'Exclusive Gateway',
    description:
      'Эксклюзивный шлюз. Используется для ветвления логики: generic decision (на основе UserTask), NUMBERS (числовые условия) и RDM структур. Или как (merge) замыкающий элемент перед следующим шагом процесса.',
    customizableProperties: ['name'],
  },

  'bpmn:InclusiveGateway': {
    category: 'gateway',
    displayName: 'Inclusive Gateway',
    description:
      'Включающий шлюз (развилка OR). Может активировать одну или несколько веток одновременно.',
    customizableProperties: ['name'],
  },

  // ── Activities (Задачи) ──
  'bpmn:UserTask': {
    category: 'activity',
    displayName: 'User Task',
    description:
      'Задача, выполняемая пользователем вручную в интерфейсе Low-Code платформы. Требует назначения исполнителей и привязки экранных форм.',
    customizableProperties: [
      'name',
      'assignee',
      'navigateView',
      'editView',
      'require',
    ],
  },
  'bpmn:SendTask': {
    category: 'activity',
    displayName: 'Send Task',
    description:
      'Компонент отправки email-уведомлений. Позволяет задавать топики, получателей и использовать готовые шаблоны писем.',
    customizableProperties: [
      'name',
      'sendTaskType',
      'sendTaskTopic',
      'sendTaskRecipients',
      'sendTaskTemplate',
    ],
  },
  'bpmn:ScriptTask': {
    category: 'activity',
    displayName: 'Script Task',
    description:
      'Скриптовая задача для выполнения кастомной автоматизации (код выполняется на бэкенде платформы).',
    customizableProperties: ['name', 'scriptFormat', 'script'],
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
    description: 'Тип данных для Gateway (rdmStructure | realNumber)',
    allowedValues: ['rdmStructure', 'realNumber'],
  },
  DataTypePropertyValue: {
    description: 'ID свойства типа данных, используемого для Gateway',
  },
  genericDecisionsEnabled: {
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
  GENERIC_DECISIONS: 'GENERIC_DECISIONS',
  REAL_NUMBER: 'REAL_NUMBER',
  DEARCHIVE_EVENT: 'DEARCHIVE_EVENT',
  TEXT_ANNOTATION: 'TEXT_ANNOTATION',
  RDM_STRUCTURE: 'RDM_STRUCTURE',
  DEFAULT_SEQUENCE_FLOW: 'DEFAULT_SEQUENCE_FLOW',
} as const;

// ─── Command Handlers ─────────────────────────────────────

export const COMMAND_HANDLERS = {
  genericDecisions: {
    toggle: 'bpmn_toggle_decisions',
    assign: 'bpmn_connect_elements',
    change: 'bpmn_set_condition_expression',
  },
  rdmOrNumberGatewayStructure: {
    setStructure: 'bpmn_set_rdm_or_number_structure',
    assign: 'bpmn_connect_elements',
    change: 'bpmn_set_condition_expression',
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
