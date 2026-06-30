### 2. Resource `lowcode://schema/state` всё ещё возвращает мок
**Файл:** `src/app/services/graphql.service.ts:3` — захардкоженный JSON с одним модулем "Складской учет".

LLM-инженер получает фиктивную схему, а не реальное состояние БД. Промпт говорит «Обязан прочитать resource», но там моковые данные → агент может создать дубликаты или работать с несуществующими ID.

**Рекомендация:** Хотя бы один GraphQL-запрос на чтение актуальной схемы вместо мока. Для MVP можно сделать раз в 5 минут с кэшированием.

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
