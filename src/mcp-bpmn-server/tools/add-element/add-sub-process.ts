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

const AddSubProcessSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z.string().max(255).optional().describe('Имя подпроцесса'),
});

async function handleAddSubProcess(args: { dataTypeId: string; name?: string }) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    // 1) SubProcess
    const subResult = bpmnXmlService.createElement(state.parsed, 'bpmn:SubProcess', args.name);
    if (!subResult) return errorResponse('Не удалось создать SubProcess');

    const pos = calculatePosition(state.model, 'bpmn:SubProcess');
    const size = ELEMENT_SIZES['bpmn:SubProcess'];

    bpmnXmlService.addShapeToDiagram(state.parsed, subResult.elementId, pos.x, pos.y, size.width, size.height);

    // 2) StartEvent внутри SubProcess
    const startEvent = bpmnXmlService.createElement(state.parsed, 'bpmn:StartEvent', '', subResult.elementId);
    if (!startEvent) return errorResponse('Не удалось создать StartEvent');

    const startX = pos.x + 40;
    const startY = pos.y + 82;
    bpmnXmlService.addShapeToDiagram(state.parsed, startEvent.elementId, startX, startY, 36, 36);

    // 3) EndEvent внутри SubProcess
    const endEvent = bpmnXmlService.createElement(state.parsed, 'bpmn:EndEvent', '', subResult.elementId);
    if (!endEvent) return errorResponse('Не удалось создать EndEvent');

    const endX = pos.x + 280;
    const endY = pos.y + 82;
    bpmnXmlService.addShapeToDiagram(state.parsed, endEvent.elementId, endX, endY, 36, 36);

    // 4) SequenceFlow Start → End (внутри SubProcess)
    const flow = bpmnXmlService.addSequenceFlow(
      state.parsed, startEvent.elementId, endEvent.elementId, undefined, subResult.elementId,
    );
    if (!flow) return errorResponse('Не удалось создать SequenceFlow');

    bpmnXmlService.addEdgeToDiagram(state.parsed, flow.flowId, [
      { x: startX + 36, y: startY + 18 },
      { x: endX, y: endY + 18 },
    ]);

    // 5) Decor
    const newModel = { ...state.model };
    newModel[subResult.elementId] = createModelEntry(
      subResult.elementId, 'bpmn:SubProcess', args.name || '', pos.x, pos.y, size.width, size.height,
    );
    newModel[startEvent.elementId] = {
      bpmndi: { bounds: { x: startX, y: startY, width: 36, height: 36 } },
      outgoing: flow.flowId,
    };
    newModel[endEvent.elementId] = {
      bpmndi: { bounds: { x: endX, y: endY, width: 36, height: 36 } },
    };
    newModel[flow.flowId] = {
      bpmndi: {
        waypoint: [
          { x: startX + 36, y: startY + 18 },
          { x: endX, y: endY + 18 },
        ],
      },
      require: [],
      produce: [],
    };

    // 6) Save
    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId, xml: updatedXml, decor: JSON.stringify(newModel),
    });
    if (!saveResult.success) return errorResponse(saveResult.error || 'Ошибка сохранения');

    return successResponse({
      elementId: subResult.elementId,
      elementType: 'bpmn:SubProcess',
      name: args.name || null,
      startEventId: startEvent.elementId,
      endEventId: endEvent.elementId,
      flowId: flow.flowId,
      message: `SubProcess "${subResult.elementId}" создан с StartEvent → EndEvent внутри`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Ошибка создания SubProcess');
  }
}

export const addSubProcessTools = [
  defineTool(
    'bpmn_add_sub_process',
    {
      title: 'Add SubProcess',
      description:
        'Создаёт SubProcess (300×200, isExpanded, name опционален) с вложенными StartEvent → SequenceFlow → EndEvent.',
      inputSchema: AddSubProcessSchema,
    },
    handleAddSubProcess,
  ),
];
