import { CreateModuleSchema, UpdateModuleSchema } from './schema.js';
import { DeleteByIdSchema } from '../core/schema.js';
import { defineTool } from '../../../shared/utils/base.js';
import { buildEntityTools, buildDeleteHandler, type ToolDef } from '../core/entity-builder.js';

const entityTools = buildEntityTools({
  key: 'module',
  displayName: 'Module',
  displayNameRu: 'Модуль',
  queryField: 'module',
  createMutation: 'createModule',
  updateMutation: 'updateModule',
  createSchema: CreateModuleSchema,
  updateSchema: UpdateModuleSchema,
  getSelection: {
    id: true,
    name: true,
    displayName: true,
    description: true,
    dataTypes: { id: true, name: true, displayName: true },
    lifecycles: { id: true, name: true, displayName: true },
    workspaces: { id: true, name: true, displayName: true },
  },
  listSelection: {
    id: true,
    name: true,
    displayName: true,
    description: true,
  },
  listConfig: { type: 'applicationQuery', parentField: 'modules' },
});

const handleDeleteModule = buildDeleteHandler('Модуль');

export const moduleTools: ToolDef[] = [
  ...entityTools,
  defineTool('data_delete_module', {
    title: 'Delete Module',
    description: 'Удаляет модуль по его ID.',
    inputSchema: DeleteByIdSchema,
  }, handleDeleteModule),
];
