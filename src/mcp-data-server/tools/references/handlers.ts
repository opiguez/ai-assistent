import { z } from 'zod';
import {
  CreateReferenceDataGroupSchema,
  CreateReferenceDataTypeSchema,
  GetReferenceDataTypesSchema,
  UpdateReferenceDataGroupSchema,
  UpdateReferenceDataTypeSchema,
} from './schema.js';
import { rabisClient } from '../../../shared/services/rabisClient.service.js';
import { success, error, successList, toLocalizedJson } from '../core/utils.js';
import { defineTool } from '../../../shared/utils/base.js';
import type { ToolDef } from '../core/schema.js';

// ─────── Reference Data Group ───────

type CreateRefGroupArgs = z.infer<typeof CreateReferenceDataGroupSchema>;
const handleCreateRefGroup = async (args: CreateRefGroupArgs) => {
  try {
    const res = await rabisClient.chain.mutation
      .createReferenceDataGroup({
        referenceDataGroup: {
          displayName: toLocalizedJson(args.displayName),
          name: args.name,
          description: toLocalizedJson(args.description),
          parentGroupId: args.parentGroupId,
        },
      })
      .get({ id: true, name: true });
    return success(res.id, 'Группа справочников создана');
  } catch (e) {
    return error(e, 'Ошибка создания группы справочников');
  }
};

type UpdateRefGroupArgs = z.infer<typeof UpdateReferenceDataGroupSchema>;
const handleUpdateRefGroup = async (args: UpdateRefGroupArgs) => {
  try {
    const localized = { ...args };
    if (localized.displayName)
      localized.displayName = toLocalizedJson(args.displayName);
    if (localized.description)
      localized.description = toLocalizedJson(args.description);
    const res = await rabisClient.chain.mutation
      .updateReferenceDataGroup({
        referenceDataGroup: localized,
      })
      .get({ id: true, name: true });
    return success(res.id, 'Группа справочников обновлена');
  } catch (e) {
    return error(e, 'Ошибка обновления группы справочников');
  }
};

// ─────── Reference Data Type ───────

type CreateRefDataTypeArgs = z.infer<typeof CreateReferenceDataTypeSchema>;
const handleCreateRefDataType = async (args: CreateRefDataTypeArgs) => {
  try {
    const res = await rabisClient.chain.mutation
      .createReferenceDataType({
        referenceDataType: {
          displayName: toLocalizedJson(args.displayName),
          name: args.name,
          description: toLocalizedJson(args.description),
          parentGroupId: args.parentGroupId,
          isDateSpecific: args.isDateSpecific,
          parentReferenceDataTypeId: args.parentReferenceDataTypeId,
          dataFileBatchId: args.dataFileBatchId,
        },
      })
      .get({ id: true, name: true });
    return success(res.id, 'Справочник создан');
  } catch (e) {
    return error(e, 'Ошибка создания справочника');
  }
};

type UpdateRefDataTypeArgs = z.infer<typeof UpdateReferenceDataTypeSchema>;
const handleUpdateRefDataType = async (args: UpdateRefDataTypeArgs) => {
  try {
    const localized = { ...args };
    if (localized.displayName)
      localized.displayName = toLocalizedJson(args.displayName);
    if (localized.description)
      localized.description = toLocalizedJson(args.description);
    const res = await rabisClient.chain.mutation
      .updateReferenceDataType({
        referenceDataType: localized,
      })
      .get({ id: true, name: true });
    return success(res.id, 'Справочник обновлён');
  } catch (e) {
    return error(e, 'Ошибка обновления справочника');
  }
};

// ─────── GET Reference Data Group by ID ───────

const handleGetRefGroup = async (args: { id: string }) => {
  try {
    const res = await rabisClient.chain.query
      .referenceDataGroup({ id: args.id })
      .get({ id: true, name: true, displayName: true, description: true });
    return successList([res], 'Группа справочников получена');
  } catch (e) {
    return error(e, 'Ошибка получения группы справочников');
  }
};

