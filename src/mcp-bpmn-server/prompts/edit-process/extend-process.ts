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

${stepReadSchema(dataTypeId)}

#### Шаг 2: Определение точки вставки
- Где должен появиться новый элемент?
- Какие существующие связи нужно разорвать?
- Какой элемент является source/target для нового?

${stepSaveSnapshot(dataTypeId)}

#### Шаг 4: Добавление нового элемента
Вызови \`bpmn_add_element\` с нужным типом и именем:
- UserTask: \`bpmn_add_element(dataTypeId, 'bpmn:UserTask', 'Имя', { assignee: { type: 'owner' } })\`
- ServiceTask: \`bpmn_add_element(dataTypeId, 'bpmn:ServiceTask', 'Имя', { apiSpecGroupId, targetModule, targetService, targetMethod })\` — сначала \`bpmn_get_api_spec\`
- Gateway: \`bpmn_add_element(dataTypeId, 'bpmn:ExclusiveGateway', 'Имя')\`

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
- \`bpmn_set_service_task_config\` — ServiceTask API
- \`bpmn_set_send_task_template\` — SendTask шаблон
- \`bpmn_toggle_decisions\` — UserTask decisions (создаёт ExclusiveGateway + flows)
- \`bpmn_set_condition_expression\` — условия на SequenceFlow
- \`bpmn_set_rdm_structure\` — ветвление по справочнику

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
