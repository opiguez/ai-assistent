//# Клиент к вашей Low-Code системе
// Заглушка для получения текущего состояния No-Code платформы из GraphQL
export const getGraphQLStateMock = async () => {
  return {
    existingModules: [
      {
        id: 'mod_warehouse_uuid_111',
        name: 'Складской учет',
        code: 'warehouse',
        workspaces: [
          {
            id: 'ws_default_uuid_222',
            name: 'Дефолтная рабочая область',
            code: 'default',
          },
        ],
        dataTypes: [
          {
            id: 'dt_product_uuid_333',
            name: 'Товар',
            code: 'product',
            isHierarchical: false,
            fields: [
              { name: 'ID', code: 'id', fieldType: 'text' },
              { name: 'Наименование', code: 'title', fieldType: 'text' },
              { name: 'Цена', code: 'price', fieldType: 'number' },
            ],
          },
        ],
      },
    ],
  };
};
