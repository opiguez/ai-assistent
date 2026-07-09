/**
 * Shared Constraint Utils
 * Общая логика проверки ограничений для get-element-properties и get-element-constraints.
 */

import { BpmnProcessState } from './bpmn-schema.service.js';
import { ModdleElement } from './bpmn-xml.service.js';

// ─── Types ────────────────────────────────────────────────

export interface ConstraintResult {
  allowed: boolean;
  reason?: string;
  details?: any;
}

// ─── Shared Constraint Checks ─────────────────────────────

export function checkAllConstraints(
  element: ModdleElement,
  modelElementProps: Record<string, any>,
  state: BpmnProcessState,
): Record<string, ConstraintResult> {
  return {
    delete: checkDelete(element, modelElementProps, state),
    connect: checkConnect(element, modelElementProps),
    changeType: checkChangeType(element, state),
    addBoundaryEvent: checkAddBoundaryEvent(element),
    directEdit: checkDirectEdit(element, state),
    addDecision: checkAddDecision(element, modelElementProps),
    addGatewayStructure: checkAddGatewayStructure(element, modelElementProps),
  };
}

/**
 * Проверяет ограничение для операции над элементом.
 */
export function checkConstraint(
  operation: string,
  element: ModdleElement,
  modelElementProps: Record<string, any>,
  state: BpmnProcessState,
): ConstraintResult {
  switch (operation) {
    case 'delete':
      return checkDelete(element, modelElementProps, state);
    case 'connect':
      return checkConnect(element, modelElementProps);
    case 'changeType':
      return checkChangeType(element, state);
    case 'addBoundaryEvent':
      return checkAddBoundaryEvent(element);
    case 'directEdit':
      return checkDirectEdit(element, state);
    case 'addDecision':
      return checkAddDecision(element, modelElementProps);
    case 'addGatewayStructure':
      return checkAddGatewayStructure(element, modelElementProps);
    default:
      return { allowed: true };
  }
}

function checkDelete(
  element: ModdleElement,
  modelElementProps: Record<string, any>,
  state: BpmnProcessState,
): ConstraintResult {
  const type = element.$type;

  if (type === 'bpmn:Process') {
    return {
      allowed: false,
      reason: 'Нельзя удалить корневой элемент Process',
    };
  }

  // ОГРАНИЧЕНИЕ ПЛАТФОРМЫ: Запрещаем удалять единственный корневой Старт и Конец
  if (element.$parent?.$type !== 'bpmn:SubProcess') {
    if (type === 'bpmn:StartEvent') {
      return {
        allowed: false,
        reason: 'Нельзя удалить главное стартовое событие процесса',
      };
    }
    if (type === 'bpmn:EndEvent') {
      return {
        allowed: false,
        reason: 'Нельзя удалить главное конечное событие процесса',
      };
    }
  }

  if (type === 'bpmn:SequenceFlow') {
    const sourceRef = element.get('sourceRef');
    if (sourceRef) {
      const sourceDecor = state.model[sourceRef.id] || {};
      if (sourceDecor.DataTypeProperty) {
        return {
          allowed: false,
          reason: `Нельзя удалить ветку SequenceFlow напрямую. Она привязана к условиям шлюза "${sourceRef.id}" (${sourceDecor.DataTypeProperty}).`,
        };
      }
    }
  }

  if (
    modelElementProps.decisionsEnabled &&
    modelElementProps.decisionsUnused?.length > 0
  ) {
    return {
      allowed: false,
      reason:
        'Нельзя удалить UserTask, пока не будут удалены или сброшены её решения (decisions)',
    };
  }

  if (
    (type === 'bpmn:ExclusiveGateway' || type === 'bpmn:InclusiveGateway') &&
    modelElementProps.DataTypeProperty
  ) {
    return {
      allowed: false,
      reason: `Нельзя удалить шлюз "${element.id}", так как на нем настроена структура условий (${modelElementProps.DataTypeProperty}). Сначала сбросьте структуру шлюза.`,
    };
  }

  if (element.$parent?.$type === 'bpmn:SubProcess') {
    if (type === 'bpmn:StartEvent' || type === 'bpmn:EndEvent') {
      return {
        allowed: false,
        reason:
          'Нельзя удалить встроенные StartEvent/EndEvent внутри SubProcess',
      };
    }
  }

  return { allowed: true };
}

