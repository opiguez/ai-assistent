import { z } from 'zod';
import { rabisClient } from '../../../shared/services/rabisClient.service.js';
import { defineTool } from '../../../shared/utils/base.js';
import { success, error, successList, deriveUpdateSchema, toLocalizedJson } from './utils.js';

export type ToolDef = {
  name: string;
  config: { title: string; description: string; inputSchema: z.ZodObject<any> };
  cb: (args: any) => Promise<any>;
};

export interface EntityConfig {
  key: string;
  displayName: string;
  displayNameRu: string;
  queryField: string;
  createMutation?: string;
  createInputKey?: string;
  updateMutation?: string;
  updateInputKey?: string;
  createSchema?: z.ZodObject<any>;
  updateSchema?: z.ZodObject<any>;
  getSelection: Record<string, any>;
  listSelection?: Record<string, any>;
  listConfig?: {
    type: 'applicationQuery';
    parentField: string;
  } | {
    type: 'parentQuery';
    parentField: string;
  };
  afterCreate?: (result: { id: string }, args: any) => Promise<void>;
  skipCreate?: boolean;
  skipUpdate?: boolean;
  skipGet?: boolean;
  skipList?: boolean;
}

function mutationInputKey(mutation: string): string {
  return mutation.replace(/^(create|update)/, '').replace(/^./, (c) => c.toLowerCase());
}

export function buildDeleteHandler(labelRu: string) {
  return async (args: { id: string }) => {
    try {
      await rabisClient.chain.mutation.deleteMetaDataObject({ id: args.id });
      return success(args.id, `${labelRu} удалён`);
    } catch (e) {
      return error(e, `Ошибка удаления ${labelRu.toLowerCase()}`);
    }
  };
}

export function buildEntityTools(config: EntityConfig): ToolDef[] {
  const tools: ToolDef[] = [];

  // GET by ID
  if (!config.skipGet) {
    tools.push(
      defineTool(
        `data_get_${config.key}`,
        {
          title: `Get ${config.displayName}`,
          description: `Возвращает ${config.displayNameRu} по ID.`,
          inputSchema: z.object({
            id: z.string().describe(`ID ${config.displayNameRu}`),
          }),
        },
        async (args: { id: string }) => {
          try {
            const res = await (rabisClient.chain.query as any)[config.queryField]({ id: args.id }).get(config.getSelection);
            return successList([res], `${config.displayNameRu} получен`);
          } catch (e) {
            return error(e, `Ошибка получения ${config.displayNameRu}`);
          }
        },
      ),
    );
  }

  // LIST
  if (!config.skipList && config.listConfig && config.listSelection) {
    const listSchema = config.listConfig.type === 'applicationQuery'
      ? z.object({})
      : z.object({ parentId: z.string().describe('ID родительского модуля') });

    tools.push(
      defineTool(
        `data_get_${config.key}s`,
        {
          title: `Get All ${config.displayName}s`,
          description: `Возвращает список всех ${config.displayNameRu}.`,
          inputSchema: listSchema,
        },
        async (args: any) => {
          try {
            let items: any[];
            if (config.listConfig!.type === 'applicationQuery') {
              const res = await rabisClient.chain.query.application.get({ [config.listConfig!.parentField]: config.listSelection });
              items = (res as any)[config.listConfig!.parentField];
            } else {
              const res = await rabisClient.chain.query.module({ id: args.parentId }).get({ [config.listConfig!.parentField]: config.listSelection });
              items = (res as any)[config.listConfig!.parentField];
            }
            return successList(items || [], `Список ${config.displayNameRu} получен`);
          } catch (e) {
            return error(e, `Ошибка получения списка ${config.displayNameRu}`);
          }
        },
      ),
    );
  }

  // CREATE
  if (!config.skipCreate && config.createMutation && config.createSchema) {
    const inputKey = config.createInputKey || mutationInputKey(config.createMutation);
    tools.push(
      defineTool(
        `data_create_${config.key}`,
        {
          title: `Create ${config.displayName}`,
          description: `Создаёт новый ${config.displayNameRu}.`,
          inputSchema: config.createSchema,
        },
        async (args: any) => {
          try {
            const res = await (rabisClient.chain.mutation as any)[config.createMutation!]({ [inputKey]: args }).get({ id: true, name: true });
            if (config.afterCreate) await config.afterCreate(res, args);
            return success(res.id, `${config.displayNameRu} успешно создан`);
          } catch (e) {
            return error(e, `Ошибка создания ${config.displayNameRu}`);
          }
        },
      ),
    );
  }

  // UPDATE
  if (!config.skipUpdate && config.updateMutation) {
    const updateSchema = config.updateSchema || (config.createSchema ? deriveUpdateSchema(config.createSchema, { omitFields: ['parentId', 'iconBatchId', 'brandingJson'] }) : undefined);
    const inputKey = config.updateInputKey || mutationInputKey(config.updateMutation);

    if (updateSchema) {
      tools.push(
        defineTool(
          `data_update_${config.key}`,
          {
            title: `Update ${config.displayName}`,
            description: `Обновляет ${config.displayNameRu}.`,
            inputSchema: updateSchema,
          },
          async (args: any) => {
            try {
              const localizedArgs = { ...args };
              if (localizedArgs.displayName) localizedArgs.displayName = toLocalizedJson(args.displayName);
              if (localizedArgs.description) localizedArgs.description = toLocalizedJson(args.description);
              const res = await (rabisClient.chain.mutation as any)[config.updateMutation!]({ [inputKey]: localizedArgs }).get({ id: true, name: true });
              return success(res.id, `${config.displayNameRu} обновлён`);
            } catch (e) {
              return error(e, `Ошибка обновления ${config.displayNameRu}`);
            }
          },
        ),
      );
    }
  }

  return tools;
}
