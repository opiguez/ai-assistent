import { Express } from 'express';
import express from 'express';
import { historyService } from '../services/history.service';

export function registerHistoryRoutes(app: Express) {
  app.use(express.json());

  /**
   * 1. Получить или создать текущую сессию
   */
  app.post('/api/history/session', async (req, res) => {
    try {
      const { sessionId } = req.body;
      if (!sessionId) {
        return res.status(400).json({ error: 'sessionId обязателен' });
      }

      const session = await historyService.getOrCreateSession(
        String(sessionId),
      );
      return res.json(session);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  /**
   * 2. Переключить сессию в режим нарезки ТЗ и записать очередь задач
   */
  app.post('/api/history/start-chunk', async (req, res) => {
    try {
      const { sessionId, tasks } = req.body;
      if (!sessionId || !Array.isArray(tasks)) {
        return res
          .status(400)
          .json({ error: 'sessionId и массив tasks обязательны' });
      }

      await historyService.startChunkProcessing(String(sessionId), tasks);
      await historyService.appendMessage(
        String(sessionId),
        'system',
        '[СИСТЕМНОЕ УВЕДОМЛЕНИЕ]: Запущен пошаговый режим обработки ТЗ.',
      );

      return res.json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  /**
   * 3. Сохранить результат выполнения атомарного шага Агентом
   */
  app.post('/api/history/append-result', async (req, res) => {
    try {
      const { sessionId, taskDescription, finalReportText } = req.body;
      if (!sessionId || !taskDescription || !finalReportText) {
        return res.status(400).json({
          error: 'sessionId, taskDescription и finalReportText обязательны',
        });
      }

      await historyService.appendMcpTaskResult(
        String(sessionId),
        String(taskDescription),
        String(finalReportText),
      );

      return res.json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  /**
   * 4. Сдвинуть указатель на следующий шаг в очереди задач ТЗ
   */
  app.post('/api/history/next-step', async (req, res) => {
    try {
      const { sessionId } = req.body;
      if (!sessionId) {
        return res.status(400).json({ error: 'sessionId обязателен' });
      }

      const hasNextStep = await historyService.moveToNextStep(
        String(sessionId),
      );
      const session = await historyService.getOrCreateSession(
        String(sessionId),
      );

      return res.json({
        hasNextStep,
        nextStepIndex: session.currentStepIndex,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  /**
   * 5. Архивация/схлопывание кастомных UI действий
   */
  app.post('/api/history/archive-actions', async (req, res) => {
    try {
      const { sessionId, summary } = req.body;
      if (!sessionId || !summary) {
        return res
          .status(400)
          .json({ error: 'sessionId и summary обязательны' });
      }

      await historyService.archiveExecutedActions(
        String(sessionId),
        String(summary),
      );
      return res.json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  /**
   * 6. Очистка сессии
   */
  app.delete('/api/history/session/:sessionId', async (req, res) => {
    try {
      const { sessionId } = req.params;
      await historyService.clearSession(sessionId);
      return res.json({
        success: true,
        message: `Сессия ${sessionId} успешно очищена.`,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });
}
