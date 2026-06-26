//# Управление контекстом и памятью сессии
import { ChatSession, Task } from '../types/session';

export class HistoryService {
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

  // ПОЛЕЗНОЕ ДОПОЛНЕНИЕ 1: Метод для "схлопывания" (архивации) выполненных шагов.
  // Заменяет длинную цепочку "Хочу поле -> ИИ предложил -> Юзер утвердил" на одну короткую системную строку.
  // Это очищает контекст 27B модели от лишнего шума и экономит токены.
  async archiveExecutedActions(sessionId: string, summary: string) {
    const session = await this.getOrCreateSession(sessionId);

    // Удаляем последние 2-3 сообщения (реплику юзера и tool_calls от ИИ),
    // так как действие УЖЕ выполнено и теперь находится в реальной схеме GraphQL.
    if (session.chatHistory.length >= 2) {
      session.chatHistory = session.chatHistory.slice(0, -2);
    }

    // Вместо них пишем одну жесткую правду для ИИ:
    session.chatHistory.push({
      role: 'system',
      content: `[СИСТЕМНОЕ УВЕДОМЛЕНИЕ]: Действие успешно завершено пользователем в UI: ${summary}.`,
    });
  }

  // ПОЛЕЗНОЕ ДОПОЛНЕНИЕ 2: Метод получения текущей задачи
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
}