const handleGetRefDataType = async (args: { id: string }) => {
  try {
    const res = await rabisClient.chain.query
      .referenceDataType({ id: args.id })
      .get({
        id: true,
        name: true,
        displayName: true,
        description: true,
        isDateSpecific: true,
        properties: {
          id: true,
          displayName: true,
          name: true,
          properties: {
            id: true,
            displayName: true,
            name: true,
          },
        },
      });
    return successList([res], 'Справочник получен');
  } catch (e) {
    return error(e, 'Ошибка получения справочника');
  }
};

// ─────── LIST Reference Groups ───────

const handleGetRefGroups = async () => {
  try {
    const res = await rabisClient.chain.query.referenceMetadataObjects({}).get({
      id: true,
      name: true,
      displayName: true,
      referenceMetadataObjectType: true,
    });
    const groups = (res || []).filter(
      (g: any) => g.referenceMetadataObjectType === 'GROUP',
    );
    return successList(groups, 'Группы справочников получены');
  } catch (e) {
    return error(e, 'Ошибка получения групп справочников');
  }
};

// ─────── LIST Reference Data Types in Group ───────

type GetRefDataTypesArgs = z.infer<typeof GetReferenceDataTypesSchema>;
const handleGetRefDataTypes = async (args: GetRefDataTypesArgs) => {
  try {
    const res = await rabisClient.chain.query
      .referenceMetadataObjects({ parentId: args.parentGroupId })
      .get({
        id: true,
        name: true,
        displayName: true,
        referenceMetadataObjectType: true,
      });
    const types = (res || []).filter(
      (t: any) => t.referenceMetadataObjectType === 'DATA_TYPE',
    );
    return successList(types, 'Справочники в группе получены');
  } catch (e) {
    return error(e, 'Ошибка получения справочников');
  }
};

// ─────── Tool definitions ───────

export const referenceTools: ToolDef[] = [
  defineTool(
    'data_get_reference_group',
    {
      title: 'Get Reference Data Group',
      description: 'Возвращает группу справочников по ID.',
      inputSchema: z.object({
        id: z.string().describe('ID группы справочников'),
      }),
    },
    handleGetRefGroup,
  ),
  defineTool(
    'data_get_reference_data_type',
    {
      title: 'Get Reference Data Type',
      description: 'Возвращает справочник по ID.',
      inputSchema: z.object({ id: z.string().describe('ID справочника') }),
    },
    handleGetRefDataType,
  ),
  defineTool(
    'data_create_reference_data_group',
    {
      title: 'Create Reference Data Group',
      description:
        'Создаёт группу справочников. parentGroupId — ID родительской группы. Для корневой группы модуля всегда используй "/modules/_rdm/workspaces/_rdm_workspace". Для подгрупп — ID корневой группы.',
      inputSchema: CreateReferenceDataGroupSchema,
    },
    handleCreateRefGroup,
  ),
  defineTool(
    'data_create_reference_data_type',
    {
      title: 'Create Reference Data Type',
      description:
        'Создаёт новый справочник (Reference Data Type) внутри указанной группы. После создания получишь ID для referenceDataTypeId поля Selection/MultiSelection.',
      inputSchema: CreateReferenceDataTypeSchema,
    },
    handleCreateRefDataType,
  ),
  defineTool(
    'data_get_reference_groups',
    {
      title: 'Get Reference Data Groups',
      description: 'Возвращает список всех групп справочников системы.',
      inputSchema: z.object({}),
    },
    handleGetRefGroups,
  ),
  defineTool(
    'data_get_reference_data_types',
    {
      title: 'Get Reference Data Types in Group',
      description:
        'Возвращает список справочников внутри указанной группы (parentGroupId).',
      inputSchema: GetReferenceDataTypesSchema,
    },
    handleGetRefDataTypes,
  ),
  defineTool(
    'data_update_reference_data_group',
    {
      title: 'Update Reference Data Group',
      description: 'Обновляет группу справочников.',
      inputSchema: UpdateReferenceDataGroupSchema,
    },
    handleUpdateRefGroup,
  ),
  defineTool(
    'data_update_reference_data_type',
    {
      title: 'Update Reference Data Type',
      description: 'Обновляет справочник.',
      inputSchema: UpdateReferenceDataTypeSchema,
    },
    handleUpdateRefDataType,
  ),
];
