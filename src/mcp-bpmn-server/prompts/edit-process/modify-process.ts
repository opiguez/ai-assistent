/**
 * BPMN Modify Process Prompt
 * Workflow: прочитай → измени →валидируй → сохрани
 */
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/server';
import {
  stepReadSchema,
  stepSaveSnapshot,
  stepValidate,
  stepReport,
} from './workflow-helpers.js';

export default function registerModifyProcessPrompt(server: McpServer) {
  server.registerPrompt(
    'bpmn_modify_process',
    {
      title: 'Modify BPMN Process',
      description:
        'Пошаговый workflow изменения BPMN процесса: чтение → проверка ограничений → модификация → валидация → сохранение.',
      argsSchema: z.object({
        dataTypeId: z.string().describe('ID BPMN типа данных'),
        instruction: z
          .string()
          .describe('Описание требуемого изменения (на русском)'),
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
## Задача: Изменение BPMN процесса

**DataTypeID:** ${dataTypeId}
**Инструкция:** ${instruction}

### Workflow (строго последовательный):

${stepReadSchema(dataTypeId)}

#### Шаг 2: Контекст данных процесса
Прочитай \`bpmn://process/${dataTypeId}/data-context\` — чтобы понимать:
  - Какие userGroups, postTemplates, bpmnMessages, rdmStructures, dataTypeProperties доступны
  - Сверять изменения с актуальными данными (при смене assignee, template, rdmStructure)

#### Шаг 3: Поиск целевого элемента
Определи ID элемента, который нужно изменить, по описанию из инструкции.
Если нужно — вызови \`bpmn_get_element_properties\` для уточнения текущих значений.
Если нужна общая структура — \`bpmn_get_process_topology\`.

${stepSaveSnapshot(dataTypeId)}

#### Шаг 5: Проверка ограничений
Вызови \`bpmn_get_element_constraints\` с:
- dataTypeId="${dataTypeId}"
- elementId=<ID целевого элемента>
- operation=<тип операции: delete|connect|changeType|addBoundaryEvent|directEdit|addDecision|addGatewayStructure>

Если allowed=false — сообщи причину и предложи альтернативу.

#### Шаг 6: Модификация
Вызови соответствующий инструмент:

**WRITE (настройка существующих элементов):**
- Простые поля (name, isCancelEvent, isDeleteEvent, isDearchiveEvent, messageId, eventName): \`bpmn_update_element_property\`
- Условие: \`bpmn_set_condition_expression\`
- Decisions: \`bpmn_toggle_decisions\`
- RDM/Number Structure: \`bpmn_set_rdm_or_number_structure\`
- Message Event: \`bpmn_set_message_event\`

⚠️ **Ограничение:** \`bpmn_update_element_property\` меняет только простые поля: name, isCancelEvent, isDeleteEvent, isDearchiveEvent, messageId, eventName. Для смены API-метода ServiceTask, шаблона SendTask, исполнителя UserTask, скрипта ScriptTask — удалите элемент (\`bpmn_delete_element\`) и создайте заново через \`bpmn_add_*\`.

**CREATE (если нужен новый элемент):**
- Новый элемент: \`bpmn_add_element(dataTypeId, elementType, name, params?)\` — \`bpmn_add_element\` вернёт redirect на специализированный \`bpmn_add_*\`, следуй ему
- Поддерживаемые типы: UserTask, ServiceTask, SendTask, ScriptTask, ExclusiveGateway, InclusiveGateway, SubProcess, StartEvent, EndEvent, BoundaryEvent, IntermediateCatchEvent, IntermediateThrowEvent
- Новая связь: \`bpmn_connect_elements\`
- Удаление связи: \`bpmn_delete_element\` (с confirm: true)

${stepValidate(dataTypeId)}

#### Шаг 8: Повторная проверка контекста
Если валидация выявила ошибки, связанные с данными (неверный template, несуществующая группа), перечитай \`bpmn://process/${dataTypeId}/data-context\` для сверки.

${stepReport('изменено')}
`;

      return {
        description: `Изменение BPMN процесса ${dataTypeId}: ${instruction}`,
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
