import { z } from 'zod';
import {
  CreateStringFieldSchema,
  CreateTextFieldSchema,
  CreateIntegerFieldSchema,
  CreateDecimalFieldSchema,
  CreateBooleanFieldSchema,
  CreateDateFieldSchema,
  CreateDateTimeFieldSchema,
  CreateTimeFieldSchema,
  CreateFileFieldSchema,
  CreateFilesFieldSchema,
  CreateSelectionFieldSchema,
  CreateMultiSelectionFieldSchema,
  CreateDataObjectFieldSchema,
  CreateDataObjectsFieldSchema,
  CreateUserFieldSchema,
  CreateUsersFieldSchema,
  CreateSequenceFieldSchema,
  CreateAttributesFieldSchema,
  UpdateStringFieldSchema,
  UpdateTextFieldSchema,
  UpdateIntegerFieldSchema,
  UpdateDecimalFieldSchema,
  UpdateBooleanFieldSchema,
  UpdateDateFieldSchema,
  UpdateDateTimeFieldSchema,
  UpdateTimeFieldSchema,
  UpdateFileFieldSchema,
  UpdateFilesFieldSchema,
  UpdateSelectionFieldSchema,
  UpdateMultiSelectionFieldSchema,
  UpdateDataObjectFieldSchema,
  UpdateDataObjectsFieldSchema,
  UpdateUserFieldSchema,
  UpdateUsersFieldSchema,
  UpdateSequenceFieldSchema,
  UpdateAttributesFieldSchema,
} from './schema.js';
import { rabisClient } from '../../../shared/services/rabisClient.service.js';
import { success, error, toLocalizedJson } from '../core/utils.js';
import { defineTool } from '../../../shared/utils/base.js';
import type { ToolDef } from '../core/schema.js';

// ─── Factory: build create handler ───
// required НЕ передаётся в мутацию — контролируется UI-слоем.
function buildCreateHandler(
  mutation: string,
  fieldLabel: string,
  getTypeArgs: (a: Record<string, any>) => Record<string, any>,
) {
  return async (a: Record<string, any>) => {
    try {
      const r = await (rabisClient.chain.mutation as any)
        [mutation]({
          dataProperty: {
            displayName: toLocalizedJson(a.displayName),
            name: a.name,
            parentId: a.parentId,
            description: toLocalizedJson(a.description),
            readonly: a.readonly,
            useInSearchOrSort: a.useInSearchOrSort,
            ...getTypeArgs(a),
          },
        })
        .get({ id: true, name: true });
      return success(r.id, `${fieldLabel} создано`);
    } catch (e) {
      return error(e, `Ошибка создания ${fieldLabel.toLowerCase()}`);
    }
  };
}

// ─── Factory: build update handler ───
// required НЕ передаётся в мутацию — контролируется UI-слоем.
function buildUpdateHandler(mutation: string, label: string) {
  const inputKey = 'dataProperty';
  return async (a: Record<string, any>) => {
    try {
      const localized: Record<string, any> = { id: a.id };
      if (a.displayName) localized.displayName = toLocalizedJson(a.displayName);
      if (a.description) localized.description = toLocalizedJson(a.description);
      for (const [key, value] of Object.entries(a)) {
        if (
          key === 'id' ||
          key === 'displayName' ||
          key === 'description' ||
          key === 'required'
        )
          continue;
        if (value !== undefined && value !== null) {
          localized[key] = value;
        }
      }
      const r = await (rabisClient.chain.mutation as any)
        [mutation]({ [inputKey]: localized })
        .get({ id: true, name: true });
      return success(r.id, `${label} обновлено`);
    } catch (e) {
      return error(e, `Ошибка обновления ${label.toLowerCase()}`);
    }
  };
}

// ─── CREATE handlers (18) ───

const handleString = buildCreateHandler(
  'createDataPropertyString',
  'Строковое поле',
  (a) => ({
    defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
    formula: a.formula,
    maxLength: a.maxLength,
    minLength: a.minLength,
    pattern: a.pattern,
    unique: a.unique,
    multilanguage: a.multilanguage,
    icon: a.icon,
    prefix: a.prefix,
    suffix: a.suffix,
  }),
);

