import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { rabisClient } from '../../shared/services/rabisClient.service.js';
import { defineTool } from '../../shared/utils/base.js';

const SetServiceTaskConfigSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementId: z.string().describe('ID ServiceTask'),
  apiSpecId: z.string().describe('ID API спеки (OpenAPI)'),
  methodName: z.string().describe('Имя метода в API спеке'),
});

async function handleSetServiceTaskConfig(args: {
  dataTypeId: string;
  elementId: string;
  apiSpecId: string;
  methodName: string;
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

    if (element.$type !== 'bpmn:ServiceTask') {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Элемент "${args.elementId}" не является ServiceTask (тип: ${element.$type})`,
            }),
          },
        ],
      };
    }

    // Получаем данные API спеки для привязки
    const specRes = await rabisClient.chain.query
      .apiSpec({ id: args.apiSpecId })
      .get({
        name: true,
        serviceUrl: true,
        moduleDtoJson: true,
      });

    if (!(specRes as any).name) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `API спека с ID "${args.apiSpecId}" не найдена`,
            }),
          },
        ],
      };
    }

    let methodPath = '';
    let httpMethod = '';
    try {
      const moduleDto = JSON.parse((specRes as any).moduleDtoJson || '[]');
      for (const mod of moduleDto) {
        for (const svc of mod.serviceDtos || []) {
          for (const method of svc.methods || []) {
            if (method.name === args.methodName || method.technicalName === args.methodName) {
              methodPath = method.path;
              httpMethod = method.httpMethod;
              break;
            }
          }
        }
      }
    } catch {}

    if (!methodPath) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Метод "${args.methodName}" не найден в API спеке "${args.apiSpecId}"`,
            }),
          },
        ],
      };
    }

    const newModel = { ...state.model };
    newModel[args.elementId] = {
      ...newModel[args.elementId],
      type: 'module',
      topic: `${(specRes as any).serviceUrl}${methodPath}`,
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
            topic: newModel[args.elementId].topic,
            message: `ServiceTask "${args.elementId}" привязан к API: ${httpMethod} ${methodPath}`,
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
            message: e?.message || 'Ошибка настройки ServiceTask',
          }),
        },
      ],
    };
  }
}

export const setServiceTaskConfigTools = [
  defineTool(
    'bpmn_set_service_task_config',
    {
      title: 'Set Service Task Config',
      description:
        'Настраивает ServiceTask (BM Service Task): привязывает к API спеке и методу. Устанавливает type="module" и topic (URL эндпоинта).',
      inputSchema: SetServiceTaskConfigSchema,
    },
    handleSetServiceTaskConfig,
  ),
];
