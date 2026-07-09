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

#### Шаг 1: Каталог доступных элементов
Вызови \`bpmn_get_available_element_types\` для справочника доступных BPMN элементов.

#### Шаг 2: Подготовка
Прочитай API-спецификацию: \`bpmn_get_api_spec\` — нужна для ServiceTask (получи apiSpecGroupId).

#### Шаг 3: Создание скелета
Создай базовую структуру процесса:
1. \`bpmn_add_element\` с dataTypeId="${dataTypeId}", elementType="bpmn:StartEvent", name="Start"
2. \`bpmn_add_element\` с dataTypeId="${dataTypeId}", elementType="bpmn:EndEvent", name="End"
3. \`bpmn_connect_elements\` с sourceId=<StartEvent ID>, targetId=<EndEvent ID>

#### Шаг 4: Добавление элементов по описанию
Для каждого элемента из описания вызови \`bpmn_add_element\`:
- UserTask: elementType="bpmn:UserTask", name="Имя задачи", params.assignee={ type: "owner" }
- ServiceTask: elementType="bpmn:ServiceTask", name="Имя сервиса", params={ apiSpecGroupId, targetModule, targetService, targetMethod }
- SendTask: elementType="bpmn:SendTask", name="Имя отправки"
- Gateway: elementType="bpmn:ExclusiveGateway" или "bpmn:InclusiveGateway"
- SubProcess: elementType="bpmn:SubProcess"

#### Шаг 5: Соединение элементов
Вызови \`bpmn_connect_elements\` для создания SequenceFlow между элементами.
Сначала создай основной поток, затем ветвления.

#### Шаг 6: Настройка свойств
Для каждого элемента настрой свойства:
- UserTask decisions: \`bpmn_toggle_decisions\` (создаёт ExclusiveGateway + flows автоматически)
- Condition на стрелке: \`bpmn_set_condition_expression\`
- Gateway RDM/Number: \`bpmn_set_rdm_or_number_structure\`

#### Шаг 7: Валидация
Вызови \`bpmn_validate_process\` с dataTypeId="${dataTypeId}".
Если valid=false — проанализируй ошибки и повтори шаги 4-6.

#### Шаг 8: Отчёт
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
