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

const AddServiceTaskSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z
    .string()
    .max(255)
    .optional()
    .describe('Имя задачи. Если не указано — генерируется "Элемент N"'),
  apiSpecGroupId: z
    .string()
    .describe('ID группы API спецификаций (apiSpecGroup). Обязателен для валидации'),
  targetModule: z
    .string()
    .describe('Имя модуля. Сохраняется как camunda:inputParameter "targetModule"'),
  targetService: z
    .string()
    .describe('Имя сервиса. Сохраняется как camunda:inputParameter "targetService"'),
  targetMethod: z
    .string()
    .describe('Имя метода. Сохраняется как camunda:inputParameter "targetMethod"'),
  threadCount: z
    .string()
    .optional()
    .describe('Количество потоков. Сохраняется как camunda:inputParameter "threadCount"'),
});

async function handleAddServiceTask(args: {
  dataTypeId: string;
  name?: string;
  apiSpecGroupId: string;
  targetModule: string;
  targetService: string;
  targetMethod: string;
  threadCount?: string;
}) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    if (!args.name) {
      args.name = generateTaskName(state.model);
    }

    const result = bpmnXmlService.createElement(state.parsed, 'bpmn:ServiceTask', args.name);
    if (!result) {
      return errorResponse('Не удалось создать элемент');
    }

    result.element.$attrs['camunda:type'] = 'external';
    result.element.$attrs['camunda:topic'] = 'BM Service Task';

    const moddle = (bpmnXmlService as any).moddle;
    const extensionElements = moddle.create('bpmn:ExtensionElements', {
      values: [],
    });

    const inputOutput = moddle.create('camunda:InputOutput', {
      inputParameters: [
        moddle.create('camunda:InputParameter', {
          name: 'targetModule',
          value: args.targetModule,
        }),
        moddle.create('camunda:InputParameter', {
          name: 'targetService',
          value: args.targetService,
        }),
        moddle.create('camunda:InputParameter', {
          name: 'targetMethod',
          value: args.targetMethod,
        }),
      ],
      outputParameters: [],
    });

    if (args.threadCount) {
      inputOutput.get('inputParameters').push(
        moddle.create('camunda:InputParameter', {
          name: 'threadCount',
          value: args.threadCount,
        }),
      );
    }

    extensionElements.get('values').push(inputOutput);
    result.element.set('extensionElements', extensionElements);

    const pos = calculatePosition(state.model, 'bpmn:ServiceTask');
    const size = ELEMENT_SIZES['bpmn:ServiceTask'];

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
      'bpmn:ServiceTask',
      args.name,
      pos.x,
      pos.y,
      size.width,
      size.height,
      args.dataTypeId,
    );

    newModel[result.elementId].apiSpecGroupId = args.apiSpecGroupId;
    newModel[result.elementId].targetModule = args.targetModule;
    newModel[result.elementId].targetService = args.targetService;
    newModel[result.elementId].targetMethod = args.targetMethod;

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
      elementType: 'bpmn:ServiceTask',
      name: args.name,
      apiSpecGroupId: args.apiSpecGroupId,
      targetModule: args.targetModule,
      targetService: args.targetService,
      targetMethod: args.targetMethod,
      message: `ServiceTask "${result.elementId}" создан: ${args.targetModule}/${args.targetService}/${args.targetMethod}`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Ошибка создания ServiceTask');
  }
}

export const addServiceTaskTools = [
  defineTool(
    'bpmn_add_service_task',
    {
      title: 'Add ServiceTask',
      description:
        'Создаёт ServiceTask с полной конфигурацией: camunda:type="external", camunda:topic="BM Service Task", extensionElements > camunda:InputOutput с targetModule, targetService, targetMethod. apiSpecGroupId и targetModule/targetService/targetMethod обязательны. threadCount опционален.',
      inputSchema: AddServiceTaskSchema,
    },
    handleAddServiceTask,
  ),
];
