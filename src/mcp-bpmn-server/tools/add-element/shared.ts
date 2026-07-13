export const ELEMENT_SIZES: Record<string, { width: number; height: number }> =
  {
    'bpmn:StartEvent': { width: 36, height: 36 },
    'bpmn:EndEvent': { width: 36, height: 36 },
    'bpmn:IntermediateThrowEvent': { width: 36, height: 36 },
    'bpmn:IntermediateCatchEvent': { width: 36, height: 36 },
    'bpmn:BoundaryEvent': { width: 36, height: 36 },
    'bpmn:ExclusiveGateway': { width: 50, height: 50 },
    'bpmn:InclusiveGateway': { width: 50, height: 50 },
    'bpmn:UserTask': { width: 100, height: 80 },
    'bpmn:ServiceTask': { width: 100, height: 80 },
    'bpmn:SendTask': { width: 100, height: 80 },
    'bpmn:ScriptTask': { width: 100, height: 80 },
    'bpmn:SubProcess': { width: 300, height: 200 },
  };

export function generateTaskName(
  model: Record<string, Record<string, any>>,
): string {
  let maxNum = 0;
  for (const entry of Object.values(model)) {
    if (entry?.name && /^Элемент \d+$/.test(entry.name)) {
      const num = parseInt(entry.name.match(/\d+/)?.[0] || '0', 10);
      if (num > maxNum) maxNum = num;
    }
  }
  return `Элемент ${maxNum + 1}`;
}

function snap(val: number): number {
  return Math.round(val / 10) * 10;
}

function getMainCenterY(
  allBounds: { x: number; y: number; width: number; height: number }[],
): number {
  if (allBounds.length === 0) return 200;
  const leftmost = allBounds.reduce((min, b) => (b.x < min.x ? b : min));
  return leftmost.y + leftmost.height / 2;
}

export function calculatePosition(
  model: Record<string, Record<string, any>>,
  elementType: string,
  attachedToRef?: string,
  position?: 'main' | 'branch',
): { x: number; y: number } {
  if (
    elementType === 'bpmn:BoundaryEvent' &&
    attachedToRef &&
    model[attachedToRef]?.bpmndi?.bounds
  ) {
    const p = model[attachedToRef].bpmndi.bounds;
    return { x: snap(p.x + p.width - 18), y: snap(p.y + p.height - 6) };
  }

  const size = ELEMENT_SIZES[elementType];

  const BASE_GAP = 120;
  const START_X = 100;
  const ROW_HEIGHT = 150;

  const allBounds = Object.values(model)
    .filter((e) => e?.bpmndi?.bounds)
    .map((e) => e.bpmndi.bounds);

  const mainCenterY = getMainCenterY(allBounds);

  if (allBounds.length === 0) {
    return {
      x: START_X,
      y: snap(mainCenterY - size.height / 2),
    };
  }

  // Явный запрос: main — центр Y, branch — колонка от правого gateway
  if (position === 'main') {
    const maxX = Math.max(...allBounds.map((b) => b.x + b.width));
    return {
      x: snap(maxX + BASE_GAP),
      y: snap(mainCenterY - size.height / 2),
    };
  }

  if (position === 'branch') {
    const mainRowGateways = Object.entries(model)
      .filter(([_, e]: [string, any]) =>
        e?.elementType?.includes('Gateway') &&
        e?.bpmndi?.bounds &&
        Math.abs(e.bpmndi.bounds.y + e.bpmndi.bounds.height / 2 - mainCenterY) < ROW_HEIGHT / 2
      )
      .map(([id, e]: [string, any]) => ({ id, bounds: e.bpmndi.bounds }))
      .sort((a, b) => b.bounds.x + b.bounds.width - a.bounds.x - a.bounds.width);

    if (mainRowGateways.length > 0) {
      const gw = mainRowGateways[0];
      const columnX = snap(gw.bounds.x + gw.bounds.width + BASE_GAP);
      const centerY = snap(mainCenterY - size.height / 2);
      const ySet = new Set(
        allBounds
          .filter((b) => Math.abs(b.x + b.width / 2 - columnX) < 60)
          .map((b) => snap(b.y)),
      );
      ySet.add(centerY);
      const firstUp = snap(centerY - ROW_HEIGHT);
      if (!ySet.has(firstUp)) return { x: columnX, y: firstUp };
      const firstDown = snap(centerY + ROW_HEIGHT);
      if (!ySet.has(firstDown)) return { x: columnX, y: firstDown };
      let rowIndex = 2;
      while (true) {
        const upper = snap(centerY - rowIndex * ROW_HEIGHT);
        const lower = snap(centerY + rowIndex * ROW_HEIGHT);
        if (!ySet.has(upper)) return { x: columnX, y: upper };
        if (!ySet.has(lower)) return { x: columnX, y: lower };
        rowIndex++;
      }
    }
  }

  // EndEvent — всегда в центр Y
  if (elementType === 'bpmn:EndEvent') {
    const maxX = Math.max(...allBounds.map((b) => b.x + b.width));
    return {
      x: snap(maxX + BASE_GAP),
      y: snap(mainCenterY - size.height / 2),
    };
  }

  // Gateway — всегда в центр Y
  if (elementType.includes('Gateway')) {
    const maxX = Math.max(...allBounds.map((b) => b.x + b.width));
    return {
      x: snap(maxX + BASE_GAP),
      y: snap(mainCenterY - size.height / 2),
    };
  }

  // Анализ Gateways: считаем входящие SequenceFlow для каждого
  const mainRowY = mainCenterY;
  const gatewayWithIncoming = Object.values(model).filter(
    (e: any) =>
      e?.elementType?.includes('Gateway') &&
      e?.bpmndi?.bounds &&
      Math.abs(e.bpmndi.bounds.y + e.bpmndi.bounds.height / 2 - mainRowY) < ROW_HEIGHT / 2,
  );

  // Считаем входящие стрелки для каждого gateway
  const gwWithIncomingCount = gatewayWithIncoming.map((gw: any) => {
    const gwId =
      Object.entries(model).find(
        ([_, e]: [string, any]) => e?.bpmndi?.bounds?.x === gw.bpmndi.bounds.x && e?.bpmndi?.bounds?.y === gw.bpmndi.bounds.y,
      )?.[0] || '';
    const incoming = Object.values(model).filter(
      (f: any) => f.elementType === 'bpmn:SequenceFlow' && f.targetRef === gwId,
    ).length;
    return { gw, id: gwId, incoming };
  });

  // Самый правый gateway на главном ряду с входящими связями
  const rightmost = gwWithIncomingCount
    .filter((g) => g.incoming >= 1)
    .sort(
      (a, b) =>
        b.gw.bpmndi.bounds.x +
        b.gw.bpmndi.bounds.width -
        (a.gw.bpmndi.bounds.x + a.gw.bpmndi.bounds.width),
    )[0];

  if (rightmost) {
    // Колонка: все ветки на X = gateway.right + gap
    const columnX = snap(
      rightmost.gw.bpmndi.bounds.x +
        rightmost.gw.bpmndi.bounds.width +
        BASE_GAP,
    );
    const centerY = snap(mainCenterY - size.height / 2);

    const ySet = new Set(
      allBounds
        .filter((b) => Math.abs(b.x + b.width / 2 - columnX) < 60)
        .map((b) => snap(b.y)),
    );
    ySet.add(centerY);

    const firstUp = snap(centerY - ROW_HEIGHT);
    if (!ySet.has(firstUp)) {
      return { x: columnX, y: firstUp };
    }
    const firstDown = snap(centerY + ROW_HEIGHT);
    if (!ySet.has(firstDown)) {
      return { x: columnX, y: firstDown };
    }
    let rowIndex = 2;
    while (true) {
      const upper = snap(centerY - rowIndex * ROW_HEIGHT);
      const lower = snap(centerY + rowIndex * ROW_HEIGHT);
      if (!ySet.has(upper)) return { x: columnX, y: upper };
      if (!ySet.has(lower)) return { x: columnX, y: lower };
      rowIndex++;
    }
  }

  // Последовательный ряд (центр Y)
  const maxX = Math.max(...allBounds.map((b) => b.x + b.width));
  return {
    x: snap(maxX + BASE_GAP),
    y: snap(mainCenterY - size.height / 2),
  };
}