const handleText = buildCreateHandler(
  'createDataPropertyText',
  'Текстовое поле',
  (a) => ({
    formatType: a.formatType,
    defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
    maxLength: a.maxLength,
    minLength: a.minLength,
    multilanguage: a.multilanguage,
  }),
);

const handleInteger = buildCreateHandler(
  'createDataPropertyInteger',
  'Целочисленное поле',
  (a) => ({
    defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
    minValue: a.minValue ? { value: a.minValue } : undefined,
    maxValue: a.maxValue ? { value: a.maxValue } : undefined,
    prefix: a.prefix,
    suffix: a.suffix,
    unique: a.unique,
  }),
);

const handleDecimal = buildCreateHandler(
  'createDataPropertyDecimal',
  'Десятичное поле',
  (a) => ({
    defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
    minValue: a.minValue ? { value: a.minValue } : undefined,
    maxValue: a.maxValue ? { value: a.maxValue } : undefined,
    precision: a.precision,
    prefix: a.prefix,
    suffix: a.suffix,
    formula: a.formula,
  }),
);

const handleBoolean = buildCreateHandler(
  'createDataPropertyBoolean',
  'Логическое поле',
  (a) => ({
    defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
    displayTrueAs: a.displayTrueAs,
    displayFalseAs: a.displayFalseAs,
    displayTrueColor: a.displayTrueColor,
    displayFalseColor: a.displayFalseColor,
    displayFormat: a.displayFormat,
  }),
);

const handleDate = buildCreateHandler(
  'createDataPropertyDate',
  'Поле даты',
  (a) => ({
    defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
    displayFormat: a.displayFormat,
    minValue: a.minValue ? { value: a.minValue } : undefined,
    maxValue: a.maxValue ? { value: a.maxValue } : undefined,
  }),
);

const handleDateTime = buildCreateHandler(
  'createDataPropertyDateTime',
  'Поле даты и времени',
  (a) => ({
    defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
    displayFormat: a.displayFormat,
    minValue: a.minValue ? { value: a.minValue } : undefined,
    maxValue: a.maxValue ? { value: a.maxValue } : undefined,
    useTimeZone: a.useTimeZone,
  }),
);

const handleTime = buildCreateHandler(
  'createDataPropertyTime',
  'Поле времени',
  (a) => ({
    defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
    displayFormat: a.displayFormat,
    minValue: a.minValue ? { value: a.minValue } : undefined,
    maxValue: a.maxValue ? { value: a.maxValue } : undefined,
  }),
);

const handleFile = buildCreateHandler(
  'createDataPropertyFile',
  'Файловое поле',
  (a) => ({
    downloadable: a.downloadable,
  }),
);

const handleFiles = buildCreateHandler(
  'createDataPropertyFiles',
  'Поле множественных файлов',
  (a) => ({
    downloadable: a.downloadable,
  }),
);

const handleSelection = buildCreateHandler(
  'createDataPropertySelection',
  'Поле выбора (Selection)',
  (a) => ({
    referenceDataTypeId: a.referenceDataTypeId,
    parentSelection: a.parentSelection,
    dateDataPropertyKey: a.dateDataPropertyKey,
    formula: a.formula,
  }),
);

const handleMultiSelection = buildCreateHandler(
  'createDataPropertyMultiSelection',
  'Поле множественного выбора (MultiSelection)',
  (a) => ({
    referenceDataTypeId: a.referenceDataTypeId,
    parentSelection: a.parentSelection,
    dateDataPropertyKey: a.dateDataPropertyKey,
  }),
);

const handleDataObject = buildCreateHandler(
  'createDataPropertyObject',
  'Поле-ссылка на объект (DataObject)',
  (a) => ({
    relationModuleId: a.relationModuleId,
    relationObjectProperty: a.relationObjectProperty,
    relationTypes: a.relationTypes,
    viewJson: a.viewJson,
  }),
);

const handleDataObjects = buildCreateHandler(
  'createDataPropertyObjects',
  'Поле-ссылка на объекты (DataObjects)',
  (a) => ({
    relationModuleId: a.relationModuleId,
    relationObjectProperty: a.relationObjectProperty,
    relationTypes: a.relationTypes,
    viewJson: a.viewJson,
  }),
);

const handleUser = buildCreateHandler(
  'createDataPropertyUser',
  'Поле пользователя (User)',
  (a) => ({
    filterByRoles: a.filterByRoles,
    filterByDataObjectPermissions: a.filterByDataObjectPermissions,
    filterByDataTypePrivileges: a.filterByDataTypePrivileges,
    sortingFullName: a.sortingFullName,
  }),
);

