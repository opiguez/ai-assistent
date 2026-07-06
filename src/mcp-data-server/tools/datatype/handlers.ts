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
import type { ToolDef } from '../core/schema.js';

// ─────── CREATE DataType (custom — lifecycle resolution) ───────
type CreateDataTypeArgs = z.infer<typeof CreateDataTypeSchema>;
const handleCreateDataType = async (args: CreateDataTypeArgs) => {
  try {
    let lifecyclePath: string | undefined;
    if (args.parentId === 'PENDING_MODULE_ID') {
      lifecyclePath = 'PENDING_MODULE_ID/lifecycles/default';
    } else {
      try {
        const moduleData = await rabisClient.chain.query
          .module({ id: args.parentId })
          .get({ name: true, lifecycles: { id: true, name: true } });
        if (moduleData.lifecycles && moduleData.lifecycles.length > 0) {
          lifecyclePath = `/modules/${moduleData.name}/lifecycles/${moduleData.lifecycles[0].name}`;
        }
      } catch (e) {
        return error(e, `Не удалось зарезолвить lifecycle для модуля ${args.parentId}`);
      }
      if (!lifecyclePath) {
        return error(
          undefined,
          'Не удалось определить lifecycle для модуля. Убедись, что модуль существует и имеет хотя бы один жизненный цикл.',
        );
      }
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
        dataType: dataTypeInput as any,
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
      bpmnInput.canHaveChildren = true;
    }
    const res = await rabisClient.chain.mutation
      .createBpmnProcessDataType({
        dataType: bpmnInput as any,
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
  defineTool(
    'data_get_data_type',
    {
      title: 'Get DataType',
      description: 'Возвращает Тип данных по ID.',
      inputSchema: z.object({ id: z.string().describe('ID типа данных') }),
    },
    async (args) => {
      try {
        const res = await rabisClient.chain.query.dataType({ id: args.id }).get({
          id: true,
          name: true,
          displayName: true,
          description: true,
          canHaveChildren: false,
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
        });
        return successList([res], 'Тип данных получен');
      } catch (e) {
        return error(e, 'Ошибка получения типа данных');
      }
    },
  ),
  defineTool(
    'data_get_data_types',
    {
      title: 'Get All DataTypes',
      description: 'Возвращает список всех Тип данных.',
      inputSchema: z.object({ parentId: z.string().describe('ID родительского модуля') }),
    },
    async (args) => {
      try {
        const res = await rabisClient.chain.query.module({ id: args.parentId }).get({
          dataTypes: { id: true, name: true, displayName: true, description: true },
        });
        return successList(res.dataTypes || [], 'Список типов данных получен');
      } catch (e) {
        return error(e, 'Ошибка получения списка типов данных');
      }
    },
  ),
  defineTool(
    'data_update_data_type',
    {
      title: 'Update DataType',
      description: 'Обновляет Тип данных.',
      inputSchema: UpdateDataTypeSchema,
    },
    async (args) => {
      try {
        const localizedArgs = { ...args };
        if (localizedArgs.displayName) localizedArgs.displayName = toLocalizedJson(args.displayName);
        if (localizedArgs.description) localizedArgs.description = toLocalizedJson(args.description);
        const res = await rabisClient.chain.mutation.updateDataType({ dataType: localizedArgs }).get({ id: true, name: true });
        return success(res.id, 'Тип данных обновлён');
      } catch (e) {
        return error(e, 'Ошибка обновления типа данных');
      }
    },
  ),
  defineTool(
    'data_create_data_type',
    {
      title: 'Create DataType',
      description:
        'Создаёт новый ОБЫЧНЫЙ тип данных (не BPMN) внутри модуля. Lifecycle резолвится автоматически из модуля. Для BPMN-типа используй data_create_bpmn_data_type. Обычный тип — без workflow, для простых справочных сущностей.',
      inputSchema: CreateDataTypeSchema,
    },
    handleCreateDataType,
  ),
  defineTool(
    'data_create_bpmn_data_type',
    {
      title: 'Create Bpmn DataType',
      description:
        'Создаёт новый BPMN-тип данных (с бизнес-процессами и workflow) внутри указанного модуля. Для обычного типа данных (без workflow) используй data_create_data_type.',
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
    async (args) => {
      try {
        await rabisClient.chain.mutation.deleteMetaDataObject({ id: args.id });
        return success(args.id, 'Тип данных удалён');
      } catch (e) {
        return error(e, 'Ошибка удаления типа данных');
      }
    },
  ),
];
