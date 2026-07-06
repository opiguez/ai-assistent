import { z } from 'zod';
import { CreateModuleSchema, UpdateModuleSchema } from './schema.js';
import { DeleteByIdSchema, type ToolDef } from '../core/schema.js';
import { defineTool } from '../../../shared/utils/base.js';
import { rabisClient } from '../../../shared/services/rabisClient.service.js';
import { success, error, successList, toLocalizedJson } from '../core/utils.js';

export const moduleTools: ToolDef[] = [
  defineTool(
    'data_get_module',
    {
      title: 'Get Module',
      description: 'Возвращает Модуль по ID.',
      inputSchema: z.object({ id: z.string().describe('ID модуля') }),
    },
    async (args) => {
      try {
        const res = await rabisClient.chain.query.module({ id: args.id }).get({
          id: true,
          name: true,
          displayName: true,
          description: true,
          dataTypes: { id: true, name: true, displayName: true },
          lifecycles: { id: true, name: true, displayName: true },
          workspaces: { id: true, name: true, displayName: true },
        });
        return successList([res], 'Модуль получен');
      } catch (e) {
        return error(e, 'Ошибка получения модуля');
      }
    },
  ),
  defineTool(
    'data_get_modules',
    {
      title: 'Get All Modules',
      description: 'Возвращает список всех Модуль.',
      inputSchema: z.object({}),
    },
    async () => {
      try {
        const res = await rabisClient.chain.query.application.get({
          modules: { id: true, name: true, displayName: true, description: true },
        });
        return successList(res.modules || [], 'Список модулей получен');
      } catch (e) {
        return error(e, 'Ошибка получения списка модулей');
      }
    },
  ),
  defineTool(
    'data_create_module',
    {
      title: 'Create Module',
      description: 'Создаёт новый Модуль.',
      inputSchema: CreateModuleSchema,
    },
    async (args) => {
      try {
        const localizedArgs = { ...args };
        if (localizedArgs.displayName) localizedArgs.displayName = toLocalizedJson(args.displayName);
        if (localizedArgs.description) localizedArgs.description = toLocalizedJson(args.description);
        const res = await rabisClient.chain.mutation.createModule({ module: localizedArgs }).get({ id: true, name: true });
        return success(res.id, 'Модуль успешно создан');
      } catch (e) {
        return error(e, 'Ошибка создания модуля');
      }
    },
  ),
  defineTool(
    'data_update_module',
    {
      title: 'Update Module',
      description: 'Обновляет Модуль.',
      inputSchema: UpdateModuleSchema,
    },
    async (args) => {
      try {
        const localizedArgs = { ...args };
        if (localizedArgs.displayName) localizedArgs.displayName = toLocalizedJson(args.displayName);
        if (localizedArgs.description) localizedArgs.description = toLocalizedJson(args.description);
        const res = await rabisClient.chain.mutation.updateModule({ module: localizedArgs }).get({ id: true, name: true });
        return success(res.id, 'Модуль обновлён');
      } catch (e) {
        return error(e, 'Ошибка обновления модуля');
      }
    },
  ),
  defineTool(
    'data_delete_module',
    {
      title: 'Delete Module',
      description: 'Удаляет модуль по его ID.',
      inputSchema: DeleteByIdSchema,
    },
    async (args) => {
      try {
        await rabisClient.chain.mutation.deleteMetaDataObject({ id: args.id });
        return success(args.id, 'Модуль удалён');
      } catch (e) {
        return error(e, 'Ошибка удаления модуля');
      }
    },
  ),
];
