import { z } from 'zod';
import { BaseLowCodeSchema } from '../core/schema.js';

export const CreateLifecycleSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID модуля, в котором создается жизненный цикл. Если модуль создается в этой же сессии, передай 'PENDING_MODULE_ID'.",
    ),
});

export const GetLifecyclesSchema = z.object({
  parentId: z
    .string()
    .describe('ID модуля, для которого получить жизненные циклы'),
});

export const UpdateLifecycleSchema = z.object({
  id: z.string().describe('ID жизненного цикла'),
  displayName: z.string().optional().describe('Новое название'),
  description: z.string().optional().describe('Новое описание'),
  lifecycleJson: z.string().optional().describe('JSON конфигурации жизненного цикла'),
});
