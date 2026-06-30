import { z } from 'zod';
import { BaseLowCodeSchema } from '../core/schema.js';
import { deriveUpdateSchema } from '../core/utils.js';

// ──────────────────────────────────────────────────
// 18 типо-специфичных схем для полей
// Base-поля (parentId, description, required, readonly, useInSearchOrSort)
// инлайнятся напрямую вместо .merge() — Zod v4 compatibility
// ──────────────────────────────────────────────────

// 1. STRING
export const CreateStringFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  defaultValue: z.string().optional().describe('Значение по умолчанию.'),
  maxLength: z.number().optional().describe('Максимальная длина строки.'),
  minLength: z.number().optional().describe('Минимальная длина строки.'),
  pattern: z.string().optional().describe('RegExp паттерн валидации.'),
  unique: z
    .boolean()
    .optional()
    .describe('Уникальное значение (не повторяется среди других записей).'),
  multilanguage: z.boolean().optional().describe('Поддержка мультиязычности.'),
  icon: z.string().optional().describe('Иконка поля.'),
  prefix: z.string().optional().describe('Префикс (текст перед значением).'),
  suffix: z.string().optional().describe('Суффикс (текст после значения).'),
  formula: z
    .string()
    .optional()
    .describe(
      'Формула вычислений. Синтаксис: `[ИМЯ_ТИПА:ИМЯ_ПОЛЯ]` или `[_common:ИМЯ_ПОЛЯ]`.',
    ),
});

// 2. TEXT
export const CreateTextFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  formatType: z
    .enum(['PLAIN', 'HTML'])
    .default('PLAIN')
    .describe('Формат текста: PLAIN — обычный текст, HTML — форматированный.'),
  defaultValue: z.string().optional().describe('Значение по умолчанию.'),
  maxLength: z.number().optional().describe('Максимальная длина текста.'),
  minLength: z.number().optional().describe('Минимальная длина текста.'),
  multilanguage: z.boolean().optional().describe('Поддержка мультиязычности.'),
});

// 3. INTEGER
export const CreateIntegerFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  defaultValue: z
    .number()
    .int()
    .optional()
    .describe('Значение по умолчанию.'),
  minValue: z.number().int().optional().describe('Минимальное значение.'),
  maxValue: z.number().int().optional().describe('Максимальное значение.'),
  prefix: z.string().optional().describe('Префикс.'),
  suffix: z.string().optional().describe('Суффикс.'),
  unique: z.boolean().optional().describe('Уникальное значение.'),
});

// 4. DECIMAL
export const CreateDecimalFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  defaultValue: z.number().optional().describe('Значение по умолчанию.'),
  minValue: z.number().optional().describe('Минимальное значение.'),
  maxValue: z.number().optional().describe('Максимальное значение.'),
  precision: z
    .number()
    .int()
    .optional()
    .describe('Количество знаков после запятой.'),
  prefix: z.string().optional().describe('Префикс.'),
  suffix: z.string().optional().describe('Суффикс.'),
  formula: z.string().optional().describe('Формула вычислений.'),
});

// 5. BOOLEAN
export const CreateBooleanFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  defaultValue: z.boolean().optional().describe('Значение по умолчанию.'),
  displayTrueAs: z.string().optional().describe('Текст для значения true.'),
  displayFalseAs: z.string().optional().describe('Текст для значения false.'),
  displayTrueColor: z
    .string()
    .optional()
    .describe('HEX цвет для true (например, #00FF00).'),
  displayFalseColor: z
    .string()
    .optional()
    .describe('HEX цвет для false (например, #FF0000).'),
  displayFormat: z
    .enum(['ICON', 'TEXT'])
    .optional()
    .describe('Формат отображения: ICON — иконка, TEXT — текст.'),
});

// 6. DATE
export const CreateDateFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  defaultValue: z
    .string()
    .optional()
    .describe('Значение по умолчанию в формате YYYY-MM-DD.'),
  displayFormat: z
    .enum(['SHORT', 'LONG', 'FULL'])
    .optional()
    .describe('Формат отображения даты.'),
  minValue: z
    .string()
    .optional()
    .describe('Минимальная дата (YYYY-MM-DD).'),
  maxValue: z
    .string()
    .optional()
    .describe('Максимальная дата (YYYY-MM-DD).'),
});

