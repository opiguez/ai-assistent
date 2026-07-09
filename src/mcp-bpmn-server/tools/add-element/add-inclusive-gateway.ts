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

const AddInclusiveGatewaySchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
  name: z.string().max(255).optional().describe('Имя шлюза'),
});

export async function handleAddInclusiveGateway(
  args: z.infer<typeof AddInclusiveGatewaySchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:InclusiveGateway',
      args.name,
    );
    if (!result) {
      return errorResponse('Не удалось создать InclusiveGateway в XML');
    }

    const pos = calculatePosition(state.model, 'bpmn:InclusiveGateway');
    const size = ELEMENT_SIZES['bpmn:InclusiveGateway'];

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
      'bpmn:InclusiveGateway',
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
      elementType: 'bpmn:InclusiveGateway',
      name: args.name || null,
      message: `Успешно создан InclusiveGateway с ID "${result.elementId}"`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка создания InclusiveGateway',
    );
  }
}

export const addInclusiveGatewayTools = [
  defineTool(
    'bpmn_add_inclusive_gateway',
    {
      title: 'Add InclusiveGateway',
      description: 'Создаёт InclusiveGateway (OR). name опционален.',
      inputSchema: AddInclusiveGatewaySchema,
    },
    handleAddInclusiveGateway,
  ),
];
