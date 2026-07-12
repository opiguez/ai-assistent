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

#### Шаг 4: Создание скелета
Создай базовую структуру процесса:
1. \`bpmn_add_element\` с dataTypeId="${dataTypeId}", elementType="bpmn:StartEvent", name="Start"
2. \`bpmn_add_element\` с dataTypeId="${dataTypeId}", elementType="bpmn:EndEvent", name="End"
3. \`bpmn_connect_elements\` с sourceId=<StartEvent ID>, targetId=<EndEvent ID>

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

#### Шаг 7: Настройка свойств
Для каждого элемента настрой свойства:
- UserTask decisions: \`bpmn_toggle_decisions\` (устанавливает флаг enabled, ветки создаются отдельно через \`bpmn_connect_elements\`)
- Condition на стрелке: \`bpmn_set_condition_expression\`
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
