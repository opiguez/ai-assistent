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

const AddBoundaryEventSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z.string().max(255).optional().describe('Имя события'),
  attachedToRef: z.string().describe('ID родительского элемента (Task/SubProcess), к которому крепится BoundaryEvent'),
});

async function handleAddBoundaryEvent(args: {
  dataTypeId: string;
  name?: string;
  attachedToRef: string;
}) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const parentElement = bpmnXmlService.getElementById(state.parsed, args.attachedToRef);
    if (!parentElement) {
      return errorResponse(`Родительский элемент "${args.attachedToRef}" не найден`);
    }

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:BoundaryEvent',
      args.name,
    );
    if (!result) {
      return errorResponse('Не удалось создать элемент');
    }

    result.element.$attrs['attachedToRef'] = args.attachedToRef;

    const pos = calculatePosition(state.model, 'bpmn:BoundaryEvent', args.attachedToRef);
    const size = ELEMENT_SIZES['bpmn:BoundaryEvent'];

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
      'bpmn:BoundaryEvent',
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
      elementType: 'bpmn:BoundaryEvent',
      name: args.name || null,
      attachedToRef: args.attachedToRef,
      message: `Создан BoundaryEvent с ID "${result.elementId}" (прикреплён к ${args.attachedToRef})`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Ошибка создания BoundaryEvent');
  }
}

export const addBoundaryEventTools = [
  defineTool(
    'bpmn_add_boundary_event',
    {
      title: 'Add BoundaryEvent',
      description:
        'Создаёт BoundaryEvent, прикреплённый к Task/SubProcess. attachedToRef — обязателен. name опционален.',
      inputSchema: AddBoundaryEventSchema,
    },
    handleAddBoundaryEvent,
  ),
];
