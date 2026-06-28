import { Express } from 'express';
import { AIService } from '../services/ai.service';
import {
  Client,
  StreamableHTTPClientTransport,
} from '@modelcontextprotocol/client';
import axios from 'axios';

export default async function registerConnectChatToMCPServer(app: Express) {
  const MCP_SERVER_URL = 'http://localhost:3002';
  const transport = new StreamableHTTPClientTransport(
    new URL(`${MCP_SERVER_URL}/mcp`),
  );
  const mcpClient = new Client(
    { name: 'lowcode-ai-client', version: '1.0.0' },
    { capabilities: {} },
  );
  await mcpClient.connect(transport);
  console.log('[MCP Client] Успешно подключен к серверу на порту 3002');

  const aiService = new AIService(mcpClient);

  app.post('/api/chat', async (req, res) => {
    try {
      const { message, sessionId, executeStep } = req.body;
      // 1. Запрашиваем у MCP-сервера готовый промпт со всей историей
      const mcpPrompt = await mcpClient.getPrompt({
        name: 'prepare-task-context',
        arguments: {
          sessionId: String(sessionId),
          message: message || '',
          // ИСПРАВЛЕНИЕ: приводим boolean к строке 'true' / 'false'
          executeStep: executeStep ? 'true' : 'false',
        },
      });

      const preparedMessages = mcpPrompt.messages;

      // 2. Классифицируем слои для фильтрации инструментов (только если это не выполнение шага ТЗ)
      let activatedLayers: string[] = ['DATA'];
      if (!executeStep && message && message.length <= 1000) {
        activatedLayers = await aiService.classifyShortMessage(message);
        console.log('Активированные ИИ слои:', activatedLayers);
      }

      // Настраиваем заголовки для SSE стриминга на фронтенд
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // 3. Запускаем агентский цикл (передаем готовый массив сообщений)
      const logsGenerator = aiService.executeTaskWithMcp(
        preparedMessages,
        activatedLayers,
      );

      let finalReportText = '';

      for await (const log of logsGenerator) {
        res.write(`data: ${JSON.stringify(log)}\n\n`);

        if (log.type === 'text_chunk') finalReportText += log.text;
        if (log.type === 'final_response') finalReportText = log.text;
      }

      // =========================================================================
      // 4. ФИКСИРУЕМ РЕЗУЛЬТАТЫ В ИСТОРИЮ ЧЕРЕЗ REST API MCP-СЕРВЕРА
      // =========================================================================

      // Получаем актуальное состояние сессии с MCP-сервера
      const sessionResponse = await axios.post(
        `${MCP_SERVER_URL}/api/history/session`,
        { sessionId },
      );
      const session = sessionResponse.data;

      // Сценарий А: Если пользователь отправил большое ТЗ впервые
      if (
        message &&
        message.length > 1000 &&
        session.mode !== 'CHUNK_PROCESSING'
      ) {
        console.log('--- Нарезка большого ТЗ на стороне клиента ---');
        const tasks = await aiService.splitLargeSpecification(message);
        if (tasks.length > 0) {
          // Отправляем массив задач обратно на сервер, чтобы инициализировать очередь
          await axios.post(`${MCP_SERVER_URL}/api/history/start-chunk`, {
            sessionId,
            tasks,
          });
        }
      } else {
        // Сценарий Б: Иначе это было выполнение задачи — схлопываем результат в логах
        let actualTaskDescription = message;

        if (executeStep && session.mode === 'CHUNK_PROCESSING') {
          // Вытаскиваем описание текущей задачи из структуры сессии, пришедшей по сети
          actualTaskDescription =
            session.tasksQueue[session.currentStepIndex]?.description ||
            message;
        }

        // Отправляем отчет о выполнении задачи на MCP-сервер для схлопывания контекста
        await axios.post(`${MCP_SERVER_URL}/api/history/append-result`, {
          sessionId,
          taskDescription: actualTaskDescription,
          finalReportText,
        });
      }

      // 5. Автоматически сдвигаем указатель очереди ТЗ вперед через REST API
      let hasNextStep = false;
      let nextStepIndex = 0;

      if (session.mode === 'CHUNK_PROCESSING' && executeStep) {
        const nextStepResponse = await axios.post(
          `${MCP_SERVER_URL}/api/history/next-step`,
          { sessionId },
        );
        hasNextStep = nextStepResponse.data.hasNextStep;
        nextStepIndex = nextStepResponse.data.nextStepIndex;
      }

      // Закрываем SSE поток финальным событием
      const finalEvent = {
        type: 'execution_completed',
        status:
          session.mode === 'CHUNK_PROCESSING'
            ? 'STEP_EXECUTED_AND_MOVED'
            : 'EXECUTED',
        hasNextStep,
        nextStepIndex,
      };

      res.write(`data: ${JSON.stringify(finalEvent)}\n\n`);
      return res.end();
    } catch (error) {
      console.error('Критическая ошибка в /api/chat:', error);
      if (res.headersSent) {
        res.write(
          `data: ${JSON.stringify({ type: 'critical_error', error: 'Внутренняя ошибка сервера' })}\n\n`,
        );
        return res.end();
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}
