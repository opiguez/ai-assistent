import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/server';
import { historyService } from '../services/history.service.js';

export default function registerHistoryPrompt(server: McpServer) {
  server.registerPrompt(
    'prepare_task_context',
    {
      title: 'Prepare Task Context',
      description:
        'Возвращает текст текущей задачи из очереди для выполнения инженером',
      argsSchema: z.object({
        sessionId: z
          .string()
          .describe('ID текущей сессии (например, имя проекта)'),
        executeStep: z
          .string()
          .optional()
          .default('false')
          .transform((val) => val === 'true')
          .describe(
            'Флаг, запрашивает ли инженер выполнение следующего шага из очереди ТЗ',
          ),
      }),
    },
    async ({
      sessionId,
      executeStep,
    }: {
      sessionId: string;
      executeStep: boolean;
    }) => {
      const session = await historyService.getOrCreateSession(sessionId);

      let currentTaskText = '';

      if (executeStep && session.mode === 'CHUNK_PROCESSING') {
        const currentTask = await historyService.getCurrentTask(sessionId);
        if (currentTask) {
          currentTaskText = `Текущая задача для выполнения:\n[Слой: ${currentTask.layer}]\n[Название: ${currentTask.task}]\n[Описание]: ${currentTask.description}`;
        } else {
          currentTaskText = 'Все задачи из текущей очереди успешно выполнены!';
        }
      } else {
        currentTaskText =
          'Очередь задач пуста или находится в обычном режиме чата. Пожалуйста, сначала отправьте ТЗ архитектору (@planner), чтобы он сформировал задачи с помощью инструмента save_tasks_queue.';
      }

      return {
        description: `Контекст задачи для сессии ${sessionId}`,
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: `[СИСТЕМНЫЙ КОНТЕКСТ СЕССИИ ${sessionId}]:\n${currentTaskText}`,
            },
          },
        ],
      };
    },
  );
}