function checkConnect(
  element: ModdleElement,
  modelElementProps: Record<string, any>,
): ConstraintResult {
  const type = element.$type;

  // ИСПРАВЛЕНО: Логика для UserTask в режиме решений (Decisions)
  if (type === 'bpmn:UserTask' && modelElementProps.decisionsEnabled) {
    const outgoing = element.get('outgoing') || [];
    // Из задачи с кнопками может выходить ТЕХНИЧЕСКИ ровно одна стрелка — к шлюзу распределения
    if (outgoing.length >= 1) {
      return {
        allowed: false,
        reason:
          'Для этого UserTask включены Decisions. Из неё может выходить только одна главная стрелка к шлюзу (ExclusiveGateway). Все остальные ветки условий должны тянуться уже ИЗ самого шлюза!',
      };
    }
  }

  // Стандартное ограничение BPMN: из обычной задачи не может выходить веер стрелок
  if (type?.includes('Task') && !modelElementProps.decisionsEnabled) {
    const outgoing = element.get('outgoing') || [];
    const nonAssociation = outgoing.filter(
      (sf: any) => sf.$type !== 'bpmn:Association',
    );
    if (nonAssociation.length > 0) {
      return {
        allowed: false,
        reason:
          'Обычная задача (Task) может иметь только одну исходящую связь. Для разветвления логики используйте шлюзы (Gateway).',
      };
    }
  }

  return { allowed: true };
}

function checkChangeType(
  element: ModdleElement,
  state: BpmnProcessState,
): ConstraintResult {
  if (
    element.$type === 'bpmn:ExclusiveGateway' ||
    element.$type === 'bpmn:InclusiveGateway'
  ) {
    const incoming = element.get('incoming') || [];
    for (const sf of incoming) {
      const source = sf.get('sourceRef');
      if (source?.$type === 'bpmn:UserTask') {
        const srcModel = state.model[source.id] || {};
        if (srcModel.decisionsEnabled) {
          return {
            allowed: false,
            reason:
              'Нельзя изменять тип шлюза, так как он принимает поток решений (decisions) от UserTask',
          };
        }
      }
    }
  }

  return { allowed: true };
}

function checkAddBoundaryEvent(element: ModdleElement): ConstraintResult {
  // Ограничение платформы: вешаем ошибки только на системные таски интеграций
  if (element.$type !== 'bpmn:ServiceTask') {
    return {
      allowed: false,
      reason:
        'Error Boundary Event можно прикрепить ТОЛЬКО к ServiceTask API-интеграции',
    };
  }
  return { allowed: true };
}

function checkDirectEdit(
  element: ModdleElement,
  state: BpmnProcessState,
): ConstraintResult {
  if (
    element.$type === 'bpmn:SendTask' ||
    element.$type === 'bpmn:ScriptTask'
  ) {
    return {
      allowed: false,
      reason:
        'Прямое редактирование текста запрещено. Используйте специализированные инструменты настройки параметров',
    };
  }

  if (element.$type === 'bpmn:SequenceFlow') {
    const source = element.get('sourceRef');
    if (
      source &&
      (source.$type === 'bpmn:ExclusiveGateway' ||
        source.$type === 'bpmn:InclusiveGateway')
    ) {
      const incoming = source.get('incoming') || [];
      for (const sf of incoming) {
        const src = sf.get('sourceRef');
        if (src?.$type === 'bpmn:UserTask') {
          const srcModel = state.model[src.id] || {};
          if (srcModel.decisionsEnabled) {
            return {
              allowed: false,
              reason:
                'Прямое изменение текста запрещено для линий решений шлюза (Decision SequenceFlow)',
            };
          }
        }
      }
    }
  }

  return { allowed: true };
}

function checkAddDecision(
  element: ModdleElement,
  modelElementProps: Record<string, any>,
): ConstraintResult {
  if (element.$type !== 'bpmn:UserTask') {
    return {
      allowed: false,
      reason:
        'Решения (Decisions) можно активировать только на элементе bpmn:UserTask',
    };
  }

  if (modelElementProps.decisionsEnabled) {
    return {
      allowed: false,
      reason: 'Режим решений уже активирован на этой пользовательской задаче',
    };
  }

  return { allowed: true };
}

function checkAddGatewayStructure(
  element: ModdleElement,
  modelElementProps: Record<string, any>,
): ConstraintResult {
  const type = element.$type;

  if (type !== 'bpmn:ExclusiveGateway' && type !== 'bpmn:InclusiveGateway') {
    return {
      allowed: false,
      reason:
        'Структуру условий (RDM или Number) можно назначить только на Exclusive или Inclusive Gateway',
    };
  }

  if (modelElementProps.DataTypeProperty) {
    const currentType =
      modelElementProps.DataTypeProperty === 'realNumber'
        ? 'Числовая (realNumber)'
        : 'Справочник (rdmStructure)';
    return {
      allowed: false,
      reason: `На шлюз "${element.id}" уже назначена структура условий: [${currentType}]. Повторная конфигурация запрещена. Сначала очистите или удалите элемент.`,
    };
  }

  return { allowed: true };
}