export function handleAssignee(
  assignee: { type: string; value?: string },
  moduleName: string,
): { require: string[]; attrs: Record<string, string> } {
  switch (assignee.type) {
    case 'owner': {
      const name = `${moduleName}:common:_owner`;
      const techName = `${moduleName}__common__owner`;
      return {
        require: [name],
        attrs: {
          'camunda:candidateUsers': `\${S(${techName}).prop('login').stringValue()}`,
        },
      };
    }
    case 'user':
      return {
        require: [],
        attrs: { 'camunda:candidateUsers': assignee.value || '' },
      };
    case 'group':
      return {
        require: [],
        attrs: { 'camunda:candidateGroups': assignee.value || '' },
      };
    case 'variable': {
      const name = assignee.value || '';
      const techName = name.replace(/[:\-]/g, '_');
      return {
        require: [name],
        attrs: {
          'camunda:candidateUsers': `\${S(${techName}).prop('login').stringValue()}`,
        },
      };
    }
    default:
      return { require: [], attrs: {} };
  }
}

export function createModelEntry(
  elementId: string, // Оставим для совместимости или логирования
  elementType: string,
  name: string,
  x: number,
  y: number,
  width: number,
  height: number,
): Record<string, any> {
  return {
    elementType,
    name: name || '',
    bpmndi: {
      bounds: { x, y, width, height },
    },
  };
}

export function successResponse(data: Record<string, any>) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({ status: 'success', ...data }),
      },
    ],
  };
}

export function errorResponse(message: string) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({ status: 'error', message }),
      },
    ],
  };
}

export function routingResponse(targetTool: string, instructions: string) {
  return {
    isError: false,
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(
          {
            status: 'redirect',
            suggestedTool: targetTool,
            message: `Этот тип элемента требует специальной конфигурации. Пожалуйста, прекратите выполнение текущего шага и вызовите инструмент "${targetTool}".`,
            details: instructions,
          },
          null,
          2,
        ),
      },
    ],
  };
}
