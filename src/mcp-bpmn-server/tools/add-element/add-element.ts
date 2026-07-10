import { z } from 'zod';
import { defineTool } from '../../../shared/utils/base.js';
import { errorResponse, routingResponse } from './shared.js';

const ELEMENT_TYPES = [
  'bpmn:StartEvent',
  'bpmn:EndEvent',
  'bpmn:UserTask',
  'bpmn:ServiceTask',
  'bpmn:SendTask',
  'bpmn:ScriptTask',
  'bpmn:ExclusiveGateway',
  'bpmn:InclusiveGateway',
  'bpmn:SubProcess',
  'bpmn:BoundaryEvent',
  'bpmn:IntermediateCatchEvent',
  'bpmn:IntermediateThrowEvent',
] as const;

const AddElementSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementType: z.string().describe(
    `Тип базового BPMN элемента: ${ELEMENT_TYPES}. 
       Используйте их собственные отдельные инструменты!'`,
  ),
  name: z.string().max(255).optional().describe('Имя элемента'),
});

async function handleAddElement(args: {
  dataTypeId: string;
  elementType: string;
  name?: string;
}) {
  try {
    if (!(ELEMENT_TYPES as readonly string[]).includes(args.elementType)) {
      return errorResponse(
        `Неизвестный тип элемента "${args.elementType}". Доступные типы: ${ELEMENT_TYPES.join(', ')}`,
      );
    }

    if (args.elementType === 'bpmn:StartEvent') {
      return routingResponse(
        'bpmn_add_start_event',
        'Используйте этот инструмент для создания стартовых событий.',
      );
    }

    if (args.elementType === 'bpmn:EndEvent') {
      return routingResponse(
        'bpmn_add_end_event',
        'Используйте этот инструмент для создания конечных событий.',
      );
    }

    if (args.elementType === 'bpmn:ExclusiveGateway') {
      return routingResponse(
        'bpmn_add_exclusive_gateway',
        'Используйте этот инструмент для создания развилок (XOR).',
      );
    }

    if (args.elementType === 'bpmn:InclusiveGateway') {
      return routingResponse(
        'bpmn_add_inclusive_gateway',
        'Используйте этот инструмент для создания параллельных/включающих гейтвеев.',
      );
    }

    if (args.elementType === 'bpmn:UserTask') {
      return routingResponse(
        'bpmn_add_user_task',
        'Для UserTask смотреть параметры внутри инструмента.',
      );
    }

    if (args.elementType === 'bpmn:ServiceTask') {
      return routingResponse(
        'bpmn_add_service_task',
        'Для ServiceTask смотреть параметры внутри инструмента',
      );
    }

    if (args.elementType === 'bpmn:SendTask') {
      return routingResponse(
        'bpmn_add_send_task',
        'Для SendTask смотреть параметры внутри инструмента.',
      );
    }

    if (args.elementType === 'bpmn:BoundaryEvent') {
      return routingResponse(
        'bpmn_add_boundary_event',
        'Для BoundaryEvent обязателен параметр attachedToRef (ID родительского элемента).',
      );
    }

    if (args.elementType === 'bpmn:ScriptTask') {
      return routingResponse(
        'bpmn_add_script_task',
        'Используйте этот инструмент для создания ScriptTask.',
      );
    }

    if (args.elementType === 'bpmn:SubProcess') {
      return routingResponse(
        'bpmn_add_sub_process',
        'Используйте этот инструмент для создания подпроцесса-контейнера.',
      );
    }

    if (args.elementType === 'bpmn:IntermediateCatchEvent') {
      return routingResponse(
        'bpmn_add_intermediate_catch_event',
        'Используйте этот инструмент для создания промежуточного события-перехватчика.',
      );
    }

    if (args.elementType === 'bpmn:IntermediateThrowEvent') {
      return routingResponse(
        'bpmn_add_intermediate_throw_event',
        'Используйте этот инструмент для создания промежуточного генерирующего события.',
      );
    }

    return errorResponse(
      `Для элемента "${args.elementType}" не найден выделенный инструмент создания. Проверьте конфигурацию MCP-сервера.`,
    );
  } catch (e: any) {
    return errorResponse(e?.message || `Ошибка маршрутизации элемента`);
  }
}

export const addGenericElementTools = [
  defineTool(
    'bpmn_add_element',
    {
      title: 'Add BPMN Element',
      description:
        'Универсальный инструмент создания BPMN элементов. Роутит по конкретному инструменту в зависимости от elementType. Вызов redirect-ит на специализированный bpmn_add_*, который принимает все необходимые параметры.',
      inputSchema: AddElementSchema,
    },
    handleAddElement,
  ),
];
