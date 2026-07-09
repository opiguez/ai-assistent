import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService, ModdleElement } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';

const SetRdmOrNumberStructureSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (модуля/процесса)'),
  elementId: z.string().describe('ID Exclusive/Inclusive Gateway на схеме'),
  typeProperty: z.enum(['realNumber', 'rdmStructure']),
  propertyValue: z
    .string()
    .describe(
      'Имя(name) переменной SELECT(ссылается на справочник) (напр. "test-test1:select")',
    ),
});

export async function handleSetRdmOrNumberStructure(
  args: z.infer<typeof SetRdmOrNumberStructureSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const element = bpmnXmlService.getElementById(
      state.parsed,
      args.elementId,
    ) as ModdleElement | undefined;
    if (!element) {
      return errorResponse(
        `Элемент с ID "${args.elementId}" не найден в BPMN XML`,
      );
    }

    if (
      element.$type !== 'bpmn:ExclusiveGateway' &&
      element.$type !== 'bpmn:InclusiveGateway'
    ) {
      return errorResponse(
        `RDM Structure можно назначить только на Exclusive или Inclusive Gateway (текущий тип: ${element.$type})`,
      );
    }

    const newModel = { ...state.model };

    newModel[args.elementId] = {
      ...newModel[args.elementId],
      DataTypeProperty: args.typeProperty,
      DataTypePropertyValue: args.propertyValue,
    };

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return errorResponse(
        saveResult.error || 'Ошибка при сохранении изменений шлюза',
      );
    }

    return successResponse({
      elementId: args.elementId,
      propertyValue: args.propertyValue,
      typeProperty: args.typeProperty,
      message: `RDM Structure успешно настроена на Gateway "${args.elementId}". Выставлена переменная "${args.propertyValue} c типом ${args.typeProperty}". В XML шлюза изменения не вносились согласно правилам платформы.`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка назначения RDM Structure',
    );
  }
}

export const setRdmAndNumberStructureTools = [
  defineTool(
    'bpmn_set_rdm_structure',
    {
      title: 'Set RDM Structure',
      description:
        'Назначает RDM/RealNumber Structure (DataTypeProperty) на Exclusive/Inclusive Gateway. Привязывает Gateway к конкретному RDM/RealNumber свойству для ветвления по значениям.',
      inputSchema: SetRdmOrNumberStructureSchema,
    },
    handleSetRdmOrNumberStructure,
  ),
];
