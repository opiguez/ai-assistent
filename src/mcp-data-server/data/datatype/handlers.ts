import { z } from 'zod';
import {
  CreateDataTypeSchema,
  CreateBpmnDataTypeSchema,
  UpdateDataTypeSchema,
  GetDataTypeFieldsSchema,
  DeleteFieldSchema,
  DeleteDataTypeSchema,
} from './schema.js';
import { rabisClient } from '../../../shared/services/rabisClient.service.js';
import { success, error, successList, toLocalizedJson } from '../core/utils.js';
import { defineTool } from '../../../shared/utils/base.js';
import { buildEntityTools, type ToolDef } from '../core/entity-builder.js';

// ─────── Entity tools (GET, LIST, UPDATE) ───────
const entityTools = buildEntityTools({
  key: 'data_type',
  displayName: 'DataType',
  displayNameRu: 'Тип данных',
  queryField: 'dataType',
  updateMutation: 'updateDataType',
  updateSchema: UpdateDataTypeSchema,
  getSelection: {
    id: true,
    name: true,
    displayName: true,
    description: true,
    canHaveChildren: true,
    versionable: true,
    properties: {
      id: true,
      name: true,
      displayName: true,
      properties: {
        id: true,
        key: true,
        name: true,
        displayName: true,
        propertyType: { propertyTypeEnum: true },
        required: true,
        readonly: true,
      },
    },
  },
  listSelection: {
    id: true,
    name: true,
    displayName: true,
    description: true,
  },
  listConfig: { type: 'parentQuery', parentField: 'dataTypes' },
  skipCreate: true,
});

// ─────── CREATE DataType (custom — lifecycle resolution) ───────
type CreateDataTypeArgs = z.infer<typeof CreateDataTypeSchema>;
const handleCreateDataType = async (args: CreateDataTypeArgs) => {
  try {
    let lifecyclePath: string | undefined;
    try {
      const moduleData = await rabisClient.chain.query
        .module({ id: args.parentId })
        .get({ name: true, lifecycles: { id: true, name: true } });
      if (moduleData.lifecycles && moduleData.lifecycles.length > 0) {
        lifecyclePath = `/modules/${moduleData.name}/lifecycles/${moduleData.lifecycles[0].name}`;
      }
    } catch {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: 'PENDING_MODULE_ID — не можем зарезолвить lifecycle',
            }),
          },
        ],
      };
    }
    if (!lifecyclePath) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message:
                'Не удалось определить lifecycle для модуля. Убедись, что модуль существует и имеет хотя бы один жизненный цикл. Создай lifecycle через data_create_lifecycle.',
            }),
          },
        ],
      };
    }
    const dataTypeInput: Record<string, any> = {
      displayName: toLocalizedJson(args.displayName),
      name: args.name,
      description: toLocalizedJson(args.description),
      parentId: args.parentId,
      baseType: args.baseType,
      canHaveDiscussion: args.canHaveDiscussion,
      rootVersionable: args.rootVersionable,
      inheritBpmnScheme: args.inheritBpmnScheme,
      brandingJson: args.brandingJson,
      lifecycle: lifecyclePath,
    };
    if (args.canHaveChildren !== undefined) {
      dataTypeInput.canHaveChildren = args.canHaveChildren;
    }
    const res = await rabisClient.chain.mutation
      .createDataType({
        dataType: dataTypeInput,
      })
      .get({ id: true, name: true });
    return success(res.id, 'Тип данных успешно создан');
  } catch (e) {
    return error(e, 'Ошибка создания типа данных');
  }
};

