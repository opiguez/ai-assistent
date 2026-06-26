import express from 'express';
import { OpenAI } from 'openai';
import { z } from 'zod';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { rabisClient } from './services/rabisClient';
import { AIService } from './services/ai.service';
import { HistoryService } from './services/history.service';

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
    const { message, sessionId } = req.body;
    const session = await historyService.getOrCreateSession(sessionId);
    const mockState = await getGraphQLStateMock();

    // =========================================================================
    // СЦЕНАРИЙ А: Пользователь загрузил большое ТЗ (длинный текст)
    // =========================================================================
    if (message.length > 1000 && session.mode !== 'CHUNK_PROCESSING') {
      console.log('--- Обнаружено большое ТЗ. Запуск планировщика ---');

      // Режем ТЗ на массив атомарных задач
      const tasks = await aiService.splitLargeSpecification(message);

      if (tasks.length === 0) {
        return res.json({
          status: 'ERROR',
          message: 'Не удалось разобрать ТЗ на шаги.',
        });
      }

      // Переводим сессию в режим очереди задач
      await historyService.startChunkProcessing(sessionId, tasks);

      // Берем самую первую задачу из свежей очереди для генерации черновика
      const firstTask = tasks[0];

      // Генерируем для нее GraphQL-действия (Tools)
      const aiResult = await aiService.generateActionsForTask(
        firstTask.task,
        session.chatHistory,
        mockState,
      );

      // ВАЖНО: Мы НЕ записываем этот шаг в историю сообщений ИИ прямо сейчас.
      // История чата заполнится только тогда, когда пользователь нажмет кнопку «Применить изменения»
      // и бэкенд выполнит реальный GraphQL запрос в эндпоинте /api/chat/execute.

      return res.json({
        status: 'ROADMAP_INITIALIZED',
        message: `Я проанализировал ваше ТЗ и составил план из ${tasks.length} шагов. Давайте двигаться по порядку.`,
        tasksQueue: tasks,
        currentStep: 0,
        suggestedActions:
          aiResult.type === 'action_required' ? aiResult.actions : [],
        aiComment:
          aiResult.type === 'text_response'
            ? aiResult.text
            : `Шаг 1: ${firstTask.task}. Пожалуйста, проверьте и утвердите предложенную структуру.`,
      });
    }

    // =========================================================================
    // СЦЕНАРИЙ Б: Мы уже находимся внутри выполнения пошаговой очереди большого ТЗ
    // =========================================================================
    if (session.mode === 'CHUNK_PROCESSING') {
      const currentTask = session.tasksQueue[session.currentStepIndex];
      console.log(
        `--- Выполнение шага ${session.currentStepIndex} из очереди ТЗ ---`,
      );

      // Генерируем действия для текущей задачи из очереди
      const aiResult = await aiService.generateActionsForTask(
        currentTask.task,
        session.chatHistory,
        mockState,
      );

      // Здесь логика аналогична Сценарию А: отдаем черновик (suggestedActions) на фронтенд.
      // Ждем, пока пользователь проверит карточки согласования. В историю чата пока ничего не пишем.
      return res.json({
        status: 'CHUNK_STEP_EXECUTION',
        currentStep: session.currentStepIndex,
        taskDescription: currentTask.task,
        suggestedActions:
          aiResult.type === 'action_required' ? aiResult.actions : [],
        aiComment:
          aiResult.type === 'text_response'
            ? aiResult.text
            : `Пожалуйста, проверьте параметры для шага: "${currentTask.task}".`,
      });
    }

    // =========================================================================
    // СЦЕНАРИЙ В: Обычный короткий диалог в чате
    // =========================================================================
    console.log('--- Обычный короткий запрос ---');

    // Используем маленькую/быструю модель для понимания скрытого смысла (DATA/BPMN/UI)
    const activatedLayers = await aiService.classifyShortMessage(message);
    console.log('Активированные ИИ слои:', activatedLayers);

    // Отправляем запрос в тяжелую модель (для MVP генерируем действия слоя DATA)
    const aiResult = await aiService.generateActionsForTask(
      message,
      session.chatHistory,
      mockState,
    );

    // ЕСЛИ ИИ ПРЕДЛОЖИЛ ЧЕРНОВИК ДЕЙСТВИЙ (Требуется подтверждение человека):
    if (aiResult.type === 'action_required') {
      // ВАЖНО: Мы сохраняем реплику пользователя в историю СРАЗУ, чтобы модель помнила
      // контекст своего уточнения, если пользователь решит оспорить черновик текстом в чате.
      await historyService.appendMessage(sessionId, 'user', message);

      return res.json({
        status: 'CONFIRMATION_REQUIRED',
        suggestedActions: aiResult.actions,
        comment:
          'Я подготовил черновик изменений в структуру данных на основе вашего запроса. Утвердите его для создания.',
      });
    }

    // ЕСЛИ ИИ ПРОСТО ОТВЕТИЛ ТЕКСТОМ (Задал уточняющий вопрос):
    // В этом случае никаких действий в GraphQL нет, идет обычный живой диалог.
    await historyService.appendMessage(sessionId, 'user', message);
    await historyService.appendMessage(
      sessionId,
      'assistant',
      aiResult.text as string,
    );

    return res.json({
      status: 'SUCCESS',
      message: aiResult.text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// =============================================================================
// ЭНДПОИНТ ФИЗИЧЕСКОГО ИСПОЛНЕНИЯ И СХЛОПЫВАНИЯ КОНТЕНТА (Новый критический узел)
// Вызывается фронтендом, когда пользователь нажимает кнопку «ПРИМЕНИТЬ ИЗМЕНЕНИЯ» на карточке
// =============================================================================
app.post('/api/chat/execute', async (req, res) => {
  try {
    const { sessionId, actions, summaryMessage } = req.body;
    const session = await historyService.getOrCreateSession(sessionId);

    console.log(
      '--- Выполнение GraphQL мутаций из подтвержденного черновика ---',
      actions,
    );

    // 1. Создаем карту для подмены PENDING_ID на реальные UUID из вашей системы
    const idMap = new Map<string, string>();

    // 2. Последовательно выполняем мутации (Ваш будущий rabisClient)
    for (const action of actions) {
      if (action.functionName === 'createModule') {
        // const realModule = await rabisClient.createModule(action.arguments);
        // idMap.set('PENDING_MODULE_ID', realModule.id);
        idMap.set('PENDING_MODULE_ID', 'real_mod_uuid_example_123'); // Заглушка
      }

      if (action.functionName === 'createDataType') {
        // Подменяем заглушку ID модуля на реальный UUID, полученный шагом выше
        const modId =
          action.arguments.moduleId === 'PENDING_MODULE_ID'
            ? idMap.get('PENDING_MODULE_ID')
            : action.arguments.moduleId;

        // const realDataType = await rabisClient.createDataType({ ...action.arguments, moduleId: modId });
        // idMap.set('PENDING_DATA_TYPE_ID', realDataType.id);
        idMap.set('PENDING_DATA_TYPE_ID', 'real_dt_uuid_example_456'); // Заглушка
      }

      if (action.functionName === 'createDataTypeField') {
        const dtId =
          action.arguments.dataTypeId === 'PENDING_DATA_TYPE_ID'
            ? idMap.get('PENDING_DATA_TYPE_ID')
            : action.arguments.dataTypeId;

        // await rabisClient.createDataTypeField({ ...action.arguments, dataTypeId: dtId });
      }
    }

    // 3. СХЛОПЫВАНИЕ КОНТЕНТА: Очищаем историю чата от длинных обсуждений и
    // записываем одну емкую системную строку о том, что объекты успешно созданы.
    const logSummary =
      summaryMessage || 'Успешно созданы новые элементы метаданных.';
    await historyService.archiveExecutedActions(sessionId, logSummary);

    // 4. Если мы в режиме большого ТЗ, автоматически двигаем очередь к следующему шагу
    if (session.mode === 'CHUNK_PROCESSING') {
      const hasNext = await historyService.moveToNextStep(sessionId);

      return res.json({
        status: 'STEP_EXECUTED_AND_MOVED',
        message: 'Текущий шаг ТЗ успешно выполнен!',
        hasNextStep: hasNext,
        nextStepIndex: session.currentStepIndex,
      });
    }

    // Если это был обычный точечный запрос из чата
    return res.json({
      status: 'EXECUTED',
      message: 'Структура успешно обновлена в системе!',
    });
  } catch (error) {
    console.error('Ошибка выполнения черновика:', error);
    res.status(500).json({ error: 'Failed to execute architecture schema' });
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
