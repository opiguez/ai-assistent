import { z } from 'zod';
import { rabisClient } from '../../shared/services/rabisClient.service.js';
import { defineTool } from '../../shared/utils/base.js';

const GetApiSpecSchema = z.object({
  moduleId: z.string().describe('ID модуля для получения API спек'),
});

async function handleGetApiSpec(args: { moduleId: string }) {
  try {
    // Получаем API specs groups для модуля
    const moduleRes = await rabisClient.chain.query
      .module({ id: args.moduleId })
      .get({
        apiSpecsGroups: {
          id: true,
          name: true,
          displayName: true,
          apiSpecs: {
            id: true,
            name: true,
            displayName: true,
            moduleDtoJson: true,
            serviceUrl: true,
            version: true,
          },
        },
      });

    const groups = ((moduleRes as any).apiSpecsGroups || []).map(
      (group: any) => ({
        id: group.id,
        name: group.name,
        displayName: group.displayName,
        apiSpecs: (group.apiSpecs || []).map((spec: any) => {
          let parsedMethods: any[] = [];
          try {
            const moduleDto = JSON.parse(spec.moduleDtoJson || '[]');
            parsedMethods = moduleDto.flatMap((mod: any) =>
              (mod.serviceDtos || []).flatMap((dto: any) =>
                (dto.methods || []).map((method: any) => ({
                  serviceName: dto.name,
                  methodName: method.name,
                  httpMethod: method.httpMethod,
                  path: method.path,
                  description: method.description || method.summary,
                  technicalName: method.technicalName,
                })),
              ),
            );
          } catch {}

          return {
            id: spec.id,
            name: spec.name,
            displayName: spec.displayName,
            serviceUrl: spec.serviceUrl,
            version: spec.version,
            methodsCount: parsedMethods.length,
            methods: parsedMethods,
          };
        }),
      }),
    );

    const totalMethods = groups.reduce(
      (sum: number, g: any) =>
        sum +
        g.apiSpecs.reduce((s: number, sp: any) => s + sp.methodsCount, 0),
      0,
    );

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              status: 'success',
              moduleId: args.moduleId,
              totalGroups: groups.length,
              totalMethods,
              groups,
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
            message: e?.message || 'Ошибка получения API спек',
          }),
        },
      ],
    };
  }
}

export const getApiSpecTools = [
  defineTool(
    'bpmn_get_api_spec',
    {
      title: 'Get API Spec',
      description:
        'Возвращает OpenAPI спеки для модуля: группы API, методы (serviceName, methodName, httpMethod, path). Используется для настройки ServiceTask (BM Service Task) — привязки к конкретному API методу.',
      inputSchema: GetApiSpecSchema,
    },
    handleGetApiSpec,
  ),
];
