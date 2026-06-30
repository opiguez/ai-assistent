import { McpServer } from '@modelcontextprotocol/server';
import {
  handleCreateBpmnDataType,
  handleCreateDataType,
  handleCreateDataTypeField,
  handleCreateModule,
  handleCreateModuleField,
} from './handlers.js';
import {
  CreateBpmnDataTypeSchema,
  CreateDataTypeFieldSchema,
  CreateDataTypeSchema,
  CreateModuleFieldSchema,
  CreateModuleSchema,
} from './schema.js';
import { defineTool } from '../../shared/utils/base.js';
import { ChatSessionReportSchema, ChatSessionSchema } from './agent/schema.js';
import { historyService } from '../services/history.service.js';

const tools = [
  defineTool(
    'data_create_module',
    {
      title: 'Create Module',
      description:
        'Создает новый модуль (верхнеуровневый контейнер). При создании модуля автоматически создается дефолтная рабочая область. Не создавай несколько модулей за раз.',
      inputSchema: CreateModuleSchema,
    },
    handleCreateModule,
  ),
  defineTool(
    'data_create_data_type',
    {
      title: 'Create DataType',
      description:
        'Создает новый тип данных (сущность) внутри модуля. Помни: тип не существует отдельно от модуля. Укажи parentId созданного модуля.',
      inputSchema: CreateDataTypeSchema,
    },
    handleCreateDataType,
  ),
  defineTool(
    'data_create_bpmn_data_type',
    {
      title: 'Create BpmnDataType',
      description:
        'Создает новый BPMN бизнес-процесс (автоматизацию логики, воркфлоу) внутри указанного модуля. Помни: тип не существует отдельно от модуля. Укажи parentId созданного модуля.',
      inputSchema: CreateBpmnDataTypeSchema,
    },
    handleCreateBpmnDataType,
  ),
  defineTool(
    'data_create_data_type_field',
    {
      title: 'Create DataTypeField',
      description:
        'Создает специфичное поле внутри конкретного Типа Данных. Вызывай для описания уникальных атрибутов объекта. Укажи dataTypeId и propertyType.',
      inputSchema: CreateDataTypeFieldSchema,
    },
    handleCreateDataTypeField,
  ),
  defineTool(
    'data_create_module_field',
    {
      title: 'Create Module(common) Field',
      description:
        'Создает ОБЩЕЕ (сквозное) поле на уровне Модуля. Все типы данных внутри этого модуля автоматически унаследуют это поле. Укажи moduleId и propertyType.',
      inputSchema: CreateModuleFieldSchema,
    },
    handleCreateModuleField,
  ),
  defineTool(
    'save_tasks_queue',
    {
      title: 'Save Task Queue',
      description:
        'Регистрирует текущую очередь задач и переключает ее в CHUNK_PROCESSING',
      inputSchema: ChatSessionSchema as any,
    },
    async ({ sessionId, tasks }) => {
      await historyService.startChunkProcessing(sessionId, tasks);

      return {
        content: [
          {
            type: 'text',
            text: `Очередь из ${tasks.length} задач успешно создана и сохранена в БД. Режим переключен в CHUNK_PROCESSING.`,
          },
        ],
      };
    },
  ),
  defineTool(
    'complete_current_task',
    {
      title: 'Report Current Step from Queue',
      description: 'Делает отчет о проделанном шаге',
      inputSchema: ChatSessionReportSchema as any,
    },
    async ({ sessionId, summary }) => {
      const hasNext = await historyService.moveToNextStep(sessionId);

      // 2. Вместо архивации всего чата, мы просто возвращаем ИИ инструкцию
      // о том, что статус зафиксирован. OpenCode скормит этот текст модели.
      let statusText = `[УСПЕХ]: Задача успешно выполнена и зафиксирована: ${summary}.\n`;

      if (hasNext) {
        const nextTask = await historyService.getCurrentTask(sessionId);
        statusText += `Очередь продолжается. Следующая задача: ${nextTask?.description}. Вызови инструмент prepare_task_context для обновления контекста инженера.`;
      } else {
        statusText += `Ура! Все задачи из очереди ТЗ полностью выполнены. Система возвращена в режим NORMAL_CHAT.`;
      }

      return {
        content: [{ type: 'text', text: statusText }],
      };
    },
  ),
];

export default function registerDataLayerTools(server: McpServer) {
  tools.forEach((tool) => {
    server.registerTool(tool.name, tool.config, tool.cb as any);
  });
}
