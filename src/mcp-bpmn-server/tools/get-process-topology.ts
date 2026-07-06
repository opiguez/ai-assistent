import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';

const GetProcessTopologySchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
});

async function handleGetProcessTopology(args: { dataTypeId: string }) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);
    const elements = bpmnXmlService.extractElements(state.parsed);
    const connections = bpmnXmlService.extractConnections(state.parsed);

    // Строим граф
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

    // BFS для определения уровней
    const levels: Record<string, number> = {};
    const queue: string[] = [];

    // Находим Start Events как корни
    for (const el of elements) {
      if (el.type === 'bpmn:StartEvent' || inDegree[el.id] === 0) {
        levels[el.id] = 0;
        queue.push(el.id);
      }
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      for (const neighbor of adjList[current] || []) {
        if (levels[neighbor] === undefined || levels[neighbor] <= levels[current]) {
          levels[neighbor] = levels[current] + 1;
          queue.push(neighbor);
        }
      }
    }

    // Определяем корневой элемент (Process)
    const processElement = elements.find((el) => el.type === 'bpmn:Process');

    // Нода для графа
    const nodes = elements
      .filter((el) => el.type !== 'bpmn:Process')
      .map((el) => ({
        id: el.id,
        type: el.type,
        name: state.model[el.id]?.name || el.name,
        inDegree: inDegree[el.id] || 0,
        outDegree: outDegree[el.id] || 0,
        level: levels[el.id] ?? -1,
      }));

    const edges = connections.map((conn) => ({
      source: conn.source,
      target: conn.target,
      type: conn.type,
      condition: conn.conditionExpression,
    }));

    // Анализ: найдём все пути от Start до End
    const startEvents = elements.filter((el) => el.type === 'bpmn:StartEvent');
    const endEvents = elements.filter((el) => el.type === 'bpmn:EndEvent');

    const allPaths: string[][] = [];
    for (const start of startEvents) {
      findPaths(start.id, endEvents, adjList, [], new Set(), allPaths);
    }

    // Проверяем наличие петель
    const hasLoops = detectLoops(adjList);

    // Мёртвые концы (End Events без outgoing)
    const deadEnds = elements
      .filter(
        (el) =>
          el.type === 'bpmn:EndEvent' ||
          (el.outgoing.length === 0 &&
            el.type !== 'bpmn:Process' &&
            el.type !== 'bpmn:EndEvent'),
      )
      .map((el) => el.id);

    // Недостижимые элементы
    const reachable = new Set<string>();
    for (const start of startEvents) {
      bfs(start.id, adjList, reachable);
    }
    const unreachable = elements
      .filter(
        (el) =>
          el.type !== 'bpmn:Process' &&
          !reachable.has(el.id) &&
          el.type !== 'bpmn:StartEvent',
      )
      .map((el) => el.id);

    // Максимальная глубина
    const maxDepth = Math.max(...Object.values(levels).map((l) => l ?? 0), 0);

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              status: 'success',
              dataTypeId: args.dataTypeId,
              nodes,
              edges,
              analysis: {
                hasLoops,
                totalPaths: allPaths.length,
                hasDeadEnds: deadEnds.length > 0,
                deadEnds,
                hasUnreachable: unreachable.length > 0,
                unreachable,
                maxDepth,
                startEvents: startEvents.length,
                endEvents: endEvents.length,
                parallelBranches: nodes.filter((n) => n.outDegree > 1).length,
                decisionBranches: nodes.filter(
                  (n) =>
                    n.type === 'bpmn:ExclusiveGateway' && n.outDegree > 1,
                ).length,
              },
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
            message: e?.message || 'Ошибка анализа топологии',
          }),
        },
      ],
    };
  }
}

function findPaths(
  current: string,
  endEvents: any[],
  adjList: Record<string, string[]>,
  path: string[],
  visited: Set<string>,
  allPaths: string[][],
) {
  if (visited.has(current)) return;
  visited.add(current);
  path.push(current);

  const isEnd = endEvents.some((e) => e.id === current);
  if (isEnd) {
    allPaths.push([...path]);
  }

  for (const neighbor of adjList[current] || []) {
    findPaths(neighbor, endEvents, adjList, path, visited, allPaths);
  }

  path.pop();
  visited.delete(current);
}

function bfs(
  start: string,
  adjList: Record<string, string[]>,
  reachable: Set<string>,
) {
  const queue = [start];
  reachable.add(start);

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const neighbor of adjList[current] || []) {
      if (!reachable.has(neighbor)) {
        reachable.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
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
      description:
        'Графовый анализ BPMN процесса: ноды с уровнями, рёбра, пути от Start до End, обнаружение петель, мёртвых концов, недостижимых элементов, максимальная глубина, количество параллельных и decision ветвлений.',
      inputSchema: GetProcessTopologySchema,
    },
    handleGetProcessTopology,
  ),
];
