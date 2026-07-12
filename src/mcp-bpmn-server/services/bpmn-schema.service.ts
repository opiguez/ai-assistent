/**
 * BPMN Schema Service
 * Работает с GraphQL API для чтения/записи BPMN схем.
 * Использует rabisClient (genql) для запросов.
 */
import { BPMNModel } from 'bpmn-moddle';
import {
  authBuffer,
  ENDPOINT,
  rabisClient,
} from '../../shared/services/rabisClient.service.js';
import { bpmnXmlService } from './bpmn-xml.service.js';
import {
  BpmnMessage,
  DataPropertyAttributes,
  Group,
  PostTemplate,
  User,
  View,
} from '../../generated/client/schema.js';
import { enumMetadataObjectStatusEnum } from '../../generated/client/index.js';
import axios from 'axios';

// ─── Types ────────────────────────────────────────────────
export interface BpmnProcessData {
  dataTypeId: string;
  name: string;
  displayName: string;
  bpmnXml: string;
  decorJson: string;
  valid: boolean;
  validationResults: Record<string, any> | null;
  bpmnMessages: BpmnMessage[];
  dataTypeProperties: {
    singleSelect: Record<string, any>;
    multipleSelect: Record<string, any>;
    realNumber: Record<string, any>;
    DATA_OBJECT: Record<string, any>;
    genericProperties: Record<string, any>;
  };
  rdmStructures: Record<
    string,
    {
      rdmObjects: Array<Record<string, any>>;
    }
  >;
  postTemplates: PostTemplate[];
  userGroups: Array<Partial<Group>>;
  users: Array<Partial<User>>;
  views: View[];
}

export interface BpmnProcessState {
  parsed: BPMNModel;
  model: Record<string, Record<string, any>>;
  data: BpmnProcessData;
}

export interface SaveBpmnInput {
  dataTypeId: string;
  xml: string;
  decor: string; // JSON string of the custom model
}

// ─── Service ──────────────────────────────────────────────

interface CacheEntry {
  state: BpmnProcessState;
  timestamp: number;
}

const processCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60 * 1000; // 60 секунд

function cleanExpiredCache(): void {
  const now = Date.now();
  for (const [key, entry] of processCache) {
    if (now - entry.timestamp > CACHE_TTL_MS) {
      processCache.delete(key);
    }
  }
}

// Периодическая чистка просроченных записей кэша
setInterval(cleanExpiredCache, 30_000);

