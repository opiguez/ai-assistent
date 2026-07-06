import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';

const ELEMENT_SIZES: Record<string, { width: number; height: number }> = {
  'bpmn:StartEvent': { width: 36, height: 36 },
  'bpmn:EndEvent': { width: 36, height: 36 },
  'bpmn:IntermediateThrowEvent': { width: 36, height: 36 },
  'bpmn:IntermediateCatchEvent': { width: 36, height: 36 },
  'bpmn:BoundaryEvent': { width: 36, height: 36 },
  'bpmn:ExclusiveGateway': { width: 50, height: 50 },
  'bpmn:InclusiveGateway': { width: 50, height: 50 },
  'bpmn:UserTask': { width: 100, height: 80 },
  'bpmn:ServiceTask': { width: 100, height: 80 },
  'bpmn:SendTask': { width: 100, height: 80 },
  'bpmn:ScriptTask': { width: 100, height: 80 },
  'bpmn:SubProcess': { width: 100, height: 80 },
};

function calculateNewElementPosition(
  model: Record<string, Record<string, any>>,
  elementType: string,
): { x: number; y: number } {
  const size = ELEMENT_SIZES[elementType] || { width: 100, height: 80 };
  let maxX = 100;

  for (const entry of Object.values(model)) {
    if (entry?.bpmndi?.bounds) {
      const right = entry.bpmndi.bounds.x + (entry.bpmndi.bounds.width || 100);
      if (right > maxX) maxX = right;
    }
  }

  return { x: maxX + 250, y: 159 };
}

function generateTaskName(
  model: Record<string, Record<string, any>>,
): string {
  let maxNum = 0;
  for (const entry of Object.values(model)) {
    if (entry?.name && /^Элемент \d+$/.test(entry.name)) {
      const num = parseInt(entry.name.match(/\d+/)?.[0] || '0', 10);
      if (num > maxNum) maxNum = num;
    }
  }
  return `Элемент ${maxNum + 1}`;
}

function handleAssignee(
  assignee: { type: string; value?: string },
  moduleName: string,
): { require: string[]; attrs: Record<string, string> } {
  switch (assignee.type) {
    case 'owner': {
      const name = `${moduleName}:common:_owner`;
      const techName = name.replace(/[:\-]/g, '_');
      return {
        require: [name],
        attrs: {
          'camunda:candidateUsers': `\${S(${techName}).prop('login').stringValue()}`,
        },
      };
    }
    case 'user':
      return {
        require: [],
        attrs: { 'camunda:candidateUsers': assignee.value || '' },
      };
    case 'group':
      return {
        require: [],
        attrs: { 'camunda:candidateGroups': assignee.value || '' },
      };
    case 'variable': {
      const name = assignee.value || '';
      const techName = name.replace(/[:\-]/g, '_');
      return {
        require: [name],
        attrs: {
          'camunda:candidateUsers': `\${S(${techName}).prop('login').stringValue()}`,
        },
      };
    }
    default:
      return { require: [], attrs: {} };
  }
}

function createDefaultModelEntry(
  elementId: string,
  elementType: string,
  name: string,
  x: number,
  y: number,
  width: number,
  height: number,
  dataTypeId?: string,
): Record<string, any> {
  const entry: Record<string, any> = {
    bpmndi: { bounds: { x, y, width, height } },
  };

  if (
    elementType === 'bpmn:UserTask' ||
    elementType === 'bpmn:ServiceTask' ||
    elementType === 'bpmn:SendTask' ||
    elementType === 'bpmn:ScriptTask'
  ) {
    entry.require = [];
    entry.produce = [];
    entry.notificateCreator = false;
    entry.notificateAssignee = false;
    entry.name = name || '';

    if (elementType === 'bpmn:UserTask') {
      entry.outgoing = null;
      if (dataTypeId) {
        entry.views = {
          navigateView: null,
          editView: null,
          childTableView: null,
          cardView: null,
          tileView: null,
          calendarView: null,
        };
      }
    }
  }

  return entry;
}

const AddElementSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementType: z
    .enum([
      'bpmn:UserTask',
      'bpmn:ServiceTask',
      'bpmn:SendTask',
      'bpmn:ScriptTask',
      'bpmn:ExclusiveGateway',
      'bpmn:InclusiveGateway',
      'bpmn:StartEvent',
      'bpmn:EndEvent',
      'bpmn:IntermediateThrowEvent',
      'bpmn:IntermediateCatchEvent',
      'bpmn:BoundaryEvent',
      'bpmn:SubProcess',
    ])
    .describe('Тип BPMN элемента для создания'),
  name: z
    .string()
    .max(255)
    .describe(
      'Отображаемое имя элемента. Обязательно подписывать user task, send task, service task, соединения',
    ),
  require: z
    .array(z.string())
    .optional()
    .describe(
      'Массив требуемых ресурсов (напр. ["bpmn-_common:_owner"]) для UserTask',
    ),
  navigateView: z
    .string()
    .optional()
    .describe('ID вьюхи для навигации (по умолчанию null)'),
  editView: z
    .string()
    .optional()
    .describe(
      'ID вьюхи для редактирования (по умолчанию null). Используй "DISABLE_EDIT" если редактирование не нужно',
    ),
  candidateUsers: z
    .string()
    .optional()
    .describe(
      'Выражение camunda:candidateUsers для UserTask (напр. "${S(bpmn__common__owner).prop(\'login\').stringValue()}")',
    ),
  assignee: z
    .object({
      type: z
        .enum(['owner', 'user', 'group', 'variable'])
        .describe(
          'Тип назначения: owner — владелец сущности, user — конкретный пользователь, group — группа, variable — переменная дектора',
        ),
      value: z
        .string()
        .optional()
        .describe(
          'Значение: для type=user — логин, для type=group — ID группы, для type=variable — имя переменной в формате moduleName:type:_varName',
        ),
    })
    .optional()
    .nullable()
    .describe(
      'Настройка назначения UserTask. Если передан — генерирует camunda:candidateUsers/candidateGroups и require',
    ),
  sendTaskType: z
    .string()
    .optional()
    .describe('Значение camunda:type для SendTask (напр. "external")'),
  sendTaskTopic: z
    .string()
    .optional()
    .describe(
      'Значение camunda:topic для SendTask (напр. "Notification Task")',
    ),
  sendTaskRecipients: z
    .string()
    .optional()
    .describe(
      'JSON массив получателей для SendTask extensionElements (напр. "["userOf(admin)"]")',
    ),
  sendTaskTemplate: z
    .string()
    .optional()
    .describe('ID шаблона письма для SendTask extensionElements'),
});

async function handleAddElement(args: {
  dataTypeId: string;
  elementType: string;
  name?: string;
  require?: string[];
  navigateView?: string;
  editView?: string;
  candidateUsers?: string;
  assignee?: { type: string; value?: string } | null;
  sendTaskType?: string;
  sendTaskTopic?: string;
  sendTaskRecipients?: string;
  sendTaskTemplate?: string;
}) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const isTask =
      args.elementType === 'bpmn:UserTask' ||
      args.elementType === 'bpmn:ServiceTask' ||
      args.elementType === 'bpmn:SendTask' ||
      args.elementType === 'bpmn:ScriptTask';

    if (isTask && !args.name) {
      args.name = generateTaskName(state.model);
    }

    const result = bpmnXmlService.createElement(
      state.parsed,
      args.elementType,
      args.name,
    );

    if (!result) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: 'Не удалось создать элемент: процесс не найден',
            }),
          },
        ],
      };
    }

    const pos = calculateNewElementPosition(state.model, args.elementType);
    const size = ELEMENT_SIZES[args.elementType] || { width: 100, height: 80 };

    bpmnXmlService.addShapeToDiagram(
      state.parsed,
      result.elementId,
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    let requireFromAssignee: string[] = [];

    if (args.elementType === 'bpmn:UserTask') {
      if (args.assignee) {
        const moduleName = args.dataTypeId.split('/')[2] || 'bpmn';
        const assigneeResult = handleAssignee(args.assignee, moduleName);
        requireFromAssignee = assigneeResult.require;
        for (const [key, val] of Object.entries(assigneeResult.attrs)) {
          result.element.$attrs[key] = val;
        }
      } else if (args.candidateUsers) {
        result.element.$attrs['camunda:candidateUsers'] = args.candidateUsers;
      }
    }

    if (args.elementType === 'bpmn:SendTask') {
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
    }

    const newModel = { ...state.model };
    newModel[result.elementId] = createDefaultModelEntry(
      result.elementId,
      args.elementType,
      args.name || '',
      pos.x,
      pos.y,
      size.width,
      size.height,
      args.dataTypeId,
    );

    if (requireFromAssignee.length > 0) {
      newModel[result.elementId].require = requireFromAssignee;
    }

    if (args.require) {
      newModel[result.elementId].require = [
        ...newModel[result.elementId].require,
        ...args.require,
      ];
    }

    if (args.navigateView && newModel[result.elementId].views) {
      newModel[result.elementId].views.navigateView = args.navigateView;
    }
    if (args.editView && newModel[result.elementId].views) {
      newModel[result.elementId].views.editView = args.editView;
    }

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
            elementId: result.elementId,
            elementType: args.elementType,
            name: args.name || null,
            message: `Элемент ${args.elementType} создан с ID "${result.elementId}"`,
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
            message: e?.message || 'Ошибка создания элемента',
          }),
        },
      ],
    };
  }
}

export const addElementTools = [
  defineTool(
    'bpmn_add_element',
    {
      title: 'Add BPMN Element',
      description:
        'Создаёт новый BPMN элемент в процессе (UserTask, ServiceTask, SendTask, ScriptTask, Gateway, Event, SubProcess). Автоматически создаёт decorJson entry с bpmndi координатами. Для UserTask: если name не передан — генерируется "Элемент N", assignee настраивает camunda:candidateUsers/candidateGroups и require. Для SendTask: camunda:type/topic и extensionElements. Возвращает elementId созданного элемента.',
      inputSchema: AddElementSchema,
    },
    handleAddElement,
  ),
];
