/**
 * BPMN Extend Process Prompt
 * Workflow: расширение существующего процесса новыми элементами
 */
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/server';
import {
  stepReadSchema,
  stepSaveSnapshot,
  stepValidate,
  stepReport,
} from './workflow-helpers.js';

export default function registerExtendProcessPrompt(server: McpServer) {
  server.registerPrompt(
    'bpmn_extend_process',
    {
      title: 'Extend BPMN Process',
      description:
        'Workflow расширения существующего BPMN процесса: анализ текущей структуры → определение точки вставки → добавление элементов → соединение → валидация.',
      argsSchema: z.object({
        dataTypeId: z.string().describe('ID BPMN типа данных'),
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

${stepReadSchema(dataTypeId)}

#### Шаг 2: Определение точки вставки
- Где должен появиться новый элемент?
- Какие существующие связи нужно разорвать?
- Какой элемент является source/target для нового?

${stepSaveSnapshot(dataTypeId)}

#### Шаг 4: Добавление нового элемента
Вызови \`bpmn_add_element(dataTypeId, elementType, name)\` — он вернёт redirect на специализированный \`bpmn_add_*\`, следуй ему:

- UserTask → \`bpmn_add_user_task\`
- ServiceTask → \`bpmn_add_service_task\` (сперва \`bpmn_get_api_spec\`)
- SendTask → \`bpmn_add_send_task\`
- ScriptTask → \`bpmn_add_script_task\`
- ExclusiveGateway → \`bpmn_add_exclusive_gateway\`
- InclusiveGateway → \`bpmn_add_inclusive_gateway\`
- SubProcess → \`bpmn_add_sub_process\`
- BoundaryEvent → \`bpmn_add_boundary_event\`
- IntermediateCatchEvent → \`bpmn_add_intermediate_catch_event\`
- IntermediateThrowEvent → \`bpmn_add_intermediate_throw_event\`

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
- \`bpmn_toggle_decisions\` — UserTask decisions (только флаг, ветки создаются через \`bpmn_connect_elements\`)
- \`bpmn_set_condition_expression\` — условия на SequenceFlow
- \`bpmn_set_rdm_or_number_structure\` — ветвление по справочнику/числу
- \`bpmn_set_message_event\` — настройка Message Event
- \`bpmn_update_element_property\` — простые поля (name, флаги)

⚠️ **Ограничение:** \`bpmn_update_element_property\` меняет только простые поля: name, isCancelEvent, isDeleteEvent, isDearchiveEvent, messageId, eventName. Для смены API-метода ServiceTask, шаблона SendTask, исполнителя UserTask, скрипта ScriptTask — удалите элемент (\`bpmn_delete_element\`) и создайте заново через \`bpmn_add_*\`.

${stepValidate(dataTypeId)}

${stepReport('добавлено')}
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
