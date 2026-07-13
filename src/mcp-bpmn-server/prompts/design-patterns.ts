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
          .enum(['branching', 'execution', 'messages', 'structure', 'all'])
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
        | **RDM/Number Structure** | Ветвление по значению справочника/поля | \`bpmn_set_rdm_or_number_structure\` |
        | **Condition Expression** | Установка условия на стрелку. Вызывается ПОСЛЕ bpmn_toggle_decisions или bpmn_set_rdm_or_number_structure | \`bpmn_set_condition_expression\` |

        `,

        execution: `
        ## 2. Execution — "что делать?"

        | Паттерн | Когда | Инструмент |
        |---------|-------|------------|
        | **UserTask** | Действие человека | \`bpmn_add_user_task\` |
        | **ServiceTask** | Вызов API метода | \`bpmn_add_service_task\` (нужен apiSpecGroupId, targetModule, targetService, targetMethod) |
        | **SendTask** | Email-уведомление | \`bpmn_add_send_task\` |
        | **ScriptTask** | Внутренняя логика (вычисления) | \`bpmn_add_script_task\` |

        ⚠️ **Ограничение:** \`bpmn_update_element_property\` меняет только простые поля: name, isCancelEvent, isDeleteEvent, isDearchiveEvent, messageId, eventName. Для смены API-метода ServiceTask, шаблона SendTask, исполнителя UserTask, скрипта ScriptTask — удалите элемент (\`bpmn_delete_element\`) и создайте заново через \`bpmn_add_*\`.
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
        | Кто/что принимает решение? | Человек (кнопки) → \`bpmn_toggle_decisions\`, Справочник (RDM) → \`bpmn_set_rdm_or_number_structure\`, Число (realNumber) → \`bpmn_set_rdm_or_number_structure\` |
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
