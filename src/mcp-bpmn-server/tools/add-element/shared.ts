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

  const size = ELEMENT_SIZES[elementType];

  const BASE_GAP = 120; // Хороший просторный отступ
  const START_X = 100; // Начало холста
  const CANVAS_CENTER_Y = 200; // Единая горизонтальная линия центра холста

  const allBounds = Object.values(model)
    .filter((e) => e?.bpmndi?.bounds)
    .map((e) => e.bpmndi.bounds);

  //Если холст пустой, ставим первый элемент (StartEvent) по центру
  if (allBounds.length === 0) {
    return {
      x: START_X,
      y: snap(CANVAS_CENTER_Y - size.height / 2),
    };
  }

  // БЕСКОНЕЧНЫЙ ХОЛСТ: Ищем самый правый край среди ВСЕХ элементов и шагаем вправо
  const maxX = Math.max(...allBounds.map((b) => b.x + b.width));
  const newX = maxX + BASE_GAP;

  // Расчет Y: сначала находим идеальный верхний край,
  // а затем округляем его так, чтобы центр остался максимально близко к оси
  const idealY = CANVAS_CENTER_Y - size.height / 2;
  const newY = snap(idealY);

  return {
    x: snap(newX),
    y: newY,
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
