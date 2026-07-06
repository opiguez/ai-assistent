import { z } from 'zod';
import { BaseLowCodeSchema } from '../core/schema.js';

export const CreateModuleSchema = BaseLowCodeSchema.extend({
  iconBatchId: z
    .string()
    .optional()
    .describe('ID иконки модуля (batchId из загрузки ассетов).'),
  brandingJson: z
    .string()
    .optional()
    .describe('JSON кастомизации брендинга модуля.'),
});

export const GetModuleSchema = z.object({
  id: z.string().describe('ID модуля'),
});

export const UpdateModuleSchema = z.object({
  id: z.string().describe('ID модуля'),
  displayName: z.string().optional().describe('Новое название'),
  description: z.string().optional().describe('Новое описание'),
});