// 7. DATETIME
export const CreateDateTimeFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  defaultValue: z
    .string()
    .optional()
    .describe('Значение по умолчанию в формате ISO 8601.'),
  displayFormat: z
    .enum(['SHORT', 'LONG', 'FULL'])
    .optional()
    .describe('Формат отображения даты и времени.'),
  minValue: z
    .string()
    .optional()
    .describe('Минимальное значение (ISO 8601).'),
  maxValue: z
    .string()
    .optional()
    .describe('Максимальное значение (ISO 8601).'),
  useTimeZone: z
    .boolean()
    .default(false)
    .describe('Использовать часовой пояс.'),
});

// 8. TIME
export const CreateTimeFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  defaultValue: z
    .string()
    .optional()
    .describe('Значение по умолчанию в формате HH:mm:ss.'),
  displayFormat: z
    .enum(['SHORT', 'LONG', 'FULL'])
    .optional()
    .describe('Формат отображения времени.'),
  minValue: z
    .string()
    .optional()
    .describe('Минимальное время (HH:mm:ss).'),
  maxValue: z
    .string()
    .optional()
    .describe('Максимальное время (HH:mm:ss).'),
});

// 9. FILE
export const CreateFileFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  downloadable: z
    .boolean()
    .default(true)
    .describe('Разрешить скачивание файла.'),
});

// 10. FILES
export const CreateFilesFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  downloadable: z
    .boolean()
    .default(true)
    .describe('Разрешить скачивание файлов.'),
});

// 11. SELECTION
export const CreateSelectionFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  referenceDataTypeId: z
    .string()
    .describe(
      'ID справочника (Reference Data Type). Сначала создай справочник через data_create_reference_data_group + data_create_reference_data_type.',
    ),
  parentSelection: z
    .string()
    .optional()
    .describe('Ключ родительского поля Selection для иерархических справочников.'),
  dateDataPropertyKey: z
    .string()
    .optional()
    .describe('Ключ поля даты для дата-специфичных справочников.'),
  formula: z
    .string()
    .optional()
    .describe('Формула для динамического значения.'),
});

// 12. MULTI_SELECTION
export const CreateMultiSelectionFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  referenceDataTypeId: z
    .string()
    .describe(
      'ID справочника (Reference Data Type). Сначала создай справочник через data_create_reference_data_group + data_create_reference_data_type.',
    ),
  parentSelection: z
    .string()
    .optional()
    .describe('Ключ родительского поля Selection для иерархических справочников.'),
  dateDataPropertyKey: z
    .string()
    .optional()
    .describe('Ключ поля даты для дата-специфичных справочников.'),
});

// 13. DATA_OBJECT
export const CreateDataObjectFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  relationModuleId: z
    .string()
    .optional()
    .describe('ID модуля, на объекты которого ссылаемся.'),
  relationObjectProperty: z
    .string()
    .optional()
    .describe('Ключ поля, по которому устанавливается связь.'),
  relationTypes: z
    .array(z.string())
    .optional()
    .describe('Массив ID типов данных, на которые можно ссылаться.'),
  viewJson: z
    .string()
    .optional()
    .describe('JSON конфигурации вьюхи выбора объекта.'),
});

// 14. DATA_OBJECTS
export const CreateDataObjectsFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  relationModuleId: z
    .string()
    .optional()
    .describe('ID модуля, на объекты которого ссылаемся.'),
  relationObjectProperty: z
    .string()
    .optional()
    .describe('Ключ поля, по которому устанавливается связь.'),
  relationTypes: z
    .array(z.string())
    .optional()
    .describe('Массив ID типов данных, на которые можно ссылаться.'),
  viewJson: z
    .string()
    .optional()
    .describe('JSON конфигурации вьюхи выбора объектов.'),
});

