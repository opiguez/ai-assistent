import { z } from 'zod';
import { bpmnSchemaService } from '../../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../../services/bpmn-xml.service.js';
import { defineTool } from '../../../shared/utils/base.js';
import {
  ELEMENT_SIZES,
  calculatePosition,
  createModelEntry,
  successResponse,
  errorResponse,
} from './shared.js';

const AddIntermediateCatchEventSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z.string().max(255).optional().describe('Имя события'),
});

export async function handleAddIntermediateCatchEvent(
  args: z.infer<typeof AddIntermediateCatchEventSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:IntermediateCatchEvent',
      args.name,
    );
    if (!result) {
      return errorResponse('Не удалось создать IntermediateCatchEvent в XML');
    }

    const pos = calculatePosition(state.model, 'bpmn:IntermediateCatchEvent');
    const size = ELEMENT_SIZES['bpmn:IntermediateCatchEvent'];

    bpmnXmlService.addShapeToDiagram(
      state.parsed,
      result.elementId,
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    const newModel = { ...state.model };
    newModel[result.elementId] = createModelEntry(
      result.elementId,
      'bpmn:IntermediateCatchEvent',
      args.name || '',
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return errorResponse(
        saveResult.error || 'Ошибка сохранения изменений события',
      );
    }

    return successResponse({
      elementId: result.elementId,
      elementType: 'bpmn:IntermediateCatchEvent',
      name: args.name || null,
      message: `Успешно создан IntermediateCatchEvent с ID "${result.elementId}". Если это таймер или сигнал, настройте его тип следующим шагом.`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка создания IntermediateCatchEvent',
    );
  }
}

export const addIntermediateCatchEventTools = [
  defineTool(
    'bpmn_add_intermediate_catch_event',
    {
      title: 'Add IntermediateCatchEvent',
      description: 'Создаёт IntermediateCatchEvent. name опционален.',
      inputSchema: AddIntermediateCatchEventSchema,
    },
    handleAddIntermediateCatchEvent,
  ),
];
