import { z } from 'zod';

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

export const FieldTypeEnum = z
  .enum([
    'STRING',
    'TEXT',
    'INTEGER',
    'DECIMAL',
    'BOOLEAN',
    'DATE',
    'DATETIME',
    'TIME',
    'FILE',
    'FILES',
    'SELECTION',
    'MULTI_SELECTION',
    'DATA_OBJECT',
    'DATA_OBJECTS',
    'USER',
    'USERS',
    'SEQUENCE',
    'ATTRIBUTES',
  ])
  .describe('Системный тип данных поля согласно GraphQL PropertyTypeEnum.');