// 15. USER
export const CreateUserFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  filterByRoles: z
    .array(z.string())
    .optional()
    .describe('Фильтр пользователей по ролям (ID ролей).'),
  filterByDataObjectPermissions: z
    .boolean()
    .optional()
    .describe('Фильтровать по правам на объект.'),
  filterByDataTypePrivileges: z
    .boolean()
    .optional()
    .describe('Фильтровать по привилегиям типа данных.'),
  sortingFullName: z
    .boolean()
    .optional()
    .describe('Сортировать по полному имени.'),
});

// 16. USERS
export const CreateUsersFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  filterByRoles: z
    .array(z.string())
    .optional()
    .describe('Фильтр пользователей по ролям.'),
  filterByDataObjectPermissions: z
    .boolean()
    .optional()
    .describe('Фильтровать по правам на объект.'),
  filterByDataTypePrivileges: z
    .boolean()
    .optional()
    .describe('Фильтровать по привилегиям типа данных.'),
  sortingFullName: z
    .boolean()
    .optional()
    .describe('Сортировать по полному имени.'),
});

// 17. SEQUENCE
export const CreateSequenceFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  initialValue: z
    .number()
    .int()
    .describe('Начальное значение счетчика.'),
  prefix: z.string().optional().describe('Префикс номера.'),
  suffix: z.string().optional().describe('Суффикс номера.'),
  restartInterval: z
    .enum(['never', 'month', 'year'])
    .default('never')
    .describe('Интервал сброса счетчика.'),
});

// 18. ATTRIBUTES
export const CreateAttributesFieldSchema = BaseLowCodeSchema.extend({
  parentId: z
    .string()
    .describe(
      "ID родительского типа данных или модуля. Если создается в рамках одного шага, передай 'PENDING_DATA_TYPE_ID' или 'PENDING_MODULE_ID'.",
    ),
  description: z
    .string()
    .optional()
    .describe('Описание назначения поля на русском языке.'),
  required: z
    .boolean()
    .default(false)
    .describe('Является ли поле обязательным для заполнения.'),
  readonly: z
    .boolean()
    .default(false)
    .describe('Запрет на редактирование поля пользователем.'),
  useInSearchOrSort: z
    .boolean()
    .default(false)
    .describe('Использовать поле в поиске и сортировке.'),
  referenceDataTypeId: z
    .string()
    .optional()
    .describe('ID справочника, определяющего структуру атрибутов.'),
  parentSelection: z
    .string()
    .optional()
    .describe('Ключ родительского поля Selection.'),
  dateDataPropertyKey: z
    .string()
    .optional()
    .describe('Ключ поля даты.'),
});

// ──────────────────────────────────────────────────
// Update schemas (derived from create schemas)
// ──────────────────────────────────────────────────
const UPDATE_FIELD_OMIT = ['parentId', 'iconBatchId', 'brandingJson'];

export const UpdateStringFieldSchema = deriveUpdateSchema(CreateStringFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateTextFieldSchema = deriveUpdateSchema(CreateTextFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateIntegerFieldSchema = deriveUpdateSchema(CreateIntegerFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateDecimalFieldSchema = deriveUpdateSchema(CreateDecimalFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateBooleanFieldSchema = deriveUpdateSchema(CreateBooleanFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateDateFieldSchema = deriveUpdateSchema(CreateDateFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateDateTimeFieldSchema = deriveUpdateSchema(CreateDateTimeFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateTimeFieldSchema = deriveUpdateSchema(CreateTimeFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateFileFieldSchema = deriveUpdateSchema(CreateFileFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateFilesFieldSchema = deriveUpdateSchema(CreateFilesFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateSelectionFieldSchema = deriveUpdateSchema(CreateSelectionFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateMultiSelectionFieldSchema = deriveUpdateSchema(CreateMultiSelectionFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateDataObjectFieldSchema = deriveUpdateSchema(CreateDataObjectFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateDataObjectsFieldSchema = deriveUpdateSchema(CreateDataObjectsFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateUserFieldSchema = deriveUpdateSchema(CreateUserFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateUsersFieldSchema = deriveUpdateSchema(CreateUsersFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateSequenceFieldSchema = deriveUpdateSchema(CreateSequenceFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
export const UpdateAttributesFieldSchema = deriveUpdateSchema(CreateAttributesFieldSchema, { omitFields: UPDATE_FIELD_OMIT });
