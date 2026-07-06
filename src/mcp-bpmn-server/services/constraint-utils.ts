/**
 * Shared Constraint Utils
 * Общая логика проверки ограничений для get-element-properties и get-element-constraints.
 */

// ─── Types ────────────────────────────────────────────────

export interface ConstraintResult {
  allowed: boolean;
  reason?: string;
  details?: any;
}

// ─── Shared Constraint Checks ─────────────────────────────

/**
 * Проверяет ограничение для операции над элементом.
 */
export function checkConstraint(
  operation: string,
  element: any,
  modelProps: any,
  state: any,
): ConstraintResult {
  switch (operation) {
    case 'delete':
      return checkDelete(element, modelProps, state);
    case 'connect':
      return checkConnect(element, modelProps, state);
    case 'changeType':
      return checkChangeType(element, modelProps, state);
    case 'addBoundaryEvent':
      return checkAddBoundaryEvent(element);
    case 'directEdit':
      return checkDirectEdit(element, modelProps, state);
    case 'addDecision':
      return checkAddDecision(element, modelProps, state);
    case 'addRdmStructure':
      return checkAddRdmStructure(element, modelProps, state);
    default:
      return { allowed: true };
  }
}

/**
 * Проверяет все ограничения элемента и возвращает объект с флагами.
 */
export function checkAllConstraints(
  element: any,
  modelProps: any,
  state: any,
): Record<string, ConstraintResult> {
  return {
    delete: checkDelete(element, modelProps, state),
    connect: checkConnect(element, modelProps, state),
    changeType: checkChangeType(element, modelProps, state),
    addBoundaryEvent: checkAddBoundaryEvent(element),
    directEdit: checkDirectEdit(element, modelProps, state),
    addDecision: checkAddDecision(element, modelProps, state),
    addRdmStructure: checkAddRdmStructure(element, modelProps, state),
  };
}

// ─── Individual Checks ────────────────────────────────────

function checkDelete(
  element: any,
  modelProps: any,
  state: any,
): ConstraintResult {
  const type = element.$type;

  if (type === 'bpmn:Process') {
    return { allowed: false, reason: 'Нельзя удалить корневой элемент Process' };
  }

  if (
    type === 'bpmn:SequenceFlow' &&
    modelProps.DataTypeProperty
  ) {
    return {
      allowed: false,
      reason: 'Нельзя удалить SequenceFlow, входящую в Custom Structure Gateway',
    };
  }

  if (modelProps.decisionsEnabled) {
    return {
      allowed: false,
      reason: 'Нельзя удалить UserTask с включёнными decisions',
    };
  }

  if (type === 'bpmn:ExclusiveGateway' && modelProps.DataTypeProperty) {
    return {
      allowed: false,
      reason: 'Нельзя удалить Gateway с DataTypeProperty (Custom Structure)',
    };
  }

  // SubProcess restrictions
  if (element.parent?.$type === 'bpmn:SubProcess') {
    if (type === 'bpmn:StartEvent' || type === 'bpmn:EndEvent') {
      return {
        allowed: false,
        reason: 'Нельзя удалить StartEvent/EndEvent внутри SubProcess',
      };
    }
  }

  return { allowed: true };
}

function checkConnect(
  element: any,
  modelProps: any,
  state: any,
): ConstraintResult {
  if (modelProps.decisionsEnabled) {
    return {
      allowed: false,
      reason: 'Нельзя создавать связи из элемента с decisionsEnabled',
    };
  }

  // Task can have only one outgoing non-Association
  if (
    element.$type?.includes('Task') &&
    element.get('outgoing')?.length > 0
  ) {
    const nonAssociation = element
      .get('outgoing')
      .filter((sf: any) => sf.$type !== 'bpmn:Association');
    if (nonAssociation.length > 0) {
      return {
        allowed: false,
        reason: 'Task может иметь только одну исходящую non-Association связь',
      };
    }
  }

  return { allowed: true };
}

function checkChangeType(
  element: any,
  modelProps: any,
  state: any,
): ConstraintResult {
  if (element.$type === 'bpmn:ExclusiveGateway') {
    const incoming = element.get('incoming') || [];
    for (const sf of incoming) {
      const source = sf.get('sourceRef');
      if (source?.$type === 'bpmn:UserTask') {
        const srcModel = state.model[source.id] || {};
        if (srcModel.decisionsEnabled) {
          return {
            allowed: false,
            reason: 'Нельзя менять тип ExclusiveGateway, входящая от UserTask с decisions',
          };
        }
      }
    }
  }

  return { allowed: true };
}

function checkAddBoundaryEvent(
  element: any,
): ConstraintResult {
  if (element.$type !== 'bpmn:ServiceTask') {
    return {
      allowed: false,
      reason: 'Error Boundary Event можно прикрепить ТОЛЬКО к ServiceTask',
    };
  }
  return { allowed: true };
}

function checkDirectEdit(
  element: any,
  modelProps: any,
  state: any,
): ConstraintResult {
  if (element.$type === 'bpmn:SendTask') {
    return {
      allowed: false,
      reason: 'Direct edit запрещён для SendTask',
    };
  }

  // Decision sequence flow
  if (element.$type === 'bpmn:SequenceFlow') {
    const source = element.get('sourceRef');
    if (source?.$type === 'bpmn:ExclusiveGateway') {
      const incoming = source.get('incoming') || [];
      for (const sf of incoming) {
        const src = sf.get('sourceRef');
        if (src?.$type === 'bpmn:UserTask') {
          const srcModel = state.model[src.id] || {};
          if (srcModel.decisionsEnabled) {
            return {
              allowed: false,
              reason: 'Direct edit запрещён для Decision SequenceFlow',
            };
          }
        }
      }
    }
  }

  return { allowed: true };
}

function checkAddDecision(
  element: any,
  modelProps: any,
  state: any,
): ConstraintResult {
  if (element.$type !== 'bpmn:UserTask') {
    return {
      allowed: false,
      reason: 'Decisions можно добавить только на UserTask',
    };
  }

  if (modelProps.decisionsEnabled) {
    return {
      allowed: false,
      reason: 'Decisions уже включены на этом UserTask',
    };
  }

  return { allowed: true };
}

function checkAddRdmStructure(
  element: any,
  modelProps: any,
  state: any,
): ConstraintResult {
  const type = element.$type;

  if (
    type !== 'bpmn:ExclusiveGateway' &&
    type !== 'bpmn:InclusiveGateway'
  ) {
    return {
      allowed: false,
      reason: 'RDM Structure можно назначить только на Exclusive/Inclusive Gateway',
    };
  }

  if (modelProps.DataTypeProperty) {
    return {
      allowed: false,
      reason: 'DataTypeProperty уже назначен на этот Gateway',
    };
  }

  return { allowed: true };
}
