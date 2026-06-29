import { ENV } from '../../config/base';
import { Express } from 'express';
import { AIService } from '../services/ai.service';
import {
  Client,
  StreamableHTTPClientTransport,
} from '@modelcontextprotocol/client';
import axios from 'axios';

async function connectWithRetry(
  client: any,
  transport: any,
  retries = 5,
  delay = 2000,
) {
  for (let i = 0; i < retries; i++) {
    try {
      // На всякий случай пробуем корректно закрыть старый транспорт, если он остался в клиенте
      if (client.transport) {
        try {
          await client.close();
        } catch {}
      }

      await client.connect(transport);
      console.log('[MCP Client] Успешно подключен к серверу на порту 3002');
      return;
    } catch (err) {
      console.log(
        `[MCP Client] Сервер еще не готов (попытка ${i + 1}/${retries}). Ждем ${delay}мс...`,
      );
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error('Не удалось подключиться к MCP-серверу.');
}

async function ensureMcpConnection(mcpClient: any, serverUrl: string) {
  if (!mcpClient.transport) {
    console.log('[MCP] Транспорт отсутствует. Инициализируем...');
    const freshTransport = new StreamableHTTPClientTransport(
      new URL(`${serverUrl}/mcp`),
    );
    await connectWithRetry(mcpClient, freshTransport);
    return;
  }

  // Делаем легкий проверочный пинг (вызов любого дешевого метода, например, listTools или listPrompts)
  // Это самый надежный способ узнать, жив ли удаленный HTTP-сервер
  try {
    await mcpClient.listPrompts();
  } catch (pingError) {
    console.warn(
      '[MCP] Проверочный запрос провалился. Сервер перезапущен или недоступен. Переподключаемся...',
    );

    try {
      // Принудительно закрываем старый клиент и уничтожаем зависший транспорт
      await mcpClient.close().catch(() => {});

      const freshTransport = new StreamableHTTPClientTransport(
        new URL(`${serverUrl}/mcp`),
      );
      await connectWithRetry(mcpClient, freshTransport);

      console.log(
        '[MCP] Соединение успешно восстановлено через новый транспорт.',
      );
    } catch (reconnectError) {
      console.error(
        '[MCP] Не удалось переподключиться к серверу:',
        reconnectError,
      );
      throw new Error(
        'MCP-сервер временно недоступен. Повторите попытку позже.',
      );
    }
  }
}

export default async function registerConnectChatToMCPServer(app: Express) {
  const MCP_SERVER_URL = `${ENV.LOCAL_SERVER_URL_NO_PORT}:${ENV.PORT_MCP1}`;
  const transport = new StreamableHTTPClientTransport(
    new URL(`${MCP_SERVER_URL}/mcp`),
  );

  const mcpClient = new Client(
    { name: 'lowcode-ai-client', version: '1.0.0' },
    { capabilities: {} },
  );

  // Первичное подключение при старте
  try {
    await connectWithRetry(mcpClient, transport);
  } catch (err) {
    console.error(
      '[MCP] Стартовое подключение не удалось. Агент попробует реконнект на первом запросе.',
      err,
    );
  }

  const aiService = new AIService(mcpClient);

  app.post('/api/chat', async (req, res) => {
    try {
      const { message, sessionId, executeStep } = req.body;

      // 1. Проверяем связь (и реконнектим, если сервер перезапускался)
      try {
        await ensureMcpConnection(mcpClient, MCP_SERVER_URL);
      } catch (connError: any) {
        return res.status(503).json({ error: connError.message });
      }

      // Получаем актуальное состояние сессии с MCP-сервера
      const sessionResponse = await axios.post(
        `${MCP_SERVER_URL}/api/history/session`,
        { sessionId },
      );
      const session = sessionResponse.data;

      // 2. Безопасный вызов getPrompt
      let mcpPrompt;
      try {
        mcpPrompt = (await mcpClient.getPrompt({
          name: 'prepare-task-context',
          arguments: {
            sessionId: String(sessionId),
            message: message || '',
            executeStep: executeStep ? 'true' : 'false',
          },
        })) as any;
      } catch (promptError) {
        console.error('[MCP] Ошибка при получении промпта:', promptError);
        return res
          .status(503)
          .json({ error: 'Не удалось получить контекст от MCP-сервера.' });
      }

      const preparedMessages = mcpPrompt.messages;
      const isLargeSpecification =
        mcpPrompt.meta?.isLargeSpecification || false;

      // =========================================================================
      // ФИКС ПУНКТА 4: ДИНАМИЧЕСКАЯ КЛАССИФИКАЦИЯ СЛОЕВ
      // =========================================================================
      let activatedLayers: string[] = ['DATA'];

      // Вызываем классификатор, только если это не автоматическое выполнение шага очереди
      if (!executeStep && message) {
        try {
          const detectedLayer = await aiService.classifyShortMessage(message);

          if (detectedLayer) {
            activatedLayers = detectedLayer;
            console.log(
              `[Classifier] Сообщение классифицировано как слой: ${activatedLayers}`,
            );
          }
        } catch (classError) {
          console.error(
            '[Classifier] Ошибка классификации сообщения, откат на дефолтный слой DATA:',
            classError,
          );
        }
      }

      // Настраиваем заголовки для SSE стриминга на фронтенд
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      req.setTimeout(0);
      res.setTimeout(0);

      // Отслеживание обрыва связи клиентом
      let isDisconnected = false;
      req.on('close', () => {
        isDisconnected = true;
        console.log('[SSE] Клиент закрыл соединение. Прерываем обработку.');
      });

      // 3. Запускаем агентский цикл (передаем готовый массив сообщений и динамические слои)
      const logsGenerator = aiService.executeTaskWithMcp(
        preparedMessages,
        activatedLayers,
      );

      let finalReportText = '';

      for await (const log of logsGenerator) {
        if (isDisconnected) {
          console.log(
            '[SSE] Цикл генерации остановлен, так как клиент отключился.',
          );
          break;
        }

        res.write(`data: ${JSON.stringify(log)}\n\n`);

        if (log.type === 'text_chunk') finalReportText += log.text;
        if (log.type === 'final_response') finalReportText = log.text;
      }

      if (isDisconnected) {
        return res.end();
      }

      // =========================================================================
      // 4. ФИКСИРУЕМ РЕЗУЛЬТАТЫ В ИСТОРИЮ ЧЕРЕЗ REST API MCP-СЕРВЕРА
      // =========================================================================

      if (
        message &&
        isLargeSpecification &&
        session.mode !== 'CHUNK_PROCESSING'
      ) {
        console.log('--- Нарезка большого ТЗ на стороне клиента ---');
        const tasks = await aiService.splitLargeSpecification(message);
        if (tasks.length > 0) {
          await axios.post(`${MCP_SERVER_URL}/api/history/start-chunk`, {
            sessionId,
            tasks,
          });
        }
      } else {
        let actualTaskDescription = message;

        if (executeStep && session.mode === 'CHUNK_PROCESSING') {
          actualTaskDescription =
            session.tasksQueue[session.currentStepIndex]?.description ||
            message;
        }

        await axios.post(`${MCP_SERVER_URL}/api/history/append-result`, {
          sessionId,
          taskDescription: actualTaskDescription,
          finalReportText,
        });
      }

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
