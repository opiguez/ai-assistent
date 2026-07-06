import { McpServer } from '@modelcontextprotocol/server';
import { moduleTools } from './module/handlers.js';
import { datatypeTools } from './datatype/handlers.js';
import { lifecycleTools } from './lifecycle/handlers.js';
import { workspaceTools } from './workspace/handlers.js';
import { fieldTools } from './fields/handlers.js';
import { referenceTools } from './references/handlers.js';
import { coreTools } from './core/handlers.js';
import { ChatSessionReportSchema, ChatSessionSchema } from './agent/schema.js';
import { historyService } from '../services/history.service.js';

const dataTools = [
  ...moduleTools,
  ...datatypeTools,
  ...lifecycleTools,
  ...workspaceTools,
  ...fieldTools,
  ...referenceTools,
  ...coreTools,
];

const sessionTools = [
  {
    name: 'save_tasks_queue',
    config: {
      title: 'Save Task Queue',
      description:
        'Регистрирует текущую очередь задач и переключает сессию в CHUNK_PROCESSING',
      inputSchema: ChatSessionSchema as any,
    },
    cb: async ({ sessionId, tasks }: { sessionId: string; tasks: any[] }) => {
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
  },
  {
    name: 'complete_current_task',
    config: {
      title: 'Report Current Step from Queue',
      description:
        'Делает отчет о проделанном шаге и переходит к следующему.',
      inputSchema: ChatSessionReportSchema as any,
    },
    cb: async ({
      sessionId,
      summary,
    }: {
      sessionId: string;
      summary: string;
    }) => {
      const hasNext = await historyService.moveToNextStep(sessionId);
      let statusText = `[УСПЕХ]: Задача успешно выполнена и зафиксирована: ${summary}.\n`;

      if (hasNext) {
        const nextTask = await historyService.getCurrentTask(sessionId);
        statusText += `Очередь продолжается. Следующая задача: ${nextTask?.description}. Используй $prompt:prepare_task_context для обновления контекста инженера.`;
      } else {
        statusText += `Ура! Все задачи из очереди ТЗ полностью выполнены. Система возвращена в режим NORMAL_CHAT.`;
      }

      return {
        content: [{ type: 'text', text: statusText }],
      };
    },
  },
];

const allTools = [...dataTools, ...sessionTools];

export default function registerDataLayerTools(server: McpServer) {
  allTools.forEach((tool) => {
    server.registerTool(tool.name, tool.config, tool.cb as any);
  });
}
