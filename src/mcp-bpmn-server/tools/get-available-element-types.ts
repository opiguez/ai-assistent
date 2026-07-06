import { z } from 'zod';
import { PALETTE_ELEMENTS } from '../knowledge/bpmn-element-specs.js';
import { defineTool } from '../../shared/utils/base.js';

const GetAvailableElementTypesSchema = z.object({
  filter: z
    .enum(['all', 'event', 'activity', 'gateway'])
    .optional()
    .describe('Фильтр по категории элементов'),
});

async function handleGetAvailableElementTypes(args: {
  filter?: string;
}) {
  try {
    const filter = args.filter || 'all';

    const elements = Object.entries(PALETTE_ELEMENTS)
      .filter(([, spec]) => {
        if (filter === 'all') return true;
        return spec.category === filter;
      })
      .map(([key, spec]) => ({
        key,
        category: spec.category,
        displayName: spec.displayName,
        description: spec.description,
        ...('customType' in spec ? { customType: (spec as any).customType } : {}),
        ...('topic' in spec ? { topic: (spec as any).topic } : {}),
        ...('canBeInSubprocess' in spec
          ? { canBeInSubprocess: (spec as any).canBeInSubprocess }
          : {}),
        ...('canAttachTo' in spec
          ? { canAttachTo: (spec as any).canAttachTo }
          : {}),
        ...('requiresParent' in spec
          ? { requiresParent: (spec as any).requiresParent }
          : {}),
        ...('supportsDecisions' in spec
          ? { supportsDecisions: (spec as any).supportsDecisions }
          : {}),
        ...('supportsRdmStructure' in spec
          ? { supportsRdmStructure: (spec as any).supportsRdmStructure }
          : {}),
        ...('supportsModuleConfig' in spec
          ? { supportsModuleConfig: (spec as any).supportsModuleConfig }
          : {}),
        ...('supportsTemplate' in spec
          ? { supportsTemplate: (spec as any).supportsTemplate }
          : {}),
      }));

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              status: 'success',
              filter,
              totalElements: elements.length,
              elements,
            },
            null,
            2,
          ),
        },
      ],
    };
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: e?.message || 'Ошибка получения типов элементов',
          }),
        },
      ],
    };
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
