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
    customizableProperties: ['name', 'recipients', 'template'],
  },
  'bpmn:ScriptTask': {
    category: 'activity',
    displayName: 'Script Task',
    description:
      'Скриптовая задача для выполнения кастомной автоматизации (код выполняется на бэкенде платформы).',
    customizableProperties: ['name', 'scriptFormat', 'script'],
  },
  'bpmn:ServiceTask': {
    category: 'activity',
    displayName: 'BM Service Task',
    description:
      "Сервисная задача для вызова внешних методов API. Автоматически настраивает Camunda-расширения: camunda:type='external' и camunda:topic='BM Service Task'.",
    customizableProperties: [
      'name',
      'apiSpecGroupId',
      'targetModule',
      'targetService',
      'targetMethod',
      'threadCount',
    ],
  },

  // ── SubProcesses (Подпроцессы-контейнеры) ──
  'bpmn:SubProcess': {
    category: 'activity',
    displayName: 'General Subprocess',
    description:
      'Подпроцесс-контейнер. При создании автоматически генерирует внутри базовый шаблон: StartEvent -> SequenceFlow -> EndEvent.',
    customizableProperties: ['name'],
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
  messageEvent: {
    catchMessage: 'bpmn_set_message_event',
    throwMessage: 'bpmn_set_message_event',
    kafkaMessage: 'bpmn_set_message_event',
  },
  // Универсальный блок изменения простых Low-Code свойств и текстовых полей
  flatProperties: {
    updateProperty:
      'bpmn_update_element_property(dataTypeId, elementId, property, value)',
    allowedProperties: [
      'name',
      'simplifiedViewStep',
      'isCancelEvent',
      'isDeleteEvent',
      'isDearchiveEvent',
      'messageId',
      'eventName',
    ],
  },

  // ЖЁСТКОЕ СИСТЕМНОЕ ПРАВИЛО ДЛЯ ИИ (Архитектурное ограничение платформы)
  reconfigurationPolicy: {
    rule: 'Если пользователю необходимо изменить метод API (в ServiceTask), шаблон письма (в SendTask) или перепривязать шлюз к другому справочнику, ЗАПРЕЩЕНО использовать инструмент bpmn_update_element_property. Вместо этого примените атомарный сценарий пересоздания: 1. bpmn_delete_element -> 2. Вызов соответствующего add-инструмента с новыми техническими параметрами.',
  },

  serviceTask: {
    setModule: 'bpmn_add_service_task (params.targetModule)',
    setMethod:
      'bpmn_add_service_task (params.targetService, params.targetMethod)',
    setThreadCount: 'bpmn_add_service_task (params.threadCount)',
  },
  sendTask: {
    set: 'bpmn_add_send_task',
  },
  // simplifiedView: {
  //   toggle: 'bpmn_update_element_property (property: "simplifiedViewStep")',
  //   setSteps: 'bpmn_update_element_property (property: "simplifiedViewStep")',
  // },
} as const;
