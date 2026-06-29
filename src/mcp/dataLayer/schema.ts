import { z } from 'zod';

export const BaseLowCodeSchema = z.object({
  displayName: z.string().describe("Понятное название сущности на русском языке (например, 'Калькулятор')"),
  name: z.string().describe("Уникальное системное имя латиницей в camelCase или snake_case (например, 'calculator')"),
});

export const CreateModuleSchema = BaseLowCodeSchema.extend({
  description: z.string().optional().describe("Описание модуля на русском языке. Помогает ИИ-агенту понять назначение."),
  brandingJson: z.string().optional().describe("JSON-строка с настройками брендинга (логотип, цвета)."),
});

export const CreateDataTypeSchema = BaseLowCodeSchema.extend({
  parentId: z.string().describe("ID родительского модуля. Если модуль создается в этой же сессии, передай 'PENDING_MODULE_ID'."),
  lifecycle: z.string().default('DEFAULT_LIFECYCLE').describe("Идентификатор жизненного цикла (например, 'simple' или 'DEFAULT_LIFECYCLE')."),
  description: z.string().optional().describe("Подробное описание сущности на русском языке."),
  canHaveChildren: z.boolean().default(false).describe("Может ли эта сущность иметь вложенные элементы (древовидная структура)."),
  canHaveDiscussion: z.boolean().default(true).describe("Разрешить ли обсуждение/комментарии для объектов этого типа."),
});

export const FieldTypeEnum = z.enum([
  'STRING', 'TEXT', 'INTEGER', 'DECIMAL', 'BOOLEAN', 'DATE', 'DATETIME',
  'FILE', 'USER', 'SELECTION', 'OBJECT'
]).describe("Строгий системный тип данных поля согласно GraphQL схеме.");

export const CreateDataTypeFieldSchema = BaseLowCodeSchema.extend({
  dataTypeId: z.string().describe("ID типа данных. Если тип создается сейчас, передай 'PENDING_DATA_TYPE_ID'."),
  propertyType: FieldTypeEnum.describe("Системный тип данных поля (например, STRING, INTEGER, BOOLEAN)."),
  description: z.string().optional().describe("Описание назначения поля на русском языке."),
  required: z.boolean().default(false).describe("Является ли поле обязательным для заполнения."),
});

export const CreateModuleFieldSchema = BaseLowCodeSchema.extend({
  moduleId: z.string().describe("ID модуля. Если модуль создается сейчас, передай 'PENDING_MODULE_ID'."),
  propertyType: FieldTypeEnum.describe("Системный тип данных для общего поля."),
  description: z.string().optional().describe("Описание назначения общего поля на русском языке."),
  required: z.boolean().default(false).describe("Является ли поле обязательным для всех сущностей модуля."),
});
