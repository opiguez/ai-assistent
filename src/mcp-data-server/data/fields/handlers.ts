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
import type { ToolDef } from '../core/entity-builder.js';

// ─── Helper to build update handler ───
function buildFieldUpdateHandler(mutation: string, label: string) {
  const inputKey = 'dataProperty';
  return async (a: any) => {
    try {
      const localized = { ...a };
      if (localized.displayName)
        localized.displayName = toLocalizedJson(a.displayName);
      if (localized.description)
        localized.description = toLocalizedJson(a.description);
      const r = await (rabisClient.chain.mutation as any)
        [mutation]({ [inputKey]: localized })
        .get({ id: true, name: true });
      return success(r.id, `${label} обновлено`);
    } catch (e) {
      return error(e, `Ошибка обновления ${label.toLowerCase()}`);
    }
  };
}

// ─── 1. STRING ───
type StringArgs = z.infer<typeof CreateStringFieldSchema>;
const handleString = async (a: StringArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyString({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
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
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Строковое поле создано');
  } catch (e) {
    return error(e, 'Ошибка создания строкового поля');
  }
};
const handleUpdateString = buildFieldUpdateHandler(
  'updateDataPropertyString',
  'Строковое поле',
);

// ─── 2. TEXT ───
type TextArgs = z.infer<typeof CreateTextFieldSchema>;
const handleText = async (a: TextArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyText({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          formatType: a.formatType,
          defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
          maxLength: a.maxLength,
          minLength: a.minLength,
          multilanguage: a.multilanguage,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Текстовое поле создано');
  } catch (e) {
    return error(e, 'Ошибка создания текстового поля');
  }
};
const handleUpdateText = buildFieldUpdateHandler(
  'updateDataPropertyText',
  'Текстовое поле',
);

// ─── 3. INTEGER ───
type IntegerArgs = z.infer<typeof CreateIntegerFieldSchema>;
const handleInteger = async (a: IntegerArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyInteger({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
          minValue: a.minValue ? { value: a.minValue } : undefined,
          maxValue: a.maxValue ? { value: a.maxValue } : undefined,
          prefix: a.prefix,
          suffix: a.suffix,
          unique: a.unique,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Целочисленное поле создано');
  } catch (e) {
    return error(e, 'Ошибка создания целочисленного поля');
  }
};
const handleUpdateInteger = buildFieldUpdateHandler(
  'updateDataPropertyInteger',
  'Целочисленное поле',
);

// ─── 4. DECIMAL ───
type DecimalArgs = z.infer<typeof CreateDecimalFieldSchema>;
const handleDecimal = async (a: DecimalArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyDecimal({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
          minValue: a.minValue ? { value: a.minValue } : undefined,
          maxValue: a.maxValue ? { value: a.maxValue } : undefined,
          precision: a.precision,
          prefix: a.prefix,
          suffix: a.suffix,
          formula: a.formula,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Десятичное поле создано');
  } catch (e) {
    return error(e, 'Ошибка создания десятичного поля');
  }
};
const handleUpdateDecimal = buildFieldUpdateHandler(
  'updateDataPropertyDecimal',
  'Десятичное поле',
);

// ─── 5. BOOLEAN ───
type BooleanArgs = z.infer<typeof CreateBooleanFieldSchema>;
const handleBoolean = async (a: BooleanArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyBoolean({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
          displayTrueAs: a.displayTrueAs,
          displayFalseAs: a.displayFalseAs,
          displayTrueColor: a.displayTrueColor,
          displayFalseColor: a.displayFalseColor,
          displayFormat: a.displayFormat,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Логическое поле создано');
  } catch (e) {
    return error(e, 'Ошибка создания логического поля');
  }
};
const handleUpdateBoolean = buildFieldUpdateHandler(
  'updateDataPropertyBoolean',
  'Логическое поле',
);

// ─── 6. DATE ───
type DateArgs = z.infer<typeof CreateDateFieldSchema>;
const handleDate = async (a: DateArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyDate({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
          displayFormat: a.displayFormat,
          minValue: a.minValue ? { value: a.minValue } : undefined,
          maxValue: a.maxValue ? { value: a.maxValue } : undefined,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Поле даты создано');
  } catch (e) {
    return error(e, 'Ошибка создания поля даты');
  }
};
const handleUpdateDate = buildFieldUpdateHandler(
  'updateDataPropertyDate',
  'Поле даты',
);

// ─── 7. DATETIME ───
type DateTimeArgs = z.infer<typeof CreateDateTimeFieldSchema>;
const handleDateTime = async (a: DateTimeArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyDateTime({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
          displayFormat: a.displayFormat,
          minValue: a.minValue ? { value: a.minValue } : undefined,
          maxValue: a.maxValue ? { value: a.maxValue } : undefined,
          useTimeZone: a.useTimeZone,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Поле даты и времени создано');
  } catch (e) {
    return error(e, 'Ошибка создания поля даты и времени');
  }
};
const handleUpdateDateTime = buildFieldUpdateHandler(
  'updateDataPropertyDateTime',
  'Поле даты и времени',
);

// ─── 8. TIME ───
type TimeArgs = z.infer<typeof CreateTimeFieldSchema>;
const handleTime = async (a: TimeArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyTime({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          defaultValue: a.defaultValue ? { value: a.defaultValue } : undefined,
          displayFormat: a.displayFormat,
          minValue: a.minValue ? { value: a.minValue } : undefined,
          maxValue: a.maxValue ? { value: a.maxValue } : undefined,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Поле времени создано');
  } catch (e) {
    return error(e, 'Ошибка создания поля времени');
  }
};
const handleUpdateTime = buildFieldUpdateHandler(
  'updateDataPropertyTime',
  'Поле времени',
);

// ─── 9. FILE ───
type FileArgs = z.infer<typeof CreateFileFieldSchema>;
const handleFile = async (a: FileArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyFile({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          downloadable: a.downloadable,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Файловое поле создано');
  } catch (e) {
    return error(e, 'Ошибка создания файлового поля');
  }
};
const handleUpdateFile = buildFieldUpdateHandler(
  'updateDataPropertyFile',
  'Файловое поле',
);

// ─── 10. FILES ───
type FilesArgs = z.infer<typeof CreateFilesFieldSchema>;
const handleFiles = async (a: FilesArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyFiles({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          downloadable: a.downloadable,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Поле множественных файлов создано');
  } catch (e) {
    return error(e, 'Ошибка создания поля множественных файлов');
  }
};
const handleUpdateFiles = buildFieldUpdateHandler(
  'updateDataPropertyFiles',
  'Поле множественных файлов',
);

// ─── 11. SELECTION ───
type SelArgs = z.infer<typeof CreateSelectionFieldSchema>;
const handleSelection = async (a: SelArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertySelection({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          referenceDataTypeId: a.referenceDataTypeId,
          parentSelection: a.parentSelection,
          dateDataPropertyKey: a.dateDataPropertyKey,
          formula: a.formula,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Поле выбора (Selection) создано');
  } catch (e) {
    return error(e, 'Ошибка создания поля выбора');
  }
};
const handleUpdateSelection = buildFieldUpdateHandler(
  'updateDataPropertySelection',
  'Поле выбора',
);

// ─── 12. MULTI_SELECTION ───
type MultiSelArgs = z.infer<typeof CreateMultiSelectionFieldSchema>;
const handleMultiSelection = async (a: MultiSelArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyMultiSelection({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          referenceDataTypeId: a.referenceDataTypeId,
          parentSelection: a.parentSelection,
          dateDataPropertyKey: a.dateDataPropertyKey,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Поле множественного выбора (MultiSelection) создано');
  } catch (e) {
    return error(e, 'Ошибка создания поля множественного выбора');
  }
};
const handleUpdateMultiSelection = buildFieldUpdateHandler(
  'updateDataPropertyMultiSelection',
  'Поле множественного выбора',
);

// ─── 13. DATA_OBJECT ───
type ObjArgs = z.infer<typeof CreateDataObjectFieldSchema>;
const handleDataObject = async (a: ObjArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyObject({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          relationModuleId: a.relationModuleId,
          relationObjectProperty: a.relationObjectProperty,
          relationTypes: a.relationTypes,
          viewJson: a.viewJson,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Поле-ссылка на объект (DataObject) создано');
  } catch (e) {
    return error(e, 'Ошибка создания поля-ссылки на объект');
  }
};
const handleUpdateDataObject = buildFieldUpdateHandler(
  'updateDataPropertyObject',
  'Поле-ссылка на объект',
);

// ─── 14. DATA_OBJECTS ───
type ObjsArgs = z.infer<typeof CreateDataObjectsFieldSchema>;
const handleDataObjects = async (a: ObjsArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyObjects({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          relationModuleId: a.relationModuleId,
          relationObjectProperty: a.relationObjectProperty,
          relationTypes: a.relationTypes,
          viewJson: a.viewJson,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Поле-ссылка на объекты (DataObjects) создано');
  } catch (e) {
    return error(e, 'Ошибка создания поля-ссылки на объекты');
  }
};
const handleUpdateDataObjects = buildFieldUpdateHandler(
  'updateDataPropertyObjects',
  'Поле-ссылка на объекты',
);

// ─── 15. USER ───
type UserArgs = z.infer<typeof CreateUserFieldSchema>;
const handleUser = async (a: UserArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyUser({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          filterByRoles: a.filterByRoles,
          filterByDataObjectPermissions: a.filterByDataObjectPermissions,
          filterByDataTypePrivileges: a.filterByDataTypePrivileges,
          sortingFullName: a.sortingFullName,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Поле пользователя (User) создано');
  } catch (e) {
    return error(e, 'Ошибка создания поля пользователя');
  }
};
const handleUpdateUser = buildFieldUpdateHandler(
  'updateDataPropertyUser',
  'Поле пользователя',
);

// ─── 16. USERS ───
type UsersArgs = z.infer<typeof CreateUsersFieldSchema>;
const handleUsers = async (a: UsersArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyUsers({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          filterByRoles: a.filterByRoles,
          filterByDataObjectPermissions: a.filterByDataObjectPermissions,
          filterByDataTypePrivileges: a.filterByDataTypePrivileges,
          sortingFullName: a.sortingFullName,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Поле пользователей (Users) создано');
  } catch (e) {
    return error(e, 'Ошибка создания поля пользователей');
  }
};
const handleUpdateUsers = buildFieldUpdateHandler(
  'updateDataPropertyUsers',
  'Поле пользователей',
);

// ─── 17. SEQUENCE ───
type SeqArgs = z.infer<typeof CreateSequenceFieldSchema>;
const handleSequence = async (a: SeqArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertySequence({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          initialValue: a.initialValue,
          prefix: a.prefix,
          suffix: a.suffix,
          restartInterval: a.restartInterval,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Поле-счётчик (Sequence) создано');
  } catch (e) {
    return error(e, 'Ошибка создания поля-счётчика');
  }
};
const handleUpdateSequence = buildFieldUpdateHandler(
  'updateDataPropertySequence',
  'Поле-счётчик',
);

// ─── 18. ATTRIBUTES ───
type AttrArgs = z.infer<typeof CreateAttributesFieldSchema>;
const handleAttributes = async (a: AttrArgs) => {
  try {
    const r = await rabisClient.chain.mutation
      .createDataPropertyAttributes({
        dataProperty: {
          displayName: toLocalizedJson(a.displayName),
          name: a.name,
          parentId: a.parentId,
          description: toLocalizedJson(a.description),
          required: a.required,
          readonly: a.readonly,
          useInSearchOrSort: a.useInSearchOrSort,
          referenceDataTypeId: a.referenceDataTypeId,
          parentSelection: a.parentSelection,
          dateDataPropertyKey: a.dateDataPropertyKey,
        },
      })
      .get({ id: true, name: true });
    return success(r.id, 'Поле атрибутов (Attributes) создано');
  } catch (e) {
    return error(e, 'Ошибка создания поля атрибутов');
  }
};
const handleUpdateAttributes = buildFieldUpdateHandler(
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
