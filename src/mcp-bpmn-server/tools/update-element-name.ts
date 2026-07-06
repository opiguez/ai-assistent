import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';

const UpdateElementNameSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementId: z.string().describe('ID элемента'),
  name: z.string().describe('Новое имя элемента'),
});

async function handleUpdateElementName(args: {
  dataTypeId: string;
  elementId: string;
  name: string;
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

    const updatedXml = await bpmnXmlService.updateElementName(
      state.parsed,
      args.elementId,
      args.name,
    );

    const newModel = { ...state.model };
    if (newModel[args.elementId]) {
      newModel[args.elementId] = { ...newModel[args.elementId] };
      newModel[args.elementId].name = args.name;
    } else {
      newModel[args.elementId] = { name: args.name };
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
            elementId: args.elementId,
            name: args.name,
            message: `Имя элемента "${args.elementId}" обновлено на "${args.name}"`,
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
            message: e?.message || 'Ошибка обновления имени',
          }),
        },
      ],
    };
  }
}

export const updateElementNameTools = [
  defineTool(
    'bpmn_update_element_name',
    {
      title: 'Update Element Name',
      description:
        'Обновляет имя (label) элемента BPMN диаграммы. Элемент ищется по ID, устанавливается новое отображаемое имя.',
      inputSchema: UpdateElementNameSchema,
    },
    handleUpdateElementName,
  ),
];
