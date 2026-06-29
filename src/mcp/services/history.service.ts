//# Управление контекстом и памятью сессии
import { ChatSession, Task } from '../../types/session';

class HistoryService {
  private sessions = new Map<string, ChatSession>();

  async getOrCreateSession(sessionId: string): Promise<ChatSession> {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        sessionId,
        mode: 'NORMAL_CHAT',
        currentStepIndex: 0,
        tasksQueue: [],
        chatHistory: [],
      });
    }
    return this.sessions.get(sessionId)!;
  }

  // 1. Возвращает историю сообщений, готовую для отправки в ИИ
  async getChatHistoryForAI(sessionId: string) {
    const session = await this.getOrCreateSession(sessionId);
    return session.chatHistory;
  }

  // Добавить сообщение в историю диалога
  async appendMessage(
    sessionId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
  ) {
    const session = await this.getOrCreateSession(sessionId);
    session.chatHistory.push({ role, content });
  }

  // Переключить сессию в режим обработки большого ТЗ и записать очередь задач
  async startChunkProcessing(sessionId: string, tasks: Task[]) {
    const session = await this.getOrCreateSession(sessionId);
    session.mode = 'CHUNK_PROCESSING';
    session.tasksQueue = tasks;
    session.currentStepIndex = 0;
  }

  // Сдвинуть указатель на следующий шаг очереди
  async moveToNextStep(sessionId: string): Promise<boolean> {
    const session = await this.getOrCreateSession(sessionId);
    session.currentStepIndex++;

    if (session.currentStepIndex >= session.tasksQueue.length) {
      session.mode = 'NORMAL_CHAT';
      session.tasksQueue = [];
      session.currentStepIndex = 0;
      return false; // Очередь завершена
    }
    return true; // Есть следующий шаг
  }

  // Метод для "схлопывания" (архивации) выполненных шагов.
  // Безопасно очищает контекст модели от тяжелых JSON-тех-логов инструментов.
  async archiveExecutedActions(sessionId: string, summary: string) {
    const session = await this.getOrCreateSession(sessionId);

    // Удаляем все сообщения с ролью 'tool' и вызовы инструментов из роли 'assistant',
    // так как они занимают много токенов, а действие уже зафиксировано в GraphQL.
    session.chatHistory = session.chatHistory
      .map((msg: any) => {
        if (msg.role === 'assistant' && msg.tool_calls) {
          // Клонируем сообщение, но очищаем массив вызовов функций, оставляя только текст рассуждения (если он был)
          return {
            role: 'assistant',
            content: msg.content || 'Выполнена генерация через инструменты.',
          };
        }
        return msg;
      })
      .filter((msg: any) => msg.role !== 'tool'); // Полностью вырезаем ответы инструментов

    session.chatHistory.push({
      role: 'system',
      content: `[КОНТЕКСТ АКТУАЛИЗИРОВАН]: Действие успешно зафиксировано в схеме проекта: ${summary}. Предыдущие технические логи вызовов функций архивированы.`,
    });
  }

  // Метод получения текущей задачи
  async getCurrentTask(sessionId: string): Promise<Task | null> {
    const session = await this.getOrCreateSession(sessionId);
    if (
      session.mode === 'CHUNK_PROCESSING' &&
      session.tasksQueue[session.currentStepIndex]
    ) {
      return session.tasksQueue[session.currentStepIndex];
    }
    return null;
  }

  // Полностью очистить историю (для тестов)
  async clearSession(sessionId: string) {
    this.sessions.delete(sessionId);
  }

  /**
   * Сохраняет успешное выполнение задачи Агентом в глобальную историю.
   * Вместо сохранения десятков технических сообщений (tool_calls, tool),
   * сохраняет красивый текстовый отчет для пользователя и лаконичный системный маркер.
   */
  async appendMcpTaskResult(
    sessionId: string,
    userTask: string,
    finalReport: string,
  ) {
    const session = await this.getOrCreateSession(sessionId);

    // 1. Фиксируем запрос пользователя (если его еще нет в истории)
    session.chatHistory.push({
      role: 'user',
      content: `Выполни задачу: ${userTask}`,
    });

    // 2. Фиксируем финальный текстовый ответ Агента для отображения в чате
    session.chatHistory.push({ role: 'assistant', content: finalReport });

    // 3. Схлопываем контекст: пишем системный маркер, чтобы модель на следующем шаге
    // знала, что эта часть ТЗ уже успешно интегрирована в систему.
    session.chatHistory.push({
      role: 'system',
      content: `[СИСТЕМНОЕ УВЕДОМЛЕНИЕ]: Задача "${userTask}" успешно выполнена через автоматические инструменты. Изменения применены в БД.`,
    });
  }
}

export const historyService = new HistoryService();
