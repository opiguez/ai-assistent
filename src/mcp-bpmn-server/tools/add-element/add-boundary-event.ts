import { z } from 'zod';
import { bpmnSchemaService } from '../../services/bpmn-schema.service.js';
import {
  bpmnXmlService,
  ModdleElement,
} from '../../services/bpmn-xml.service.js';
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
  attachedToRef: z
    .string()
    .describe(
      'ID родительского элемента (Task/SubProcess), к которому крепится BoundaryEvent',
    ),
});

async function handleAddBoundaryEvent(
  args: z.infer<typeof AddBoundaryEventSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const parentElement = bpmnXmlService.getElementById(
      state.parsed,
      args.attachedToRef,
    ) as ModdleElement | null;
    if (!parentElement) {
      return errorResponse(
        `Родительский элемент "${args.attachedToRef}" не найден в XML структуре`,
      );
    }

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:BoundaryEvent',
      args.name,
      args.attachedToRef,
    );
    if (!result) {
      return errorResponse('Не удалось инициализировать BoundaryEvent в XML');
    }

    const bpmnElement = result.element as ModdleElement;

    bpmnElement.set('attachedToRef', parentElement);

    const size = ELEMENT_SIZES['bpmn:BoundaryEvent'];
    const pos = calculatePosition(
      state.model,
      'bpmn:BoundaryEvent',
      args.attachedToRef,
    );

    bpmnXmlService.addShapeToDiagram(
      state.parsed,
      result.elementId,
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    const newModel = { ...state.model };
    const baseEntry = createModelEntry(
      result.elementId,
      'bpmn:BoundaryEvent',
      args.name || '',
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    const boundaryEntry = {
      ...baseEntry,
      attachedToRef: args.attachedToRef,
    };

    newModel[result.elementId] = boundaryEntry;

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return errorResponse(saveResult.error || 'Ошибка сохранения изменений');
    }

    return successResponse({
      elementId: result.elementId,
      elementType: 'bpmn:BoundaryEvent',
      name: args.name || null,
      attachedToRef: args.attachedToRef,
      message: `Успешно создан BoundaryEvent с ID "${result.elementId}" и прикреплён к элементу "${args.attachedToRef}"`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка создания BoundaryEvent',
    );
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
