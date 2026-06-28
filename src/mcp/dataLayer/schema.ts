import { z } from 'zod';

export const FieldTypeEnum = z.enum([
  'text',
  'number',
  'boolean',
  'datetime',
  'relation',
  'file',
  'dictionary',
  'json',
  'email',
  'password',
]);

export const CreateModuleSchema = z.object({
  name: z
    .string()
    .describe("Название модуля на русском (например, 'Складской учет')"),
  code: z
    .string()
    .describe("Уникальный код латиницей в camelCase (например, 'warehouse')"),
});

export const CreateDataTypeSchema = z.object({
  moduleId: z
    .string()
    .describe(
      "ID модуля. Если модуль создается в этой же сессии, передай 'PENDING_MODULE_ID'",
    ),
  workspaceId: z
    .string()
    .default('DEFAULT_WORKSPACE_ID')
    .describe(
      "ID рабочей области. По умолчанию используй 'DEFAULT_WORKSPACE_ID'",
    ),
  name: z.string().describe("Название сущности (например, 'Товар')"),
  code: z.string().describe("Код сущности латиницей (например, 'product')"),
  isHierarchical: z
    .boolean()
    .default(false)
    .describe(
      'True, если сущность имеет древовидную структуру (например, Категории)',
    ),
});

export const CreateDataTypeFieldSchema = z.object({
  dataTypeId: z
    .string()
    .describe(
      "ID типа данных. Если тип создается сейчас, передай 'PENDING_DATA_TYPE_ID'",
    ),
  name: z
    .string()
    .describe("Название поля на русском (например, 'Цена товара')"),
  code: z
    .string()
    .describe("Код поля латиницей в camelCase (например, 'price')"),
  fieldType: FieldTypeEnum.describe('Строгий системный тип данных поля'),
  isNullable: z
    .boolean()
    .default(true)
    .describe(
      'Может ли поле быть пустым. Если поле обязательное, передай false.',
    ),
});

export const CreateModuleFieldSchema = z.object({
  moduleId: z
    .string()
    .describe(
      "ID модуля. Если модуль создается сейчас, передай 'PENDING_MODULE_ID'",
    ),
  name: z
    .string()
    .describe("Название общего поля на русском (например, 'Дата создания')"),
  code: z
    .string()
    .describe("Код общего поля латиницей (например, 'createdAt')"),
  fieldType: FieldTypeEnum.describe('Системный тип данных для общего поля'),
});
