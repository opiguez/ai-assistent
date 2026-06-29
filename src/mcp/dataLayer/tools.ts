import { McpServer } from '@modelcontextprotocol/server';
import {
  handleCreateDataType,
  handleCreateDataTypeField,
  handleCreateModule,
  handleCreateModuleField,
} from './handlers';
import {
  CreateDataTypeFieldSchema,
  CreateDataTypeSchema,
  CreateModuleFieldSchema,
  CreateModuleSchema,
} from './schema';
import { z } from 'zod';

function defineTool<T extends z.ZodObject<any, any>>(
  name: string,
  config: { title: string; description: string; inputSchema: T },
  cb: (args: z.infer<T>) => Promise<any>,
) {
  return { name, config, cb };
}

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
  defineTool(
    'data_create_data_type',
    {
      title: 'Create DataType',
      description:
        'Создает новый тип данных (сущность) внутри модуля. Помни: тип не существует отдельно от модуля.',
      inputSchema: CreateDataTypeSchema,
    },
    handleCreateDataType,
  ),
  defineTool(
    'data_create_data_type_field',
    {
      title: 'Create DataTypeField',
      description:
        'Создает специфичное поле внутри конкретного Типа Данных. Вызывай для описания уникальных атрибутов объекта.',
      inputSchema: CreateDataTypeFieldSchema,
    },
    handleCreateDataTypeField,
  ),
  defineTool(
    'data_create_module_field',
    {
      title: 'Create Module(common) Field',
      description:
        "Создает ОБЩЕЕ (сквозное) поле на уровне Модуля. Все типы данных внутри этого модуля автоматически унаследуют это поле (например, 'дата создания', 'автор').",
      inputSchema: CreateModuleFieldSchema,
    },
    handleCreateModuleField,
  ),
];

export default function registerTools(server: McpServer) {
  tools.forEach((tool) => {
    server.registerTool(tool.name, tool.config, tool.cb as any);
  });
}
