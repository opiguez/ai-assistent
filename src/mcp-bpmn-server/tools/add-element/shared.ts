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

export function calculatePosition(
  model: Record<string, Record<string, any>>,
  elementType: string,
  attachedToRef?: string,
): { x: number; y: number } {
  if (
    elementType === 'bpmn:BoundaryEvent' &&
    attachedToRef &&
    model[attachedToRef]?.bpmndi?.bounds
  ) {
    const p = model[attachedToRef].bpmndi.bounds;
    return { x: snap(p.x + p.width - 18), y: snap(p.y + p.height - 6) };
  }

  const size = ELEMENT_SIZES[elementType] || { width: 100, height: 80 };
  const GAP_X = 100;
  const GAP_Y = 120;
  const MAX_X = 900;
  const START_X = 100;

  const allBounds = Object.values(model)
    .filter((e) => e?.bpmndi?.bounds)
    .map((e) => e.bpmndi.bounds);

  if (allBounds.length === 0) {
    return { x: START_X, y: 150 };
  }

  const ROW_TOLERANCE = 40;
  const sorted = [...allBounds].sort((a, b) => a.y - b.y);
  const rows: Array<{ centerY: number; maxX: number; maxY: number }> = [];

  for (const b of sorted) {
    const cy = b.y + b.height / 2;
    let found = false;
    for (const row of rows) {
      if (Math.abs(cy - row.centerY) < ROW_TOLERANCE) {
        row.maxX = Math.max(row.maxX, b.x + b.width);
        row.maxY = Math.max(row.maxY, b.y + b.height);
        row.centerY = (row.centerY + cy) / 2;
        found = true;
        break;
      }
    }
    if (!found) {
      rows.push({ centerY: cy, maxX: b.x + b.width, maxY: b.y + b.height });
    }
  }

  const lastRow = rows[rows.length - 1];
  const newX = lastRow.maxX + GAP_X;

  if (newX + size.width <= MAX_X) {
    return {
      x: snap(newX),
      y: snap(lastRow.centerY - size.height / 2),
    };
  } else {
    return {
      x: START_X,
      y: snap(lastRow.maxY + GAP_Y),
    };
  }
}

export function handleAssignee(
  assignee: { type: string; value?: string },
  moduleName: string,
): { require: string[]; attrs: Record<string, string> } {
  switch (assignee.type) {
    case 'owner': {
      const name = `${moduleName}:common:_owner`;
      const techName = name.replace(/[:\-]/g, '_');
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
  elementId: string,
  elementType: string,
  name: string,
  x: number,
  y: number,
  width: number,
  height: number,
  dataTypeId?: string,
): Record<string, any> {
  const entry: Record<string, any> = {
    bpmndi: { bounds: { x, y, width, height } },
    name: name || '',
  };

  if (
    elementType === 'bpmn:UserTask' ||
    elementType === 'bpmn:ServiceTask' ||
    elementType === 'bpmn:SendTask' ||
    elementType === 'bpmn:ScriptTask'
  ) {
    entry.require = [];
    entry.produce = [];
    entry.notificateCreator = false;
    entry.notificateAssignee = false;
    entry.outgoing = null;

    if (elementType === 'bpmn:UserTask' && dataTypeId) {
      entry.views = {
        navigateView: null,
        editView: null,
        childTableView: null,
        cardView: null,
        tileView: null,
        calendarView: null,
      };
    }
  }

  if (elementType === 'bpmn:SubProcess') {
    entry.isExpanded = true;
  }

  return entry;
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
