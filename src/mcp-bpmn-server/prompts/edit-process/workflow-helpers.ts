/**
 * Общие шаги workflow для промтов modify-process и extend-process.
 *
 * Вынесены в edit-process/, так как оба промта работают с
 * СУЩЕСТВУЮЩИМ процессом (read → snapshot → modify → validate → report),
 * в отличие от create-process (создание с нуля) и analyze-process (read-only).
 *
 * КЛЮЧЕВЫЕ РАЗЛИЧИЯ (остаются в файлах промтов):
 *
 * extend-process:
 *   - Определение точки вставки (analyze topology → find insertion point)
 *   - Перенастройка связей (разрыв source→target, вставка между)
 *
 * modify-process:
 *   - Проверка ограничений (bpmn_get_element_constraints)
 *   - Комбинированная WRITE/CREATE логика модификации
 */

export function stepReadSchema(dataTypeId: string): string {
  return `#### Шаг 1: Анализ текущей структуры
1. \`bpmn_get_process_schema\` — общая структура процесса
2. \`bpmn_get_process_topology\` — граф анализ (пути, ветвления, dead-ends)
3. Определи: процесс пустой (только Start/End) или заполненный?`;
}

export function stepSaveSnapshot(dataTypeId: string): string {
  return `#### Сохранение снимка
Вызови \`bpmn_save_snapshot\` с dataTypeId="${dataTypeId}".
При ошибке можно будет откатиться через \`bpmn_restore_snapshot\`.`;
}

export function stepValidate(dataTypeId: string): string {
  return `#### Валидация
Вызови \`bpmn_validate_process\` с dataTypeId="${dataTypeId}".
Если valid=false:
- Проанализируй ошибки
- Повтори шаги модификации с корректировкой
- При необходимости — \`bpmn_restore_snapshot\` для отката`;
}

export function stepReport(actionVerb: string): string {
  const verb =
    actionVerb === 'добавлено'
      ? 'добавлено/изменено'
      : actionVerb === 'изменено'
        ? 'изменено'
        : actionVerb;
  return `#### Отчёт
Опиши что ${verb}:
- Новые/изменённые элементы (тип, имя, ID)
- Новые/изменённые связи
- Настроенные свойства
- Результат валидации`;
}
