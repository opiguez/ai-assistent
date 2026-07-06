import { z } from 'zod';
import { bpmnSchemaService } from '../../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../../services/bpmn-xml.service.js';
import { defineTool } from '../../../shared/utils/base.js';
import {
  ELEMENT_SIZES,
  generateTaskName,
  calculatePosition,
  handleAssignee,
  createModelEntry,
  successResponse,
  errorResponse,
} from './shared.js';

const AddUserTaskSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z
    .string()
    .max(255)
    .describe('Имя задачи'),
  assignee: z
    .object({
      type: z
        .enum(['owner', 'user', 'group', 'variable'])
        .default('owner')

        .describe(
          'owner — владелец, user — пользователь, group — группа, variable — переменная',
        ),
      value: z
        .string()
        .optional()
        .describe(
          'Для type=user — логин, group — ID группы, variable — moduleName:type:_varName',
        ),
    })
    .optional()
    .default({ type: 'owner' })
    .describe(
      'Настройка назначения. Генерирует camunda:candidateUsers/candidateGroups и require',
    ),
  navigateView: z.string().optional().describe('ID формы просмотра'),
  editView: z
    .string()
    .optional()
    .describe(
      'ID формы для редактирования. "DISABLE_EDIT" если редактирование не нужно',
    ),
  require: z
    .array(z.string())
    .optional()
    .describe('Дополнительные require (напр. ["bpmn:common:_owner"])'),
});

async function handleAddUserTask(args: {
  dataTypeId: string;
  name?: string;
  assignee?: { type: string; value?: string };
  navigateView?: string;
  editView?: string;
  require?: string[];
}) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    if (!args.name) {
      args.name = generateTaskName(state.model);
    }

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:UserTask',
      args.name,
    );
    if (!result) {
      return errorResponse('Не удалось создать элемент');
    }

    const pos = calculatePosition(state.model, 'bpmn:UserTask');
    const size = ELEMENT_SIZES['bpmn:UserTask'];

    bpmnXmlService.addShapeToDiagram(
      state.parsed,
      result.elementId,
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    let requireFromAssignee: string[] = [];

    if (args.assignee) {
      const match = args.dataTypeId.match(/\/modules\/([^\/]+)\/data-types\//);
      const moduleName = match ? match[1] : 'Calculator';
      const assigneeResult = handleAssignee(args.assignee, moduleName);
      requireFromAssignee = assigneeResult.require;
      for (const [key, val] of Object.entries(assigneeResult.attrs)) {
        result.element.$attrs[key] = val;
      }
    }

    const newModel = { ...state.model };
    newModel[result.elementId] = createModelEntry(
      result.elementId,
      'bpmn:UserTask',
      args.name,
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
      return errorResponse(saveResult.error || 'Ошибка сохранения');
    }

    return successResponse({
      elementId: result.elementId,
      elementType: 'bpmn:UserTask',
      name: args.name,
      message: `Создан UserTask с ID "${result.elementId}"`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Ошибка создания UserTask');
  }
}

export const addUserTaskTools = [
  defineTool(
    'bpmn_add_user_task',
    {
      title: 'Add UserTask',
      description:
        'Создаёт UserTask. Если name не указан — генерируется "Элемент N". assignee настраивает camunda:candidateUsers/candidateGroups и require. navigateView/editView заполняются в decor.',
      inputSchema: AddUserTaskSchema,
    },
    handleAddUserTask,
  ),
];
