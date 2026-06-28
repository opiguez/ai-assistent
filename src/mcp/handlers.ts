import { z } from 'zod';
import {
  CreateModuleSchema,
  CreateDataTypeSchema,
  CreateDataTypeFieldSchema,
  CreateModuleFieldSchema,
} from './schema';

type CreateModuleArgs = z.infer<typeof CreateModuleSchema>;
type CreateDataTypeArgs = z.infer<typeof CreateDataTypeSchema>;
type CreateDataTypeFieldArgs = z.infer<typeof CreateDataTypeFieldSchema>;
type CreateModuleFieldArgs = z.infer<typeof CreateModuleFieldSchema>;

export const handleCreateModule = async ({ name, code }: CreateModuleArgs) => {
  console.log(`[MCP Server] Выполнение инструмента: createModule`, {
    name,
    code,
  });
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({ id: 'real_mod_uuid_111', status: 'success' }),
      },
    ],
  };
};

export const handleCreateDataType = async (args: CreateDataTypeArgs) => {
  console.log(`[MCP Server] Выполнение инструмента: createDataType`, args);
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({ id: 'real_dt_uuid_222', status: 'success' }),
      },
    ],
  };
};

export const handleCreateDataTypeField = async (
  args: CreateDataTypeFieldArgs,
) => {
  console.log(`[MCP Server] Выполнение инструмента: createDataTypeField`, args);
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({ status: 'success', code: args.code }),
      },
    ],
  };
};

export const handleCreateModuleField = async (args: CreateModuleFieldArgs) => {
  console.log(`[MCP Server] Выполнение инструмента: createModuleField`, args);
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({ status: 'success', code: args.code }),
      },
    ],
  };
};
