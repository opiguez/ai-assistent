import { z } from 'zod';
import { CreateLifecycleSchema, UpdateLifecycleSchema } from './schema.js';
import { DeleteByIdSchema, type ToolDef } from '../core/schema.js';
import { rabisClient } from '../../../shared/services/rabisClient.service.js';
import { success, error, successList, toLocalizedJson } from '../core/utils.js';
import { defineTool } from '../../../shared/utils/base.js';

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

export const lifecycleTools: ToolDef[] = [
  defineTool(
    'data_get_lifecycle',
    {
      title: 'Get Lifecycle',
      description: 'Возвращает Жизненный цикл по ID.',
      inputSchema: z.object({ id: z.string().describe('ID жизненного цикла') }),
    },
    async (args) => {
      try {
        const res = await rabisClient.chain.query.lifecycle({ id: args.id }).get({
          id: true,
          name: true,
          displayName: true,
          description: true,
        });
        return successList([res], 'Жизненный цикл получен');
      } catch (e) {
        return error(e, 'Ошибка получения жизненного цикла');
      }
    },
  ),
  defineTool(
    'data_get_lifecycles',
    {
      title: 'Get All Lifecycles',
      description: 'Возвращает список всех Жизненный цикл.',
      inputSchema: z.object({ parentId: z.string().describe('ID родительского модуля') }),
    },
    async (args) => {
      try {
        const res = await rabisClient.chain.query.module({ id: args.parentId }).get({
          lifecycles: { id: true, name: true, displayName: true },
        });
        return successList(res.lifecycles || [], 'Список жизненных циклов получен');
      } catch (e) {
        return error(e, 'Ошибка получения списка жизненных циклов');
      }
    },
  ),
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
  defineTool(
    'data_update_lifecycle',
    {
      title: 'Update Lifecycle',
      description: 'Обновляет Жизненный цикл.',
      inputSchema: UpdateLifecycleSchema,
    },
    async (args) => {
      try {
        const localizedArgs = { ...args };
        if (localizedArgs.displayName) localizedArgs.displayName = toLocalizedJson(args.displayName);
        if (localizedArgs.description) localizedArgs.description = toLocalizedJson(args.description);
        const res = await rabisClient.chain.mutation.updateLifecycle({ lifecycle: localizedArgs }).get({ id: true, name: true });
        return success(res.id, 'Жизненный цикл обновлён');
      } catch (e) {
        return error(e, 'Ошибка обновления жизненного цикла');
      }
    },
  ),
  defineTool(
    'data_delete_lifecycle',
    {
      title: 'Delete Lifecycle',
      description: 'Удаляет жизненный цикл по его ID.',
      inputSchema: DeleteByIdSchema,
    },
    async (args) => {
      try {
        await rabisClient.chain.mutation.deleteMetaDataObject({ id: args.id });
        return success(args.id, 'Жизненный цикл удалён');
      } catch (e) {
        return error(e, 'Ошибка удаления жизненного цикла');
      }
    },
  ),
];
