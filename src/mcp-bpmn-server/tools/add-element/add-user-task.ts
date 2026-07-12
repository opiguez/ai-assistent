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

export const AddUserTaskSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z.string().max(255).describe('Имя задачи'),
  assignee: z
    .object({
      type: z
        .enum(['owner', 'user', 'group', 'variable'])
        .default('owner')

        .describe(
          'owner — владелец (автор процесса), user — пользователь, group — группа, variable — переменная типа USER',
        ),
      value: z
        .string()
        .optional()
        .describe(
          'Для type=user — user.name из контекста, group — group.name из контекста, variable — field.key из dataTypeProperties.genericProperties[USER]',
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

export async function handleAddUserTask(
  args: z.infer<typeof AddUserTaskSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    let taskName = args.name;
    if (!taskName) {
      taskName = generateTaskName(state.model);
    }

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:UserTask',
      taskName,
    );

    if (!result) {
      return errorResponse('Не удалось создать UserTask в XML');
    }

    const bpmnElement = result.element;

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
    const assigneeConfig = args.assignee || { type: 'owner' };

    const match = args.dataTypeId.match(/\/modules\/([^\/]+)\/data-types\//);
    const moduleName = match ? match[1] : 'Calculator';

    const assigneeResult = handleAssignee(assigneeConfig, moduleName);
    requireFromAssignee = assigneeResult.require;

    // ЗАПИСЬ ЧЕРЕЗ НАПРАВЛЕННЫЙ .set(): библиотека теперь знает Camunda-схему
    for (const [key, val] of Object.entries(assigneeResult.attrs)) {
      bpmnElement.set(key, val);
    }

    const newModel = { ...state.model };

    const baseEntry = createModelEntry(
      result.elementId,
      'bpmn:UserTask',
      taskName,
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    const finalRequire = [...requireFromAssignee, ...(args.require || [])];

    const userTaskEntry = {
      ...baseEntry,
      require: finalRequire,
      produce: [],
      notificateCreator: false,
      notificateAssignee: false,
      outgoing: null,
      views: {
        navigateView: args.navigateView || null,
        editView: args.editView || null,
        childTableView: null,
        cardView: null,
        tileView: null,
        calendarView: null,
      },
    };

    newModel[result.elementId] = userTaskEntry;

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return errorResponse(
        saveResult.error || 'Ошибка сохранения изменений процесса',
      );
    }

    return successResponse({
      elementId: result.elementId,
      elementType: 'bpmn:UserTask',
      name: taskName,
      message: `Успешно создан и сконфигурирован UserTask с ID "${result.elementId}"`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Внутренняя ошибка создания UserTask');
  }
}

export const addUserTaskTools = [
  defineTool(
    'bpmn_add_user_task',
    {
      title: 'Add UserTask',
      description: `Создаёт UserTask. name — обязателен. assignee настраивает camunda:candidateUsers/candidateGroups и require. navigateView/editView заполняются в decor.
Доступные данные из контекста (bpmn://process/{dataTypeId}/data-context):
  - userGroups → assignee.type='group', value=group.name
  - users → assignee.type='user', value=user.name
  - dataTypeProperties.genericProperties[USER] → assignee.type='variable', value=field.key
  - views → navigateView/editView = view.id`,
      inputSchema: AddUserTaskSchema,
    },
    handleAddUserTask,
  ),
];
