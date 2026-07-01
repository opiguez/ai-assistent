import { z } from 'zod';
import { CreateLifecycleSchema, UpdateLifecycleSchema } from './schema.js';
import { rabisClient } from '../../../shared/services/rabisClient.service.js';
import { success, error, toLocalizedJson } from '../core/utils.js';
import { DeleteByIdSchema } from '../core/schema.js';
import { defineTool } from '../../../shared/utils/base.js';
import { buildEntityTools, buildDeleteHandler, type ToolDef } from '../core/entity-builder.js';

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
          displayName: toLocalizedJson(args.displayName),
          name: args.name,
          description: toLocalizedJson(args.description),
          parentId: args.parentId,
        },
      })
      .get({ id: true, name: true });
    return success(res.id, 'Жизненный цикл успешно создан');
  } catch (e) {
    return error(e, 'Ошибка создания жизненного цикла');
  }
};

const handleDeleteLifecycle = buildDeleteHandler('Жизненный цикл');

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
  defineTool('data_delete_lifecycle', {
    title: 'Delete Lifecycle',
    description: 'Удаляет жизненный цикл по его ID.',
    inputSchema: DeleteByIdSchema,
  }, handleDeleteLifecycle),
];
