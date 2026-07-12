import { z } from 'zod';
import { bpmnSchemaService } from '../../services/bpmn-schema.service.js';
import {
  bpmnXmlService,
  ModdleElement,
} from '../../services/bpmn-xml.service.js';
import { defineTool } from '../../../shared/utils/base.js';
import {
  ELEMENT_SIZES,
  generateTaskName,
  calculatePosition,
  createModelEntry,
  successResponse,
  errorResponse,
} from './shared.js';

export const AddServiceTaskSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (модуля/процесса)'),
  name: z
    .string()
    .max(255)
    .optional()
    .describe('Имя задачи (отображаемый текст)'),
  apiSpecGroupId: z
    .string()
    .describe(
      'ID группы API спецификаций (apiSpecGroup). Обязателен для Low-Code валидации',
    ),
  targetModule: z
    .string()
    .describe(
      'Имя целевого модуля Low-Code платформы (передается в camunda:inputParameter "targetModule")',
    ),
  targetService: z
    .string()
    .describe(
      'Имя сервиса (передается в camunda:inputParameter "targetService")',
    ),
  targetMethod: z
    .string()
    .describe(
      'Имя вызываемого метода API (передается в camunda:inputParameter "targetMethod")',
    ),
  threadCount: z
    .string()
    .optional()
    .describe(
      'Количество потоков исполнения (передается в camunda:inputParameter "threadCount")',
    ),
});

export async function handleAddServiceTask(
  args: z.infer<typeof AddServiceTaskSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    let taskName = args.name;
    if (!taskName) {
      taskName = generateTaskName(state.model);
    }

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:ServiceTask',
      taskName,
    );
    if (!result) {
      return errorResponse('Не удалось создать ServiceTask в XML');
    }

    const bpmnElement = result.element as ModdleElement;
    const moddle = bpmnXmlService['moddle'];

    bpmnElement.set('camunda:type', 'external');
    bpmnElement.set('camunda:topic', 'BM Service Task');

    // Создаем коллекцию параметров InputParameter
    const inputParameters: any[] = [
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
    ];

    // Если передан поток выполнения — пушим его в обычный массив свойств
    if (args.threadCount) {
      inputParameters.push(
        moddle.create('camunda:InputParameter', {
          name: 'threadCount',
          value: args.threadCount,
        }),
      );
    }

    // Создаем объект camunda:InputOutput
    const inputOutput = moddle.create('camunda:InputOutput', {
      inputParameters: inputParameters,
      outputParameters: [],
    });

    // Упаковываем всё в контейнер ExtensionElements
    const extensionElements = moddle.create('bpmn:ExtensionElements', {
      values: [inputOutput],
    });

    bpmnElement.set('extensionElements', extensionElements);

    const pos = calculatePosition(state.model, 'bpmn:ServiceTask');
    const size = ELEMENT_SIZES['bpmn:ServiceTask'] || {
      width: 100,
      height: 80,
    };

    bpmnXmlService.addShapeToDiagram(
      state.parsed,
      result.elementId,
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    const newModel = { ...state.model };

    // Получаем базовый чистый каркас записи (bounds и имя)
    const baseEntry = createModelEntry(
      result.elementId,
      'bpmn:ServiceTask',
      taskName,
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    const serviceTaskEntry = {
      ...baseEntry,
      require: [],
      produce: [],
      topic: 'BM Service Task',
      apiSpecGroupId: args.apiSpecGroupId,
      targetModule: args.targetModule,
      targetService: args.targetService,
      targetMethod: args.targetMethod,
      ...(args.threadCount ? { threadCount: args.threadCount } : {}),
    };

    newModel[result.elementId] = serviceTaskEntry;

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return errorResponse(
        saveResult.error || 'Ошибка при сохранении ServiceTask',
      );
    }

    return successResponse({
      elementId: result.elementId,
      elementType: 'bpmn:ServiceTask',
      name: taskName,
      message: `Успешно создан ServiceTask "${result.elementId}" для метода API: ${args.targetModule}/${args.targetService}/${args.targetMethod}`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка создания ServiceTask',
    );
  }
}

export const addServiceTaskTools = [
  defineTool(
    'bpmn_add_service_task',
    {
      title: 'Add ServiceTask',
      description: `Создаёт элемент bpmn:ServiceTask для интеграции с внешними API методами.
Автоматически настраивает Camunda-расширения: camunda:type="external" и camunda:topic="BM Service Task".
Вшивает параметры targetModule, targetService и targetMethod внутрь extensionElements > camunda:InputOutput.
Внимание: параметры apiSpecGroupId, targetModule, targetService и targetMethod являются строго обязательными.
Сначала используйте \`bpmn_get_api_spec\`, чтобы получить валидный apiSpecGroupId.
Параметр threadCount является опциональным.`,
      inputSchema: AddServiceTaskSchema,
    },
    handleAddServiceTask,
  ),
];
