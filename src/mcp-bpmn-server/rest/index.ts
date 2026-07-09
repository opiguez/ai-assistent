/**
 * REST API for BPMN tools
 * Mounts on /api/bpmn, Swagger UI on /api/bpmn/docs
 */
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { z } from 'zod';

// ─── Read tools ───────────────────────────────────────────
import {
  handleGetProcessSchema,
  GetProcessSchemaSchema,
} from '../tools/get-process-schema.js';
import {
  handleGetProcessTopology,
  GetProcessTopologySchema,
} from '../tools/get-process-topology.js';
import {
  handleGetElementProperties,
  GetElementPropertiesSchema,
} from '../tools/get-element-properties.js';

// ─── Add element tools ────────────────────────────────────
import { handleAddStartEvent } from '../tools/add-element/add-start-event.js';
import { handleAddEndEvent } from '../tools/add-element/add-end-event.js';
import {
  handleAddUserTask,
  AddUserTaskSchema,
} from '../tools/add-element/add-user-task.js';
import {
  handleAddServiceTask,
  AddServiceTaskSchema,
} from '../tools/add-element/add-service-task.js';
import {
  handleAddScriptTask,
  AddScriptTaskSchema,
} from '../tools/add-element/add-script-task.js';
import {
  handleAddSubProcess,
  AddSubProcessSchema,
} from '../tools/add-element/add-sub-process.js';
import { handleAddExclusiveGateway } from '../tools/add-element/add-exclusive-gateway.js';
import { handleAddInclusiveGateway } from '../tools/add-element/add-inclusive-gateway.js';
import { handleAddBoundaryEvent } from '../tools/add-element/add-boundary-event.js';
import { handleAddIntermediateCatchEvent } from '../tools/add-element/add-intermediate-catch-event.js';
import { handleAddIntermediateThrowEvent } from '../tools/add-element/add-intermediate-throw-event.js';
import { handleAddSendTask } from '../tools/add-element/add-send-task.js';

// ─── Write / configure tools ──────────────────────────────
import {
  handleConnectElements,
  ConnectElementsSchema,
} from '../tools/connect-elements.js';
import {
  handleSetConditionExpression,
  SetConditionExpressionSchema,
} from '../tools/set-condition-expression.js';
import {
  handleToggleDecisions,
  ToggleDecisionsSchema,
} from '../tools/toggle-decisions.js';
import {
  handleSetRdmOrNumberStructure,
  SetRdmOrNumberStructureSchema,
} from '../tools/set-rdm-and-number-structure.js';

// ─── Local schemas for tools that don't export one ────────
const DataTypeIdNameSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z.string().max(255).optional().describe('Имя'),
});

const AddSendTaskLocalSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z.string().max(255).optional().describe('Имя задачи'),
  sendTaskType: z.string().optional().describe('camunda:type'),
  sendTaskTopic: z.string().optional().describe('camunda:topic'),
  sendTaskRecipients: z.string().optional().describe('JSON-строка получателей'),
  sendTaskTemplate: z.string().optional().describe('ID шаблона письма'),
});

const AddBoundaryEventLocalSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z.string().max(255).optional().describe('Имя события'),
  attachedToRef: z.string().describe('ID родительского элемента'),
});

// ─── Helper ───────────────────────────────────────────────
async function toolToJson<T>(
  handler: (args: T) => Promise<any>,
  args: T,
): Promise<any> {
  const mcpRes = await handler(args);
  return JSON.parse(mcpRes.content[0].text);
}

function wrapRoute<T>(
  schema: z.ZodSchema<T>,
  handler: (args: T) => Promise<any>,
) {
  return async (req: any, res: any) => {
    try {
      const parsed = schema.parse(req.body);
      const data = await toolToJson(handler, parsed);
      res.status(data.status === 'error' ? 400 : 200).json(data);
    } catch (e: any) {
      if (e?.issues) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          issues: e.issues,
        });
      }
      res
        .status(500)
        .json({ status: 'error', message: e?.message || 'Internal error' });
    }
  };
}

const router = Router();

// ====================================================================
// OpenAPI spec
// ====================================================================
const EmptyResponse = {
  type: 'object',
  properties: { status: { type: 'string' }, message: { type: 'string' } },
};

const openapiSpec: any = {
  openapi: '3.0.0',
  info: {
    title: 'BPMN Tools REST API',
    version: '1.0.0',
    description:
      'REST-обёртка для BPMN MCP tools. Каждая ручка принимает JSON body с теми же параметрами, что и соответствующий MCP tool.',
  },
  servers: [{ url: '/api/bpmn' }],
  paths: {},
};

function addPath(
  path: string,
  summary: string,
  properties: Record<string, any>,
  required: string[],
) {
  openapiSpec.paths[path] = {
    post: {
      summary,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { type: 'object', properties, required },
          },
        },
      },
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: EmptyResponse } },
        },
        '400': {
          description: 'Error / Validation failed',
          content: { 'application/json': { schema: EmptyResponse } },
        },
      },
    },
  };
}

