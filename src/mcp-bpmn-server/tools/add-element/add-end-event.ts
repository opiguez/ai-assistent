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

const AddEndEventSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z.string().max(255).optional().describe('Имя события'),
});

export async function handleAddEndEvent(args: z.infer<typeof AddEndEventSchema>) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const hasEndEvent = Object.values(state.model).some(
      (element: any) => element.elementType === 'bpmn:EndEvent',
    );
    if (hasEndEvent) {
      return errorResponse(
        `В процессе "${args.dataTypeId}" уже существует конечное событие. По правилам платформы допускается строго один EndEvent.`,
      );
    }

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:EndEvent',
      args.name,
    );
    if (!result) {
      return errorResponse('Не удалось создать EndEvent в XML');
    }

    const size = ELEMENT_SIZES['bpmn:EndEvent'];
    const pos = calculatePosition(state.model, 'bpmn:EndEvent');

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
      'bpmn:EndEvent',
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
        saveResult.error || 'Ошибка сохранения изменений в базе',
      );
    }

    return successResponse({
      elementId: result.elementId,
      elementType: 'bpmn:EndEvent',
      name: args.name || null,
      message: `Успешно создан единственный EndEvent с ID "${result.elementId}"`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Внутренняя ошибка создания EndEvent');
  }
}

export const addEndEventTools = [
  defineTool(
    'bpmn_add_end_event',
    {
      title: 'Add EndEvent',
      description: 'Создаёт EndEvent. name опционален.',
      inputSchema: AddEndEventSchema,
    },
    handleAddEndEvent,
  ),
];
