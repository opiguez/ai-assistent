/**
 * Custom BPMN Rules
 * AI должен знать эти правила для корректного проектирования
 * и минимизации итераций с бэкендом.
 */

export const BPMN_RULES = {
  /**
   * Запрет удаления элементов.
   */
  delete: {
    neverDelete: ['bpmn:Process'],
    subProcessRestrictions: {
      description: 'Внутри SubProcess нельзя удалять StartEvent/EndEvent',
      noDelete: ['bpmn:StartEvent', 'bpmn:EndEvent'],
      cancelDeleteException:
        'Если есть Cancel/Delete события — нельзя удалять их',
    },
  },

  /**
   * Запрет изменения типа элемента.
   */
  changeType: {
    exclusiveGatewayInGenericDecisions: {
      description:
        'ExclusiveGateway, входящая в который идёт от UserTask с decisionsEnabled — нельзя менять тип',
    },
  },

  /**
   * Создание связей.
   */
  connection: {
    start: {
      taskSingleOutgoing: {
        description:
          'Task может иметь только одну исходящую non-Association связь',
      },
      decisionsEnabled: {
        description:
          'Нельзя создавать исходящие связи из элемента с decisionsEnabled, только в gateway',
      },
    },
    create: {
      decisionsEnabled: {
        description:
          'Нельзя создавать связи из элемента с decisionsEnabled, только в gateway ',
      },
      boundaryEventNoIncoming: {
        description:
          'BoundaryEvent не может иметь входящих связей при создании',
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
    dearchiveInSubProcess: {
      description: 'Dearchive Event нельзя создавать внутри SubProcess',
    },
    intermediateEvents: {
      description:
        'IntermediateThrowEvent/CatchEvent можно прикрепить только к Process/SubProcess/SequenceFlow',
      allowedTargets: ['bpmn:Process', 'bpmn:SubProcess', 'bpmn:SequenceFlow'],
    },
    boundaryReattach: {
      description: 'BoundaryEvent нельзя переприкрепить к другому элементу',
    },
  },
};

/**
 * Структурные правила процесса.
 * Ловятся backend валидацией.
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
      description:
        'Все элементы должны быть связаны SequenceFlow от StartEvent до EndEvent',
      errorIf: 'unreachable elements exist',
    },
    noOrphanElements: {
      description:
        'Не должно быть элементов без входящих И исходящих связей (кроме StartEvent/EndEvent)',
      exception: 'StartEvent — без incoming, EndEvent — без outgoing',
    },
    taskConnections: {
      description:
        'Task (UserTask, SendTask, ScriptTask, ServiceTask) должен иметь ровно 1 incoming и 1 outgoing SequenceFlow',
      errorIf: 'incoming !== 1 || outgoing !== 1',
      exceptions: [
        'StartEvent (0 incoming)',
        'EndEvent (0 outgoing)',
        'Gateway (может иметь несколько)',
      ],
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
    tooManyOutgoingConnections: {
      description: 'Gateway с слишком большим количеством исходящих рёбер',
      fix: 'Уменьшить количество исходящих SequenceFlow или использовать другой тип шлюза',
      tool: 'bpmn_get_process_schema',
    },
    decisionGatewayNotAfterUserTask: {
      description:
        'ExclusiveGateway для decisions должен быть сразу после UserTask',
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
