import { rabisClient } from '../../../shared/services/rabisClient.service.js';
import { success, successList, error } from './utils.js';
import { defineTool } from '../../../shared/utils/base.js';
import { z } from 'zod';
import { ModuleIdSchema, PublishSchema, ValidationResultsSchema } from './schema.js';

const handleGetRoles = async () => {
  try {
    const res = await rabisClient.chain.query
      .roles({
        params: { pagination: { pageIndex: 0, pageSize: 200 } },
      })
      .get({
        items: { id: true, name: true, displayName: true, description: true },
      });
    return successList(res.items || [], 'Роли получены');
  } catch (e) {
    return error(e, 'Ошибка получения ролей');
  }
};

const handleDisablePublishing = async (args: { moduleId: string }) => {
  try {
    await rabisClient.chain.mutation.disablePublishing({ moduleId: args.moduleId }).get();
    return success(args.moduleId, 'Публикация модуля отключена');
  } catch (e) {
    return error(e, 'Ошибка отключения публикации модуля');
  }
};

const handleEnablePublishing = async (args: { moduleId: string }) => {
  try {
    await rabisClient.chain.mutation.enablePublishing({ moduleId: args.moduleId }).get();
    return success(args.moduleId, 'Публикация модуля включена');
  } catch (e) {
    return error(e, 'Ошибка включения публикации модуля');
  }
};

const handleGetValidationResults = async (args: { severity?: string }) => {
  try {
    const res = await rabisClient.chain.query
      .validationResults({ severity: args.severity || undefined })
      .get({ isValid: true, dataType: { id: true, name: true }, module: { id: true, name: true } });
    return successList(res || [], 'Результаты валидации получены');
  } catch (e) {
    return error(e, 'Ошибка получения результатов валидации');
  }
};

const handlePublish = async (args: { comment: string }) => {
  try {
    await rabisClient.chain.mutation.publish({ comment: args.comment }).get();
    return success(args.comment, 'Публикация выполнена');
  } catch (e) {
    return error(e, 'Ошибка публикации');
  }
};

export const coreTools = [
  defineTool(
    'data_get_roles',
    {
      title: 'Get Roles',
      description:
        'Возвращает список всех ролей в системе.',
      inputSchema: z.object({}),
    },
    handleGetRoles,
  ),
  defineTool(
    'data_disable_publishing',
    {
      title: 'Disable Publishing',
      description:
        'Отключает публикацию для указанного модуля.',
      inputSchema: ModuleIdSchema,
    },
    handleDisablePublishing,
  ),
  defineTool(
    'data_enable_publishing',
    {
      title: 'Enable Publishing',
      description:
        'Включает публикацию для указанного модуля.',
      inputSchema: ModuleIdSchema,
    },
    handleEnablePublishing,
  ),
  defineTool(
    'data_get_validation_results',
    {
      title: 'Get Validation Results',
      description:
        'Возвращает результаты валидации перед публикацией.',
      inputSchema: ValidationResultsSchema,
    },
    handleGetValidationResults,
  ),
  defineTool(
    'data_publish',
    {
      title: 'Publish Application',
      description:
        'Публикует приложение (все модули с включённой публикацией).',
      inputSchema: PublishSchema,
    },
    handlePublish,
  ),
];
