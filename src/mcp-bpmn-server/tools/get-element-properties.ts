import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { CUSTOM_MODEL_PROPERTIES } from '../knowledge/bpmn-element-specs.js';
import { defineTool } from '../../shared/utils/base.js';
import { checkAllConstraints } from '../services/constraint-utils.js';

const GetElementPropertiesSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  elementId: z.string().describe('ID элемента BPMN'),
});

async function handleGetElementProperties(args: {
  dataTypeId: string;
  elementId: string;
}) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);
    const element = bpmnXmlService.getElementById(state.parsed, args.elementId);

    if (!element) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Элемент с ID "${args.elementId}" не найден в схеме`,
            }),
          },
        ],
      };
    }

    const modelProps = state.model[args.elementId] || {};

    // Определяем компонент панели свойств
    const panelComponent = determinePanelComponent(element, modelProps);

    // Определяем ограничения (shared logic)
    const constraintResults = checkAllConstraints(element, modelProps, state);
    const constraints = {
      canDelete: constraintResults.delete.allowed,
      canChangeType: constraintResults.changeType.allowed,
      canAddConnections: constraintResults.connect.allowed,
      canAttachBoundaryEvents: constraintResults.addBoundaryEvent.allowed,
      canEditDirectly: constraintResults.directEdit.allowed,
    };

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              status: 'success',
              elementId: args.elementId,
              // BPMN свойства (из XML)
              bpmn: {
                id: element.id,
                type: element.$type,
                name: element.name,
                documentation: getDocumentation(element),
                incoming: (element.get('incoming') || []).map((sf: any) => ({
                  id: sf.id,
                  name: sf.name,
                })),
                outgoing: (element.get('outgoing') || []).map((sf: any) => ({
                  id: sf.id,
                  name: sf.name,
                })),
                eventDefinitions: getEventDefinitions(element),
                conditionExpression: getConditionExpression(element),
                extensionElements: getExtensionElementsSummary(element),
                taskProperties: getTaskProperties(element),
              },
              // Кастомные свойства (из Model/decor)
              customProperties: modelProps,
              // Какой компонент панели свойств отображается
              panelComponent,
              // Ограничения
              constraints,
              // Доступные свойства для настройки
              availableProperties: Object.keys(CUSTOM_MODEL_PROPERTIES),
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
            message: e?.message || 'Ошибка получения свойств элемента',
          }),
        },
      ],
    };
  }
}

function determinePanelComponent(element: any, modelProps: any): string {
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
      const sourceModelProps = {} as any; // Would need state.model[source.id]
      if (modelProps.DataTypeProperty === 'rdmStructure') return 'RDM_STRUCTURE';
      if (modelProps.DataTypeProperty === 'realNumber') return 'REAL_NUMBER';
    }
    return 'NAME';
  }

  return 'NAME';
}

function getDocumentation(element: any): string | undefined {
  const doc = element.get('documentation');
  if (doc && doc.length > 0) {
    return doc[0].get('text');
  }
  return undefined;
}

function getEventDefinitions(element: any): any[] {
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

function getConditionExpression(element: any): string | undefined {
  const ce = element.get('conditionExpression');
  return ce?.body;
}

function getExtensionElementsSummary(element: any): Record<string, any> | undefined {
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

function getTaskProperties(element: any): Record<string, any> | undefined {
  const type = element.$type;
  const props: Record<string, any> = {};

  if (type === 'bpmn:ServiceTask') {
    if (element.topic) props.topic = element.topic;
    if (element.delegateExpression) props.delegateExpression = element.delegateExpression;
  }
  if (type === 'bpmn:SendTask') {
    if (element.topic) props.topic = element.topic;
  }
  if (type === 'bpmn:ScriptTask') {
    if (element.scriptFormat) props.scriptFormat = element.scriptFormat;
    if (element.script) props.script = element.script;
  }
  if (type === 'bpmn:UserTask') {
    if (element.assignee) props.assignee = element.assignee;
    if (element.candidateGroups) props.candidateGroups = element.candidateGroups;
  }

  return Object.keys(props).length > 0 ? props : undefined;
}

export const getElementPropertiesTools = [
  defineTool(
    'bpmn_get_element_properties',
    {
      title: 'Get Element Properties',
      description:
        'Возвращает полные свойства элемента BPMN: базовые BPMN свойства (type, name, connections), кастомные свойства из Model (customType, decisionsEnabled, DataTypeProperty и т.д.), компонент панели свойств, и ограничения (canDelete, canChangeType и т.д.).',
      inputSchema: GetElementPropertiesSchema,
    },
    handleGetElementProperties,
  ),
];
