/**
 * Custom BPMN Rules
 * Правила валидации из Rules.js wf-modeler + backend validation.
 * AI должен знать эти правила для корректного проектирования
 * и минимизации итераций с бэкендом.
 */

export const BPMN_RULES = {
  /**
   * Запрет удаления элементов.
   */
  delete: {
    neverDelete: [
      'bpmn:Process',
    ],
    subProcessRestrictions: {
      description: 'Внутри SubProcess нельзя удалять StartEvent/EndEvent',
      noDelete: ['bpmn:StartEvent', 'bpmn:EndEvent'],
      cancelDeleteException: 'Если есть Cancel/Delete события — нельзя удалять их',
    },
    decisionElements: {
      description: 'Элементы决策 (UserTask с decisionsEnabled + ExclusiveGateway + SequenceFlow) нельзя удалять',
      protected: 'UserTask с decisionsEnabled, ExclusiveGateway подключённый к нему, SequenceFlow между ними',
    },
    customStructureElements: {
      description: 'Элементы custom structure (ExclusiveGateway/InclusiveGateway с DataTypeProperty + их SequenceFlow) нельзя удалять',
      protected: 'Gateway с DataTypeProperty, SequenceFlow исходящая из него',
    },
    labels: {
      description: 'Labels нельзя удалять напрямую',
    },
  },

  /**
   * Запрет изменения типа элемента.
   */
  changeType: {
    exclusiveGatewayInDecisions: {
      description: 'ExclusiveGateway, входящая в который идёт от UserTask с decisionsEnabled — нельзя менять тип',
    },
  },

  /**
   * Создание связей.
   */
  connection: {
    start: {
      taskSingleOutgoing: {
        description: 'Task может иметь только одну исходящую non-Association связь',
      },
      decisionsEnabled: {
        description: 'Нельзя создавать исходящие связи из элемента с decisionsEnabled',
      },
    },
    create: {
      decisionsEnabled: {
        description: 'Нельзя создавать связи из элемента с decisionsEnabled',
      },
      boundaryEventNoIncoming: {
        description: 'BoundaryEvent не может иметь входящих связей при создании',
      },
    },
  },

  /**
   * Создание элементов.
   */
  shape: {
    boundaryEventOnServiceTask: {
      description: 'Error Boundary Event можно прикрепить ТОЛЬКО к ServiceTask',
      allowedHosts: ['bpmn:ServiceTask'],
    },
    nonInterruptingStartEvent: {
      description: 'Non-interrupting StartEvent в SubProcess нельзя создавать через drag',
    },
    dearchiveInSubProcess: {
      description: 'Dearchive Event нельзя создавать внутри SubProcess',
    },
    cancelDeleteDrag: {
      description: 'Cancel/Delete события нельзя создавать через drag',
    },
    intermediateEvents: {
      description: 'IntermediateThrowEvent/CatchEvent можно прикрепить только к Process/SubProcess/SequenceFlow',
      allowedTargets: ['bpmn:Process', 'bpmn:SubProcess', 'bpmn:SequenceFlow'],
    },
    boundaryReattach: {
      description: 'BoundaryEvent нельзя переприкрепить к другому элементу',
    },
  },

  /**
   * Direct edit (двойной клик).
   */
  directEdit: {
    disabled: [
      'Decision SequenceFlow',
      'SendTask',
      'Custom Structure SequenceFlow',
    ],
  },
};

/**
 * Структурные правила процесса.
 * Эти правила НЕ проверяются Rules.js, но ловятся backend валидацией.
 * Знание их экономит итерации.
 */
