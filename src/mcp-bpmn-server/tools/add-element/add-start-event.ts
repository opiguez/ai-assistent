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

const AddStartEventSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z.string().max(255).optional().describe('Имя события'),
});

async function handleAddStartEvent(args: z.infer<typeof AddStartEventSchema>) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const hasStartEvent = Object.values(state.model).some(
      (element: any) => element.elementType === 'bpmn:StartEvent',
    );
    if (hasStartEvent) {
      return errorResponse(
        `В процессе "${args.dataTypeId}" уже существует стартовое событие. Создание второго запрещено правилами платформы.`,
      );
    }

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:StartEvent',
      args.name,
    );
    if (!result) {
      return errorResponse('Не удалось создать элемент');
    }

    const pos = calculatePosition(state.model, 'bpmn:StartEvent');
    const size = ELEMENT_SIZES['bpmn:StartEvent'] || { width: 36, height: 36 };

    // Отрисовка графики (DI)
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
      'bpmn:StartEvent',
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
      return errorResponse(saveResult.error || 'Ошибка сохранения');
    }

    return successResponse({
      elementId: result.elementId,
      elementType: 'bpmn:StartEvent',
      name: args.name || null,
      message: `Создан StartEvent с ID "${result.elementId}"`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Ошибка создания StartEvent');
  }
}

export const addStartEventTools = [
  defineTool(
    'bpmn_add_start_event',
    {
      title: 'Add StartEvent',
      description: 'Создаёт StartEvent. name опционален.',
      inputSchema: AddStartEventSchema,
    },
    handleAddStartEvent,
  ),
];
