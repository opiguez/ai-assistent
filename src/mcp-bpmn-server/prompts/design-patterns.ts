/**
 * BPMN Design Patterns Prompt
 * Справочник паттернов: branching, execution, messages, structure
 */
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/server';

export default function registerDesignPatternsPrompt(server: McpServer) {
  server.registerPrompt(
    'bpmn_design_patterns',
    {
      title: 'BPMN Design Patterns',
      description:
        'Справочник паттернов проектирования BPMN: ветвление (decisions, RDM, условия), выполнение (ServiceTask, SendTask, ScriptTask, UserTask), асинхронные сообщения, структура (SubProcess, ошибки, таймеры).',
      argsSchema: z.object({
        pattern: z
          .enum([
            'branching',
            'execution',
            'messages',
            'structure',
            'all',
          ])
          .optional()
          .default('all')
          .describe('Категория паттернов для просмотра'),
      }),
    },
    async ({ pattern }: { pattern: string }) => {
      const patterns: Record<string, string> = {
        branching: `
## 1. Data Branching — "как ветвить?"

| Паттерн | Когда | Инструмент |
|---------|-------|------------|
| **Decisions** | Человек выбирает из вариантов | \`bpmn_toggle_decisions\` |
| **RDM Structure** | Ветвление по значению справочника/поля | \`bpmn_set_rdm_structure\` |
| **Condition Expression** | Ветвление по вычисляемому условию (FEEL) | \`bpmn_set_condition_expression\` |

### Примеры FEEL-выражений:
- \`= "approved"\` — строка
- \`= true\` — boolean
- \`= amount > 1000\` — число
`,

        execution: `
## 2. Execution — "что делать?"

| Паттерн | Когда | Инструмент |
|---------|-------|------------|
| **ServiceTask** | Вызов внешнего API (REST) | \`bpmn_set_service_task_config\` |
| **SendTask** | Отправка email-уведомления | \`bpmn_set_send_task_template\` |
| **ScriptTask** | Внутренняя логика (вычисления) | через фронтенд |
| **UserTask** | Действие человека | \`bpmn_update_element_name\`, \`bpmn_update_element_property\` |
`,

        messages: `
## 3. Async / Messages — "связь между процессами?"

| Паттерн | Когда | Инструмент |
|---------|-------|------------|
| **Message Throw Event** | Отправить сообщение другому процессу | \`bpmn_set_message_event\` |
| **Message Catch Event** | Ждать сообщение от другого процесса | \`bpmn_set_message_event\` |
| **Message Start Event** | Запуск по сообщению (деархивация) | через палитру |
| **Cancel/Delete SubProcess** | Обработка отмены/удаления | через палитру |

**Важно:** Dearchive Event только на верхнем уровне, не в SubProcess.
`,

        structure: `
## 4. Structure — "как группировать?"

| Паттерн | Когда | Ограничение |
|---------|-------|-------------|
| **SubProcess** | Группировка связанных шагов | StartEvent/EndEvent нельзя удалять |
| **Error Boundary Event** | Обработка ошибок на ServiceTask | Только на ServiceTask |
| **Timer Event** | Задержка, дедлайн, повторение | — |
`,
      };

      const selectedPatterns =
        pattern === 'all'
          ? Object.values(patterns).join('\n\n---\n')
          : patterns[pattern] || 'Паттерн не найден';

      const text = `
## Справочник паттернов проектирования BPMN

Используй этот справочник для выбора правильного паттерна при проектировании или изменении BPMN процесса.

${selectedPatterns}

---

### Как выбрать паттерн?

| Вопрос | Паттерн |
|--------|---------|
| Кто принимает решение? | Человек → Decisions, Система → RDM/Condition |
| Что делать? | API → ServiceTask, Email → SendTask, Логика → ScriptTask, Человек → UserTask |
| Нужна ли связь с другим процессом? | Да → Message Event |
| Нужно ли группировать шаги? | Да → SubProcess |
| Нужна ли обработка ошибок? | Да → Error Boundary Event на ServiceTask |
| Нужна ли задержка/таймер? | Да → Timer Event |
`;

      return {
        description: `Справочник BPMN паттернов: ${pattern}`,
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text,
            },
          },
        ],
      };
    },
  );
}
