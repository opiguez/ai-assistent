/**
 * Shared Validation Utils
 * Общая логика валидации для validate-process и log-validation-errors.
 */
import { bpmnSchemaService } from './bpmn-schema.service.js';
import { VALIDATION_ERROR_CATALOG } from '../knowledge/validation-error-catalog.js';

// ─── Types ────────────────────────────────────────────────

export interface ValidationError {
  elementId: string;
  elementType: string;
  severity: string;
  attribute: string;
  message: string;
  messageParams: string[];
  humanMessage?: string;
  fixAction?: string;
  fixTool?: string;
}

export interface ValidationDecision {
  gatewayId: string;
  type: string;
  variableName: string;
  customObjectNamesToOutgoing: any;
  ignoredDecisions: string[];
  decisionNameToOutgoing: any;
}

export interface ValidationResult {
  errors: ValidationError[];
  decisions: ValidationDecision[];
  unsupported: Array<{ id: string; type: string }>;
  hasErrors: boolean;
  hasWarnings: boolean;
}

// ─── Shared Functions ─────────────────────────────────────

/**
 * Запускает backend валидацию процесса.
 * Загружает данные и сохраняет (для триггера валидации).
 */
export async function runBackendValidation(dataTypeId: string) {
  const processData = await bpmnSchemaService.loadProcessData(dataTypeId);

  if (!processData.bpmnXml) {
    return { success: false, error: 'BPMN XML пуст', processData, validationResults: null };
  }

  const result = await bpmnSchemaService.saveProcess({
    dataTypeId,
    xml: processData.bpmnXml,
    decor: processData.decorJson,
  });

  return { ...result, processData };
}

/**
 * Парсит результаты валидации из backend ответа.
 * Рекурсивно обходит дерево элементов.
 */
export function parseValidationResults(
  element: any,
  errors: ValidationError[],
  decisions: ValidationDecision[],
  unsupported: Array<{ id: string; type: string }>,
  parent?: any,
) {
  if (!element) return;

  const id = element.id || parent?.id || '0';
  const type = element['@type'];

  // Собираем ошибки
  if (element.validationResults && element.validationResults.length > 0) {
    for (const vr of element.validationResults) {
      const entry: ValidationError = {
        elementId: id,
        elementType: type,
        severity: vr.severity,
        attribute: vr.attrName,
        message: vr.message,
        messageParams: vr.messageParams || [],
      };

      // Маппинг из каталога
      const catalogEntry = VALIDATION_ERROR_CATALOG[vr.message];
      if (catalogEntry) {
        entry.humanMessage = replaceParams(catalogEntry.message.ru, vr.messageParams);
        entry.fixAction = replaceParams(catalogEntry.fix.ru, vr.messageParams);
        entry.fixTool = catalogEntry.tool;
      }

      errors.push(entry);
    }
  }

  // Собираем решения (decisions)
  if (element.decision) {
    decisions.push({
      gatewayId: element.decision.gatewayId || id,
      type: element.decision.type,
      variableName: element.decision.variableName,
      customObjectNamesToOutgoing: element.decision.customObjectNamesToOutgoing,
      ignoredDecisions: element.decision.ignoredDecisions || [],
      decisionNameToOutgoing: element.decision.decisionNameToOutgoing || [],
    });
  }

  // Unsupported элементы
  if (type && type.toLowerCase() === 'unsupported' && element.id) {
    unsupported.push({
      id: element.id,
      type: element['@type'],
    });
  }

  // Рекурсивно обходим дочерние элементы
  if (element.elements) {
    for (const child of element.elements) {
      parseValidationResults(child, errors, decisions, unsupported, element);
    }
  }
}

/**
 * Заменяет {{0}}, {{1}} и т.д. на значения из messageParams.
 */
function replaceParams(template: string, params: string[]): string {
  return template.replace(/\{\{(\d+)\}\}/g, (_, index) => {
    const i = parseInt(index, 10);
    return params[i] !== undefined ? params[i] : `{{${index}}}`;
  });
}

/**
 * Формирует итоговый результат валидации.
 */
export function buildValidationResult(rawResult: any): ValidationResult {
  const errors: ValidationError[] = [];
  const decisions: ValidationDecision[] = [];
  const unsupported: Array<{ id: string; type: string }> = [];

  const vr = rawResult.validationResults;
  if (vr && vr.validationResults) {
    parseValidationResults(vr.validationResults, errors, decisions, unsupported);
  }

  return {
    errors,
    decisions,
    unsupported,
    hasErrors: errors.some((e) => e.severity === 'error'),
    hasWarnings: errors.some((e) => e.severity === 'warning'),
  };
}
