import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { STRUCTURAL_RULES } from '../knowledge/custom-rules.js';

const SuggestImprovementsSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
});

async function handleSuggestImprovements(args: { dataTypeId: string }) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);
    const elements = bpmnXmlService.extractElements(state.parsed);
    const connections = bpmnXmlService.extractConnections(state.parsed);

    const suggestions: any[] = [];

    // 1. Элементы без имени
    for (const el of elements) {
      if (!el.name && !el.type.includes('Gateway') && !el.type.includes('Event')) {
        suggestions.push({
          type: 'missing_name',
          severity: 'warning',
          elementId: el.id,
          elementType: el.type,
          message: `${el.type} не имеет имени. Рекомендуется задать понятное имя.`,
          suggestion: `Установить имя через bpmn_update_element_name`,
        });
      }
    }

    // 2. UserTask без decisions
    const userTasks = elements.filter((el) => el.type === 'bpmn:UserTask');
    for (const ut of userTasks) {
      const model = state.model[ut.id] || {};
      if (!model.decisionsEnabled) {
        suggestions.push({
          type: 'no_decisions',
          severity: 'info',
          elementId: ut.id,
          elementType: ut.type,
          message: `UserTask "${ut.name || ut.id}" не имеет decisions. Если нужна ветвимость по результатам — рекомендуется включить.`,
          suggestion: `Использовать bpmn_toggle_decisions для включения`,
        });
      }
    }

    // 3. ServiceTask без API привязки
    const serviceTasks = elements.filter((el) => el.type === 'bpmn:ServiceTask');
    for (const st of serviceTasks) {
      const model = state.model[st.id] || {};
      if (!model.topic) {
        suggestions.push({
          type: 'no_api_binding',
          severity: 'warning',
          elementId: st.id,
          elementType: st.type,
          message: `ServiceTask "${st.name || st.id}" не привязан к API (нет topic). Задача не будет выполняться.`,
          suggestion: `Использовать bpmn_set_service_task_config для настройки`,
        });
      }
    }

    // 4. SendTask без template
    const sendTasks = elements.filter((el) => el.type === 'bpmn:SendTask');
    for (const st of sendTasks) {
      const model = state.model[st.id] || {};
      if (!model.template) {
        suggestions.push({
          type: 'no_template',
          severity: 'warning',
          elementId: st.id,
          elementType: st.type,
          message: `SendTask "${st.name || st.id}" не имеет шаблона template. Письмо не будет отправлено.`,
          suggestion: `Использовать bpmn_set_send_task_template для настройки`,
        });
      }
    }

    // 5. Gateway без DataTypeProperty и без decisions
    const gateways = elements.filter(
      (el) =>
        el.type === 'bpmn:ExclusiveGateway' ||
        el.type === 'bpmn:InclusiveGateway',
    );
    for (const gw of gateways) {
      const model = state.model[gw.id] || {};
      if (!model.DataTypeProperty && !model.type) {
        const outCount = connections.filter((c) => c.source === gw.id).length;
        if (outCount > 1) {
          suggestions.push({
            type: 'gateway_no_config',
            severity: 'warning',
            elementId: gw.id,
            elementType: gw.type,
            message: `${gw.type.split(':')[1]} "${gw.name || gw.id}" имеет ${outCount} исходящих рёбер, но не настроен (нет DataTypeProperty или type).`,
            suggestion: `Использовать bpmn_set_rdm_structure или bpmn_toggle_decisions для настройки ветвления`,
          });
        }
      }
    }

    // 6. Отсутствие Start/End Events
    const startEvents = elements.filter((el) => el.type === 'bpmn:StartEvent');
    const endEvents = elements.filter((el) => el.type === 'bpmn:EndEvent');
    if (startEvents.length === 0) {
      suggestions.push({
        type: 'missing_start_event',
        severity: 'error',
        message: 'Процесс не имеет StartEvent. BPMN процесс должен начинаться с StartEvent.',
        suggestion: 'Добавить StartEvent через палитру',
      });
    }
    if (endEvents.length === 0) {
      suggestions.push({
        type: 'missing_end_event',
        severity: 'warning',
        message: 'Процесс не имеет EndEvent. Рекомендуется завершить процесс EndEvent.',
        suggestion: 'Добавить EndEvent через палитру',
      });
    }

    // 7. Duplicate names
    const names = elements
      .filter((el) => el.name)
      .map((el) => ({ name: el.name, id: el.id }));
    const nameCounts: Record<string, string[]> = {};
    for (const n of names) {
      if (!nameCounts[n.name!]) nameCounts[n.name!] = [];
      nameCounts[n.name!]!.push(n.id);
    }
    for (const [name, ids] of Object.entries(nameCounts)) {
      if (ids.length > 1) {
        suggestions.push({
          type: 'duplicate_name',
          severity: 'info',
          elementIds: ids,
          message: `Элементы ${ids.join(', ')} имеют одинаковое имя "${name}". Рекомендуется различать имена.`,
          suggestion: 'Переименовать элементы для уникальности',
        });
      }
    }

    // 8. SequenceFlow от Gateway без conditionExpression
    const gatewaysAll = elements.filter(
      (el) => el.type === 'bpmn:ExclusiveGateway' || el.type === 'bpmn:InclusiveGateway',
    );
    for (const gw of gatewaysAll) {
      const outgoing = connections.filter((c) => c.source === gw.id);
      for (const conn of outgoing) {
        const flowElement = state.parsed.elementsById[conn.id];
        if (flowElement && !flowElement.conditionExpression) {
          suggestions.push({
            type: 'missing_condition',
            severity: 'warning',
            elementId: conn.id,
            elementType: 'bpmn:SequenceFlow',
            message: `SequenceFlow "${conn.id}" от Gateway "${gw.name || gw.id}" не имеет conditionExpression.`,
            suggestion: `Использовать bpmn_set_condition_expression для задания условия`,
          });
        }
      }
    }

    // 9. ExclusiveGateway с decisions без исходящих рёбер
    for (const gw of gatewaysAll) {
      const model = state.model[gw.id] || {};
      const outCount = connections.filter((c) => c.source === gw.id).length;
      if (outCount === 0) {
        suggestions.push({
          type: 'gateway_no_outgoing',
          severity: 'error',
          elementId: gw.id,
          elementType: gw.type,
          message: `${gw.type.split(':')[1]} "${gw.name || gw.id}" не имеет исходящих связей. Процесс будет прерван.`,
          suggestion: 'Добавить SequenceFlow от Gateway к целевым элементам',
        });
      }
    }

    // 10. UserTask с decisions без ExclusiveGateway
    for (const ut of userTasks) {
      const model = state.model[ut.id] || {};
      if (model.decisionsEnabled) {
        const hasExclusiveGateway = connections.some(
          (c) =>
            c.source === ut.id &&
            state.parsed.elementsById[c.target]?.type === 'bpmn:ExclusiveGateway',
        );
        if (!hasExclusiveGateway) {
          suggestions.push({
            type: 'decisions_no_gateway',
            severity: 'error',
            elementId: ut.id,
            elementType: ut.type,
            message: `UserTask "${ut.name || ut.id}" имеет decisions, но не подключён к ExclusiveGateway.`,
            suggestion: `Использовать bpmn_toggle_decisions для настройки или подключить Gateway вручную`,
          });
        }
      }
    }

    // 11. Gateway с 1 исходящей (нужно 2+ для ветвления)
    for (const gw of gatewaysAll) {
      const outCount = connections.filter((c) => c.source === gw.id).length;
      if (outCount === 1) {
        suggestions.push({
          type: 'gateway_one_outgoing',
          severity: 'warning',
          elementId: gw.id,
          elementType: gw.type,
          message: `${gw.type.split(':')[1]} "${gw.name || gw.id}" имеет только 1 исходящую связь. Gateway предназначены для ветвления (2+ исходящих).`,
          suggestion: 'Добавить ещё SequenceFlow или заменить на Task',
        });
      }
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              status: 'success',
              dataTypeId: args.dataTypeId,
              totalSuggestions: suggestions.length,
              errors: suggestions.filter((s) => s.severity === 'error').length,
              warnings: suggestions.filter((s) => s.severity === 'warning')
                .length,
              infos: suggestions.filter((s) => s.severity === 'info').length,
              suggestions,
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
            message: e?.message || 'Ошибка анализа предложений',
          }),
        },
      ],
    };
  }
}

export const suggestImprovementsTools = [
  defineTool(
    'bpmn_suggest_improvements',
    {
      title: 'Suggest Improvements',
      description:
        'Анализ BPMN процесса и рекомендации по улучшению: отсутствующие имена, UserTask без decisions, ServiceTask без API, SendTask без шаблона, настройка Gateway, отсутствие Start/End Events, дубликаты имён.',
      inputSchema: SuggestImprovementsSchema,
    },
    handleSuggestImprovements,
  ),
];
