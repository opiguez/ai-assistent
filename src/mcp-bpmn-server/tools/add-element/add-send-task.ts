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
      `Массив получателей: user.name из users (обернётся в userOf(name)), 
      либо field.key из dataTypeProperties.genericProperties[USER] (обернётся в valueOf(key)),
      либо field.key из dataTypeProperties.genericProperties[SELECTION] (обернётся в selectOf(key))`,
    ),
  template: z
    .string()
    .describe(
      "ID шаблона письма: postTemplate.id из data-context (UUID, извлекается автоматически)",
    ),
});

function transformRecipients(
  recipients: string[],
  genericProperties: Record<string, any>,
) {
  if (!Array.isArray(recipients)) return [];

  const propsMap: Record<string, string> = {};
  const genericProps = genericProperties || {};

  // Проходим по всем группам типов
  Object.keys(genericProps).forEach((typeGroup) => {
    const propsArray = genericProps[typeGroup];
    if (Array.isArray(propsArray)) {
      propsArray.forEach((prop: any) => {
        if (prop?.key && prop?.propertyTypeEnum) {
          propsMap[prop.key] = prop.propertyTypeEnum;
        }
      });
    }
  });

  return recipients.map((item: string) => {
    const foundType = propsMap[item];

    if (foundType) {
      // Если тип USER -> макрос valueOf
      if (foundType === 'USER') {
        return `valueOf("${item}")`;
      }
      // Если тип выборки/справочника (singleSelect) -> макрос selectOf
      if (foundType === 'SELECTION') {
        return `selectOf("${item}")`;
      }

      throw new Error(
        `Переменная "${item}" имеет тип "${foundType}". 
        Использовать переменные этого типа в качестве получателей SendTask запрещено. Разрешены только USER и SELECTION.`,
      );
    }

    // Если ключа вообще нет в метаданных -> это жестко прописанный логин пользователя
    return `userOf(${item})`;
  });
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

    const finalRecipients = transformRecipients(
      args.recipients,
      state.data.dataTypeProperties.genericProperties,
    );
    const cleanTemplateUuid = extractTemplateUuid(args.template || '');

    // Мапим получателей и шаблоны в XML ExtensionElements (Camunda Input Parameters)
    const inputParameters: any[] = [];

    if (args.recipients) {
      inputParameters.push(
        moddle.create('camunda:InputParameter', {
          name: 'recipients',
          value: JSON.stringify(finalRecipients),
        }),
      );
    }

    if (args.template) {
      inputParameters.push(
        moddle.create('camunda:InputParameter', {
          name: 'template',
          value: cleanTemplateUuid,
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
      value: finalRecipients,
      template: cleanTemplateUuid,
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
      description: `Создаёт SendTask с camunda:type/topic и extensionElements (recipients/template). Если name не указан — генерируется "Элемент N".
Доступные данные из контекста (bpmn://process/{dataTypeId}/data-context):
  - postTemplates → template = postTemplate.id (UUID)
  - users → recipients = user.name (обёрнется в userOf)
  - dataTypeProperties.genericProperties[USER] → recipients = field.key (обёрнется в valueOf)
  - dataTypeProperties.genericProperties[SELECTION] → recipients = field.key (обёрнется в selectOf)`,
      inputSchema: AddSendTaskSchema,
    },
    handleAddSendTask,
  ),
];
