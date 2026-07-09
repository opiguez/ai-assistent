import { z } from 'zod';
import { bpmnSchemaService } from '../../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../../services/bpmn-xml.service.js';
import { defineTool } from '../../../shared/utils/base.js';
import {
  ELEMENT_SIZES,
  generateTaskName,
  calculatePosition,
  createModelEntry,
  successResponse,
  errorResponse,
} from './shared.js';

const AddSendTaskSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z
    .string()
    .max(255)
    .optional()
    .describe('Имя задачи. Если не указано — генерируется "Элемент N"'),
  sendTaskType: z
    .string()
    .optional()
    .describe('camunda:type (напр. "external")'),
  sendTaskTopic: z
    .string()
    .optional()
    .describe('camunda:topic (напр. "Notification Task")'),
  sendTaskRecipients: z
    .string()
    .optional()
    .describe('JSON-строка массива получателей (напр. \'["userOf(admin)"]\')'),
  sendTaskTemplate: z.string().optional().describe('ID шаблона письма'),
});

async function handleAddSendTask(args: z.infer<typeof AddSendTaskSchema>) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    if (!args.name) {
      args.name = generateTaskName(state.model);
    }

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:SendTask',
      args.name,
    );

    if (!result) {
      return errorResponse('Не удалось создать SendTask в XML');
    }

    const bpmnElement = result.element;
    const moddle = (bpmnXmlService as any).moddle;

    const type = args.sendTaskType || 'external';
    const topic = args.sendTaskTopic || 'Notification Task';
    bpmnElement.set('camunda:type', type);
    bpmnElement.set('camunda:topic', topic);

    // Мапим получателей и шаблоны в XML ExtensionElements (Camunda Input Parameters)
    const inputParameters: any[] = [];

    if (args.sendTaskRecipients) {
      inputParameters.push(
        moddle.create('camunda:InputParameter', {
          name: 'sendTaskRecipients',
          value: args.sendTaskRecipients,
        }),
      );
    }

    if (args.sendTaskTemplate) {
      inputParameters.push(
        moddle.create('camunda:InputParameter', {
          name: 'sendTaskTemplate',
          value: args.sendTaskTemplate,
        }),
      );
    }

    // Если есть параметры, упаковываем их в ExtensionElements
    if (inputParameters.length > 0) {
      const extensionElements = moddle.create('bpmn:ExtensionElements', {
        values: [moddle.create('camunda:InputOutput', { inputParameters })],
      });
      bpmnElement.set('extensionElements', extensionElements);
    }

    const size = ELEMENT_SIZES['bpmn:SendTask'];
    const pos = calculatePosition(state.model, 'bpmn:SendTask');

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
      'bpmn:SendTask',
      args.name || '',
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    const sendTaskEntry = {
      ...baseEntry,
      require: [],
      produce: [],
      notificateCreator: false,
      notificateAssignee: false,
      outgoing: null,
      sendTaskType: type,
      sendTaskTopic: topic,
      sendTaskRecipients: args.sendTaskRecipients || null,
      sendTaskTemplate: args.sendTaskTemplate || null,
    };

    newModel[result.elementId] = sendTaskEntry;

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return errorResponse(saveResult.error || 'Ошибка сохранения SendTask');
    }

    return successResponse({
      elementId: result.elementId,
      elementType: 'bpmn:SendTask',
      name: args.name || null,
      message: `Успешно создан и сконфигурирован SendTask с ID "${result.elementId}"`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка при создании SendTask',
    );
  }
}

export const addSendTaskTools = [
  defineTool(
    'bpmn_add_send_task',
    {
      title: 'Add SendTask',
      description:
        'Создаёт SendTask с camunda:type/topic и extensionElements (recipients/template). Если name не указан — генерируется "Элемент N".',
      inputSchema: AddSendTaskSchema,
    },
    handleAddSendTask,
  ),
];
