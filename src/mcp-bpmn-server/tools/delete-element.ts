import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { checkConstraint } from '../services/constraint-utils.js';
import { defineTool } from '../../shared/utils/base.js';

const DeleteElementSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementId: z.string().describe('ID элемента для удаления'),
  confirm: z
    .literal(true)
    .describe('Подтверждение удаления (обязательно true)'),
});

async function handleDeleteElement(args: {
  dataTypeId: string;
  elementId: string;
  confirm: boolean;
}) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    // Проверяем существование элемента
    const element = bpmnXmlService.getElementById(state.parsed, args.elementId);
    if (!element) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Элемент "${args.elementId}" не найден`,
            }),
          },
        ],
      };
    }

    // Проверяем constraints
    const constraint = checkConstraint(
      'delete',
      element,
      state.model[args.elementId] || {},
      state.parsed,
    );

    if (!constraint.allowed) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Удаление запрещено: ${constraint.reason}`,
            }),
          },
        ],
      };
    }

    const deleted = bpmnXmlService.deleteElement(state.parsed, args.elementId);

    if (!deleted) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message:
                'Не удалось удалить элемент (возможно, это StartEvent или EndEvent)',
            }),
          },
        ],
      };
    }

    const newModel = { ...state.model };
    delete newModel[args.elementId];

    const incoming = [...(element.get('incoming') || [])];
    const outgoing = [...(element.get('outgoing') || [])];
    for (const flow of [...incoming, ...outgoing]) {
      delete newModel[flow.id];
    }

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);

    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: saveResult.error || 'Ошибка сохранения',
            }),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'success',
            elementId: args.elementId,
            elementType: element.$type,
            message: `Элемент "${args.elementId}" (${element.$type}) удалён`,
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
            message: e?.message || 'Ошибка удаления элемента',
          }),
        },
      ],
    };
  }
}

export const deleteElementTools = [
  defineTool(
    'bpmn_delete_element',
    {
      title: 'Delete BPMN Element',
      description:
        'Удаляет BPMN элемент и все связанные SequenceFlow. Требуется подтверждение (confirm: true). Проверяет constraints перед удалением. StartEvent и EndEvent нельзя удалять.',
      inputSchema: DeleteElementSchema,
    },
    handleDeleteElement,
  ),
];
