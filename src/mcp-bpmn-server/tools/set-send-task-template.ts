import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';

const SetSendTaskTemplateSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementId: z.string().describe('ID SendTask'),
  template: z.string().describe('Шаблон письма (HTML/текст)'),
  emailTo: z.string().describe('Адрес получателя (email)'),
  emailSubject: z.string().describe('Тема письма'),
  emailFrom: z.string().describe('Адрес отправителя'),
});

async function handleSetSendTaskTemplate(args: {
  dataTypeId: string;
  elementId: string;
  template: string;
  emailTo: string;
  emailSubject: string;
  emailFrom: string;
}) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const element = bpmnXmlService.getElementById(state.parsed, args.elementId);
    if (!element) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Элемент с ID "${args.elementId}" не найден`,
            }),
          },
        ],
      };
    }

    if (element.$type !== 'bpmn:SendTask') {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Элемент "${args.elementId}" не является SendTask (тип: ${element.$type})`,
            }),
          },
        ],
      };
    }

    const templateData = {
      to: args.emailTo,
      subject: args.emailSubject,
      from: args.emailFrom,
      html: args.template,
    };

    const newModel = { ...state.model };
    newModel[args.elementId] = {
      ...newModel[args.elementId],
      template: JSON.stringify(templateData),
    };

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);

    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: saveResult.error || 'Ошибка сохранения',
            }),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'success',
            elementId: args.elementId,
            emailTo: args.emailTo,
            emailSubject: args.emailSubject,
            message: `SendTask "${args.elementId}" настроен: письмо ${args.emailTo}, тема "${args.emailSubject}"`,
          }),
        },
      ],
    };
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: e?.message || 'Ошибка настройки SendTask',
          }),
        },
      ],
    };
  }
}

export const setSendTaskTemplateTools = [
  defineTool(
    'bpmn_set_send_task_template',
    {
      title: 'Set Send Task Template',
      description:
        'Настраивает SendTask: задаёт шаблон письма (HTML), адрес получателя, тему и адрес отправителя. Сохраняет template в custom Model как JSON.',
      inputSchema: SetSendTaskTemplateSchema,
    },
    handleSetSendTaskTemplate,
  ),
];
