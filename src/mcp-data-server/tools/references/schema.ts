import { z } from 'zod';
import { BaseLowCodeSchema } from '../core/schema.js';

export const CreateReferenceDataGroupSchema = BaseLowCodeSchema.extend({
  parentGroupId: z
    .string()
    .describe(
      'ID родительской группы справочников. Для корневой группы модуля всегда используй "/modules/_rdm/workspaces/_rdm_workspace". Для подгрупп — ID корневой группы.',
    ),
});

export const CreateReferenceDataTypeSchema = BaseLowCodeSchema.extend({
  parentGroupId: z
    .string()
    .describe(
      'ID группы справочников, куда добавить новый справочник (ReferenceDataGroup).',
    ),
  isDateSpecific: z
    .boolean()
    .default(false)
    .describe('Флаг дата-специфичного справочника.'),
  parentReferenceDataTypeId: z
    .string()
    .optional()
    .describe('ID родительского справочника для иерархической структуры.'),
  dataFileBatchId: z
    .string()
    .optional()
    .describe('ID batch-файла CSV для импорта значений справочника.'),
});

export const GetReferenceDataTypesSchema = z.object({
  parentGroupId: z
    .string()
    .describe('ID группы справочников, для которой получить список справочников'),
});

export const UpdateReferenceDataGroupSchema = z.object({
  referenceDataGroupId: z.string().describe('ID группы справочников'),
  displayName: z.string().optional().describe('Новое название'),
  description: z.string().optional().describe('Новое описание'),
});

export const UpdateReferenceDataTypeSchema = z.object({
  referenceDataTypeId: z.string().describe('ID справочника'),
  displayName: z.string().optional().describe('Новое название'),
  description: z.string().optional().describe('Новое описание'),
  dataFileBatchId: z.string().optional(),
});
