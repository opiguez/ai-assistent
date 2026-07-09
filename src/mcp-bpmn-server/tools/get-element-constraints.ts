import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService, ModdleElement } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { checkConstraint } from '../services/constraint-utils.js';
import { errorResponse, successResponse } from './add-element/shared.js';

const GetElementConstraintsSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (модуля/процесса)'),
  elementId: z
    .string()
    .describe('ID элемента на схеме, который нужно проверить'),
  operation: z
    .enum([
      'delete',
      'connect',
      'changeType',
      'addBoundaryEvent',
      'directEdit',
      'addDecision',
      'addGatewayStructure', // ИСПРАВЛЕНО: заменили addRdmStructure на addGatewayStructure
    ])
    .describe(
      'Тип операции, валидность которой нужно проверить перед выполнением',
    ),
});

export async function handleGetElementConstraints(
  args: z.infer<typeof GetElementConstraintsSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);
    const element = bpmnXmlService.getElementById(
      state.parsed,
      args.elementId,
    ) as ModdleElement | null;

    if (!element) {
      return errorResponse(
        `Элемент с ID "${args.elementId}" не найден в BPMN XML`,
      );
    }

    const modelProps = state.model[args.elementId] || {};
    const result = checkConstraint(args.operation, element, modelProps, state);

    return successResponse({
      elementId: args.elementId,
      elementType: element.$type,
      operation: args.operation,
      allowed: result.allowed,
      reason: result.reason || null,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка проверки ограничений элемента',
    );
  }
}

export const getElementConstraintsTools = [
  defineTool(
    'bpmn_get_element_constraints',
    {
      title: 'Get Element Constraints',
      description: `Проверяет, разрешено ли выполнять конкретное действие с элементом по правилам Low-Code платформы.
      Рекомендуется вызывать этот инструмент ПЕРЕД удалением элементов, созданием связей или изменением структуры шлюзов.
      Это убережет вас от совершения запрещенных операций, которые бэкенд все равно отклонит при сохранении.
      В параметре operation передавайте тип планируемого действия (напр., 'delete', 'connect', 'addGatewayStructure').`,
      inputSchema: GetElementConstraintsSchema,
    },
    handleGetElementConstraints,
  ),
];
