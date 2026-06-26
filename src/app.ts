import express from 'express';
import { OpenAI } from 'openai';
import { z } from 'zod';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { rabisClient } from './services/rabisClient';

dotenv.config({ path: '.env.dev' });

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama-test',
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Подбора инверторов Форпост',
      version: '1.0.0',
      description: 'Документация API чат-бота с поддержкой Function Calling',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Локальный сервер',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// const findInvertersSchema = z.object({
//   batteryVoltage: z
//     .number()
//     .describe('Напряжение аккумуляторной батареи (24, 48, 60, 110, 150, 220)'),
//   loadPowerWatt: z.number().describe('Потребляемая мощность нагрузки в Ваттах'),
//   requestedComponent: z
//     .enum(['system', 'inverter', 'chassis', 'bypass', 'ucu'])
//     .optional()
//     .default('system')
//     .describe(
//       'Что именно ищет клиент. system - систему целиком, остальное - конкретный узел отдельно',
//     ),
//   outputVoltage: z
//     .enum(['220', '380'])
//     .optional()
//     .default('220')
//     .describe(
//       'Выходное напряжение системы в Вольтах (220 для одной фазы, 380 для трех фаз)',
//     ),
//   batteryChemistry: z
//     .enum([
//       'AGM',
//       'GEL',
//       'LiFePO4',
//       'Li-Ion',
//       'свинцово-кислотная',
//       'литий-железо-фосфатная',
//     ])
//     .optional()
//     .describe('Тип электрохимии АКБ (если известно)'),
// });

// Определение Tools для OpenAI
// const tools: any[] = [
//   {
//     type: 'function',
//     function: {
//       name: 'findInverters',
//       description:
//         'Подбирает инвертор по напряжению АКБ и мощности нагрузки. ВСЕГДА используй эту функцию для подбора.',
//       parameters: {
//         type: 'object',
//         properties: {
//           batteryVoltage: {
//             type: 'number',
//             description: 'Напряжение АКБ (24, 48, 60, 110, 150, 220)',
//           },
//           loadPowerWatt: {
//             type: 'number',
//             description: 'Мощность нагрузки в Вт',
//           },
//           outputVoltage: {
//             type: 'string',
//             enum: ['220', '380'],
//             description:
//               'Выходное напряжение системы в Вольтах (220 для одной фазы, 380 для трех фаз). Если не указано, по умолчанию 220.',
//           },
//           requestedComponent: {
//             type: 'string',
//             enum: ['system', 'inverter', 'chassis', 'bypass', 'ucu'],
//             description:
//               'Что именно ищет клиент. system - систему целиком, остальное - конкретный узел отдельно',
//           },
//           batteryChemistry: {
//             type: 'string',
//             enum: [
//               'AGM',
//               'GEL',
//               'LiFePO4',
//               'Li-Ion',
//               'свинцово-кислотная',
//               'литий-железо-фосфатная',
//             ],
//             description: 'Тип электрохимии АКБ',
//           },
//         },
//         required: ['batteryVoltage', 'loadPowerWatt'],
//       },
//     },
//   },
//   {
//     type: 'function',
//     function: {
//       name: 'validateVoltage',
//       description:
//         'Проверяет, поддерживается ли напряжение АКБ. Используй если клиент назвал только напряжение.',
//       parameters: {
//         type: 'object',
//         properties: {
//           batteryVoltage: { type: 'number', description: 'Напряжение АКБ' },
//           batteryChemistry: {
//             type: 'string',
//             description: 'Тип электрохимии (опционально)',
//           },
//         },
//         required: ['batteryVoltage'],
//       },
//     },
//   },
// ];

// async function handleToolCall(toolName: string, args: any): Promise<string> {
//   try {
//     switch (toolName) {
//       case 'findInverters': {
//         const parsed = findInvertersSchema.parse(args);
//         const result = finder.find({
//           batteryVoltage: parsed.batteryVoltage,
//           loadPowerWatt: parsed.loadPowerWatt,
//           batteryChemistry: parsed.batteryChemistry as BatteryChemistry,
//           outputVoltage: parseInt(parsed.outputVoltage, 10),
//         } as any);
//         return JSON.stringify(result);
//       }
//       case 'validateVoltage': {
//         const parsed = validateVoltageSchema.parse(args);
//         const result = validateBatteryVoltage(
//           parsed.batteryVoltage,
//           parsed.batteryChemistry as BatteryChemistry,
//         );
//         return JSON.stringify(result);
//       }
//       default:
//         return JSON.stringify({ error: `Unknown tool: ${toolName}` });
//     }
//   } catch (zodError) {
//     return JSON.stringify({
//       error: 'Invalid arguments provided',
//       details: zodError,
//     });
//   }
// }

app.get('/api/rabis-data', async (_, res) => {
  try {
    const result = await rabisClient.chain.query
      .module({ id: '/modules/Calculator' })
      .get({
        id: true,
        name: true,
        description: true,
        editView: true,
        status: true,
      });

    return res.json({ success: true, module: result });
  } catch (error) {
    console.error('Ошибка запроса к системе РАБИС:', error);
    res.status(500).json({ success: false, error: String(error) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node.js сервер успешно запущен на http://localhost:${PORT}`);
});
