import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/server';

import { historyService } from '../services/history.service';
import { SYSTEM_PROMPTS } from '../systemPromts';

export default function registerHistoryPrompt(server: McpServer) {
  server.registerPrompt(
    'prepare-task-context',
    {
      title: 'Prepare Task Context',
      description: 'Формирует контекст и историю для текущего шага',
      argsSchema: z.object({
        sessionId: z.string().describe('ID текущей сессии'),
        message: z
          .string()
          .optional()
          .default('')
          .describe('Ввод пользователя'),
        executeStep: z
          .string() //
          .optional()
          .default('false')
          .transform((val) => val === 'true')
          .describe('Флаг выполнения шага очереди ТЗ'),
      }),
    },
    async ({
      sessionId,
      message,
      executeStep,
    }: {
      sessionId: string;
      message: string;
      executeStep: boolean;
    }) => {
      const session = await historyService.getOrCreateSession(sessionId);

      // =========================================================================
      // КУСОЧЕК 1: Сценарий А (Большое ТЗ / Планировщик)
      // =========================================================================
      if (
        message &&
        message.length > 1000 &&
        session.mode !== 'CHUNK_PROCESSING'
      ) {
        return {
          messages: [
            {
              role: 'user' as const, // Только user или assistant!
              content: {
                type: 'text' as const,
                text: `ИНСТРУКЦИЯ АРХИТЕКТОРА:\n${SYSTEM_PROMPTS.PLANNER}\n\nИсходное ТЗ пользователя:\n${message}`,
              },
            },
          ],
        };
      }

      // =========================================================================
      // КУСОЧЕК 2: Сценарий Б (Определение текущей задачи для Инженера)
      // =========================================================================
      let taskDescription = message;
      if (executeStep && session.mode === 'CHUNK_PROCESSING') {
        const currentTask = await historyService.getCurrentTask(sessionId);
        if (currentTask) taskDescription = currentTask.description;
      }

      // =========================================================================
      // КУСОЧЕК 3: Подготовка и маппинг истории сообщений для MCP
      // =========================================================================
      const chatHistory = await historyService.getChatHistoryForAI(sessionId);

      // Исключаем системные уведомления, так как MCP промпты их не поддерживают
      const formattedHistory = chatHistory
        .filter((msg) => msg.role !== 'system')
        .map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: { type: 'text' as const, text: msg.content },
        }));

      // =========================================================================
      // КУСОЧЕК 4: Сборка финального ответа для Инженера (Без роли system)
      // =========================================================================
      return {
        messages: [
          {
            role: 'user' as const, // Инструкция инженера идет как ввод от user
            content: {
              type: 'text' as const,
              text: `СИСТЕМНАЯ ИНСТРУКЦИЯ ДЛЯ ВЫПОЛНЕНИЯ:\n${SYSTEM_PROMPTS.DATA_ENGINEER}\n\nВыполни следующую задачу: ${taskDescription}`,
            },
          },
          ...formattedHistory,
        ],
      };
    },
  );
}
