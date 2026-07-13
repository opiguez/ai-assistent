/**
 * BPMN Create Process Prompt
 * Workflow: создание нового процесса с нуля
 */
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/server';

export default function registerCreateProcessPrompt(server: McpServer) {
  server.registerPrompt(
    'bpmn_create_process',
    {
      title: 'Create BPMN Process',
      description:
        'Workflow создания нового BPMN процесса с нуля: скелет (StartEvent → EndEvent) → добавление элементов → соединение → настройка → валидация.',
      argsSchema: z.object({
        dataTypeId: z.string().describe('ID BPMN типа данных'),
        elements: z
          .string()
          .describe('Описание элементов процесса (на русском)'),
      }),
    },
    async ({
      dataTypeId,
      elements,
    }: {
      dataTypeId: string;
      elements: string;
    }) => {
      const text = `
## Задача: Создание нового BPMN процесса

**DataTypeID:** ${dataTypeId}
**Описание элементов:** ${elements}

### Workflow (строго последовательный):

#### Шаг 1: Контекст данных процесса
Прочитай \`bpmn://process/{dataTypeId}/data-context\` — получи:
  - userGroups (для назначения UserTask)
  - postTemplates (для SendTask)
  - bpmnMessages (для Message Events)
  - rdmStructures (для Gateway)
  - dataTypeProperties (для переменных и условий)
  - users (для прямых назначений)

#### Шаг 2: Каталог доступных элементов
Вызови \`bpmn_get_available_element_types\` для справочника доступных BPMN элементов.

#### Шаг 3: Подготовка
Прочитай API-спецификацию: \`bpmn_get_api_spec\` — нужна для ServiceTask (получи apiSpecGroupId).

#### Шаг 4: Итеративная постройка
StartEvent уже существует (создаётся при регистрации BPMN-типа). Строим кусочно:
- создай элемент → соедини с предыдущим → создай следующий → соедини
- EndEvent — В САМОМ КОНЦЕ (после всех элементов и веток), name не добавлять
- Ошибки при построении игнорируй — схему достраивай полностью, фикс после валидации

#### Шаг 5: Добавление элементов по описанию
Для каждого элемента вызови \`bpmn_add_element\` с dataTypeId и elementType — он вернёт redirect на специализированный \`bpmn_add_*\`, следуй ему:

| Тип | elementType |
|-----|-------------|
| UserTask | bpmn:UserTask |
| ServiceTask | bpmn:ServiceTask |
| SendTask | bpmn:SendTask |
| ScriptTask | bpmn:ScriptTask |
| ExclusiveGateway | bpmn:ExclusiveGateway |
| InclusiveGateway | bpmn:InclusiveGateway |
| SubProcess | bpmn:SubProcess |
| BoundaryEvent | bpmn:BoundaryEvent |
| IntermediateCatchEvent | bpmn:IntermediateCatchEvent |
| IntermediateThrowEvent | bpmn:IntermediateThrowEvent |

#### Шаг 6: Соединение элементов
Вызови \`bpmn_connect_elements\` для создания SequenceFlow между элементами.
Сначала создай основной поток, затем ветвления.

#### Шаг 6а — Workflow для решений (Decisions) — строгая последовательность:
Если в процессе есть UserTask с решениями (decisions), соблюдай строгий порядок:
1. \`bpmn_add_user_task\` — создай задачу с assignee (имя из ТЗ)
2. \`bpmn_toggle_decisions\` — активируй режим решений (имена кнопок из ТЗ)
3. \`bpmn_add_exclusive_gateway\` — создай шлюз ветвления
4. \`bpmn_connect_elements\` — UserTask → Gateway
5. \`bpmn_add_exclusive_gateway\` — создай convergence gateway
6. \`bpmn_add_*\` — задача для ветки, передай position:"branch"
7. \`bpmn_connect_elements\` — Gateway → Task с conditionName (имя решения из ТЗ)
8. \`bpmn_set_condition_expression\` (connectionId стрелки_7, value="1") — условие на первую ветку
9. \`bpmn_connect_elements\` — Gateway → convergence с conditionName (имя решения из ТЗ)
10. \`bpmn_set_condition_expression\` (connectionId стрелки_9, value="2") — условие на вторую ветку
11. \`bpmn_connect_elements\` — Task → convergence
12. \`bpmn_add_end_event\` — EndEvent В КОНЦЕ (name не добавлять)
13. \`bpmn_connect_elements\` — convergence → EndEvent

> \`position\` определяет размещение: "branch" — колонка от gateway (ветка), "main" — центр Y (основной ряд). Без параметра — авто-детекция по модели.

#### Шаг 7: Настройка свойств
Для каждого элемента настрой свойства:
- UserTask decisions: \`bpmn_toggle_decisions\` (устанавливает флаг enabled, ветки создаются отдельно через \`bpmn_connect_elements\`; затем обязательно вызови \`bpmn_set_condition_expression\` на каждой стрелке от шлюза)
- Condition на стрелке: \`bpmn_set_condition_expression\` — ВАЖНО: всегда вызывай после \`bpmn_connect_elements\` для каждой ветки шлюза
- Gateway RDM/Number: \`bpmn_set_rdm_or_number_structure\`
- Message Event: \`bpmn_set_message_event\`
- Простые поля (name, isCancelEvent, isDeleteEvent, isDearchiveEvent, messageId, eventName): \`bpmn_update_element_property\`

⚠️ **Ограничение:** \`bpmn_update_element_property\` меняет только простые поля: name, isCancelEvent, isDeleteEvent, isDearchiveEvent, messageId, eventName. Для смены API-метода ServiceTask, шаблона SendTask, исполнителя UserTask, скрипта ScriptTask — удалите элемент (\`bpmn_delete_element\`) и создайте заново через \`bpmn_add_*\`.

#### Шаг 8: Валидация
Вызови \`bpmn_validate_process\` с dataTypeId="${dataTypeId}".
Если valid=false — проанализируй ошибки и повтори шаги 4-6.

#### Шаг 9: Отчёт
Опиши созданную структуру:
- Сколько элементов создано
- Какие типы элементов используются
- Какие свойства настроены
- Результат валидации
`;

      return {
        description: `Создание BPMN процесса ${dataTypeId}`,
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
