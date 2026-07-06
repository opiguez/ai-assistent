import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { checkConstraint } from '../services/constraint-utils.js';

const GetElementConstraintsSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementId: z.string().describe('ID элемента'),
  operation: z
    .enum([
      'delete',
      'connect',
      'changeType',
      'addBoundaryEvent',
      'directEdit',
      'addDecision',
      'addRdmStructure',
    ])
    .describe('Операция для проверки'),
});

async function handleGetElementConstraints(args: {
  dataTypeId: string;
  elementId: string;
  operation: string;
}) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);
    const element = bpmnXmlService.getElementById(state.parsed, args.elementId);

    if (!element) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Элемент с ID "${args.elementId}" не найден`,
            }),
          },
        ],
      };
    }

    const modelProps = state.model[args.elementId] || {};
    const result = checkConstraint(args.operation, element, modelProps, state);

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              status: 'success',
              elementId: args.elementId,
              elementType: element.$type,
              operation: args.operation,
              allowed: result.allowed,
              reason: result.reason,
              details: result.details,
            },
            null,
            2,
          ),
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
            message: e?.message || 'Ошибка проверки ограничений',
          }),
        },
      ],
    };
  }
}

export const getElementConstraintsTools = [
  defineTool(
    'bpmn_get_element_constraints',
    {
      title: 'Get Element Constraints',
      description:
        'Проверяет ограничения для операции над элементом. Операции: delete, connect, changeType, addBoundaryEvent, directEdit, addDecision, addRdmStructure. Возвращает allowed (boolean) и reason (string).',
      inputSchema: GetElementConstraintsSchema,
    },
    handleGetElementConstraints,
  ),
];
