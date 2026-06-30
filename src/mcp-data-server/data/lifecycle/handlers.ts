import { z } from 'zod';
import { CreateLifecycleSchema, UpdateLifecycleSchema } from './schema.js';
import { rabisClient } from '../../../shared/services/rabisClient.service.js';
import { success, error } from '../core/utils.js';
import { defineTool } from '../../../shared/utils/base.js';
import { buildEntityTools, type ToolDef } from '../core/entity-builder.js';

// ─────── Entity tools (GET, LIST, UPDATE) ───────
const entityTools = buildEntityTools({
  key: 'lifecycle',
  displayName: 'Lifecycle',
  displayNameRu: 'Жизненный цикл',
  queryField: 'lifecycle',
  updateMutation: 'updateLifecycle',
  updateSchema: UpdateLifecycleSchema,
  getSelection: {
    id: true,
    name: true,
    displayName: true,
    description: true,
  },
  listSelection: {
    id: true,
    name: true,
    displayName: true,
  },
  listConfig: { type: 'parentQuery', parentField: 'lifecycles' },
  skipCreate: true,
});

// ─────── CREATE Lifecycle ───────
type CreateLifecycleArgs = z.infer<typeof CreateLifecycleSchema>;
const handleCreateLifecycle = async (args: CreateLifecycleArgs) => {
  try {
    const res = await rabisClient.chain.mutation
      .createLifecycle({
        lifecycle: {
          displayName: args.displayName,
          name: args.name,
          description: args.description,
          parentId: args.parentId,
        },
      })
      .get({ id: true, name: true });
    return success(res.id, 'Жизненный цикл успешно создан');
  } catch (e) {
    return error(e, 'Ошибка создания жизненного цикла');
  }
};

export const lifecycleTools: ToolDef[] = [
  ...entityTools,
  defineTool(
    'data_create_lifecycle',
    {
      title: 'Create Lifecycle',
      description:
        'Создаёт новый жизненный цикл внутри указанного модуля. Вызывай после создания модуля.',
      inputSchema: CreateLifecycleSchema,
    },
    handleCreateLifecycle,
  ),
];
