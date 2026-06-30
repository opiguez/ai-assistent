import { z } from 'zod';
import { CreateWorkspaceSchema, UpdateWorkspaceSchema } from './schema.js';
import { rabisClient } from '../../../shared/services/rabisClient.service.js';
import { success, error } from '../core/utils.js';
import { defineTool } from '../../../shared/utils/base.js';
import { buildEntityTools, type ToolDef } from '../core/entity-builder.js';

// ─────── Entity tools (GET, LIST, UPDATE) ───────
const entityTools = buildEntityTools({
  key: 'workspace',
  displayName: 'Workspace',
  displayNameRu: 'Рабочая область',
  queryField: 'workspace',
  updateMutation: 'updateWorkspace',
  updateSchema: UpdateWorkspaceSchema,
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
  listConfig: { type: 'parentQuery', parentField: 'workspaces' },
  skipCreate: true,
});

// ─────── CREATE Workspace ───────
type CreateWorkspaceArgs = z.infer<typeof CreateWorkspaceSchema>;
const handleCreateWorkspace = async (args: CreateWorkspaceArgs) => {
  try {
    const res = await rabisClient.chain.mutation
      .createWorkspace({
        workspace: {
          displayName: args.displayName,
          name: args.name,
          description: args.description,
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
  ...entityTools,
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
];
