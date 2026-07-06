import { z } from 'zod';
import { rabisClient } from '../../shared/services/rabisClient.service.js';
import { defineTool } from '../../shared/utils/base.js';

const GetDataTypesSchema = z.object({
  moduleId: z.string().describe('ID модуля для получения BPMN типов данных'),
});

async function handleGetDataTypes(args: { moduleId: string }) {
  try {
    const res = await rabisClient.chain.query.module({ id: args.moduleId }).get({
      dataTypes: {
        id: true,
        name: true,
        displayName: true,
        status: true,
        isPreconfigured: true,
        isSystem: true,
        properties: {
          id: true,
          displayName: true,
          name: true,
          status: true,
          properties: {
            id: true,
            key: true,
            displayName: true,
            propertyType: { propertyTypeEnum: true, displayName: true },
            readonly: true,
            required: true,
          },
        },
        bpmnProcessType: {
          bpmnXml: true,
          valid: true,
        } as any,
      },
    });

    const dataTypes = ((res as any).dataTypes || []).map((dt: any) => ({
      id: dt.id,
      name: dt.name,
      displayName: dt.displayName,
      status: dt.status,
      isPreconfigured: dt.isPreconfigured,
      isSystem: dt.isSystem,
      hasBpmnSchema: !!dt.bpmnProcessType?.bpmnXml,
      isBpmnValid: dt.bpmnProcessType?.valid ?? null,
      propertiesCount: (dt.properties || []).flatMap(
        (g: any) => g.properties || [],
      ).length,
      properties: (dt.properties || []).flatMap((g: any) =>
        (g.properties || []).map((p: any) => ({
          id: p.id,
          key: p.key,
          displayName: p.displayName,
          type: p.propertyType?.propertyTypeEnum,
          readonly: p.readonly,
        })),
      ),
    }));

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              status: 'success',
              moduleId: args.moduleId,
              totalDataTypes: dataTypes.length,
              bpmnDataTypes: dataTypes.filter((dt: any) => dt.hasBpmnSchema)
                .length,
              dataTypes,
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
            message: e?.message || 'Ошибка получения типов данных',
          }),
        },
      ],
    };
  }
}

export const getDataTypesTools = [
  defineTool(
    'bpmn_get_data_types',
    {
      title: 'Get Data Types',
      description:
        'Возвращает список всех типов данных модуля, включая BPMN типы (с флагом hasBpmnSchema). Для каждого типа: ID, name, displayName, статус, количество и типы свойств.',
      inputSchema: GetDataTypesSchema,
    },
    handleGetDataTypes,
  ),
];
