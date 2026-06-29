import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/server';

import { historyService } from '../services/history.service';
import { SYSTEM_PROMPTS } from '../systemPromts';

export default function registerHistoryPrompt(server: McpServer) {
  const LARGE_SPECIFICATION_THRESHOLD = 2000;

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
          .string()
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

      // Вычисляем флаг большого ТЗ на основе нашей константы
      const isLargeSpec =
        message && message.length > LARGE_SPECIFICATION_THRESHOLD;

      // =========================================================================
      // КУСОЧЕК 1: Сценарий А (Большое ТЗ / Планировщик / Архитектор)
      // =========================================================================
      if (isLargeSpec && session.mode !== 'CHUNK_PROCESSING') {
        return {
          // ФИКС 7: Передаем метаданные режима, чтобы клиент не гадал по тексту промпта
          meta: {
            mode: 'PLANNER',
            isLargeSpecification: true,
            thresholdUsed: LARGE_SPECIFICATION_THRESHOLD,
          },
          messages: [
            {
              role: 'user' as const,
              content: {
                type: 'text' as const,
                // Текст чистый, без хрупких маркеров
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
        // Передаем метаданные, что мы в режиме инженера
        meta: {
          mode: 'ENGINEER',
          isLargeSpecification: false,
          thresholdUsed: LARGE_SPECIFICATION_THRESHOLD,
        },
        messages: [
          {
            role: 'user' as const,
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
