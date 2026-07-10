import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService, ModdleElement } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';

export const ConnectElementsSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (модуля/процесса)'),
  sourceId: z.string().describe('ID исходного элемента (откуда идет стрелка)'),
  targetId: z.string().describe('ID целевого элемента (куда идет стрелка)'),
  conditionName: z
    .string()
    .optional()
    .describe(
      'Имя решения/ветки (напр. "Одобрить", "На упаковке", "Больше 5")',
    ),
});

export async function handleConnectElements(
  args: z.infer<typeof ConnectElementsSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const source = bpmnXmlService.getElementById(
      state.parsed,
      args.sourceId,
    ) as ModdleElement | null;
    const target = bpmnXmlService.getElementById(
      state.parsed,
      args.targetId,
    ) as ModdleElement | null;

    if (!source)
      return errorResponse(
        `Исходный элемент "${args.sourceId}" не найден в XML`,
      );
    if (!target)
      return errorResponse(
        `Целевой элемент "${args.targetId}" не найден в XML`,
      );

    const sourceModel = state.model[args.sourceId] || {};
    const targetModel = state.model[args.targetId] || {};

    // --- 1. ОПРЕДЕЛЯЕМ ИСТИННЫЙ ИСТОЧНИК РЕШЕНИЙ (DECISIONS) С ШАГОМ НАЗАД ---
    let userTaskModel: any = null;
    let userTaskId: string | null = null;

    const sourceIsGateway = source.$type && source.$type.includes('Gateway');

    if (sourceIsGateway) {
      // Ищем входящую в шлюз стрелку, чтобы проверить, не идет ли она из UserTask с кнопками
      const incomingFlowEntry = Object.entries(state.model).find(
        ([_, entry]: [string, any]) => {
          return (
            entry.elementType === 'bpmn:SequenceFlow' &&
            entry.targetRef === args.sourceId
          );
        },
      );

      if (incomingFlowEntry) {
        const [_, parentFlow]: [string, any] = incomingFlowEntry;
        const potentialUserTask = state.model[parentFlow.sourceRef];

        if (
          potentialUserTask &&
          potentialUserTask.elementType === 'bpmn:UserTask' &&
          potentialUserTask.decisionsEnabled
        ) {
          userTaskModel = potentialUserTask;
          userTaskId = parentFlow.sourceRef;
        }
      }
    } else if (
      source.$type === 'bpmn:UserTask' &&
      sourceModel.decisionsEnabled
    ) {
      userTaskModel = sourceModel;
      userTaskId = args.sourceId;
    }

    // --- 2. ВАЛИДАЦИЯ КНОПОК-РЕШЕНИЙ (Только если шлюз привязан к решениям UserTask) ---
    let updatedDecisionsUnused: string[] = [];
    const isDecisionsContext = !!userTaskModel;

    if (isDecisionsContext) {
      // Если тянем стрелку напрямую из UserTask, заставляем идти строго в шлюз
      if (!sourceIsGateway) {
        const isTargetGateway =
          target.$type && target.$type.includes('Gateway');
        if (!isTargetGateway) {
          return errorResponse(
            `Для задачи "${userTaskId}" включен режим Decisions. Свяжите её со шлюзом (ExclusiveGateway).`,
          );
        }
      }

      const currentUnused = userTaskModel.decisionsUnused || [];
      if (!args.conditionName) {
        return errorResponse(
          `Вы распределяете ветку для шлюза решений от UserTask "${userTaskId}". Передайте параметр "conditionName" (Доступные варианты: ${JSON.stringify(currentUnused)}).`,
        );
      }

      if (!currentUnused.includes(args.conditionName)) {
        return errorResponse(
          `Решение/ветка "${args.conditionName}" не найдена или уже использована. Доступные варианты: ${JSON.stringify(currentUnused)}.`,
        );
      }

      updatedDecisionsUnused = currentUnused.filter(
        (d: string) => d !== args.conditionName,
      );
    }

    const result = bpmnXmlService.addSequenceFlow(
      state.parsed,
      args.sourceId,
      args.targetId,
    );
    if (!result) return errorResponse('Не удалось создать связь в XML');

    // АВТОМАТИЧЕСКИЙ РАСЧЕТ WAYPOINTS (Ортогональный роутинг)
    const sB = sourceModel.bpmndi?.bounds;
    const tB = targetModel.bpmndi?.bounds;

    let waypoints = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
    ];
    let labelPos: any = undefined;

    if (sB && tB) {
      const sourceCenter = { x: sB.x + sB.width / 2, y: sB.y + sB.height / 2 };
      const targetCenter = { x: tB.x + tB.width / 2, y: tB.y + tB.height / 2 };
      let calculatedWaypoints: { x: number; y: number }[] = [];

      // ПРОВЕРКА НА ПРЯМУЮ ЛИНИЮ: Если разница по высоте между центрами меньше 15 пикселей
      if (Math.abs(sourceCenter.y - targetCenter.y) < 15) {
        // Рисуем строгую прямую из 2 точек на одной высоте (высота центра источника)
        const startX = sB.x + sB.width;
        const endX = tB.x;
        const straightY = sourceCenter.y;

        calculatedWaypoints.push({ x: startX, y: straightY });
        calculatedWaypoints.push({ x: endX, y: straightY });
      } else {
        // ОРТОГОНАЛЬНЫЙ РОУТЕР для шлюзов и сложных изгибов
        if (
          Math.abs(sourceCenter.x - targetCenter.x) >
          Math.abs(sourceCenter.y - targetCenter.y)
        ) {
          const startX =
            targetCenter.x > sourceCenter.x ? sB.x + sB.width : sB.x;
          const endX = targetCenter.x > sourceCenter.x ? tB.x : tB.x + tB.width;
          const midX = startX + (endX - startX) / 2;

          calculatedWaypoints.push({ x: startX, y: sourceCenter.y });
          calculatedWaypoints.push({ x: midX, y: sourceCenter.y });
          calculatedWaypoints.push({ x: midX, y: targetCenter.y });
          calculatedWaypoints.push({ x: endX, y: targetCenter.y });
        } else {
          const startY =
            targetCenter.y > sourceCenter.y ? sB.y + sB.height : sB.y;
          const safeEndY =
            targetCenter.y > sourceCenter.y ? tB.y : tB.y + tB.height;
          const midY = startY + (safeEndY - startY) / 2;

          calculatedWaypoints.push({ x: sourceCenter.x, y: startY });
          calculatedWaypoints.push({ x: sourceCenter.x, y: midY });
          calculatedWaypoints.push({ x: targetCenter.x, y: midY });
          calculatedWaypoints.push({ x: targetCenter.x, y: safeEndY });
        }
      }

      waypoints = calculatedWaypoints;

      // Безопасный расчет позиции подписи для любого типа линии (прямой или изогнутой)
      const firstPoint = waypoints[0];
      const lastPoint = waypoints[waypoints.length - 1];

      labelPos = {
        x: firstPoint.x + (lastPoint.x - firstPoint.x) / 2 - 25,
        y: firstPoint.y - 20,
        width: args.conditionName ? args.conditionName.length * 7 : 50,
        height: 14,
      };
    }

    bpmnXmlService.addEdgeToDiagram(state.parsed, result.flowId, waypoints);

    const newModel = { ...state.model };

    newModel[result.flowId] = {
      elementType: 'bpmn:SequenceFlow',
      name: args.conditionName || '',
      require: [],
      produce: [],
      bpmndi: {
        waypoint: waypoints,
        ...(args.conditionName ? { label: labelPos } : {}),
      },
    };

    if (newModel[args.sourceId]) {
      if (sourceIsGateway) {
        const currentOutgoing = newModel[args.sourceId].outgoing;
        const outgoingArray = Array.isArray(currentOutgoing)
          ? currentOutgoing
          : currentOutgoing
            ? [currentOutgoing]
            : [];

        newModel[args.sourceId].outgoing = [...outgoingArray, result.flowId];
      } else {
        newModel[args.sourceId].outgoing = result.flowId;
      }
    }

    // Обновляем неиспользованные кнопки в UserTask
    if (isDecisionsContext && userTaskId && newModel[userTaskId]) {
      newModel[userTaskId].decisionsUnused = updatedDecisionsUnused;
    }

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success)
      return errorResponse(saveResult.error || 'Ошибка сохранения');

    return successResponse({
      flowId: result.flowId,
      source: args.sourceId,
      target: args.targetId,
      message: `Связь успешно создана. Линия названа: "${args.conditionName || 'без имени'}".`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Внутренняя ошибка создания связи');
  }
}

export const connectElementsTools = [
  defineTool(
    'bpmn_connect_elements',
    {
      title: 'Connect BPMN Elements',
      description:
        'Создаёт SequenceFlow между двумя BPMN элементами. Для условий используй формат ${gatewayId==numericId} (напр. ${Gateway_1==2}). Для лейблов на стрелках используй conditionName.',
      inputSchema: ConnectElementsSchema,
    },
    handleConnectElements,
  ),
];
