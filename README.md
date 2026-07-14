# Low-Code MCP Data Server + AI Agent

## 1. Описание

Проект для автоматизации работы с low-code платформой (Rabis/Nuxeo) через AI-агента.

Состоит из двух частей:
- **MCP Data Server** — прослойка, которая предоставляет AI-агенту инструменты для управления low-code платформой (создание модулей, типов данных, полей, справочников, публикация)
- **AI Agent** — OpenCode с multi-agent системой (оркестратор `plan-execute` → `build-execute`)

## 2. Требования

- **Node.js 22+**
- **npm**
- **Low-code платформа Rabis** (запущена на `localhost:81`)
- **OpenCode CLI** — установка: `npm install -g opencode`

## 3. Быстрый старт

### 1. Установить зависимости

```bash
npm install  --legacy-peer-deps
```

### 2. Настроить окружение

```bash
touch .env.dev
```

Отредактировать `.env.dev`:
```
PLATFORM_USERNAME=admin
PLATFORM_PASSWORD=admin
GRAPHQL_ADRESS=http://localhost:81/graphql
PORT_MCP1=3002
LOCAL_SERVER_URL_NO_PORT=http://127.0.0.1
```

### 3. Запустить MCP сервер

```bash
npm run dev:server
```

Сервер запустится на `http://127.0.0.1:3002/mcp`

### 4. Запустить агента

```bash
npm run dev:agent
```

Открыть в браузере: `http://127.0.0.1:3000`

## 4. Переменные окружения (.env)

| Переменная | По умолчанию | Описание |
|---|---|---|
| `PLATFORM_USERNAME` | `admin` | Логин low-code платформы |
| `PLATFORM_PASSWORD` | `admin` | Пароль low-code платформы |
| `GRAPHQL_ADRESS` | `http://localhost:81/graphql` | GraphQL endpoint платформы |
| `PORT_MCP1` | `3002` | Порт MCP сервера |
| `LOCAL_SERVER_URL_NO_PORT` | `http://127.0.0.1` | Базовый URL сервера |
| `OLLAMA_URL` | `http://localhost:11434` | URL Ollama (опционально) |
| `OLLAMA_MODEL` | `qwen3.6` | Модель Ollama (опционально) |

## 5. Команды

| Команда | Описание |
|---|---|
| `npm run build` | Сборка TypeScript |
| `npm run dev:server` | MCP сервер (dev, hot-reload) |
| `npm run start:server` | MCP сервер (production) |
| `npm run dev:agent` | Запуск OpenCode агента на :3000 |
| `npm run codegen` | Генерация GraphQL клиента |

## 6. Конфигурация OpenCode

Файл `opencode.json` в корне проекта — в нём описаны:

- **Подключение к MCP серверу** — секция `mcp.web-mcp_data` (type: remote, url: http://127.0.0.1:3002/mcp)
- **Агенты** — `orchestrator` (координатор), `plan-execute` (архитектор), `build-execute` (инженер)
- **Системные промпты** — `src/promts/planner.md` и `src/promts/engineer.md`

### Своя модель/провайдер

```json
{
  "model": "ollama/SetneufPT/Qwen3.6-27B-MTP_Q3_32K_16GB-GPU",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama Local",
      "options": {
        "baseURL": "http://localhost:11434/v1"
      },
      "models": {
        "SetneufPT/Qwen3.6-27B-MTP_Q3_32K_16GB-GPU": {
          "name": "Qwen 3.6 27B Local"
        }
      }
    }
  },
  "mcp": {
    "web-mcp_data": {
      "type": "remote",
      "url": "http://localhost:3001/mcp",
      "enabled": true
    }
  },
  "agent": {
    "plan": {
      ...
    },
    "build": {
      ...
    }
  }
}
```

## 7. Структура проекта

```
├── opencode.json                  # Конфигурация OpenCode + агенты
├── src/
│   ├── mcp-data-server/           # MCP сервер
│   │   ├── mcp-server.ts          # Точка входа
│   │   ├── data/tools.ts          # Регистрация всех tools
│   │   ├── data/resources.ts      # Ресурсы (schema-state)
│   │   ├── core/                  # Core tools (роли, публикация)
│   │   ├── module/                # CRUD модулей
│   │   ├── datatype/              # CRUD типов данных
│   │   ├── fields/                # 18 типов полей
│   │   ├── lifecycle/             # CRUD жизненных циклов
│   │   ├── references/            # CRUD справочников
│   │   └── workspace/             # CRUD рабочих областей
│   └── promts/
│       ├── planner.md             # Промпт архитектора
│       └── engineer.md            # Промпт инженера
├── .env.dev                       # Шаблон переменных окружения
├── Dockerfile
```