import { rabisClient } from '../../../shared/services/rabisClient.service.js';
import { successList, error } from './utils.js';
import { defineTool } from '../../../shared/utils/base.js';
import { z } from 'zod';

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
];
