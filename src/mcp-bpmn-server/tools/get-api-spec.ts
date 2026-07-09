import { z } from 'zod';
import { rabisClient } from '../../shared/services/rabisClient.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';

const GetApiSpecSchema = z.object({
  moduleId: z
    .string()
    .describe(
      'ID Low-Code модуля для получения доступных API спецификаций и методов',
    ),
});

export async function handleGetApiSpec(args: z.infer<typeof GetApiSpecSchema>) {
  try {
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
          },
        },
      });

    const availableMethods: any[] = [];

    (moduleRes.apiSpecsGroups || []).forEach((group) => {
      (group.apiSpecs || []).forEach((spec) => {
        try {
          const moduleDto = JSON.parse(spec.moduleDtoJson || '[]');

          moduleDto.forEach((mod: any) => {
            const targetModule = mod.name || group.name;

            (mod.serviceDtos || []).forEach((dto: any) => {
              const targetService = dto.name; // Имя сервиса

              (dto.methods || []).forEach((method: any) => {
                // Пушим метод, оставляя ТОЛЬКО те поля, которые ИИ скопирует в ServiceTask!
                availableMethods.push({
                  apiSpecGroupId: group.id, // ID группы спецификаций
                  targetModule: targetModule, // Имя модуля
                  targetService: targetService, // Имя сервиса
                  targetMethod: method.name, // Имя метода API
                  description:
                    method.description || method.summary || 'Без описания',
                });
              });
            });
          });
        } catch (parseError) {
          // Игнорируем битый JSON в конкретной спецификации, чтобы не ломать весь инструмент
        }
      });
    });

    return successResponse({
      moduleId: args.moduleId,
      totalMethodsFound: availableMethods.length,
      availableMethods: availableMethods,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка получения API спецификаций',
    );
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