const handleUsers = buildCreateHandler(
  'createDataPropertyUsers',
  'Поле пользователей (Users)',
  (a) => ({
    filterByRoles: a.filterByRoles,
    filterByDataObjectPermissions: a.filterByDataObjectPermissions,
    filterByDataTypePrivileges: a.filterByDataTypePrivileges,
    sortingFullName: a.sortingFullName,
  }),
);

const handleSequence = buildCreateHandler(
  'createDataPropertySequence',
  'Поле-счётчик (Sequence)',
  (a) => ({
    initialValue: a.initialValue,
    prefix: a.prefix,
    suffix: a.suffix,
    restartInterval: a.restartInterval,
  }),
);

const handleAttributes = buildCreateHandler(
  'createDataPropertyAttributes',
  'Поле атрибутов (Attributes)',
  (a) => ({
    referenceDataTypeId: a.referenceDataTypeId,
    parentSelection: a.parentSelection,
    dateDataPropertyKey: a.dateDataPropertyKey,
  }),
);

// ─── UPDATE handlers (18) ───

const handleUpdateString = buildUpdateHandler(
  'updateDataPropertyString',
  'Строковое поле',
);
const handleUpdateText = buildUpdateHandler(
  'updateDataPropertyText',
  'Текстовое поле',
);
const handleUpdateInteger = buildUpdateHandler(
  'updateDataPropertyInteger',
  'Целочисленное поле',
);
const handleUpdateDecimal = buildUpdateHandler(
  'updateDataPropertyDecimal',
  'Десятичное поле',
);
const handleUpdateBoolean = buildUpdateHandler(
  'updateDataPropertyBoolean',
  'Логическое поле',
);
const handleUpdateDate = buildUpdateHandler(
  'updateDataPropertyDate',
  'Поле даты',
);
const handleUpdateDateTime = buildUpdateHandler(
  'updateDataPropertyDateTime',
  'Поле даты и времени',
);
const handleUpdateTime = buildUpdateHandler(
  'updateDataPropertyTime',
  'Поле времени',
);
const handleUpdateFile = buildUpdateHandler(
  'updateDataPropertyFile',
  'Файловое поле',
);
const handleUpdateFiles = buildUpdateHandler(
  'updateDataPropertyFiles',
  'Поле множественных файлов',
);
const handleUpdateSelection = buildUpdateHandler(
  'updateDataPropertySelection',
  'Поле выбора',
);
const handleUpdateMultiSelection = buildUpdateHandler(
  'updateDataPropertyMultiSelection',
  'Поле множественного выбора',
);
const handleUpdateDataObject = buildUpdateHandler(
  'updateDataPropertyObject',
  'Поле-ссылка на объект',
);
const handleUpdateDataObjects = buildUpdateHandler(
  'updateDataPropertyObjects',
  'Поле-ссылка на объекты',
);
const handleUpdateUser = buildUpdateHandler(
  'updateDataPropertyUser',
  'Поле пользователя',
);
const handleUpdateUsers = buildUpdateHandler(
  'updateDataPropertyUsers',
  'Поле пользователей',
);
const handleUpdateSequence = buildUpdateHandler(
  'updateDataPropertySequence',
  'Поле-счётчик',
);
const handleUpdateAttributes = buildUpdateHandler(
  'updateDataPropertyAttributes',
  'Поле атрибутов',
);

