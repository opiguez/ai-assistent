import { z } from 'zod';
import { rabisClient } from '../../shared/services/rabisClient.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';

const GetDataTypesSchema = z.object({
  moduleId: z
    .string()
    .describe(
      'ID Low-Code модуля для получения доступных BPMN процессов и типов данных',
    ),
});

export async function handleGetDataTypes(
  args: z.infer<typeof GetDataTypesSchema>,
) {
  try {
    const res = await rabisClient.chain.query
      .module({ id: args.moduleId })
      .get({
        dataTypes: {
          id: true,
          name: true,
          displayName: true,
          status: true,
          isPreconfigured: true,
          isSystem: true,
          stateMachine: true,
          bpmnProcessType: {
            valid: true,
          },
        },
      });

    const dataTypes = (res.dataTypes || []).map((dt) => ({
      dataTypeId: dt.id,
      name: dt.name,
      displayName: dt.displayName,
      status: dt.status,
      isSystem: !!dt.isSystem,
      isPreconfigured: !!dt.isPreconfigured,
      isBpmnValid: dt.bpmnProcessType?.valid ?? null,
    }));

    return successResponse({
      moduleId: args.moduleId,
      totalDataTypes: dataTypes.length,
      dataTypes: dataTypes,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка получения Low-Code типов данных',
    );
  }
}

export const getDataTypesTools = [
  defineTool(
    'bpmn_get_data_types',
    {
      title: 'Get Data Types',
      description: `Возвращает список всех типов данных и BPMN-процессов для указанного модуля.
      Используйте этот инструмент на старте, чтобы получить валидный "dataTypeId".
      Каждая сущность в списке имеет маркер stateMachine="BpmnProcess".
      Ответ содержит только компактные метаданные: dataTypeId, name, displayName, статус системы и флаг валидности схемы (isBpmnValid).
      Внимание: инструмент возвращает только плоский список процессов, технические свойства полей (properties) здесь не выводятся.`,
      inputSchema: GetDataTypesSchema,
    },
    handleGetDataTypes,
  ),
];
