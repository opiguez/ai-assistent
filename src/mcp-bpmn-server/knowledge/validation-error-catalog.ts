export interface ValidationErrorEntry {
  message: { ru: string; en: string };
  fix: { ru: string; en: string };
  tool?: string;
  severity: 'error' | 'warning';
  category:
    | 'structure'
    | 'element'
    | 'decision'
    | 'data'
    | 'expression'
    | 'workflow';
}

export const VALIDATION_ERROR_CATALOG: Record<string, ValidationErrorEntry> = {
  // ─── Structure ────────────────────────────────────────────
  'system.dse.wf.validation.result.no_definitions': {
    message: { ru: '{{0}} не существует', en: '{{0}} does not exist' },
    fix: {
      ru: 'Добавить {{0}} через палитру элементов',
      en: 'Add {{0}} from the element palette',
    },
    severity: 'error',
    category: 'structure',
  },
  'system.dse.wf.validation.result.too_many_definitions': {
    message: {
      ru: 'Слишком много исходящих связей из элемента {{0}}',
      en: 'Too many outgoing connections from {{0}}',
    },
    fix: {
      ru: 'Уменьшить количество исходящих SequenceFlow или использовать другой тип шлюза',
      en: 'Reduce the number of outgoing SequenceFlows or use a different gateway type',
    },
    tool: 'bpmn_get_process_schema',
    severity: 'error',
    category: 'structure',
  },

  // ─── Elements ─────────────────────────────────────────────
  'system.dse.wf.validation.result.required_attribute_is_absent': {
    message: {
      ru: 'Атрибут "{{0}}" не заполнен',
      en: 'Attribute "{{0}}" is not filled in',
    },
    fix: {
      ru: 'Заполнить обязательный атрибут "{{0}}" в свойствах элемента',
      en: 'Fill in the required attribute "{{0}}" in element properties',
    },
    tool: 'bpmn_update_element_property',
    severity: 'error',
    category: 'element',
  },
  'system.dse.wf.validation.result.required_name_is_empty': {
    message: {
      ru: 'Обязательное поле "{{0}}" не заполнено',
      en: 'Required "{{0}}" is not filled in',
    },
    fix: {
      ru: 'Заполнить имя элемента через bpmn_update_element_property c property - name',
      en: 'Fill in the element name via bpmn_update_element_property with property - name',
    },
    tool: 'bpmn_update_element_property',
    severity: 'error',
    category: 'element',
  },
  'system.dse.wf.validation.result.required_attributes_or_are_absent': {
    message: {
      ru: 'Атрибуты "{{0}}" или "{{1}}" не заполнены',
      en: 'Attributes "{{0}}" or "{{1}}" are not filled in',
    },
    fix: {
      ru: 'Заполнить хотя бы один из атрибутов: "{{0}}" или "{{1}}"',
      en: 'Fill in at least one of the attributes: "{{0}}" or "{{1}}"',
    },
    severity: 'error',
    category: 'element',
  },
  'system.dse.wf.validation.result.attribute_is_unsupported': {
    message: {
      ru: 'Атрибут "{{0}}" со значением "{{1}}" не поддерживается',
      en: 'Attribute "{{0}}" with value "{{1}}" is not supported',
    },
    fix: {
      ru: 'Изменить значение атрибута "{{0}}" на поддерживаемое',
      en: 'Change the value of attribute "{{0}}" to a supported one',
    },
    severity: 'error',
    category: 'element',
  },
  'system.dse.wf.validation.result.wrong_type_of_gateway_with_incoming_and_outgoing_flows':
    {
      message: {
        ru: 'Неправильный тип шлюза с {{0}} входящим и {{1}} исходящим потоками',
        en: 'Wrong type of gateway with {{0}} incoming and {{1}} outgoing flows',
      },
      fix: {
        ru: 'Проверить тип шлюза — возможно нужен ExclusiveGateway, InclusiveGateway или ParallelGateway',
        en: 'Check gateway type — may need ExclusiveGateway, InclusiveGateway, or ParallelGateway',
      },
      severity: 'error',
      category: 'element',
    },

  // ─── Decisions ────────────────────────────────────────────
  'system.dse.wf.validation.result.decision_must_be_located_immediately_after_usertask':
    {
      message: {
        ru: 'Решение должно быть размещено после пользовательской задачи "{{0}}"',
        en: 'Decision must be placed after user task "{{0}}"',
      },
      fix: {
        ru: 'ExclusiveGateway для decisions должен быть подключён напрямую к UserTask. Можно использовать свой gateway, но если decisions выбирались через UI — ExclusiveGateway должен идти сразу после UserTask',
        en: 'ExclusiveGateway for decisions must be connected directly to UserTask. You can use your own gateway, but if decisions were selected via UI — ExclusiveGateway must be placed immediately after UserTask',
      },
      tool: 'bpmn_toggle_decisions',
      severity: 'error',
      category: 'decision',
    },
  'system.dse.wf.validation.result.another_usertask_is_connected_to_same_forkgateway':
    {
      message: {
        ru: 'Другая пользовательская задача "{{0}}" подключена к тому же шлюзу разветвления',
        en: 'Another user task "{{0}}" is connected to the same fork gateway',
      },
      fix: {
        ru: 'Каждый ExclusiveGateway для decisions должен обслуживать только одну UserTask. Создайте отдельный gateway для другой UserTask',
        en: 'Each ExclusiveGateway for decisions must serve only one UserTask. Create a separate gateway for the other UserTask',
      },
      severity: 'error',
      category: 'decision',
    },
  'system.dse.wf.validation.result.there_is_no_gateway_to_setup_generic_decisions_branch':
    {
      message: {
        ru: 'Нет потоков последовательности для обработки значений: {{0}}',
        en: 'There are no sequence flows to process values: {{0}}',
      },
      fix: {
        ru: 'Создать SequenceFlow от ExclusiveGateway к целевым элементам для каждого варианта решения',
        en: 'Create SequenceFlow from ExclusiveGateway to target elements for each decision option',
      },
      tool: 'bpmn_toggle_decisions',
      severity: 'error',
      category: 'decision',
    },
  'system.dse.wf.validation.result.decision_expressions_use_different_variables':
    {
      message: {
        ru: 'В решениях используются разные переменные: {{0}}',
        en: 'Decisions use different variables: {{0}}',
      },
      fix: {
        ru: 'Все SequenceFlow от ExclusiveGateway для decisions должны использовать одну переменную',
        en: 'All SequenceFlows from ExclusiveGateway for decisions must use the same variable',
      },
      severity: 'error',
      category: 'decision',
    },
  'system.dse.wf.validation.result.the_expression_of_is_triggered_by_value_as_well_as_the_expression_of':
    {
      message: {
        ru: 'Условие для "{{0}}" запускается тем же значением {{1}}, что и условие для "{{2}}"',
        en: 'Condition for "{{0}}" is triggered by the same value {{1}} as the condition for "{{2}}"',
      },
      fix: {
        ru: 'Условия на SequenceFlow должны быть уникальными — каждое значение должно соответствовать одному варианту',
        en: 'Conditions on SequenceFlows must be unique — each value should correspond to one option',
      },
      severity: 'error',
      category: 'decision',
    },

  // ─── Data ─────────────────────────────────────────────────
  'system.dse.wf.validation.result.no_custom_structure_for_id': {
    message: {
      ru: 'Справочная запись для идентификатора {{0}} не существует',
      en: 'Reference record for id {{0}} does not exist',
    },
    fix: {
      ru: 'Проверить DataTypePropertyValue — указанный ID не найден в RDM структуре',
      en: 'Check DataTypePropertyValue — the specified ID was not found in the RDM structure',
    },
    tool: 'bpmn_set_rdm_or_number_structure',
    severity: 'error',
    category: 'data',
  },
  'system.dse.wf.validation.result.cs_doesnt_contain_custom_object': {
    message: {
      ru: '{{0}}({{1}}) не содержит объект RDM {{2}}',
      en: '{{0}}({{1}}) does not contain RDM object {{2}}',
    },
    fix: {
      ru: 'RDM структура не содержит указанный объект. Проверьте привязку к RDM структуре',
      en: 'RDM structure does not contain the specified object. Check the RDM structure binding',
    },
    tool: 'bpmn_set_rdm_or_number_structure',
    severity: 'error',
    category: 'data',
  },
  'system.dse.wf.validation.result.value_is_used': {
    message: { ru: '{{0}} уже используется', en: '{{0}} is already in use' },
    fix: {
      ru: 'Использовать уникальное значение для этого поля',
      en: 'Use a unique value for this field',
    },
    severity: 'error',
    category: 'data',
  },
  'system.dse.wf.validation.result.duplicates': {
    message: { ru: 'Дубликаты "{{0}}"', en: 'Duplicates "{{0}}"' },
    fix: {
      ru: 'Удалить дублирующиеся элементы или переименовать их',
      en: 'Remove or rename duplicate elements',
    },
    severity: 'error',
    category: 'data',
  },
  'system.dse.wf.validation.result.conflicts_with': {
    message: {
      ru: '{{0}} конфликтует с {{1}}',
      en: '{{0}} conflicts with {{1}}',
    },
    fix: {
      ru: 'Устранить конфликт между {{0}} и {{1}}',
      en: 'Resolve the conflict between {{0}} and {{1}}',
    },
    severity: 'error',
    category: 'data',
  },

  // ─── Expression ───────────────────────────────────────────
  'system.dse.wf.validation.result.branch_must_be_compared_with_numeric_value':
    {
      message: {
        ru: 'Условие для {{0}} должно содержать числовое значение',
        en: 'Condition for {{0}} must contain numeric value',
      },
      fix: {
        ru: 'Изменить условие на SequenceFlow — сравнение должно быть с числовым значением',
        en: 'Change the condition on SequenceFlow — comparison must be with a numeric value',
      },
      tool: 'bpmn_set_condition_expression',
      severity: 'error',
      category: 'expression',
    },
  'system.dse.wf.validation.result.wrong_format_of_expression': {
    message: {
      ru: 'Неверный формат выражения',
      en: 'Wrong format of expression',
    },
    fix: {
      ru: 'Проверить формат FEEL-выражения на SequenceFlow',
      en: 'Check the FEEL expression format on SequenceFlow',
    },
    tool: 'bpmn_set_condition_expression',
    severity: 'error',
    category: 'expression',
  },
  'system.dse.wf.validation.result.unsupported_type_of_expression': {
    message: {
      ru: 'Неподдерживаемый тип "{{0}}" выражения "{{1}}"',
      en: 'Unsupported type "{{0}}" of expression "{{1}}"',
    },
    fix: {
      ru: 'Использовать поддерживаемый тип выражения',
      en: 'Use a supported expression type',
    },
    tool: 'bpmn_set_condition_expression',
    severity: 'error',
    category: 'expression',
  },
  'system.dse.wf.validation.result.there_is_no_default_branch_to_process_values':
    {
      message: {
        ru: 'Нет потоков последовательности для обработки значений: {{0}}',
        en: 'There are no sequence flows to process values: {{0}}',
      },
      fix: {
        ru: 'Добавить SequenceFlow для необработанных значений или сделать дефолтную ветку',
        en: 'Add SequenceFlow for unhandled values or create a default branch',
      },
      severity: 'error',
      category: 'expression',
    },

  // ─── Workflow ─────────────────────────────────────────────
  'system.dse.wf.validation.result.no_workflow_defined': {
    message: { ru: 'Рабочий процесс не определен', en: 'No workflow defined' },
    fix: {
      ru: 'Добавить элементы процесса через палитру (StartEvent → Tasks → EndEvent)',
      en: 'Add process elements from the palette (StartEvent → Tasks → EndEvent)',
    },
    severity: 'error',
    category: 'workflow',
  },
  'system.dse.wf.validation.result.workflow_is_inactive': {
    message: { ru: 'Рабочий процесс неактивен', en: 'Workflow is inactive' },
    fix: {
      ru: 'Активировать рабочий процесс в настройках',
      en: 'Activate the workflow in settings',
    },
    severity: 'error',
    category: 'workflow',
  },
  'system.dse.wf.validation.result.simplified_step_doesnt_exist': {
    message: {
      ru: 'Этот шаг рабочего процесса не назначен шагу упрощенного представления',
      en: 'This workflow step is not assigned to a step of simplified view',
    },
    fix: {
      ru: 'Назначить шаг процесса на шаг упрощённого представления',
      en: 'Assign the workflow step to a simplified view step',
    },
    severity: 'warning',
    category: 'workflow',
  },
  'system.dse.wf.validation.result.step_from_simplified_view_is_not_assigned': {
    message: {
      ru: 'Шаг из упрощенного представления не назначен',
      en: 'Step from simplified view is not assigned',
    },
    fix: {
      ru: 'Назначить шаг упрощённого представления на элемент процесса',
      en: 'Assign the simplified view step to a process element',
    },
    severity: 'warning',
    category: 'workflow',
  },
  'system.dse.wf.validation.result.more_than_one_dearchive_event': {
    message: {
      ru: 'Разрешено только одно событие разархивирования',
      en: 'More than one Dearchive event found',
    },
    fix: {
      ru: 'Оставить только одно событие Dearchive Event на верхнем уровне процесса',
      en: 'Keep only one Dearchive Event at the top level of the process',
    },
    severity: 'error',
    category: 'workflow',
  },
  'system.dse.wf.validation.result.unsupported_dearchive_event_in_subprocess': {
    message: {
      ru: 'Событие разархивирования не поддерживается внутри SubProcess',
      en: 'Unsupported Dearchive event in subprocess found',
    },
    fix: {
      ru: 'Перенести Dearchive Event на верхний уровень процесса (вне SubProcess)',
      en: 'Move Dearchive Event to the top level of the process (outside SubProcess)',
    },
    severity: 'error',
    category: 'workflow',
  },

  // ─── Gateway ──────────────────────────────────────────────
  'system.dse.wf.validation.result.gateway_type_is_incompatible_with': {
    message: {
      ru: 'Шлюз типа {{0}} несовместим с {{1}}',
      en: 'The gateway of {{0}} type is incompatible with {{1}}',
    },
    fix: {
      ru: 'Проверить тип шлюза — возможно нужен другой тип (Exclusive/Inclusive/Parallel)',
      en: 'Check gateway type — may need a different type (Exclusive/Inclusive/Parallel)',
    },
    severity: 'error',
    category: 'element',
  },

  // ─── ServiceTask ──────────────────────────────────────────
  'system.dse.wf.validation.result.service_task_required_input_param_is_absent':
    {
      message: {
        ru: 'Для сервисной задачи не определены входные параметры',
        en: 'No input parameters are defined for the service task',
      },
      fix: {
        ru: 'Настроить входные параметры ServiceTask через bpmn_set_service_task_config',
        en: 'Configure ServiceTask input parameters via bpmn_set_service_task_config',
      },
      tool: 'bpmn_set_service_task_config',
      severity: 'warning',
      category: 'element',
    },
  'system.dse.wf.validation.result.method_doesnt_exist': {
    message: {
      ru: 'Метод {{0}}.{{1}} не существует',
      en: 'Method {{0}}.{{1}} does not exist',
    },
    fix: {
      ru: 'Проверить привязку ServiceTask к API — метод не найден. Обратитесь в поддержку',
      en: 'Check ServiceTask API binding — method not found. Contact support',
    },
    tool: 'bpmn_set_service_task_config',
    severity: 'error',
    category: 'element',
  },

  // ─── Candidate Groups ─────────────────────────────────────
  'system.dse.wf.validation.result.candidate_group_defines_n_groups': {
    message: {
      ru: 'Разрешена только 1 группа пользователей',
      en: 'Only 1 user group is allowed',
    },
    fix: {
      ru: 'Оставить только одну candidateGroups для UserTask',
      en: 'Keep only one candidateGroups for UserTask',
    },
    severity: 'error',
    category: 'element',
  },

  // ─── Model Parse ──────────────────────────────────────────
  'system.dse.wf.validation.result.model_parse_error': {
    message: {
      ru: 'Произошла ошибка при анализе XML-модели: {{0}}',
      en: 'An error occurred while parsing XML model: {{0}}',
    },
    fix: {
      ru: 'Проверить BPMN XML на корректность — возможно повреждена структура',
      en: 'Check BPMN XML for correctness — structure may be corrupted',
    },
    severity: 'error',
    category: 'structure',
  },
  'system.dse.wf.validation.result.incorrect_type_of': {
    message: { ru: 'Неверный тип "{{0}}"', en: 'Invalid type of "{{0}}"' },
    fix: {
      ru: 'Проверить тип элемента — возможно нужен другой тип',
      en: 'Check element type — may need a different type',
    },
    severity: 'error',
    category: 'element',
  },
  'system.dse.wf.validation.result.with_does_not_exists': {
    message: {
      ru: '{{0}} с {{1}} не существует',
      en: '{{0}} with {{1}} does not exist',
    },
    fix: {
      ru: 'Проверить ссылку — указанный объект не найден',
      en: 'Check the reference — the specified object was not found',
    },
    severity: 'error',
    category: 'data',
  },
  'system.dse.wf.validation.result.is_mapped_to_the_key_same_to': {
    message: {
      ru: '{{0}} сопоставлен ключу {{1}}, такому же, как {{2}}',
      en: '{{0}} is mapped to the key {{1}} same as {{2}}',
    },
    fix: {
      ru: 'Ключи маппинга должны быть уникальными',
      en: 'Mapping keys must be unique',
    },
    severity: 'error',
    category: 'data',
  },

  // ─── Metadata ─────────────────────────────────────────────
  'metadata.dataType.multipleRoots': {
    message: {
      ru: 'Тип данных "{{0}}" содержится в нескольких иерархиях корневых типов "{{1}}"',
      en: 'Data type "{{0}}" is contained in several hierarchies of root types "{{1}}"',
    },
    fix: {
      ru: 'Убрать тип данных из одной из иерархий корневых типов',
      en: 'Remove the data type from one of the root type hierarchies',
    },
    severity: 'error',
    category: 'data',
  },
  'metadata.dataType.hasObjects': {
    message: {
      ru: 'В приложении есть созданные объекты типа "{{0}}". Удалите объекты или выберите другой корневой тип',
      en: 'Application has created objects of type "{{0}}". Delete the objects or select another root type',
    },
    fix: {
      ru: 'Удалить объекты типа или сменить корневой тип данных',
      en: 'Delete objects of the type or change the root data type',
    },
    severity: 'error',
    category: 'data',
  },
  'metadata.dataType.containsRoot': {
    message: {
      ru: 'Тип данных "{{0}}" не должен содержать корневой тип данных "{{1}}"',
      en: 'Data type "{{0}}" must not contain the root data type "{{1}}"',
    },
    fix: {
      ru: 'Исключить корневой тип данных из списка дочерних',
      en: 'Exclude the root data type from the list of children',
    },
    severity: 'error',
    category: 'data',
  },
  'metadata.dataType.constraintChildren': {
    message: {
      ru: 'Тип данных "{{0}}" должен иметь ограниченный список потомков',
      en: 'Data type "{{0}}" must have a limited list of descendants',
    },
    fix: {
      ru: 'Настроить ограничения на дочерние типы данных',
      en: 'Configure constraints on child data types',
    },
    severity: 'error',
    category: 'data',
  },
  'metadata.dataType.versionable': {
    message: {
      ru: 'У типа данных "{{0}}" должно быть включено Версионирование',
      en: 'Data type "{{0}}" must have Versioning enabled',
    },
    fix: {
      ru: 'Включить Версионирование в настройках типа данных',
      en: 'Enable Versioning in data type settings',
    },
    severity: 'error',
    category: 'data',
  },
  'metadata.dataType.containsSelf': {
    message: {
      ru: 'Тип данных "{{0}}" содержит себя в разрешённых дочерних типах',
      en: 'Data type "{{0}}" contains itself in the allowed child types',
    },
    fix: {
      ru: 'Убрать тип данных из списка собственных дочерних типов',
      en: 'Remove the data type from its own list of child types',
    },
    severity: 'error',
    category: 'data',
  },
  'metadata.dataType.cantСlean': {
    message: {
      ru: 'Удаляемый тип данных "{{0}}" из "{{1}}" содержит дочерние элементы',
      en: 'Data type "{{0}}" to be deleted from "{{1}}" contains child elements',
    },
    fix: {
      ru: 'Сначала очистить дочерние элементы типа данных',
      en: 'First clear the child elements of the data type',
    },
    severity: 'error',
    category: 'data',
  },
  'metadata.dataType.hasUnusedView': {
    message: {
      ru: 'Тип данных "{{0}}" содержит неиспользованное представление "{{1}}"',
      en: 'Data type "{{0}}" contains an unused view "{{1}}"',
    },
    fix: {
      ru: 'Удалить неиспользуемое представление или привязать его к элементу',
      en: 'Remove the unused view or bind it to an element',
    },
    severity: 'warning',
    category: 'data',
  },
};
