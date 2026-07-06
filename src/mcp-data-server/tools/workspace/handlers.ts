import { z } from 'zod';
import { CreateWorkspaceSchema, UpdateWorkspaceSchema } from './schema.js';
import { DeleteByIdSchema, type ToolDef } from '../core/schema.js';
import { rabisClient } from '../../../shared/services/rabisClient.service.js';
import { success, error, successList, toLocalizedJson } from '../core/utils.js';
import { defineTool } from '../../../shared/utils/base.js';

// ─────── CREATE Workspace ───────
type CreateWorkspaceArgs = z.infer<typeof CreateWorkspaceSchema>;
const handleCreateWorkspace = async (args: CreateWorkspaceArgs) => {
  try {
    const res = await rabisClient.chain.mutation
      .createWorkspace({
        workspace: {
          displayName: toLocalizedJson(args.displayName),
          name: args.name,
          description: toLocalizedJson(args.description),
          parentId: args.parentId,
          iconBatchId: args.iconBatchId,
          brandingJson: args.brandingJson,
        },
      })
      .get({ id: true, name: true });
    return success(res.id, 'Рабочая область успешно создана');
  } catch (e) {
    return error(e, 'Ошибка создания рабочей области');
  }
};

export const workspaceTools: ToolDef[] = [
  defineTool(
    'data_get_workspace',
    {
      title: 'Get Workspace',
      description: 'Возвращает Рабочая область по ID.',
      inputSchema: z.object({ id: z.string().describe('ID рабочей области') }),
    },
    async (args) => {
      try {
        const res = await rabisClient.chain.query.workspace({ id: args.id }).get({
          id: true,
          name: true,
          displayName: true,
          description: true,
        });
        return successList([res], 'Рабочая область получена');
      } catch (e) {
        return error(e, 'Ошибка получения рабочей области');
      }
    },
  ),
  defineTool(
    'data_get_workspaces',
    {
      title: 'Get All Workspaces',
      description: 'Возвращает список всех Рабочая область.',
      inputSchema: z.object({ parentId: z.string().describe('ID родительского модуля') }),
    },
    async (args) => {
      try {
        const res = await rabisClient.chain.query.module({ id: args.parentId }).get({
          workspaces: { id: true, name: true, displayName: true },
        });
        return successList(res.workspaces || [], 'Список рабочих областей получен');
      } catch (e) {
        return error(e, 'Ошибка получения списка рабочих областей');
      }
    },
  ),
  defineTool(
    'data_create_workspace',
    {
      title: 'Create Workspace',
      description:
        'Создаёт новую рабочую область внутри указанного модуля.',
      inputSchema: CreateWorkspaceSchema,
    },
    handleCreateWorkspace,
  ),
  defineTool(
    'data_update_workspace',
    {
      title: 'Update Workspace',
      description: 'Обновляет Рабочая область.',
      inputSchema: UpdateWorkspaceSchema,
    },
    async (args) => {
      try {
        const localizedArgs = { ...args };
        if (localizedArgs.displayName) localizedArgs.displayName = toLocalizedJson(args.displayName);
        if (localizedArgs.description) localizedArgs.description = toLocalizedJson(args.description);
        const res = await rabisClient.chain.mutation.updateWorkspace({ workspace: localizedArgs }).get({ id: true, name: true });
        return success(res.id, 'Рабочая область обновлена');
      } catch (e) {
        return error(e, 'Ошибка обновления рабочей области');
      }
    },
  ),
  defineTool(
    'data_delete_workspace',
    {
      title: 'Delete Workspace',
      description: 'Удаляет рабочую область по её ID.',
      inputSchema: DeleteByIdSchema,
    },
    async (args) => {
      try {
        await rabisClient.chain.mutation.deleteMetaDataObject({ id: args.id });
        return success(args.id, 'Рабочая область удалена');
      } catch (e) {
        return error(e, 'Ошибка удаления рабочей области');
      }
    },
  ),
];
