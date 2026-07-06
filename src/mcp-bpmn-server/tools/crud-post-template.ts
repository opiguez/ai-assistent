import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { defineTool } from '../../shared/utils/base.js';

// ─── Create ──────────────────────────────────────────────

const CreatePostTemplateSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (parentId)'),
  bodyTemplate: z.string().describe('Тело шаблона письма (HTML/текст)'),
  subjectTemplate: z.string().describe('Шаблон темы письма'),
  displayName: z.string().optional().describe('Отображаемое имя'),
  name: z.string().optional().describe('Имя (key)'),
  description: z.string().optional().describe('Описание'),
});

async function handleCreatePostTemplate(args: {
  dataTypeId: string;
  bodyTemplate: string;
  subjectTemplate: string;
  displayName?: string;
  name?: string;
  description?: string;
}) {
  try {
    const result = await bpmnSchemaService.createPostTemplate({
      parentId: args.dataTypeId,
      bodyTemplate: args.bodyTemplate,
      subjectTemplate: args.subjectTemplate,
      displayName: args.displayName,
      name: args.name,
      description: args.description,
    });

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'success',
            postTemplate: result,
            message: `PostTemplate создан: ${args.displayName || args.name || result.id}`,
          }, null, 2),
        },
      ],
    };
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: e?.message || 'Ошибка создания PostTemplate',
          }),
        },
      ],
    };
  }
}

// ─── Update ──────────────────────────────────────────────

const UpdatePostTemplateSchema = z.object({
  id: z.string().describe('ID PostTemplate'),
  bodyTemplate: z.string().optional().describe('Тело шаблона письма (HTML/текст)'),
  subjectTemplate: z.string().optional().describe('Шаблон темы письма'),
  displayName: z.string().optional().describe('Отображаемое имя'),
  name: z.string().optional().describe('Имя (key)'),
  description: z.string().optional().describe('Описание'),
});

async function handleUpdatePostTemplate(args: {
  id: string;
  bodyTemplate?: string;
  subjectTemplate?: string;
  displayName?: string;
  name?: string;
  description?: string;
}) {
  try {
    const result = await bpmnSchemaService.updatePostTemplate(args);

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'success',
            postTemplate: result,
            message: `PostTemplate ${args.id} обновлён`,
          }, null, 2),
        },
      ],
    };
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: e?.message || 'Ошибка обновления PostTemplate',
          }),
        },
      ],
    };
  }
}

// ─── Delete ──────────────────────────────────────────────

const DeletePostTemplateSchema = z.object({
  id: z.string().describe('ID PostTemplate для удаления'),
  confirm: z.literal(true).describe('Подтверждение удаления (обязательно true)'),
});

async function handleDeletePostTemplate(args: { id: string; confirm: boolean }) {
  try {
    const success = await bpmnSchemaService.deletePostTemplate(args.id);

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: success ? 'success' : 'error',
            id: args.id,
            message: success
              ? `PostTemplate ${args.id} удалён`
              : `Не удалось удалить PostTemplate ${args.id}`,
          }),
        },
      ],
    };
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: e?.message || 'Ошибка удаления PostTemplate',
          }),
        },
      ],
    };
  }
}

// ─── Validate ────────────────────────────────────────────

const ValidatePostTemplateSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (parentId)'),
  bodyTemplate: z.string().describe('Тело шаблона письма (HTML/текст)'),
  subjectTemplate: z.string().describe('Шаблон темы письма'),
  id: z.string().optional().describe('ID PostTemplate (если обновление существующего)'),
});

async function handleValidatePostTemplate(args: {
  dataTypeId: string;
  bodyTemplate: string;
  subjectTemplate: string;
  id?: string;
}) {
  try {
    const valid = await bpmnSchemaService.validatePostTemplate({
      parentId: args.dataTypeId,
      bodyTemplate: args.bodyTemplate,
      subjectTemplate: args.subjectTemplate,
      id: args.id,
    });

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'success',
            valid,
            message: valid
              ? 'PostTemplate валиден'
              : 'PostTemplate не прошёл валидацию',
          }),
        },
      ],
    };
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: e?.message || 'Ошибка валидации PostTemplate',
          }),
        },
      ],
    };
  }
}

export const crudPostTemplateTools = [
  defineTool(
    'bpmn_create_post_template',
    {
      title: 'Create Post Template',
      description:
        'Создаёт шаблон письма (PostTemplate) для процесса. Указывает тело письма (HTML) и шаблон темы.',
      inputSchema: CreatePostTemplateSchema,
    },
    handleCreatePostTemplate,
  ),
  defineTool(
    'bpmn_update_post_template',
    {
      title: 'Update Post Template',
      description:
        'Обновляет шаблон письма (PostTemplate). Можно изменить тело, тему, имя или описание.',
      inputSchema: UpdatePostTemplateSchema,
    },
    handleUpdatePostTemplate,
  ),
  defineTool(
    'bpmn_delete_post_template',
    {
      title: 'Delete Post Template',
      description:
        'Удаляет шаблон письма (PostTemplate) по ID.',
      inputSchema: DeletePostTemplateSchema,
    },
    handleDeletePostTemplate,
  ),
  defineTool(
    'bpmn_validate_post_template',
    {
      title: 'Validate Post Template',
      description:
        'Проверяет валидность шаблона письма (PostTemplate) на стороне backend.',
      inputSchema: ValidatePostTemplateSchema,
    },
    handleValidatePostTemplate,
  ),
];
