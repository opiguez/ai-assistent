import { z } from 'zod';

export type ToolDef = {
  name: string;
  config: { title: string; description: string; inputSchema: z.ZodObject<any> };
  cb: (args: any) => Promise<any>;
};

export const BaseLowCodeSchema = z.object({
  displayName: z
    .string()
    .describe(
      "Понятное название сущности на русском языке (например, 'Калькулятор')",
    ),
  name: z
    .string()
    .describe(
      "Уникальное системное имя латиницей в camelCase или snake_case (например, 'calculator')",
    ),
  description: z
    .string()
    .optional()
    .describe(
      'Описание модуля на русском языке. Помогает ИИ-агенту понять назначение.',
    ),
});

export const DeleteByIdSchema = z.object({
  id: z.string().describe('ID сущности для удаления'),
});

export const ModuleIdSchema = z.object({
  moduleId: z.string().describe('ID модуля'),
});

export const ValidationResultsSchema = z.object({
  severity: z
    .string()
    .optional()
    .describe('Фильтр по severity (опционально)'),
});

export const PublishSchema = z.object({
  comment: z.string().describe('Комментарий к публикации'),
});
