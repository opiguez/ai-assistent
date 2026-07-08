import { z } from 'zod';
import { bpmnSchemaService } from '../../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../../services/bpmn-xml.service.js';
import { defineTool } from '../../../shared/utils/base.js';
import {
  ELEMENT_SIZES,
  calculatePosition,
  createModelEntry,
  handleAssignee,
  successResponse,
  errorResponse,
} from './shared.js';

const ELEMENT_TYPES = [
  'bpmn:StartEvent',
  'bpmn:EndEvent',
  'bpmn:UserTask',
  'bpmn:ServiceTask',
  'bpmn:SendTask',
  'bpmn:ScriptTask',
  'bpmn:ExclusiveGateway',
  'bpmn:InclusiveGateway',
  'bpmn:SubProcess',
  'bpmn:BoundaryEvent',
  'bpmn:IntermediateCatchEvent',
  'bpmn:IntermediateThrowEvent',
] as const;

const AddElementSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementType: z
    .string()
    .describe(
      'Тип BPMN элемента: bpmn:StartEvent, bpmn:EndEvent, bpmn:UserTask, bpmn:ServiceTask, bpmn:SendTask, bpmn:ScriptTask, bpmn:ExclusiveGateway, bpmn:InclusiveGateway, bpmn:SubProcess, bpmn:BoundaryEvent, bpmn:IntermediateCatchEvent, bpmn:IntermediateThrowEvent',
    ),
  name: z.string().max(255).optional().describe('Имя элемента'),
  params: z
    .object({
      assignee: z
        .object({
          type: z.enum(['owner', 'user', 'group', 'variable']),
          value: z.string().optional(),
        })
        .optional()
        .describe(
          'Назначение для UserTask. По умолчанию: { type: "owner" }. type: "user" — конкретный пользователь, "group" — группа, "variable" — переменная процесса',
        ),
      apiSpecGroupId: z
        .string()
        .optional()
        .describe('ID группы API-спецификации (обязательно для ServiceTask)'),
      targetModule: z
        .string()
        .optional()
        .describe('Имя модуля (обязательно для ServiceTask)'),
      targetService: z
        .string()
        .optional()
        .describe('Имя сервиса (обязательно для ServiceTask)'),
      targetMethod: z
        .string()
        .optional()
        .describe('Имя метода (обязательно для ServiceTask)'),
      sendTaskType: z
        .string()
        .optional()
        .describe('camunda:type для SendTask (напр. "external")'),
      sendTaskTopic: z
        .string()
        .optional()
        .describe('camunda:topic для SendTask (напр. "Notification Task")'),
      attachedToRef: z
        .string()
        .optional()
        .describe('ID родительского элемента (обязательно для BoundaryEvent)'),
    })
    .optional()
    .describe('Дополнительные параметры элемента'),
});