export const STRUCTURAL_RULES = {
  /**
   * Обязательные элементы.
   */
  required: {
    startEvent: {
      description: 'Процесс ОБЯЗАН иметь ровно 1 StartEvent',
      count: 1,
      appliesTo: 'bpmn:Process',
      errorIf: 'count !== 1',
    },
    endEvent: {
      description: 'Процесс ОБЯЗАН иметь ровно 1 EndEvent',
      count: 1,
      appliesTo: 'bpmn:Process',
      errorIf: 'count !== 1',
    },
  },

  /**
   * Ограничения на количество элементов.
   */
  limits: {
    startEventOnMain: {
      description: 'На основном процессе (не SubProcess) — ровно 1 StartEvent',
      maxCount: 1,
      appliesTo: 'bpmn:StartEvent',
      parentType: 'bpmn:Process',
    },
    endEventOnMain: {
      description: 'На основном процессе — ровно 1 EndEvent',
      maxCount: 1,
      appliesTo: 'bpmn:EndEvent',
      parentType: 'bpmn:Process',
    },
    startEventInSubProcess: {
      description: 'Внутри SubProcess — минимум 1 StartEvent',
      minCount: 1,
      appliesTo: 'bpmn:StartEvent',
      parentType: 'bpmn:SubProcess',
    },
    endEventInSubProcess: {
      description: 'Внутри SubProcess — минимум 1 EndEvent',
      minCount: 1,
      appliesTo: 'bpmn:EndEvent',
      parentType: 'bpmn:SubProcess',
    },
  },

  /**
   * Связность процесса.
   */
  connectivity: {
    allElementsReachable: {
      description: 'Все элементы должны быть связаны SequenceFlow от StartEvent до EndEvent',
      errorIf: 'unreachable elements exist',
    },
    noOrphanElements: {
      description: 'Не должно быть элементов без входящих И исходящих связей (кроме StartEvent/EndEvent)',
      exception: 'StartEvent — без incoming, EndEvent — без outgoing',
    },
    taskConnections: {
      description: 'Task (UserTask, SendTask, ScriptTask, ServiceTask) должен иметь ровно 1 incoming и 1 outgoing SequenceFlow',
      errorIf: 'incoming !== 1 || outgoing !== 1',
      exceptions: ['StartEvent (0 incoming)', 'EndEvent (0 outgoing)', 'Gateway (может иметь несколько)'],
    },
  },

  /**
   * Типовые ошибки backend валидации.
   * Каждая ошибка — объект с описанием, порогом, fix action и инструментом.
   */
  commonBackendErrors: {
    missingStartEvent: {
      description: 'Процесс не имеет StartEvent',
      threshold: 'count === 0',
      fix: 'Добавить StartEvent через палитру',
      tool: 'bpmn_get_process_schema',
    },
    missingEndEvent: {
      description: 'Процесс не имеет EndEvent',
      threshold: 'count === 0',
      fix: 'Добавить EndEvent через палитру',
      tool: 'bpmn_get_process_schema',
    },
    multipleStartEvents: {
      description: 'Процесс имеет более 1 StartEvent',
      threshold: 'count > 1',
      fix: 'Оставить только один StartEvent',
      tool: 'bpmn_get_process_schema',
    },
    multipleEndEvents: {
      description: 'Процесс имеет более 1 EndEvent',
      threshold: 'count > 1',
      fix: 'Оставить только один EndEvent',
      tool: 'bpmn_get_process_schema',
    },
    disconnectedElement: {
      description: 'Элемент не связан с процессом',
      fix: 'Добавить SequenceFlow для подключения элемента',
      tool: 'bpmn_get_process_topology',
    },
    orphanTask: {
      description: 'Task без входящей или исходящей связи',
      fix: 'Добавить SequenceFlow к/от Task',
      tool: 'bpmn_get_process_topology',
    },
    invalidGateway: {
      description: 'Gateway без исходящих связей или с менее чем 2',
      threshold: 'outgoing < 2',
      fix: 'Добавить SequenceFlow от Gateway (минимум 2)',
      tool: 'bpmn_get_process_schema',
    },
    missingCondition: {
      description: 'SequenceFlow от Gateway без conditionExpression',
      fix: 'Добавить условие через bpmn_set_condition_expression',
      tool: 'bpmn_set_condition_expression',
    },
    invalidDecision: {
      description: 'ExclusiveGateway с decisions без корректных условий',
      fix: 'Проверить SequenceFlow от ExclusiveGateway — каждая должна иметь условие',
      tool: 'bpmn_set_condition_expression',
    },
    sendTaskNoTemplate: {
      description: 'SendTask без привязки к шаблону',
      fix: 'Настроить шаблон через bpmn_set_send_task_template',
      tool: 'bpmn_set_send_task_template',
    },
    serviceTaskNoApi: {
      description: 'ServiceTask без привязки к API',
      fix: 'Настроить API через bpmn_set_service_task_config',
      tool: 'bpmn_set_service_task_config',
    },
    tooManyOutgoingConnections: {
      description: 'Gateway с слишком большим количеством исходящих рёбер',
      fix: 'Уменьшить количество исходящих SequenceFlow или использовать другой тип шлюза',
      tool: 'bpmn_get_process_schema',
    },
    decisionGatewayNotAfterUserTask: {
      description: 'ExclusiveGateway для decisions должен быть сразу после UserTask',
      fix: 'Подключить ExclusiveGateway напрямую к UserTask или использовать свой gateway',
      tool: 'bpmn_toggle_decisions',
    },
    candidateGroupOnlyOne: {
      description: 'Разрешена только 1 группа пользователей для UserTask',
      fix: 'Оставить только одну candidateGroups',
      tool: 'bpmn_update_element_property',
    },
    requiredAttributeAbsent: {
      description: 'Обязательный атрибут не заполнен',
      fix: 'Заполнить обязательный атрибут в свойствах элемента',
      tool: 'bpmn_update_element_property',
    },
    duplicates: {
      description: 'Дубликаты элементов или значений',
      fix: 'Удалить дубликаты или переименовать их',
      tool: 'bpmn_get_process_schema',
    },
    moreThanOneDearchiveEvent: {
      description: 'Разрешено только одно событие Dearchive',
      fix: 'Оставить только одно Dearchive Event на верхнем уровне',
      tool: 'bpmn_get_process_schema',
    },
    dearchiveInSubProcess: {
      description: 'Dearchive Event не поддерживается в SubProcess',
      fix: 'Перенести Dearchive Event на верхний уровень процесса',
      tool: 'bpmn_get_process_schema',
    },
  },
};

