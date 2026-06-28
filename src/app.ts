import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { rabisClient } from './services/rabisClient';
import { AIService } from './services/ai.service';
import { HistoryService } from './services/history.service';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/client';

dotenv.config({ path: '.env.dev' });

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Подбора инверторов Форпост',
      version: '1.0.0',
      description: 'Документация API чат-бота с поддержкой Function Calling',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Локальный сервер',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};
//new StreamableHTTPClientTransport()
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const aiService = new AIService();
const historyService = new HistoryService();

// Заглушка для получения текущего состояния No-Code платформы из GraphQL
const getGraphQLStateMock = async () => {
  return {
    existingModules: [
      {
        id: 'mod_warehouse_uuid_111',
        name: 'Складской учет',
        code: 'warehouse',
        workspaces: [
          {
            id: 'ws_default_uuid_222',
            name: 'Дефолтная рабочая область',
            code: 'default',
          },
        ],
        dataTypes: [
          {
            id: 'dt_product_uuid_333',
            name: 'Товар',
            code: 'product',
            isHierarchical: false,
            fields: [
              { name: 'ID', code: 'id', fieldType: 'text' },
              { name: 'Наименование', code: 'title', fieldType: 'text' },
              { name: 'Цена', code: 'price', fieldType: 'number' },
            ],
          },
        ],
      },
    ],
  };
};

app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId, executeStep } = req.body;
    const session = await historyService.getOrCreateSession(sessionId);
    const mockState = await getGraphQLStateMock(); // Актуальный срез структуры БД

    // =========================================================================
    // СЦЕНАРИЙ А: Пользователь загрузил большое ТЗ (Длинный текст)
    // =========================================================================
    if (
      message &&
      message.length > 1000 &&
      session.mode !== 'CHUNK_PROCESSING'
    ) {
      console.log('--- Обнаружено большое ТЗ. Запуск планировщика ---');

      // Нарезаем ТЗ на массив атомарных задач
      const tasks = await aiService.splitLargeSpecification(message);

      if (tasks.length === 0) {
        return res.status(422).json({
          status: 'ERROR',
          message: 'Не удалось разобрать ТЗ на шаги.',
        });
      }

      // Инициализируем пошаговую очередь в сессии
      await historyService.startChunkProcessing(sessionId, tasks);
      await historyService.appendMessage(
        sessionId,
        'user',
        `Вот мое ТЗ: ${message}`,
      );

      // Возвращаем план проекта. Фронтенд выведет список задач с кнопками "Выполнить"
      return res.json({
        status: 'CHUNK_PROCESSING_STARTED',
        message: 'ТЗ успешно распарсено на задачи. План готов.',
        tasksQueue: tasks,
        currentStepIndex: 0,
      });
    }

    // =========================================================================
    // ОПРЕДЕЛЕНИЕ ТЕКУЩЕЙ ЗАДАЧИ ДЛЯ АГЕНТА
    // =========================================================================
    let taskDescription = '';

    // Если фронтенд прислал флаг executeStep, значит мы выполняем текущий шаг из очереди ТЗ
    if (executeStep && session.mode === 'CHUNK_PROCESSING') {
      const currentTask = await historyService.getCurrentTask(sessionId);
      if (!currentTask) {
        return res
          .status(400)
          .json({ error: 'Текущая задача в очереди не найдена' });
      }
      taskDescription = currentTask.description;
      console.log(
        `--- Выполнение шага ${session.currentStepIndex} из очереди ТЗ: ${taskDescription} ---`,
      );
    } else {
      // Иначе это обычный короткий запрос из чата
      taskDescription = message;
      console.log(`--- Обычный точечный запрос: ${taskDescription} ---`);
    }

    if (!taskDescription) {
      return res.status(400).json({ error: 'Пустой запрос или задача' });
    }

    // =========================================================================
    // ЗАПУСК АГЕНТА (SSE-СТРИМ ПРЯМОГО ВЫПОЛНЕНИЯ)
    // =========================================================================

    // Настраиваем заголовки для потоковой передачи логов
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Если это короткий чат, классифицируем (опционально)
    if (!executeStep) {
      const activatedLayers =
        await aiService.classifyShortMessage(taskDescription);
      console.log('Активированные ИИ слои:', activatedLayers);
    }

    const chatHistory = await historyService.getChatHistoryForAI(sessionId);

    // Запускаем агентский цикл. Агент вызывает РЕАЛЬНЫЕ инструменты (БЕЗ суффикса _draft)
    const logsGenerator = aiService.executeTaskWithMcp(
      taskDescription,
      chatHistory,
      mockState,
    );

    let finalReportText = '';

    // Стримим шаги и чанки текста на фронтенд в реальном времени
    for await (const log of logsGenerator) {
      res.write(`data: ${JSON.stringify(log)}\n\n`);

      if (log.type === 'text_chunk') {
        finalReportText += log.text;
      }
      if (log.type === 'final_response') {
        finalReportText = log.text;
      }
    }

    // 1. Фиксируем чистый текстовый результат в историю сессии (без технического JSON мусора)
    await historyService.appendMcpTaskResult(
      sessionId,
      taskDescription,
      finalReportText,
    );

    // 2. Если мы выполняли шаг из очереди ТЗ, автоматически сдвигаем указатель вперед
    let hasNextStep = false;
    let nextStepIndex = 0;

    if (session.mode === 'CHUNK_PROCESSING' && executeStep) {
      hasNextStep = await historyService.moveToNextStep(sessionId);
      nextStepIndex = session.currentStepIndex;
    }

    // Отправляем фронтенду финальное событие с метаданными, чтобы закрыть поток
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

app.get('/api/rabis-data', async (_, res) => {
  try {
    const result = await rabisClient.chain.query
      .module({ id: '/modules/Calculator' })
      .get({
        id: true,
        name: true,
        description: true,
        editView: true,
        status: true,
      });

    return res.json({ success: true, module: result });
  } catch (error) {
    console.error('Ошибка запроса к системе РАБИС:', error);
    res.status(500).json({ success: false, error: String(error) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node.js сервер успешно запущен на http://localhost:${PORT}`);
});
