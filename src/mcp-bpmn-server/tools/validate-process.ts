import { z } from 'zod';
import { defineTool } from '../../shared/utils/base.js';
import {
  runBackendValidation,
  buildValidationResult,
} from '../services/validation-utils.js';
import { successResponse, errorResponse } from './add-element/shared.js';

const ValidateProcessSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных для валидации'),
});

async function handleValidateProcess(args: { dataTypeId: string }) {
  try {
    const { success, error, validationResults } =
      await runBackendValidation(args.dataTypeId);

    if (!success) {
      return errorResponse(error || 'Ошибка валидации');
    }

    const result = buildValidationResult(validationResults);

    return successResponse({
      dataTypeId: args.dataTypeId,
      isValid: !result.hasErrors,
      hasWarnings: result.hasWarnings,
      summary: {
        totalErrors: result.errors.filter((e) => e.severity === 'error').length,
        totalWarnings: result.errors.filter((e) => e.severity === 'warning').length,
        totalDecisions: result.decisions.length,
        totalUnsupported: result.unsupported.length,
      },
      errors: result.errors,
      decisions: result.decisions,
      unsupported: result.unsupported,
      versionTag: validationResults?.versionTag,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Ошибка валидации процесса');
  }
}

export const validateProcessTools = [
  defineTool(
    'bpmn_validate_process',
    {
      title: 'Validate Process',
      description:
        'Запускает валидацию BPMN процесса на бэкенде. Возвращает ошибки (error/warning) с человекочитаемыми описаниями и инструментами для исправления, решения (decisions), и unsupported элементы. Используй после изменений для проверки корректности схемы.',
      inputSchema: ValidateProcessSchema,
    },
    handleValidateProcess,
  ),
];
