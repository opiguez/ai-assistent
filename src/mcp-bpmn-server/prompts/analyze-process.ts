/**
 * BPMN Analyze Process Prompt
 * Шаблон: "Прочитай процесс, покажи структуру, найди проблемы"
 */
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/server';

export default function registerAnalyzeProcessPrompt(server: McpServer) {
  server.registerPrompt(
    'bpmn_analyze_process',
    {
      title: 'Analyze BPMN Process',
      description:
        'Анализ BPMN процесса: чтение схемы, структуры элементов, валидация, рекомендации по улучшению.',
      argsSchema: z.object({
        dataTypeId: z.string().describe('ID BPMN типа данных для анализа'),
      }),
    },
    async ({ dataTypeId }: { dataTypeId: string }) => {
      const text = `
## Задача: Анализ BPMN процесса

**DataTypeID:** ${dataTypeId}

### Шаг 1: Контекст данных процесса
Прочитай \`bpmn://process/${dataTypeId}/data-context\` — чтобы понимать:
  - Какие userGroups, postTemplates, bpmnMessages, rdmStructures, dataTypeProperties доступны
  - Сверять элементы схемы с реальными данными

### Шаг 2: Чтение текущего состояния
Вызови \`bpmn_get_process_schema\` с dataTypeId="${dataTypeId}" для получения структуры процесса.
Вызови \`bpmn_get_process_topology\` для анализа графа (пути, виснущие элементы, петли).

### Шаг 3: Проверка custom Model
Проверь элементы:
- UserTask с decisionsEnabled → \`bpmn_toggle_decisions\`
- Gateway без DataTypeProperty → \`bpmn_set_rdm_or_number_structure\`
- Свойства элемента → \`bpmn_get_element_properties\`

### Шаг 4: Валидация
Вызови \`bpmn_validate_process\` с dataTypeId="${dataTypeId}" для проверки валидности.

### Шаг 5: Рекомендации
Вызови \`bpmn_suggest_improvements\` с dataTypeId="${dataTypeId}" для предложений по улучшению.

### Шаг 6: Итоговый отчёт
Представь краткий отчёт:
1. Общая структура (сколько элементов, типов, связей)
2. Проблемы (ошибки валидации, отсутствующие настройки)
3. Рекомендации (что улучшить, какие паттерны применить)
`;

      return {
        description: `Анализ BPMN процесса ${dataTypeId}`,
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
