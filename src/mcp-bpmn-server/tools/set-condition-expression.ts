import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';

const SetConditionExpressionSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  connectionId: z.string().describe('ID SequenceFlow'),
  expression: z
    .string()
    .optional()
    .describe(
      'FEEL выражение. Формат: = "значение" для строк, = true/false для булевых, = сумма > 1000 для числовых сравнений',
    ),
  conditionName: z
    .string()
    .optional()
    .describe(
      'Отображаемое имя условия (лейбл на стрелке). Используй для decisions: "Подтвердить", "Отклонить".',
    ),
});

async function handleSetConditionExpression(args: {
  dataTypeId: string;
  connectionId: string;
  expression?: string;
  conditionName?: string;
}) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const element = bpmnXmlService.getElementById(state.parsed, args.connectionId);
    if (!element || element.$type !== 'bpmn:SequenceFlow') {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `SequenceFlow с ID "${args.connectionId}" не найден`,
            }),
          },
        ],
      };
    }

    // Обновляем conditionExpression если задан
    let updatedXml: string;
    if (args.expression) {
      updatedXml = await bpmnXmlService.setConditionExpression(
        state.parsed,
        args.connectionId,
        args.expression,
      );
    } else {
      updatedXml = await bpmnXmlService.generateXml(state.parsed);
    }

    // Обновляем conditionName (лейбл) в custom model
    const newModel = { ...state.model };
    if (args.conditionName !== undefined) {
      newModel[args.connectionId] = {
        ...newModel[args.connectionId],
        name: args.conditionName,
      };
    }

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
            connectionId: args.connectionId,
            expression: args.expression || null,
            conditionName: args.conditionName || null,
            message: `SequenceFlow "${args.connectionId}" обновлен`,
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
            message: e?.message || 'Ошибка установки условия',
          }),
        },
      ],
    };
  }
}

export const setConditionExpressionTools = [
  defineTool(
    'bpmn_set_condition_expression',
    {
      title: 'Set Condition Expression',
      description:
        'Устанавливает условное выражение (conditionExpression) и/или лейбл (conditionName) для SequenceFlow. Формат FEEL: = "approved" для строк, = true для булевых. Используется для ExclusiveGateway и decisions.',
      inputSchema: SetConditionExpressionSchema,
    },
    handleSetConditionExpression,
  ),
];
