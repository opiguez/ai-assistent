/**
 * BPMN Schema Service
 * Работает с GraphQL API для чтения/записи BPMN схем.
 * Использует rabisClient (genql) для запросов.
 */
import { rabisClient } from '../../shared/services/rabisClient.service.js';
import { bpmnXmlService, type ParsedProcess } from './bpmn-xml.service.js';

// ─── Types ────────────────────────────────────────────────

export interface BpmnProcessData {
  dataTypeId: string;
  name: string;
  displayName: string;
  bpmnXml: string;
  decorJson: string;
  valid: boolean;
  validationResults: any;
  bpmnMessages: any[];
  dataTypeProperties: any;
  rdmStructures: Record<string, any>;
  postTemplates: any[];
  userGroups: any[];
  views: any[];
}

export interface BpmnProcessState {
  parsed: ParsedProcess;
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

class BpmnSchemaService {
  /**
   * Загружает полные данные BPMN процесса по dataTypeId.
   * Включает: XML, кастомную модель (decor), типы данных, RDM структуры,
   * сообщения, шаблоны, группы пользователей, представления.
   */
  async loadProcessData(dataTypeId: string): Promise<BpmnProcessData> {
    const res = await rabisClient.chain.query
      .dataType({ id: dataTypeId })
      .get({
        id: true,
        name: true,
        displayName: true,
        bpmnProcessType: {
          bpmnXml: true,
          decorJson: true,
        } as any,
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
      } as any);

    const bpmnProcessType = (res as any).bpmnProcessType;

    // Parse dataTypeProperties into categorized structure
    const properties = (res as any).properties || [];
    const allFields = properties.flatMap((g: any) => g.properties || []);

    // Build categorized dataTypeProperties
    const dataTypeProperties = {
      singleSelect: {} as Record<string, any>,
      multipleSelect: {} as Record<string, any>,
      realNumber: {} as Record<string, any>,
      DATA_OBJECT: {} as Record<string, any>,
      genericProperties: {} as Record<string, any>,
    };

    for (const field of allFields) {
      const typeEnum = field.propertyType?.propertyTypeEnum;
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

    return {
      dataTypeId,
      name: (res as any).name,
      displayName: (res as any).displayName,
      bpmnXml: bpmnProcessType?.bpmnXml || '',
      decorJson: bpmnProcessType?.decorJson || '{}',
      valid: false, // Will be set from validation
      validationResults: null,
      bpmnMessages: (res as any).bpmnMessages || [],
      dataTypeProperties,
      rdmStructures: {}, // Populated separately if needed
      postTemplates: (res as any).postTemplates || [],
      userGroups: [], // Would need separate query
      views: (res as any).views || [],
    };
  }

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

    let parsed: ParsedProcess = {
      definitions: null,
      rootElement: null,
      elementsById: {},
      warnings: [],
    };

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
    const xml = await bpmnXmlService.toXML(state.parsed.definitions);
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
  async isProcessValid(dataTypeId: string, xml: string, decor: string): Promise<boolean> {
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
    const res = await rabisClient.chain.query
      .dataType({ id: dataTypeId })
      .get({
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

  async loadUserGroups(search?: string): Promise<Array<{ uid: string; name: string; displayName: string }>> {
    const res = await rabisClient.chain.query
      .groups({
        params: {
          search: search || undefined,
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
}

export const bpmnSchemaService = new BpmnSchemaService();
