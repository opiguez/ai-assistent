import { z } from 'zod';
import { BaseLowCodeSchema } from '../core/schema.js';

export const CreateDataTypeSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского модуля. Если модуль создается в этой же сессии, передай 'PENDING_MODULE_ID'.",
    ),
  canHaveChildren: z
    .boolean()
    .default(false)
    .describe('Флаг древовидной структуры.'),
  canHaveDiscussion: z
    .boolean()
    .default(false)
    .describe('Разрешить обсуждения на экземплярах этого типа.'),
  rootVersionable: z
    .boolean()
    .default(false)
    .describe('Корневой уровень поддерживает версионирование.'),
  inheritBpmnScheme: z
    .boolean()
    .default(false)
    .describe('Наследовать BPMN-схему от родительского типа.'),
  brandingJson: z
    .string()
    .optional()
    .describe('JSON кастомизации брендинга типа данных.'),
});

export const CreateBpmnDataTypeSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского модуля. Если модуль создается в этой же сессии, передай 'PENDING_MODULE_ID'.",
    ),
  canHaveChildren: z
    .boolean()
    .default(false)
    .describe('Флаг древовидной структуры.'),
  canHaveDiscussion: z
    .boolean()
    .default(false)
    .describe('Разрешить обсуждения.'),
  rootVersionable: z
    .boolean()
    .default(false)
    .describe('Поддержка версионирования.'),
  inheritBpmnScheme: z
    .boolean()
    .default(false)
    .describe('Наследовать BPMN-схему от родительского типа.'),
});

export const UpdateDataTypeSchema = z.object({
  id: z.string().describe('ID типа данных для обновления'),
  displayName: z.string().optional().describe('Новое название'),
  description: z.string().optional().describe('Новое описание'),
  canHaveDiscussion: z.boolean().optional(),
  versionable: z.boolean().optional(),
});

export const GetDataTypeFieldsSchema = z.object({
  dataTypeId: z.string().describe('ID типа данных для получения списка полей'),
});

export const DeleteFieldSchema = z.object({
  fieldId: z.string().describe('ID поля для удаления'),
});