class BpmnSchemaService {
  /**
   * Загружает полные данные BPMN процесса по dataTypeId.
   * Включает: XML, кастомную модель (decor), типы данных, RDM структуры,
   * сообщения, шаблоны, группы пользователей, представления.
   */
  async loadProcessData(dataTypeId: string): Promise<BpmnProcessData> {
    const res = await rabisClient.chain.query.dataType({ id: dataTypeId }).get({
      id: true,
      name: true,
      displayName: true,
      bpmnProcessType: {
        bpmnXml: true,
        decorJson: true,
        validationResultsJson: true,
        valid: true,
      },
      bpmnMessages: {
        id: true,
        name: true,
        displayName: true,
        status: true,
        properties: {
          dataJson: true,
        },
      },
      properties: {
        id: true,
        displayName: true,
        name: true,
        properties: {
          id: true,
          key: true,
          displayName: true,
          jsonSchema: true,
          propertyType: { propertyTypeEnum: true, displayName: true },
          readonly: true,
          required: true,
          status: true,
        },
      },
      postTemplates: {
        id: true,
        displayName: true,
        name: true,
        subjectTemplate: true,
      },
      views: {
        id: true,
        name: true,
        displayName: true,
        viewType: { viewTypeEnum: true, displayName: true },
        status: true,
      },
    });

    const bpmnProcessType = res.bpmnProcessType;

    // Parse dataTypeProperties into categorized structure
    const properties = res.properties || [];

    const dataTypeProperties = {
      singleSelect: {} as Record<string, any>,
      multipleSelect: {} as Record<string, any>,
      realNumber: {} as Record<string, any>,
      DATA_OBJECT: {} as Record<string, any>,
      genericProperties: {} as Record<string, any>,
    };

    const allFields = properties.flatMap((propertyGroup) => {
      return propertyGroup.properties
        .filter(
          (property) =>
            property.status !== enumMetadataObjectStatusEnum.ARCHIVED,
        )
        .map((property) => {
          return {
            id: property.id,
            displayName: property.displayName,
            key: property.key,
            jsonSchema: property.jsonSchema,
            propertyTypeEnum: property.propertyType.propertyTypeEnum,
            sourceRdmStructure: (property as DataPropertyAttributes)
              .referenceDataTypeId
              ? (property as DataPropertyAttributes).referenceDataTypeId
              : null,
            parent: {
              id: propertyGroup.id,
              name: propertyGroup.name,
              displayName: propertyGroup.displayName,
            },
          };
        });
    });

    for (const field of allFields) {
      const typeEnum = field.propertyTypeEnum;
      if (typeEnum === 'SELECTION') {
        dataTypeProperties.singleSelect[field.id] = field;
      } else if (typeEnum === 'MULTI_SELECTION') {
        dataTypeProperties.multipleSelect[field.id] = field;
      } else if (typeEnum === 'INTEGER' || typeEnum === 'DECIMAL') {
        dataTypeProperties.realNumber[field.id] = field;
      } else if (typeEnum === 'DATA_OBJECT') {
        dataTypeProperties.DATA_OBJECT[field.id] = field;
      } else {
        if (!dataTypeProperties.genericProperties[typeEnum]) {
          dataTypeProperties.genericProperties[typeEnum] = [];
        }
        dataTypeProperties.genericProperties[typeEnum].push(field);
      }
    }

    const referenceDataTypeIds = getReferenceDataTypeIds(dataTypeProperties);

    const [rdmStructuresResult, groupsResult, usersResult] =
      await Promise.allSettled([
        this.getDataTypePropertySelectionsOptions(referenceDataTypeIds),
        this.loadUserGroups(),
        this.loadUsers(),
      ]);

    if (rdmStructuresResult.status === 'rejected') {
      throw new Error(
        `Критическая ошибка загрузки справочников: ${rdmStructuresResult.reason?.message || rdmStructuresResult.reason}`,
      );
    }
    const rdmStructures = rdmStructuresResult.value;

    const userGroups =
      groupsResult.status === 'fulfilled' ? groupsResult.value || [] : [];
    const users =
      usersResult.status === 'fulfilled' ? usersResult.value || [] : [];

    if (groupsResult.status === 'rejected') {
      console.error(
        '[MCP Resource] Не удалось загрузить группы пользователей:',
        groupsResult.reason,
      );
    }
    if (usersResult.status === 'rejected') {
      console.error(
        '[MCP Resource] Не удалось загрузить список пользователей:',
        usersResult.reason,
      );
    }

    return {
      dataTypeId,
      name: res.name,
      displayName: res.displayName,
      bpmnXml: bpmnProcessType?.bpmnXml || '',
      decorJson: bpmnProcessType?.decorJson || '{}',
      valid: false,
      validationResults: JSON.parse(
        res.bpmnProcessType?.validationResultsJson as string,
      ),
      bpmnMessages: (res.bpmnMessages as unknown as BpmnMessage[]) || [],
      dataTypeProperties,
      rdmStructures,
      postTemplates: (res.postTemplates as unknown as PostTemplate[]) || [],
      userGroups,
      users, // Would need separate query
      views: (res.views as unknown as View[]) || [],
    };
  }

  async getDataTypePropertySelectionsOptions(
    referenceDataTypeIds: Array<string>,
  ): Promise<Record<string, { rdmObjects: Array<Record<string, any>> }>> {
    const results = await Promise.allSettled(
      referenceDataTypeIds.map((id) =>
        this.getDataTypePropertySelectionOptions(id),
      ),
    );

    const successfulResults = results
      .filter(
        (result): result is PromiseFulfilledResult<any> =>
          result.status === 'fulfilled',
      )
      .map((result) => result.value);

    return successfulResults.reduce(
      (acc, current) => {
        return { ...acc, ...current };
      },
      {} as Record<string, { rdmObjects: Array<Record<string, any>> }>,
    );
  }

