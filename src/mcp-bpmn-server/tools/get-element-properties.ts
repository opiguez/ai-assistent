import { z } from 'zod';
import {
  BpmnProcessState,
  bpmnSchemaService,
} from '../services/bpmn-schema.service.js';
import { bpmnXmlService, ModdleElement } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { checkAllConstraints } from '../services/constraint-utils.js';
import { errorResponse, successResponse } from './add-element/shared.js';

export const GetElementPropertiesSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (модуля/процесса)'),
  elementId: z
    .string()
    .describe('ID элемента BPMN на схеме для чтения свойств'),
});

export async function handleGetElementProperties(
  args: z.infer<typeof GetElementPropertiesSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const element = bpmnXmlService.getElementById(
      state.parsed,
      args.elementId,
    ) as ModdleElement | null;

    if (!element) {
      return errorResponse(
        `Элемент с ID "${args.elementId}" не найден в XML схеме процесса`,
      );
    }

    const modelProps = state.model[args.elementId] || {};

    const panelComponent = determinePanelComponent(element, modelProps, state);

    const constraintResults = checkAllConstraints(element, modelProps, state);
    const constraints = {
      canDelete: constraintResults.delete.allowed,
      canChangeType: constraintResults.changeType.allowed,
      canAddConnections: constraintResults.connect.allowed,
      canAttachBoundaryEvents: constraintResults.addBoundaryEvent.allowed,
      canEditDirectly: constraintResults.directEdit.allowed,
    };

    return successResponse({
      elementId: args.elementId,
      bpmn: {
        id: element.id,
        type: element.$type,
        name: element.name || null,
        documentation: getDocumentation(element),
        incoming: (element.get('incoming') || []).map((sf: any) => ({
          id: sf.id,
          name: sf.name || null,
        })),
        outgoing: (element.get('outgoing') || []).map((sf: any) => ({
          id: sf.id,
          name: sf.name || null,
        })),
        eventDefinitions: getEventDefinitions(element),
        conditionExpression: getConditionExpression(element),
        extensionElements: getExtensionElementsSummary(element),
        taskProperties: getTaskProperties(element),
      },
      customProperties: modelProps,
      panelComponent,
      constraints,
      availableProperties: Object.keys(modelProps),
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка при получении свойств элемента',
    );
  }
}

// ====================================================================
// УТИЛИТЫ И ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ МАППИНГА XML СВОЙСТВ
// ====================================================================
function determinePanelComponent(
  element: ModdleElement,
  modelProps: Record<string, any>,
  state: BpmnProcessState,
) {
  const type = element.$type;

  if (type === 'bpmn:TextAnnotation') return 'TEXT_ANNOTATION';

  if (
    modelProps.isDearchiveEvent ||
    modelProps.isCancelEvent ||
    modelProps.isDeleteEvent
  ) {
    return 'DEARCHIVE_EVENT';
  }

  if (type === 'bpmn:SequenceFlow') {
    const source = element.get('sourceRef');
    if (source) {
      const sourceModelProps = state.model[source.id] || {};

      if (sourceModelProps.DataTypeProperty === 'rdmStructure')
        return 'RDM_STRUCTURE_FLOW';
      if (sourceModelProps.DataTypeProperty === 'realNumber')
        return 'REAL_NUMBER_FLOW';
    }
    return 'NAME';
  }

  if (type === 'bpmn:ExclusiveGateway' || type === 'bpmn:InclusiveGateway') {
    if (modelProps.DataTypeProperty === 'rdmStructure')
      return 'RDM_STRUCTURE_GATEWAY';
    if (modelProps.DataTypeProperty === 'realNumber')
      return 'REAL_NUMBER_GATEWAY';
  }

  return 'NAME';
}

function getDocumentation(element: ModdleElement): string | undefined {
  const doc = element.get('documentation');
  if (doc && doc.length > 0) {
    return doc[0].get('text');
  }
  return undefined;
}

function getEventDefinitions(element: ModdleElement): any[] {
  const eds = element.get('eventDefinitions') || [];
  return eds.map((ed: any) => ({
    type: ed.$type,
    ...(ed.$type === 'bpmn:MessageEventDefinition' && ed.messageRef
      ? { messageRef: ed.messageRef.id }
      : {}),
    ...(ed.$type === 'bpmn:TimerEventDefinition' && ed.timeDuration
      ? { timeDuration: ed.timeDuration.body }
      : {}),
  }));
}

function getConditionExpression(element: ModdleElement): string | undefined {
  const ce = element.get('conditionExpression');
  return ce?.body;
}

function getExtensionElementsSummary(
  element: ModdleElement,
): Record<string, any> | undefined {
  const ext = element.get('extensionElements');
  if (!ext) return undefined;

  const values = ext.get('values') || [];
  if (values.length === 0) return undefined;

  const result: Record<string, any> = {};
  for (const val of values) {
    result[val.$type] = true;
  }
  return result;
}

function getTaskProperties(
  element: ModdleElement,
): Record<string, any> | undefined {
  const type = element.$type;
  const props: Record<string, any> = {};

  if (type === 'bpmn:ServiceTask') {
    const camundaType = element.get('camunda:type');
    const camundaTopic = element.get('camunda:topic');
    if (camundaType) props.type = camundaType;
    if (camundaTopic) props.topic = camundaTopic;

    // Пытаемся вытянуть Input/Output параметры из ExtensionElements, чтобы ИИ видел targetModule и targetMethod!
    const ext = element.get('extensionElements');
    if (ext) {
      const io = (ext.get('values') || []).find(
        (v: any) => v.$type === 'camunda:InputOutput',
      );
      if (io && io.inputParameters) {
        io.inputParameters.forEach((ip: any) => {
          props[ip.name] = ip.value; // Выведет {"targetModule": "...", "targetMethod": "..."}
        });
      }
    }
  }

  if (type === 'bpmn:SendTask') {
    const camundaType = element.get('camunda:type');
    const camundaTopic = element.get('camunda:topic');
    if (camundaType) props.type = camundaType;
    if (camundaTopic) props.topic = camundaTopic;
  }

  if (type === 'bpmn:ScriptTask') {
    if (element.get('scriptFormat'))
      props.scriptFormat = element.get('scriptFormat');
    if (element.get('script')) props.script = element.get('script');
    if (element.get('camunda:resultVariable'))
      props.resultVariable = element.get('camunda:resultVariable');
  }

  if (type === 'bpmn:UserTask') {
    const candidateUsers = element.get('camunda:candidateUsers');
    const candidateGroups = element.get('camunda:candidateGroups');
    if (candidateUsers) props.candidateUsers = candidateUsers;
    if (candidateGroups) props.candidateGroups = candidateGroups;
  }

  return Object.keys(props).length > 0 ? props : undefined;
}

export const getElementPropertiesTools = [
  defineTool(
    'bpmn_get_element_properties',
    {
      title: 'Get Element Properties',
      description: `Возвращает полную сводку свойств BPMN элемента (из XML) и его Low-Code метаданных (из JSON-decor).
Обязательно вызывайте этот инструмент, когда вам нужно изучить конфигурацию существующей задачи, шлюза или линии связи SequenceFlow.
Инструмент выводит: тип элемента, входящие/исходящие линии, технические XML-условия, вложенные параметры Camunda InputOutput (targetModule, targetMethod), флаги констреинтов ограничений и тип UI-панели свойства.`,
      inputSchema: GetElementPropertiesSchema,
    },
    handleGetElementProperties,
  ),
];
