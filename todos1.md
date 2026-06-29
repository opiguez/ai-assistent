# Architectural Issues — Round 2 (после исправлений)

## ✅ Исправлено с прошлого раза

| № | Проблема | Статус |
|---|----------|--------|
| 1 | Инструменты — заглушки | **FIXED** — handlers.ts теперь зовет реальный rabisClient.chain.mutation* |
| 4 | `classifyShortMessage` не вызывается | **FIXED** — chat.controller.ts:150, динамическая классификация |
| 5 | Нет обработки разрыва MCP | **FIXED** — ensureMcpConnection() + ping через listPrompts перед каждым запросом |
| 7 | Детект системного промпта по ключевым словам | **FIXED** — ai.service.ts:124, `index === 0 ? 'system'` вместо `.includes('ИНСТРУКЦИЯ')` |
| 8 | Грубое `.slice(0, -2)` архивации | **IMPROVED** — archiveExecutedActions теперь фильтрует `tool`-роли и очищает `tool_calls`, оставляя reasoning |
| 11 | Последовательный tool calling | **FIXED** — ai.service.ts:290, `Promise.all(toolPromises)` |

---

## 🔴 Критические

### 1. Нарушение границ слоёв (MCP → app/)
**Файлы:**
- `src/mcp/dataLayer/handlers.ts:9` — `import { rabisClient } from '../../app/services/rabisClient.service'`
- `src/mcp/dataLayer/resources.ts:2` — `import { getGraphQLStateMock } from '../../app/services/graphql.service'`

MCP-модуль напрямую зависит от сервисов из `app/`. Если MCP-сервер когда-нибудь станет автономным, это сломается.

**Рекомендация:** Вынести rabisClient в общий слой (`src/shared/`) или передавать его через DI/конфиг при инициализации tools.

### 2. Resource `lowcode://schema/state` всё ещё возвращает мок
**Файл:** `src/app/services/graphql.service.ts:3` — захардкоженный JSON с одним модулем "Складской учет".

LLM-инженер получает фиктивную схему, а не реальное состояние БД. Промпт говорит «Обязан прочитать resource», но там моковые данные → агент может создать дубликаты или работать с несуществующими ID.

**Рекомендация:** Хотя бы один GraphQL-запрос на чтение актуальной схемы вместо мока. Для MVP можно сделать раз в 5 минут с кэшированием.

---

## 🟡 Средние

### 3. Только CREATE, нет READ/QUERY инструментов
**Файл:** `src/mcp/dataLayer/tools.ts` — все 5 инструментов начинаются с `data_create_*`.

Агент не может:
- Проверить, существует ли модуль перед созданием → дубликаты
- Узнать список текущих типов данных в модуле
- Посмотреть структуру существующей схемы без ресурса

С resource на моке это тем worse.

**Рекомендация (MVP-минимум):** Добавить хотя бы `data_list_modules` и `data_list_data_types(moduleId)` — достаточно, чтобы агент не создавал дубликаты.

### 5. Повторный парсинг tool arguments
**Файл:** `src/app/services/ai.service.ts:243-249` и `:261-267`

```typescript
// Парсится два раза для одних и тех же tool_calls:
let args = {};
try { args = JSON.parse(toolCall.function.arguments); } catch { ... }
```

Тот же блок duplicated в двух местах (логирование SSE + выполнение).

**Рекомендация:** Выпарсить один раз перед циклом, сохранить объект.

### 6. `archiveExecutedActions` — мёртвый код?
**Файл:**
- `src/mcp/services/history.service.ts:60` — реализация метода
- `src/mcp/controllers/history.controller.ts:102` — REST endpoint `/api/history/archive-actions`

В chat.controller.ts результаты идут через `appendMcpTaskResult`, а не через `archiveExecutedActions`. Никто не вызывает этот эндпоинт.

Метод полезный (архивация-heavy tool-логов для экономии токенов), но сейчас — неиспользуемый публичный API.

**Рекомендация:** Либо подключить после каждого шага `CHUNK_PROCESSING`, либо убрать, чтобы не распухать.

### 7. Массовое использование `any`
| Файл | Строка | Проблема |
|------|--------|----------|
| `chat.controller.ts:11-12` | `client: any, transport: any` | Подписи функций без типов |
| `ai.service.ts:71,76` | `rawTasks: any[]`, `(t: any)` → | Планировщик возвращает untyped данные |
| `handlers.ts:53,111,165,248,331` | `catch (error: any)` | 5 раз вместо `unknown` |
| `history.controller.ts:19,44,68,94,116,132` | `catch (error: any)` | 6 раз вместо `unknown` |
| `tools.ts:80` | `tool.cb as any` | Полная потеря типобезопасности callbacks |
| `history.service.ts:66` | `(msg: any)` → | Chat history messages untyped в map/filter |

Для MVP терпимо, но `as any` на tool callbacks (`tools.ts:80`) — это silent bug magnet. Если кто-то поменяет сигнатуру handler'а, компилятор не поймает несоответствие.

---

## 🟢 Низкий приоритет / заметки

### 8. `createDataType` и `createBpmnDataType` используют одну Zod-схему
**Файл:** `src/mcp/dataLayer/tools.ts:52` — оба инструмента режутся на `CreateDataTypeSchema`.

Если BPMN-процессы получат дополнительные поля (например, `processDefinitionId`, `version`), схема не будет различать их. Сейчас работает, потому что поля одинаковые.

### 9. Dockerfile запускает только app.js, без MCP-сервера
**Файл:** `Dockerfile:24` — `CMD ["node", "dist/app.js"]`

При деплое в Docker запустится один Express-апп, но MCP-сервер (port 3002) не поднимется. App будет падать на коннекте к MCP.

**Рекомендация:** CMD должен запускать оба процесса (например, через concurrently или отдельный shell-скрипт). В dev-режиме это работает (`npm run dev` → concurrently), в Docker — нет.

### 10. Swagger title не соответствует проекту
**Файл:** `src/app/services/swagger.service.ts:11`

```
title: 'API Подбора инверторов Форпост'
```

Остаток от другого проекта. Ничего ломать не будет, но путает в документации.

### 11. Системные промпты в plain TS-объекте
**Файл:** `src/mcp/systemPromts.ts` — 3 больших мульти라인 string-литерала внутри одного объекта.

Имя файла опечатано (`systemPromts` вместо `systemPrompts`). Промпты не вынесены в `.prompt` файлы → нет подсветки, нет шаблонов,不方便 редактирования из внешних инструментов (LangSmith, PromptHub).

### 10. SSE stream без heartbeat
**Файл:** `chat.controller.ts:169-203`

SSE соединение висит молча во время длительных LLM-запросов. Прокси/балансировщики могут закрыть неактивное соединение (~60s timeout). Ollama с большими промптами может отвечать дольше.

**Рекомендация:** Периодические `: heartbeat` комментарии в stream на случай долгих генераций.

---

## Итог по предыдущим комментариям автора

| Пункт todos.md | Мой коммент там | Статус |
|----------------|-----------------|--------|
| #3 Сессии в Map | «для MVP» | ✅ Согласен — OK для MVP, оставить |
| #12 Rate limiting | «пока 1 человек тестирует» | ✅ Согласен — не нужно сейчас |
