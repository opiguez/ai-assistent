import { z } from 'zod';
import { bpmnSchemaService } from '../../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../../services/bpmn-xml.service.js';
import { defineTool } from '../../../shared/utils/base.js';
import {
  ELEMENT_SIZES,
  generateTaskName,
  calculatePosition,
  createModelEntry,
  successResponse,
  errorResponse,
} from './shared.js';

const AddScriptTaskSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z
    .string()
    .max(255)
    .optional()
    .describe('Имя задачи. Если не указано — генерируется "Элемент N"'),
});

async function handleAddScriptTask(args: { dataTypeId: string; name?: string }) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    if (!args.name) {
      args.name = generateTaskName(state.model);
    }

    const result = bpmnXmlService.createElement(state.parsed, 'bpmn:ScriptTask', args.name);
    if (!result) {
      return errorResponse('Не удалось создать элемент');
    }

    const pos = calculatePosition(state.model, 'bpmn:ScriptTask');
    const size = ELEMENT_SIZES['bpmn:ScriptTask'];

    bpmnXmlService.addShapeToDiagram(
      state.parsed,
      result.elementId,
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    const newModel = { ...state.model };
    newModel[result.elementId] = createModelEntry(
      result.elementId,
      'bpmn:ScriptTask',
      args.name,
      pos.x,
      pos.y,
      size.width,
      size.height,
      args.dataTypeId,
    );

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return errorResponse(saveResult.error || 'Ошибка сохранения');
    }

    return successResponse({
      elementId: result.elementId,
      elementType: 'bpmn:ScriptTask',
      name: args.name,
      message: `Создан ScriptTask с ID "${result.elementId}"`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Ошибка создания ScriptTask');
  }
}

export const addScriptTaskTools = [
  defineTool(
    'bpmn_add_script_task',
    {
      title: 'Add ScriptTask',
      description:
        'Создаёт ScriptTask. Если name не указан — генерируется "Элемент N".',
      inputSchema: AddScriptTaskSchema,
    },
    handleAddScriptTask,
  ),
];
