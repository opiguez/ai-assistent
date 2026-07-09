import { z } from 'zod';
import { bpmnSchemaService } from '../../services/bpmn-schema.service.js';
import { bpmnXmlService } from '../../services/bpmn-xml.service.js';
import { defineTool } from '../../../shared/utils/base.js';
import {
  ELEMENT_SIZES,
  calculatePosition,
  createModelEntry,
  successResponse,
  errorResponse,
} from './shared.js';

const AddExclusiveGatewaySchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z.string().max(255).optional().describe('Имя шлюза'),
});

async function handleAddExclusiveGateway(
  args: z.infer<typeof AddExclusiveGatewaySchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:ExclusiveGateway',
      args.name,
    );
    if (!result) {
      return errorResponse('Не удалось создать ExclusiveGateway в XML');
    }

    const pos = calculatePosition(state.model, 'bpmn:ExclusiveGateway');
    const size = ELEMENT_SIZES['bpmn:ExclusiveGateway'];

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
      'bpmn:ExclusiveGateway',
      args.name || '',
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return errorResponse(
        saveResult.error || 'Ошибка сохранения изменений шлюза',
      );
    }

    return successResponse({
      elementId: result.elementId,
      elementType: 'bpmn:ExclusiveGateway',
      name: args.name || null,
      message: `Успешно создан ExclusiveGateway с ID "${result.elementId}"`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка создания ExclusiveGateway',
    );
  }
}

export const addExclusiveGatewayTools = [
  defineTool(
    'bpmn_add_exclusive_gateway',
    {
      title: 'Add ExclusiveGateway',
      description: 'Создаёт ExclusiveGateway (XOR). name опционален.',
      inputSchema: AddExclusiveGatewaySchema,
    },
    handleAddExclusiveGateway,
  ),
];
