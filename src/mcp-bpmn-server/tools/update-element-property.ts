import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { CUSTOM_MODEL_PROPERTIES } from '../knowledge/bpmn-element-specs.js';
import { defineTool } from '../../shared/utils/base.js';

const UpdateElementPropertySchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementId: z.string().describe('ID элемента'),
  property: z
    .enum([
      'type',
      'DataTypeProperty',
      'DataTypePropertyValue',
      'decisionsEnabled',
      'isManualTask',
      'topic',
      'template',
      'simplifiedViewStep',
      'isCancelEvent',
      'isDeleteEvent',
      'isDearchiveEvent',
      'messageId',
      'eventName',
    ])
    .describe('Имя свойства custom Model'),
  value: z
    .union([z.string(), z.boolean(), z.number()])
    .describe('Значение свойства'),
});

async function handleUpdateElementProperty(args: {
  dataTypeId: string;
  elementId: string;
  property: string;
  value: any;
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

    const spec = CUSTOM_MODEL_PROPERTIES[args.property as keyof typeof CUSTOM_MODEL_PROPERTIES];
    if (!spec) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Неизвестное свойство: ${args.property}`,
            }),
          },
        ],
      };
    }

    const newModel = { ...state.model };
    newModel[args.elementId] = { ...newModel[args.elementId] };

    if (args.property === 'type') {
      const validTypes = (CUSTOM_MODEL_PROPERTIES.type as any).allowedValues as string[];
      if (!validTypes.includes(args.value as string)) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                status: 'error',
                message: `Недопустимое значение type: ${args.value}. Допустимые: ${validTypes.join(', ')}`,
              }),
            },
          ],
        };
      }
      newModel[args.elementId].type = args.value as string;
    } else {
      (newModel[args.elementId] as any)[args.property] = args.value;
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
            property: args.property,
            value: args.value,
            message: `Свойство "${args.property}" элемента "${args.elementId}" обновлено`,
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
            message: e?.message || 'Ошибка обновления свойства',
          }),
        },
      ],
    };
  }
}

export const updateElementPropertyTools = [
  defineTool(
    'bpmn_update_element_property',
    {
      title: 'Update Element Property',
      description:
        'Обновляет свойство custom Model элемента BPMN. Доступные свойства: type, DataTypeProperty, DataTypePropertyValue, decisionsEnabled, isManualTask, topic, template, simplifiedViewStep, isCancelEvent, isDeleteEvent, isDearchiveEvent, messageId, eventName.',
      inputSchema: UpdateElementPropertySchema,
    },
    handleUpdateElementProperty,
  ),
];
