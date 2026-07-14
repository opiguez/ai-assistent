# Модуль: store — «Склад»

| Параметр | Значение |
|---|---|
| **ID** | `/modules/store` |
| **Название** | Склад |
| **Описание** | *пустое* |
| **Публикация** | отключена (сырой) |

---

## Типы данных

### 1. `storeDoc` — Документ
- **State Machine:** BpmnProcess (BPMN-процесс)
- **Версионирование:** отключено
- **Собственные поля:**

  | Поле | Тип | Обязательно | Описание |
  |---|---|---|---|
  | `humanHours` | INTEGER | ✅ | Человеко-часы |
  | `nds` | SELECTION | ✅ | НДС (справочник `storeNds`) |
  | `cost` | DECIMAL | — | Стоимость работы; formula: `[humanHours] * [nds.cost]` |
  | `ndsCost` | DECIMAL | — | НДС стоимость; formula: `[nds.cost]` |
  | `ndsStr` | STRING | — | НДС строка; formula: `[nds]` |

---

## Рабочие области (Workspaces)

| ID | Название |
|---|---|
| `/modules/store/workspaces/default` | Рабочая область | 
не создавай новую, используем существующую

---

## Справочники `_rdm`, используемые модулем store

### Группа справочников: `storeRdm` — Справочник склада
- **ID:** `/modules/_rdm/reference-data-groups/storeRdm`
- **Название:** Справочник склада
- **Описание:** *пустое*
- **Тип:** `referenceMetadataObjectType: GROUP`

### Справочник: `storeNds` — НДС
- **ID:** `/modules/_rdm/reference-data-types/storeNds`
- **Название:** НДС
- **Описание:** *пустое*
- **Дата-специфичный:** false (не привязан к датам)
- **Иерархия:** нет родительского справочника
- **Используется в поле:** `storeDoc.nds` (SELECTION, обязательно)
- **Тип:** `referenceMetadataObjectType: DATA_TYPE`

#### Поля справочника `storeNds` (наследует `_rdm_type`)

Справочник `storeNds` создаётся на основе DataType `_rdm_type` и наследует общие поля с префиксом `_rdm-_common:`:

| Поле | Ключ | Тип | Обязательно | Описание |
|---|---|---|---|---|
| `_label` | `_rdm-_common:_label` | STRING | ✅ | Название (основное поле отображения) |
| `_value` | `_rdm-_common:_value` | STRING | ✅ | Значение справочника |
| `_description` | `_rdm-_common:_description` | TEXT | — | Описание объекта |
| `_order` | `_rdm-_common:_order` | INTEGER | — | Порядковый номер |
| `_is_default` | `_rdm-_common:_is_default` | BOOLEAN | — | По умолчанию |
| `_commenced` | `_rdm-_common:_commenced` | DATETIME | — | Актуально (дата начала) |
| `_retired` | `_rdm-_common:_retired` | DATETIME | ✅ | Устарело (дата окончания) |
| `_attribute_type` | `_rdm-_common:_attribute_type` | SELECTION | — | Тип атрибута |
| `_attribute_reference_type` | `_rdm-_common:_attribute_reference_type` | DATA_OBJECT | — | Справочник |
| `_id` | `_rdm-_common:_id` | STRING | ✅ | ID |
| `_name` | `_rdm-_common:_name` | STRING | ✅ | Название |
| `_created` | `_rdm-_common:_created` | DATETIME | ✅ | Создано |
| `_modified` | `_rdm-_common:_modified` | DATETIME | ✅ | Изменен |
| `_owner` | `_rdm-_common:_owner` | USER | ✅ | Владелец |
| `_parent` | `_rdm-_common:_parent` | DATA_OBJECT | ✅ | Родитель |
| `_status` | `_rdm-_common:_status` | STATUS | — | Статус |
| `_type` | `_rdm-_common:_type` | STRING | ✅ | Тип |
| `_version` | `_rdm-_common:_version` | VERSION | — | Версия |

#### Кастомные поля справочника `storeNds`

Помимо унаследованных, добавлены собственные поля:

| Поле | Ключ | Тип | Обязательно | Описание |
|---|---|---|---|---|
| `cost` | `_rdm-storeNds:cost` | DECIMAL | — | Стоимость человеко-часа |

---

## Примечание

Это единственный справочник из `_rdm`, напрямую связанный с модулем store. Остальные группы (`Custom_fields_group`, `assets_data`, `mp_data`, `reviews_data`) относятся к другим модулям и в текущей конфигурации store **не используются**.
