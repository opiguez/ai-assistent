import { z } from 'zod';
import {
  CreateModuleSchema,
  CreateDataTypeSchema,
  CreateDataTypeFieldSchema,
  CreateModuleFieldSchema,
} from './schema';
import { rabisClient } from '../../app/services/rabisClient.service';

type CreateModuleArgs = z.infer<typeof CreateModuleSchema>;
type CreateDataTypeArgs = z.infer<typeof CreateDataTypeSchema>;
type CreateBpmnDataTypeArgs = z.infer<typeof CreateDataTypeSchema>;
type CreateDataTypeFieldArgs = z.infer<typeof CreateDataTypeFieldSchema>;
type CreateModuleFieldArgs = z.infer<typeof CreateModuleFieldSchema>;

export const handleCreateModule = async ({
  displayName,
  name,
  description,
}: CreateModuleArgs) => {
  console.log(`[MCP Server] Выполнение инструмента: createModule`, {
    displayName,
    name,
  });

  try {
    const response = await rabisClient.chain.mutation
      .createModule({
        module: {
          displayName,
          name,
          description,
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
            message: 'Модуль успешно создан',
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
          text: JSON.stringify({
            status: 'error',
            message: error.message || 'Ошибка базы данных',
          }),
        },
      ],
    };
  }
};

export const handleCreateDataType = async ({
  displayName,
  name,
  parentId,
  lifecycle,
  description,
  canHaveChildren,
}: CreateDataTypeArgs) => {
  console.log(`[MCP Server] Выполнение инструмента: createDataType`, {
    displayName,
    name,
  });

  try {
    const response = await rabisClient.chain.mutation
      .createDataType({
        dataType: {
          displayName,
          name,
          parentId,
          lifecycle: lifecycle || '/modules/Calculator/lifecycles/default',
          description,
          canHaveChildren,
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
            message: 'Тип данных успешно создан',
          }),
        },
      ],
    };
  } catch (error: any) {
    console.error(`[MCP Error] Ошибка в createDataType:`, error);
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: error.message || 'Ошибка базы данных',
          }),
        },
      ],
    };
  }
};

export const handleCreateBpmnDataType = async ({
  displayName,
  name,
  parentId,
  description,
}: CreateBpmnDataTypeArgs) => {
  console.log(`[MCP Server] Выполнение инструмента: createBpmnDataType`, {
    displayName,
    name,
  });

  try {
    const response = await rabisClient.chain.mutation
      .createBpmnProcessDataType({
        dataType: {
          displayName,
          name,
          parentId,
          description,
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
            message: 'Тип данных(процесс) успешно создан',
          }),
        },
      ],
    };
  } catch (error: any) {
    console.error(`[MCP Error] Ошибка в createBpmnDataType:`, error);
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: error.message || 'Ошибка базы данных',
          }),
        },
      ],
    };
  }
};

export const handleCreateDataTypeField = async ({
  displayName,
  name,
  dataTypeId,
  propertyType,
  description,
  required,
  formula,
}: CreateDataTypeFieldArgs) => {
  console.log(`[MCP Server] Выполнение инструмента: createDataTypeField`, {
    displayName,
    name,
  });

  try {
    let mutationFn;
    switch (propertyType) {
      case 'INTEGER':
        mutationFn = rabisClient.chain.mutation.createDataPropertyInteger;
        break;
      case 'BOOLEAN':
        mutationFn = rabisClient.chain.mutation.createDataPropertyBoolean;
        break;
      case 'DATE':
        mutationFn = rabisClient.chain.mutation.createDataPropertyDate;
        break;
      case 'DATETIME':
        mutationFn = rabisClient.chain.mutation.createDataPropertyDateTime;
        break;
      case 'DECIMAL':
        mutationFn = rabisClient.chain.mutation.createDataPropertyDecimal;
        break;
      case 'TEXT':
        mutationFn = rabisClient.chain.mutation.createDataPropertyText;
        break;
      default:
        mutationFn = rabisClient.chain.mutation.createDataPropertyString;
        break;
    }

    const response = await mutationFn({
      dataProperty: {
        displayName,
        formatType: propertyType as any,
        name,
        parentId: dataTypeId,
        description,
        required: required || false,
        formula: formula || null,
      },
    }).get({
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
            message: 'Поле типа данных успешно создано',
          }),
        },
      ],
    };
  } catch (error: any) {
    console.error(`[MCP Error] Ошибка в createDataTypeField:`, error);
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: error.message || 'Ошибка базы данных',
          }),
        },
      ],
    };
  }
};

export const handleCreateModuleField = async ({
  displayName,
  name,
  moduleId,
  propertyType,
  description,
  required,
  formula,
}: CreateModuleFieldArgs) => {
  console.log(`[MCP Server] Выполнение инструмента: createModuleField`, {
    displayName,
    name,
  });

  try {
    let mutationFn;
    switch (propertyType) {
      case 'INTEGER':
        mutationFn = rabisClient.chain.mutation.createDataPropertyInteger;
        break;
      case 'BOOLEAN':
        mutationFn = rabisClient.chain.mutation.createDataPropertyBoolean;
        break;
      case 'DATE':
        mutationFn = rabisClient.chain.mutation.createDataPropertyDate;
        break;
      case 'DATETIME':
        mutationFn = rabisClient.chain.mutation.createDataPropertyDateTime;
        break;
      case 'DECIMAL':
        mutationFn = rabisClient.chain.mutation.createDataPropertyDecimal;
        break;
      case 'TEXT':
        mutationFn = rabisClient.chain.mutation.createDataPropertyText;
        break;
      default:
        mutationFn = rabisClient.chain.mutation.createDataPropertyString;
        break;
    }

    const response = await mutationFn({
      dataProperty: {
        displayName,
        formatType: propertyType as any,
        name,
        parentId: moduleId,
        description,
        required: required || false,
        formula: formula || null,
      },
    }).get({
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
            message: 'Общее поле модуля успешно создано',
          }),
        },
      ],
    };
  } catch (error: any) {
    console.error(`[MCP Error] Ошибка в createModuleField:`, error);
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: error.message || 'Ошибка базы данных',
          }),
        },
      ],
    };
  }
};
