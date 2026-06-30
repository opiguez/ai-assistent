import { z } from 'zod';
import { BaseLowCodeSchema } from '../core/schema.js';

export const CreateWorkspaceSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID модуля, в котором создается рабочая область. Если модуль создается в этой же сессии, передай 'PENDING_MODULE_ID'.",
    ),
  iconBatchId: z
    .string()
    .optional()
    .describe('ID иконки рабочей области (batchId).'),
  brandingJson: z
    .string()
    .optional()
    .describe('JSON кастомизации брендинга рабочей области.'),
});

export const UpdateWorkspaceSchema = z.object({
  id: z.string().describe('ID рабочей области'),
  displayName: z.string().optional().describe('Новое название'),
  description: z.string().optional().describe('Новое описание'),
});
