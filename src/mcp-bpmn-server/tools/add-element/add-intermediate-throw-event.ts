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

const AddIntermediateThrowEventSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z.string().max(255).optional().describe('Имя события'),
});

async function handleAddIntermediateThrowEvent(
  args: z.infer<typeof AddIntermediateThrowEventSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:IntermediateThrowEvent',
      args.name,
    );
    if (!result) {
      return errorResponse('Не удалось создать IntermediateThrowEvent в XML');
    }

    const pos = calculatePosition(state.model, 'bpmn:IntermediateThrowEvent');
    const size = ELEMENT_SIZES['bpmn:IntermediateThrowEvent'];

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
      'bpmn:IntermediateThrowEvent',
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
      return errorResponse(saveResult.error || 'Ошибка изменений события');
    }

    return successResponse({
      elementId: result.elementId,
      elementType: 'bpmn:IntermediateThrowEvent',
      name: args.name || null,
      message: `Успешно создан IntermediateThrowEvent с ID "${result.elementId}". Если событие должно генерировать сигнал или сообщение, настройте его тип следующим шагом.`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка создания IntermediateThrowEvent',
    );
  }
}

export const addIntermediateThrowEventTools = [
  defineTool(
    'bpmn_add_intermediate_throw_event',
    {
      title: 'Add IntermediateThrowEvent',
      description: 'Создаёт IntermediateThrowEvent. name опционален.',
      inputSchema: AddIntermediateThrowEventSchema,
    },
    handleAddIntermediateThrowEvent,
  ),
];
