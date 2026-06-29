Ты senior typescript developer. Перед тобой стоит комплексная задача: спроектировать Zod-схемы валидации в файле `src/mcp/dataLayer/schema.ts` и сразу использовать их для замены тестовых заглушек на реальные мутации через `rabisClient` в файле `src/mcp/dataLayer/handlers.ts`. и обновить tools в файле `src/mcp/dataLayer/tools.ts` по новым данным

Внимательно изучи типы в папке `src/generated/client/schema.graphql` и структуру мутаций в коде проекта, чтобы выстроить точную логику.

=========================================================================
ЭТАП 1: ГЕНЕРАЦИЯ ZOD-СХЕМ В `src/mcp/dataLayer/schema.ts`
=========================================================================
1. Создай и экспортируй базовую схему для low-code сущностей, чтобы избежать дублирования общих полей (код латиницей и название на русском):
export const BaseLowCodeSchema = z.object({
  displayName: z.string().describe("Понятное название сущности на русском языке (например, 'Калькулятор')"),
  name: z.string().describe("Уникальный системное имя (например, 'Calculator')"),
});

2. Сгенерируй схемы для создания сущностей, расширяя базовую через `.extend()`. Обязательно пиши подробные `.describe("...")` на русском языке для КАЖДОГО поля (ИИ-агент будет читать их через MCP!):
   - CreateModuleSchema
   - CreateDataTypeSchema
   ....

Все нужные на данный момент схемы сделаны в виде заглушек.

=========================================================================
ЭТАП 2: ЗАМЕНА ЗАГЛУШЕК НА МУТАЦИИ В `src/mcp/dataLayer/handlers.ts`
=========================================================================
Полностью убери хардкод (вроде 'real_mod_uuid_111') из всех функций-обработчиков. Перепиши их на реальные GraphQL-запросы к `rabisClient` по следующему эталонному шаблону. В аргументах функций используй сгенерированные в Этапе 1 Zod-типы.

ЭТАЛОННЫЙ ШАБЛОН ДЛЯ ОБРАБОТЧИКОВ:
export const handleCreateModule = async ({ displayName, name }: CreateModuleArgs) => {
  console.log(`[MCP Server] Выполнение инструмента: createModule`, { displayName, name });
  
  try {
    const response = await rabisClient.chain.mutation
      .createModule({
        module: {
          displayName: 'test',
          name: 'uniq_tech_name',
        },
      })
      .get({
        id: true,
        name: true,
      });

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({ 
            id: response.id, 
            status: 'success',
            message: 'Модуль успешно создан'
          }),
        },
      ],
    };
  } catch (error: any) {
    console.error(`[MCP Error] Ошибка в createModule:`, error);
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({ status: 'error', message: error.message || 'Ошибка базы данных' }),
        },
      ],
    };
  }
};

=========================================================================
ЭТАП 3: ИЗМЕНЕНИЯ `src/mcp/dataLayer/tools.ts` description and title
=========================================================================
Подправь массив tools как нужно основываясь на предыдущих шагах(если нужно)

const tools = [
  defineTool(
    'data_create_module',
    {
      title: 'Create Module',
      description:
        'Создает новый модуль (верхнеуровневый контейнер). При создании модуля автоматически создается дефолтная рабочая область (DEFAULT_WORKSPACE_ID). Не создавай несколько модулей за раз.',
      inputSchema: CreateModuleSchema,
    },
    handleCreateModule,
  ),
  ...//далее
]

ЗАДАЧА:
Проанализируй файлы, в файле хэндлеров импортируй и замени созданные Zod-схемы(тоже должен заменить) и `rabisClient`. Напиши чистый, рабочий код для файлов заместо заглушек