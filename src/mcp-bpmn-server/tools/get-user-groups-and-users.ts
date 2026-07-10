import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';

const GetUserGroupsAndUsersSchema = z.object({
  search: z
    .string()
    .optional()
    .describe('Поисковый запрос для фильтрации групп (опционально)'),
});

async function handleGetUserGroups(
  args: z.infer<typeof GetUserGroupsAndUsersSchema>,
) {
  try {
    const groups = await bpmnSchemaService.loadUserGroups(args.search);

    return successResponse({
      count: groups.length,
      groups,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Ошибка загрузки групп пользователей');
  }
}

async function handleGetUsers(
  args: z.infer<typeof GetUserGroupsAndUsersSchema>,
) {
  try {
    const groups = await bpmnSchemaService.loadUsers(args.search);

    return successResponse({
      count: groups.length,
      groups,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Ошибка загрузки пользователей');
  }
}

export const getUsersTools = [
  defineTool(
    'bpmn_get_users',
    {
      title: 'Get Users',
      description:
        'Возвращает список пользователей (для назначения на SendTask через recipients). Справочник — только чтение. Используй search для фильтрации.',
      inputSchema: GetUserGroupsAndUsersSchema,
    },
    handleGetUsers,
  ),
  defineTool(
    'bpmn_get_user_groups',
    {
      title: 'Get User Groups',
      description:
        'Возвращает список групп пользователей (для назначения на UserTask через candidateGroups). Справочник — только чтение. Используй search для фильтрации.',
      inputSchema: GetUserGroupsAndUsersSchema,
    },
    handleGetUserGroups,
  ),
];
