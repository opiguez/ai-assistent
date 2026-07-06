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
  sendTaskType: z.string().optional().describe('camunda:type (напр. "external")'),
  sendTaskTopic: z.string().optional().describe('camunda:topic (напр. "Notification Task")'),
  sendTaskRecipients: z
    .string()
    .optional()
    .describe('JSON-строка массива получателей (напр. \'["userOf(admin)"]\')'),
  sendTaskTemplate: z.string().optional().describe('ID шаблона письма'),
});

async function handleAddSendTask(args: {
  dataTypeId: string;
  name?: string;
  sendTaskType?: string;
  sendTaskTopic?: string;
  sendTaskRecipients?: string;
  sendTaskTemplate?: string;
}) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    if (!args.name) {
      args.name = generateTaskName(state.model);
    }

    const result = bpmnXmlService.createElement(state.parsed, 'bpmn:SendTask', args.name);
    if (!result) {
      return errorResponse('Не удалось создать элемент');
    }

    if (args.sendTaskType) {
      result.element.$attrs['camunda:type'] = args.sendTaskType;
    }
    if (args.sendTaskTopic) {
      result.element.$attrs['camunda:topic'] = args.sendTaskTopic;
    }
    if (args.sendTaskRecipients || args.sendTaskTemplate) {
      const moddle = (bpmnXmlService as any).moddle;
      const extensionElements = moddle.create('bpmn:ExtensionElements', {
        values: [],
      });

      const inputOutput = moddle.create('camunda:InputOutput', {
        inputParameters: [],
        outputParameters: [],
      });

      if (args.sendTaskRecipients) {
        const recipientsParam = moddle.create('camunda:InputParameter', {
          name: 'recipients',
        });
        const recipientsValue = moddle.create('bpmn:FormalExpression', {
          body: args.sendTaskRecipients,
        });
        recipientsParam.set('value', recipientsValue);
        inputOutput.get('inputParameters').push(recipientsParam);
      }

      if (args.sendTaskTemplate) {
        const templateParam = moddle.create('camunda:InputParameter', {
          name: 'template',
        });
        const templateValue = moddle.create('bpmn:FormalExpression', {
          body: args.sendTaskTemplate,
        });
        templateParam.set('value', templateValue);
        inputOutput.get('inputParameters').push(templateParam);
      }

      extensionElements.get('values').push(inputOutput);
      result.element.set('extensionElements', extensionElements);
    }

    const pos = calculatePosition(state.model, 'bpmn:SendTask');
    const size = ELEMENT_SIZES['bpmn:SendTask'];

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
      'bpmn:SendTask',
      args.name,
      pos.x,
      pos.y,
      size.width,
      size.height,
      args.dataTypeId,
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
      elementType: 'bpmn:SendTask',
      name: args.name,
      message: `Создан SendTask с ID "${result.elementId}"`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Ошибка создания SendTask');
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
