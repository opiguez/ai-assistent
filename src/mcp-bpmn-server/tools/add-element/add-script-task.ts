import { z } from 'zod';
import { bpmnSchemaService } from '../../services/bpmn-schema.service.js';
import {
  bpmnXmlService,
  ModdleElement,
} from '../../services/bpmn-xml.service.js';
import { defineTool } from '../../../shared/utils/base.js';
import {
  ELEMENT_SIZES,
  generateTaskName,
  calculatePosition,
  createModelEntry,
  successResponse,
  errorResponse,
} from './shared.js';

export const AddScriptTaskSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных (модуля/процесса)'),
  name: z
    .string()
    .max(255)
    .optional()
    .describe('Имя задачи (отображаемый текст)'),
  scriptFormat: z
    .string()
    .default('javascript')
    .describe('Язык выполнения скрипта. По умолчанию: "javascript"'),
  rawRequire: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      'Массив СЫРЫХ входных переменных, которые нужны скрипту (напр. ["test:common-_assignee"]). Передавайте их в оригинальном формате с двоеточиями/дефисами!',
    ),
  rawProduce: z
    .string()
    .describe(
      'СЫРОЕ имя переменной, куда запишется результат выполнения скрипта (напр. "test:common-_assignee"). Передавайте в оригинальном формате с двоеточиями/дефисами!',
    ),
  innerScript: z
    .string()
    .describe(
      'Только ВНУТРЕННЕЕ тело скрипта без объявления функции calculate (напр. "return \\"1\\";"). Система сама обернет этот код в функцию.',
    ),
  position: z
    .enum(['main', 'branch'])
    .optional()
    .describe(
      'Позиция: main — основной ряд (центр Y), branch — ветка Gateway (колонка со сдвигом Y)',
    ),
});

export async function handleAddScriptTask(
  args: z.infer<typeof AddScriptTaskSchema>,
) {
  try {
    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    let taskName = args.name;
    if (!taskName) {
      taskName = generateTaskName(state.model);
    }

    const result = bpmnXmlService.createElement(
      state.parsed,
      'bpmn:ScriptTask',
      taskName,
    );
    if (!result) {
      return errorResponse('Не удалось создать ScriptTask в XML');
    }

    const bpmnElement = result.element as ModdleElement;

    const cleanProduce = args.rawProduce.replace(/[:\-]/g, '_');

    const cleanRequireArray = args.rawRequire.map((req) =>
      req.replace(/[:\-]/g, '__'),
    );

    const functionArguments = cleanRequireArray.join(', ');

    const finalScriptBody = `
        function calculate(${functionArguments}) {
          var result;
          ${args.innerScript}
        }
        calculate(${functionArguments});`;

    bpmnElement.set('scriptFormat', args.scriptFormat);
    bpmnElement.set('camunda:resultVariable', cleanProduce);
    bpmnElement.set('script', finalScriptBody);

    const pos = calculatePosition(state.model, 'bpmn:ScriptTask', undefined, args.position);
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

    const baseEntry = createModelEntry(
      result.elementId,
      'bpmn:ScriptTask',
      taskName,
      pos.x,
      pos.y,
      size.width,
      size.height,
    );

    const scriptTaskEntry = {
      ...baseEntry,
      require: cleanRequireArray,
      produce: cleanProduce,
    };

    newModel[result.elementId] = scriptTaskEntry;

    const updatedXml = await bpmnXmlService.generateXml(state.parsed);
    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: args.dataTypeId,
      xml: updatedXml,
      decor: JSON.stringify(newModel),
    });

    if (!saveResult.success) {
      return errorResponse(
        saveResult.error || 'Ошибка при сохранении ScriptTask',
      );
    }

    return successResponse({
      elementId: result.elementId,
      elementType: 'bpmn:ScriptTask',
      name: taskName,
      message: `Успешно создан ScriptTask с ID "${result.elementId}". Сгенерирован JS-скрипт с результатом в "${cleanProduce}".`,
    });
  } catch (e: any) {
    return errorResponse(e?.message || 'Внутренняя ошибка создания ScriptTask');
  }
}

export const addScriptTaskTools = [
  defineTool(
    'bpmn_add_script_task',
    {
      title: 'Add ScriptTask',
      description: `Создаёт ScriptTask. Если name не указан — генерируется "Элемент N".
Доступные данные из контекста (bpmn://process/{dataTypeId}/data-context):
  - dataTypeProperties → rawRequire/rawProduce = field.key (существующая переменная из dataTypeProperties)`,
      inputSchema: AddScriptTaskSchema,
    },
    handleAddScriptTask,
  ),
];
