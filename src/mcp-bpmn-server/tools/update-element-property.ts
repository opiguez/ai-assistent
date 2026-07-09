import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService, ModdleElement } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';
import { checkConstraint } from '../services/constraint-utils.js';

export const UpdateElementPropertySchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (модуля/процесса)'),
  elementId: z
    .string()
    .describe('ID элемента, свойство которого нужно изменить'),
  property: z
    .enum([
      'name',
      'isCancelEvent',
      'isDeleteEvent',
      'isDearchiveEvent',
      'messageId',
      'eventName',
    ])
    .describe(
      'Имя Low-Code свойства в custom Model (JSON-decor) для точечного изменения',
    ),
  value: z
    .union([z.string(), z.boolean(), z.number()])
    .describe(
      'Новое значение свойства (может быть строкой, числом или булевым флагом)',
    ),
});

export async function handleUpdateElementProperty(
  args: z.infer<typeof UpdateElementPropertySchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const element = bpmnXmlService.getElementById(
      state.parsed,
      args.elementId,
    ) as ModdleElement | undefined;
    if (!element) {
      return errorResponse(
        `Элемент с ID "${args.elementId}" не найден в BPMN XML`,
      );
    }

    const newModel = { ...state.model };

    if (!newModel[args.elementId]) {
      newModel[args.elementId] = {
        elementType: element.$type,
        name: element.get('name') || '',
        require: [],
        produce: [],
      };
    } else {
      newModel[args.elementId] = { ...newModel[args.elementId] };
    }

    const modelProps = newModel[args.elementId];

    const constraint = checkConstraint(
      'directEdit',
      element,
      modelProps,
      state,
    );
    if (!constraint.allowed) {
      return errorResponse(
        `Изменение свойства заблокировано валидатором констреинтов: ${constraint.reason}`,
      );
    }

    // Для всех остальных плоских low-code флагов пишем только в декор
    (modelProps as any)[args.property] = args.value;

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return errorResponse(
        saveResult.error ||
          'Ошибка при сохранении измененного свойства в базу данных',
      );
    }

    return successResponse({
      elementId: args.elementId,
      property: args.property,
      value: args.value,
      message: `Low-Code свойство "${args.property}" элемента "${args.elementId}" успешно обновлено на значение "${args.value}". Изменения зафиксированы в JSON-decor.`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message ||
        'Внутренняя ошибка при обновлении Low-Code свойства элемента',
    );
  }
}

export const updateElementPropertyTools = [
  defineTool(
    'bpmn_update_element_property',
    {
      title: 'Update Element Property',
      description: `Точечно изменяет кастомные флаговые или строковые Low-Code свойства элемента внутри JSON-decor.
Используется для переключения служебных маркеров процессов (напр., 'isCancelEvent', 'messageId', 'eventName')
Внимание: этот инструмент предназначен СТРОГО для плоских вспомогательных свойств.
Для настройки исполнителей (assignee), шаблонов уведомлений, условий шлюзов (RDM/Number) и кнопок UserTask ОБЯЗАТЕЛЬНО используйте соответствующие специализированные инструменты!`,
      inputSchema: UpdateElementPropertySchema,
    },
    handleUpdateElementProperty,
  ),
];