function str(desc: string) {
  return { type: 'string', description: desc };
}

// ====================================================================
// READ
// ====================================================================

addPath(
  '/get-process-schema',
  'Чтение структуры BPMN схемы',
  {
    dataTypeId: str('ID BPMN типа данных'),
    summary: {
      type: 'boolean',
      description: 'Компактный режим (опционально)',
      nullable: true,
    },
  },
  ['dataTypeId'],
);
router.post(
  '/get-process-schema',
  wrapRoute(GetProcessSchemaSchema, handleGetProcessSchema),
);

addPath(
  '/get-process-topology',
  'Анализ графа BPMN схемы',
  {
    dataTypeId: str('ID BPMN типа данных'),
  },
  ['dataTypeId'],
);
router.post(
  '/get-process-topology',
  wrapRoute(GetProcessTopologySchema, handleGetProcessTopology),
);

addPath(
  '/get-element-properties',
  'Свойства BPMN элемента',
  {
    dataTypeId: str('ID BPMN типа данных'),
    elementId: str('ID элемента на схеме'),
  },
  ['dataTypeId', 'elementId'],
);
router.post(
  '/get-element-properties',
  wrapRoute(GetElementPropertiesSchema, handleGetElementProperties),
);

// ====================================================================
// ADD ELEMENTS
// ====================================================================

addPath(
  '/add-start-event',
  'Создаёт StartEvent',
  { dataTypeId: str('ID BPMN типа данных'), name: str('Имя (опционально)') },
  ['dataTypeId'],
);
router.post(
  '/add-start-event',
  wrapRoute(DataTypeIdNameSchema, handleAddStartEvent),
);

addPath(
  '/add-end-event',
  'Создаёт EndEvent',
  { dataTypeId: str('ID BPMN типа данных'), name: str('Имя (опционально)') },
  ['dataTypeId'],
);
router.post(
  '/add-end-event',
  wrapRoute(DataTypeIdNameSchema, handleAddEndEvent),
);

addPath(
  '/add-user-task',
  'Создаёт UserTask',
  {
    dataTypeId: str('ID BPMN типа данных'),
    name: str('Имя задачи'),
    assignee: {
      type: 'object',
      description: 'Настройка назначения',
      properties: {
        type: { type: 'string', enum: ['owner', 'user', 'group', 'variable'] },
        value: { type: 'string' },
      },
    },
    navigateView: str('ID формы просмотра (опционально)'),
    editView: str('ID формы редактирования (опционально)'),
  },
  ['dataTypeId', 'name'],
);
router.post('/add-user-task', wrapRoute(AddUserTaskSchema, handleAddUserTask));

addPath(
  '/add-service-task',
  'Создаёт ServiceTask c API привязкой',
  {
    dataTypeId: str('ID BPMN типа данных'),
    name: str('Имя (опционально)'),
    apiSpecGroupId: str('ID группы API спецификаций'),
    targetModule: str('Имя целевого модуля'),
    targetService: str('Имя сервиса'),
    targetMethod: str('Имя метода API'),
    threadCount: str('Количество потоков (опционально)'),
  },
  [
    'dataTypeId',
    'apiSpecGroupId',
    'targetModule',
    'targetService',
    'targetMethod',
  ],
);
router.post(
  '/add-service-task',
  wrapRoute(AddServiceTaskSchema, handleAddServiceTask),
);

addPath(
  '/add-send-task',
  'Создаёт SendTask',
  {
    dataTypeId: str('ID BPMN типа данных'),
    name: str('Имя задачи (опционально)'),
    sendTaskType: str('camunda:type'),
    sendTaskTopic: str('camunda:topic'),
    sendTaskRecipients: str('JSON-строка получателей'),
    sendTaskTemplate: str('ID шаблона письма'),
  },
  ['dataTypeId'],
);
router.post(
  '/add-send-task',
  wrapRoute(AddSendTaskLocalSchema, handleAddSendTask),
);

addPath(
  '/add-script-task',
  'Создаёт ScriptTask',
  {
    dataTypeId: str('ID BPMN типа данных'),
    name: str('Имя (опционально)'),
    scriptFormat: str('Язык, по умолч. javascript'),
    rawRequire: {
      type: 'array',
      items: { type: 'string' },
      description: 'Массив входных переменных',
    },
    rawProduce: str('Имя переменной результата'),
    innerScript: str('Тело скрипта без обёртки function calculate'),
  },
  ['dataTypeId', 'rawProduce', 'innerScript'],
);
router.post(
  '/add-script-task',
  wrapRoute(AddScriptTaskSchema, handleAddScriptTask),
);