async function handleAddElement(args: {
  dataTypeId: string;
  elementType: string;
  name?: string;
  params?: {
    assignee?: { type: string; value?: string };
    apiSpecGroupId?: string;
    targetModule?: string;
    targetService?: string;
    targetMethod?: string;
    sendTaskType?: string;
    sendTaskTopic?: string;
    attachedToRef?: string;
  };
}) {
  try {
    // Валидация типа
    if (!(ELEMENT_TYPES as readonly string[]).includes(args.elementType)) {
      return errorResponse(
        `Неизвестный тип элемента "${args.elementType}". Доступные типы: ${ELEMENT_TYPES.join(', ')}`,
      );
    }

    // Валидация обязательных params для ServiceTask
    if (args.elementType === 'bpmn:ServiceTask') {
      const p = args.params || {};
      if (!p.apiSpecGroupId || !p.targetModule || !p.targetService || !p.targetMethod) {
        return errorResponse(
          'Для ServiceTask обязательны params: apiSpecGroupId, targetModule, targetService, targetMethod. Сначала вызовите bpmn_get_api_spec для получения apiSpecGroupId.',
        );
      }
    }

    // Валидация обязательных params для BoundaryEvent
    if (args.elementType === 'bpmn:BoundaryEvent') {
      if (!args.params?.attachedToRef) {
        return errorResponse(
          'Для BoundaryEvent обязателен params.attachedToRef (ID родительского элемента).',
        );
      }
    }

    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    // Создаём элемент
    const result = bpmnXmlService.createElement(
      state.parsed,
      args.elementType,
      args.name,
      args.params?.attachedToRef,
    );
    if (!result) {
      return errorResponse('Не удалось создать элемент');
    }

    // Позиционирование и размер
    const size = ELEMENT_SIZES[args.elementType] || { width: 100, height: 80 };
    const pos = calculatePosition(
      state.model,
      args.elementType,
      args.params?.attachedToRef,
    );

    // Добавляем в diagram (кроме BoundaryEvent — он привязан к родителю)
    if (args.elementType !== 'bpmn:BoundaryEvent') {
      bpmnXmlService.addShapeToDiagram(
        state.parsed,
        result.elementId,
        pos.x,
        pos.y,
        size.width,
        size.height,
      );
    }

    // Создаём модель
    const newModel = { ...state.model };
    const modelEntry = createModelEntry(
      result.elementId,
      args.elementType,
      args.name || '',
      pos.x,
      pos.y,
      size.width,
      size.height,
      args.dataTypeId,
    );

    // Обработка assignee для UserTask
    if (args.elementType === 'bpmn:UserTask') {
      const assignee = args.params?.assignee || { type: 'owner' };
      const moduleName = args.dataTypeId.split('/').pop() || '';
      const assigneeConfig = handleAssignee(assignee, moduleName);

      modelEntry.require = assigneeConfig.require;
      if (assigneeConfig.attrs['camunda:candidateUsers']) {
        result.element.set(
          'camunda:candidateUsers',
          assigneeConfig.attrs['camunda:candidateUsers'],
        );
      }
      if (assigneeConfig.attrs['camunda:candidateGroups']) {
        result.element.set(
          'camunda:candidateGroups',
          assigneeConfig.attrs['camunda:candidateGroups'],
        );
      }

      // Декларируем views для UserTask
      modelEntry.views = {
        navigateView: null,
        editView: null,
        childTableView: null,
        cardView: null,
        tileView: null,
        calendarView: null,
      };
    }

    // Обработка ServiceTask
    if (args.elementType === 'bpmn:ServiceTask') {
      const p = args.params!;
      modelEntry.topic = 'BM Service Task';
      result.element.set('camunda:type', 'external');
      result.element.set('camunda:topic', 'BM Service Task');

      // ExtensionElements для targetModule, targetService, targetMethod
      const moddle = (bpmnXmlService as any).moddle;
      const extensionElements = moddle.create('bpmn:ExtensionElements', {
        values: [
          moddle.create('camunda:InputOutput', {
            inputParameters: [
              moddle.create('camunda:InputParameter', {
                name: 'targetModule',
                value: p.targetModule,
              }),
              moddle.create('camunda:InputParameter', {
                name: 'targetService',
                value: p.targetService,
              }),
              moddle.create('camunda:InputParameter', {
                name: 'targetMethod',
                value: p.targetMethod,
              }),
            ],
          }),
        ],
      });
      result.element.set('extensionElements', extensionElements);
    }

    // Обработка SendTask
    if (args.elementType === 'bpmn:SendTask') {
      const p = args.params || {};
      if (p.sendTaskType) {
        result.element.set('camunda:type', p.sendTaskType);
      }
      if (p.sendTaskTopic) {
        result.element.set('camunda:topic', p.sendTaskTopic);
      }
    }

    newModel[result.elementId] = modelEntry;

    // Сохраняем
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
      elementType: args.elementType,
      name: args.name || null,
      message: `Создан ${args.elementType} с ID "${result.elementId}"`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || `Ошибка создания элемента`);
  }
}

export const addGenericElementTools = [
  defineTool(
    'bpmn_add_element',
    {
      title: 'Add BPMN Element',
      description:
        'Универсальный инструмент создания BPMN элементов. Роутит по конкретному инструменту в зависимости от elementType. Для ServiceTask обязательны params: apiSpecGroupId, targetModule, targetService, targetMethod. Для BoundaryEvent — params.attachedToRef.',
      inputSchema: AddElementSchema,
    },
    handleAddElement,
  ),
];
