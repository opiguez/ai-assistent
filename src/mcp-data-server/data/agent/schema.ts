import { z } from 'zod';

export const ChatSessionSchema = z.object({
  sessionId: z.string().describe('ID текущей сессии (имя проекта)'),
  tasks: z
    .array(
      z.object({
        layer: z.enum(['DATA', 'BPMN', 'UI']),
        task: z.string(),
        description: z.string(),
        blocked: z.boolean().optional().describe('Задача заблокирована (нет инструментов)'),
        blocker: z.string().optional().describe('Причина блокировки задачи'),
      }),
    )
    .describe('Массив декомпозированных задач от Архитектора'),
});

export const ChatSessionReportSchema = z.object({
  sessionId: z.string().describe('ID сессии (имя проекта)'),
  summary: z
    .string()
    .describe(
      'Короткий текстовый отчет о том, что именно было сделано на этом шаге',
    ),
});