  /**
   * Функция для получения опций выбора объекта данных.
   * @param {string} referenceDataTypeId - ID типа данных.
   */
  getDataTypePropertySelectionOptions = async (referenceDataTypeId: string) => {
    const graphQLQuery = {
      query: `
      query GetQuery($referenceDataTypeId: ID!, $parentValues: [String], $keys: [String!]) {
        dataObjectSelectionOptions(
          referenceDataTypeId: $referenceDataTypeId
          parentValues: $parentValues
        ) {
          id
          properties(keys: $keys) {
            key
            value {
              ...booleanValue
              ...stringValue
            }
          }
        }
      }
      
      fragment booleanValue on BooleanValue {
        booleanField: value
      }
      
      fragment stringValue on StringValue {
        stringField: value
      }
    `,
      variables: {
        referenceDataTypeId,
        keys: [
          '_rdm-_common:_value',
          '_rdm-_common:_label',
          '_rdm-_common:_is_default',
        ],
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${authBuffer}`,
    };

    try {
      const response = await axios.post(ENDPOINT, graphQLQuery, { headers });

      if (response.data.errors) {
        throw new Error(JSON.stringify(response.data.errors));
      }

      const arr = response.data.data.dataObjectSelectionOptions.map(
        (item: any) => {
          const transformedObject = {
            id: item.id,
          } as Record<string, any>;

          item.properties.forEach((property: Record<string, any>) => {
            switch (property.key) {
              case '_rdm-_common:_label':
                transformedObject.label = property.value.stringValue;
                break;

              case '_rdm-_common:_value':
                transformedObject.value = property.value.stringValue;
                break;

              case '_rdm-_common:_is_default':
                transformedObject.isDefault = property.value.booleanValue;
                break;
            }
          });

          return transformedObject;
        },
      );

      return {
        [referenceDataTypeId]: {
          rdmObjects: arr,
        },
      };
    } catch (error: any) {
      console.error('Ошибка при выполнении GraphQL запроса:', error.message);
      throw error;
    }
  };

  /**
   * Загружает и парсит BPMN процесс.
   * Возвращает состояние: parsed XML + custom model.
   * Использует in-memory cache (TTL 60 сек).
   */
  async loadAndParseProcess(dataTypeId: string): Promise<BpmnProcessState> {
    cleanExpiredCache();

    const cached = processCache.get(dataTypeId);
    if (cached) {
      return cached.state;
    }

    const data = await this.loadProcessData(dataTypeId);

    let parsed = {
      rootElement: null,
      elementsById: {},
      warnings: [],
    } as unknown as BPMNModel;

    if (data.bpmnXml) {
      parsed = await bpmnXmlService.fromXML(data.bpmnXml);
    }

    let model: Record<string, Record<string, any>> = {};
    try {
      model = JSON.parse(data.decorJson || '{}');
    } catch {
      model = {};
    }

    const state = { parsed, model, data };

    processCache.set(dataTypeId, { state, timestamp: Date.now() });

    return state;
  }

  /**
   * Сохраняет BPMN процесс (XML + custom model) через GraphQL мутацию.
   * Бэкенд выполняет валидацию и возвращает результат.
   */
  async saveProcess(input: SaveBpmnInput): Promise<{
    success: boolean;
    validationResults?: any;
    error?: string;
  }> {
    try {
      const res = await rabisClient.chain.mutation
        .createOrUpdateBpmnProcessType({
          dataProperty: {
            parentId: input.dataTypeId,
            bpmn: input.xml,
            decor: input.decor,
          },
        })
        .get();

      const validationResult = JSON.parse(res as string);

      // Инвалидация кэша после сохранения
      processCache.delete(input.dataTypeId);

      return {
        success: true,
        validationResults: validationResult,
      };
    } catch (e: any) {
      return {
        success: false,
        error: e?.message || 'Failed to save BPMN process',
      };
    }
  }

  /**
   * Сохраняет процесс из текущего состояния (parsed + model).
   * Пересериализует XML и модель перед сохранением.
   */
  async saveFromState(state: BpmnProcessState): Promise<{
    success: boolean;
    validationResults?: any;
    error?: string;
  }> {
    const xml = await bpmnXmlService.toXML(state.parsed.rootElement);
    const decor = JSON.stringify(state.model);

    return this.saveProcess({
      dataTypeId: state.data.dataTypeId,
      xml,
      decor,
    });
  }

  /**
   * Быстрая проверка валидности процесса (dry-run).
   * Возвращает true если процесс валиден, false если есть ошибки.
   */
  async isProcessValid(
    dataTypeId: string,
    xml: string,
    decor: string,
  ): Promise<boolean> {
    try {
      const res = await rabisClient.chain.query
        .isBpmnProcessValid({
          property: {
            parentId: dataTypeId,
            bpmn: xml,
            decor,
          },
        })
        .get();

      return res as unknown as boolean;
    } catch {
      return false;
    }
  }

  /**
   * Загружает BPMN сообщения для процесса.
   */
  async loadBpmnMessages(dataTypeId: string): Promise<any[]> {
    const res = await rabisClient.chain.query.dataType({ id: dataTypeId }).get({
      bpmnMessages: {
        id: true,
        name: true,
        displayName: true,
        status: true,
        properties: {
          dataJson: true,
        },
      },
    } as any);

    return (res as any).bpmnMessages || [];
  }

  /**
   * Загружает API спеки для модуля (для ServiceTask конфигурации).
   */
  async loadApiSpecs(moduleId: string): Promise<any[]> {
    try {
      const res = await (rabisClient.chain.query as any)
        .wfApiSpecsGroups({ parentId: moduleId })
        .get({
          id: true,
          name: true,
          displayName: true,
          apiSpecs: true,
        });

      return (res as any)?.data?.module?.apiSpecsGroups || [];
    } catch {
      return [];
    }
  }

  // ─── PostTemplate CRUD ─────────────────────────────────────

  async createPostTemplate(input: {
    parentId: string;
    bodyTemplate: string;
    subjectTemplate: string;
    displayName?: string;
    name?: string;
    description?: string;
  }) {
    const res = await rabisClient.chain.mutation
      .createPostTemplate({
        postTemplate: input,
      })
      .get({
        id: true,
        displayName: true,
        name: true,
        subjectTemplate: true,
        bodyTemplate: true,
      });

    return res;
  }

  async updatePostTemplate(input: {
    id: string;
    bodyTemplate?: string;
    subjectTemplate?: string;
    displayName?: string;
    name?: string;
    description?: string;
  }) {
    const res = await rabisClient.chain.mutation
      .updatePostTemplate({
        postTemplate: input,
      })
      .get({
        id: true,
        displayName: true,
        name: true,
        subjectTemplate: true,
        bodyTemplate: true,
      });

    return res;
  }

  async deletePostTemplate(id: string): Promise<boolean> {
    const res = await rabisClient.chain.mutation
      .deleteMetaDataObject({ id })
      .get();

    return res as unknown as boolean;
  }

  async validatePostTemplate(input: {
    parentId: string;
    bodyTemplate: string;
    subjectTemplate: string;
    id?: string;
  }): Promise<boolean> {
    const res = await rabisClient.chain.query
      .isPostTemplateValid({
        postTemplate: input,
      })
      .get();

    return res as unknown as boolean;
  }

  // ─── BpmnMessage CRUD ──────────────────────────────────────

  async createBpmnMessage(input: {
    parentId: string;
    name: string;
    displayName?: string;
    description?: string;
    dataJson?: string;
  }) {
    const res = await rabisClient.chain.mutation
      .createBpmnMessage({
        dataProperty: input,
      })
      .get({
        id: true,
        name: true,
        displayName: true,
        dataJson: true,
        status: true,
      });

    return res;
  }

  async updateBpmnMessage(input: {
    id: string;
    displayName?: string;
    description?: string;
    dataJson?: string;
  }) {
    const res = await rabisClient.chain.mutation
      .updateBpmnMessage({
        dataProperty: input,
      })
      .get({
        id: true,
        name: true,
        displayName: true,
        dataJson: true,
        status: true,
      });

    return res;
  }

  async deleteBpmnMessage(id: string): Promise<boolean> {
    const res = await rabisClient.chain.mutation
      .deleteMetaDataObject({ id })
      .get();

    return res as unknown as boolean;
  }

  async validateBpmnMessage(input: {
    parentId: string;
    name: string;
    id?: string;
  }): Promise<boolean> {
    const res = await rabisClient.chain.query
      .isBpmnMessageValid({
        property: input,
      })
      .get();

    return res as unknown as boolean;
  }

  // ─── UserGroups (READ-ONLY) ────────────────────────────────

  async loadUserGroups(
    search?: string,
  ): Promise<Array<{ uid: string; name: string; displayName: string }>> {
    const res = await rabisClient.chain.query
      .groups({
        params: {
          search: search || '',
          pagination: { pageIndex: 0, pageSize: 1000 },
        },
      })
      .get({
        items: {
          uid: true,
          name: true,
          displayName: true,
        },
      });

    const items = (res as any)?.items || [];
    return items.map((item: any) => ({
      uid: item.uid,
      name: item.name,
      displayName: item.displayName,
    }));
  }

  // ─── Users (READ-ONLY) ────────────────────────────────

  async loadUsers(
    search?: string,
  ): Promise<Array<{ uid: string; name: string; displayName: string }>> {
    const res = await rabisClient.chain.query
      .users({
        params: {
          search: search || '',
        },
      })
      .get({
        items: {
          uid: true,
          name: true,
          displayName: true,
        },
      });

    const items = (res as any)?.items || [];
    return items.map((item: any) => ({
      uid: item.uid,
      name: item.name,
      displayName: item.displayName,
    }));
  }
}

function getReferenceDataTypeIds(props: Record<string, any>) {
  const ids: Array<string> = [];

  if (Object.keys(props['singleSelect']).length) {
    ids.push(
      ...Object.values(props['singleSelect']).map(
        (item: any) => item.sourceRdmStructure,
      ),
    );
  }

  if (Object.keys(props['multipleSelect']).length) {
    ids.push(
      ...Object.values(props['multipleSelect']).map(
        (item: any) => item.sourceRdmStructure,
      ),
    );
  }

  return Array.from(new Set(ids));
}

export const bpmnSchemaService = new BpmnSchemaService();