export const fieldTools: ToolDef[] = [
  // CREATE tools
  defineTool(
    'data_create_string_field',
    {
      title: 'Create String Field',
      description:
        'Создаёт строковое поле. Поддерживает: maxLength, pattern, unique, multilanguage, formula.',
      inputSchema: CreateStringFieldSchema,
    },
    handleString,
  ),
  defineTool(
    'data_create_text_field',
    {
      title: 'Create Text Field',
      description:
        'Создаёт текстовое поле (длинный текст). Поддерживает formatType (PLAIN / HTML).',
      inputSchema: CreateTextFieldSchema,
    },
    handleText,
  ),
  defineTool(
    'data_create_integer_field',
    {
      title: 'Create Integer Field',
      description:
        'Создаёт целочисленное поле. Поддерживает minValue, maxValue, unique.',
      inputSchema: CreateIntegerFieldSchema,
    },
    handleInteger,
  ),
  defineTool(
    'data_create_decimal_field',
    {
      title: 'Create Decimal Field',
      description:
        'Создаёт десятичное поле. Поддерживает precision, minValue, maxValue, formula.',
      inputSchema: CreateDecimalFieldSchema,
    },
    handleDecimal,
  ),
  defineTool(
    'data_create_boolean_field',
    {
      title: 'Create Boolean Field',
      description:
        'Создаёт логическое поле (true/false). С кастомизацией текста и цвета.',
      inputSchema: CreateBooleanFieldSchema,
    },
    handleBoolean,
  ),
  defineTool(
    'data_create_date_field',
    {
      title: 'Create Date Field',
      description: 'Создаёт поле даты. displayFormat (SHORT/LONG/FULL).',
      inputSchema: CreateDateFieldSchema,
    },
    handleDate,
  ),
  defineTool(
    'data_create_datetime_field',
    {
      title: 'Create DateTime Field',
      description: 'Создаёт поле даты и времени. displayFormat, useTimeZone.',
      inputSchema: CreateDateTimeFieldSchema,
    },
    handleDateTime,
  ),
  defineTool(
    'data_create_time_field',
    {
      title: 'Create Time Field',
      description: 'Создаёт поле времени. displayFormat, minValue, maxValue.',
      inputSchema: CreateTimeFieldSchema,
    },
    handleTime,
  ),
  defineTool(
    'data_create_file_field',
    {
      title: 'Create File Field',
      description: 'Создаёт файловое поле (один файл). downloadable.',
      inputSchema: CreateFileFieldSchema,
    },
    handleFile,
  ),
  defineTool(
    'data_create_files_field',
    {
      title: 'Create Files Field',
      description: 'Создаёт поле множественных файлов. downloadable.',
      inputSchema: CreateFilesFieldSchema,
    },
    handleFiles,
  ),
  defineTool(
    'data_create_selection_field',
    {
      title: 'Create Selection Field',
      description:
        'Создаёт поле выбора из справочника. Требует referenceDataTypeId.',
      inputSchema: CreateSelectionFieldSchema,
    },
    handleSelection,
  ),
  defineTool(
    'data_create_multi_selection_field',
    {
      title: 'Create MultiSelection Field',
      description:
        'Создаёт поле множественного выбора из справочника. Требует referenceDataTypeId.',
      inputSchema: CreateMultiSelectionFieldSchema,
    },
    handleMultiSelection,
  ),
  defineTool(
    'data_create_data_object_field',
    {
      title: 'Create DataObject Reference Field',
      description: 'Создаёт поле-ссылку на один объект другого типа.',
      inputSchema: CreateDataObjectFieldSchema,
    },
    handleDataObject,
  ),
  defineTool(
    'data_create_data_objects_field',
    {
      title: 'Create DataObjects Reference Field',
      description: 'Создаёт поле-ссылку на несколько объектов.',
      inputSchema: CreateDataObjectsFieldSchema,
    },
    handleDataObjects,
  ),
  defineTool(
    'data_create_user_field',
    {
      title: 'Create User Field',
      description: 'Создаёт поле выбора пользователя. С фильтрацией по ролям.',
      inputSchema: CreateUserFieldSchema,
    },
    handleUser,
  ),
  defineTool(
    'data_create_users_field',
    {
      title: 'Create Users Field',
      description:
        'Создаёт поле выбора нескольких пользователей. С фильтрацией по ролям.',
      inputSchema: CreateUsersFieldSchema,
    },
    handleUsers,
  ),
  defineTool(
    'data_create_sequence_field',
    {
      title: 'Create Sequence Field',
      description: 'Создаёт поле-автонумерацию. Требует initialValue.',
      inputSchema: CreateSequenceFieldSchema,
    },
    handleSequence,
  ),
  defineTool(
    'data_create_attributes_field',
    {
      title: 'Create Attributes Field',
      description: 'Создаёт поле-набор атрибутов на основе справочника.',
      inputSchema: CreateAttributesFieldSchema,
    },
    handleAttributes,
  ),

  // UPDATE tools
  defineTool(
    'data_update_string_field',
    {
      title: 'Update String Field',
      description: 'Обновляет строковое поле.',
      inputSchema: UpdateStringFieldSchema,
    },
    handleUpdateString,
  ),
  defineTool(
    'data_update_text_field',
    {
      title: 'Update Text Field',
      description: 'Обновляет текстовое поле.',
      inputSchema: UpdateTextFieldSchema,
    },
    handleUpdateText,
  ),
  defineTool(
    'data_update_integer_field',
    {
      title: 'Update Integer Field',
      description: 'Обновляет целочисленное поле.',
      inputSchema: UpdateIntegerFieldSchema,
    },
    handleUpdateInteger,
  ),
  defineTool(
    'data_update_decimal_field',
    {
      title: 'Update Decimal Field',
      description: 'Обновляет десятичное поле.',
      inputSchema: UpdateDecimalFieldSchema,
    },
    handleUpdateDecimal,
  ),
  defineTool(
    'data_update_boolean_field',
    {
      title: 'Update Boolean Field',
      description: 'Обновляет логическое поле.',
      inputSchema: UpdateBooleanFieldSchema,
    },
    handleUpdateBoolean,
  ),
  defineTool(
    'data_update_date_field',
    {
      title: 'Update Date Field',
      description: 'Обновляет поле даты.',
      inputSchema: UpdateDateFieldSchema,
    },
    handleUpdateDate,
  ),
  defineTool(
    'data_update_datetime_field',
    {
      title: 'Update DateTime Field',
      description: 'Обновляет поле даты и времени.',
      inputSchema: UpdateDateTimeFieldSchema,
    },
    handleUpdateDateTime,
  ),
  defineTool(
    'data_update_time_field',
    {
      title: 'Update Time Field',
      description: 'Обновляет поле времени.',
      inputSchema: UpdateTimeFieldSchema,
    },
    handleUpdateTime,
  ),
  defineTool(
    'data_update_file_field',
    {
      title: 'Update File Field',
      description: 'Обновляет файловое поле.',
      inputSchema: UpdateFileFieldSchema,
    },
    handleUpdateFile,
  ),
  defineTool(
    'data_update_files_field',
    {
      title: 'Update Files Field',
      description: 'Обновляет поле множественных файлов.',
      inputSchema: UpdateFilesFieldSchema,
    },
    handleUpdateFiles,
  ),
  defineTool(
    'data_update_selection_field',
    {
      title: 'Update Selection Field',
      description: 'Обновляет поле выбора.',
      inputSchema: UpdateSelectionFieldSchema,
    },
    handleUpdateSelection,
  ),
  defineTool(
    'data_update_multi_selection_field',
    {
      title: 'Update MultiSelection Field',
      description: 'Обновляет поле множественного выбора.',
      inputSchema: UpdateMultiSelectionFieldSchema,
    },
    handleUpdateMultiSelection,
  ),
  defineTool(
    'data_update_data_object_field',
    {
      title: 'Update DataObject Reference Field',
      description: 'Обновляет поле-ссылку на объект.',
      inputSchema: UpdateDataObjectFieldSchema,
    },
    handleUpdateDataObject,
  ),
  defineTool(
    'data_update_data_objects_field',
    {
      title: 'Update DataObjects Reference Field',
      description: 'Обновляет поле-ссылку на объекты.',
      inputSchema: UpdateDataObjectsFieldSchema,
    },
    handleUpdateDataObjects,
  ),
  defineTool(
    'data_update_user_field',
    {
      title: 'Update User Field',
      description: 'Обновляет поле пользователя.',
      inputSchema: UpdateUserFieldSchema,
    },
    handleUpdateUser,
  ),
  defineTool(
    'data_update_users_field',
    {
      title: 'Update Users Field',
      description: 'Обновляет поле пользователей.',
      inputSchema: UpdateUsersFieldSchema,
    },
    handleUpdateUsers,
  ),
  defineTool(
    'data_update_sequence_field',
    {
      title: 'Update Sequence Field',
      description: 'Обновляет поле-счётчик.',
      inputSchema: UpdateSequenceFieldSchema,
    },
    handleUpdateSequence,
  ),
  defineTool(
    'data_update_attributes_field',
    {
      title: 'Update Attributes Field',
      description: 'Обновляет поле атрибутов.',
      inputSchema: UpdateAttributesFieldSchema,
    },
    handleUpdateAttributes,
  ),
];
