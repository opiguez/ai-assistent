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

export const CreateModuleSchema = BaseLowCodeSchema.extend({});

export const CreateDataTypeSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского модуля. Если модуль создается в этой же сессии, передай 'PENDING_MODULE_ID'.",
    ),
  lifecycle: z
    .string()
    .optional()
    .describe(
      "Идентификатор жизненного цикла (например, '/modules/Calculator/lifecycles/default', где /modules/${ИМЯ_МОДУЛЯ}/lifecycles/${ИМЯ_ЖИЗНЕННОГО_ЦИКЛА}'). для BPMN(процесс) не нужен",
    ),
  canHaveChildren: z
    .boolean()
    .default(false)
    .describe(
      'Может ли эта сущность иметь вложенные элементы (древовидная структура). Для BPMN(процесс) не нужен',
    ),
  description: z
    .string()
    .optional()
    .describe('Подробное описание сущности на русском языке.'),
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
    'FILE',
    'USER',
    'SELECTION',
    'OBJECT',
  ])
  .describe('Строгий системный тип данных поля согласно GraphQL схеме.');

export const CreateDataTypeFieldSchema = BaseLowCodeSchema.extend({
  dataTypeId: z
    .string()
    .describe(
      "ID типа данных. Если тип создается сейчас, передай 'PENDING_DATA_TYPE_ID'.",
    ),
  propertyType: FieldTypeEnum.describe(
    'Системный тип данных поля (например, STRING, INTEGER, BOOLEAN).',
  ),
  formula: z
    .string()
    .optional()
    .describe(
      'Поле для вычислений на основе других полей. Формат: [ИМЯ_ТИПА:ИМЯ_ПОЛЯ] - для  типа. [_common:ИМЯ_ПОЛЯ] - для модульного поля(префикс - _common). Пример [_common:test1] + [parentBpmnCalculator:test2])',
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
});

export const CreateModuleFieldSchema = BaseLowCodeSchema.extend({
  moduleId: z
    .string()
    .describe(
      "ID модуля. Если модуль создается сейчас, передай 'PENDING_MODULE_ID'.",
    ),
  formula: z
    .string()
    .optional()
    .describe(
      'Поле для вычислений на основе других полей. Формат: [ИМЯ_ТИПА:ИМЯ_ПОЛЯ] - для  типа. [ИМЯ_ПОЛЯ] - для модульного поля. Пример [_someNum] + [parentBpmnCalculator:test2])',
    ),
  propertyType: FieldTypeEnum.describe('Системный тип данных для общего поля.'),
  description: z
    .string()
    .optional()
    .describe('Описание назначения общего поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для всех сущностей модуля.'),
});
