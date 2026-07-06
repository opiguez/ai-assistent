/**
 * BPMN Extend Process Prompt
 * Workflow: расширение существующего процесса новыми элементами
 */
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/server';

export default function registerExtendProcessPrompt(server: McpServer) {
  server.registerPrompt(
    'bpmn_extend_process',
    {
      title: 'Extend BPMN Process',
      description:
        'Workflow расширения существующего BPMN процесса: анализ текущей структуры → определение точки вставки → добавление элементов → соединение → валидация.',
      argsSchema: z.object({
        dataTypeId: z
          .string()
          .describe('ID BPMN типа данных'),
        instruction: z
          .string()
          .describe('Описание что нужно добавить/изменить (на русском)'),
      }),
    },
    async ({
      dataTypeId,
      instruction,
    }: {
      dataTypeId: string;
      instruction: string;
    }) => {
      const text = `
## Задача: Расширение BPMN процесса

**DataTypeID:** ${dataTypeId}
**Инструкция:** ${instruction}

### Workflow (строго последовательный):

#### Шаг 1: Анализ текущей структуры
1. \`bpmn_get_process_schema\` — общая структура процесса
2. \`bpmn_get_process_topology\` — граф анализ (пути, ветвления, dead-ends)
3. Определи: процесс пустой (только Start/End) или заполненный?

#### Шаг 2: Определение точки вставки
- Где должен появиться новый элемент?
- Какие существующие связи нужно разорвать?
- Какой элемент является source/target для нового?

#### Шаг 3: Сохранение снимка
Вызови \`bpmn_save_snapshot\` с dataTypeId="${dataTypeId}".
При ошибке можно будет откатиться через \`bpmn_restore_snapshot\`.

#### Шаг 4: Добавление нового элемента
Вызови \`bpmn_add_element\` с нужным типом и именем.

#### Шаг 5: Перенастройка связей
Если нужно вставить элемент в существующую цепочку:
1. \`bpmn_delete_element\` старой связи (с confirm: true)
2. \`bpmn_connect_elements\` от source к новому элементу
3. \`bpmn_connect_elements\` от нового элемента к target

Если добавляем параллельный элемент:
1. \`bpmn_connect_elements\` от source к новому элементу
2. \`bpmn_connect_elements\` от нового элемента к следующему

#### Шаг 6: Настройка свойств
Настрой свойства нового элемента:
- \`bpmn_update_element_property\` — общие свойства
- \`bpmn_set_service_task_config\` — ServiceTask API
- \`bpmn_set_send_task_template\` — SendTask шаблон
- \`bpmn_toggle_decisions\` — UserTask decisions
- \`bpmn_set_condition_expression\` — условия на SequenceFlow

#### Шаг 7: Валидация
Вызови \`bpmn_validate_process\` с dataTypeId="${dataTypeId}".
Если valid=false:
- Проанализируй ошибки
- Повтори шаги 4-6 с корректировкой
- При необходимости — \`bpmn_restore_snapshot\` для отката

#### Шаг 8: Отчёт
Опиши что добавлено:
- Новые элементы (тип, имя, ID)
- Новые/изменённые связи
- Настроенные свойства
- Результат валидации
`;

      return {
        description: `Расширение BPMN процесса ${dataTypeId}: ${instruction}`,
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
