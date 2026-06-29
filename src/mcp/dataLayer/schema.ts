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

// СХЕМА ДЛЯ ОБЫЧНОГО/ДОЧЕРНЕГО ТИПА ДАННЫХ
export const CreateDataTypeSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского модуля или родительской сущности. Если модуль создается в этой же сессии, передай 'PENDING_MODULE_ID'.",
    ),
  lifecycle: z
    .string()
    .optional()
    .describe(
      "Идентификатор жизненного цикла. Строгий формат: '/modules/ИМЯ_МОДУЛЯ/lifecycles/ИМЯ_ЦИКЛА' (например, '/modules/Calculator/lifecycles/default').",
    ),
  canHaveChildren: z
    .boolean()
    .default(false)
    .describe(
      'Флаг древовидной структуры. Передай true, если эта сущность может содержать вложенные дочерние элементы.',
    ),
  description: z
    .string()
    .optional()
    .describe('Подробное описание назначения сущности на русском языке.'),
});

// СХЕМА ДЛЯ BPMN-ПРОЦЕССА
export const CreateBpmnDataTypeSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского модуля, в котором создается бизнес-процесс. Если модуль создается в этой же сессии, передай 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe(
      'Подробное описание бизнес-процесса и его шагов на русском языке.',
    ),
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
      "ID типа данных. Если тип создается прямо сейчас в рамках одного шага, передай строго строку 'PENDING_DATA_TYPE_ID'.",
    ),
  propertyType: FieldTypeEnum.describe(
    'Системный тип данных поля (например, STRING, INTEGER, BOOLEAN).',
  ),
  formula: z
    .string()
    .optional()
    .describe(
      'Формула вычислений. Синтаксис СТРОГО без пробелов внутри скобок: `[ИМЯ_ТИПА:ИМЯ_ПОЛЯ]` — для обычного поля типа; `[_common:ИМЯ_ПОЛЯ]` — для модульного поля. Пример: `[_common:test1]+[parentBpmnCalculator:test2]`',
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
      "ID модуля. Если модуль создается прямо сейчас в рамках одного шага, передай строго строку 'PENDING_MODULE_ID'.",
    ),
  formula: z
    .string()
    .optional()
    .describe(
      'Формула вычислений. Синтаксис СТРОГО без пробелов внутри скобок: `[ИМЯ_ТИПА:ИМЯ_ПОЛЯ]` — для поля конкретного типа; `[ИМЯ_ПОЛЯ]` — для модульного поля текущего модуля. Пример: `[someNum]+[parentBpmnCalculator:test2]`',
    ),
  propertyType: FieldTypeEnum.describe(
    'Системный тип данных для общего модульного поля.',
  ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения общего поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для всех сущностей модуля.'),
});
