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

export const AddSendTaskSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z
    .string()
    .max(255)
    .optional()
    .describe('Имя задачи. Если не указано — генерируется "Элемент N"'),
  recipients: z
    .array(z.string())
    .min(1, 'Необходимо указать хотя бы одного получателя')
    .describe(
      'Массив логинов получателей из контекста данных (users), например: ["admin", "some_name_of_user"]',
    ),
  template: z
    .string()
    .describe(
      "ID шаблона письма (Берем конкретный из postTemplates[] в свойствах dataType')",
    ),
});

function transformUsers(users: Array<string>) {
  if (!Array.isArray(users)) {
    return [];
  }
  return users.map((user: string) => `userOf(${user})`);
}

/**
 * Извлекает UUID шаблона из полного пути postTemplate
 * Пример: "/modules/test/.../post-templates/e5ee8045d56b494ab961b050dff92" -> "e5ee8045d56b494ab961b050dff92"
 */
function extractTemplateUuid(fullPath: string): string {
  if (!fullPath) return '';

  // Регулярное выражение ищет hex-последовательность (с дефисами или без) на конце строки
  const match = fullPath.match(
    /([a-f0-9]{8}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{12}|[a-f0-9]{32})$/i,
  );

  if (match) {
    return match[1];
  }

  // Фолбэк: если регулярка не сработала, просто берем последний сегмент пути после слэша
  const segments = fullPath.split('/').filter(Boolean);
  return segments.length > 0 ? segments[segments.length - 1] : '';
}

export async function handleAddSendTask(
  args: z.infer<typeof AddSendTaskSchema>,
) {
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

    const type = 'external';
    const topic = 'Notification Task';
    bpmnElement.set('camunda:type', type);
    bpmnElement.set('camunda:topic', topic);

    // Мапим получателей и шаблоны в XML ExtensionElements (Camunda Input Parameters)
    const inputParameters: any[] = [];

    if (args.recipients) {
      inputParameters.push(
        moddle.create('camunda:InputParameter', {
          name: 'recipients',
          value: JSON.stringify(transformUsers(args.recipients)),
        }),
      );
    }

    if (args.template) {
      inputParameters.push(
        moddle.create('camunda:InputParameter', {
          name: 'template',
          value: extractTemplateUuid(args.template),
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
      value: transformUsers(args.recipients) || [],
      template: extractTemplateUuid(args.template ? args.template : ''),
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
