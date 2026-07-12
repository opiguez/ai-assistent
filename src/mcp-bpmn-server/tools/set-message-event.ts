import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';

const SetMessageEventSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementId: z.string().describe('ID Message Intermediate Throw/Catch Event'),
  messageId: z.string().describe('ID сообщения (correlation key)'),
  eventName: z.string().describe('Имя события (topic name)'),
});

async function handleSetMessageEvent(
  args: z.infer<typeof SetMessageEventSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const element = bpmnXmlService.getElementById(state.parsed, args.elementId);
    if (!element) {
      return errorResponse(`Элемент с ID "${args.elementId}" не найден`);
    }

    if (
      element.$type !== 'bpmn:IntermediateThrowEvent' &&
      element.$type !== 'bpmn:IntermediateCatchEvent' &&
      element.$type !== 'bpmn:SendTask' &&
      element.$type !== 'bpmn:ReceiveTask'
    ) {
      return errorResponse(
        `Message Event можно настроить только на IntermediateThrowEvent, IntermediateCatchEvent, SendTask или ReceiveTask (тип: ${element.$type})`,
      );
    }

    const newModel = { ...state.model };
    newModel[args.elementId] = {
      ...newModel[args.elementId],
      messageId: args.messageId,
      eventName: args.eventName,
    };

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
      status: 'success',
      elementId: args.elementId,
      messageId: args.messageId,
      eventName: args.eventName,
      message: `Message Event "${args.elementId}" настроен: messageId="${args.messageId}", eventName="${args.eventName}"`,
    });
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: e?.message || 'Ошибка настройки Message Event',
          }),
        },
      ],
    };
  }
}

export const setMessageEventTools = [
  defineTool(
    'bpmn_set_message_event',
    {
      title: 'Set Message Event',
      description: `Настраивает Message Intermediate Throw/Catch Event: задаёт messageId (correlation key) и eventName (topic name) в decor модели. Поддерживается также для SendTask/ReceiveTask.
messageId и eventName — произвольные строки, сохраняются как есть. bpmnMessages из контекста используются как подсказка — id сообщений (UUID) можно использовать как messageId.`,
      inputSchema: SetMessageEventSchema,
    },
    handleSetMessageEvent,
  ),
];
