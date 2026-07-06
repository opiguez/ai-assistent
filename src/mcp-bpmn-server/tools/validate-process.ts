import { z } from 'zod';
import { defineTool } from '../../shared/utils/base.js';
import {
  runBackendValidation,
  buildValidationResult,
} from '../services/validation-utils.js';

const ValidateProcessSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных для валидации'),
});

async function handleValidateProcess(args: { dataTypeId: string }) {
  try {
    const { success, error, validationResults, processData } = await runBackendValidation(args.dataTypeId);

    if (!success) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: error || 'Ошибка валидации',
            }),
          },
        ],
      };
    }

    const result = buildValidationResult(validationResults);

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              status: 'success',
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
            },
            null,
            2,
          ),
        },
      ],
    };
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: e?.message || 'Ошибка валидации процесса',
          }),
        },
      ],
    };
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
