import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { rabisClient } from '../../shared/services/rabisClient.service.js';
import { defineTool } from '../../shared/utils/base.js';

const SetRdmStructureSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementId: z.string().describe('ID Gateway'),
  rdmPropertyId: z.string().describe('ID RDM свойства (DataTypeProperty)'),
});

async function handleSetRdmStructure(args: {
  dataTypeId: string;
  elementId: string;
  rdmPropertyId: string;
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

    if (
      element.$type !== 'bpmn:ExclusiveGateway' &&
      element.$type !== 'bpmn:InclusiveGateway'
    ) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `RDM Structure можно назначить только на Exclusive/Inclusive Gateway (тип: ${element.$type})`,
            }),
          },
        ],
      };
    }

    // Проверяем существование RDM свойства
    const propRes = await rabisClient.chain.query
      .dataType({ id: args.rdmPropertyId })
      .get({
        id: true,
        displayName: true,
      });

    if (!(propRes as any).id) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `RDM свойство с ID "${args.rdmPropertyId}" не найдено`,
            }),
          },
        ],
      };
    }

    const newModel = { ...state.model };
    newModel[args.elementId] = {
      ...newModel[args.elementId],
      DataTypeProperty: args.rdmPropertyId,
    };

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
            rdmPropertyId: args.rdmPropertyId,
            rdmPropertyName: (propRes as any).displayName,
            message: `RDM Structure назначена на Gateway "${args.elementId}". Свойство: ${(propRes as any).displayName}`,
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
            message: e?.message || 'Ошибка назначения RDM Structure',
          }),
        },
      ],
    };
  }
}

export const setRdmStructureTools = [
  defineTool(
    'bpmn_set_rdm_structure',
    {
      title: 'Set RDM Structure',
      description:
        'Назначает RDM Structure (DataTypeProperty) на Exclusive/Inclusive Gateway. Привязывает Gateway к конкретному RDM свойству для ветвления по значениям.',
      inputSchema: SetRdmStructureSchema,
    },
    handleSetRdmStructure,
  ),
];
