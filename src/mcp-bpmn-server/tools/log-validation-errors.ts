import { z } from 'zod';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { defineTool } from '../../shared/utils/base.js';
import {
  runBackendValidation,
  buildValidationResult,
} from '../services/validation-utils.js';

const LogValidationErrorsSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных для валидации'),
});

const ERRORS_DIR = join(process.cwd(), 'validation-errors');

async function handleLogValidationErrors(args: { dataTypeId: string }) {
  try {
    if (!existsSync(ERRORS_DIR)) {
      mkdirSync(ERRORS_DIR, { recursive: true });
    }

    const { success, error, validationResults, processData } = await runBackendValidation(args.dataTypeId);

    if (!processData.bpmnXml) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `BPMN XML пуст для dataTypeId="${args.dataTypeId}"`,
            }),
          },
        ],
      };
    }

    const result = buildValidationResult(validationResults);

    const logEntry = {
      dataTypeId: args.dataTypeId,
      name: processData.name,
      displayName: processData.displayName,
      timestamp: new Date().toISOString(),
      backendSuccess: success,
      backendError: error || null,
      summary: {
        totalErrors: result.errors.filter((e) => e.severity === 'error').length,
        totalWarnings: result.errors.filter((e) => e.severity === 'warning').length,
        uniqueElements: [...new Set(result.errors.map((p) => p.elementId))].length,
      },
      raw: validationResults || null,
      parsed: result.errors,
    };

    const filePath = join(ERRORS_DIR, `${args.dataTypeId}.json`);
    writeFileSync(filePath, JSON.stringify(logEntry, null, 2), 'utf-8');

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              status: 'success',
              dataTypeId: args.dataTypeId,
              name: processData.name,
              filePath,
              summary: logEntry.summary,
              errors: result.errors.filter((e) => e.severity === 'error').slice(0, 10).map((e) => ({
                elementId: e.elementId,
                elementType: e.elementType,
                attribute: e.attribute,
                message: e.message,
                humanMessage: e.humanMessage,
                fixAction: e.fixAction,
                fixTool: e.fixTool,
              })),
              warnings: result.errors.filter((e) => e.severity === 'warning').slice(0, 5).map((w) => ({
                elementId: w.elementId,
                attribute: w.attribute,
                message: w.message,
                humanMessage: w.humanMessage,
              })),
              message: `Валидация сохранена в ${filePath}. Ошибок: ${logEntry.summary.totalErrors}, предупреждений: ${logEntry.summary.totalWarnings}`,
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
            message: e?.message || 'Ошибка логирования валидации',
          }),
        },
      ],
    };
  }
}

export const logValidationErrorsTools = [
  defineTool(
    'bpmn_log_validation_errors',
    {
      title: 'Log Validation Errors',
      description:
        'Запускает backend валидацию BPMN процесса и сохраняет полный ответ (raw + parsed) в файл validation-errors/{dataTypeId}.json. Включает человекочитаемые описания ошибок и инструменты для исправления. Используй для сбора ошибок валидации и анализа паттернов.',
      inputSchema: LogValidationErrorsSchema,
    },
    handleLogValidationErrors,
  ),
];
