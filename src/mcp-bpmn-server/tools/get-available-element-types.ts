import { z } from 'zod';
import { PALETTE_ELEMENTS } from '../knowledge/bpmn-element-specs.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';

const GetAvailableElementTypesSchema = z.object({
  filter: z
    .enum(['all', 'event', 'activity', 'gateway'])
    .optional()
    .default('all')
    .describe('Фильтр для ограничения списка по категории BPMN элементов'),
});

export async function handleGetAvailableElementTypes(
  args: z.infer<typeof GetAvailableElementTypesSchema>,
) {
  try {
    const filter = args.filter || 'all';

    const elements = Object.entries(PALETTE_ELEMENTS)
      .filter(([, spec]) => {
        if (filter === 'all') return true;
        return spec.category === filter;
      })
      .map(([key, spec]) => ({
        elementType: key, // Официальный BPMN тег (напр. "bpmn:UserTask")
        category: spec.category, // Категория (event, activity, gateway)
        displayName: spec.displayName, // Человеческое название для интерфейса
        description: spec.description, // Инструкция для ИИ, как и когда использовать узел

        customizableProperties: spec.customizableProperties || [],

        // специфичные ограничения платформы
        ...((spec as any).canBeInSubprocess ? { canBeInSubprocess: true } : {}),
      }));

    // Возвращаем ИИ структурированный и компактный ответ
    return successResponse({
      filter,
      totalAvailableTypes: elements.length,
      elements: elements,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка при получении типов элементов',
    );
  }
}

export const getAvailableElementTypesTools = [
  defineTool(
    'bpmn_get_available_element_types',
    {
      title: 'Get Available Element Types',
      description:
        'Возвращает каталог всех доступных элементов BPMN палитры: Start/End/Intermediate Events, UserTask, SendTask, ScriptTask, ServiceTask (BM/Sync), ExclusiveGateway, SubProcesses. С описанием свойств и ограничений каждого.',
      inputSchema: GetAvailableElementTypesSchema,
    },
    handleGetAvailableElementTypes,
  ),
];
