import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService, ModdleElement } from '../services/bpmn-xml.service.js';
import { checkConstraint } from '../services/constraint-utils.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';

const DeleteElementSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementId: z.string().describe('ID элемента для удаления'),
  confirm: z
    .literal(true)
    .describe('Подтверждение удаления (обязательно true)'),
});

export async function handleDeleteElement(
  args: z.infer<typeof DeleteElementSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const element = bpmnXmlService.getElementById(
      state.parsed,
      args.elementId,
    ) as ModdleElement | null;
    if (!element) {
      return errorResponse(`Элемент "${args.elementId}" не найден в BPMN XML`);
    }

    const constraint = checkConstraint(
      'delete',
      element,
      state.model[args.elementId] || {},
      state,
    );

    if (!constraint.allowed) {
      return errorResponse(`Удаление запрещено: ${constraint.reason}`);
    }

    const incomingFlows = [
      ...(element.get('incoming') || []),
    ] as ModdleElement[];
    const outgoingFlows = [
      ...(element.get('outgoing') || []),
    ] as ModdleElement[];
    const allRelatedFlows = [...incomingFlows, ...outgoingFlows];

    const newModel = { ...state.model };

    if (element.$type.includes('Gateway')) {
      const incomingFlowsToGateway = Object.values(state.model).filter(
        (entry: any) =>
          entry.elementType === 'bpmn:SequenceFlow' &&
          entry.targetRef === args.elementId,
      );

      for (const incomingFlow of incomingFlowsToGateway) {
        const parentUserTaskId = incomingFlow.sourceRef;
        const userTask = newModel[parentUserTaskId];

        if (
          userTask &&
          userTask.elementType === 'bpmn:UserTask' &&
          userTask.decisionsEnabled
        ) {
          const currentUnused = userTask.decisionsUnused || [];
          const restoredDecisions: string[] = [];

          outgoingFlows.forEach((flow) => {
            const flowDecor = state.model[flow.id];
            if (flowDecor && flowDecor.name) {
              restoredDecisions.push(flowDecor.name);
            }
          });

          if (restoredDecisions.length > 0) {
            newModel[parentUserTaskId] = {
              ...userTask,
              decisionsUnused: [...currentUnused, ...restoredDecisions],
            };
          }
        }
      }
    }
    for (const flow of allRelatedFlows) {
      bpmnXmlService.deleteElement(state.parsed, flow.id);
      delete newModel[flow.id];
    }

    const deleted = bpmnXmlService.deleteElement(state.parsed, args.elementId);
    if (!deleted) {
      return errorResponse(
        'Не удалось удалить базовый элемент на уровне XML (возможно, это системный защищенный узел)',
      );
    }

    delete newModel[args.elementId];

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return errorResponse(
        saveResult.error || 'Ошибка при сохранении изменений после удаления',
      );
    }

    return successResponse({
      elementId: args.elementId,
      elementType: element.$type,
      message: `Элемент "${args.elementId}" (${element.$type}) и все его связанные линии связи (${allRelatedFlows.length} шт.) успешно удалены каскадно. Граф процесса очищен.`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка при удалении элемента',
    );
  }
}

export const deleteElementTools = [
  defineTool(
    'bpmn_delete_element',
    {
      title: 'Delete BPMN Element',
      description:
        'Удаляет BPMN элемент и все связанные SequenceFlow. Требуется подтверждение (confirm: true). Проверяет constraints перед удалением. StartEvent и EndEvent нельзя удалять.',
      inputSchema: DeleteElementSchema,
    },
    handleDeleteElement,
  ),
];
