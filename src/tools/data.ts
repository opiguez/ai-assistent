// Описание доступных инструментов (Tools) для Шага 1 (DATA)
export const dataTools: any[] = [
  {
    type: 'function',
    function: {
      name: 'createModule',
      description:
        'Создает новый модуль. Вызывай, если аналогичного модуля еще нет.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Название модуля на русском (например, "Склад")',
          },
          code: {
            type: 'string',
            description: 'Код латиницей (например, "warehouse")',
          },
        },
        required: ['name', 'code'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'createDataType',
      description: 'Создает тип данных (сущность) внутри модуля.',
      parameters: {
        type: 'object',
        properties: {
          moduleId: {
            type: 'string',
            description:
              'ID модуля. Если модуль создается прямо сейчас, передай "PENDING_MODULE_ID"',
          },
          name: {
            type: 'string',
            description: 'Название типа (например, "Товар")',
          },
          code: {
            type: 'string',
            description: 'Код латиницей (например, "product")',
          },
          isHierarchical: {
            type: 'boolean',
            description:
              'True, если сущность имеет древовидную структуру (например, Категории)',
          },
        },
        required: ['moduleId', 'name', 'code'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'createModuleField',
      description:
        'Создает ОБЩЕЕ поле на уровне Модуля. Все типы данных внутри этого модуля автоматически унаследуют это поле. Вызывай, только если поле должно быть сквозным для всех сущностей модуля.',
      parameters: {
        type: 'object',
        properties: {
          moduleId: {
            type: 'string',
            description:
              "ID модуля, для которого создается общее поле. Если модуль создается в этом же шаге, передай 'PENDING_MODULE_ID'",
          },
          name: {
            type: 'string',
            description:
              "Название общего поля на русском (например, 'Дата создания', 'Автор изменения')",
          },
          code: {
            type: 'string',
            description:
              "Код поля латиницей в camelCase (например, 'createdAt', 'updatedBy')",
          },
          fieldType: {
            type: 'string',
            enum: [
              'text',
              'number',
              'boolean',
              'datetime',
              'relation',
              'file',
              'dictionary',
            ],
            description: 'Системный тип данных для этого общего поля.',
          },
        },
        required: ['moduleId', 'name', 'code', 'fieldType'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'createDataTypeField',
      description:
        'Создает СПЕЦИФИЧНОЕ поле внутри конкретного Типа Данных (сущности). Вызывай для описания уникальных атрибутов объекта.',
      parameters: {
        type: 'object',
        properties: {
          dataTypeId: {
            type: 'string',
            description:
              "ID типа данных (сущности), куда добавляется поле. Если тип создается в этом же шаге, передай 'PENDING_DATA_TYPE_ID'",
          },
          name: {
            type: 'string',
            description:
              "Название поля на русском (например, 'Цена товара', 'Госномер')",
          },
          code: {
            type: 'string',
            description:
              "Код поля латиницей в camelCase (например, 'price', 'plateNumber')",
          },
          fieldType: {
            type: 'string',
            enum: [
              'text',
              'number',
              'boolean',
              'datetime',
              'relation',
              'file',
              'dictionary',
              'json',
            ],
            description:
              'Строгий системный тип данных поля. Выбирай на основе бизнес-логики.',
          },
          isNullable: {
            type: 'boolean',
            description:
              'Может ли поле быть пустым. По умолчанию true. Если поле обязательное (например, Название), передай false.',
          },
        },
        required: ['dataTypeId', 'name', 'code', 'fieldType'],
      },
    },
  },
];
