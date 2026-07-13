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

export const AddSubProcessSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (модуля/процесса)'),
  name: z
    .string()
    .max(255)
    .optional()
    .describe('Имя подпроцесса (отображаемый текст)'),
  position: z
    .enum(['main', 'branch'])
    .optional()
    .describe(
      'Позиция: main — основной ряд (центр Y), branch — ветка Gateway (колонка со сдвигом Y)',
    ),
});

export async function handleAddSubProcess(
  args: z.infer<typeof AddSubProcessSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const pos = calculatePosition(state.model, 'bpmn:SubProcess', undefined, args.position);
    const size = ELEMENT_SIZES['bpmn:SubProcess'];

    const subResult = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:SubProcess',
      args.name,
    );

    if (!subResult) return errorResponse('Не удалось создать SubProcess в XML');

    bpmnXmlService.addShapeToDiagram(
      state.parsed,
      subResult.elementId,
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    const startEvent = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:StartEvent',
      '',
      subResult.elementId,
    );

    if (!startEvent)
      return errorResponse('Не удалось создать внутренний StartEvent');

    const startX = pos.x + 40;
    const startY = pos.y + size.height / 2 - 18; // Центрируем по вертикали относительно высоты подпроцесса
    bpmnXmlService.addShapeToDiagram(
      state.parsed,
      startEvent.elementId,
      startX,
      startY,
      36,
      36,
    );

    const endEvent = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:EndEvent',
      '',
      subResult.elementId,
    );
    if (!endEvent)
      return errorResponse('Не удалось создать внутренний EndEvent');

    const endX = pos.x + size.width - 76; // Отступаем от правого края подпроцесса
    const endY = startY; // На одной линии со стартом
    bpmnXmlService.addShapeToDiagram(
      state.parsed,
      endEvent.elementId,
      endX,
      endY,
      36,
      36,
    );

    // Проводим внутреннюю линию связи SequenceFlow: Start → End
    const flow = bpmnXmlService.addSequenceFlow(
      state.parsed,
      startEvent.elementId,
      endEvent.elementId,
      subResult.elementId,
    );
    if (!flow)
      return errorResponse('Не удалось создать внутренний SequenceFlow');

    // Отрисовываем линию на диаграмме (из центра старта в центр конца)
    const flowWaypoints = [
      { x: startX + 36, y: startY + 18 },
      { x: endX, y: endY + 18 },
    ];
    bpmnXmlService.addEdgeToDiagram(state.parsed, flow.flowId, flowWaypoints);

    const newModel = { ...state.model };

    // Запись для самого SubProcess (координаты + Low-Code маркер развернутого состояния)
    const subProcessEntry = createModelEntry(
      subResult.elementId,
      'bpmn:SubProcess',
      args.name || '',
      pos.x,
      pos.y,
      size.width,
      size.height,
    );
    newModel[subResult.elementId] = {
      ...subProcessEntry,
      isExpanded: true, // Сообщаем фронтенду, что подпроцесс развернут на схеме
      outgoing: null, // Инициализируем базовые свойства
    };

    newModel[startEvent.elementId] = {
      ...createModelEntry(
        startEvent.elementId,
        'bpmn:StartEvent',
        '',
        startX,
        startY,
        36,
        36,
      ),
      outgoing: flow.flowId,
    };

    newModel[endEvent.elementId] = createModelEntry(
      endEvent.elementId,
      'bpmn:EndEvent',
      '',
      endX,
      endY,
      36,
      36,
    );

    newModel[flow.flowId] = {
      elementType: 'bpmn:SequenceFlow',
      sourceRef: startEvent.elementId,
      targetRef: endEvent.elementId,
      name: '',
      require: [],
      produce: [],
      bpmndi: {
        waypoint: flowWaypoints,
      },
    };

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success)
      return errorResponse(
        saveResult.error || 'Ошибка при сохранении подпроцесса',
      );

    return successResponse({
      elementId: subResult.elementId,
      elementType: 'bpmn:SubProcess',
      name: args.name || null,
      startEventId: startEvent.elementId,
      endEventId: endEvent.elementId,
      flowId: flow.flowId,
      message: `Подпроцесс "${subResult.elementId}" успешно создан. Внутри автоматически сгенерирована базовая цепочка элементов (StartEvent → EndEvent).`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Внутренняя ошибка создания SubProcess');
  }
}

export const addSubProcessTools = [
  defineTool(
    'bpmn_add_sub_process',
    {
      title: 'Add SubProcess',
      description: 'Создаёт SubProcess (300×200, isExpanded, name опционален) с вложенными StartEvent → SequenceFlow → EndEvent.',
      inputSchema: AddSubProcessSchema,
    },
    handleAddSubProcess,
  ),
];
