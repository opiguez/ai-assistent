import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';

export const GetProcessTopologySchema = z.object({
  dataTypeId: z
    .string()
    .describe(
      'ID BPMN типа данных (модуля/процесса) для анализа топологии графа',
    ),
});

export async function handleGetProcessTopology(
  args: z.infer<typeof GetProcessTopologySchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);
    const elements = bpmnXmlService.extractElements(state.parsed);
    const connections = bpmnXmlService.extractConnections(state.parsed);

    // Строим списки смежности графа
    const adjList: Record<string, string[]> = {};
    const inDegree: Record<string, number> = {};
    const outDegree: Record<string, number> = {};

    for (const el of elements) {
      adjList[el.id] = [];
      inDegree[el.id] = 0;
      outDegree[el.id] = 0;
    }

    for (const conn of connections) {
      if (adjList[conn.source]) {
        adjList[conn.source].push(conn.target);
      }
      outDegree[conn.source] = (outDegree[conn.source] || 0) + 1;
      inDegree[conn.target] = (inDegree[conn.target] || 0) + 1;
    }

    // Безопасный BFS для определения уровней/слоев (без риска бесконечного цикла при петлях)
    const levels: Record<string, number> = {};
    const queue: string[] = [];
    const bfsVisited = new Set<string>();

    const startEvents = elements.filter((el) => el.type === 'bpmn:StartEvent');
    const endEvents = elements.filter((el) => el.type === 'bpmn:EndEvent');

    // Находим Start Events как корни графа
    for (const el of elements) {
      if (el.type === 'bpmn:StartEvent' || inDegree[el.id] === 0) {
        levels[el.id] = 0;
        queue.push(el.id);
        bfsVisited.add(el.id);
      }
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      for (const neighbor of adjList[current] || []) {
        // Гарантируем, что уровень рассчитывается только один раз,
        // предотвращая зацикливание при обратных легальных стрелках в BPMN
        if (levels[neighbor] === undefined) {
          levels[neighbor] = levels[current] + 1;
          if (!bfsVisited.has(neighbor)) {
            bfsVisited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
    }

    // Собираем ноды графа для ИИ (исключая системный корневой тег bpmn:Process)
    const nodes = elements
      .filter((el) => el.type !== 'bpmn:Process')
      .map((el) => ({
        id: el.id,
        type: el.type,
        name: state.model[el.id]?.name || el.name || null,
        inDegree: inDegree[el.id] || 0,
        outDegree: outDegree[el.id] || 0,
        level: levels[el.id] ?? -1,
      }));

    const edges = connections.map((conn) => ({
      source: conn.source,
      target: conn.target,
      type: conn.type,
      condition: conn.conditionExpression || null,
    }));

    // Безопасный поиск уникальных путей (с жестким прерыванием петель)
    const allPaths: string[][] = [];
    for (const start of startEvents) {
      findPaths(start.id, endEvents, adjList, [], new Set(), allPaths);
    }

    // Проверяем наличие петель (обратных связей в процессе)
    const hasLoops = detectLoops(adjList);

    // Мёртвые концы (Элементы, которые ЗАВИСНУТ, так как из них нет выхода и это НЕ единственный EndEvent!)
    const deadEnds = elements
      .filter(
        (el) =>
          el.type !== 'bpmn:Process' &&
          el.type !== 'bpmn:EndEvent' &&
          (!el.outgoing || el.outgoing.length === 0),
      )
      .map((el) => el.id);

    // Недостижимые (изолированные) элементы схемы
    const unreachable = elements
      .filter(
        (el) =>
          el.type !== 'bpmn:Process' &&
          el.type !== 'bpmn:StartEvent' &&
          !bfsVisited.has(el.id), // Используем уже собранный BFS сет посещенных нод
      )
      .map((el) => el.id);

    // Максимальная глубина графа
    const maxDepth = Math.max(...Object.values(levels).map((l) => l ?? 0), 0);

    // Возвращаем ИИ чистый, компактный математический отчет по графу
    return successResponse({
      dataTypeId: args.dataTypeId,
      nodes,
      edges,
      analysis: {
        hasLoops,
        totalPaths: allPaths.length,
        hasDeadEnds: deadEnds.length > 0,
        deadEnds, // Список ID элементов, откуда процессу некуда идти дальше
        hasUnreachable: unreachable.length > 0,
        unreachable, // Список изолированных элементов, до которых нельзя дойти от Старта
        maxDepth,
        startEventsCount: startEvents.length,
        endEventsCount: endEvents.length,
        parallelBranches: nodes.filter((n) => n.outDegree > 1).length,
        decisionBranches: nodes.filter(
          (n) => n.type === 'bpmn:ExclusiveGateway' && n.outDegree > 1,
        ).length,
      },
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка анализа топологии графа',
    );
  }
}

// ====================================================================
// ВНУТРЕННИЕ АЛГОРИТМИЧЕСКИЕ ХЕЛПЕРЫ МАТЕМАТИКИ ГРАФОВ
// ====================================================================

function findPaths(
  current: string,
  endEvents: any[],
  adjList: Record<string, string[]>,
  path: string[],
  visited: Set<string>,
  allPaths: string[][],
) {
  // Нашли петлю обратной связи внутри текущей ветки —
  // немедленно выходим, чтобы не повесить сервер бесконечным бэктрекингом
  if (visited.has(current)) return;

  visited.add(current);
  path.push(current);

  const isEnd = endEvents.some((e) => e.id === current);
  if (isEnd) {
    allPaths.push([...path]);
  }

  // Ограничиваем максимальную длину трассировки (защита от сверхсложных графов)
  if (path.length < 100) {
    for (const neighbor of adjList[current] || []) {
      findPaths(neighbor, endEvents, adjList, path, visited, allPaths);
    }
  }

  path.pop();
  visited.delete(current);
}

function detectLoops(adjList: Record<string, string[]>): boolean {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function dfs(node: string): boolean {
    visited.add(node);
    recursionStack.add(node);

    for (const neighbor of adjList[node] || []) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recursionStack.has(neighbor)) {
        return true;
      }
    }

    recursionStack.delete(node);
    return false;
  }

  for (const node of Object.keys(adjList)) {
    if (!visited.has(node)) {
      if (dfs(node)) return true;
    }
  }

  return false;
}

export const getProcessTopologyTools = [
  defineTool(
    'bpmn_get_process_topology',
    {
      title: 'Get Process Topology',
      description: `Выполняет глубокий математический и логический анализ графа BPMN-схемы.
Обязательно вызывайте этот инструмент после построения цепочек элементов или связок, чтобы провести валидацию графа.
Инструмент возвращает: расчет полустепеней исхода/захода, BFS-уровни нод, информацию о наличии петель/обратных связей (hasLoops),
а также списки критических ошибок схемы: недостижимые изолированные элементы (unreachable) и тупиковые узлы, из которых процессу некуда идти дальше (deadEnds).`,
      inputSchema: GetProcessTopologySchema,
    },
    handleGetProcessTopology,
  ),
];