addPath(
  '/add-exclusive-gateway',
  'Создаёт ExclusiveGateway (XOR)',
  { dataTypeId: str('ID BPMN типа данных'), name: str('Имя (опционально)') },
  ['dataTypeId'],
);
router.post(
  '/add-exclusive-gateway',
  wrapRoute(DataTypeIdNameSchema, handleAddExclusiveGateway),
);

addPath(
  '/add-inclusive-gateway',
  'Создаёт InclusiveGateway (OR)',
  { dataTypeId: str('ID BPMN типа данных'), name: str('Имя (опционально)') },
  ['dataTypeId'],
);
router.post(
  '/add-inclusive-gateway',
  wrapRoute(DataTypeIdNameSchema, handleAddInclusiveGateway),
);

addPath(
  '/add-sub-process',
  'Создаёт SubProcess',
  { dataTypeId: str('ID BPMN типа данных'), name: str('Имя (опционально)') },
  ['dataTypeId'],
);
router.post(
  '/add-sub-process',
  wrapRoute(AddSubProcessSchema, handleAddSubProcess),
);

addPath(
  '/add-boundary-event',
  'Создаёт BoundaryEvent',
  {
    dataTypeId: str('ID BPMN типа данных'),
    name: str('Имя (опционально)'),
    attachedToRef: str('ID родительского элемента'),
  },
  ['dataTypeId', 'attachedToRef'],
);
router.post(
  '/add-boundary-event',
  wrapRoute(AddBoundaryEventLocalSchema, handleAddBoundaryEvent),
);

addPath(
  '/add-intermediate-catch-event',
  'Создаёт IntermediateCatchEvent',
  { dataTypeId: str('ID BPMN типа данных'), name: str('Имя (опционально)') },
  ['dataTypeId'],
);
router.post(
  '/add-intermediate-catch-event',
  wrapRoute(DataTypeIdNameSchema, handleAddIntermediateCatchEvent),
);

addPath(
  '/add-intermediate-throw-event',
  'Создаёт IntermediateThrowEvent',
  { dataTypeId: str('ID BPMN типа данных'), name: str('Имя (опционально)') },
  ['dataTypeId'],
);
router.post(
  '/add-intermediate-throw-event',
  wrapRoute(DataTypeIdNameSchema, handleAddIntermediateThrowEvent),
);

// ====================================================================
// CONFIGURE
// ====================================================================

addPath(
  '/connect-elements',
  'Создаёт SequenceFlow',
  {
    dataTypeId: str('ID BPMN типа данных'),
    sourceId: str('ID исходного элемента'),
    targetId: str('ID целевого элемента'),
    conditionName: str('Имя ветки/решения (опционально)'),
  },
  ['dataTypeId', 'sourceId', 'targetId'],
);
router.post(
  '/connect-elements',
  wrapRoute(ConnectElementsSchema, handleConnectElements),
);

addPath(
  '/set-condition-expression',
  'Устанавливает conditionExpression',
  {
    dataTypeId: str('ID BPMN типа данных'),
    connectionId: str('ID линии SequenceFlow'),
    value: str('Техническое значение условия'),
    operator: {
      type: 'string',
      enum: ['==', '>', '<', '>=', '<=', '!='],
      description: 'Оператор для числовых шлюзов (опционально)',
    },
  },
  ['dataTypeId', 'connectionId', 'value'],
);
router.post(
  '/set-condition-expression',
  wrapRoute(SetConditionExpressionSchema, handleSetConditionExpression),
);

addPath(
  '/toggle-decisions',
  'Включает/выключает кнопки на UserTask',
  {
    dataTypeId: str('ID BPMN типа данных'),
    elementId: str('ID UserTask'),
    enabled: {
      type: 'boolean',
      description: 'true = включить, false = выключить',
    },
    decisions: {
      type: 'array',
      items: { type: 'string' },
      description: 'Названия кнопок, напр. ["Одобрить","Отклонить"]',
    },
  },
  ['dataTypeId', 'elementId', 'enabled'],
);
router.post(
  '/toggle-decisions',
  wrapRoute(ToggleDecisionsSchema, handleToggleDecisions),
);

addPath(
  '/set-rdm-or-number-structure',
  'Привязывает справочник/число к Gateway',
  {
    dataTypeId: str('ID BPMN типа данных'),
    elementId: str('ID Gateway'),
    typeProperty: {
      type: 'string',
      enum: ['rdmStructure', 'realNumber'],
      description: 'Тип свойства',
    },
    propertyValue: str('Имя переменной, напр. "test-test1:select"'),
  },
  ['dataTypeId', 'elementId', 'typeProperty', 'propertyValue'],
);
router.post(
  '/set-rdm-or-number-structure',
  wrapRoute(SetRdmOrNumberStructureSchema, handleSetRdmOrNumberStructure),
);

// ====================================================================
// Swagger UI
// ====================================================================
router.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

export default router;
