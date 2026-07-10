import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { bpmnXmlService, ModdleElement } from '../services/bpmn-xml.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { errorResponse, successResponse } from './add-element/shared.js';

const SuggestImprovementsSchema = z.object({
  dataTypeId: z
    .string()
    .describe(
      'ID BPMN типа данных (модуля/процесса) для запуска ассистента улучшений схемы',
    ),
});

async function handleSuggestImprovements(args: { dataTypeId: string }) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);
    const elements = bpmnXmlService.extractElements(state.parsed);
    const connections = bpmnXmlService.extractConnections(state.parsed);

    const suggestions: any[] = [];

    // ====================================================================
    // 1. ВАЛИДАЦИЯ ИМЕН (Исключаем шлюзы и события, у которых имен в XML быть не должно)
    // ====================================================================
    for (const el of elements) {
      const modelProps = state.model[el.id] || {};
      const hasName = modelProps.name || el.name;

      if (
        !hasName &&
        !el.type.includes('Gateway') &&
        !el.type.includes('Event') &&
        el.type !== 'bpmn:Process'
      ) {
        suggestions.push({
          type: 'missing_name',
          severity: 'warning',
          elementId: el.id,
          elementType: el.type,
          message: `Элемент ${el.type.split(':')[1]} с ID "${el.id}" не имеет отображаемого имени. Рекомендуется задать понятное имя для отображения в Low-Code интерфейсе.`,
          suggestion:
            'Использовать инструмент "bpmn_update_element_property" с параметром propertyName="name", чтобы задать имя.',
        });
      }
    }

    // ====================================================================
    // 2. ВАЛИДАЦИЯ USER TASK (Проверка режима решений)
    // ====================================================================
    const userTasks = elements.filter((el) => el.type === 'bpmn:UserTask');
    for (const ut of userTasks) {
      const modelProps = state.model[ut.id] || {};
      if (!modelProps.decisionsEnabled) {
        suggestions.push({
          type: 'no_decisions',
          severity: 'info',
          elementId: ut.id,
          elementType: ut.type,
          message: `Пользовательская задача UserTask "${modelProps.name || ut.name || ut.id}" выполняется линейно. Если на этом шаге пользователю требуются кнопки выбора (например, Одобрить/Отклонить), активируйте режим решений.`,
          suggestion:
            'Использовать инструмент "bpmn_toggle_decisions" с передачей массива кнопок и параметром enabled=true.',
        });
      }
    }

    // ====================================================================
    // 3. ВАЛИДАЦИЯ SERVICE TASK (Проверка интеграции с API методами)
    // ====================================================================
    const serviceTasks = elements.filter(
      (el) => el.type === 'bpmn:ServiceTask',
    );
    for (const st of serviceTasks) {
      const modelProps = state.model[st.id] || {};
      // Проверяем физическое наличие привязки к целевому методу API
      if (!modelProps.targetMethod) {
        suggestions.push({
          type: 'no_api_binding',
          severity: 'danger', // Критическая ошибка — таска пустая
          elementId: st.id,
          elementType: st.type,
          message: `Сервисная задача ServiceTask "${modelProps.name || st.name || st.id}" не привязана к конкретному методу API. Она заблокирует выполнение процесса.`,
          suggestion:
            'Поскольку перенастройка существующих ServiceTask не выведена в отдельный инструмент, рекомендуется удалить этот узел с помощью "bpmn_delete_element" и создать заново через "bpmn_add_service_task" с полным указанием targetModule/targetMethod.',
        });
      }
    }

    // ====================================================================
    // 4. ВАЛИДАЦИЯ SEND TASK (Проверка привязки шаблонов уведомлений)
    // ====================================================================
    const sendTasks = elements.filter((el) => el.type === 'bpmn:SendTask');
    for (const st of sendTasks) {
      const modelProps = state.model[st.id] || {};
      // Проверяем имя свойства строго по нашей Low-Code Zod-схеме template!
      if (!modelProps.template) {
        suggestions.push({
          type: 'no_template',
          severity: 'warning',
          elementId: st.id,
          elementType: st.type,
          message: `Задача отправки уведомлений SendTask "${modelProps.name || st.name || st.id}" не имеет привязанного ID шаблона письма (template). Уведомление не уйдет.`,
          suggestion:
            'Рекомендуется пересоздать узел через инструмент "bpmn_add_send_task", явно передав корректный ID шаблона в параметр template.',
        });
      }
    }

    // ====================================================================
    // 5. ВАЛИДАЦИЯ GATEWAY (Умная проверка конфигурации)
    // ====================================================================
    const gatewaysAll = elements.filter(
      (el) =>
        el.type === 'bpmn:ExclusiveGateway' ||
        el.type === 'bpmn:InclusiveGateway',
    );
    for (const gw of gatewaysAll) {
      const modelProps = state.model[gw.id] || {};
      const outCount = connections.filter((c) => c.source === gw.id).length;
      const inCount = connections.filter((c) => c.target === gw.id).length;

      // Шлюз требует конфигурации условий ТОЛЬКО если он работает на РАЗВЕТВЛЕНИЕ (outCount > 1)
      // Если выходов 1, а входов много (inCount > 1) — это легальный замыкающий шлюз (Merge), пропускаем!
      if (outCount > 1 && !modelProps.DataTypeProperty) {
        // Умный шаг назад для шлюзов решений (UserTask -> Gateway):
        const incomingToGateway = connections.find((c) => c.target === gw.id);
        let isDecisionGateway = false;

        if (incomingToGateway) {
          const parentNode = state.model[incomingToGateway.source];
          if (
            parentNode &&
            parentNode.elementType === 'bpmn:UserTask' &&
            parentNode.decisionsEnabled
          ) {
            isDecisionGateway = true;
          }
        }

        // Если это НЕ шлюз кнопок, и на нем НЕТ RDM/Number структуры — значит он реально пустой и сломанный!
        if (!isDecisionGateway) {
          suggestions.push({
            type: 'gateway_no_config',
            severity: 'warning',
            elementId: gw.id,
            elementType: gw.type,
            message: `Шлюз разветвления ${gw.type.split(':')[1]} "${modelProps.name || gw.id}" имеет ${outCount} исходящих ветвей, но на нем не настроена структура условий (DataTypeProperty).`,
            suggestion:
              'Используйте инструмент "bpmn_set_rdm_or_number_structure", чтобы перевести шлюз в режим справочника (rdmStructure) или чисел (realNumber) и привязать переменную.',
          });
        }
      }
    }

    // ====================================================================
    // 6. ПРОВЕРКА НАЛИЧИЯ ОБЯЗАТЕЛЬНЫХ СТАРТА И КОНЦА (Ограничение платформы)
    // ====================================================================
    const startEvents = elements.filter((el) => el.type === 'bpmn:StartEvent');
    const endEvents = elements.filter((el) => el.type === 'bpmn:EndEvent');

    if (startEvents.length === 0) {
      suggestions.push({
        type: 'missing_start_event',
        severity: 'danger',
        message:
          'Процесс не имеет StartEvent. По правилам платформы на схеме обязан быть строго один StartEvent.',
        suggestion:
          'Добавить стартовое событие с помощью инструмента "bpmn_add_element" с типом "bpmn:StartEvent".',
      });
    }

    if (endEvents.length === 0) {
      suggestions.push({
        type: 'missing_end_event',
        severity: 'danger', // Повысили критичность: для вашей платформы это фатально
        message:
          'Процесс не имеет EndEvent. По правилам платформы на схеме обязан быть строго один EndEvent для корректного завершения рантайма.',
        suggestion:
          'Добавить конечное событие с помощью инструмента "bpmn_add_element" с типом "bpmn:EndEvent".',
      });
    }

    // ====================================================================
    // 7. ДУБЛИРОВАНИЕ ИМЕН (Исключаем пустые имена)
    // ====================================================================
    const names = elements
      .map((el) => ({ name: state.model[el.id]?.name || el.name, id: el.id }))
      .filter((el) => el.name);

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
          message: `Элементы со следующими ID: ${ids.join(', ')} имеют одинаковое отображаемое имя "${name}". Рекомендуется различать имена для уникальности.`,
          suggestion:
            'Использовать инструмент "bpmn_update_element_property" с параметром propertyName="name", чтобы сделать их уникальными.',
        });
      }
    }

    // 8. SequenceFlow от Gateway без conditionExpression
    for (const gw of gatewaysAll) {
      const outgoing = connections.filter((c) => c.source === gw.id);
      for (const conn of outgoing) {
        const flowElement = state.parsed.elementsById[conn.id] as
          | ModdleElement
          | undefined;
        // Проверяем, что стрелка физически существует в XML-дереве и у неё нет conditionExpression
        if (flowElement && !flowElement.get('conditionExpression')) {
          suggestions.push({
            type: 'missing_condition',
            severity: 'warning',
            elementId: conn.id,
            message: `Линия SequenceFlow с ID "${conn.id}", выходящая из шлюза "${state.model[gw.id]?.name || gw.id}", не имеет технического XML-выражения conditionExpression.`,
            suggestion:
              'Вызовите инструмент "bpmn_set_condition_expression", передав connectionId, operator и техническое значение value, чтобы вшить выражение.',
          });
        }
      }
    }

    // ====================================================================
    // 9. ТУПИКОВыЕ ШЛЮЗЫ (Шлюзы без исходящих связей)
    // ====================================================================
    for (const gw of gatewaysAll) {
      const outCount = connections.filter((c) => c.source === gw.id).length;
      if (outCount === 0) {
        suggestions.push({
          type: 'gateway_no_outgoing',
          severity: 'danger',
          elementId: gw.id,
          elementType: gw.type,
          message: `Шлюз разветвления ${gw.type.split(':')} "${state.model[gw.id]?.name || gw.id}" не имеет ни одной исходящей связи. Процесс на этом шаге зависнет.`,
          suggestion:
            'Проведите от этого шлюза линии к следующим задачам с помощью инструмента "bpmn_connect_elements".',
        });
      }
    }

    // ====================================================================
    // 10. КНОПКИ USER TASK МИМО ШЛЮЗА (Контроль Low-Code цепочки)
    // ====================================================================
    for (const ut of userTasks) {
      const modelProps = state.model[ut.id] || {};
      if (modelProps.decisionsEnabled) {
        const hasExclusiveGateway = connections.some((c) => {
          const targetEl = state.parsed.elementsById[c.target] as
            | ModdleElement
            | undefined;
          return (
            c.source === ut.id && targetEl?.$type === 'bpmn:ExclusiveGateway'
          );
        });

        if (!hasExclusiveGateway) {
          suggestions.push({
            type: 'decisions_no_gateway',
            severity: 'danger',
            elementId: ut.id,
            elementType: ut.type,
            message: `Задача UserTask "${modelProps.name || ut.id}" работает в режиме решений (Decisions), но её выходящая стрелка не подключена к ExclusiveGateway шлюзу распределения веток.`,
            suggestion:
              'Соедините эту UserTask со шлюзом ExclusiveGateway с помощью инструмента "bpmn_connect_elements".',
          });
        }
      }
    }

    // ====================================================================
    // 11. ОДИНОЧНЫЕ ШЛЮЗЫ (Шлюзы с одной исходящей стрелкой)
    // ====================================================================
    for (const gw of gatewaysAll) {
      const outCount = connections.filter((c) => c.source === gw.id).length;
      const inCount = connections.filter((c) => c.target === gw.id).length;

      // Ругаемся на 1 выходящую стрелку ТОЛЬКО если входящая стрелка тоже ОДНА!
      // Если входов больше 1 (inCount > 1), то шлюз работает как легальный Merge веток, и это НЕ ошибка.
      if (outCount === 1 && inCount === 1) {
        suggestions.push({
          type: 'gateway_one_outgoing',
          severity: 'warning',
          elementId: gw.id,
          elementType: gw.type,
          message: `Шлюз ${gw.type.split(':')[1]} "${state.model[gw.id]?.name || gw.id}" имеет 1 вход и всего 1 выход. Он транзитный и бесполезен. Шлюзы должны либо разветвлять логику (2+ выхода), либо собирать ветки (2+ входа).`,
          suggestion:
            'Удалите этот лишний транзитный шлюз с помощью "bpmn_delete_element" и соедините задачи напрямую.',
        });
      }
    }

    // ====================================================================
    // 12. СБОР СТАТИСТИКИ И ОТВЕТ
    // ====================================================================
    const dangerCount = suggestions.filter(
      (s) => s.severity === 'danger',
    ).length;
    const warningCount = suggestions.filter(
      (s) => s.severity === 'warning',
    ).length;
    const infoCount = suggestions.filter((s) => s.severity === 'info').length;

    return successResponse({
      dataTypeId: args.dataTypeId,
      totalSuggestions: suggestions.length,
      hasCriticalErrors: dangerCount > 0, // Сигнал для ИИ: если true — деплоить схему нельзя
      stats: {
        dangers: dangerCount, // Фатальные ошибки (нет старта/конца, пустой API метод)
        warnings: warningCount, // Проблемы (нет имен, шлюз с 1 выходом, нет JUEL условия)
        infos: infoCount, // Подсказки (дубли имен, линейные таски без решений)
      },
      suggestions: suggestions,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка ассистента улучшений схемы',
    );
  }
}

export const suggestImprovementsTools = [
  defineTool(
    'bpmn_suggest_improvements',
    {
      title: 'Suggest Improvements',
      description: `Запускает автоматический линтер-ассистент для проверки качества и валидности Low-Code схемы.
Обязательно вызывайте этот инструмент в самом конце проектирования процесса перед финальным отчетом пользователю.
Инструмент проверяет схему на наличие критических Low-Code пропусков: задачи без имен, ServiceTask без привязки к методам API, SendTask без шаблонов писем, и шлюзы разветвлений без настроенных RDM или числовых условий.
Каждое предупреждение содержит точный ID элемента и имя правильного MCP-инструмента для исправления.`,
      inputSchema: SuggestImprovementsSchema,
    },
    handleSuggestImprovements,
  ),
];
