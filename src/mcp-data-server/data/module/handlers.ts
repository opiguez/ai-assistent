import { CreateModuleSchema, UpdateModuleSchema } from './schema.js';
import { buildEntityTools, type ToolDef } from '../core/entity-builder.js';

export const moduleTools: ToolDef[] = buildEntityTools({
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