/**
 * Описания типичных конфигураций элементов.
 */
export const ELEMENT_CONFIGURATIONS = {
  userTaskWithDecisions: {
    description: 'UserTask с generic decisions',
    steps: [
      '1. Создать UserTask',
      '2. Включить decisionsEnabled через rabis.decisions.toggle',
      '3. Создать ExclusiveGateway (автоматически создаётся)',
      '4. Создать SequenceFlow от UserTask к ExclusiveGateway',
      '5. ExclusiveGateway автоматически получает outgoing для каждого решения',
      '6. Назначить имена через rabis.decisions.assign',
    ],
  },
  serviceTaskWithApi: {
    description: 'ServiceTask привязанная к API',
    steps: [
      '1. Создать ServiceTask (topic: "BM Service Task")',
      '2. Настроить модуль через bm.serviceTask.setModule',
      '3. Настроить метод через bm.serviceTask.setMethod',
      '4. Настроить input/output mappings если нужно',
    ],
  },
  gatewayWithRdmStructure: {
    description: 'ExclusiveGateway с RDM структурой',
    steps: [
      '1. Создать ExclusiveGateway',
      '2. Назначить DataTypeProperty = "rdmStructure" через bm.rdmStructure.assign',
      '3. Назначить DataTypePropertyValue (ID свойства типа данных)',
      '4. SequenceFlow автоматически получают условия на основе RDM объектов',
    ],
  },
  sendTaskWithEmail: {
    description: 'SendTask для email уведомлений',
    steps: [
      '1. Создать SendTask',
      '2. Выбрать шаблон из postTemplates через bm.sendTask.set',
      '3. SendTask автоматически получает имя из шаблона',
    ],
  },
  subprocessWithCancelDelete: {
    description: 'SubProcess с Cancel/Delete событиями',
    steps: [
      '1. Создать Cancel Message Subprocess или Delete Message Subprocess из палитры',
      '2. SubProcess автоматически создаётся с message StartEvent',
      '3. StartEvent получает Cancel_/Delete_ префикс в имени сообщения',
      '4. Внутри SubProcess НЕЛЬЗЯ создавать StartEvent/EndEvent вручную',
    ],
  },
};