// ─────── CREATE Bpmn DataType ───────
type CreateBpmnDataTypeArgs = z.infer<typeof CreateBpmnDataTypeSchema>;
const handleCreateBpmnDataType = async (args: CreateBpmnDataTypeArgs) => {
  try {
    const bpmnInput: Record<string, any> = {
      displayName: toLocalizedJson(args.displayName),
      name: args.name,
      description: toLocalizedJson(args.description),
      parentId: args.parentId,
      baseType: args.baseType,
      canHaveDiscussion: args.canHaveDiscussion,
      rootVersionable: args.rootVersionable,
      inheritBpmnScheme: args.inheritBpmnScheme,
      brandingJson: args.brandingJson,
    };
    if (args.canHaveChildren !== undefined) {
      bpmnInput.canHaveChildren = args.canHaveChildren;
    }
    const res = await rabisClient.chain.mutation
      .createBpmnProcessDataType({
        dataType: bpmnInput,
      })
      .get({ id: true, name: true });
    return success(res.id, 'BPMN-тип данных успешно создан');
  } catch (e) {
    return error(e, 'Ошибка создания BPMN-типа данных');
  }
};

// ─────── GET Fields ───────
type GetDataTypeFieldsArgs = z.infer<typeof GetDataTypeFieldsSchema>;
const handleGetDataTypeFields = async (args: GetDataTypeFieldsArgs) => {
  try {
    const res = await rabisClient.chain.query
      .dataType({ id: args.dataTypeId })
      .get({
        properties: {
          id: true,
          name: true,
          displayName: true,
          properties: {
            id: true,
            key: true,
            name: true,
            displayName: true,
            propertyType: { propertyTypeEnum: true },
            required: true,
            readonly: true,
          },
        },
      });
    const fields =
      res.properties?.flatMap((g: any) => g.properties || []) || [];
    return successList(fields, 'Поля типа данных получены');
  } catch (e) {
    return error(e, 'Ошибка получения полей типа данных');
  }
};

// ─────── DELETE DataType ───────
type DeleteDataTypeArgs = z.infer<typeof DeleteDataTypeSchema>;
const handleDeleteDataType = async (args: DeleteDataTypeArgs) => {
  try {
    await rabisClient.chain.mutation.deleteMetaDataObject({
      id: args.id,
    });
    return success(args.id, 'Тип данных удалён');
  } catch (e) {
    return error(e, 'Ошибка удаления типа данных');
  }
};

// ─────── DELETE Field ───────
type DeleteFieldArgs = z.infer<typeof DeleteFieldSchema>;
const handleDeleteField = async (args: DeleteFieldArgs) => {
  try {
    await rabisClient.chain.mutation.deleteMetaDataObject({
      id: args.id,
    });
    return success(args.id, 'Поле удалено');
  } catch (e) {
    return error(e, 'Ошибка удаления поля');
  }
};

export const datatypeTools: ToolDef[] = [
  ...entityTools,
  defineTool(
    'data_create_data_type',
    {
      title: 'Create DataType',
      description:
        'Создаёт новый тип данных (сущность) внутри модуля. Lifecycle резолвится автоматически из модуля.',
      inputSchema: CreateDataTypeSchema,
    },
    handleCreateDataType,
  ),
  defineTool(
    'data_create_bpmn_data_type',
    {
      title: 'Create Bpmn DataType',
      description:
        'Создаёт новый BPMN бизнес-процесс (автоматизацию логики, workflow) внутри указанного модуля.',
      inputSchema: CreateBpmnDataTypeSchema,
    },
    handleCreateBpmnDataType,
  ),
  defineTool(
    'data_get_data_type_fields',
    {
      title: 'Get DataType Fields',
      description: 'Возвращает список полей указанного типа данных.',
      inputSchema: GetDataTypeFieldsSchema,
    },
    handleGetDataTypeFields,
  ),
  defineTool(
    'data_delete_field',
    {
      title: 'Delete Field',
      description: 'Удаляет поле типа данных по его ID (deleteMetaDataObject).',
      inputSchema: DeleteFieldSchema,
    },
    handleDeleteField,
  ),
  defineTool(
    'data_delete_data_type',
    {
      title: 'Delete DataType',
      description: 'Удаляет тип данных (обычный или BPMN) по его ID.',
      inputSchema: DeleteDataTypeSchema,
    },
    handleDeleteDataType,
  ),
];
