import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { defineTool } from '../../shared/utils/base.js';

// ─── Create ──────────────────────────────────────────────

const CreateBpmnMessageSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (parentId)'),
  name: z.string().describe('Имя сообщения (key)'),
  displayName: z.string().optional().describe('Отображаемое имя'),
  description: z.string().optional().describe('Описание'),
  dataJson: z.string().optional().describe('JSON строка с данными сообщения (структура полей)'),
});

async function handleCreateBpmnMessage(args: {
  dataTypeId: string;
  name: string;
  displayName?: string;
  description?: string;
  dataJson?: string;
}) {
  try {
    const result = await bpmnSchemaService.createBpmnMessage({
      parentId: args.dataTypeId,
      name: args.name,
      displayName: args.displayName,
      description: args.description,
      dataJson: args.dataJson,
    });

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'success',
            bpmnMessage: result,
            message: `BpmnMessage создан: ${args.displayName || args.name}`,
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
            message: e?.message || 'Ошибка создания BpmnMessage',
          }),
        },
      ],
    };
  }
}

// ─── Update ──────────────────────────────────────────────

const UpdateBpmnMessageSchema = z.object({
  id: z.string().describe('ID BpmnMessage'),
  displayName: z.string().optional().describe('Отображаемое имя'),
  description: z.string().optional().describe('Описание'),
  dataJson: z.string().optional().describe('JSON строка с данными сообщения'),
});

async function handleUpdateBpmnMessage(args: {
  id: string;
  displayName?: string;
  description?: string;
  dataJson?: string;
}) {
  try {
    const result = await bpmnSchemaService.updateBpmnMessage(args);

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'success',
            bpmnMessage: result,
            message: `BpmnMessage ${args.id} обновлён`,
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
            message: e?.message || 'Ошибка обновления BpmnMessage',
          }),
        },
      ],
    };
  }
}

// ─── Delete ──────────────────────────────────────────────

const DeleteBpmnMessageSchema = z.object({
  id: z.string().describe('ID BpmnMessage для удаления'),
  confirm: z.literal(true).describe('Подтверждение удаления (обязательно true)'),
});

async function handleDeleteBpmnMessage(args: { id: string; confirm: boolean }) {
  try {
    const success = await bpmnSchemaService.deleteBpmnMessage(args.id);

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: success ? 'success' : 'error',
            id: args.id,
            message: success
              ? `BpmnMessage ${args.id} удалён`
              : `Не удалось удалить BpmnMessage ${args.id}`,
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
            message: e?.message || 'Ошибка удаления BpmnMessage',
          }),
        },
      ],
    };
  }
}

// ─── Validate ────────────────────────────────────────────

const ValidateBpmnMessageSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (parentId)'),
  name: z.string().describe('Имя сообщения (key)'),
  id: z.string().optional().describe('ID BpmnMessage (если обновление существующего)'),
});

async function handleValidateBpmnMessage(args: {
  dataTypeId: string;
  name: string;
  id?: string;
}) {
  try {
    const valid = await bpmnSchemaService.validateBpmnMessage({
      parentId: args.dataTypeId,
      name: args.name,
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
              ? 'BpmnMessage валиден'
              : 'BpmnMessage не прошёл валидацию',
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
            message: e?.message || 'Ошибка валидации BpmnMessage',
          }),
        },
      ],
    };
  }
}

export const crudBpmnMessageTools = [
  defineTool(
    'bpmn_create_bpmn_message',
    {
      title: 'Create BPMN Message',
      description:
        'Создаёт BPMN сообщение для процесса. Задаёт имя, отображаемое имя и JSON-данные структуры полей.',
      inputSchema: CreateBpmnMessageSchema,
    },
    handleCreateBpmnMessage,
  ),
  defineTool(
    'bpmn_update_bpmn_message',
    {
      title: 'Update BPMN Message',
      description:
        'Обновляет BPMN сообщение. Можно изменить отображаемое имя, описание и JSON-данные.',
      inputSchema: UpdateBpmnMessageSchema,
    },
    handleUpdateBpmnMessage,
  ),
  defineTool(
    'bpmn_delete_bpmn_message',
    {
      title: 'Delete BPMN Message',
      description:
        'Удаляет BPMN сообщение по ID.',
      inputSchema: DeleteBpmnMessageSchema,
    },
    handleDeleteBpmnMessage,
  ),
  defineTool(
    'bpmn_validate_bpmn_message',
    {
      title: 'Validate BPMN Message',
      description:
        'Проверяет валидность BPMN сообщения на стороне backend.',
      inputSchema: ValidateBpmnMessageSchema,
    },
    handleValidateBpmnMessage,
  ),
];
