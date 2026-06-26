import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    BigDecimal: any,
    Boolean: boolean,
    Date: any,
    ID: string,
    Int: number,
    LocalDate: any,
    LocalTime: any,
    Long: any,
    Map_String_ObjectScalar: any,
    Map_String_StringScalar: any,
    ObjectScalar: any,
    String: string,
}

export type ActionEnum = 'CREATE' | 'CREATE_FROM_TEMPLATE' | 'EDIT' | 'EMBED' | 'NAVIGATE' | 'OTHER' | 'RESPOND'

export type AllowedActionsEnum = 'CHANGE_OWNER' | 'CHANGE_STATE' | 'CREATE_VERSION' | 'DELETE' | 'DOWNLOAD' | 'EDIT' | 'MANAGE_FAVORITES' | 'MANAGE_PERMISSIONS' | 'MANAGE_TEMPLATES' | 'MOVE' | 'OPEN_MARKUP' | 'PUBLISH' | 'RESPOND' | 'RESTORE_VERSION' | 'SEE_HISTORY' | 'SEE_VERSIONS'

export interface ApiSpec {
    authMethod: AuthMethod
    basicAuthLogin?: Scalars['String']
    basicAuthPassword?: Scalars['String']
    clientCredFlowClientId?: Scalars['String']
    clientCredFlowClientSecret?: Scalars['String']
    clientCredFlowTokenUrl?: Scalars['String']
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    modificationDate: Scalars['Date']
    moduleDtoJson?: Scalars['String']
    name: Scalars['String']
    openApiJson: Scalars['String']
    parentId: Scalars['String']
    serviceUrl: Scalars['String']
    status: MetadataObjectStatusEnum
    version?: Scalars['String']
    __typename: 'ApiSpec'
}

export interface ApiSpecsGroup {
    apiSpecs: ApiSpec[]
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    status: MetadataObjectStatusEnum
    __typename: 'ApiSpecsGroup'
}

export interface Application {
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    htmlWidgetGroups: HtmlWidgetGroup[]
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    modificationDate: Scalars['Date']
    modules: Module[]
    name: Scalars['String']
    notificationJson?: Scalars['String']
    parentId: Scalars['String']
    roles: Role[]
    status: MetadataObjectStatusEnum
    toolbarJson?: Scalars['String']
    workbenches: Workbench[]
    __typename: 'Application'
}

export interface AssetUpload {
    batchFileIndex?: Scalars['Int']
    batchId?: Scalars['String']
    chunks?: Scalars['Int']
    creationDate: Scalars['Date']
    fileName: Scalars['String']
    hash: Scalars['String']
    id: Scalars['String']
    loadedChunks?: Scalars['Int']
    loadedSize: Scalars['Long']
    mimeType: Scalars['String']
    previewUrl?: Scalars['String']
    size: Scalars['Long']
    status: AssetUploadStatus
    targetDocumentId?: Scalars['String']
    targetDocumentRoute?: Scalars['String']
    targetFolderId: Scalars['String']
    __typename: 'AssetUpload'
}

export interface AssetUploadList {
    items: AssetUpload[]
    pageInfo: PageInfo
    __typename: 'AssetUploadList'
}

export interface AssetUploadStatus {
    displayName: Scalars['String']
    status: AssetUploadStatusEnum
    __typename: 'AssetUploadStatus'
}

export type AssetUploadStatusEnum = 'COMPLETED' | 'FAILED' | 'IN_PROGRESS'

export interface Attribute {
    attribute: Scalars['String']
    attributeType: PropertyType
    label: Scalars['String']
    referenceDataTypeId?: Scalars['String']
    __typename: 'Attribute'
}

export interface AttributeValue {
    attribute: Attribute
    value?: DataPropertyAttributesValueUnion
    __typename: 'AttributeValue'
}

export interface AuditCategory {
    displayName: Scalars['String']
    value: AuditCategoryEnum
    __typename: 'AuditCategory'
}

export type AuditCategoryEnum = 'rabisAuthCategory' | 'rabisDataObjects' | 'rabisSettingsCategory'

export interface AuditEvent {
    displayName: Scalars['String']
    value: AuditEventEnum
    __typename: 'AuditEvent'
}

export type AuditEventEnum = 'rabisAuthException' | 'rabisAuthTokenExpired' | 'rabisAuthUserSynced' | 'rabisAuthUserSyncedAndLoggedIn' | 'rabisDataObjectCreated' | 'rabisDataObjectDeleted' | 'rabisDataObjectDownloaded' | 'rabisDataObjectModified' | 'rabisDataObjectMoved' | 'rabisDataObjectOwnerChanged' | 'rabisDataObjectPublished' | 'rabisDataObjectRepublished' | 'rabisDataObjectRestored' | 'rabisDataObjectStatusChanged' | 'rabisDataObjectUnpublished' | 'rabisDataObjectVersionCreated' | 'rabisDataObjectVersionRestored' | 'rabisForcedLogout' | 'rabisLogout' | 'rabisNuxeoLoginFailed' | 'rabisNuxeoLoginSuccess' | 'rabisReadMembers' | 'rabisReadUserProfile' | 'rabisRefreshToken' | 'rabisResourceDownloaded' | 'rabisSecuritySettingsChanged' | 'rabisSetMembers'

export interface AuditLogEntriesList {
    items: AuditLogEntry[]
    pageInfo: PageInfo
    __typename: 'AuditLogEntriesList'
}

export interface AuditLogEntry {
    category: AuditCategory
    event: AuditEvent
    eventDate: Scalars['Date']
    id: Scalars['Int']
    info?: Scalars['ObjectScalar']
    user?: User
    __typename: 'AuditLogEntry'
}

export type AuthMethod = 'BASIC_AUTH' | 'CLIENT_CREDENTIALS_FLOW' | 'NO_AUTH' | 'RABIS_AUTH'

export interface BooleanDisplayFormat {
    displayFormatEnum: BooleanDisplayFormatEnum
    displayName: Scalars['String']
    __typename: 'BooleanDisplayFormat'
}

export type BooleanDisplayFormatEnum = 'ICON' | 'TEXT'

export interface BpmnMessage {
    creationDate: Scalars['Date']
    dataJson: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    status: MetadataObjectStatusEnum
    __typename: 'BpmnMessage'
}

export interface BpmnMessageGroup {
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    name: Scalars['String']
    properties: (BpmnMessage | undefined)[]
    status?: MetadataObjectStatusEnum
    __typename: 'BpmnMessageGroup'
}

export interface BpmnProcessType {
    bpmnXml: Scalars['String']
    creationDate: Scalars['Date']
    decorJson: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    lifecycleJson: Scalars['String']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    processDefinitionId: Scalars['String']
    processDefinitionKey: Scalars['String']
    processDefinitionVersionTag: Scalars['String']
    status: MetadataObjectStatusEnum
    __typename: 'BpmnProcessType'
}

export interface Collection {
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    isHidden?: Scalars['Boolean']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    status: MetadataObjectStatusEnum
    uid?: Scalars['String']
    __typename: 'Collection'
}

export interface CsvImportStatus {
    filename: Scalars['String']
    importId: Scalars['ID']
    moduleName: Scalars['String']
    objectsCreatedCount: Scalars['Int']
    objectsUpdatedCount: Scalars['Int']
    rowsFailedCount: Scalars['Int']
    rowsProcessedCount: Scalars['Int']
    rowsSkippedCount: Scalars['Int']
    startDate: Scalars['Date']
    state: WorkStateEnum
    targetObjectId?: Scalars['ID']
    userId: Scalars['String']
    __typename: 'CsvImportStatus'
}

export interface DataObject {
    allowedActions: AllowedActionsEnum[]
    discussion?: DiscussionRoom
    genericStatus: DataObjectGenericStatus
    hasAllRequiredProperties: Scalars['Boolean']
    hasChildren?: Scalars['Boolean']
    id: Scalars['ID']
    isTemplate: Scalars['Boolean']
    isVersion: Scalars['Boolean']
    parentId?: Scalars['String']
    parents: DataObject[]
    properties: DataObjectProperty[]
    publishInfo?: DataObjectPublishInfo
    rdmObject: Scalars['Boolean']
    route: Scalars['String']
    stateCustomJson?: Scalars['String']
    subscriptionType?: Scalars['String']
    type: PublishedDataType
    __typename: 'DataObject'
}

export interface DataObjectChanges {
    changes?: (DataObjectProperty | undefined)[]
    dataObjectValid: Scalars['Boolean']
    __typename: 'DataObjectChanges'
}

export type DataObjectGenericStatus = 'INACTIVE' | 'TRANSIENT' | 'USER_TASK' | 'WORKLOG'

export interface DataObjectHierarchy {
    allowCreation: Scalars['Boolean']
    id: Scalars['ID']
    name: Scalars['String']
    __typename: 'DataObjectHierarchy'
}

export interface DataObjectList {
    items: DataObject[]
    pageInfo: PageInfo
    __typename: 'DataObjectList'
}

export interface DataObjectProperty {
    key: Scalars['String']
    value: DataPropertyValue
    __typename: 'DataObjectProperty'
}

export interface DataObjectPublishInfo {
    link?: Scalars['String']
    status: Scalars['String']
    __typename: 'DataObjectPublishInfo'
}

export type DataProperty = (DataPropertyAttributes | DataPropertyBoolean | DataPropertyDate | DataPropertyDateTime | DataPropertyDecimal | DataPropertyFile | DataPropertyFiles | DataPropertyInteger | DataPropertyMultiSelection | DataPropertyObject | DataPropertyObjectFilter | DataPropertyObjects | DataPropertySelection | DataPropertySequence | DataPropertyStatus | DataPropertyString | DataPropertyText | DataPropertyTime | DataPropertyUser | DataPropertyUserCommon | DataPropertyUsers | DataPropertyVersion) & { __isUnion?: true }

export interface DataPropertyAttributes {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    dateDataPropertyKey?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    parentSelection?: Scalars['String']
    properties: DataProperty[]
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    referenceDataTypeId?: Scalars['String']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyAttributes'
}

export interface DataPropertyAttributesValue {
    attributesValue: AttributeValue[]
    selectedDate?: Scalars['String']
    __typename: 'DataPropertyAttributesValue'
}

export type DataPropertyAttributesValueUnion = (DataPropertyBooleanValue | DataPropertyDateTimeValue | DataPropertyDateValue | DataPropertyDecimalValue | DataPropertyIntegerValue | DataPropertyMultiSelectionValue | DataPropertySelectionValue | DataPropertyStringValue | DataPropertyTextValue | DataPropertyTimeValue) & { __isUnion?: true }

export interface DataPropertyBoolean {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    defaultValue?: DataPropertyBooleanValue
    description?: Scalars['String']
    displayFalseAs: Scalars['String']
    displayFalseColor: Scalars['String']
    displayFormat: BooleanDisplayFormat
    displayName: Scalars['String']
    displayTrueAs: Scalars['String']
    displayTrueColor: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyBoolean'
}

export interface DataPropertyBooleanValue {
    booleanValue?: Scalars['Boolean']
    __typename: 'DataPropertyBooleanValue'
}

export interface DataPropertyDate {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    defaultValue?: DataPropertyDateValue
    description?: Scalars['String']
    displayFormat: DateDisplayFormat
    displayName: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    maxValue?: DataPropertyDateValue
    minValue?: DataPropertyDateValue
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyDate'
}

export interface DataPropertyDateTime {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    defaultValue?: DataPropertyDateTimeValue
    description?: Scalars['String']
    displayFormat: DateDisplayFormat
    displayName: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    maxValue?: DataPropertyDateTimeValue
    minValue?: DataPropertyDateTimeValue
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    useTimeZone: Scalars['Boolean']
    __typename: 'DataPropertyDateTime'
}

export interface DataPropertyDateTimeValue {
    dateTimeValue?: Scalars['Date']
    __typename: 'DataPropertyDateTimeValue'
}

export interface DataPropertyDateValue {
    dateValue?: Scalars['LocalDate']
    __typename: 'DataPropertyDateValue'
}

export interface DataPropertyDecimal {
    JSON_SCHEMA?: Scalars['Map_String_StringScalar']
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    defaultValue?: DataPropertyDecimalValue
    description?: Scalars['String']
    displayName: Scalars['String']
    formula?: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    maxValue?: DataPropertyDecimalValue
    minValue?: DataPropertyDecimalValue
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    precision?: Scalars['Int']
    prefix?: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    suffix?: Scalars['String']
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyDecimal'
}

export interface DataPropertyDecimalValue {
    decimalValue?: Scalars['BigDecimal']
    __typename: 'DataPropertyDecimalValue'
}

export interface DataPropertyFile {
    JSON_SCHEMA?: Scalars['Map_String_StringScalar']
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    downloadable?: Scalars['Boolean']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyFile'
}

export interface DataPropertyFileValue {
    fileValue?: File
    __typename: 'DataPropertyFileValue'
}

export interface DataPropertyFiles {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    downloadable?: Scalars['Boolean']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyFiles'
}

export interface DataPropertyFilesValue {
    filesValue: File[]
    __typename: 'DataPropertyFilesValue'
}

export interface DataPropertyInteger {
    JSON_INTEGER_SCHEMA?: Scalars['Map_String_StringScalar']
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    defaultValue?: DataPropertyIntegerValue
    description?: Scalars['String']
    displayName: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    maxValue?: DataPropertyIntegerValue
    minValue?: DataPropertyIntegerValue
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    prefix?: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    suffix?: Scalars['String']
    unique: Scalars['Boolean']
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyInteger'
}

export interface DataPropertyIntegerValue {
    integerValue?: Scalars['Int']
    __typename: 'DataPropertyIntegerValue'
}

export interface DataPropertyMultiSelection {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    dateDataPropertyKey?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    parentSelection?: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    referenceDataTypeId?: Scalars['String']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyMultiSelection'
}

export interface DataPropertyMultiSelectionValue {
    multiSelectionValue: DataObject[]
    selectedDate?: Scalars['String']
    __typename: 'DataPropertyMultiSelectionValue'
}

export interface DataPropertyObject {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    relationModuleId?: Scalars['String']
    relationObjectProperty?: Scalars['String']
    relationTypes?: (Scalars['String'] | undefined)[]
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    viewJson?: Scalars['String']
    __typename: 'DataPropertyObject'
}

export interface DataPropertyObjectFilter {
    bindingJson?: Scalars['String']
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    filterId?: Scalars['String']
    filterJson?: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    relationModuleId?: Scalars['String']
    relationObjectProperty?: Scalars['String']
    relationTypes?: (Scalars['String'] | undefined)[]
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    viewJson?: Scalars['String']
    __typename: 'DataPropertyObjectFilter'
}

export interface DataPropertyObjectFilterValue {
    objectFilterValue: DataObject[]
    rawValue?: (Scalars['String'] | undefined)[]
    __typename: 'DataPropertyObjectFilterValue'
}

export interface DataPropertyObjectValue {
    objectValue?: DataObject
    __typename: 'DataPropertyObjectValue'
}

export interface DataPropertyObjects {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    relationModuleId?: Scalars['String']
    relationObjectProperty?: Scalars['String']
    relationTypes?: (Scalars['String'] | undefined)[]
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    viewJson?: Scalars['String']
    __typename: 'DataPropertyObjects'
}

export interface DataPropertyObjectsValue {
    objectsValue: DataObject[]
    __typename: 'DataPropertyObjectsValue'
}

export interface DataPropertySelection {
    JSON_SCHEMA?: Scalars['Map_String_StringScalar']
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    dateDataPropertyKey?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    formula?: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    parentSelection?: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    referenceDataTypeId?: Scalars['String']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertySelection'
}

export interface DataPropertySelectionValue {
    selectedDate?: Scalars['String']
    selectionValue?: DataObject
    __typename: 'DataPropertySelectionValue'
}

export interface DataPropertySequence {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    initialValue?: Scalars['Int']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    prefix?: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    restartInterval?: SequenceRestartInterval
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    suffix?: Scalars['String']
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertySequence'
}

export interface DataPropertySequenceValue {
    sequenceValue?: Scalars['Int']
    __typename: 'DataPropertySequenceValue'
}

export interface DataPropertyStatus {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyStatus'
}

export interface DataPropertyStatusValue {
    statusValue?: LifecycleState
    __typename: 'DataPropertyStatusValue'
}

export interface DataPropertyString {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    defaultValue?: DataPropertyStringValue
    description?: Scalars['String']
    displayName: Scalars['String']
    formula?: Scalars['String']
    helpText?: Scalars['String']
    icon?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    maxLength?: Scalars['Int']
    minLength?: Scalars['Int']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    pattern?: Scalars['String']
    prefix?: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    suffix?: Scalars['String']
    unique: Scalars['Boolean']
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyString'
}

export interface DataPropertyStringValue {
    stringValue?: Scalars['String']
    __typename: 'DataPropertyStringValue'
}

export interface DataPropertyText {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    defaultValue?: DataPropertyTextValue
    description?: Scalars['String']
    displayName: Scalars['String']
    formatType: TextFormatType
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    maxLength?: Scalars['Int']
    minLength?: Scalars['Int']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyText'
}

export interface DataPropertyTextValue {
    textValue?: Scalars['String']
    __typename: 'DataPropertyTextValue'
}

export interface DataPropertyTime {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    defaultValue?: DataPropertyTimeValue
    description?: Scalars['String']
    displayFormat: DateDisplayFormat
    displayName: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    maxValue?: DataPropertyTimeValue
    minValue?: DataPropertyTimeValue
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyTime'
}

export interface DataPropertyTimeValue {
    timeValue?: Scalars['LocalTime']
    __typename: 'DataPropertyTimeValue'
}

export interface DataPropertyUser {
    JSON_SCHEMA?: Scalars['Map_String_StringScalar']
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    filterByDataObjectPermissions?: Scalars['Boolean']
    filterByDataTypePrivileges?: Scalars['Boolean']
    filterByRoles?: (Scalars['String'] | undefined)[]
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    sortingFullName?: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyUser'
}

export interface DataPropertyUserCommon {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    filterByDataObjectPermissions?: Scalars['Boolean']
    filterByDataTypePrivileges?: Scalars['Boolean']
    filterByRoles?: (Scalars['String'] | undefined)[]
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    sortingFullName?: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyUserCommon'
}

export interface DataPropertyUserValue {
    userValue?: User
    __typename: 'DataPropertyUserValue'
}

export interface DataPropertyUsers {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    filterByDataObjectPermissions?: Scalars['Boolean']
    filterByDataTypePrivileges?: Scalars['Boolean']
    filterByRoles?: (Scalars['String'] | undefined)[]
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    sortingFullName?: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyUsers'
}

export interface DataPropertyUsersValue {
    usersValue: User[]
    __typename: 'DataPropertyUsersValue'
}

export type DataPropertyValue = (DataPropertyAttributesValue | DataPropertyBooleanValue | DataPropertyDateTimeValue | DataPropertyDateValue | DataPropertyDecimalValue | DataPropertyFileValue | DataPropertyFilesValue | DataPropertyIntegerValue | DataPropertyMultiSelectionValue | DataPropertyObjectFilterValue | DataPropertyObjectValue | DataPropertyObjectsValue | DataPropertySelectionValue | DataPropertySequenceValue | DataPropertyStatusValue | DataPropertyStringValue | DataPropertyTextValue | DataPropertyTimeValue | DataPropertyUserValue | DataPropertyUsersValue | DataPropertyVersionValue) & { __isUnion?: true }

export interface DataPropertyVersion {
    creationDate: Scalars['Date']
    customizationRef?: Scalars['String']
    description?: Scalars['String']
    displayFormat: VersionDisplayFormat
    displayName: Scalars['String']
    helpText?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    jsonSchema?: Scalars['String']
    key: Scalars['String']
    modificationDate: Scalars['Date']
    multilanguage?: Scalars['Boolean']
    name: Scalars['String']
    originalNuxeoDocument?: Document
    parentId: Scalars['String']
    propertyType: PropertyType
    readonly: Scalars['Boolean']
    required: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    skipNuxeoStore?: Scalars['Boolean']
    sortable: Scalars['Boolean']
    status: MetadataObjectStatusEnum
    useInSearchOrSort: Scalars['Boolean']
    __typename: 'DataPropertyVersion'
}

export interface DataPropertyVersionValue {
    versionValue?: Version
    __typename: 'DataPropertyVersionValue'
}

export interface DataType {
    baseType?: DataType
    bpmnMessages: BpmnMessageGroup[]
    bpmnProcessType?: XmlAndModelDecoration
    brandingJson?: Scalars['String']
    calendarView?: Scalars['String']
    canBeUsedAsTemplate: Scalars['Boolean']
    canCreateAnother: Scalars['Boolean']
    canHaveChildren: Scalars['Boolean']
    canHaveDiscussion: Scalars['Boolean']
    cardView?: Scalars['String']
    childTableView?: Scalars['String']
    childVersionable: Scalars['Boolean']
    childrenTypes?: (DataType | undefined)[]
    createFromTemplateView?: Scalars['String']
    createView?: Scalars['String']
    creationDate: Scalars['Date']
    dataTypeComment?: DataType
    description?: Scalars['String']
    discussionMembersId?: Scalars['String']
    displayName: Scalars['String']
    downloadable: Scalars['Boolean']
    editView?: Scalars['String']
    embedView?: Scalars['String']
    filterJson?: Scalars['String']
    grantedPrivileges?: (GrantedPrivileges | undefined)[]
    id: Scalars['String']
    inheritBpmnScheme?: Scalars['Boolean']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    lifecycle: Lifecycle
    modificationDate: Scalars['Date']
    name: Scalars['String']
    navigateView?: Scalars['String']
    parentId: Scalars['String']
    postTemplates: PostTemplate[]
    privilegesInherited?: Scalars['Boolean']
    properties: PropertyGroup[]
    publishable: Scalars['Boolean']
    reportingView?: Scalars['String']
    rootVersionable: Scalars['Boolean']
    searchPanelProperties: PropertyGroup[]
    stateMachine?: Scalars['String']
    status: MetadataObjectStatusEnum
    tileView?: Scalars['String']
    typeFilters: TypeFilter[]
    uploadable: Scalars['Boolean']
    versionIncrement: VersionIncrement[]
    versionable: Scalars['Boolean']
    views: View[]
    __typename: 'DataType'
}

export interface DateDisplayFormat {
    displayFormatEnum: DateDisplayFormatEnum
    displayName: Scalars['String']
    __typename: 'DateDisplayFormat'
}

export type DateDisplayFormatEnum = 'FULL' | 'LONG' | 'SHORT'

export interface DefaultResources {
    favicon: Scalars['String']
    logo: Scalars['String']
    module: Scalars['String']
    smallLogo: Scalars['String']
    workspace: Scalars['String']
    __typename: 'DefaultResources'
}

export interface DiscussionDirectMessagesRoom {
    hasUnreadMessages: Scalars['Boolean']
    hidden: Scalars['Boolean']
    id: Scalars['String']
    lastMessage?: DiscussionMessage
    participant: User
    type: Scalars['String']
    __typename: 'DiscussionDirectMessagesRoom'
}

export interface DiscussionDirectMessagesRoomList {
    items: DiscussionDirectMessagesRoom[]
    pageInfo: PageInfo
    __typename: 'DiscussionDirectMessagesRoomList'
}

export interface DiscussionMessage {
    attachments?: (File | undefined)[]
    created: Scalars['String']
    from: User
    id: Scalars['String']
    info?: DiscussionMessageInfo
    message?: Scalars['String']
    modified: Scalars['String']
    parent: DiscussionMessageParent
    replyId?: Scalars['String']
    sent: Scalars['Boolean']
    system: Scalars['Boolean']
    whoRead: User[]
    __typename: 'DiscussionMessage'
}

export interface DiscussionMessageInfo {
    key: Scalars['String']
    value: Scalars['String']
    __typename: 'DiscussionMessageInfo'
}

export type DiscussionMessageParent = (DiscussionDirectMessagesRoom | DiscussionRoom | DiscussionThread) & { __isUnion?: true }

export interface DiscussionMessageParentStatus {
    displayName: Scalars['String']
    status: DiscussionMessageParentStatusEnum
    __typename: 'DiscussionMessageParentStatus'
}

export type DiscussionMessageParentStatusEnum = 'ACTUAL' | 'ARCHIVED'

export interface DiscussionRoom {
    dataObject?: DataObject
    description?: Scalars['String']
    hasUnreadMessages: Scalars['Boolean']
    hasUnreadThreadsMessages: Scalars['Boolean']
    icon?: File
    id: Scalars['String']
    lastMessage?: DiscussionMessage
    name: Scalars['String']
    owner: User
    participants: (Scalars['String'] | undefined)[]
    private: Scalars['Boolean']
    status: DiscussionMessageParentStatus
    type: Scalars['String']
    __typename: 'DiscussionRoom'
}

export interface DiscussionRoomList {
    items: DiscussionRoom[]
    pageInfo: PageInfo
    __typename: 'DiscussionRoomList'
}

export interface DiscussionThread {
    color?: Scalars['String']
    hasUnreadMessages: Scalars['Boolean']
    id: Scalars['String']
    lastMessage?: DiscussionMessage
    name: Scalars['String']
    owner: User
    parentId: Scalars['String']
    status: DiscussionMessageParentStatus
    type: Scalars['String']
    __typename: 'DiscussionThread'
}

export interface DiscussionThreadList {
    items: DiscussionThread[]
    pageInfo: PageInfo
    __typename: 'DiscussionThreadList'
}

export interface Document {
    DEFAULT_FILE_CONTENT?: Scalars['String']
    changeToken?: Scalars['String']
    checkedOut?: Scalars['Boolean']
    contextParameters?: Scalars['Map_String_ObjectScalar']
    dirtyProperties?: Scalars['Map_String_ObjectScalar']
    facets?: (Scalars['String'] | undefined)[]
    id?: Scalars['String']
    isCheckedOut?: Scalars['String']
    lastModified?: Scalars['String']
    lock?: Scalars['String']
    lockCreated?: Scalars['String']
    lockOwner?: Scalars['String']
    locked: Scalars['Boolean']
    name?: Scalars['String']
    parentRef?: Scalars['String']
    path?: Scalars['String']
    properties?: Scalars['Map_String_ObjectScalar']
    proxy: Scalars['Boolean']
    record: Scalars['Boolean']
    retainUntil?: Scalars['String']
    state?: Scalars['String']
    title?: Scalars['String']
    trashed: Scalars['Boolean']
    type?: Scalars['String']
    uid?: Scalars['String']
    underRetentionOrLegalHold: Scalars['Boolean']
    version: Scalars['Boolean']
    versionLabel?: Scalars['String']
    versionableId?: Scalars['String']
    __typename: 'Document'
}

export interface ExternalGroup {
    externalGroupDescription?: Scalars['String']
    externalGroupDisplayName: Scalars['String']
    externalGroupName: Scalars['String']
    __typename: 'ExternalGroup'
}

export interface ExternalGroupList {
    items: ExternalGroup[]
    pageInfo: PageInfo
    __typename: 'ExternalGroupList'
}

export interface ExternalGroupMapping {
    externalGroup?: Group
    mappedRoles?: (Role | undefined)[]
    __typename: 'ExternalGroupMapping'
}

export interface File {
    defaultResource?: Scalars['Boolean']
    encoding?: Scalars['String']
    length?: Scalars['String']
    mimeType?: Scalars['String']
    name: Scalars['String']
    resourceId?: Scalars['String']
    thumbnailUrl?: Scalars['String']
    url: Scalars['String']
    __typename: 'File'
}

export type FilterDefaultViewEnum = 'calendarView' | 'kanbanView' | 'navigateView' | 'tileView'

export interface GenericValidationResult {
    messages?: (Scalars['String'] | undefined)[]
    severity: Scalars['String']
    __typename: 'GenericValidationResult'
}

export interface GrantedPermissions {
    permissions: Permission[]
    role: Role
    __typename: 'GrantedPermissions'
}

export interface GrantedPrivileges {
    privileges: Privilege[]
    role: Role
    __typename: 'GrantedPrivileges'
}

export interface Group {
    description?: Scalars['String']
    displayName: Scalars['String']
    groups: Group[]
    isExternal: Scalars['Boolean']
    memberGroups?: (Scalars['String'] | undefined)[]
    memberUsers?: (Scalars['String'] | undefined)[]
    members: Member[]
    name: Scalars['String']
    parents?: (Scalars['String'] | undefined)[]
    roles: Role[]
    trashed: Scalars['Boolean']
    type: MemberType
    uid: Scalars['ID']
    __typename: 'Group'
}

export interface GroupList {
    items: Group[]
    pageInfo: PageInfo
    __typename: 'GroupList'
}

export interface HtmlWidget {
    creationDate: Scalars['Date']
    css?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    html?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    js?: Scalars['String']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    status: MetadataObjectStatusEnum
    widgetJson?: Scalars['String']
    __typename: 'HtmlWidget'
}

export interface HtmlWidgetGroup {
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    htmlWidgets: HtmlWidget[]
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    status: MetadataObjectStatusEnum
    type: HtmlWidgetGroupTypeEnum
    __typename: 'HtmlWidgetGroup'
}

export type HtmlWidgetGroupTypeEnum = 'APPLICATION' | 'DATATYPE' | 'MODULE' | 'WORKSPACE'

export interface Lifecycle {
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    lifecycleJson: Scalars['String']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    status: MetadataObjectStatusEnum
    __typename: 'Lifecycle'
}

export interface LifecycleState {
    allowedStateTransitions: Scalars['String'][]
    backgroundColor?: Scalars['String']
    completed?: Scalars['Boolean']
    description?: Scalars['String']
    disallowedActions: AllowedActionsEnum[]
    initial: Scalars['Boolean']
    name: Scalars['String']
    speculative: Scalars['Boolean']
    technicalState: Scalars['Boolean']
    textColor?: Scalars['String']
    __typename: 'LifecycleState'
}

export interface LifecycleTransition {
    customJson?: Scalars['String']
    description?: Scalars['String']
    destinationStateName?: Scalars['String']
    name?: Scalars['String']
    prohibitRecursiveTransition?: Scalars['Boolean']
    speculative?: Scalars['Boolean']
    __typename: 'LifecycleTransition'
}

export interface LocaleOption {
    key?: Scalars['String']
    label?: Scalars['String']
    __typename: 'LocaleOption'
}

export interface Member {
    displayName: Scalars['String']
    groups: Group[]
    isExternal: Scalars['Boolean']
    name: Scalars['String']
    parents?: (Scalars['String'] | undefined)[]
    roles: Role[]
    trashed: Scalars['Boolean']
    type: MemberType
    uid: Scalars['ID']
    __typename: 'Member'
}

export interface MemberType {
    displayName: Scalars['String']
    value: MemberTypeEnum
    __typename: 'MemberType'
}

export type MemberTypeEnum = 'GROUP' | 'ROLE' | 'USER'

export type MetadataObject = (ApiSpec | ApiSpecsGroup | Application | BpmnMessage | BpmnProcessType | Collection | DataPropertyAttributes | DataPropertyBoolean | DataPropertyDate | DataPropertyDateTime | DataPropertyDecimal | DataPropertyFile | DataPropertyFiles | DataPropertyInteger | DataPropertyMultiSelection | DataPropertyObject | DataPropertyObjectFilter | DataPropertyObjects | DataPropertySelection | DataPropertySequence | DataPropertyStatus | DataPropertyString | DataPropertyText | DataPropertyTime | DataPropertyUser | DataPropertyUserCommon | DataPropertyUsers | DataPropertyVersion | DataType | HtmlWidget | HtmlWidgetGroup | Lifecycle | Module | PostTemplate | ReferenceDataGroup | ReferenceDataType | Role | SystemFilter | TypeFilter | View | Workbench | Workspace) & { __isUnion?: true }

export type MetadataObjectChangeStatusActionsEnum = 'ARCHIVE' | 'DELETE' | 'UNARCHIVE'

export type MetadataObjectStatusEnum = 'ACTUAL' | 'ARCHIVED' | 'MODIFIED' | 'NOT_PUBLISHED'

export interface Module {
    apiSpecsGroups: ApiSpecsGroup[]
    brandingJson?: Scalars['String']
    calendarView?: Scalars['String']
    cardView?: Scalars['String']
    childTableView?: Scalars['String']
    createView?: Scalars['String']
    creationDate: Scalars['Date']
    dataTypes: DataType[]
    description?: Scalars['String']
    displayName: Scalars['String']
    editView?: Scalars['String']
    embedView?: Scalars['String']
    filters: SystemFilter[]
    grantedPrivileges?: (GrantedPrivileges | undefined)[]
    icon: File
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    kanbanView?: Scalars['String']
    lifecycleStates: LifecycleState[]
    lifecycles: Lifecycle[]
    modificationDate: Scalars['Date']
    name: Scalars['String']
    navigateView?: Scalars['String']
    parentId: Scalars['String']
    publish: Scalars['Boolean']
    reportingView?: Scalars['String']
    searchPage: SystemPage
    searchPanelProperties: PropertyGroup[]
    status: MetadataObjectStatusEnum
    templatesPage: SystemPage
    tileView?: Scalars['String']
    views: View[]
    workspaces: Workspace[]
    __typename: 'Module'
}


/** Mutation root */
export interface Mutation {
    setMembersForGroup: Scalars['Boolean']
    createDataPropertyFiles: DataProperty
    deleteOauth2ServiceTokens: Scalars['Boolean']
    updateWorkbench: Workbench
    createReferenceDataGroup: ReferenceDataGroup
    createRole: Role
    deleteRoom: Scalars['Boolean']
    updateDataPropertyBoolean: DataProperty
    removeObjectFromFavorites?: Scalars['Boolean']
    startImportMetadataTool: Scalars['Boolean']
    deleteAssetUploads: Scalars['Boolean']
    logout: Scalars['Boolean']
    changeRoomOwner: Scalars['Boolean']
    createDataPropertySequence: DataProperty
    updateDataPropertyDateTime: DataProperty
    updateTypeFilter: TypeFilter
    requestPasswordReset: Scalars['Boolean']
    createAssetUploads: AssetUpload[]
    updateDataPropertyFiles: DataProperty
    updateRoom: DiscussionRoom
    moveReferenceMetadataObject: Scalars['Boolean']
    enablePublishing: Scalars['Boolean']
    reindexRepository: Scalars['Boolean']
    disablePublishing: Scalars['Boolean']
    importToAssets: DataObject[]
    createBpmnMessage: BpmnMessage
    createFilter: SystemFilter
    changeThreadOwner: Scalars['Boolean']
    changeDataObjectStatus: Scalars['Boolean']
    deleteThread: Scalars['Boolean']
    addObjectToFavorites?: Scalars['Boolean']
    createSavedSearch: SavedSearch
    createDataPropertyText: DataProperty
    createDataPropertyBoolean: DataProperty
    updateThread: DiscussionThread
    updateUserPassword: Scalars['Boolean']
    leaveRoom: Scalars['Boolean']
    deleteDataObject: Scalars['Boolean']
    readMessages: (DiscussionMessage | undefined)[]
    updateDataPropertyDecimal: DataProperty
    deleteUser: Scalars['Boolean']
    createWorkspace: Workspace
    updateMessage: DiscussionMessage
    updateWorkspace: Workspace
    createDataPropertyString: DataProperty
    createOrUpdateBpmnProcessType?: Scalars['String']
    removeObjectsFromCollection?: DataObject[]
    updateGroup: Group
    login: Scalars['String']
    moveDataObject: Scalars['Boolean']
    updateView: View
    createBpmnProcessDataType: DataType
    createTypeFilter: TypeFilter
    deleteGroup: Scalars['Boolean']
    createView: View
    createDataPropertyUsers: DataProperty
    createDataPropertyObject: DataProperty
    createFilterView: View
    createApiSpec: ApiSpec
    createLifecycle: Lifecycle
    updateDataPropertyObjectFilter: DataProperty
    updateUser: User
    deleteMessage: Scalars['Boolean']
    createHtmlWidgetGroup: HtmlWidgetGroup
    createRoom: DiscussionRoom
    updateSettings: Scalars['Boolean']
    updateDataType: DataType
    token: Scalars['String']
    updateDataPropertyText: DataProperty
    archiveRoom: Scalars['Boolean']
    createReferenceDataType: ReferenceDataType
    updateApplication: Application
    addObjectsToFavorites?: DataObject[]
    deleteSavedSearch: Scalars['Boolean']
    updateSetting: Setting
    createDataObjectsFromLiveConnect: DataObject[]
    updateUserProfile: User
    updateLifecycle: Lifecycle
    changeDataObjectStatusBulk: Scalars['Boolean']
    hideDirectMessagesRoom: DiscussionDirectMessagesRoom
    createDataPropertyFile: DataProperty
    deleteDataObjectBulk: Scalars['Boolean']
    createUser: User
    removeObjectFromCollection?: Scalars['Boolean']
    unarchiveRoom: Scalars['Boolean']
    createDataType: DataType
    resetPassword: Scalars['Boolean']
    createDataPropertyUser: DataProperty
    createDataPropertyDateTime: DataProperty
    updateRole: Role
    addObjectToCollection?: Scalars['Boolean']
    /** Create data template from data object with GUID = dataObjectId. */
    saveDataObjectAsTemplate: DataObject
    createModule: Module
    updateFilter: SystemFilter
    clearCache: Scalars['Boolean']
    updateAsset: AssetUpload
    updateModulePrivileges: Module
    createDataPropertyTime: DataProperty
    updateDataPropertyFile: DataProperty
    updateDataPropertyMultiSelection: DataProperty
    archiveThread: Scalars['Boolean']
    updateDataPropertyVersion: DataProperty
    updateDataPropertyObject: DataProperty
    createDataPropertyDate: DataProperty
    updateDataPropertySequence: DataProperty
    updateReferenceMetadataObjectPermissions: ReferenceMetadataObject
    joinToPublicRoom: DiscussionRoom
    archiveMetaDataObject: Scalars['Boolean']
    updateDataPropertySelection: DataProperty
    republishDataObject: Scalars['Boolean']
    createGroup: Group
    updateDataPropertyStatus: DataProperty
    unarchiveMetaDataObject: Scalars['Boolean']
    changeDataObjectOwner: Scalars['Boolean']
    updateDataPropertyObjects: DataProperty
    deleteMetaDataObject: Scalars['Boolean']
    updatePostTemplate: PostTemplate
    updateTheme: Theme
    createThread: DiscussionThread
    createApiSpecsGroup: ApiSpecsGroup
    createDataPropertyInteger: DataProperty
    createDataObjectVersion: DataObject
    createMessage: DiscussionMessage
    updateHtmlWidget: HtmlWidget
    updateApiSpecsGroup: ApiSpecsGroup
    createDataObject: DataObject
    createCollection: Scalars['String']
    restoreDataObjectVersion: DataObject
    updateDataPropertyAttributes: DataProperty
    createDataObjectFromTemplate: DataObject
    updateBpmnMessage: BpmnMessage
    updateDataPropertyUser: DataProperty
    updateDataPropertyUsers: DataProperty
    moveDataObjectBulk: Scalars['Boolean']
    setMembersForRole: Scalars['Boolean']
    createDataPropertyObjects: DataProperty
    removeObjectsFromFavorites?: DataObject[]
    updateDataPropertyTime: DataProperty
    stopImportMetadataTool: Scalars['Boolean']
    updateReferenceDataGroup: ReferenceDataGroup
    sendEmail: Scalars['Boolean']
    restoreUser: User
    saveViewCustomization: Scalars['Boolean']
    failAssetUploads: Scalars['Boolean']
    changeDataObjectOwnerBulk: Scalars['Boolean']
    createDirectMessagesRoom: DiscussionDirectMessagesRoom
    createDataPropertyObjectFilter: DataProperty
    changeStatusAndUpdateDataObject: Scalars['Boolean']
    updateSavedSearch: SavedSearch
    unpublishDataObject: Scalars['Boolean']
    updateReferenceDataType: ReferenceDataType
    unarchiveThread: Scalars['Boolean']
    publishDataObject: Scalars['Boolean']
    createPostTemplate: PostTemplate
    createDataPropertySelection: DataProperty
    updateDataPropertyDate: DataProperty
    updateWorkspacePermissions: Workspace
    createDataPropertyMultiSelection: DataProperty
    readAllMessages: (DiscussionMessage | undefined)[]
    createWorkbench: Workbench
    addObjectsToCollection?: DataObject[]
    updateDataTypePrivileges: DataType
    updateDataPropertyInteger: DataProperty
    updateApiSpec: ApiSpec
    updateHtmlWidgetGroup: HtmlWidgetGroup
    deleteGroupBulk: Scalars['Boolean']
    updateDataObject: DataObject
    publish: Scalars['Boolean']
    createDataPropertyAttributes: DataProperty
    createExternalGroup: ExternalGroupMapping
    createDataPropertyDecimal: DataProperty
    recalcDataObjectFormulas: DataObject
    updateModule: Module
    createHtmlWidget: HtmlWidget
    deleteUserBulk: Scalars['Boolean']
    updateDataPropertyString: DataProperty
    __typename: 'Mutation'
}

export interface OAuth2ServiceProvider {
    authorizationServerUrl: Scalars['String']
    clientId?: Scalars['String']
    clientSecret?: Scalars['String']
    description?: Scalars['String']
    enabled: Scalars['Boolean']
    requestTokenUrl?: Scalars['String']
    scopes?: (Scalars['String'] | undefined)[]
    serviceName: Scalars['String']
    tokenServerUrl: Scalars['String']
    userAuthorizationUrl?: Scalars['String']
    __typename: 'OAuth2ServiceProvider'
}

export interface OAuth2ServiceToken {
    accessToken: Scalars['String']
    clientId?: Scalars['String']
    creationDate: Scalars['Date']
    expirationTimeMilliseconds?: Scalars['String']
    id?: Scalars['Long']
    isShared: Scalars['Boolean']
    refreshToken?: Scalars['String']
    serviceLogin: Scalars['String']
    serviceName: Scalars['String']
    sharedWith?: Scalars['String']
    username: Scalars['String']
    __typename: 'OAuth2ServiceToken'
}

export interface PageInfo {
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
    pageIndex: Scalars['Int']
    pageSize: Scalars['Int']
    totalCount: Scalars['Int']
    __typename: 'PageInfo'
}

export interface Permission {
    displayName: Scalars['String']
    value: PermissionEnum
    __typename: 'Permission'
}

export type PermissionEnum = 'CREATE' | 'MANAGE' | 'READ' | 'REMOVE' | 'WRITE'

export interface PostTemplate {
    bodyTemplate: Scalars['String']
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    status: MetadataObjectStatusEnum
    subjectTemplate: Scalars['String']
    __typename: 'PostTemplate'
}

export type PrivacyStatusEnum = 'PRIVATE' | 'PUBLIC'

export interface Privilege {
    displayName: Scalars['String']
    value: PrivilegeEnum
    __typename: 'Privilege'
}

export type PrivilegeEnum = 'CAN_CHANGE_OWNER' | 'CAN_CHANGE_STATE' | 'CAN_CREATE' | 'CAN_DELETE' | 'CAN_DOWNLOAD' | 'CAN_EDIT' | 'CAN_IMPORT' | 'CAN_MANAGE_FAVORITES' | 'CAN_MANAGE_PERMISSIONS' | 'CAN_MANAGE_SHARED_SEARCHES' | 'CAN_MANAGE_TEMPLATES' | 'CAN_MANAGE_VERSIONS' | 'CAN_MOVE' | 'CAN_PUBLISH' | 'CAN_READ' | 'CAN_SEE_HISTORY'

export interface PropertyGroup {
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    name: Scalars['String']
    properties: DataProperty[]
    status?: MetadataObjectStatusEnum
    __typename: 'PropertyGroup'
}

export interface PropertyType {
    displayName: Scalars['String']
    propertyTypeEnum: PropertyTypeEnum
    systemOnly: Scalars['Boolean']
    __typename: 'PropertyType'
}

export type PropertyTypeEnum = 'ATTRIBUTES' | 'BOOLEAN' | 'DATA_OBJECT' | 'DATA_OBJECTS' | 'DATE' | 'DATETIME' | 'DECIMAL' | 'FILE' | 'FILES' | 'INTEGER' | 'MULTI_SELECTION' | 'OBJECT_FILTER' | 'SELECTION' | 'SEQUENCE' | 'STATUS' | 'STRING' | 'TEXT' | 'TIME' | 'USER' | 'USERS' | 'VERSION'

export interface PublishedApplication {
    displayName: Scalars['String']
    htmlWidgets: PublishedHtmlWidget[]
    id: Scalars['String']
    modules: PublishedModule[]
    notificationJson: Scalars['String']
    toolbarJson: Scalars['String']
    workbenches: PublishedWorkbench[]
    __typename: 'PublishedApplication'
}

export interface PublishedApplicationVersion {
    comment: Scalars['String']
    id: Scalars['String']
    publishDate: Scalars['String']
    user: User
    version: Scalars['String']
    __typename: 'PublishedApplicationVersion'
}

export interface PublishedApplicationVersionList {
    items: PublishedApplicationVersion[]
    pageInfo: PageInfo
    __typename: 'PublishedApplicationVersionList'
}

export interface PublishedDataType {
    brandingJson?: Scalars['String']
    canCreateAnother: Scalars['Boolean']
    dataTypeComment?: DataType
    description?: Scalars['String']
    displayName: Scalars['String']
    exportViews: PublishedExportView[]
    id: Scalars['String']
    lifecycle: PublishedLifecycle
    name: Scalars['String']
    publishedReportingView: PublishedView
    stateMachine?: Scalars['String']
    __typename: 'PublishedDataType'
}

export interface PublishedExportView {
    description?: Scalars['String']
    displayName: Scalars['String']
    fileProperty?: Scalars['String']
    group?: Scalars['String']
    id: Scalars['String']
    name: Scalars['String']
    parentId: Scalars['String']
    template?: File
    viewMode?: Scalars['String']
    viewTypeEnum?: ViewTypeEnum
    __typename: 'PublishedExportView'
}

export interface PublishedFilter {
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    name: Scalars['String']
    route: Scalars['String']
    __typename: 'PublishedFilter'
}

export interface PublishedHtmlWidget {
    css?: Scalars['String']
    html?: Scalars['String']
    id: Scalars['String']
    js?: Scalars['String']
    name: Scalars['String']
    widgetJson?: Scalars['String']
    __typename: 'PublishedHtmlWidget'
}

export interface PublishedLifecycle {
    lifecycleJson?: Scalars['String']
    __typename: 'PublishedLifecycle'
}

export interface PublishedModule {
    availableUsers?: User[]
    brandingJson?: Scalars['String']
    dataTypes: PublishedDataType[]
    description?: Scalars['String']
    displayName: Scalars['String']
    filters: PublishedFilter[]
    icon: File
    id: Scalars['String']
    import: Scalars['Boolean']
    lifecycleStates: LifecycleState[]
    name: Scalars['String']
    properties: PropertyGroup[]
    route: Scalars['String']
    searchPage: SystemPage
    templatesPage: SystemPage
    userPrivileges: PrivilegeEnum[]
    workspaces: PublishedWorkspace[]
    __typename: 'PublishedModule'
}

export interface PublishedView {
    childrenTypes: PublishedDataType[]
    contextId: Scalars['String']
    customFilterId?: Scalars['String']
    defaultView: Scalars['Boolean']
    filterJson?: Scalars['String']
    id: Scalars['String']
    idCopy: Scalars['String']
    import: Scalars['Boolean']
    objectId?: Scalars['ID']
    parentForCreation?: Scalars['ID']
    properties?: (PropertyGroup | undefined)[]
    sortingJson?: Scalars['String']
    upload?: Scalars['Boolean']
    viewJson: Scalars['String']
    viewMode?: Scalars['String']
    viewType: ViewTypeEnum
    __typename: 'PublishedView'
}

export interface PublishedWorkbench {
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    menuJson?: Scalars['String']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    roles: Role[]
    status: MetadataObjectStatusEnum
    __typename: 'PublishedWorkbench'
}

export interface PublishedWorkspace {
    brandingJson?: Scalars['String']
    description?: Scalars['String']
    displayName: Scalars['String']
    icon: File
    id: Scalars['String']
    import: Scalars['Boolean']
    name: Scalars['String']
    objectId: Scalars['ID']
    route: Scalars['String']
    userPrivileges: PrivilegeEnum[]
    __typename: 'PublishedWorkspace'
}


/** Query root */
export interface Query {
    publishedTypeFilters: TypeFilter[]
    setting: Setting
    fixWorkbenches: Scalars['Boolean']
    module: Module
    profile: User
    dataObjectStatusOptions: LifecycleTransition[]
    aggredatedDataObjects: DataObjectList
    userSelectionOptions: User[]
    isApiSpecValid: Scalars['Boolean']
    dateDisplayFormats: DateDisplayFormat[]
    role: Role
    isLifecycleValid: Scalars['Boolean']
    savedSearch: SavedSearch
    publishedApplication: PublishedApplication
    validationResults: (ValidationResults | undefined)[]
    /** Get template by id if user has privileges to data type. */
    dataObjectTemplate: DataObject
    userCollections?: (Collection | undefined)[]
    serviceDtoJson: Scalars['String']
    dataProperty: DataProperty
    auditLogEntries: AuditLogEntriesList
    htmlWidgetGroup: HtmlWidgetGroup
    privileges: Privilege[]
    workspace: Workspace
    htmlWidget: HtmlWidget
    lifecycle: Lifecycle
    view: View
    versionDisplayFormats: VersionDisplayFormat[]
    workbench: Workbench
    isDataObjectValid: Scalars['Boolean']
    isRoleValid: Scalars['Boolean']
    availableMembersForGroup: Member[]
    dataObjectSelectionView: PublishedView
    passwordResetKeyValid: Scalars['Boolean']
    dataType: DataType
    externalGroups: ExternalGroupList
    dataObjectVersions: Version[]
    users: UserList
    trashableUsers: UserList
    objectsFromFavorites?: DataObjectList
    auditUsers: UserList
    isLoggedIn: Scalars['Boolean']
    apiSpec: ApiSpec
    dataObjects: DataObjectList
    roles: RoleList
    isWorkbenchValid: Scalars['Boolean']
    postTemplate: PostTemplate
    textFormatTypes: TextFormatType[]
    isGroupValid: Scalars['Boolean']
    isReferenceDataTypeValid: Scalars['Boolean']
    workbenches: Workbench[]
    canChangeMetadataObjectStatus: Scalars['Boolean']
    savedSearches: SavedSearch[]
    getCollection: Scalars['String']
    isObjectInFavorites?: Scalars['Boolean']
    publicRooms: DiscussionRoomList
    booleanDisplayFormats: BooleanDisplayFormat[]
    message: DiscussionMessage
    room: DiscussionRoom
    isPostTemplateValid: Scalars['Boolean']
    bpmnProcessType: BpmnProcessType
    systemDefaults: SystemDefaults
    /** Get list of all available templates, filtered by user data type privileges. */
    dataObjectTemplates: DataObject[]
    propertyTypes: PropertyType[]
    isTypeFilterValid: Scalars['Boolean']
    availableSelections: DataProperty[]
    publishedViews: PublishedView[]
    referenceMetadataObjects: ReferenceMetadataObject[]
    isDataPropertyValid: Scalars['Boolean']
    currentUserRooms: DiscussionRoomList
    nextMessages: (DiscussionMessage | undefined)[]
    isUserValid: Scalars['Boolean']
    permissions: Permission[]
    defaultResources: DefaultResources
    enabledLocales: (LocaleOption | undefined)[]
    apiSpecsGroup: ApiSpecsGroup
    bpmnMessage: BpmnMessage
    publishedAggregatedViews: PublishedView[]
    typeFilter: TypeFilter
    apiSpecsGroups: ApiSpecsGroup[]
    dataObjectVersionOptions: VersionIncrement[]
    objectsFromCollection?: DataObjectList
    analyzerMap: Scalars['Map_String_StringScalar']
    assetUploads: AssetUploadList
    isDataObjectValid2: DataObjectChanges
    isModuleValid: Scalars['Boolean']
    theme: Theme
    isDataTypeValid: Scalars['Boolean']
    isReferenceDataGroupValid: Scalars['Boolean']
    isApiSpecsGroupValid: Scalars['Boolean']
    publishedApplicationVersions: PublishedApplicationVersionList
    filter: SystemFilter
    viewTypes: ViewType[]
    canDeleteLifecycleState: Scalars['Boolean']
    previousMessages: (DiscussionMessage | undefined)[]
    validateUpdateUserPassword: Scalars['Boolean']
    translate: Translate
    publishedModuleFilters: SystemFilter[]
    routes: Route[]
    publishedFilterViews: PublishedView[]
    isBpmnMessageValid: Scalars['Boolean']
    group: Group
    oauth2ServiceProviders: (OAuth2ServiceProvider | undefined)[]
    settings: Setting[]
    availableMembersForRole: Member[]
    isBpmnProcessValid: Scalars['Boolean']
    directMessagesRoom: DiscussionDirectMessagesRoom
    dataObjectGenericStatus: DataObjectGenericStatus
    isFilterValid: Scalars['Boolean']
    referenceDataGroup: ReferenceDataGroup
    isViewValid: Scalars['Boolean']
    dataObject: DataObject
    passwordValid: Scalars['Boolean']
    canChangeLifecycle: Scalars['Boolean']
    publishedReportingViews: PublishedView[]
    oauth2ServiceTokens: (OAuth2ServiceToken | undefined)[]
    offsetMessages: (DiscussionMessage | undefined)[]
    offsetMessagesFromFirstUnread: (DiscussionMessage | undefined)[]
    referenceDataType: ReferenceDataType
    directMessagesRooms: DiscussionDirectMessagesRoomList
    attributesSelectionOptions: Attribute[]
    isWorkspaceValid: Scalars['Boolean']
    threads: DiscussionThreadList
    groups: GroupList
    thread: DiscussionThread
    lastMessages: (DiscussionMessage | undefined)[]
    /** Select available target folder or workspace for data object creation.Method considers current user privileges and permissions. */
    dataObjectHierarchy: DataObjectHierarchy[]
    application: Application
    dataObjectSelectionOptions: DataObject[]
    user: User
    __typename: 'Query'
}

export interface RdmContentPayload {
    referenceDataTypeId?: Scalars['String']
    __typename: 'RdmContentPayload'
}

export interface ReferenceDataGroup {
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    grantedPermissions: GrantedPermissions[]
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    permissionsInherited?: Scalars['Boolean']
    referenceMetadataObjectType: ReferenceMetadataObjectTypeEnum
    referenceMetadataObjects: ReferenceMetadataObject[]
    status: MetadataObjectStatusEnum
    __typename: 'ReferenceDataGroup'
}

export interface ReferenceDataType {
    createRecordView?: Scalars['String']
    creationDate: Scalars['Date']
    dataFile?: File
    description?: Scalars['String']
    displayName: Scalars['String']
    editRecordView?: Scalars['String']
    filterJson?: Scalars['String']
    grantedPermissions: GrantedPermissions[]
    id: Scalars['String']
    isDateSpecific?: Scalars['Boolean']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    navigateRecordView?: Scalars['String']
    parentId: Scalars['String']
    parentReferenceDataType?: ReferenceDataType
    permissionsInherited?: Scalars['Boolean']
    properties: PropertyGroup[]
    recordTableView?: Scalars['String']
    referenceMetadataObjectType: ReferenceMetadataObjectTypeEnum
    searchPanelProperties: PropertyGroup[]
    status: MetadataObjectStatusEnum
    views: View[]
    __typename: 'ReferenceDataType'
}

export type ReferenceMetadataObject = (ReferenceDataGroup | ReferenceDataType) & { __isUnion?: true }

export type ReferenceMetadataObjectTypeEnum = 'DATA_TYPE' | 'GROUP'

export interface Role {
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    members?: (Member | undefined)[]
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    roles?: (Role | undefined)[]
    status: MetadataObjectStatusEnum
    visible?: Scalars['Boolean']
    __typename: 'Role'
}

export interface RoleList {
    items: Role[]
    pageInfo: PageInfo
    __typename: 'RoleList'
}

export interface Route {
    description: Scalars['String']
    displayName: Scalars['String']
    route: Scalars['String']
    routes: Route[]
    __typename: 'Route'
}

export interface SavedSearch {
    displayName: Scalars['String']
    filterJson: Scalars['String']
    id: Scalars['ID']
    moduleName?: Scalars['String']
    owner: User
    route: Scalars['String']
    sortingJson: Scalars['String']
    viewJson: Scalars['String']
    __typename: 'SavedSearch'
}

export type SequenceRestartInterval = 'month' | 'never' | 'year'

export interface Setting {
    key: Scalars['String']
    value: Scalars['String']
    __typename: 'Setting'
}

export interface StaticContentFile {
    defaultResource?: Scalars['Boolean']
    encoding?: Scalars['String']
    htmlFiles?: Scalars['Map_String_StringScalar']
    length?: Scalars['String']
    mimeType?: Scalars['String']
    name: Scalars['String']
    resourceId?: Scalars['String']
    thumbnailUrl?: Scalars['String']
    url: Scalars['String']
    __typename: 'StaticContentFile'
}


/** Subscription root */
export interface Subscription {
    messages?: SubscriptionMessage
    unspecifiedPayloadMessages?: SubscriptionUnspecifiedMessage
    csvImports?: SubscriptionCsvImportStatus
    actions?: SubscriptionAction
    dataObjectChanges?: DataObject
    rdmContentChanges?: SubscriptionRdmContentChanges
    __typename: 'Subscription'
}

export interface SubscriptionAction {
    payload: SubscriptionActionPayload
    topic: Scalars['String']
    __typename: 'SubscriptionAction'
}

export interface SubscriptionActionPayload {
    actionKey: Scalars['String']
    relatedObjects?: Scalars['Map_String_StringScalar']
    __typename: 'SubscriptionActionPayload'
}

export interface SubscriptionCsvImportStatus {
    payload: CsvImportStatus
    topic: Scalars['String']
    __typename: 'SubscriptionCsvImportStatus'
}

export interface SubscriptionMessage {
    payload: DiscussionMessage
    topic: Scalars['String']
    __typename: 'SubscriptionMessage'
}

export interface SubscriptionRdmContentChanges {
    payload: RdmContentPayload
    topic: Scalars['String']
    __typename: 'SubscriptionRdmContentChanges'
}

export interface SubscriptionUnspecifiedMessage {
    payload: Scalars['ObjectScalar']
    topic: Scalars['String']
    __typename: 'SubscriptionUnspecifiedMessage'
}

export interface SystemDefaults {
    locale: Scalars['String']
    passwordSettings: Setting[]
    timezone: Scalars['String']
    __typename: 'SystemDefaults'
}

export interface SystemFilter {
    calendarView?: Scalars['String']
    childrenTypes: DataType[]
    creationDate: Scalars['Date']
    dataObjectContext: Scalars['Boolean']
    defaultListView?: FilterDefaultViewEnum
    defaultViewType?: ViewTypeEnum
    description?: Scalars['String']
    displayName: Scalars['String']
    exactDataType: Scalars['Boolean']
    filterJson: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    kanbanView?: Scalars['String']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    navigateView?: Scalars['String']
    parentId: Scalars['String']
    searchPanelProperties: PropertyGroup[]
    status: MetadataObjectStatusEnum
    tileView?: Scalars['String']
    __typename: 'SystemFilter'
}

export interface SystemPage {
    calendarView?: Scalars['String']
    enabled: Scalars['Boolean']
    filterJson?: Scalars['String']
    navigateView?: Scalars['String']
    tileView?: Scalars['String']
    __typename: 'SystemPage'
}

export interface TextFormatType {
    displayName: Scalars['String']
    textFormatTypeEnum: TextFormatTypeEnum
    __typename: 'TextFormatType'
}

export type TextFormatTypeEnum = 'HTML' | 'PLAIN'

export interface Theme {
    applicationTitle: Scalars['String']
    favicon: File
    leftPanelDarkMode: Scalars['Boolean']
    logo: File
    logoSmall: File
    primaryColor: Scalars['String']
    staticContent?: StaticContentFile
    uid?: Scalars['String']
    __typename: 'Theme'
}

export interface Translate {
    items?: (TranslateOption | undefined)[]
    __typename: 'Translate'
}

export interface TranslateOption {
    locale?: Scalars['String']
    value?: Scalars['String']
    __typename: 'TranslateOption'
}

export interface TypeFilter {
    calendarView?: Scalars['String']
    childrenTypes: DataType[]
    creationDate: Scalars['Date']
    dataObjectContext: Scalars['Boolean']
    defaultListView?: FilterDefaultViewEnum
    description?: Scalars['String']
    displayName: Scalars['String']
    exactDataType: Scalars['Boolean']
    filterJson: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    kanbanView?: Scalars['String']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    navigateView?: Scalars['String']
    parentId: Scalars['String']
    searchPanelProperties: PropertyGroup[]
    status: MetadataObjectStatusEnum
    tileView?: Scalars['String']
    __typename: 'TypeFilter'
}

export interface User {
    allGroups?: Group[]
    allRoles?: Role[]
    displayName: Scalars['String']
    groups: Group[]
    isExternal: Scalars['Boolean']
    isSuperUser: Scalars['Boolean']
    name: Scalars['String']
    parents?: (Scalars['String'] | undefined)[]
    roles: Role[]
    trashed: Scalars['Boolean']
    type: MemberType
    uid: Scalars['ID']
    userprofile: UserProfile
    visible?: Scalars['Boolean']
    __typename: 'User'
}

export interface UserList {
    items: User[]
    pageInfo: PageInfo
    __typename: 'UserList'
}

export interface UserProfile {
    avatar?: File
    birthdate?: Scalars['Date']
    email: Scalars['String']
    firstName: Scalars['String']
    gender?: Scalars['Boolean']
    lastName: Scalars['String']
    locale?: Scalars['String']
    phonenumber?: Scalars['String']
    timezone?: Scalars['String']
    __typename: 'UserProfile'
}

export interface ValidationResults {
    dataType?: DataType
    isValid: Scalars['Boolean']
    module?: Module
    validation?: (GenericValidationResult | undefined)[]
    __typename: 'ValidationResults'
}

export interface Version {
    majorVersion: Scalars['Int']
    minorVersion: Scalars['Int']
    qualifier?: VersionQualifier
    versionInfo?: VersionInfo
    __typename: 'Version'
}

export interface VersionDisplayFormat {
    displayFormatEnum?: VersionDisplayFormatEnum
    displayName?: Scalars['String']
    __typename: 'VersionDisplayFormat'
}

export type VersionDisplayFormatEnum = 'LONG' | 'SHORT'

export interface VersionIncrement {
    displayName: Scalars['String']
    version: Scalars['String']
    versionIncrementEnum: VersionIncrementEnum
    __typename: 'VersionIncrement'
}

export type VersionIncrementEnum = 'MAJOR' | 'MINOR'

export interface VersionInfo {
    comment?: Scalars['String']
    creationDate?: Scalars['Date']
    route: Scalars['String']
    user?: User
    __typename: 'VersionInfo'
}

export interface VersionQualifier {
    displayName: Scalars['String']
    versionQualifierEnum: VersionQualifierEnum
    __typename: 'VersionQualifier'
}

export type VersionQualifierEnum = 'ACTUAL' | 'DRAFT'

export interface View {
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    fileProperty?: Scalars['String']
    group?: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    managementMode?: ViewManagementModeEnum
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    properties: PropertyGroup[]
    sortingJson?: Scalars['String']
    status: MetadataObjectStatusEnum
    template?: File
    viewJson: Scalars['String']
    viewMode?: Scalars['String']
    viewType: ViewType
    __typename: 'View'
}

export type ViewManagementModeEnum = 'AUTO_MANAGEMENT' | 'USER_MANAGEMENT'

export interface ViewType {
    displayName: Scalars['String']
    viewTypeEnum: ViewTypeEnum
    __typename: 'ViewType'
}

export type ViewTypeEnum = 'CALENDAR' | 'CARD' | 'CONTAINER' | 'EXPORT' | 'FORM' | 'KANBAN' | 'REPORTING' | 'TABLE' | 'TILE'

export type WorkStateEnum = 'COMPLETED' | 'ERROR' | 'RUNNING' | 'SCHEDULED'

export interface Workbench {
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    id: Scalars['String']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    menuJson?: Scalars['String']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    parentId: Scalars['String']
    roles: Role[]
    status: MetadataObjectStatusEnum
    __typename: 'Workbench'
}

export interface Workspace {
    brandingJson?: Scalars['String']
    calendarView?: Scalars['String']
    cardView?: Scalars['String']
    childTableView?: Scalars['String']
    childrenTypes: DataType[]
    createView?: Scalars['String']
    creationDate: Scalars['Date']
    description?: Scalars['String']
    displayName: Scalars['String']
    editView?: Scalars['String']
    embedView?: Scalars['String']
    filterJson?: Scalars['String']
    grantedPermissions: GrantedPermissions[]
    icon: File
    id: Scalars['String']
    isImportAllowed: Scalars['Boolean']
    isPreconfigured: Scalars['Boolean']
    isSystem: Scalars['Boolean']
    kanbanView?: Scalars['String']
    modificationDate: Scalars['Date']
    name: Scalars['String']
    navigateView?: Scalars['String']
    parentId: Scalars['String']
    searchPanelProperties: PropertyGroup[]
    status: MetadataObjectStatusEnum
    tileView?: Scalars['String']
    views: View[]
    __typename: 'Workspace'
}

export interface XmlAndModelDecoration {
    bpmnXml?: Scalars['String']
    decorJson?: Scalars['String']
    valid: Scalars['Boolean']
    validationResultsJson?: Scalars['String']
    __typename: 'XmlAndModelDecoration'
}

export interface ApiSpecRequest{
    authMethod?: boolean | number
    basicAuthLogin?: boolean | number
    basicAuthPassword?: boolean | number
    clientCredFlowClientId?: boolean | number
    clientCredFlowClientSecret?: boolean | number
    clientCredFlowTokenUrl?: boolean | number
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    modificationDate?: boolean | number
    moduleDtoJson?: boolean | number
    name?: boolean | number
    openApiJson?: boolean | number
    parentId?: boolean | number
    serviceUrl?: boolean | number
    status?: boolean | number
    version?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ApiSpecsGroupRequest{
    apiSpecs?: ApiSpecRequest
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ApplicationRequest{
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    htmlWidgetGroups?: [{type?: (HtmlWidgetGroupTypeEnum | null)},HtmlWidgetGroupRequest] | HtmlWidgetGroupRequest
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    modificationDate?: boolean | number
    modules?: ModuleRequest
    name?: boolean | number
    notificationJson?: boolean | number
    parentId?: boolean | number
    roles?: RoleRequest
    status?: boolean | number
    toolbarJson?: boolean | number
    workbenches?: WorkbenchRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AssetDropboxInput {fileId: Scalars['String'],fileName: Scalars['String'],targetFolderId: Scalars['String']}

export interface AssetUploadRequest{
    batchFileIndex?: boolean | number
    batchId?: boolean | number
    chunks?: boolean | number
    creationDate?: boolean | number
    fileName?: boolean | number
    hash?: boolean | number
    id?: boolean | number
    loadedChunks?: boolean | number
    loadedSize?: boolean | number
    mimeType?: boolean | number
    previewUrl?: boolean | number
    size?: boolean | number
    status?: AssetUploadStatusRequest
    targetDocumentId?: boolean | number
    targetDocumentRoute?: boolean | number
    targetFolderId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AssetUploadInput {chunks?: (Scalars['Int'] | null),dataObjectId?: (Scalars['String'] | null),fileName: Scalars['String'],hash: Scalars['String'],mimeType: Scalars['String'],previewUrl?: (Scalars['String'] | null),size: Scalars['Long']}

export interface AssetUploadListRequest{
    items?: AssetUploadRequest
    pageInfo?: PageInfoRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AssetUploadStatusRequest{
    displayName?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AttributeRequest{
    attribute?: boolean | number
    attributeType?: PropertyTypeRequest
    label?: boolean | number
    referenceDataTypeId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AttributeValueRequest{
    attribute?: AttributeRequest
    value?: DataPropertyAttributesValueUnionRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AttributeValueInput {attribute: Scalars['String'],booleanValueInput?: (DataPropertyBooleanValueInput | null),dateTimeValueInput?: (DataPropertyDateTimeValueInput | null),dateValueInput?: (DataPropertyDateValueInput | null),decimalValueInput?: (DataPropertyDecimalValueInput | null),integerValueInput?: (DataPropertyIntegerValueInput | null),multiSelectionValueInput?: (DataPropertyMultiSelectionValueInput | null),selectionValueInput?: (DataPropertySelectionValueInput | null),stringValueInput?: (DataPropertyStringValueInput | null),textValueInput?: (DataPropertyTextValueInput | null),timeValueInput?: (DataPropertyTimeValueInput | null)}

export interface AuditCategoryRequest{
    displayName?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuditEventRequest{
    displayName?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuditLogEntriesListRequest{
    items?: AuditLogEntryRequest
    pageInfo?: PageInfoRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuditLogEntryRequest{
    category?: AuditCategoryRequest
    event?: AuditEventRequest
    eventDate?: boolean | number
    id?: boolean | number
    info?: boolean | number
    user?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BooleanDisplayFormatRequest{
    displayFormatEnum?: boolean | number
    displayName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BpmnMessageRequest{
    creationDate?: boolean | number
    dataJson?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BpmnMessageGroupRequest{
    description?: boolean | number
    displayName?: boolean | number
    id?: boolean | number
    name?: boolean | number
    properties?: BpmnMessageRequest
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BpmnProcessTypeRequest{
    bpmnXml?: boolean | number
    creationDate?: boolean | number
    decorJson?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    lifecycleJson?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    processDefinitionId?: boolean | number
    processDefinitionKey?: boolean | number
    processDefinitionVersionTag?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CollectionRequest{
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isHidden?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    status?: boolean | number
    uid?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CreateApiSpecInput {authMethod: AuthMethod,basicAuthLogin?: (Scalars['String'] | null),basicAuthPassword?: (Scalars['String'] | null),clientCredFlowClientId?: (Scalars['String'] | null),clientCredFlowClientSecret?: (Scalars['String'] | null),clientCredFlowTokenUrl?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),name?: (Scalars['String'] | null),openApiJson: Scalars['String'],parentId: Scalars['String'],serviceUrl: Scalars['String']}

export interface CreateApiSpecsGroupInput {description?: (Scalars['String'] | null),displayName: Scalars['String'],name: Scalars['String'],parentId: Scalars['String']}

export interface CreateBpmnMessageInput {dataJson?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),name?: (Scalars['String'] | null),parentId: Scalars['String']}

export interface CreateBpmnProcessDataTypeInput {baseType?: (Scalars['String'] | null),brandingJson?: (Scalars['String'] | null),canHaveChildren?: (Scalars['Boolean'] | null),canHaveDiscussion?: (Scalars['Boolean'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],inheritBpmnScheme?: (Scalars['Boolean'] | null),name: Scalars['String'],parentId: Scalars['String'],rootVersionable?: (Scalars['Boolean'] | null)}

export interface CreateDataObjectFromTemplateInput {parentId: Scalars['ID'],properties?: (DataObjectPropertyInput[] | null),templateId: Scalars['ID']}

export interface CreateDataObjectInput {parentId: Scalars['ID'],properties?: (DataObjectPropertyInput[] | null),typeId: Scalars['String']}

export interface CreateDataObjectVersionInput {dataObjectId: Scalars['ID'],versionIncrementEnum: VersionIncrementEnum}

export interface CreateDataPropertyAttributesInput {customizationRef?: (Scalars['String'] | null),dateDataPropertyKey?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],helpText?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String'],parentSelection?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),referenceDataTypeId?: (Scalars['String'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyBooleanInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyBooleanValueInput | null),description?: (Scalars['String'] | null),displayFalseAs?: (Scalars['String'] | null),displayFalseColor?: (Scalars['String'] | null),displayFormat?: (BooleanDisplayFormatEnum | null),displayName: Scalars['String'],displayTrueAs?: (Scalars['String'] | null),displayTrueColor?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyDateInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyDateValueInput | null),description?: (Scalars['String'] | null),displayFormat?: (DateDisplayFormatEnum | null),displayName: Scalars['String'],helpText?: (Scalars['String'] | null),maxValue?: (DataPropertyDateValueInput | null),minValue?: (DataPropertyDateValueInput | null),name: Scalars['String'],parentId: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyDateTimeInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyDateTimeValueInput | null),description?: (Scalars['String'] | null),displayFormat?: (DateDisplayFormatEnum | null),displayName: Scalars['String'],helpText?: (Scalars['String'] | null),maxValue?: (DataPropertyDateTimeValueInput | null),minValue?: (DataPropertyDateTimeValueInput | null),name: Scalars['String'],parentId: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null),useTimeZone?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyDecimalInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyDecimalValueInput | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],formula?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),maxValue?: (DataPropertyDecimalValueInput | null),minValue?: (DataPropertyDecimalValueInput | null),name: Scalars['String'],parentId: Scalars['String'],precision?: (Scalars['Int'] | null),prefix?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),suffix?: (Scalars['String'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyFileInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],downloadable?: (Scalars['Boolean'] | null),helpText?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyFilesInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],downloadable?: (Scalars['Boolean'] | null),helpText?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyIntegerInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyIntegerValueInput | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],helpText?: (Scalars['String'] | null),maxValue?: (DataPropertyIntegerValueInput | null),minValue?: (DataPropertyIntegerValueInput | null),name: Scalars['String'],parentId: Scalars['String'],prefix?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),suffix?: (Scalars['String'] | null),unique?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyMultiSelectionInput {customizationRef?: (Scalars['String'] | null),dateDataPropertyKey?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],helpText?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String'],parentSelection?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),referenceDataTypeId?: (Scalars['String'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyObjectFilterInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],filterId?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String'],readonly?: (Scalars['Boolean'] | null),relationModuleId?: (Scalars['String'] | null),relationObjectProperty?: (Scalars['String'] | null),relationTypes?: ((Scalars['String'] | null)[] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null),viewJson?: (Scalars['String'] | null)}

export interface CreateDataPropertyObjectInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],helpText?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String'],readonly?: (Scalars['Boolean'] | null),relationModuleId?: (Scalars['String'] | null),relationObjectProperty?: (Scalars['String'] | null),relationTypes?: ((Scalars['String'] | null)[] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null),viewJson?: (Scalars['String'] | null)}

export interface CreateDataPropertyObjectsInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],helpText?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String'],readonly?: (Scalars['Boolean'] | null),relationModuleId?: (Scalars['String'] | null),relationObjectProperty?: (Scalars['String'] | null),relationTypes?: ((Scalars['String'] | null)[] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null),viewJson?: (Scalars['String'] | null)}

export interface CreateDataPropertySelectionInput {customizationRef?: (Scalars['String'] | null),dateDataPropertyKey?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],formula?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String'],parentSelection?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),referenceDataTypeId?: (Scalars['String'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertySequenceInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],helpText?: (Scalars['String'] | null),initialValue: Scalars['Int'],name: Scalars['String'],parentId: Scalars['String'],prefix?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),restartInterval: SequenceRestartInterval,suffix?: (Scalars['String'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyStringInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyStringValueInput | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],formula?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),icon?: (Scalars['String'] | null),maxLength?: (Scalars['Int'] | null),minLength?: (Scalars['Int'] | null),multilanguage?: (Scalars['Boolean'] | null),name: Scalars['String'],parentId: Scalars['String'],pattern?: (Scalars['String'] | null),prefix?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),suffix?: (Scalars['String'] | null),unique?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyTextInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyTextValueInput | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],formatType: TextFormatTypeEnum,helpText?: (Scalars['String'] | null),maxLength?: (Scalars['Int'] | null),minLength?: (Scalars['Int'] | null),multilanguage?: (Scalars['Boolean'] | null),name: Scalars['String'],parentId: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyTimeInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyTimeValueInput | null),description?: (Scalars['String'] | null),displayFormat?: (DateDisplayFormatEnum | null),displayName: Scalars['String'],helpText?: (Scalars['String'] | null),maxValue?: (DataPropertyTimeValueInput | null),minValue?: (DataPropertyTimeValueInput | null),name: Scalars['String'],parentId: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyUserInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],filterByDataObjectPermissions?: (Scalars['Boolean'] | null),filterByDataTypePrivileges?: (Scalars['Boolean'] | null),filterByRoles?: (Scalars['String'][] | null),helpText?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),sortingFullName?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataPropertyUsersInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],filterByDataObjectPermissions?: (Scalars['Boolean'] | null),filterByDataTypePrivileges?: (Scalars['Boolean'] | null),filterByRoles?: (Scalars['String'][] | null),helpText?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),sortingFullName?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface CreateDataTypeInput {baseType?: (Scalars['String'] | null),brandingJson?: (Scalars['String'] | null),canHaveChildren?: (Scalars['Boolean'] | null),canHaveDiscussion?: (Scalars['Boolean'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],inheritBpmnScheme?: (Scalars['Boolean'] | null),lifecycle: Scalars['String'],name: Scalars['String'],parentId: Scalars['String'],rootVersionable?: (Scalars['Boolean'] | null)}

export interface CreateDiscussionDirectMessagesRoomInput {participant: Scalars['String']}

export interface CreateDiscussionMessageInput {attachmentsValueInput?: (FilesInput | null),message?: (Scalars['String'] | null),parentId: Scalars['String'],replyId?: (Scalars['String'] | null)}

export interface CreateDiscussionRoomInput {description?: (Scalars['String'] | null),hidden?: (Scalars['Boolean'] | null),iconBatchId?: (Scalars['String'] | null),name: Scalars['String'],participants: Scalars['String'][],private: Scalars['Boolean']}

export interface CreateDiscussionThreadInput {color?: (Scalars['String'] | null),initMessage: Scalars['String'],name: Scalars['String'],roomId: Scalars['String']}

export interface CreateGroupInput {description?: (Scalars['String'] | null),displayName: Scalars['String'],name: Scalars['String']}

export interface CreateHtmlWidgetGroupInput {description?: (Scalars['String'] | null),name: Scalars['String'],type: HtmlWidgetGroupTypeEnum}

export interface CreateHtmlWidgetInput {css?: (Scalars['String'] | null),html?: (Scalars['String'] | null),js?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String'],widgetJson?: (Scalars['String'] | null)}

export interface CreateLifecycleInput {description?: (Scalars['String'] | null),displayName: Scalars['String'],name: Scalars['String'],parentId: Scalars['String']}

export interface CreateModuleInput {brandingJson?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],iconBatchId?: (Scalars['String'] | null),name: Scalars['String']}

export interface CreateOrUpdateBpmnProcessTypeInput {bpmn?: (Scalars['String'] | null),decor?: (Scalars['String'] | null),parentId: Scalars['String']}

export interface CreateOrUpdateExternalGroupInput {externalGroupDescription?: (Scalars['String'] | null),externalGroupDisplayName: Scalars['String'],externalGroupName: Scalars['String']}

export interface CreatePostTemplateInput {bodyTemplate: Scalars['String'],description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),name?: (Scalars['String'] | null),parentId: Scalars['String'],subjectTemplate: Scalars['String']}

export interface CreateReferenceDataGroupInput {description?: (Scalars['String'] | null),displayName: Scalars['String'],name: Scalars['String'],parentGroupId: Scalars['String']}

export interface CreateReferenceDataTypeInput {dataFileBatchId?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],isDateSpecific: Scalars['Boolean'],name: Scalars['String'],parentGroupId: Scalars['String'],parentReferenceDataTypeId?: (Scalars['String'] | null)}

export interface CreateRoleInput {description?: (Scalars['String'] | null),displayName: Scalars['String'],name: Scalars['String']}

export interface CreateSavedSearchInput {displayName: Scalars['String'],filterJson: Scalars['String'],sortingJson: Scalars['String'],viewJson: Scalars['String']}

export interface CreateSystemFilterInput {calendarView?: (Scalars['String'] | null),childrenTypes?: (Scalars['String'][] | null),collection?: (Scalars['String'] | null),dataObjectContext?: (Scalars['Boolean'] | null),defaultListView?: (FilterDefaultViewEnum | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],hidden?: (Scalars['Boolean'] | null),kanbanView?: (Scalars['String'] | null),name: Scalars['String'],navigateView?: (Scalars['String'] | null),parentId: Scalars['String'],tileView?: (Scalars['String'] | null),workspace?: (Scalars['String'] | null)}

export interface CreateTypeFilterInput {calendarView?: (Scalars['String'] | null),childrenTypes?: (Scalars['String'][] | null),dataObjectContext?: (Scalars['Boolean'] | null),defaultListView?: (FilterDefaultViewEnum | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],exactDataType?: (Scalars['Boolean'] | null),filterJson?: (Scalars['String'] | null),isPreconfigured?: (Scalars['Boolean'] | null),isSystem?: (Scalars['Boolean'] | null),kanbanView?: (Scalars['String'] | null),name: Scalars['String'],navigateView?: (Scalars['String'] | null),parentId: Scalars['String'],tileView?: (Scalars['String'] | null)}

export interface CreateUserInput {email: Scalars['String'],external?: (Scalars['Boolean'] | null),firstName: Scalars['String'],groups?: (Scalars['String'][] | null),isSuperUser?: (Scalars['Boolean'] | null),lastName: Scalars['String'],name: Scalars['String'],password: Scalars['String'],roles?: (Scalars['String'][] | null)}

export interface CreateViewInput {description?: (Scalars['String'] | null),displayName: Scalars['String'],fileProperty?: (Scalars['String'] | null),group?: (Scalars['String'] | null),managementMode?: (ViewManagementModeEnum | null),name: Scalars['String'],parentId: Scalars['String'],templateBatchId?: (Scalars['String'] | null),viewMode?: (Scalars['String'] | null),viewTypeEnum: ViewTypeEnum}

export interface CreateWorkbenchInput {description?: (Scalars['String'] | null),displayName: Scalars['String'],menuJson?: (Scalars['String'] | null),name: Scalars['String'],roles: (Scalars['String'] | null)[]}

export interface CreateWorkspaceInput {brandingJson?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName: Scalars['String'],iconBatchId?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String']}

export interface CsvImportStatusRequest{
    filename?: boolean | number
    importId?: boolean | number
    moduleName?: boolean | number
    objectsCreatedCount?: boolean | number
    objectsUpdatedCount?: boolean | number
    rowsFailedCount?: boolean | number
    rowsProcessedCount?: boolean | number
    rowsSkippedCount?: boolean | number
    startDate?: boolean | number
    state?: boolean | number
    targetObjectId?: boolean | number
    userId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataObjectRequest{
    allowedActions?: boolean | number
    discussion?: DiscussionRoomRequest
    genericStatus?: boolean | number
    hasAllRequiredProperties?: boolean | number
    hasChildren?: boolean | number
    id?: boolean | number
    isTemplate?: boolean | number
    isVersion?: boolean | number
    parentId?: boolean | number
    parents?: DataObjectRequest
    properties?: [{keys?: (Scalars['String'][] | null)},DataObjectPropertyRequest] | DataObjectPropertyRequest
    publishInfo?: [{serviceId: Scalars['String']},DataObjectPublishInfoRequest]
    rdmObject?: boolean | number
    route?: boolean | number
    stateCustomJson?: boolean | number
    subscriptionType?: boolean | number
    type?: PublishedDataTypeRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataObjectChangesRequest{
    changes?: DataObjectPropertyRequest
    dataObjectValid?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataObjectHierarchyRequest{
    allowCreation?: boolean | number
    id?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataObjectListRequest{
    items?: DataObjectRequest
    pageInfo?: PageInfoRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataObjectPropertyRequest{
    key?: boolean | number
    value?: DataPropertyValueRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataObjectPropertyInput {attributesValueInput?: (DataPropertyAttributesValueInput | null),booleanValueInput?: (DataPropertyBooleanValueInput | null),dateTimeValueInput?: (DataPropertyDateTimeValueInput | null),dateValueInput?: (DataPropertyDateValueInput | null),decimalValueInput?: (DataPropertyDecimalValueInput | null),fileValueInput?: (DataPropertyFileValueInput | null),filesValueInput?: (DataPropertyFilesValueInput | null),integerValueInput?: (DataPropertyIntegerValueInput | null),key: Scalars['String'],multiSelectionValueInput?: (DataPropertyMultiSelectionValueInput | null),objectValueInput?: (DataPropertyObjectValueInput | null),objectsValueInput?: (DataPropertyObjectsValueInput | null),selectionValueInput?: (DataPropertySelectionValueInput | null),stringValueInput?: (DataPropertyStringValueInput | null),textValueInput?: (DataPropertyTextValueInput | null),timeValueInput?: (DataPropertyTimeValueInput | null),userValueInput?: (DataPropertyUserValueInput | null),usersValueInput?: (DataPropertyUsersValueInput | null)}

export interface DataObjectPublishInfoRequest{
    link?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    on_DataPropertyAttributes?: DataPropertyAttributesRequest
    on_DataPropertyBoolean?: DataPropertyBooleanRequest
    on_DataPropertyDate?: DataPropertyDateRequest
    on_DataPropertyDateTime?: DataPropertyDateTimeRequest
    on_DataPropertyDecimal?: DataPropertyDecimalRequest
    on_DataPropertyFile?: DataPropertyFileRequest
    on_DataPropertyFiles?: DataPropertyFilesRequest
    on_DataPropertyInteger?: DataPropertyIntegerRequest
    on_DataPropertyMultiSelection?: DataPropertyMultiSelectionRequest
    on_DataPropertyObject?: DataPropertyObjectRequest
    on_DataPropertyObjectFilter?: DataPropertyObjectFilterRequest
    on_DataPropertyObjects?: DataPropertyObjectsRequest
    on_DataPropertySelection?: DataPropertySelectionRequest
    on_DataPropertySequence?: DataPropertySequenceRequest
    on_DataPropertyStatus?: DataPropertyStatusRequest
    on_DataPropertyString?: DataPropertyStringRequest
    on_DataPropertyText?: DataPropertyTextRequest
    on_DataPropertyTime?: DataPropertyTimeRequest
    on_DataPropertyUser?: DataPropertyUserRequest
    on_DataPropertyUserCommon?: DataPropertyUserCommonRequest
    on_DataPropertyUsers?: DataPropertyUsersRequest
    on_DataPropertyVersion?: DataPropertyVersionRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyAttributesRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    dateDataPropertyKey?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    parentSelection?: boolean | number
    properties?: DataPropertyRequest
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    referenceDataTypeId?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyAttributesValueRequest{
    attributesValue?: AttributeValueRequest
    selectedDate?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyAttributesValueInput {value?: (AttributeValueInput[] | null)}

export interface DataPropertyAttributesValueUnionRequest{
    on_DataPropertyBooleanValue?:DataPropertyBooleanValueRequest,
    on_DataPropertyDateTimeValue?:DataPropertyDateTimeValueRequest,
    on_DataPropertyDateValue?:DataPropertyDateValueRequest,
    on_DataPropertyDecimalValue?:DataPropertyDecimalValueRequest,
    on_DataPropertyIntegerValue?:DataPropertyIntegerValueRequest,
    on_DataPropertyMultiSelectionValue?:DataPropertyMultiSelectionValueRequest,
    on_DataPropertySelectionValue?:DataPropertySelectionValueRequest,
    on_DataPropertyStringValue?:DataPropertyStringValueRequest,
    on_DataPropertyTextValue?:DataPropertyTextValueRequest,
    on_DataPropertyTimeValue?:DataPropertyTimeValueRequest,
    __typename?: boolean | number
}

export interface DataPropertyBooleanRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    defaultValue?: DataPropertyBooleanValueRequest
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayFalseAs?: boolean | number
    displayFalseColor?: boolean | number
    displayFormat?: BooleanDisplayFormatRequest
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayTrueAs?: boolean | number
    displayTrueColor?: boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyBooleanValueRequest{
    booleanValue?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyBooleanValueInput {value?: (Scalars['Boolean'] | null)}

export interface DataPropertyDateRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    defaultValue?: DataPropertyDateValueRequest
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayFormat?: DateDisplayFormatRequest
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    maxValue?: DataPropertyDateValueRequest
    minValue?: DataPropertyDateValueRequest
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyDateTimeRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    defaultValue?: DataPropertyDateTimeValueRequest
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayFormat?: DateDisplayFormatRequest
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    maxValue?: DataPropertyDateTimeValueRequest
    minValue?: DataPropertyDateTimeValueRequest
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    useTimeZone?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyDateTimeValueRequest{
    dateTimeValue?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyDateTimeValueInput {value?: (Scalars['Date'] | null)}

export interface DataPropertyDateValueRequest{
    dateValue?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyDateValueInput {value?: (Scalars['LocalDate'] | null)}

export interface DataPropertyDecimalRequest{
    JSON_SCHEMA?: boolean | number
    creationDate?: boolean | number
    customizationRef?: boolean | number
    defaultValue?: DataPropertyDecimalValueRequest
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    formula?: boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    maxValue?: DataPropertyDecimalValueRequest
    minValue?: DataPropertyDecimalValueRequest
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    precision?: boolean | number
    prefix?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    suffix?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyDecimalValueRequest{
    decimalValue?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyDecimalValueInput {value?: (Scalars['BigDecimal'] | null)}

export interface DataPropertyFileRequest{
    JSON_SCHEMA?: boolean | number
    creationDate?: boolean | number
    customizationRef?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    downloadable?: boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyFileValueRequest{
    fileValue?: FileRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyFileValueInput {value?: (FileInput | null)}

export interface DataPropertyFilesRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    downloadable?: boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyFilesValueRequest{
    filesValue?: FileRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyFilesValueInput {value?: (FilesInput | null)}

export interface DataPropertyIntegerRequest{
    JSON_INTEGER_SCHEMA?: boolean | number
    creationDate?: boolean | number
    customizationRef?: boolean | number
    defaultValue?: DataPropertyIntegerValueRequest
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    maxValue?: DataPropertyIntegerValueRequest
    minValue?: DataPropertyIntegerValueRequest
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    prefix?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    suffix?: boolean | number
    unique?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyIntegerValueRequest{
    integerValue?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyIntegerValueInput {value?: (Scalars['Int'] | null)}

export interface DataPropertyMultiSelectionRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    dateDataPropertyKey?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    parentSelection?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    referenceDataTypeId?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyMultiSelectionValueRequest{
    multiSelectionValue?: DataObjectRequest
    selectedDate?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyMultiSelectionValueInput {value?: (Scalars['String'][] | null)}

export interface DataPropertyObjectRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    relationModuleId?: boolean | number
    relationObjectProperty?: boolean | number
    relationTypes?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    viewJson?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyObjectFilterRequest{
    bindingJson?: boolean | number
    creationDate?: boolean | number
    customizationRef?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    filterId?: boolean | number
    filterJson?: boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    relationModuleId?: boolean | number
    relationObjectProperty?: boolean | number
    relationTypes?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    viewJson?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyObjectFilterValueRequest{
    objectFilterValue?: DataObjectRequest
    rawValue?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyObjectValueRequest{
    objectValue?: DataObjectRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyObjectValueInput {value?: (Scalars['String'] | null)}

export interface DataPropertyObjectsRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    relationModuleId?: boolean | number
    relationObjectProperty?: boolean | number
    relationTypes?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    viewJson?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyObjectsValueRequest{
    objectsValue?: DataObjectRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyObjectsValueInput {value?: (Scalars['String'][] | null)}

export interface DataPropertySelectionRequest{
    JSON_SCHEMA?: boolean | number
    creationDate?: boolean | number
    customizationRef?: boolean | number
    dateDataPropertyKey?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    formula?: boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    parentSelection?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    referenceDataTypeId?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertySelectionValueRequest{
    selectedDate?: boolean | number
    selectionValue?: DataObjectRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertySelectionValueInput {value?: (Scalars['String'] | null)}

export interface DataPropertySequenceRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    initialValue?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    prefix?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    restartInterval?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    suffix?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertySequenceValueRequest{
    sequenceValue?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyStatusRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyStatusValueRequest{
    statusValue?: LifecycleStateRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyStringRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    defaultValue?: DataPropertyStringValueRequest
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    formula?: boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    icon?: boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    maxLength?: boolean | number
    minLength?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    pattern?: boolean | number
    prefix?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    suffix?: boolean | number
    unique?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyStringValueRequest{
    stringValue?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyStringValueInput {value?: (Scalars['String'] | null)}

export interface DataPropertyTextRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    defaultValue?: DataPropertyTextValueRequest
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    formatType?: TextFormatTypeRequest
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    maxLength?: boolean | number
    minLength?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyTextValueRequest{
    textValue?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyTextValueInput {value?: (Scalars['String'] | null)}

export interface DataPropertyTimeRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    defaultValue?: DataPropertyTimeValueRequest
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayFormat?: DateDisplayFormatRequest
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    maxValue?: DataPropertyTimeValueRequest
    minValue?: DataPropertyTimeValueRequest
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyTimeValueRequest{
    timeValue?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyTimeValueInput {value?: (Scalars['LocalTime'] | null)}

export interface DataPropertyUserRequest{
    JSON_SCHEMA?: boolean | number
    creationDate?: boolean | number
    customizationRef?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    filterByDataObjectPermissions?: boolean | number
    filterByDataTypePrivileges?: boolean | number
    filterByRoles?: boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    sortingFullName?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyUserCommonRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    filterByDataObjectPermissions?: boolean | number
    filterByDataTypePrivileges?: boolean | number
    filterByRoles?: boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    sortingFullName?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyUserValueRequest{
    userValue?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** User name (login name) should be used as a value. */
export interface DataPropertyUserValueInput {value?: (Scalars['String'] | null)}

export interface DataPropertyUsersRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    filterByDataObjectPermissions?: boolean | number
    filterByDataTypePrivileges?: boolean | number
    filterByRoles?: boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    sortingFullName?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyUsersValueRequest{
    usersValue?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** User name (login name) should be used as a value. */
export interface DataPropertyUsersValueInput {value?: (Scalars['String'][] | null)}

export interface DataPropertyValueRequest{
    on_DataPropertyAttributesValue?:DataPropertyAttributesValueRequest,
    on_DataPropertyBooleanValue?:DataPropertyBooleanValueRequest,
    on_DataPropertyDateTimeValue?:DataPropertyDateTimeValueRequest,
    on_DataPropertyDateValue?:DataPropertyDateValueRequest,
    on_DataPropertyDecimalValue?:DataPropertyDecimalValueRequest,
    on_DataPropertyFileValue?:DataPropertyFileValueRequest,
    on_DataPropertyFilesValue?:DataPropertyFilesValueRequest,
    on_DataPropertyIntegerValue?:DataPropertyIntegerValueRequest,
    on_DataPropertyMultiSelectionValue?:DataPropertyMultiSelectionValueRequest,
    on_DataPropertyObjectFilterValue?:DataPropertyObjectFilterValueRequest,
    on_DataPropertyObjectValue?:DataPropertyObjectValueRequest,
    on_DataPropertyObjectsValue?:DataPropertyObjectsValueRequest,
    on_DataPropertySelectionValue?:DataPropertySelectionValueRequest,
    on_DataPropertySequenceValue?:DataPropertySequenceValueRequest,
    on_DataPropertyStatusValue?:DataPropertyStatusValueRequest,
    on_DataPropertyStringValue?:DataPropertyStringValueRequest,
    on_DataPropertyTextValue?:DataPropertyTextValueRequest,
    on_DataPropertyTimeValue?:DataPropertyTimeValueRequest,
    on_DataPropertyUserValue?:DataPropertyUserValueRequest,
    on_DataPropertyUsersValue?:DataPropertyUsersValueRequest,
    on_DataPropertyVersionValue?:DataPropertyVersionValueRequest,
    __typename?: boolean | number
}

export interface DataPropertyVersionRequest{
    creationDate?: boolean | number
    customizationRef?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayFormat?: VersionDisplayFormatRequest
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    helpText?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    jsonSchema?: boolean | number
    key?: boolean | number
    modificationDate?: boolean | number
    multilanguage?: boolean | number
    name?: boolean | number
    originalNuxeoDocument?: DocumentRequest
    parentId?: boolean | number
    propertyType?: PropertyTypeRequest
    readonly?: boolean | number
    required?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    skipNuxeoStore?: boolean | number
    sortable?: boolean | number
    status?: boolean | number
    useInSearchOrSort?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataPropertyVersionValueRequest{
    versionValue?: VersionRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DataTypeRequest{
    baseType?: DataTypeRequest
    bpmnMessages?: BpmnMessageGroupRequest
    bpmnProcessType?: XmlAndModelDecorationRequest
    brandingJson?: boolean | number
    calendarView?: boolean | number
    canBeUsedAsTemplate?: boolean | number
    canCreateAnother?: boolean | number
    canHaveChildren?: boolean | number
    canHaveDiscussion?: boolean | number
    cardView?: boolean | number
    childTableView?: boolean | number
    childVersionable?: boolean | number
    childrenTypes?: DataTypeRequest
    createFromTemplateView?: boolean | number
    createView?: boolean | number
    creationDate?: boolean | number
    dataTypeComment?: DataTypeRequest
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    discussionMembersId?: boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    downloadable?: boolean | number
    editView?: boolean | number
    embedView?: boolean | number
    filterJson?: boolean | number
    grantedPrivileges?: GrantedPrivilegesRequest
    id?: boolean | number
    inheritBpmnScheme?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    lifecycle?: LifecycleRequest
    modificationDate?: boolean | number
    name?: boolean | number
    navigateView?: boolean | number
    parentId?: boolean | number
    postTemplates?: PostTemplateRequest
    privilegesInherited?: boolean | number
    properties?: PropertyGroupRequest
    publishable?: boolean | number
    reportingView?: boolean | number
    rootVersionable?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    stateMachine?: boolean | number
    status?: boolean | number
    tileView?: boolean | number
    typeFilters?: TypeFilterRequest
    uploadable?: boolean | number
    versionIncrement?: VersionIncrementRequest
    versionable?: boolean | number
    views?: [{includeArchived?: (Scalars['Boolean'] | null),viewType?: (ViewTypeEnum | null)},ViewRequest] | ViewRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DateDisplayFormatRequest{
    displayFormatEnum?: boolean | number
    displayName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DefaultResourcesRequest{
    favicon?: boolean | number
    logo?: boolean | number
    module?: boolean | number
    smallLogo?: boolean | number
    workspace?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscussionDirectMessagesRoomRequest{
    hasUnreadMessages?: boolean | number
    hidden?: boolean | number
    id?: boolean | number
    lastMessage?: DiscussionMessageRequest
    participant?: UserRequest
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscussionDirectMessagesRoomListRequest{
    items?: DiscussionDirectMessagesRoomRequest
    pageInfo?: PageInfoRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscussionMessageRequest{
    attachments?: FileRequest
    created?: boolean | number
    from?: UserRequest
    id?: boolean | number
    info?: DiscussionMessageInfoRequest
    message?: boolean | number
    modified?: boolean | number
    parent?: DiscussionMessageParentRequest
    replyId?: boolean | number
    sent?: boolean | number
    system?: boolean | number
    whoRead?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscussionMessageInfoRequest{
    key?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscussionMessageParentRequest{
    on_DiscussionDirectMessagesRoom?:DiscussionDirectMessagesRoomRequest,
    on_DiscussionRoom?:DiscussionRoomRequest,
    on_DiscussionThread?:DiscussionThreadRequest,
    __typename?: boolean | number
}

export interface DiscussionMessageParentStatusRequest{
    displayName?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscussionRoomRequest{
    dataObject?: DataObjectRequest
    description?: boolean | number
    hasUnreadMessages?: boolean | number
    hasUnreadThreadsMessages?: boolean | number
    icon?: FileRequest
    id?: boolean | number
    lastMessage?: DiscussionMessageRequest
    name?: boolean | number
    owner?: UserRequest
    participants?: boolean | number
    private?: boolean | number
    status?: DiscussionMessageParentStatusRequest
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscussionRoomListRequest{
    items?: DiscussionRoomRequest
    pageInfo?: PageInfoRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscussionThreadRequest{
    color?: boolean | number
    hasUnreadMessages?: boolean | number
    id?: boolean | number
    lastMessage?: DiscussionMessageRequest
    name?: boolean | number
    owner?: UserRequest
    parentId?: boolean | number
    status?: DiscussionMessageParentStatusRequest
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscussionThreadListRequest{
    items?: DiscussionThreadRequest
    pageInfo?: PageInfoRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DocumentRequest{
    DEFAULT_FILE_CONTENT?: boolean | number
    changeToken?: boolean | number
    checkedOut?: boolean | number
    contextParameters?: boolean | number
    dirtyProperties?: boolean | number
    facets?: boolean | number
    id?: boolean | number
    isCheckedOut?: boolean | number
    lastModified?: boolean | number
    lock?: boolean | number
    lockCreated?: boolean | number
    lockOwner?: boolean | number
    locked?: boolean | number
    name?: boolean | number
    parentRef?: boolean | number
    path?: boolean | number
    properties?: boolean | number
    proxy?: boolean | number
    record?: boolean | number
    retainUntil?: boolean | number
    state?: boolean | number
    title?: boolean | number
    trashed?: boolean | number
    type?: boolean | number
    uid?: boolean | number
    underRetentionOrLegalHold?: boolean | number
    version?: boolean | number
    versionLabel?: boolean | number
    versionableId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ExternalGroupRequest{
    externalGroupDescription?: boolean | number
    externalGroupDisplayName?: boolean | number
    externalGroupName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ExternalGroupListRequest{
    items?: ExternalGroupRequest
    pageInfo?: PageInfoRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ExternalGroupListParametersInput {pagination?: (PaginationInput | null),search?: (Scalars['String'] | null)}

export interface ExternalGroupMappingRequest{
    externalGroup?: GroupRequest
    mappedRoles?: RoleRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileRequest{
    defaultResource?: boolean | number
    encoding?: boolean | number
    length?: boolean | number
    mimeType?: boolean | number
    name?: boolean | number
    resourceId?: boolean | number
    thumbnailUrl?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FileInput {batchId: Scalars['String']}

export interface FileModifiedInput {batchId: Scalars['String'],index: Scalars['Int']}

export interface FilePropertyKeyInput {filePropertyKey: Scalars['String'],objectPropertyKey?: (Scalars['String'] | null)}

export interface FilesInput {added?: (FileInput[] | null),defaultValueOnForm?: (Scalars['Boolean'] | null),deleted?: (Scalars['Int'][] | null),modified?: (FileModifiedInput[] | null)}

export interface FilterViewParametersInput {bindingJson?: (Scalars['String'] | null),filterId: Scalars['String'],route: Scalars['String']}

export interface GenericValidationResultRequest{
    messages?: boolean | number
    severity?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GrantedPermissionsRequest{
    permissions?: PermissionRequest
    role?: RoleRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GrantedPrivilegesRequest{
    privileges?: PrivilegeRequest
    role?: RoleRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GroupRequest{
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    groups?: GroupRequest
    isExternal?: boolean | number
    memberGroups?: boolean | number
    memberUsers?: boolean | number
    members?: MemberRequest
    name?: boolean | number
    parents?: boolean | number
    roles?: RoleRequest
    trashed?: boolean | number
    type?: MemberTypeRequest
    uid?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GroupListRequest{
    items?: GroupRequest
    pageInfo?: PageInfoRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface HtmlWidgetRequest{
    creationDate?: boolean | number
    css?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    html?: boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    js?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    status?: boolean | number
    widgetJson?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface HtmlWidgetGroupRequest{
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    htmlWidgets?: HtmlWidgetRequest
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    status?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImportToAssetsInput {filePropertyKeys?: (FilePropertyKeyInput[] | null),sourceId?: (Scalars['String'] | null),targetId?: (Scalars['String'] | null)}

export interface LifecycleRequest{
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    lifecycleJson?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LifecycleStateRequest{
    allowedStateTransitions?: boolean | number
    backgroundColor?: boolean | number
    completed?: boolean | number
    description?: boolean | number
    disallowedActions?: boolean | number
    initial?: boolean | number
    name?: boolean | number
    speculative?: boolean | number
    technicalState?: boolean | number
    textColor?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LifecycleTransitionRequest{
    customJson?: boolean | number
    description?: boolean | number
    destinationStateName?: boolean | number
    name?: boolean | number
    prohibitRecursiveTransition?: boolean | number
    speculative?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ListParametersInput {filterJson?: (Scalars['String'] | null),hints?: (Scalars['String'] | null),pagination?: (PaginationInput | null),search?: (Scalars['String'] | null),sortingJson?: (Scalars['String'] | null)}

export interface LocaleOptionRequest{
    key?: boolean | number
    label?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MemberRequest{
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    groups?: GroupRequest
    isExternal?: boolean | number
    name?: boolean | number
    parents?: boolean | number
    roles?: RoleRequest
    trashed?: boolean | number
    type?: MemberTypeRequest
    uid?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MemberInput {name: Scalars['String'],type: MemberTypeEnum}

export interface MemberTypeRequest{
    displayName?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MetadataObjectRequest{
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    status?: boolean | number
    on_ApiSpec?: ApiSpecRequest
    on_ApiSpecsGroup?: ApiSpecsGroupRequest
    on_Application?: ApplicationRequest
    on_BpmnMessage?: BpmnMessageRequest
    on_BpmnProcessType?: BpmnProcessTypeRequest
    on_Collection?: CollectionRequest
    on_DataPropertyAttributes?: DataPropertyAttributesRequest
    on_DataPropertyBoolean?: DataPropertyBooleanRequest
    on_DataPropertyDate?: DataPropertyDateRequest
    on_DataPropertyDateTime?: DataPropertyDateTimeRequest
    on_DataPropertyDecimal?: DataPropertyDecimalRequest
    on_DataPropertyFile?: DataPropertyFileRequest
    on_DataPropertyFiles?: DataPropertyFilesRequest
    on_DataPropertyInteger?: DataPropertyIntegerRequest
    on_DataPropertyMultiSelection?: DataPropertyMultiSelectionRequest
    on_DataPropertyObject?: DataPropertyObjectRequest
    on_DataPropertyObjectFilter?: DataPropertyObjectFilterRequest
    on_DataPropertyObjects?: DataPropertyObjectsRequest
    on_DataPropertySelection?: DataPropertySelectionRequest
    on_DataPropertySequence?: DataPropertySequenceRequest
    on_DataPropertyStatus?: DataPropertyStatusRequest
    on_DataPropertyString?: DataPropertyStringRequest
    on_DataPropertyText?: DataPropertyTextRequest
    on_DataPropertyTime?: DataPropertyTimeRequest
    on_DataPropertyUser?: DataPropertyUserRequest
    on_DataPropertyUserCommon?: DataPropertyUserCommonRequest
    on_DataPropertyUsers?: DataPropertyUsersRequest
    on_DataPropertyVersion?: DataPropertyVersionRequest
    on_DataType?: DataTypeRequest
    on_HtmlWidget?: HtmlWidgetRequest
    on_HtmlWidgetGroup?: HtmlWidgetGroupRequest
    on_Lifecycle?: LifecycleRequest
    on_Module?: ModuleRequest
    on_PostTemplate?: PostTemplateRequest
    on_ReferenceDataGroup?: ReferenceDataGroupRequest
    on_ReferenceDataType?: ReferenceDataTypeRequest
    on_Role?: RoleRequest
    on_SystemFilter?: SystemFilterRequest
    on_TypeFilter?: TypeFilterRequest
    on_View?: ViewRequest
    on_Workbench?: WorkbenchRequest
    on_Workspace?: WorkspaceRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ModuleRequest{
    apiSpecsGroups?: ApiSpecsGroupRequest
    brandingJson?: boolean | number
    calendarView?: boolean | number
    cardView?: boolean | number
    childTableView?: boolean | number
    createView?: boolean | number
    creationDate?: boolean | number
    dataTypes?: [{includeArchived?: (Scalars['Boolean'] | null)},DataTypeRequest] | DataTypeRequest
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    editView?: boolean | number
    embedView?: boolean | number
    filters?: SystemFilterRequest
    grantedPrivileges?: GrantedPrivilegesRequest
    icon?: FileRequest
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    kanbanView?: boolean | number
    lifecycleStates?: [{includeArchived?: (Scalars['Boolean'] | null)},LifecycleStateRequest] | LifecycleStateRequest
    lifecycles?: [{includeArchived?: (Scalars['Boolean'] | null)},LifecycleRequest] | LifecycleRequest
    modificationDate?: boolean | number
    name?: boolean | number
    navigateView?: boolean | number
    parentId?: boolean | number
    publish?: boolean | number
    reportingView?: boolean | number
    searchPage?: SystemPageRequest
    searchPanelProperties?: PropertyGroupRequest
    status?: boolean | number
    templatesPage?: SystemPageRequest
    tileView?: boolean | number
    views?: [{includeArchived?: (Scalars['Boolean'] | null),viewType?: (ViewTypeEnum | null)},ViewRequest] | ViewRequest
    workspaces?: WorkspaceRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MoveReferenceMetadataObjectInput {metadataObjectId: Scalars['String'],newParentId: Scalars['String']}


/** Mutation root */
export interface MutationRequest{
    setMembersForGroup?: [{members: MemberInput[],name: Scalars['String']}]
    createDataPropertyFiles?: [{dataProperty: CreateDataPropertyFilesInput},DataPropertyRequest]
    deleteOauth2ServiceTokens?: [{ids: Scalars['ID'][],serviceName: Scalars['String']}]
    updateWorkbench?: [{workbench: UpdateWorkbenchInput},WorkbenchRequest]
    createReferenceDataGroup?: [{referenceDataGroup: CreateReferenceDataGroupInput},ReferenceDataGroupRequest]
    createRole?: [{role: CreateRoleInput},RoleRequest]
    deleteRoom?: [{id: Scalars['ID']}]
    updateDataPropertyBoolean?: [{dataProperty: UpdateDataPropertyBooleanInput},DataPropertyRequest]
    removeObjectFromFavorites?: [{objectId: Scalars['String']}]
    startImportMetadataTool?: boolean | number
    deleteAssetUploads?: [{assetUploadIds: Scalars['String'][]}]
    logout?: boolean | number
    changeRoomOwner?: [{owner: Scalars['String'],id: Scalars['ID']}]
    createDataPropertySequence?: [{dataProperty: CreateDataPropertySequenceInput},DataPropertyRequest]
    updateDataPropertyDateTime?: [{dataProperty: UpdateDataPropertyDateTimeInput},DataPropertyRequest]
    updateTypeFilter?: [{filter: UpdateTypeFilterInput},TypeFilterRequest]
    requestPasswordReset?: [{username: Scalars['String']}]
    createAssetUploads?: [{targetFolderId: Scalars['String'],items: AssetUploadInput[]},AssetUploadRequest]
    updateDataPropertyFiles?: [{dataProperty: UpdateDataPropertyFilesInput},DataPropertyRequest]
    updateRoom?: [{room: UpdateDiscussionRoomInput},DiscussionRoomRequest]
    moveReferenceMetadataObject?: [{moveInput: MoveReferenceMetadataObjectInput}]
    enablePublishing?: [{moduleId: Scalars['String']}]
    reindexRepository?: boolean | number
    disablePublishing?: [{moduleId: Scalars['String']}]
    importToAssets?: [{importInput: ImportToAssetsInput},DataObjectRequest]
    createBpmnMessage?: [{dataProperty: CreateBpmnMessageInput},BpmnMessageRequest]
    createFilter?: [{filter: CreateSystemFilterInput},SystemFilterRequest]
    changeThreadOwner?: [{owner: Scalars['String'],id: Scalars['ID']}]
    changeDataObjectStatus?: [{id: Scalars['ID'],status: Scalars['String']}]
    deleteThread?: [{id: Scalars['ID']}]
    addObjectToFavorites?: [{objectId: Scalars['String']}]
    createSavedSearch?: [{savedSearch: CreateSavedSearchInput},SavedSearchRequest]
    createDataPropertyText?: [{dataProperty: CreateDataPropertyTextInput},DataPropertyRequest]
    createDataPropertyBoolean?: [{dataProperty: CreateDataPropertyBooleanInput},DataPropertyRequest]
    updateThread?: [{thread: UpdateDiscussionThreadInput},DiscussionThreadRequest]
    updateUserPassword?: [{oldPassword: Scalars['String'],name: Scalars['String'],newPassword: Scalars['String']}]
    leaveRoom?: [{id: Scalars['ID']}]
    deleteDataObject?: [{id: Scalars['ID']}]
    readMessages?: [{messageIds: Scalars['String'][]},DiscussionMessageRequest]
    updateDataPropertyDecimal?: [{dataProperty: UpdateDataPropertyDecimalInput},DataPropertyRequest]
    deleteUser?: [{name: Scalars['String']}]
    createWorkspace?: [{workspace: CreateWorkspaceInput},WorkspaceRequest]
    updateMessage?: [{message: UpdateDiscussionMessageInput},DiscussionMessageRequest]
    updateWorkspace?: [{workspace: UpdateWorkspaceInput},WorkspaceRequest]
    createDataPropertyString?: [{dataProperty: CreateDataPropertyStringInput},DataPropertyRequest]
    createOrUpdateBpmnProcessType?: [{dataProperty: CreateOrUpdateBpmnProcessTypeInput}]
    removeObjectsFromCollection?: [{collectionId: Scalars['String'],objectIds: (Scalars['String'] | null)[]},DataObjectRequest]
    updateGroup?: [{group: UpdateGroupInput},GroupRequest]
    login?: [{password: Scalars['String'],username: Scalars['String']}]
    moveDataObject?: [{targetId: Scalars['ID'],id: Scalars['ID']}]
    updateView?: [{view: UpdateViewInput},ViewRequest]
    createBpmnProcessDataType?: [{dataType: CreateBpmnProcessDataTypeInput},DataTypeRequest]
    createTypeFilter?: [{filter: CreateTypeFilterInput},TypeFilterRequest]
    deleteGroup?: [{name: Scalars['String']}]
    createView?: [{view: CreateViewInput},ViewRequest]
    createDataPropertyUsers?: [{dataProperty: CreateDataPropertyUsersInput},DataPropertyRequest]
    createDataPropertyObject?: [{dataProperty: CreateDataPropertyObjectInput},DataPropertyRequest]
    createFilterView?: [{filterId: Scalars['String'],defaultListViewType: FilterDefaultViewEnum},ViewRequest]
    createApiSpec?: [{apiSpec: CreateApiSpecInput},ApiSpecRequest]
    createLifecycle?: [{lifecycle: CreateLifecycleInput},LifecycleRequest]
    updateDataPropertyObjectFilter?: [{dataProperty: UpdateDataPropertyObjectFilterInput},DataPropertyRequest]
    updateUser?: [{user: UpdateUserInput},UserRequest]
    deleteMessage?: [{id: Scalars['ID']}]
    createHtmlWidgetGroup?: [{htmlWidgetGroup: CreateHtmlWidgetGroupInput},HtmlWidgetGroupRequest]
    createRoom?: [{room: CreateDiscussionRoomInput},DiscussionRoomRequest]
    updateSettings?: [{settings: UpdateSettingInput[]}]
    updateDataType?: [{dataType: UpdateDataTypeInput},DataTypeRequest]
    token?: [{code: Scalars['String']}]
    updateDataPropertyText?: [{dataProperty: UpdateDataPropertyTextInput},DataPropertyRequest]
    archiveRoom?: [{id: Scalars['ID']}]
    createReferenceDataType?: [{referenceDataType: CreateReferenceDataTypeInput},ReferenceDataTypeRequest]
    updateApplication?: [{application: UpdateApplicationInput},ApplicationRequest]
    addObjectsToFavorites?: [{objectIds: (Scalars['String'] | null)[]},DataObjectRequest]
    deleteSavedSearch?: [{id: Scalars['ID']}]
    updateSetting?: [{setting: UpdateSettingInput},SettingRequest]
    createDataObjectsFromLiveConnect?: [{providerId: Scalars['String'],user: Scalars['String'],items: AssetDropboxInput[]},DataObjectRequest]
    updateUserProfile?: [{profile: UpdateUserProfileInput},UserRequest]
    updateLifecycle?: [{lifecycle: UpdateLifecycleInput},LifecycleRequest]
    changeDataObjectStatusBulk?: [{status: Scalars['String'],objectIds: Scalars['ID'][]}]
    hideDirectMessagesRoom?: [{id: Scalars['ID']},DiscussionDirectMessagesRoomRequest]
    createDataPropertyFile?: [{dataProperty: CreateDataPropertyFileInput},DataPropertyRequest]
    deleteDataObjectBulk?: [{ids: Scalars['ID'][]}]
    createUser?: [{user: CreateUserInput},UserRequest]
    removeObjectFromCollection?: [{collectionId: Scalars['String'],objectId: Scalars['String']}]
    unarchiveRoom?: [{id: Scalars['ID']}]
    createDataType?: [{dataType: CreateDataTypeInput},DataTypeRequest]
    resetPassword?: [{password: Scalars['String'],key: Scalars['String']}]
    createDataPropertyUser?: [{dataProperty: CreateDataPropertyUserInput},DataPropertyRequest]
    createDataPropertyDateTime?: [{dataProperty: CreateDataPropertyDateTimeInput},DataPropertyRequest]
    updateRole?: [{role: UpdateRoleInput},RoleRequest]
    addObjectToCollection?: [{collectionId: Scalars['String'],objectId: Scalars['String']}]
    /** Create data template from data object with GUID = dataObjectId. */
    saveDataObjectAsTemplate?: [{dataObjectId: Scalars['String']},DataObjectRequest]
    createModule?: [{module: CreateModuleInput},ModuleRequest]
    updateFilter?: [{filter: UpdateSystemFilterInput},SystemFilterRequest]
    clearCache?: boolean | number
    updateAsset?: [{assetUpload: AssetUploadInput},AssetUploadRequest]
    updateModulePrivileges?: [{privileges?: (UpdateGrantedPrivilegesInput[] | null),metadataObjectId: Scalars['String']},ModuleRequest]
    createDataPropertyTime?: [{dataProperty: CreateDataPropertyTimeInput},DataPropertyRequest]
    updateDataPropertyFile?: [{dataProperty: UpdateDataPropertyFileInput},DataPropertyRequest]
    updateDataPropertyMultiSelection?: [{dataProperty: UpdateDataPropertyMultiSelectionInput},DataPropertyRequest]
    archiveThread?: [{id: Scalars['ID']}]
    updateDataPropertyVersion?: [{dataProperty: UpdateDataPropertyVersionInput},DataPropertyRequest]
    updateDataPropertyObject?: [{dataProperty: UpdateDataPropertyObjectInput},DataPropertyRequest]
    createDataPropertyDate?: [{dataProperty: CreateDataPropertyDateInput},DataPropertyRequest]
    updateDataPropertySequence?: [{dataProperty: UpdateDataPropertySequenceInput},DataPropertyRequest]
    updateReferenceMetadataObjectPermissions?: [{referenceMetadataObjectId: Scalars['String'],permissions?: (UpdateGrantedPermissionsInput[] | null)},ReferenceMetadataObjectRequest]
    joinToPublicRoom?: [{id: Scalars['ID']},DiscussionRoomRequest]
    archiveMetaDataObject?: [{id: Scalars['String']}]
    updateDataPropertySelection?: [{dataProperty: UpdateDataPropertySelectionInput},DataPropertyRequest]
    republishDataObject?: [{publishDataObjectInput: PublishDataObjectInput}]
    createGroup?: [{group: CreateGroupInput},GroupRequest]
    updateDataPropertyStatus?: [{dataProperty: UpdateDataPropertyStatusInput},DataPropertyRequest]
    unarchiveMetaDataObject?: [{id: Scalars['String']}]
    changeDataObjectOwner?: [{owner: Scalars['String'],id: Scalars['ID']}]
    updateDataPropertyObjects?: [{dataProperty: UpdateDataPropertyObjectsInput},DataPropertyRequest]
    deleteMetaDataObject?: [{id: Scalars['String']}]
    updatePostTemplate?: [{postTemplate: UpdatePostTemplateInput},PostTemplateRequest]
    updateTheme?: [{theme: UpdateThemeInput},ThemeRequest]
    createThread?: [{thread: CreateDiscussionThreadInput},DiscussionThreadRequest]
    createApiSpecsGroup?: [{apiSpecsGroup: CreateApiSpecsGroupInput},ApiSpecsGroupRequest]
    createDataPropertyInteger?: [{dataProperty: CreateDataPropertyIntegerInput},DataPropertyRequest]
    createDataObjectVersion?: [{createVersionInput: CreateDataObjectVersionInput},DataObjectRequest]
    createMessage?: [{message: CreateDiscussionMessageInput},DiscussionMessageRequest]
    updateHtmlWidget?: [{htmlWidget: UpdateHtmlWidgetInput},HtmlWidgetRequest]
    updateApiSpecsGroup?: [{apiSpecsGroup: UpdateApiSpecsGroupInput},ApiSpecsGroupRequest]
    createDataObject?: [{object: CreateDataObjectInput},DataObjectRequest]
    createCollection?: [{collectionPath: Scalars['String'],collectionDescription?: (Scalars['String'] | null)}]
    restoreDataObjectVersion?: [{versionId: Scalars['ID']},DataObjectRequest]
    updateDataPropertyAttributes?: [{dataProperty: UpdateDataPropertyAttributesInput},DataPropertyRequest]
    createDataObjectFromTemplate?: [{object: CreateDataObjectFromTemplateInput},DataObjectRequest]
    updateBpmnMessage?: [{dataProperty: UpdateBpmnMessageInput},BpmnMessageRequest]
    updateDataPropertyUser?: [{dataProperty: UpdateDataPropertyUserInput},DataPropertyRequest]
    updateDataPropertyUsers?: [{dataProperty: UpdateDataPropertyUsersInput},DataPropertyRequest]
    moveDataObjectBulk?: [{targetId: Scalars['ID'],ids: Scalars['ID'][]}]
    setMembersForRole?: [{members: MemberInput[],name: Scalars['String']}]
    createDataPropertyObjects?: [{dataProperty: CreateDataPropertyObjectsInput},DataPropertyRequest]
    removeObjectsFromFavorites?: [{objectIds: (Scalars['String'] | null)[]},DataObjectRequest]
    updateDataPropertyTime?: [{dataProperty: UpdateDataPropertyTimeInput},DataPropertyRequest]
    stopImportMetadataTool?: boolean | number
    updateReferenceDataGroup?: [{referenceDataGroup: UpdateReferenceDataGroupInput},ReferenceDataGroupRequest]
    sendEmail?: [{sendEmailInput: SendEmailInput}]
    restoreUser?: [{uid: Scalars['String']},UserRequest]
    saveViewCustomization?: [{customization: ViewCustomizationInput}]
    failAssetUploads?: boolean | number
    changeDataObjectOwnerBulk?: [{owner: Scalars['String'],objectIds: Scalars['ID'][]}]
    createDirectMessagesRoom?: [{room: CreateDiscussionDirectMessagesRoomInput},DiscussionDirectMessagesRoomRequest]
    createDataPropertyObjectFilter?: [{dataProperty: CreateDataPropertyObjectFilterInput},DataPropertyRequest]
    changeStatusAndUpdateDataObject?: [{currentState?: (Scalars['String'] | null),object: UpdateDataObjectInput,status: (Scalars['String'] | null)[]}]
    updateSavedSearch?: [{savedSearch: UpdateSavedSearchInput},SavedSearchRequest]
    unpublishDataObject?: [{unpublishDataObjectInput: UnpublishDataObjectInput}]
    updateReferenceDataType?: [{referenceDataType: UpdateReferenceDataTypeInput},ReferenceDataTypeRequest]
    unarchiveThread?: [{id: Scalars['ID']}]
    publishDataObject?: [{publishDataObjectInput: PublishDataObjectInput}]
    createPostTemplate?: [{postTemplate: CreatePostTemplateInput},PostTemplateRequest]
    createDataPropertySelection?: [{dataProperty: CreateDataPropertySelectionInput},DataPropertyRequest]
    updateDataPropertyDate?: [{dataProperty: UpdateDataPropertyDateInput},DataPropertyRequest]
    updateWorkspacePermissions?: [{permissions?: (UpdateGrantedPermissionsInput[] | null),metadataObjectId: Scalars['String']},WorkspaceRequest]
    createDataPropertyMultiSelection?: [{dataProperty: CreateDataPropertyMultiSelectionInput},DataPropertyRequest]
    readAllMessages?: [{parentId: Scalars['String']},DiscussionMessageRequest]
    createWorkbench?: [{workbench: CreateWorkbenchInput},WorkbenchRequest]
    addObjectsToCollection?: [{collectionId: Scalars['String'],objectIds: (Scalars['String'] | null)[]},DataObjectRequest]
    updateDataTypePrivileges?: [{privileges?: (UpdateGrantedPrivilegesInput[] | null),metadataObjectId: Scalars['String']},DataTypeRequest]
    updateDataPropertyInteger?: [{dataProperty: UpdateDataPropertyIntegerInput},DataPropertyRequest]
    updateApiSpec?: [{apiSpec: UpdateApiSpecInput},ApiSpecRequest]
    updateHtmlWidgetGroup?: [{htmlWidgetGroup: UpdateHtmlWidgetGroupInput},HtmlWidgetGroupRequest]
    deleteGroupBulk?: [{names: Scalars['String'][]}]
    updateDataObject?: [{object: UpdateDataObjectInput},DataObjectRequest]
    publish?: [{comment: Scalars['String']}]
    createDataPropertyAttributes?: [{dataProperty: CreateDataPropertyAttributesInput},DataPropertyRequest]
    createExternalGroup?: [{externalGroup: CreateOrUpdateExternalGroupInput},ExternalGroupMappingRequest]
    createDataPropertyDecimal?: [{dataProperty: CreateDataPropertyDecimalInput},DataPropertyRequest]
    recalcDataObjectFormulas?: [{id: Scalars['String']},DataObjectRequest]
    updateModule?: [{module: UpdateModuleInput},ModuleRequest]
    createHtmlWidget?: [{htmlWidget: CreateHtmlWidgetInput},HtmlWidgetRequest]
    deleteUserBulk?: [{names: Scalars['String'][]}]
    updateDataPropertyString?: [{dataProperty: UpdateDataPropertyStringInput},DataPropertyRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OAuth2ServiceProviderRequest{
    authorizationServerUrl?: boolean | number
    clientId?: boolean | number
    clientSecret?: boolean | number
    description?: boolean | number
    enabled?: boolean | number
    requestTokenUrl?: boolean | number
    scopes?: boolean | number
    serviceName?: boolean | number
    tokenServerUrl?: boolean | number
    userAuthorizationUrl?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OAuth2ServiceTokenRequest{
    accessToken?: boolean | number
    clientId?: boolean | number
    creationDate?: boolean | number
    expirationTimeMilliseconds?: boolean | number
    id?: boolean | number
    isShared?: boolean | number
    refreshToken?: boolean | number
    serviceLogin?: boolean | number
    serviceName?: boolean | number
    sharedWith?: boolean | number
    username?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PageInfoRequest{
    hasNextPage?: boolean | number
    hasPreviousPage?: boolean | number
    pageIndex?: boolean | number
    pageSize?: boolean | number
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaginationInput {pageIndex: Scalars['Int'],pageSize: Scalars['Int']}

export interface PermissionRequest{
    displayName?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostTemplateRequest{
    bodyTemplate?: boolean | number
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    status?: boolean | number
    subjectTemplate?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PrivilegeRequest{
    displayName?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PropertyGroupRequest{
    description?: boolean | number
    displayName?: boolean | number
    id?: boolean | number
    name?: boolean | number
    properties?: [{propertyTypeEnum?: (PropertyTypeEnum | null)},DataPropertyRequest] | DataPropertyRequest
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PropertyTypeRequest{
    displayName?: boolean | number
    propertyTypeEnum?: boolean | number
    systemOnly?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublishDataObjectInput {objectId: Scalars['String'],privacyStatus: PrivacyStatusEnum,serviceLogin: Scalars['String'],serviceName: Scalars['String'],tags?: (Scalars['String'] | null)}

export interface PublishedApplicationRequest{
    displayName?: boolean | number
    htmlWidgets?: PublishedHtmlWidgetRequest
    id?: boolean | number
    modules?: PublishedModuleRequest
    notificationJson?: boolean | number
    toolbarJson?: boolean | number
    workbenches?: PublishedWorkbenchRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublishedApplicationVersionRequest{
    comment?: boolean | number
    id?: boolean | number
    publishDate?: boolean | number
    user?: UserRequest
    version?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublishedApplicationVersionListRequest{
    items?: PublishedApplicationVersionRequest
    pageInfo?: PageInfoRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublishedDataTypeRequest{
    brandingJson?: boolean | number
    canCreateAnother?: boolean | number
    dataTypeComment?: DataTypeRequest
    description?: boolean | number
    displayName?: boolean | number
    exportViews?: PublishedExportViewRequest
    id?: boolean | number
    lifecycle?: PublishedLifecycleRequest
    name?: boolean | number
    publishedReportingView?: PublishedViewRequest
    stateMachine?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublishedExportViewRequest{
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    fileProperty?: boolean | number
    group?: boolean | number
    id?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    template?: FileRequest
    viewMode?: boolean | number
    viewTypeEnum?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublishedFilterRequest{
    description?: boolean | number
    displayName?: boolean | number
    id?: boolean | number
    name?: boolean | number
    route?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublishedHtmlWidgetRequest{
    css?: boolean | number
    html?: boolean | number
    id?: boolean | number
    js?: boolean | number
    name?: boolean | number
    widgetJson?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublishedLifecycleRequest{
    lifecycleJson?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublishedModuleRequest{
    availableUsers?: UserRequest
    brandingJson?: boolean | number
    dataTypes?: PublishedDataTypeRequest
    description?: boolean | number
    displayName?: boolean | number
    filters?: PublishedFilterRequest
    icon?: FileRequest
    id?: boolean | number
    import?: boolean | number
    lifecycleStates?: LifecycleStateRequest
    name?: boolean | number
    properties?: PropertyGroupRequest
    route?: boolean | number
    searchPage?: SystemPageRequest
    templatesPage?: SystemPageRequest
    userPrivileges?: boolean | number
    workspaces?: PublishedWorkspaceRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublishedViewRequest{
    childrenTypes?: PublishedDataTypeRequest
    contextId?: boolean | number
    customFilterId?: boolean | number
    defaultView?: boolean | number
    filterJson?: boolean | number
    id?: boolean | number
    idCopy?: boolean | number
    import?: boolean | number
    objectId?: boolean | number
    parentForCreation?: boolean | number
    properties?: PropertyGroupRequest
    sortingJson?: boolean | number
    upload?: boolean | number
    viewJson?: boolean | number
    viewMode?: boolean | number
    viewType?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublishedWorkbenchRequest{
    creationDate?: boolean | number
    description?: boolean | number
    displayName?: boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    menuJson?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    roles?: RoleRequest
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PublishedWorkspaceRequest{
    brandingJson?: boolean | number
    description?: boolean | number
    displayName?: boolean | number
    icon?: FileRequest
    id?: boolean | number
    import?: boolean | number
    name?: boolean | number
    objectId?: boolean | number
    route?: boolean | number
    userPrivileges?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Query root */
export interface QueryRequest{
    publishedTypeFilters?: [{dataTypeId?: (Scalars['String'] | null)},TypeFilterRequest] | TypeFilterRequest
    setting?: [{key: Scalars['String']},SettingRequest]
    fixWorkbenches?: boolean | number
    module?: [{id: Scalars['String']},ModuleRequest]
    profile?: [{username?: (Scalars['String'] | null)},UserRequest] | UserRequest
    dataObjectStatusOptions?: [{currentState?: (Scalars['String'] | null),objectId: Scalars['ID']},LifecycleTransitionRequest]
    aggredatedDataObjects?: [{params: ListParametersInput},DataObjectListRequest]
    userSelectionOptions?: [{selectionParameters: UserSelectionOptionsInput},UserRequest]
    isApiSpecValid?: [{apiSpec: ValidateApiSpecInput}]
    dateDisplayFormats?: DateDisplayFormatRequest
    role?: [{id: Scalars['String']},RoleRequest]
    isLifecycleValid?: [{lifecycle: ValidateLifecycleInput}]
    savedSearch?: [{id: Scalars['String']},SavedSearchRequest]
    publishedApplication?: PublishedApplicationRequest
    validationResults?: [{severity?: (Scalars['String'] | null)},ValidationResultsRequest] | ValidationResultsRequest
    /** Get template by id if user has privileges to data type. */
    dataObjectTemplate?: [{id: Scalars['String']},DataObjectRequest]
    userCollections?: [{searchTerm: Scalars['String']},CollectionRequest]
    serviceDtoJson?: [{id: Scalars['String']}]
    dataProperty?: [{id: Scalars['String']},DataPropertyRequest]
    auditLogEntries?: [{params?: (ListParametersInput | null)},AuditLogEntriesListRequest] | AuditLogEntriesListRequest
    htmlWidgetGroup?: [{id: Scalars['String']},HtmlWidgetGroupRequest]
    privileges?: [{includeModuleOnly?: (Scalars['Boolean'] | null),moduleId: Scalars['String']},PrivilegeRequest]
    workspace?: [{id: Scalars['String']},WorkspaceRequest]
    htmlWidget?: [{id: Scalars['String']},HtmlWidgetRequest]
    lifecycle?: [{id: Scalars['String']},LifecycleRequest]
    view?: [{id: Scalars['String']},ViewRequest]
    versionDisplayFormats?: VersionDisplayFormatRequest
    workbench?: [{id: Scalars['String']},WorkbenchRequest]
    isDataObjectValid?: [{dataObject: ValidateDataObjectInput}]
    isRoleValid?: [{role: ValidateRoleInput}]
    availableMembersForGroup?: [{name?: (Scalars['String'] | null),params: ListParametersInput},MemberRequest]
    dataObjectSelectionView?: [{customContextJson?: (Scalars['String'] | null),key: Scalars['String']},PublishedViewRequest]
    passwordResetKeyValid?: [{key: Scalars['String']}]
    dataType?: [{id: Scalars['String']},DataTypeRequest]
    externalGroups?: [{params?: (ExternalGroupListParametersInput | null)},ExternalGroupListRequest] | ExternalGroupListRequest
    dataObjectVersions?: [{id: Scalars['ID']},VersionRequest]
    users?: [{params?: (ListParametersInput | null)},UserListRequest] | UserListRequest
    trashableUsers?: [{params?: (TrashableListParametersInput | null)},UserListRequest] | UserListRequest
    objectsFromFavorites?: [{params: ListParametersInput},DataObjectListRequest]
    auditUsers?: [{params?: (ListParametersInput | null)},UserListRequest] | UserListRequest
    isLoggedIn?: boolean | number
    apiSpec?: [{id: Scalars['String']},ApiSpecRequest]
    dataObjects?: [{params: ListParametersInput},DataObjectListRequest]
    roles?: [{params?: (ListParametersInput | null)},RoleListRequest] | RoleListRequest
    isWorkbenchValid?: [{workbench: ValidateWorkbenchInput}]
    postTemplate?: [{id: Scalars['String']},PostTemplateRequest]
    textFormatTypes?: TextFormatTypeRequest
    isGroupValid?: [{group: ValidateGroupInput}]
    isReferenceDataTypeValid?: [{referenceDataType: ValidateReferenceDataTypeInput}]
    workbenches?: WorkbenchRequest
    canChangeMetadataObjectStatus?: [{action: MetadataObjectChangeStatusActionsEnum,ids?: (Scalars['String'][] | null)}]
    savedSearches?: [{moduleId?: (Scalars['String'] | null)},SavedSearchRequest] | SavedSearchRequest
    getCollection?: [{collectionPath: Scalars['String']}]
    isObjectInFavorites?: [{objectId: Scalars['String']}]
    publicRooms?: [{params?: (ListParametersInput | null)},DiscussionRoomListRequest] | DiscussionRoomListRequest
    booleanDisplayFormats?: BooleanDisplayFormatRequest
    message?: [{messageId: Scalars['String']},DiscussionMessageRequest]
    room?: [{id: Scalars['ID']},DiscussionRoomRequest]
    isPostTemplateValid?: [{postTemplate: ValidatePostTemplateInput}]
    bpmnProcessType?: [{id: Scalars['String']},BpmnProcessTypeRequest]
    systemDefaults?: SystemDefaultsRequest
    /** Get list of all available templates, filtered by user data type privileges. */
    dataObjectTemplates?: [{dataTypeIds?: (Scalars['String'][] | null),parentId: Scalars['String']},DataObjectRequest]
    propertyTypes?: PropertyTypeRequest
    isTypeFilterValid?: [{filter: ValidateTypeFilterInput}]
    availableSelections?: [{referenceDataTypeId: Scalars['String'],parentId: Scalars['String']},DataPropertyRequest]
    publishedViews?: [{params: ViewParametersInput},PublishedViewRequest]
    referenceMetadataObjects?: [{includeArchived?: (Scalars['Boolean'] | null),parentId?: (Scalars['String'] | null),objectType?: (ReferenceMetadataObjectTypeEnum | null)},ReferenceMetadataObjectRequest] | ReferenceMetadataObjectRequest
    isDataPropertyValid?: [{property: ValidateDataPropertyInput}]
    currentUserRooms?: [{params?: (ListParametersInput | null)},DiscussionRoomListRequest] | DiscussionRoomListRequest
    nextMessages?: [{count: Scalars['Int'],messageId: Scalars['String']},DiscussionMessageRequest]
    isUserValid?: [{user: ValidateUserInput}]
    permissions?: [{moduleId: Scalars['String']},PermissionRequest]
    defaultResources?: DefaultResourcesRequest
    enabledLocales?: LocaleOptionRequest
    apiSpecsGroup?: [{id: Scalars['String']},ApiSpecsGroupRequest]
    bpmnMessage?: [{id: Scalars['String']},BpmnMessageRequest]
    publishedAggregatedViews?: [{route: Scalars['String']},PublishedViewRequest]
    typeFilter?: [{id: Scalars['String']},TypeFilterRequest]
    apiSpecsGroups?: [{parentId: Scalars['String']},ApiSpecsGroupRequest]
    dataObjectVersionOptions?: [{id: Scalars['ID']},VersionIncrementRequest]
    objectsFromCollection?: [{params: ListParametersInput},DataObjectListRequest]
    analyzerMap?: boolean | number
    assetUploads?: [{batchIds?: (Scalars['String'][] | null),params?: (ListParametersInput | null)},AssetUploadListRequest] | AssetUploadListRequest
    isDataObjectValid2?: [{dataObject: ValidateDataObjectInput},DataObjectChangesRequest]
    isModuleValid?: [{module: ValidateModuleInput}]
    theme?: ThemeRequest
    isDataTypeValid?: [{dataType: ValidateDataTypeInput}]
    isReferenceDataGroupValid?: [{referenceDataGroup: ValidateReferenceDataGroupInput}]
    isApiSpecsGroupValid?: [{apiSpecsGroup: ValidateApiSpecsGroupInput}]
    publishedApplicationVersions?: [{params?: (ListParametersInput | null)},PublishedApplicationVersionListRequest] | PublishedApplicationVersionListRequest
    filter?: [{id: Scalars['String']},SystemFilterRequest]
    viewTypes?: ViewTypeRequest
    canDeleteLifecycleState?: [{state: Scalars['String'],lifecycleId: Scalars['String']}]
    previousMessages?: [{count: Scalars['Int'],messageId: Scalars['String']},DiscussionMessageRequest]
    validateUpdateUserPassword?: [{oldPassword: Scalars['String'],name: Scalars['String'],newPassword: Scalars['String']}]
    translate?: [{sourceLocale: Scalars['String'],targetLocales: (Scalars['String'] | null)[],value: Scalars['String']},TranslateRequest]
    publishedModuleFilters?: [{moduleId?: (Scalars['String'] | null)},SystemFilterRequest] | SystemFilterRequest
    routes?: RouteRequest
    publishedFilterViews?: [{params: FilterViewParametersInput},PublishedViewRequest]
    isBpmnMessageValid?: [{property: ValidateBpmnMessageInput}]
    group?: [{name: Scalars['String']},GroupRequest]
    oauth2ServiceProviders?: OAuth2ServiceProviderRequest
    settings?: [{key: Scalars['String']},SettingRequest]
    availableMembersForRole?: [{name?: (Scalars['String'] | null),params: ListParametersInput},MemberRequest]
    isBpmnProcessValid?: [{property: CreateOrUpdateBpmnProcessTypeInput}]
    directMessagesRoom?: [{id: Scalars['ID']},DiscussionDirectMessagesRoomRequest]
    dataObjectGenericStatus?: [{id: Scalars['ID']}]
    isFilterValid?: [{filter: ValidateSystemFilterInput}]
    referenceDataGroup?: [{id: Scalars['String']},ReferenceDataGroupRequest]
    isViewValid?: [{view: ValidateViewInput}]
    dataObject?: [{id: Scalars['ID']},DataObjectRequest]
    passwordValid?: [{password: Scalars['String']}]
    canChangeLifecycle?: [{dataTypeId: Scalars['String']}]
    publishedReportingViews?: [{dataTypeIds?: (Scalars['String'][] | null)},PublishedViewRequest] | PublishedViewRequest
    oauth2ServiceTokens?: OAuth2ServiceTokenRequest
    offsetMessages?: [{count: Scalars['Int'],messageId: Scalars['String']},DiscussionMessageRequest]
    offsetMessagesFromFirstUnread?: [{count: Scalars['Int'],parentId: Scalars['String']},DiscussionMessageRequest]
    referenceDataType?: [{id: Scalars['String']},ReferenceDataTypeRequest]
    directMessagesRooms?: [{params?: (ListParametersInput | null)},DiscussionDirectMessagesRoomListRequest] | DiscussionDirectMessagesRoomListRequest
    attributesSelectionOptions?: [{referenceDataTypeId: Scalars['String'],parentValues?: (Scalars['String'][] | null)},AttributeRequest]
    isWorkspaceValid?: [{workspace: ValidateWorkspaceInput}]
    threads?: [{params?: (ListParametersInput | null),roomId: Scalars['String']},DiscussionThreadListRequest]
    groups?: [{params?: (ListParametersInput | null)},GroupListRequest] | GroupListRequest
    thread?: [{id: Scalars['ID']},DiscussionThreadRequest]
    lastMessages?: [{count: Scalars['Int'],parentId: Scalars['String']},DiscussionMessageRequest]
    /** Select available target folder or workspace for data object creation.Method considers current user privileges and permissions. */
    dataObjectHierarchy?: [{
    /** Root target. Can be GUID in case of workspace or folderish data object or module id (in format "/modules/module1"). */
    parentTargetId?: (Scalars['ID'] | null),
    /** Types of data object you are going to create. If omitted all available types of module's data types are used. */
    dataTypeIds?: (Scalars['String'][] | null),
    /** Source data object ids (required parameter if you are going to move objects. */
    objectIds?: (Scalars['ID'][] | null)},DataObjectHierarchyRequest] | DataObjectHierarchyRequest
    application?: ApplicationRequest
    dataObjectSelectionOptions?: [{referenceDataTypeId: Scalars['String'],selectedDate?: (DataPropertyDateTimeValueInput | null),parentValues?: (Scalars['String'][] | null)},DataObjectRequest]
    user?: [{name: Scalars['String']},UserRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RdmContentPayloadRequest{
    referenceDataTypeId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ReferenceDataGroupRequest{
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    grantedPermissions?: GrantedPermissionsRequest
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    permissionsInherited?: boolean | number
    referenceMetadataObjectType?: boolean | number
    referenceMetadataObjects?: [{includeArchived?: (Scalars['Boolean'] | null),objectType?: (ReferenceMetadataObjectTypeEnum | null)},ReferenceMetadataObjectRequest] | ReferenceMetadataObjectRequest
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ReferenceDataTypeRequest{
    createRecordView?: boolean | number
    creationDate?: boolean | number
    dataFile?: FileRequest
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    editRecordView?: boolean | number
    filterJson?: boolean | number
    grantedPermissions?: GrantedPermissionsRequest
    id?: boolean | number
    isDateSpecific?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    navigateRecordView?: boolean | number
    parentId?: boolean | number
    parentReferenceDataType?: ReferenceDataTypeRequest
    permissionsInherited?: boolean | number
    properties?: PropertyGroupRequest
    recordTableView?: boolean | number
    referenceMetadataObjectType?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    status?: boolean | number
    views?: [{includeArchived?: (Scalars['Boolean'] | null),viewType?: (ViewTypeEnum | null)},ViewRequest] | ViewRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ReferenceMetadataObjectRequest{
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    grantedPermissions?: GrantedPermissionsRequest
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    permissionsInherited?: boolean | number
    referenceMetadataObjectType?: boolean | number
    status?: boolean | number
    on_ReferenceDataGroup?: ReferenceDataGroupRequest
    on_ReferenceDataType?: ReferenceDataTypeRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RoleRequest{
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    members?: MemberRequest
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    roles?: RoleRequest
    status?: boolean | number
    visible?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RoleListRequest{
    items?: RoleRequest
    pageInfo?: PageInfoRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RouteRequest{
    description?: boolean | number
    displayName?: boolean | number
    route?: boolean | number
    routes?: RouteRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SavedSearchRequest{
    displayName?: boolean | number
    filterJson?: boolean | number
    id?: boolean | number
    moduleName?: boolean | number
    owner?: UserRequest
    route?: boolean | number
    sortingJson?: boolean | number
    viewJson?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SendEmailInput {body: Scalars['String'],subject: Scalars['String'],to: Scalars['String'][]}

export interface SettingRequest{
    key?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StaticContentFileRequest{
    defaultResource?: boolean | number
    encoding?: boolean | number
    htmlFiles?: boolean | number
    length?: boolean | number
    mimeType?: boolean | number
    name?: boolean | number
    resourceId?: boolean | number
    thumbnailUrl?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Subscription root */
export interface SubscriptionRequest{
    messages?: [{topics: (Scalars['String'] | null)[]},SubscriptionMessageRequest]
    unspecifiedPayloadMessages?: [{topics: (Scalars['String'] | null)[]},SubscriptionUnspecifiedMessageRequest]
    csvImports?: [{topics: (Scalars['String'] | null)[]},SubscriptionCsvImportStatusRequest]
    actions?: [{topics: (Scalars['String'] | null)[]},SubscriptionActionRequest]
    dataObjectChanges?: [{id: Scalars['ID']},DataObjectRequest]
    rdmContentChanges?: [{topics: (Scalars['String'] | null)[]},SubscriptionRdmContentChangesRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SubscriptionActionRequest{
    payload?: SubscriptionActionPayloadRequest
    topic?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SubscriptionActionPayloadRequest{
    actionKey?: boolean | number
    relatedObjects?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SubscriptionCsvImportStatusRequest{
    payload?: CsvImportStatusRequest
    topic?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SubscriptionMessageRequest{
    payload?: DiscussionMessageRequest
    topic?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SubscriptionRdmContentChangesRequest{
    payload?: RdmContentPayloadRequest
    topic?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SubscriptionUnspecifiedMessageRequest{
    payload?: boolean | number
    topic?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SystemDefaultsRequest{
    locale?: boolean | number
    passwordSettings?: SettingRequest
    timezone?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SystemFilterRequest{
    calendarView?: boolean | number
    childrenTypes?: DataTypeRequest
    creationDate?: boolean | number
    dataObjectContext?: boolean | number
    defaultListView?: boolean | number
    defaultViewType?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    exactDataType?: boolean | number
    filterJson?: boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    kanbanView?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    navigateView?: boolean | number
    parentId?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    status?: boolean | number
    tileView?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SystemPageRequest{
    calendarView?: boolean | number
    enabled?: boolean | number
    filterJson?: boolean | number
    navigateView?: boolean | number
    tileView?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SystemPageInput {calendarView?: (Scalars['String'] | null),enabled?: (Scalars['Boolean'] | null),filterJson?: (Scalars['String'] | null),navigateView?: (Scalars['String'] | null),tileView?: (Scalars['String'] | null)}

export interface TextFormatTypeRequest{
    displayName?: boolean | number
    textFormatTypeEnum?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ThemeRequest{
    applicationTitle?: boolean | number
    favicon?: FileRequest
    leftPanelDarkMode?: boolean | number
    logo?: FileRequest
    logoSmall?: FileRequest
    primaryColor?: boolean | number
    staticContent?: StaticContentFileRequest
    uid?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TranslateRequest{
    items?: TranslateOptionRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TranslateOptionRequest{
    locale?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TrashableListParametersInput {hints?: (Scalars['String'] | null),pagination?: (PaginationInput | null),search?: (Scalars['String'] | null),sortingJson?: (Scalars['String'] | null),trashed: Scalars['Boolean']}

export interface TypeFilterRequest{
    calendarView?: boolean | number
    childrenTypes?: DataTypeRequest
    creationDate?: boolean | number
    dataObjectContext?: boolean | number
    defaultListView?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    exactDataType?: boolean | number
    filterJson?: boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    kanbanView?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    navigateView?: boolean | number
    parentId?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    status?: boolean | number
    tileView?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UnpublishDataObjectInput {objectId: Scalars['String'],serviceName: Scalars['String']}

export interface UpdateApiSpecInput {authMethod?: (AuthMethod | null),basicAuthLogin?: (Scalars['String'] | null),basicAuthPassword?: (Scalars['String'] | null),clientCredFlowClientId?: (Scalars['String'] | null),clientCredFlowClientSecret?: (Scalars['String'] | null),clientCredFlowTokenUrl?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),id: Scalars['String'],openApiJson?: (Scalars['String'] | null),serviceUrl?: (Scalars['String'] | null)}

export interface UpdateApiSpecsGroupInput {description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),id: Scalars['String']}

export interface UpdateApplicationInput {displayName?: (Scalars['String'] | null),notificationJson?: (Scalars['String'] | null),toolbarJson?: (Scalars['String'] | null)}

export interface UpdateBpmnMessageInput {dataJson?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),id: Scalars['String']}

export interface UpdateDataObjectInput {id: Scalars['ID'],properties?: (DataObjectPropertyInput[] | null)}

export interface UpdateDataPropertyAttributesInput {customizationRef?: (Scalars['String'] | null),dateDataPropertyKey?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),formula?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],parentSelection?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),referenceDataTypeId?: (Scalars['String'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyBooleanInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyBooleanValueInput | null),description?: (Scalars['String'] | null),displayFalseAs?: (Scalars['String'] | null),displayFalseColor?: (Scalars['String'] | null),displayFormat?: (BooleanDisplayFormatEnum | null),displayName?: (Scalars['String'] | null),displayTrueAs?: (Scalars['String'] | null),displayTrueColor?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyDateInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyDateValueInput | null),description?: (Scalars['String'] | null),displayFormat?: (DateDisplayFormatEnum | null),displayName?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],maxValue?: (DataPropertyDateValueInput | null),minValue?: (DataPropertyDateValueInput | null),readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyDateTimeInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyDateTimeValueInput | null),description?: (Scalars['String'] | null),displayFormat?: (DateDisplayFormatEnum | null),displayName?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],maxValue?: (DataPropertyDateTimeValueInput | null),minValue?: (DataPropertyDateTimeValueInput | null),readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyDecimalInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyDecimalValueInput | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),formula?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],maxValue?: (DataPropertyDecimalValueInput | null),minValue?: (DataPropertyDecimalValueInput | null),precision?: (Scalars['Int'] | null),prefix?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),suffix?: (Scalars['String'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyFileInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),downloadable?: (Scalars['Boolean'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyFilesInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),downloadable?: (Scalars['Boolean'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyIntegerInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyIntegerValueInput | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],maxValue?: (DataPropertyIntegerValueInput | null),minValue?: (DataPropertyIntegerValueInput | null),prefix?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),suffix?: (Scalars['String'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyMultiSelectionInput {customizationRef?: (Scalars['String'] | null),dateDataPropertyKey?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),formula?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],parentSelection?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),referenceDataTypeId?: (Scalars['String'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyObjectFilterInput {bindingJson?: (Scalars['String'] | null),customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),filterId?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],readonly?: (Scalars['Boolean'] | null),relationObjectProperty?: (Scalars['String'] | null),relationTypes?: ((Scalars['String'] | null)[] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null),viewJson?: (Scalars['String'] | null)}

export interface UpdateDataPropertyObjectInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],readonly?: (Scalars['Boolean'] | null),relationObjectProperty?: (Scalars['String'] | null),relationTypes?: ((Scalars['String'] | null)[] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null),viewJson?: (Scalars['String'] | null)}

export interface UpdateDataPropertyObjectsInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],readonly?: (Scalars['Boolean'] | null),relationObjectProperty?: (Scalars['String'] | null),relationTypes?: ((Scalars['String'] | null)[] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null),viewJson?: (Scalars['String'] | null)}

export interface UpdateDataPropertySelectionInput {customizationRef?: (Scalars['String'] | null),dateDataPropertyKey?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),formula?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],parentSelection?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),referenceDataTypeId?: (Scalars['String'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertySequenceInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],initialValue?: (Scalars['Int'] | null),prefix?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),restartInterval?: (SequenceRestartInterval | null),suffix?: (Scalars['String'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyStatusInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyStringInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyStringValueInput | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),formula?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),icon?: (Scalars['String'] | null),id: Scalars['String'],maxLength?: (Scalars['Int'] | null),minLength?: (Scalars['Int'] | null),multilanguage?: (Scalars['Boolean'] | null),pattern?: (Scalars['String'] | null),prefix?: (Scalars['String'] | null),readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),suffix?: (Scalars['String'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyTextInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyTextValueInput | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],maxLength?: (Scalars['Int'] | null),minLength?: (Scalars['Int'] | null),multilanguage?: (Scalars['Boolean'] | null),readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyTimeInput {customizationRef?: (Scalars['String'] | null),defaultValue?: (DataPropertyTimeValueInput | null),description?: (Scalars['String'] | null),displayFormat?: (DateDisplayFormatEnum | null),displayName?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],maxValue?: (DataPropertyTimeValueInput | null),minValue?: (DataPropertyTimeValueInput | null),readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyUserInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),filterByDataObjectPermissions?: (Scalars['Boolean'] | null),filterByDataTypePrivileges?: (Scalars['Boolean'] | null),filterByRoles?: (Scalars['String'][] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),sortingFullName?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyUsersInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),filterByDataObjectPermissions?: (Scalars['Boolean'] | null),filterByDataTypePrivileges?: (Scalars['Boolean'] | null),filterByRoles?: (Scalars['String'][] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],readonly?: (Scalars['Boolean'] | null),required?: (Scalars['Boolean'] | null),sortingFullName?: (Scalars['Boolean'] | null),useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataPropertyVersionInput {customizationRef?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayFormat?: (VersionDisplayFormatEnum | null),displayName?: (Scalars['String'] | null),helpText?: (Scalars['String'] | null),id: Scalars['String'],useInSearchOrSort?: (Scalars['Boolean'] | null)}

export interface UpdateDataTypeInput {brandingJson?: (Scalars['String'] | null),calendarView?: (Scalars['String'] | null),canBeUsedAsTemplate?: (Scalars['Boolean'] | null),canCreateAnother?: (Scalars['Boolean'] | null),canHaveDiscussion?: (Scalars['Boolean'] | null),cardView?: (Scalars['String'] | null),childTableView?: (Scalars['String'] | null),childrenTypes?: (Scalars['String'][] | null),createFromTemplateView?: (Scalars['String'] | null),createView?: (Scalars['String'] | null),dataTypeComment?: (Scalars['String'] | null),description?: (Scalars['String'] | null),discussionMembersId?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),editView?: (Scalars['String'] | null),embedView?: (Scalars['String'] | null),filterJson?: (Scalars['String'] | null),id: Scalars['String'],inheritBpmnScheme?: (Scalars['Boolean'] | null),lifecycle?: (Scalars['String'] | null),navigateView?: (Scalars['String'] | null),reportingView?: (Scalars['String'] | null),tileView?: (Scalars['String'] | null),versionIncrement?: (VersionIncrementEnum[] | null),versionable?: (Scalars['Boolean'] | null)}

export interface UpdateDiscussionMessageInput {attachmentsValueInput?: (FilesInput | null),id: Scalars['String'],message?: (Scalars['String'] | null)}

export interface UpdateDiscussionRoomInput {description?: (Scalars['String'] | null),iconBatchId?: (Scalars['String'] | null),id: Scalars['String'],name?: (Scalars['String'] | null),participants?: (Scalars['String'][] | null),private?: (Scalars['Boolean'] | null)}

export interface UpdateDiscussionThreadInput {color?: (Scalars['String'] | null),id: Scalars['String'],name?: (Scalars['String'] | null)}

export interface UpdateGrantedPermissionsInput {permissions: PermissionEnum[],role: Scalars['String']}

export interface UpdateGrantedPrivilegesInput {privileges: PrivilegeEnum[],role: Scalars['String']}

export interface UpdateGroupInput {description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),name: Scalars['String']}

export interface UpdateHtmlWidgetGroupInput {description: Scalars['String'],id: Scalars['String']}

export interface UpdateHtmlWidgetInput {css?: (Scalars['String'] | null),html?: (Scalars['String'] | null),id: Scalars['String'],js?: (Scalars['String'] | null),widgetJson?: (Scalars['String'] | null)}

export interface UpdateLifecycleInput {description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),id: Scalars['String'],lifecycleJson?: (Scalars['String'] | null)}

export interface UpdateModuleInput {brandingJson?: (Scalars['String'] | null),calendarView?: (Scalars['String'] | null),cardView?: (Scalars['String'] | null),childTableView?: (Scalars['String'] | null),createView?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),editView?: (Scalars['String'] | null),embedView?: (Scalars['String'] | null),iconBatchId?: (Scalars['String'] | null),id: Scalars['String'],kanbanView?: (Scalars['String'] | null),navigateView?: (Scalars['String'] | null),reportingView?: (Scalars['String'] | null),searchPage?: (SystemPageInput | null),templatesPage?: (SystemPageInput | null),tileView?: (Scalars['String'] | null)}

export interface UpdatePostTemplateInput {bodyTemplate?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),id: Scalars['String'],subjectTemplate?: (Scalars['String'] | null)}

export interface UpdateReferenceDataGroupInput {description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),referenceDataGroupId: Scalars['String']}

export interface UpdateReferenceDataTypeInput {createRecordView?: (Scalars['String'] | null),dataFileBatchId?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),editRecordView?: (Scalars['String'] | null),filterJson?: (Scalars['String'] | null),navigateRecordView?: (Scalars['String'] | null),recordTableView?: (Scalars['String'] | null),referenceDataTypeId: Scalars['String']}

export interface UpdateRoleInput {description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),id: Scalars['String'],visible?: (Scalars['Boolean'] | null)}

export interface UpdateSavedSearchInput {displayName?: (Scalars['String'] | null),filterJson?: (Scalars['String'] | null),id: Scalars['String'],sortingJson?: (Scalars['String'] | null),viewJson?: (Scalars['String'] | null)}

export interface UpdateSettingInput {key: Scalars['String'],value: Scalars['String']}

export interface UpdateSystemFilterInput {calendarView?: (Scalars['String'] | null),childrenTypes?: (Scalars['String'][] | null),dataObjectContext?: (Scalars['Boolean'] | null),defaultListView?: (FilterDefaultViewEnum | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),filterJson?: (Scalars['String'] | null),id: Scalars['String'],kanbanView?: (Scalars['String'] | null),navigateView?: (Scalars['String'] | null),tileView?: (Scalars['String'] | null)}

export interface UpdateThemeInput {applicationTitle?: (Scalars['String'] | null),faviconBatchId?: (Scalars['String'] | null),leftPanelDarkMode?: (Scalars['Boolean'] | null),logoBatchId?: (Scalars['String'] | null),logoSmallBatchId?: (Scalars['String'] | null),primaryColor?: (Scalars['String'] | null)}

export interface UpdateTypeFilterInput {calendarView?: (Scalars['String'] | null),childrenTypes?: (Scalars['String'][] | null),dataObjectContext?: (Scalars['Boolean'] | null),defaultListView?: (FilterDefaultViewEnum | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),exactDataType?: (Scalars['Boolean'] | null),filterJson?: (Scalars['String'] | null),id: Scalars['String'],kanbanView?: (Scalars['String'] | null),navigateView?: (Scalars['String'] | null),tileView?: (Scalars['String'] | null)}

export interface UpdateUserInput {email?: (Scalars['String'] | null),firstName?: (Scalars['String'] | null),groups?: (Scalars['String'][] | null),isSuperUser?: (Scalars['Boolean'] | null),lastName?: (Scalars['String'] | null),name: Scalars['String'],roles?: (Scalars['String'][] | null),visible?: (Scalars['Boolean'] | null)}

export interface UpdateUserProfileInput {avatarBatchId?: (Scalars['String'] | null),birthdate?: (Scalars['Date'] | null),email?: (Scalars['String'] | null),firstName?: (Scalars['String'] | null),gender?: (Scalars['Boolean'] | null),lastName?: (Scalars['String'] | null),locale?: (Scalars['String'] | null),name: Scalars['String'],phonenumber?: (Scalars['String'] | null),timezone?: (Scalars['String'] | null)}

export interface UpdateViewInput {description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),fileProperty?: (Scalars['String'] | null),group?: (Scalars['String'] | null),id: Scalars['String'],managementMode?: (ViewManagementModeEnum | null),sortingJson?: (Scalars['String'] | null),templateBatchId?: (Scalars['String'] | null),viewJson?: (Scalars['String'] | null),viewMode?: (Scalars['String'] | null)}

export interface UpdateWorkbenchInput {description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),id: Scalars['String'],menuJson?: (Scalars['String'] | null),roles?: ((Scalars['String'] | null)[] | null)}

export interface UpdateWorkspaceInput {brandingJson?: (Scalars['String'] | null),calendarView?: (Scalars['String'] | null),cardView?: (Scalars['String'] | null),childTableView?: (Scalars['String'] | null),childrenTypes?: (Scalars['String'][] | null),createView?: (Scalars['String'] | null),description?: (Scalars['String'] | null),displayName?: (Scalars['String'] | null),editView?: (Scalars['String'] | null),embedView?: (Scalars['String'] | null),filterJson?: (Scalars['String'] | null),iconBatchId?: (Scalars['String'] | null),id: Scalars['String'],isImportAllowed?: (Scalars['Boolean'] | null),kanbanView?: (Scalars['String'] | null),navigateView?: (Scalars['String'] | null),tileView?: (Scalars['String'] | null)}

export interface UserRequest{
    allGroups?: GroupRequest
    allRoles?: RoleRequest
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    groups?: GroupRequest
    isExternal?: boolean | number
    isSuperUser?: boolean | number
    name?: boolean | number
    parents?: boolean | number
    roles?: RoleRequest
    trashed?: boolean | number
    type?: MemberTypeRequest
    uid?: boolean | number
    userprofile?: UserProfileRequest
    visible?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserListRequest{
    items?: UserRequest
    pageInfo?: PageInfoRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserProfileRequest{
    avatar?: FileRequest
    birthdate?: boolean | number
    email?: boolean | number
    firstName?: boolean | number
    gender?: boolean | number
    lastName?: boolean | number
    locale?: boolean | number
    phonenumber?: boolean | number
    timezone?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserSelectionOptionsInput {dataObjectId?: (Scalars['String'] | null),dataTypeId?: (Scalars['String'] | null),propertyId: Scalars['String']}

export interface ValidateApiSpecInput {openApiJson: Scalars['String'],parentId: Scalars['String']}

export interface ValidateApiSpecsGroupInput {name: Scalars['String'],parentId: Scalars['String']}

export interface ValidateBpmnMessageInput {id?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String']}

export interface ValidateDataObjectInput {objectId?: (Scalars['String'] | null),parentId?: (Scalars['String'] | null),properties?: (DataObjectPropertyInput[] | null),propertyToValidate?: (Scalars['String'] | null),typeId?: (Scalars['String'] | null)}

export interface ValidateDataPropertyInput {id?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String']}

export interface ValidateDataTypeInput {id?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String']}

export interface ValidateGroupInput {isNew: Scalars['Boolean'],name: Scalars['String']}

export interface ValidateLifecycleInput {id?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String']}

export interface ValidateModuleInput {id?: (Scalars['String'] | null),name: Scalars['String']}

export interface ValidatePostTemplateInput {bodyTemplate: Scalars['String'],id?: (Scalars['String'] | null),parentId: Scalars['String'],subjectTemplate: Scalars['String']}

export interface ValidateReferenceDataGroupInput {isNew: Scalars['Boolean'],name: Scalars['String']}

export interface ValidateReferenceDataTypeInput {isNew: Scalars['Boolean'],name: Scalars['String']}

export interface ValidateRoleInput {id?: (Scalars['String'] | null),name: Scalars['String']}

export interface ValidateSystemFilterInput {id?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String']}

export interface ValidateTypeFilterInput {id?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String']}

export interface ValidateUserInput {isNew: Scalars['Boolean'],name: Scalars['String']}

export interface ValidateViewInput {name: Scalars['String'],parentId: Scalars['String']}

export interface ValidateWorkbenchInput {id?: (Scalars['String'] | null),menuJson?: (Scalars['String'] | null),name?: (Scalars['String'] | null),roles?: ((Scalars['String'] | null)[] | null)}

export interface ValidateWorkspaceInput {id?: (Scalars['String'] | null),name: Scalars['String'],parentId: Scalars['String']}

export interface ValidationResultsRequest{
    dataType?: DataTypeRequest
    isValid?: boolean | number
    module?: ModuleRequest
    validation?: GenericValidationResultRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VersionRequest{
    majorVersion?: boolean | number
    minorVersion?: boolean | number
    qualifier?: VersionQualifierRequest
    versionInfo?: VersionInfoRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VersionDisplayFormatRequest{
    displayFormatEnum?: boolean | number
    displayName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VersionIncrementRequest{
    displayName?: boolean | number
    version?: boolean | number
    versionIncrementEnum?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VersionInfoRequest{
    comment?: boolean | number
    creationDate?: boolean | number
    route?: boolean | number
    user?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VersionQualifierRequest{
    displayName?: boolean | number
    versionQualifierEnum?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ViewRequest{
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    fileProperty?: boolean | number
    group?: boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    managementMode?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    properties?: PropertyGroupRequest
    sortingJson?: boolean | number
    status?: boolean | number
    template?: FileRequest
    viewJson?: boolean | number
    viewMode?: boolean | number
    viewType?: ViewTypeRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ViewCustomizationInput {contextId: Scalars['String'],filterJson?: (Scalars['String'] | null),sortingJson?: (Scalars['String'] | null),tableViewJson?: (Scalars['String'] | null)}

export interface ViewParametersInput {action: ActionEnum,dataTypeId?: (Scalars['ID'] | null),filterJson?: (Scalars['String'] | null),route: Scalars['String'],routeState?: (Scalars['String'] | null),viewId?: (Scalars['String'] | null)}

export interface ViewTypeRequest{
    displayName?: boolean | number
    viewTypeEnum?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkbenchRequest{
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    id?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    menuJson?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    parentId?: boolean | number
    roles?: RoleRequest
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WorkspaceRequest{
    brandingJson?: boolean | number
    calendarView?: boolean | number
    cardView?: boolean | number
    childTableView?: boolean | number
    childrenTypes?: DataTypeRequest
    createView?: boolean | number
    creationDate?: boolean | number
    description?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    displayName?: [{multilanguage?: (Scalars['Boolean'] | null)}] | boolean | number
    editView?: boolean | number
    embedView?: boolean | number
    filterJson?: boolean | number
    grantedPermissions?: GrantedPermissionsRequest
    icon?: FileRequest
    id?: boolean | number
    isImportAllowed?: boolean | number
    isPreconfigured?: boolean | number
    isSystem?: boolean | number
    kanbanView?: boolean | number
    modificationDate?: boolean | number
    name?: boolean | number
    navigateView?: boolean | number
    parentId?: boolean | number
    searchPanelProperties?: PropertyGroupRequest
    status?: boolean | number
    tileView?: boolean | number
    views?: [{includeArchived?: (Scalars['Boolean'] | null),viewType?: (ViewTypeEnum | null)},ViewRequest] | ViewRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface XmlAndModelDecorationRequest{
    bpmnXml?: boolean | number
    decorJson?: boolean | number
    valid?: boolean | number
    validationResultsJson?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const ApiSpec_possibleTypes: string[] = ['ApiSpec']
export const isApiSpec = (obj?: { __typename?: any } | null): obj is ApiSpec => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isApiSpec"')
  return ApiSpec_possibleTypes.includes(obj.__typename)
}



const ApiSpecsGroup_possibleTypes: string[] = ['ApiSpecsGroup']
export const isApiSpecsGroup = (obj?: { __typename?: any } | null): obj is ApiSpecsGroup => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isApiSpecsGroup"')
  return ApiSpecsGroup_possibleTypes.includes(obj.__typename)
}



const Application_possibleTypes: string[] = ['Application']
export const isApplication = (obj?: { __typename?: any } | null): obj is Application => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isApplication"')
  return Application_possibleTypes.includes(obj.__typename)
}



const AssetUpload_possibleTypes: string[] = ['AssetUpload']
export const isAssetUpload = (obj?: { __typename?: any } | null): obj is AssetUpload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAssetUpload"')
  return AssetUpload_possibleTypes.includes(obj.__typename)
}



const AssetUploadList_possibleTypes: string[] = ['AssetUploadList']
export const isAssetUploadList = (obj?: { __typename?: any } | null): obj is AssetUploadList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAssetUploadList"')
  return AssetUploadList_possibleTypes.includes(obj.__typename)
}



const AssetUploadStatus_possibleTypes: string[] = ['AssetUploadStatus']
export const isAssetUploadStatus = (obj?: { __typename?: any } | null): obj is AssetUploadStatus => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAssetUploadStatus"')
  return AssetUploadStatus_possibleTypes.includes(obj.__typename)
}



const Attribute_possibleTypes: string[] = ['Attribute']
export const isAttribute = (obj?: { __typename?: any } | null): obj is Attribute => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAttribute"')
  return Attribute_possibleTypes.includes(obj.__typename)
}



const AttributeValue_possibleTypes: string[] = ['AttributeValue']
export const isAttributeValue = (obj?: { __typename?: any } | null): obj is AttributeValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAttributeValue"')
  return AttributeValue_possibleTypes.includes(obj.__typename)
}



const AuditCategory_possibleTypes: string[] = ['AuditCategory']
export const isAuditCategory = (obj?: { __typename?: any } | null): obj is AuditCategory => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAuditCategory"')
  return AuditCategory_possibleTypes.includes(obj.__typename)
}



const AuditEvent_possibleTypes: string[] = ['AuditEvent']
export const isAuditEvent = (obj?: { __typename?: any } | null): obj is AuditEvent => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAuditEvent"')
  return AuditEvent_possibleTypes.includes(obj.__typename)
}



const AuditLogEntriesList_possibleTypes: string[] = ['AuditLogEntriesList']
export const isAuditLogEntriesList = (obj?: { __typename?: any } | null): obj is AuditLogEntriesList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAuditLogEntriesList"')
  return AuditLogEntriesList_possibleTypes.includes(obj.__typename)
}



const AuditLogEntry_possibleTypes: string[] = ['AuditLogEntry']
export const isAuditLogEntry = (obj?: { __typename?: any } | null): obj is AuditLogEntry => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAuditLogEntry"')
  return AuditLogEntry_possibleTypes.includes(obj.__typename)
}



const BooleanDisplayFormat_possibleTypes: string[] = ['BooleanDisplayFormat']
export const isBooleanDisplayFormat = (obj?: { __typename?: any } | null): obj is BooleanDisplayFormat => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isBooleanDisplayFormat"')
  return BooleanDisplayFormat_possibleTypes.includes(obj.__typename)
}



const BpmnMessage_possibleTypes: string[] = ['BpmnMessage']
export const isBpmnMessage = (obj?: { __typename?: any } | null): obj is BpmnMessage => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isBpmnMessage"')
  return BpmnMessage_possibleTypes.includes(obj.__typename)
}



const BpmnMessageGroup_possibleTypes: string[] = ['BpmnMessageGroup']
export const isBpmnMessageGroup = (obj?: { __typename?: any } | null): obj is BpmnMessageGroup => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isBpmnMessageGroup"')
  return BpmnMessageGroup_possibleTypes.includes(obj.__typename)
}



const BpmnProcessType_possibleTypes: string[] = ['BpmnProcessType']
export const isBpmnProcessType = (obj?: { __typename?: any } | null): obj is BpmnProcessType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isBpmnProcessType"')
  return BpmnProcessType_possibleTypes.includes(obj.__typename)
}



const Collection_possibleTypes: string[] = ['Collection']
export const isCollection = (obj?: { __typename?: any } | null): obj is Collection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCollection"')
  return Collection_possibleTypes.includes(obj.__typename)
}



const CsvImportStatus_possibleTypes: string[] = ['CsvImportStatus']
export const isCsvImportStatus = (obj?: { __typename?: any } | null): obj is CsvImportStatus => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCsvImportStatus"')
  return CsvImportStatus_possibleTypes.includes(obj.__typename)
}



const DataObject_possibleTypes: string[] = ['DataObject']
export const isDataObject = (obj?: { __typename?: any } | null): obj is DataObject => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataObject"')
  return DataObject_possibleTypes.includes(obj.__typename)
}



const DataObjectChanges_possibleTypes: string[] = ['DataObjectChanges']
export const isDataObjectChanges = (obj?: { __typename?: any } | null): obj is DataObjectChanges => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataObjectChanges"')
  return DataObjectChanges_possibleTypes.includes(obj.__typename)
}



const DataObjectHierarchy_possibleTypes: string[] = ['DataObjectHierarchy']
export const isDataObjectHierarchy = (obj?: { __typename?: any } | null): obj is DataObjectHierarchy => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataObjectHierarchy"')
  return DataObjectHierarchy_possibleTypes.includes(obj.__typename)
}



const DataObjectList_possibleTypes: string[] = ['DataObjectList']
export const isDataObjectList = (obj?: { __typename?: any } | null): obj is DataObjectList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataObjectList"')
  return DataObjectList_possibleTypes.includes(obj.__typename)
}



const DataObjectProperty_possibleTypes: string[] = ['DataObjectProperty']
export const isDataObjectProperty = (obj?: { __typename?: any } | null): obj is DataObjectProperty => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataObjectProperty"')
  return DataObjectProperty_possibleTypes.includes(obj.__typename)
}



const DataObjectPublishInfo_possibleTypes: string[] = ['DataObjectPublishInfo']
export const isDataObjectPublishInfo = (obj?: { __typename?: any } | null): obj is DataObjectPublishInfo => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataObjectPublishInfo"')
  return DataObjectPublishInfo_possibleTypes.includes(obj.__typename)
}



const DataProperty_possibleTypes: string[] = ['DataPropertyAttributes','DataPropertyBoolean','DataPropertyDate','DataPropertyDateTime','DataPropertyDecimal','DataPropertyFile','DataPropertyFiles','DataPropertyInteger','DataPropertyMultiSelection','DataPropertyObject','DataPropertyObjectFilter','DataPropertyObjects','DataPropertySelection','DataPropertySequence','DataPropertyStatus','DataPropertyString','DataPropertyText','DataPropertyTime','DataPropertyUser','DataPropertyUserCommon','DataPropertyUsers','DataPropertyVersion']
export const isDataProperty = (obj?: { __typename?: any } | null): obj is DataProperty => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataProperty"')
  return DataProperty_possibleTypes.includes(obj.__typename)
}



const DataPropertyAttributes_possibleTypes: string[] = ['DataPropertyAttributes']
export const isDataPropertyAttributes = (obj?: { __typename?: any } | null): obj is DataPropertyAttributes => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyAttributes"')
  return DataPropertyAttributes_possibleTypes.includes(obj.__typename)
}



const DataPropertyAttributesValue_possibleTypes: string[] = ['DataPropertyAttributesValue']
export const isDataPropertyAttributesValue = (obj?: { __typename?: any } | null): obj is DataPropertyAttributesValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyAttributesValue"')
  return DataPropertyAttributesValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyAttributesValueUnion_possibleTypes: string[] = ['DataPropertyBooleanValue','DataPropertyDateTimeValue','DataPropertyDateValue','DataPropertyDecimalValue','DataPropertyIntegerValue','DataPropertyMultiSelectionValue','DataPropertySelectionValue','DataPropertyStringValue','DataPropertyTextValue','DataPropertyTimeValue']
export const isDataPropertyAttributesValueUnion = (obj?: { __typename?: any } | null): obj is DataPropertyAttributesValueUnion => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyAttributesValueUnion"')
  return DataPropertyAttributesValueUnion_possibleTypes.includes(obj.__typename)
}



const DataPropertyBoolean_possibleTypes: string[] = ['DataPropertyBoolean']
export const isDataPropertyBoolean = (obj?: { __typename?: any } | null): obj is DataPropertyBoolean => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyBoolean"')
  return DataPropertyBoolean_possibleTypes.includes(obj.__typename)
}



const DataPropertyBooleanValue_possibleTypes: string[] = ['DataPropertyBooleanValue']
export const isDataPropertyBooleanValue = (obj?: { __typename?: any } | null): obj is DataPropertyBooleanValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyBooleanValue"')
  return DataPropertyBooleanValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyDate_possibleTypes: string[] = ['DataPropertyDate']
export const isDataPropertyDate = (obj?: { __typename?: any } | null): obj is DataPropertyDate => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyDate"')
  return DataPropertyDate_possibleTypes.includes(obj.__typename)
}



const DataPropertyDateTime_possibleTypes: string[] = ['DataPropertyDateTime']
export const isDataPropertyDateTime = (obj?: { __typename?: any } | null): obj is DataPropertyDateTime => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyDateTime"')
  return DataPropertyDateTime_possibleTypes.includes(obj.__typename)
}



const DataPropertyDateTimeValue_possibleTypes: string[] = ['DataPropertyDateTimeValue']
export const isDataPropertyDateTimeValue = (obj?: { __typename?: any } | null): obj is DataPropertyDateTimeValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyDateTimeValue"')
  return DataPropertyDateTimeValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyDateValue_possibleTypes: string[] = ['DataPropertyDateValue']
export const isDataPropertyDateValue = (obj?: { __typename?: any } | null): obj is DataPropertyDateValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyDateValue"')
  return DataPropertyDateValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyDecimal_possibleTypes: string[] = ['DataPropertyDecimal']
export const isDataPropertyDecimal = (obj?: { __typename?: any } | null): obj is DataPropertyDecimal => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyDecimal"')
  return DataPropertyDecimal_possibleTypes.includes(obj.__typename)
}



const DataPropertyDecimalValue_possibleTypes: string[] = ['DataPropertyDecimalValue']
export const isDataPropertyDecimalValue = (obj?: { __typename?: any } | null): obj is DataPropertyDecimalValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyDecimalValue"')
  return DataPropertyDecimalValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyFile_possibleTypes: string[] = ['DataPropertyFile']
export const isDataPropertyFile = (obj?: { __typename?: any } | null): obj is DataPropertyFile => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyFile"')
  return DataPropertyFile_possibleTypes.includes(obj.__typename)
}



const DataPropertyFileValue_possibleTypes: string[] = ['DataPropertyFileValue']
export const isDataPropertyFileValue = (obj?: { __typename?: any } | null): obj is DataPropertyFileValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyFileValue"')
  return DataPropertyFileValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyFiles_possibleTypes: string[] = ['DataPropertyFiles']
export const isDataPropertyFiles = (obj?: { __typename?: any } | null): obj is DataPropertyFiles => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyFiles"')
  return DataPropertyFiles_possibleTypes.includes(obj.__typename)
}



const DataPropertyFilesValue_possibleTypes: string[] = ['DataPropertyFilesValue']
export const isDataPropertyFilesValue = (obj?: { __typename?: any } | null): obj is DataPropertyFilesValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyFilesValue"')
  return DataPropertyFilesValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyInteger_possibleTypes: string[] = ['DataPropertyInteger']
export const isDataPropertyInteger = (obj?: { __typename?: any } | null): obj is DataPropertyInteger => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyInteger"')
  return DataPropertyInteger_possibleTypes.includes(obj.__typename)
}



const DataPropertyIntegerValue_possibleTypes: string[] = ['DataPropertyIntegerValue']
export const isDataPropertyIntegerValue = (obj?: { __typename?: any } | null): obj is DataPropertyIntegerValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyIntegerValue"')
  return DataPropertyIntegerValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyMultiSelection_possibleTypes: string[] = ['DataPropertyMultiSelection']
export const isDataPropertyMultiSelection = (obj?: { __typename?: any } | null): obj is DataPropertyMultiSelection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyMultiSelection"')
  return DataPropertyMultiSelection_possibleTypes.includes(obj.__typename)
}



const DataPropertyMultiSelectionValue_possibleTypes: string[] = ['DataPropertyMultiSelectionValue']
export const isDataPropertyMultiSelectionValue = (obj?: { __typename?: any } | null): obj is DataPropertyMultiSelectionValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyMultiSelectionValue"')
  return DataPropertyMultiSelectionValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyObject_possibleTypes: string[] = ['DataPropertyObject']
export const isDataPropertyObject = (obj?: { __typename?: any } | null): obj is DataPropertyObject => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyObject"')
  return DataPropertyObject_possibleTypes.includes(obj.__typename)
}



const DataPropertyObjectFilter_possibleTypes: string[] = ['DataPropertyObjectFilter']
export const isDataPropertyObjectFilter = (obj?: { __typename?: any } | null): obj is DataPropertyObjectFilter => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyObjectFilter"')
  return DataPropertyObjectFilter_possibleTypes.includes(obj.__typename)
}



const DataPropertyObjectFilterValue_possibleTypes: string[] = ['DataPropertyObjectFilterValue']
export const isDataPropertyObjectFilterValue = (obj?: { __typename?: any } | null): obj is DataPropertyObjectFilterValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyObjectFilterValue"')
  return DataPropertyObjectFilterValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyObjectValue_possibleTypes: string[] = ['DataPropertyObjectValue']
export const isDataPropertyObjectValue = (obj?: { __typename?: any } | null): obj is DataPropertyObjectValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyObjectValue"')
  return DataPropertyObjectValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyObjects_possibleTypes: string[] = ['DataPropertyObjects']
export const isDataPropertyObjects = (obj?: { __typename?: any } | null): obj is DataPropertyObjects => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyObjects"')
  return DataPropertyObjects_possibleTypes.includes(obj.__typename)
}



const DataPropertyObjectsValue_possibleTypes: string[] = ['DataPropertyObjectsValue']
export const isDataPropertyObjectsValue = (obj?: { __typename?: any } | null): obj is DataPropertyObjectsValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyObjectsValue"')
  return DataPropertyObjectsValue_possibleTypes.includes(obj.__typename)
}



const DataPropertySelection_possibleTypes: string[] = ['DataPropertySelection']
export const isDataPropertySelection = (obj?: { __typename?: any } | null): obj is DataPropertySelection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertySelection"')
  return DataPropertySelection_possibleTypes.includes(obj.__typename)
}



const DataPropertySelectionValue_possibleTypes: string[] = ['DataPropertySelectionValue']
export const isDataPropertySelectionValue = (obj?: { __typename?: any } | null): obj is DataPropertySelectionValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertySelectionValue"')
  return DataPropertySelectionValue_possibleTypes.includes(obj.__typename)
}



const DataPropertySequence_possibleTypes: string[] = ['DataPropertySequence']
export const isDataPropertySequence = (obj?: { __typename?: any } | null): obj is DataPropertySequence => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertySequence"')
  return DataPropertySequence_possibleTypes.includes(obj.__typename)
}



const DataPropertySequenceValue_possibleTypes: string[] = ['DataPropertySequenceValue']
export const isDataPropertySequenceValue = (obj?: { __typename?: any } | null): obj is DataPropertySequenceValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertySequenceValue"')
  return DataPropertySequenceValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyStatus_possibleTypes: string[] = ['DataPropertyStatus']
export const isDataPropertyStatus = (obj?: { __typename?: any } | null): obj is DataPropertyStatus => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyStatus"')
  return DataPropertyStatus_possibleTypes.includes(obj.__typename)
}



const DataPropertyStatusValue_possibleTypes: string[] = ['DataPropertyStatusValue']
export const isDataPropertyStatusValue = (obj?: { __typename?: any } | null): obj is DataPropertyStatusValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyStatusValue"')
  return DataPropertyStatusValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyString_possibleTypes: string[] = ['DataPropertyString']
export const isDataPropertyString = (obj?: { __typename?: any } | null): obj is DataPropertyString => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyString"')
  return DataPropertyString_possibleTypes.includes(obj.__typename)
}



const DataPropertyStringValue_possibleTypes: string[] = ['DataPropertyStringValue']
export const isDataPropertyStringValue = (obj?: { __typename?: any } | null): obj is DataPropertyStringValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyStringValue"')
  return DataPropertyStringValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyText_possibleTypes: string[] = ['DataPropertyText']
export const isDataPropertyText = (obj?: { __typename?: any } | null): obj is DataPropertyText => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyText"')
  return DataPropertyText_possibleTypes.includes(obj.__typename)
}



const DataPropertyTextValue_possibleTypes: string[] = ['DataPropertyTextValue']
export const isDataPropertyTextValue = (obj?: { __typename?: any } | null): obj is DataPropertyTextValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyTextValue"')
  return DataPropertyTextValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyTime_possibleTypes: string[] = ['DataPropertyTime']
export const isDataPropertyTime = (obj?: { __typename?: any } | null): obj is DataPropertyTime => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyTime"')
  return DataPropertyTime_possibleTypes.includes(obj.__typename)
}



const DataPropertyTimeValue_possibleTypes: string[] = ['DataPropertyTimeValue']
export const isDataPropertyTimeValue = (obj?: { __typename?: any } | null): obj is DataPropertyTimeValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyTimeValue"')
  return DataPropertyTimeValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyUser_possibleTypes: string[] = ['DataPropertyUser']
export const isDataPropertyUser = (obj?: { __typename?: any } | null): obj is DataPropertyUser => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyUser"')
  return DataPropertyUser_possibleTypes.includes(obj.__typename)
}



const DataPropertyUserCommon_possibleTypes: string[] = ['DataPropertyUserCommon']
export const isDataPropertyUserCommon = (obj?: { __typename?: any } | null): obj is DataPropertyUserCommon => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyUserCommon"')
  return DataPropertyUserCommon_possibleTypes.includes(obj.__typename)
}



const DataPropertyUserValue_possibleTypes: string[] = ['DataPropertyUserValue']
export const isDataPropertyUserValue = (obj?: { __typename?: any } | null): obj is DataPropertyUserValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyUserValue"')
  return DataPropertyUserValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyUsers_possibleTypes: string[] = ['DataPropertyUsers']
export const isDataPropertyUsers = (obj?: { __typename?: any } | null): obj is DataPropertyUsers => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyUsers"')
  return DataPropertyUsers_possibleTypes.includes(obj.__typename)
}



const DataPropertyUsersValue_possibleTypes: string[] = ['DataPropertyUsersValue']
export const isDataPropertyUsersValue = (obj?: { __typename?: any } | null): obj is DataPropertyUsersValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyUsersValue"')
  return DataPropertyUsersValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyValue_possibleTypes: string[] = ['DataPropertyAttributesValue','DataPropertyBooleanValue','DataPropertyDateTimeValue','DataPropertyDateValue','DataPropertyDecimalValue','DataPropertyFileValue','DataPropertyFilesValue','DataPropertyIntegerValue','DataPropertyMultiSelectionValue','DataPropertyObjectFilterValue','DataPropertyObjectValue','DataPropertyObjectsValue','DataPropertySelectionValue','DataPropertySequenceValue','DataPropertyStatusValue','DataPropertyStringValue','DataPropertyTextValue','DataPropertyTimeValue','DataPropertyUserValue','DataPropertyUsersValue','DataPropertyVersionValue']
export const isDataPropertyValue = (obj?: { __typename?: any } | null): obj is DataPropertyValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyValue"')
  return DataPropertyValue_possibleTypes.includes(obj.__typename)
}



const DataPropertyVersion_possibleTypes: string[] = ['DataPropertyVersion']
export const isDataPropertyVersion = (obj?: { __typename?: any } | null): obj is DataPropertyVersion => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyVersion"')
  return DataPropertyVersion_possibleTypes.includes(obj.__typename)
}



const DataPropertyVersionValue_possibleTypes: string[] = ['DataPropertyVersionValue']
export const isDataPropertyVersionValue = (obj?: { __typename?: any } | null): obj is DataPropertyVersionValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataPropertyVersionValue"')
  return DataPropertyVersionValue_possibleTypes.includes(obj.__typename)
}



const DataType_possibleTypes: string[] = ['DataType']
export const isDataType = (obj?: { __typename?: any } | null): obj is DataType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDataType"')
  return DataType_possibleTypes.includes(obj.__typename)
}



const DateDisplayFormat_possibleTypes: string[] = ['DateDisplayFormat']
export const isDateDisplayFormat = (obj?: { __typename?: any } | null): obj is DateDisplayFormat => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDateDisplayFormat"')
  return DateDisplayFormat_possibleTypes.includes(obj.__typename)
}



const DefaultResources_possibleTypes: string[] = ['DefaultResources']
export const isDefaultResources = (obj?: { __typename?: any } | null): obj is DefaultResources => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDefaultResources"')
  return DefaultResources_possibleTypes.includes(obj.__typename)
}



const DiscussionDirectMessagesRoom_possibleTypes: string[] = ['DiscussionDirectMessagesRoom']
export const isDiscussionDirectMessagesRoom = (obj?: { __typename?: any } | null): obj is DiscussionDirectMessagesRoom => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscussionDirectMessagesRoom"')
  return DiscussionDirectMessagesRoom_possibleTypes.includes(obj.__typename)
}



const DiscussionDirectMessagesRoomList_possibleTypes: string[] = ['DiscussionDirectMessagesRoomList']
export const isDiscussionDirectMessagesRoomList = (obj?: { __typename?: any } | null): obj is DiscussionDirectMessagesRoomList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscussionDirectMessagesRoomList"')
  return DiscussionDirectMessagesRoomList_possibleTypes.includes(obj.__typename)
}



const DiscussionMessage_possibleTypes: string[] = ['DiscussionMessage']
export const isDiscussionMessage = (obj?: { __typename?: any } | null): obj is DiscussionMessage => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscussionMessage"')
  return DiscussionMessage_possibleTypes.includes(obj.__typename)
}



const DiscussionMessageInfo_possibleTypes: string[] = ['DiscussionMessageInfo']
export const isDiscussionMessageInfo = (obj?: { __typename?: any } | null): obj is DiscussionMessageInfo => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscussionMessageInfo"')
  return DiscussionMessageInfo_possibleTypes.includes(obj.__typename)
}



const DiscussionMessageParent_possibleTypes: string[] = ['DiscussionDirectMessagesRoom','DiscussionRoom','DiscussionThread']
export const isDiscussionMessageParent = (obj?: { __typename?: any } | null): obj is DiscussionMessageParent => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscussionMessageParent"')
  return DiscussionMessageParent_possibleTypes.includes(obj.__typename)
}



const DiscussionMessageParentStatus_possibleTypes: string[] = ['DiscussionMessageParentStatus']
export const isDiscussionMessageParentStatus = (obj?: { __typename?: any } | null): obj is DiscussionMessageParentStatus => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscussionMessageParentStatus"')
  return DiscussionMessageParentStatus_possibleTypes.includes(obj.__typename)
}



const DiscussionRoom_possibleTypes: string[] = ['DiscussionRoom']
export const isDiscussionRoom = (obj?: { __typename?: any } | null): obj is DiscussionRoom => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscussionRoom"')
  return DiscussionRoom_possibleTypes.includes(obj.__typename)
}



const DiscussionRoomList_possibleTypes: string[] = ['DiscussionRoomList']
export const isDiscussionRoomList = (obj?: { __typename?: any } | null): obj is DiscussionRoomList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscussionRoomList"')
  return DiscussionRoomList_possibleTypes.includes(obj.__typename)
}



const DiscussionThread_possibleTypes: string[] = ['DiscussionThread']
export const isDiscussionThread = (obj?: { __typename?: any } | null): obj is DiscussionThread => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscussionThread"')
  return DiscussionThread_possibleTypes.includes(obj.__typename)
}



const DiscussionThreadList_possibleTypes: string[] = ['DiscussionThreadList']
export const isDiscussionThreadList = (obj?: { __typename?: any } | null): obj is DiscussionThreadList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscussionThreadList"')
  return DiscussionThreadList_possibleTypes.includes(obj.__typename)
}



const Document_possibleTypes: string[] = ['Document']
export const isDocument = (obj?: { __typename?: any } | null): obj is Document => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDocument"')
  return Document_possibleTypes.includes(obj.__typename)
}



const ExternalGroup_possibleTypes: string[] = ['ExternalGroup']
export const isExternalGroup = (obj?: { __typename?: any } | null): obj is ExternalGroup => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isExternalGroup"')
  return ExternalGroup_possibleTypes.includes(obj.__typename)
}



const ExternalGroupList_possibleTypes: string[] = ['ExternalGroupList']
export const isExternalGroupList = (obj?: { __typename?: any } | null): obj is ExternalGroupList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isExternalGroupList"')
  return ExternalGroupList_possibleTypes.includes(obj.__typename)
}



const ExternalGroupMapping_possibleTypes: string[] = ['ExternalGroupMapping']
export const isExternalGroupMapping = (obj?: { __typename?: any } | null): obj is ExternalGroupMapping => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isExternalGroupMapping"')
  return ExternalGroupMapping_possibleTypes.includes(obj.__typename)
}



const File_possibleTypes: string[] = ['File']
export const isFile = (obj?: { __typename?: any } | null): obj is File => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFile"')
  return File_possibleTypes.includes(obj.__typename)
}



const GenericValidationResult_possibleTypes: string[] = ['GenericValidationResult']
export const isGenericValidationResult = (obj?: { __typename?: any } | null): obj is GenericValidationResult => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isGenericValidationResult"')
  return GenericValidationResult_possibleTypes.includes(obj.__typename)
}



const GrantedPermissions_possibleTypes: string[] = ['GrantedPermissions']
export const isGrantedPermissions = (obj?: { __typename?: any } | null): obj is GrantedPermissions => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isGrantedPermissions"')
  return GrantedPermissions_possibleTypes.includes(obj.__typename)
}



const GrantedPrivileges_possibleTypes: string[] = ['GrantedPrivileges']
export const isGrantedPrivileges = (obj?: { __typename?: any } | null): obj is GrantedPrivileges => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isGrantedPrivileges"')
  return GrantedPrivileges_possibleTypes.includes(obj.__typename)
}



const Group_possibleTypes: string[] = ['Group']
export const isGroup = (obj?: { __typename?: any } | null): obj is Group => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isGroup"')
  return Group_possibleTypes.includes(obj.__typename)
}



const GroupList_possibleTypes: string[] = ['GroupList']
export const isGroupList = (obj?: { __typename?: any } | null): obj is GroupList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isGroupList"')
  return GroupList_possibleTypes.includes(obj.__typename)
}



const HtmlWidget_possibleTypes: string[] = ['HtmlWidget']
export const isHtmlWidget = (obj?: { __typename?: any } | null): obj is HtmlWidget => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isHtmlWidget"')
  return HtmlWidget_possibleTypes.includes(obj.__typename)
}



const HtmlWidgetGroup_possibleTypes: string[] = ['HtmlWidgetGroup']
export const isHtmlWidgetGroup = (obj?: { __typename?: any } | null): obj is HtmlWidgetGroup => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isHtmlWidgetGroup"')
  return HtmlWidgetGroup_possibleTypes.includes(obj.__typename)
}



const Lifecycle_possibleTypes: string[] = ['Lifecycle']
export const isLifecycle = (obj?: { __typename?: any } | null): obj is Lifecycle => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isLifecycle"')
  return Lifecycle_possibleTypes.includes(obj.__typename)
}



const LifecycleState_possibleTypes: string[] = ['LifecycleState']
export const isLifecycleState = (obj?: { __typename?: any } | null): obj is LifecycleState => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isLifecycleState"')
  return LifecycleState_possibleTypes.includes(obj.__typename)
}



const LifecycleTransition_possibleTypes: string[] = ['LifecycleTransition']
export const isLifecycleTransition = (obj?: { __typename?: any } | null): obj is LifecycleTransition => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isLifecycleTransition"')
  return LifecycleTransition_possibleTypes.includes(obj.__typename)
}



const LocaleOption_possibleTypes: string[] = ['LocaleOption']
export const isLocaleOption = (obj?: { __typename?: any } | null): obj is LocaleOption => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isLocaleOption"')
  return LocaleOption_possibleTypes.includes(obj.__typename)
}



const Member_possibleTypes: string[] = ['Member']
export const isMember = (obj?: { __typename?: any } | null): obj is Member => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMember"')
  return Member_possibleTypes.includes(obj.__typename)
}



const MemberType_possibleTypes: string[] = ['MemberType']
export const isMemberType = (obj?: { __typename?: any } | null): obj is MemberType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMemberType"')
  return MemberType_possibleTypes.includes(obj.__typename)
}



const MetadataObject_possibleTypes: string[] = ['ApiSpec','ApiSpecsGroup','Application','BpmnMessage','BpmnProcessType','Collection','DataPropertyAttributes','DataPropertyBoolean','DataPropertyDate','DataPropertyDateTime','DataPropertyDecimal','DataPropertyFile','DataPropertyFiles','DataPropertyInteger','DataPropertyMultiSelection','DataPropertyObject','DataPropertyObjectFilter','DataPropertyObjects','DataPropertySelection','DataPropertySequence','DataPropertyStatus','DataPropertyString','DataPropertyText','DataPropertyTime','DataPropertyUser','DataPropertyUserCommon','DataPropertyUsers','DataPropertyVersion','DataType','HtmlWidget','HtmlWidgetGroup','Lifecycle','Module','PostTemplate','ReferenceDataGroup','ReferenceDataType','Role','SystemFilter','TypeFilter','View','Workbench','Workspace']
export const isMetadataObject = (obj?: { __typename?: any } | null): obj is MetadataObject => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMetadataObject"')
  return MetadataObject_possibleTypes.includes(obj.__typename)
}



const Module_possibleTypes: string[] = ['Module']
export const isModule = (obj?: { __typename?: any } | null): obj is Module => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isModule"')
  return Module_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const OAuth2ServiceProvider_possibleTypes: string[] = ['OAuth2ServiceProvider']
export const isOAuth2ServiceProvider = (obj?: { __typename?: any } | null): obj is OAuth2ServiceProvider => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isOAuth2ServiceProvider"')
  return OAuth2ServiceProvider_possibleTypes.includes(obj.__typename)
}



const OAuth2ServiceToken_possibleTypes: string[] = ['OAuth2ServiceToken']
export const isOAuth2ServiceToken = (obj?: { __typename?: any } | null): obj is OAuth2ServiceToken => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isOAuth2ServiceToken"')
  return OAuth2ServiceToken_possibleTypes.includes(obj.__typename)
}



const PageInfo_possibleTypes: string[] = ['PageInfo']
export const isPageInfo = (obj?: { __typename?: any } | null): obj is PageInfo => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPageInfo"')
  return PageInfo_possibleTypes.includes(obj.__typename)
}



const Permission_possibleTypes: string[] = ['Permission']
export const isPermission = (obj?: { __typename?: any } | null): obj is Permission => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPermission"')
  return Permission_possibleTypes.includes(obj.__typename)
}



const PostTemplate_possibleTypes: string[] = ['PostTemplate']
export const isPostTemplate = (obj?: { __typename?: any } | null): obj is PostTemplate => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPostTemplate"')
  return PostTemplate_possibleTypes.includes(obj.__typename)
}



const Privilege_possibleTypes: string[] = ['Privilege']
export const isPrivilege = (obj?: { __typename?: any } | null): obj is Privilege => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPrivilege"')
  return Privilege_possibleTypes.includes(obj.__typename)
}



const PropertyGroup_possibleTypes: string[] = ['PropertyGroup']
export const isPropertyGroup = (obj?: { __typename?: any } | null): obj is PropertyGroup => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPropertyGroup"')
  return PropertyGroup_possibleTypes.includes(obj.__typename)
}



const PropertyType_possibleTypes: string[] = ['PropertyType']
export const isPropertyType = (obj?: { __typename?: any } | null): obj is PropertyType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPropertyType"')
  return PropertyType_possibleTypes.includes(obj.__typename)
}



const PublishedApplication_possibleTypes: string[] = ['PublishedApplication']
export const isPublishedApplication = (obj?: { __typename?: any } | null): obj is PublishedApplication => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPublishedApplication"')
  return PublishedApplication_possibleTypes.includes(obj.__typename)
}



const PublishedApplicationVersion_possibleTypes: string[] = ['PublishedApplicationVersion']
export const isPublishedApplicationVersion = (obj?: { __typename?: any } | null): obj is PublishedApplicationVersion => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPublishedApplicationVersion"')
  return PublishedApplicationVersion_possibleTypes.includes(obj.__typename)
}



const PublishedApplicationVersionList_possibleTypes: string[] = ['PublishedApplicationVersionList']
export const isPublishedApplicationVersionList = (obj?: { __typename?: any } | null): obj is PublishedApplicationVersionList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPublishedApplicationVersionList"')
  return PublishedApplicationVersionList_possibleTypes.includes(obj.__typename)
}



const PublishedDataType_possibleTypes: string[] = ['PublishedDataType']
export const isPublishedDataType = (obj?: { __typename?: any } | null): obj is PublishedDataType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPublishedDataType"')
  return PublishedDataType_possibleTypes.includes(obj.__typename)
}



const PublishedExportView_possibleTypes: string[] = ['PublishedExportView']
export const isPublishedExportView = (obj?: { __typename?: any } | null): obj is PublishedExportView => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPublishedExportView"')
  return PublishedExportView_possibleTypes.includes(obj.__typename)
}



const PublishedFilter_possibleTypes: string[] = ['PublishedFilter']
export const isPublishedFilter = (obj?: { __typename?: any } | null): obj is PublishedFilter => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPublishedFilter"')
  return PublishedFilter_possibleTypes.includes(obj.__typename)
}



const PublishedHtmlWidget_possibleTypes: string[] = ['PublishedHtmlWidget']
export const isPublishedHtmlWidget = (obj?: { __typename?: any } | null): obj is PublishedHtmlWidget => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPublishedHtmlWidget"')
  return PublishedHtmlWidget_possibleTypes.includes(obj.__typename)
}



const PublishedLifecycle_possibleTypes: string[] = ['PublishedLifecycle']
export const isPublishedLifecycle = (obj?: { __typename?: any } | null): obj is PublishedLifecycle => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPublishedLifecycle"')
  return PublishedLifecycle_possibleTypes.includes(obj.__typename)
}



const PublishedModule_possibleTypes: string[] = ['PublishedModule']
export const isPublishedModule = (obj?: { __typename?: any } | null): obj is PublishedModule => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPublishedModule"')
  return PublishedModule_possibleTypes.includes(obj.__typename)
}



const PublishedView_possibleTypes: string[] = ['PublishedView']
export const isPublishedView = (obj?: { __typename?: any } | null): obj is PublishedView => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPublishedView"')
  return PublishedView_possibleTypes.includes(obj.__typename)
}



const PublishedWorkbench_possibleTypes: string[] = ['PublishedWorkbench']
export const isPublishedWorkbench = (obj?: { __typename?: any } | null): obj is PublishedWorkbench => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPublishedWorkbench"')
  return PublishedWorkbench_possibleTypes.includes(obj.__typename)
}



const PublishedWorkspace_possibleTypes: string[] = ['PublishedWorkspace']
export const isPublishedWorkspace = (obj?: { __typename?: any } | null): obj is PublishedWorkspace => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPublishedWorkspace"')
  return PublishedWorkspace_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const RdmContentPayload_possibleTypes: string[] = ['RdmContentPayload']
export const isRdmContentPayload = (obj?: { __typename?: any } | null): obj is RdmContentPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRdmContentPayload"')
  return RdmContentPayload_possibleTypes.includes(obj.__typename)
}



const ReferenceDataGroup_possibleTypes: string[] = ['ReferenceDataGroup']
export const isReferenceDataGroup = (obj?: { __typename?: any } | null): obj is ReferenceDataGroup => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isReferenceDataGroup"')
  return ReferenceDataGroup_possibleTypes.includes(obj.__typename)
}



const ReferenceDataType_possibleTypes: string[] = ['ReferenceDataType']
export const isReferenceDataType = (obj?: { __typename?: any } | null): obj is ReferenceDataType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isReferenceDataType"')
  return ReferenceDataType_possibleTypes.includes(obj.__typename)
}



const ReferenceMetadataObject_possibleTypes: string[] = ['ReferenceDataGroup','ReferenceDataType']
export const isReferenceMetadataObject = (obj?: { __typename?: any } | null): obj is ReferenceMetadataObject => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isReferenceMetadataObject"')
  return ReferenceMetadataObject_possibleTypes.includes(obj.__typename)
}



const Role_possibleTypes: string[] = ['Role']
export const isRole = (obj?: { __typename?: any } | null): obj is Role => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRole"')
  return Role_possibleTypes.includes(obj.__typename)
}



const RoleList_possibleTypes: string[] = ['RoleList']
export const isRoleList = (obj?: { __typename?: any } | null): obj is RoleList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRoleList"')
  return RoleList_possibleTypes.includes(obj.__typename)
}



const Route_possibleTypes: string[] = ['Route']
export const isRoute = (obj?: { __typename?: any } | null): obj is Route => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRoute"')
  return Route_possibleTypes.includes(obj.__typename)
}



const SavedSearch_possibleTypes: string[] = ['SavedSearch']
export const isSavedSearch = (obj?: { __typename?: any } | null): obj is SavedSearch => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSavedSearch"')
  return SavedSearch_possibleTypes.includes(obj.__typename)
}



const Setting_possibleTypes: string[] = ['Setting']
export const isSetting = (obj?: { __typename?: any } | null): obj is Setting => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSetting"')
  return Setting_possibleTypes.includes(obj.__typename)
}



const StaticContentFile_possibleTypes: string[] = ['StaticContentFile']
export const isStaticContentFile = (obj?: { __typename?: any } | null): obj is StaticContentFile => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isStaticContentFile"')
  return StaticContentFile_possibleTypes.includes(obj.__typename)
}



const Subscription_possibleTypes: string[] = ['Subscription']
export const isSubscription = (obj?: { __typename?: any } | null): obj is Subscription => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSubscription"')
  return Subscription_possibleTypes.includes(obj.__typename)
}



const SubscriptionAction_possibleTypes: string[] = ['SubscriptionAction']
export const isSubscriptionAction = (obj?: { __typename?: any } | null): obj is SubscriptionAction => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSubscriptionAction"')
  return SubscriptionAction_possibleTypes.includes(obj.__typename)
}



const SubscriptionActionPayload_possibleTypes: string[] = ['SubscriptionActionPayload']
export const isSubscriptionActionPayload = (obj?: { __typename?: any } | null): obj is SubscriptionActionPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSubscriptionActionPayload"')
  return SubscriptionActionPayload_possibleTypes.includes(obj.__typename)
}



const SubscriptionCsvImportStatus_possibleTypes: string[] = ['SubscriptionCsvImportStatus']
export const isSubscriptionCsvImportStatus = (obj?: { __typename?: any } | null): obj is SubscriptionCsvImportStatus => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSubscriptionCsvImportStatus"')
  return SubscriptionCsvImportStatus_possibleTypes.includes(obj.__typename)
}



const SubscriptionMessage_possibleTypes: string[] = ['SubscriptionMessage']
export const isSubscriptionMessage = (obj?: { __typename?: any } | null): obj is SubscriptionMessage => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSubscriptionMessage"')
  return SubscriptionMessage_possibleTypes.includes(obj.__typename)
}



const SubscriptionRdmContentChanges_possibleTypes: string[] = ['SubscriptionRdmContentChanges']
export const isSubscriptionRdmContentChanges = (obj?: { __typename?: any } | null): obj is SubscriptionRdmContentChanges => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSubscriptionRdmContentChanges"')
  return SubscriptionRdmContentChanges_possibleTypes.includes(obj.__typename)
}



const SubscriptionUnspecifiedMessage_possibleTypes: string[] = ['SubscriptionUnspecifiedMessage']
export const isSubscriptionUnspecifiedMessage = (obj?: { __typename?: any } | null): obj is SubscriptionUnspecifiedMessage => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSubscriptionUnspecifiedMessage"')
  return SubscriptionUnspecifiedMessage_possibleTypes.includes(obj.__typename)
}



const SystemDefaults_possibleTypes: string[] = ['SystemDefaults']
export const isSystemDefaults = (obj?: { __typename?: any } | null): obj is SystemDefaults => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSystemDefaults"')
  return SystemDefaults_possibleTypes.includes(obj.__typename)
}



const SystemFilter_possibleTypes: string[] = ['SystemFilter']
export const isSystemFilter = (obj?: { __typename?: any } | null): obj is SystemFilter => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSystemFilter"')
  return SystemFilter_possibleTypes.includes(obj.__typename)
}



const SystemPage_possibleTypes: string[] = ['SystemPage']
export const isSystemPage = (obj?: { __typename?: any } | null): obj is SystemPage => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSystemPage"')
  return SystemPage_possibleTypes.includes(obj.__typename)
}



const TextFormatType_possibleTypes: string[] = ['TextFormatType']
export const isTextFormatType = (obj?: { __typename?: any } | null): obj is TextFormatType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTextFormatType"')
  return TextFormatType_possibleTypes.includes(obj.__typename)
}



const Theme_possibleTypes: string[] = ['Theme']
export const isTheme = (obj?: { __typename?: any } | null): obj is Theme => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTheme"')
  return Theme_possibleTypes.includes(obj.__typename)
}



const Translate_possibleTypes: string[] = ['Translate']
export const isTranslate = (obj?: { __typename?: any } | null): obj is Translate => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTranslate"')
  return Translate_possibleTypes.includes(obj.__typename)
}



const TranslateOption_possibleTypes: string[] = ['TranslateOption']
export const isTranslateOption = (obj?: { __typename?: any } | null): obj is TranslateOption => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTranslateOption"')
  return TranslateOption_possibleTypes.includes(obj.__typename)
}



const TypeFilter_possibleTypes: string[] = ['TypeFilter']
export const isTypeFilter = (obj?: { __typename?: any } | null): obj is TypeFilter => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTypeFilter"')
  return TypeFilter_possibleTypes.includes(obj.__typename)
}



const User_possibleTypes: string[] = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}



const UserList_possibleTypes: string[] = ['UserList']
export const isUserList = (obj?: { __typename?: any } | null): obj is UserList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUserList"')
  return UserList_possibleTypes.includes(obj.__typename)
}



const UserProfile_possibleTypes: string[] = ['UserProfile']
export const isUserProfile = (obj?: { __typename?: any } | null): obj is UserProfile => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUserProfile"')
  return UserProfile_possibleTypes.includes(obj.__typename)
}



const ValidationResults_possibleTypes: string[] = ['ValidationResults']
export const isValidationResults = (obj?: { __typename?: any } | null): obj is ValidationResults => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isValidationResults"')
  return ValidationResults_possibleTypes.includes(obj.__typename)
}



const Version_possibleTypes: string[] = ['Version']
export const isVersion = (obj?: { __typename?: any } | null): obj is Version => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isVersion"')
  return Version_possibleTypes.includes(obj.__typename)
}



const VersionDisplayFormat_possibleTypes: string[] = ['VersionDisplayFormat']
export const isVersionDisplayFormat = (obj?: { __typename?: any } | null): obj is VersionDisplayFormat => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isVersionDisplayFormat"')
  return VersionDisplayFormat_possibleTypes.includes(obj.__typename)
}



const VersionIncrement_possibleTypes: string[] = ['VersionIncrement']
export const isVersionIncrement = (obj?: { __typename?: any } | null): obj is VersionIncrement => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isVersionIncrement"')
  return VersionIncrement_possibleTypes.includes(obj.__typename)
}



const VersionInfo_possibleTypes: string[] = ['VersionInfo']
export const isVersionInfo = (obj?: { __typename?: any } | null): obj is VersionInfo => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isVersionInfo"')
  return VersionInfo_possibleTypes.includes(obj.__typename)
}



const VersionQualifier_possibleTypes: string[] = ['VersionQualifier']
export const isVersionQualifier = (obj?: { __typename?: any } | null): obj is VersionQualifier => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isVersionQualifier"')
  return VersionQualifier_possibleTypes.includes(obj.__typename)
}



const View_possibleTypes: string[] = ['View']
export const isView = (obj?: { __typename?: any } | null): obj is View => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isView"')
  return View_possibleTypes.includes(obj.__typename)
}



const ViewType_possibleTypes: string[] = ['ViewType']
export const isViewType = (obj?: { __typename?: any } | null): obj is ViewType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isViewType"')
  return ViewType_possibleTypes.includes(obj.__typename)
}



const Workbench_possibleTypes: string[] = ['Workbench']
export const isWorkbench = (obj?: { __typename?: any } | null): obj is Workbench => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isWorkbench"')
  return Workbench_possibleTypes.includes(obj.__typename)
}



const Workspace_possibleTypes: string[] = ['Workspace']
export const isWorkspace = (obj?: { __typename?: any } | null): obj is Workspace => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isWorkspace"')
  return Workspace_possibleTypes.includes(obj.__typename)
}



const XmlAndModelDecoration_possibleTypes: string[] = ['XmlAndModelDecoration']
export const isXmlAndModelDecoration = (obj?: { __typename?: any } | null): obj is XmlAndModelDecoration => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isXmlAndModelDecoration"')
  return XmlAndModelDecoration_possibleTypes.includes(obj.__typename)
}


export interface ApiSpecPromiseChain{
    authMethod: ({get: (request?: boolean|number, defaultValue?: AuthMethod) => Promise<AuthMethod>}),
    basicAuthLogin: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    basicAuthPassword: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    clientCredFlowClientId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    clientCredFlowClientSecret: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    clientCredFlowTokenUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    moduleDtoJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    openApiJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    serviceUrl: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    version: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface ApiSpecObservableChain{
    authMethod: ({get: (request?: boolean|number, defaultValue?: AuthMethod) => Observable<AuthMethod>}),
    basicAuthLogin: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    basicAuthPassword: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    clientCredFlowClientId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    clientCredFlowClientSecret: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    clientCredFlowTokenUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    moduleDtoJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    openApiJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    serviceUrl: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    version: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface ApiSpecsGroupPromiseChain{
    apiSpecs: ({get: <R extends ApiSpecRequest>(request: R, defaultValue?: FieldsSelection<ApiSpec, R>[]) => Promise<FieldsSelection<ApiSpec, R>[]>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>})
}

export interface ApiSpecsGroupObservableChain{
    apiSpecs: ({get: <R extends ApiSpecRequest>(request: R, defaultValue?: FieldsSelection<ApiSpec, R>[]) => Observable<FieldsSelection<ApiSpec, R>[]>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>})
}

export interface ApplicationPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    htmlWidgetGroups: ((args?: {type?: (HtmlWidgetGroupTypeEnum | null)}) => {get: <R extends HtmlWidgetGroupRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidgetGroup, R>[]) => Promise<FieldsSelection<HtmlWidgetGroup, R>[]>})&({get: <R extends HtmlWidgetGroupRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidgetGroup, R>[]) => Promise<FieldsSelection<HtmlWidgetGroup, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    modules: ({get: <R extends ModuleRequest>(request: R, defaultValue?: FieldsSelection<Module, R>[]) => Promise<FieldsSelection<Module, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    notificationJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Promise<FieldsSelection<Role, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    toolbarJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    workbenches: ({get: <R extends WorkbenchRequest>(request: R, defaultValue?: FieldsSelection<Workbench, R>[]) => Promise<FieldsSelection<Workbench, R>[]>})
}

export interface ApplicationObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    htmlWidgetGroups: ((args?: {type?: (HtmlWidgetGroupTypeEnum | null)}) => {get: <R extends HtmlWidgetGroupRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidgetGroup, R>[]) => Observable<FieldsSelection<HtmlWidgetGroup, R>[]>})&({get: <R extends HtmlWidgetGroupRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidgetGroup, R>[]) => Observable<FieldsSelection<HtmlWidgetGroup, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    modules: ({get: <R extends ModuleRequest>(request: R, defaultValue?: FieldsSelection<Module, R>[]) => Observable<FieldsSelection<Module, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    notificationJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Observable<FieldsSelection<Role, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    toolbarJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    workbenches: ({get: <R extends WorkbenchRequest>(request: R, defaultValue?: FieldsSelection<Workbench, R>[]) => Observable<FieldsSelection<Workbench, R>[]>})
}

export interface AssetUploadPromiseChain{
    batchFileIndex: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    batchId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    chunks: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    fileName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    hash: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    loadedChunks: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    loadedSize: ({get: (request?: boolean|number, defaultValue?: Scalars['Long']) => Promise<Scalars['Long']>}),
    mimeType: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    previewUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    size: ({get: (request?: boolean|number, defaultValue?: Scalars['Long']) => Promise<Scalars['Long']>}),
    status: (AssetUploadStatusPromiseChain & {get: <R extends AssetUploadStatusRequest>(request: R, defaultValue?: FieldsSelection<AssetUploadStatus, R>) => Promise<FieldsSelection<AssetUploadStatus, R>>}),
    targetDocumentId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    targetDocumentRoute: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    targetFolderId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface AssetUploadObservableChain{
    batchFileIndex: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    batchId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    chunks: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    fileName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    hash: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    loadedChunks: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    loadedSize: ({get: (request?: boolean|number, defaultValue?: Scalars['Long']) => Observable<Scalars['Long']>}),
    mimeType: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    previewUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    size: ({get: (request?: boolean|number, defaultValue?: Scalars['Long']) => Observable<Scalars['Long']>}),
    status: (AssetUploadStatusObservableChain & {get: <R extends AssetUploadStatusRequest>(request: R, defaultValue?: FieldsSelection<AssetUploadStatus, R>) => Observable<FieldsSelection<AssetUploadStatus, R>>}),
    targetDocumentId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    targetDocumentRoute: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    targetFolderId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface AssetUploadListPromiseChain{
    items: ({get: <R extends AssetUploadRequest>(request: R, defaultValue?: FieldsSelection<AssetUpload, R>[]) => Promise<FieldsSelection<AssetUpload, R>[]>}),
    pageInfo: (PageInfoPromiseChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Promise<FieldsSelection<PageInfo, R>>})
}

export interface AssetUploadListObservableChain{
    items: ({get: <R extends AssetUploadRequest>(request: R, defaultValue?: FieldsSelection<AssetUpload, R>[]) => Observable<FieldsSelection<AssetUpload, R>[]>}),
    pageInfo: (PageInfoObservableChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Observable<FieldsSelection<PageInfo, R>>})
}

export interface AssetUploadStatusPromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: AssetUploadStatusEnum) => Promise<AssetUploadStatusEnum>})
}

export interface AssetUploadStatusObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: AssetUploadStatusEnum) => Observable<AssetUploadStatusEnum>})
}

export interface AttributePromiseChain{
    attribute: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    attributeType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    label: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    referenceDataTypeId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface AttributeObservableChain{
    attribute: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    attributeType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    label: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    referenceDataTypeId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface AttributeValuePromiseChain{
    attribute: (AttributePromiseChain & {get: <R extends AttributeRequest>(request: R, defaultValue?: FieldsSelection<Attribute, R>) => Promise<FieldsSelection<Attribute, R>>}),
    value: ({get: <R extends DataPropertyAttributesValueUnionRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyAttributesValueUnion, R> | undefined)) => Promise<(FieldsSelection<DataPropertyAttributesValueUnion, R> | undefined)>})
}

export interface AttributeValueObservableChain{
    attribute: (AttributeObservableChain & {get: <R extends AttributeRequest>(request: R, defaultValue?: FieldsSelection<Attribute, R>) => Observable<FieldsSelection<Attribute, R>>}),
    value: ({get: <R extends DataPropertyAttributesValueUnionRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyAttributesValueUnion, R> | undefined)) => Observable<(FieldsSelection<DataPropertyAttributesValueUnion, R> | undefined)>})
}

export interface AuditCategoryPromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: AuditCategoryEnum) => Promise<AuditCategoryEnum>})
}

export interface AuditCategoryObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: AuditCategoryEnum) => Observable<AuditCategoryEnum>})
}

export interface AuditEventPromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: AuditEventEnum) => Promise<AuditEventEnum>})
}

export interface AuditEventObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: AuditEventEnum) => Observable<AuditEventEnum>})
}

export interface AuditLogEntriesListPromiseChain{
    items: ({get: <R extends AuditLogEntryRequest>(request: R, defaultValue?: FieldsSelection<AuditLogEntry, R>[]) => Promise<FieldsSelection<AuditLogEntry, R>[]>}),
    pageInfo: (PageInfoPromiseChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Promise<FieldsSelection<PageInfo, R>>})
}

export interface AuditLogEntriesListObservableChain{
    items: ({get: <R extends AuditLogEntryRequest>(request: R, defaultValue?: FieldsSelection<AuditLogEntry, R>[]) => Observable<FieldsSelection<AuditLogEntry, R>[]>}),
    pageInfo: (PageInfoObservableChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Observable<FieldsSelection<PageInfo, R>>})
}

export interface AuditLogEntryPromiseChain{
    category: (AuditCategoryPromiseChain & {get: <R extends AuditCategoryRequest>(request: R, defaultValue?: FieldsSelection<AuditCategory, R>) => Promise<FieldsSelection<AuditCategory, R>>}),
    event: (AuditEventPromiseChain & {get: <R extends AuditEventRequest>(request: R, defaultValue?: FieldsSelection<AuditEvent, R>) => Promise<FieldsSelection<AuditEvent, R>>}),
    eventDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    info: ({get: (request?: boolean|number, defaultValue?: (Scalars['ObjectScalar'] | undefined)) => Promise<(Scalars['ObjectScalar'] | undefined)>}),
    user: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>})
}

export interface AuditLogEntryObservableChain{
    category: (AuditCategoryObservableChain & {get: <R extends AuditCategoryRequest>(request: R, defaultValue?: FieldsSelection<AuditCategory, R>) => Observable<FieldsSelection<AuditCategory, R>>}),
    event: (AuditEventObservableChain & {get: <R extends AuditEventRequest>(request: R, defaultValue?: FieldsSelection<AuditEvent, R>) => Observable<FieldsSelection<AuditEvent, R>>}),
    eventDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    info: ({get: (request?: boolean|number, defaultValue?: (Scalars['ObjectScalar'] | undefined)) => Observable<(Scalars['ObjectScalar'] | undefined)>}),
    user: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>})
}

export interface BooleanDisplayFormatPromiseChain{
    displayFormatEnum: ({get: (request?: boolean|number, defaultValue?: BooleanDisplayFormatEnum) => Promise<BooleanDisplayFormatEnum>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface BooleanDisplayFormatObservableChain{
    displayFormatEnum: ({get: (request?: boolean|number, defaultValue?: BooleanDisplayFormatEnum) => Observable<BooleanDisplayFormatEnum>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface BpmnMessagePromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    dataJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>})
}

export interface BpmnMessageObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    dataJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>})
}

export interface BpmnMessageGroupPromiseChain{
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    properties: ({get: <R extends BpmnMessageRequest>(request: R, defaultValue?: (FieldsSelection<BpmnMessage, R> | undefined)[]) => Promise<(FieldsSelection<BpmnMessage, R> | undefined)[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: (MetadataObjectStatusEnum | undefined)) => Promise<(MetadataObjectStatusEnum | undefined)>})
}

export interface BpmnMessageGroupObservableChain{
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    properties: ({get: <R extends BpmnMessageRequest>(request: R, defaultValue?: (FieldsSelection<BpmnMessage, R> | undefined)[]) => Observable<(FieldsSelection<BpmnMessage, R> | undefined)[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: (MetadataObjectStatusEnum | undefined)) => Observable<(MetadataObjectStatusEnum | undefined)>})
}

export interface BpmnProcessTypePromiseChain{
    bpmnXml: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    decorJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    lifecycleJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    processDefinitionId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    processDefinitionKey: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    processDefinitionVersionTag: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>})
}

export interface BpmnProcessTypeObservableChain{
    bpmnXml: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    decorJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    lifecycleJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    processDefinitionId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    processDefinitionKey: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    processDefinitionVersionTag: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>})
}

export interface CollectionPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isHidden: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    uid: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface CollectionObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isHidden: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    uid: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface CsvImportStatusPromiseChain{
    filename: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    importId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    moduleName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    objectsCreatedCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    objectsUpdatedCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    rowsFailedCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    rowsProcessedCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    rowsSkippedCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    startDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    state: ({get: (request?: boolean|number, defaultValue?: WorkStateEnum) => Promise<WorkStateEnum>}),
    targetObjectId: ({get: (request?: boolean|number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface CsvImportStatusObservableChain{
    filename: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    importId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    moduleName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    objectsCreatedCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    objectsUpdatedCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    rowsFailedCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    rowsProcessedCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    rowsSkippedCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    startDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    state: ({get: (request?: boolean|number, defaultValue?: WorkStateEnum) => Observable<WorkStateEnum>}),
    targetObjectId: ({get: (request?: boolean|number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface DataObjectPromiseChain{
    allowedActions: ({get: (request?: boolean|number, defaultValue?: AllowedActionsEnum[]) => Promise<AllowedActionsEnum[]>}),
    discussion: (DiscussionRoomPromiseChain & {get: <R extends DiscussionRoomRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionRoom, R> | undefined)) => Promise<(FieldsSelection<DiscussionRoom, R> | undefined)>}),
    genericStatus: ({get: (request?: boolean|number, defaultValue?: DataObjectGenericStatus) => Promise<DataObjectGenericStatus>}),
    hasAllRequiredProperties: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    hasChildren: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    isTemplate: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isVersion: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    parents: ({get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Promise<FieldsSelection<DataObject, R>[]>}),
    properties: ((args?: {keys?: (Scalars['String'][] | null)}) => {get: <R extends DataObjectPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataObjectProperty, R>[]) => Promise<FieldsSelection<DataObjectProperty, R>[]>})&({get: <R extends DataObjectPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataObjectProperty, R>[]) => Promise<FieldsSelection<DataObjectProperty, R>[]>}),
    publishInfo: ((args: {serviceId: Scalars['String']}) => DataObjectPublishInfoPromiseChain & {get: <R extends DataObjectPublishInfoRequest>(request: R, defaultValue?: (FieldsSelection<DataObjectPublishInfo, R> | undefined)) => Promise<(FieldsSelection<DataObjectPublishInfo, R> | undefined)>}),
    rdmObject: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    stateCustomJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    subscriptionType: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    type: (PublishedDataTypePromiseChain & {get: <R extends PublishedDataTypeRequest>(request: R, defaultValue?: FieldsSelection<PublishedDataType, R>) => Promise<FieldsSelection<PublishedDataType, R>>})
}

export interface DataObjectObservableChain{
    allowedActions: ({get: (request?: boolean|number, defaultValue?: AllowedActionsEnum[]) => Observable<AllowedActionsEnum[]>}),
    discussion: (DiscussionRoomObservableChain & {get: <R extends DiscussionRoomRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionRoom, R> | undefined)) => Observable<(FieldsSelection<DiscussionRoom, R> | undefined)>}),
    genericStatus: ({get: (request?: boolean|number, defaultValue?: DataObjectGenericStatus) => Observable<DataObjectGenericStatus>}),
    hasAllRequiredProperties: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    hasChildren: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    isTemplate: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isVersion: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    parents: ({get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Observable<FieldsSelection<DataObject, R>[]>}),
    properties: ((args?: {keys?: (Scalars['String'][] | null)}) => {get: <R extends DataObjectPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataObjectProperty, R>[]) => Observable<FieldsSelection<DataObjectProperty, R>[]>})&({get: <R extends DataObjectPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataObjectProperty, R>[]) => Observable<FieldsSelection<DataObjectProperty, R>[]>}),
    publishInfo: ((args: {serviceId: Scalars['String']}) => DataObjectPublishInfoObservableChain & {get: <R extends DataObjectPublishInfoRequest>(request: R, defaultValue?: (FieldsSelection<DataObjectPublishInfo, R> | undefined)) => Observable<(FieldsSelection<DataObjectPublishInfo, R> | undefined)>}),
    rdmObject: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    stateCustomJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    subscriptionType: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    type: (PublishedDataTypeObservableChain & {get: <R extends PublishedDataTypeRequest>(request: R, defaultValue?: FieldsSelection<PublishedDataType, R>) => Observable<FieldsSelection<PublishedDataType, R>>})
}

export interface DataObjectChangesPromiseChain{
    changes: ({get: <R extends DataObjectPropertyRequest>(request: R, defaultValue?: ((FieldsSelection<DataObjectProperty, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<DataObjectProperty, R> | undefined)[] | undefined)>}),
    dataObjectValid: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataObjectChangesObservableChain{
    changes: ({get: <R extends DataObjectPropertyRequest>(request: R, defaultValue?: ((FieldsSelection<DataObjectProperty, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<DataObjectProperty, R> | undefined)[] | undefined)>}),
    dataObjectValid: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataObjectHierarchyPromiseChain{
    allowCreation: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface DataObjectHierarchyObservableChain{
    allowCreation: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface DataObjectListPromiseChain{
    items: ({get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Promise<FieldsSelection<DataObject, R>[]>}),
    pageInfo: (PageInfoPromiseChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Promise<FieldsSelection<PageInfo, R>>})
}

export interface DataObjectListObservableChain{
    items: ({get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Observable<FieldsSelection<DataObject, R>[]>}),
    pageInfo: (PageInfoObservableChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Observable<FieldsSelection<PageInfo, R>>})
}

export interface DataObjectPropertyPromiseChain{
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    value: ({get: <R extends DataPropertyValueRequest>(request: R, defaultValue?: FieldsSelection<DataPropertyValue, R>) => Promise<FieldsSelection<DataPropertyValue, R>>})
}

export interface DataObjectPropertyObservableChain{
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    value: ({get: <R extends DataPropertyValueRequest>(request: R, defaultValue?: FieldsSelection<DataPropertyValue, R>) => Observable<FieldsSelection<DataPropertyValue, R>>})
}

export interface DataObjectPublishInfoPromiseChain{
    link: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface DataObjectPublishInfoObservableChain{
    link: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface DataPropertyPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyAttributesPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    dateDataPropertyKey: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentSelection: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    properties: ({get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>[]) => Promise<FieldsSelection<DataProperty, R>[]>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    referenceDataTypeId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyAttributesObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    dateDataPropertyKey: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentSelection: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    properties: ({get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>[]) => Observable<FieldsSelection<DataProperty, R>[]>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    referenceDataTypeId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyAttributesValuePromiseChain{
    attributesValue: ({get: <R extends AttributeValueRequest>(request: R, defaultValue?: FieldsSelection<AttributeValue, R>[]) => Promise<FieldsSelection<AttributeValue, R>[]>}),
    selectedDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface DataPropertyAttributesValueObservableChain{
    attributesValue: ({get: <R extends AttributeValueRequest>(request: R, defaultValue?: FieldsSelection<AttributeValue, R>[]) => Observable<FieldsSelection<AttributeValue, R>[]>}),
    selectedDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface DataPropertyBooleanPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyBooleanValuePromiseChain & {get: <R extends DataPropertyBooleanValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyBooleanValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyBooleanValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayFalseAs: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    displayFalseColor: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    displayFormat: (BooleanDisplayFormatPromiseChain & {get: <R extends BooleanDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<BooleanDisplayFormat, R>) => Promise<FieldsSelection<BooleanDisplayFormat, R>>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    displayTrueAs: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    displayTrueColor: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyBooleanObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyBooleanValueObservableChain & {get: <R extends DataPropertyBooleanValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyBooleanValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyBooleanValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayFalseAs: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    displayFalseColor: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    displayFormat: (BooleanDisplayFormatObservableChain & {get: <R extends BooleanDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<BooleanDisplayFormat, R>) => Observable<FieldsSelection<BooleanDisplayFormat, R>>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    displayTrueAs: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    displayTrueColor: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyBooleanValuePromiseChain{
    booleanValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>})
}

export interface DataPropertyBooleanValueObservableChain{
    booleanValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>})
}

export interface DataPropertyDatePromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyDateValuePromiseChain & {get: <R extends DataPropertyDateValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDateValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyDateValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayFormat: (DateDisplayFormatPromiseChain & {get: <R extends DateDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<DateDisplayFormat, R>) => Promise<FieldsSelection<DateDisplayFormat, R>>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    maxValue: (DataPropertyDateValuePromiseChain & {get: <R extends DataPropertyDateValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDateValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyDateValue, R> | undefined)>}),
    minValue: (DataPropertyDateValuePromiseChain & {get: <R extends DataPropertyDateValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDateValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyDateValue, R> | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyDateObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyDateValueObservableChain & {get: <R extends DataPropertyDateValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDateValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyDateValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayFormat: (DateDisplayFormatObservableChain & {get: <R extends DateDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<DateDisplayFormat, R>) => Observable<FieldsSelection<DateDisplayFormat, R>>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    maxValue: (DataPropertyDateValueObservableChain & {get: <R extends DataPropertyDateValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDateValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyDateValue, R> | undefined)>}),
    minValue: (DataPropertyDateValueObservableChain & {get: <R extends DataPropertyDateValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDateValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyDateValue, R> | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyDateTimePromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyDateTimeValuePromiseChain & {get: <R extends DataPropertyDateTimeValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDateTimeValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyDateTimeValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayFormat: (DateDisplayFormatPromiseChain & {get: <R extends DateDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<DateDisplayFormat, R>) => Promise<FieldsSelection<DateDisplayFormat, R>>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    maxValue: (DataPropertyDateTimeValuePromiseChain & {get: <R extends DataPropertyDateTimeValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDateTimeValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyDateTimeValue, R> | undefined)>}),
    minValue: (DataPropertyDateTimeValuePromiseChain & {get: <R extends DataPropertyDateTimeValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDateTimeValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyDateTimeValue, R> | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    useTimeZone: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyDateTimeObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyDateTimeValueObservableChain & {get: <R extends DataPropertyDateTimeValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDateTimeValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyDateTimeValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayFormat: (DateDisplayFormatObservableChain & {get: <R extends DateDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<DateDisplayFormat, R>) => Observable<FieldsSelection<DateDisplayFormat, R>>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    maxValue: (DataPropertyDateTimeValueObservableChain & {get: <R extends DataPropertyDateTimeValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDateTimeValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyDateTimeValue, R> | undefined)>}),
    minValue: (DataPropertyDateTimeValueObservableChain & {get: <R extends DataPropertyDateTimeValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDateTimeValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyDateTimeValue, R> | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    useTimeZone: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyDateTimeValuePromiseChain{
    dateTimeValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['Date'] | undefined)) => Promise<(Scalars['Date'] | undefined)>})
}

export interface DataPropertyDateTimeValueObservableChain{
    dateTimeValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['Date'] | undefined)) => Observable<(Scalars['Date'] | undefined)>})
}

export interface DataPropertyDateValuePromiseChain{
    dateValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['LocalDate'] | undefined)) => Promise<(Scalars['LocalDate'] | undefined)>})
}

export interface DataPropertyDateValueObservableChain{
    dateValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['LocalDate'] | undefined)) => Observable<(Scalars['LocalDate'] | undefined)>})
}

export interface DataPropertyDecimalPromiseChain{
    JSON_SCHEMA: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Promise<(Scalars['Map_String_StringScalar'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyDecimalValuePromiseChain & {get: <R extends DataPropertyDecimalValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDecimalValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyDecimalValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    formula: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    maxValue: (DataPropertyDecimalValuePromiseChain & {get: <R extends DataPropertyDecimalValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDecimalValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyDecimalValue, R> | undefined)>}),
    minValue: (DataPropertyDecimalValuePromiseChain & {get: <R extends DataPropertyDecimalValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDecimalValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyDecimalValue, R> | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    precision: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    prefix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    suffix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyDecimalObservableChain{
    JSON_SCHEMA: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Observable<(Scalars['Map_String_StringScalar'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyDecimalValueObservableChain & {get: <R extends DataPropertyDecimalValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDecimalValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyDecimalValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    formula: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    maxValue: (DataPropertyDecimalValueObservableChain & {get: <R extends DataPropertyDecimalValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDecimalValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyDecimalValue, R> | undefined)>}),
    minValue: (DataPropertyDecimalValueObservableChain & {get: <R extends DataPropertyDecimalValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyDecimalValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyDecimalValue, R> | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    precision: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    prefix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    suffix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyDecimalValuePromiseChain{
    decimalValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['BigDecimal'] | undefined)) => Promise<(Scalars['BigDecimal'] | undefined)>})
}

export interface DataPropertyDecimalValueObservableChain{
    decimalValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['BigDecimal'] | undefined)) => Observable<(Scalars['BigDecimal'] | undefined)>})
}

export interface DataPropertyFilePromiseChain{
    JSON_SCHEMA: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Promise<(Scalars['Map_String_StringScalar'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    downloadable: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyFileObservableChain{
    JSON_SCHEMA: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Observable<(Scalars['Map_String_StringScalar'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    downloadable: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyFileValuePromiseChain{
    fileValue: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: (FieldsSelection<File, R> | undefined)) => Promise<(FieldsSelection<File, R> | undefined)>})
}

export interface DataPropertyFileValueObservableChain{
    fileValue: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: (FieldsSelection<File, R> | undefined)) => Observable<(FieldsSelection<File, R> | undefined)>})
}

export interface DataPropertyFilesPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    downloadable: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyFilesObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    downloadable: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyFilesValuePromiseChain{
    filesValue: ({get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>[]) => Promise<FieldsSelection<File, R>[]>})
}

export interface DataPropertyFilesValueObservableChain{
    filesValue: ({get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>[]) => Observable<FieldsSelection<File, R>[]>})
}

export interface DataPropertyIntegerPromiseChain{
    JSON_INTEGER_SCHEMA: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Promise<(Scalars['Map_String_StringScalar'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyIntegerValuePromiseChain & {get: <R extends DataPropertyIntegerValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyIntegerValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyIntegerValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    maxValue: (DataPropertyIntegerValuePromiseChain & {get: <R extends DataPropertyIntegerValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyIntegerValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyIntegerValue, R> | undefined)>}),
    minValue: (DataPropertyIntegerValuePromiseChain & {get: <R extends DataPropertyIntegerValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyIntegerValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyIntegerValue, R> | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    prefix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    suffix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    unique: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyIntegerObservableChain{
    JSON_INTEGER_SCHEMA: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Observable<(Scalars['Map_String_StringScalar'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyIntegerValueObservableChain & {get: <R extends DataPropertyIntegerValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyIntegerValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyIntegerValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    maxValue: (DataPropertyIntegerValueObservableChain & {get: <R extends DataPropertyIntegerValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyIntegerValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyIntegerValue, R> | undefined)>}),
    minValue: (DataPropertyIntegerValueObservableChain & {get: <R extends DataPropertyIntegerValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyIntegerValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyIntegerValue, R> | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    prefix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    suffix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    unique: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyIntegerValuePromiseChain{
    integerValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface DataPropertyIntegerValueObservableChain{
    integerValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}

export interface DataPropertyMultiSelectionPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    dateDataPropertyKey: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentSelection: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    referenceDataTypeId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyMultiSelectionObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    dateDataPropertyKey: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentSelection: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    referenceDataTypeId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyMultiSelectionValuePromiseChain{
    multiSelectionValue: ({get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Promise<FieldsSelection<DataObject, R>[]>}),
    selectedDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface DataPropertyMultiSelectionValueObservableChain{
    multiSelectionValue: ({get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Observable<FieldsSelection<DataObject, R>[]>}),
    selectedDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface DataPropertyObjectPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    relationModuleId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    relationObjectProperty: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    relationTypes: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    viewJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface DataPropertyObjectObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    relationModuleId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    relationObjectProperty: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    relationTypes: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    viewJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface DataPropertyObjectFilterPromiseChain{
    bindingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    filterId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    relationModuleId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    relationObjectProperty: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    relationTypes: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    viewJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface DataPropertyObjectFilterObservableChain{
    bindingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    filterId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    relationModuleId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    relationObjectProperty: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    relationTypes: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    viewJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface DataPropertyObjectFilterValuePromiseChain{
    objectFilterValue: ({get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Promise<FieldsSelection<DataObject, R>[]>}),
    rawValue: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>})
}

export interface DataPropertyObjectFilterValueObservableChain{
    objectFilterValue: ({get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Observable<FieldsSelection<DataObject, R>[]>}),
    rawValue: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>})
}

export interface DataPropertyObjectValuePromiseChain{
    objectValue: (DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R> | undefined)) => Promise<(FieldsSelection<DataObject, R> | undefined)>})
}

export interface DataPropertyObjectValueObservableChain{
    objectValue: (DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R> | undefined)) => Observable<(FieldsSelection<DataObject, R> | undefined)>})
}

export interface DataPropertyObjectsPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    relationModuleId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    relationObjectProperty: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    relationTypes: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    viewJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface DataPropertyObjectsObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    relationModuleId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    relationObjectProperty: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    relationTypes: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    viewJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface DataPropertyObjectsValuePromiseChain{
    objectsValue: ({get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Promise<FieldsSelection<DataObject, R>[]>})
}

export interface DataPropertyObjectsValueObservableChain{
    objectsValue: ({get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Observable<FieldsSelection<DataObject, R>[]>})
}

export interface DataPropertySelectionPromiseChain{
    JSON_SCHEMA: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Promise<(Scalars['Map_String_StringScalar'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    dateDataPropertyKey: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    formula: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentSelection: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    referenceDataTypeId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertySelectionObservableChain{
    JSON_SCHEMA: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Observable<(Scalars['Map_String_StringScalar'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    dateDataPropertyKey: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    formula: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentSelection: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    referenceDataTypeId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertySelectionValuePromiseChain{
    selectedDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    selectionValue: (DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R> | undefined)) => Promise<(FieldsSelection<DataObject, R> | undefined)>})
}

export interface DataPropertySelectionValueObservableChain{
    selectedDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    selectionValue: (DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R> | undefined)) => Observable<(FieldsSelection<DataObject, R> | undefined)>})
}

export interface DataPropertySequencePromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    initialValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    prefix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    restartInterval: ({get: (request?: boolean|number, defaultValue?: (SequenceRestartInterval | undefined)) => Promise<(SequenceRestartInterval | undefined)>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    suffix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertySequenceObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    initialValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    prefix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    restartInterval: ({get: (request?: boolean|number, defaultValue?: (SequenceRestartInterval | undefined)) => Observable<(SequenceRestartInterval | undefined)>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    suffix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertySequenceValuePromiseChain{
    sequenceValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface DataPropertySequenceValueObservableChain{
    sequenceValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}

export interface DataPropertyStatusPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyStatusObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyStatusValuePromiseChain{
    statusValue: (LifecycleStatePromiseChain & {get: <R extends LifecycleStateRequest>(request: R, defaultValue?: (FieldsSelection<LifecycleState, R> | undefined)) => Promise<(FieldsSelection<LifecycleState, R> | undefined)>})
}

export interface DataPropertyStatusValueObservableChain{
    statusValue: (LifecycleStateObservableChain & {get: <R extends LifecycleStateRequest>(request: R, defaultValue?: (FieldsSelection<LifecycleState, R> | undefined)) => Observable<(FieldsSelection<LifecycleState, R> | undefined)>})
}

export interface DataPropertyStringPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyStringValuePromiseChain & {get: <R extends DataPropertyStringValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyStringValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyStringValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    formula: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    icon: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    maxLength: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    minLength: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    pattern: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    prefix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    suffix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    unique: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyStringObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyStringValueObservableChain & {get: <R extends DataPropertyStringValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyStringValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyStringValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    formula: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    icon: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    maxLength: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    minLength: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    pattern: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    prefix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    suffix: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    unique: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyStringValuePromiseChain{
    stringValue: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface DataPropertyStringValueObservableChain{
    stringValue: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface DataPropertyTextPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyTextValuePromiseChain & {get: <R extends DataPropertyTextValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyTextValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyTextValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    formatType: (TextFormatTypePromiseChain & {get: <R extends TextFormatTypeRequest>(request: R, defaultValue?: FieldsSelection<TextFormatType, R>) => Promise<FieldsSelection<TextFormatType, R>>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    maxLength: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    minLength: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyTextObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyTextValueObservableChain & {get: <R extends DataPropertyTextValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyTextValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyTextValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    formatType: (TextFormatTypeObservableChain & {get: <R extends TextFormatTypeRequest>(request: R, defaultValue?: FieldsSelection<TextFormatType, R>) => Observable<FieldsSelection<TextFormatType, R>>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    maxLength: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    minLength: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyTextValuePromiseChain{
    textValue: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface DataPropertyTextValueObservableChain{
    textValue: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface DataPropertyTimePromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyTimeValuePromiseChain & {get: <R extends DataPropertyTimeValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyTimeValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyTimeValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayFormat: (DateDisplayFormatPromiseChain & {get: <R extends DateDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<DateDisplayFormat, R>) => Promise<FieldsSelection<DateDisplayFormat, R>>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    maxValue: (DataPropertyTimeValuePromiseChain & {get: <R extends DataPropertyTimeValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyTimeValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyTimeValue, R> | undefined)>}),
    minValue: (DataPropertyTimeValuePromiseChain & {get: <R extends DataPropertyTimeValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyTimeValue, R> | undefined)) => Promise<(FieldsSelection<DataPropertyTimeValue, R> | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyTimeObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    defaultValue: (DataPropertyTimeValueObservableChain & {get: <R extends DataPropertyTimeValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyTimeValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyTimeValue, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayFormat: (DateDisplayFormatObservableChain & {get: <R extends DateDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<DateDisplayFormat, R>) => Observable<FieldsSelection<DateDisplayFormat, R>>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    maxValue: (DataPropertyTimeValueObservableChain & {get: <R extends DataPropertyTimeValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyTimeValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyTimeValue, R> | undefined)>}),
    minValue: (DataPropertyTimeValueObservableChain & {get: <R extends DataPropertyTimeValueRequest>(request: R, defaultValue?: (FieldsSelection<DataPropertyTimeValue, R> | undefined)) => Observable<(FieldsSelection<DataPropertyTimeValue, R> | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyTimeValuePromiseChain{
    timeValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['LocalTime'] | undefined)) => Promise<(Scalars['LocalTime'] | undefined)>})
}

export interface DataPropertyTimeValueObservableChain{
    timeValue: ({get: (request?: boolean|number, defaultValue?: (Scalars['LocalTime'] | undefined)) => Observable<(Scalars['LocalTime'] | undefined)>})
}

export interface DataPropertyUserPromiseChain{
    JSON_SCHEMA: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Promise<(Scalars['Map_String_StringScalar'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    filterByDataObjectPermissions: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    filterByDataTypePrivileges: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    filterByRoles: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    sortingFullName: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyUserObservableChain{
    JSON_SCHEMA: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Observable<(Scalars['Map_String_StringScalar'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    filterByDataObjectPermissions: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    filterByDataTypePrivileges: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    filterByRoles: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    sortingFullName: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyUserCommonPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    filterByDataObjectPermissions: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    filterByDataTypePrivileges: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    filterByRoles: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    sortingFullName: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyUserCommonObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    filterByDataObjectPermissions: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    filterByDataTypePrivileges: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    filterByRoles: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    sortingFullName: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyUserValuePromiseChain{
    userValue: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>})
}

export interface DataPropertyUserValueObservableChain{
    userValue: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>})
}

export interface DataPropertyUsersPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    filterByDataObjectPermissions: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    filterByDataTypePrivileges: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    filterByRoles: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    sortingFullName: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyUsersObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    filterByDataObjectPermissions: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    filterByDataTypePrivileges: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    filterByRoles: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    sortingFullName: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyUsersValuePromiseChain{
    usersValue: ({get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>[]) => Promise<FieldsSelection<User, R>[]>})
}

export interface DataPropertyUsersValueObservableChain{
    usersValue: ({get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>[]) => Observable<FieldsSelection<User, R>[]>})
}

export interface DataPropertyVersionPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayFormat: (VersionDisplayFormatPromiseChain & {get: <R extends VersionDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<VersionDisplayFormat, R>) => Promise<FieldsSelection<VersionDisplayFormat, R>>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    originalNuxeoDocument: (DocumentPromiseChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Promise<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyType: (PropertyTypePromiseChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Promise<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface DataPropertyVersionObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    customizationRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayFormat: (VersionDisplayFormatObservableChain & {get: <R extends VersionDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<VersionDisplayFormat, R>) => Observable<FieldsSelection<VersionDisplayFormat, R>>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    helpText: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    jsonSchema: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    multilanguage: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    originalNuxeoDocument: (DocumentObservableChain & {get: <R extends DocumentRequest>(request: R, defaultValue?: (FieldsSelection<Document, R> | undefined)) => Observable<(FieldsSelection<Document, R> | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyType: (PropertyTypeObservableChain & {get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>) => Observable<FieldsSelection<PropertyType, R>>}),
    readonly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    required: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    skipNuxeoStore: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    sortable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    useInSearchOrSort: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface DataPropertyVersionValuePromiseChain{
    versionValue: (VersionPromiseChain & {get: <R extends VersionRequest>(request: R, defaultValue?: (FieldsSelection<Version, R> | undefined)) => Promise<(FieldsSelection<Version, R> | undefined)>})
}

export interface DataPropertyVersionValueObservableChain{
    versionValue: (VersionObservableChain & {get: <R extends VersionRequest>(request: R, defaultValue?: (FieldsSelection<Version, R> | undefined)) => Observable<(FieldsSelection<Version, R> | undefined)>})
}

export interface DataTypePromiseChain{
    baseType: (DataTypePromiseChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: (FieldsSelection<DataType, R> | undefined)) => Promise<(FieldsSelection<DataType, R> | undefined)>}),
    bpmnMessages: ({get: <R extends BpmnMessageGroupRequest>(request: R, defaultValue?: FieldsSelection<BpmnMessageGroup, R>[]) => Promise<FieldsSelection<BpmnMessageGroup, R>[]>}),
    bpmnProcessType: (XmlAndModelDecorationPromiseChain & {get: <R extends XmlAndModelDecorationRequest>(request: R, defaultValue?: (FieldsSelection<XmlAndModelDecoration, R> | undefined)) => Promise<(FieldsSelection<XmlAndModelDecoration, R> | undefined)>}),
    brandingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    calendarView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    canBeUsedAsTemplate: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    canCreateAnother: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    canHaveChildren: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    canHaveDiscussion: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    cardView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    childTableView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    childVersionable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    childrenTypes: ({get: <R extends DataTypeRequest>(request: R, defaultValue?: ((FieldsSelection<DataType, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<DataType, R> | undefined)[] | undefined)>}),
    createFromTemplateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    createView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    dataTypeComment: (DataTypePromiseChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: (FieldsSelection<DataType, R> | undefined)) => Promise<(FieldsSelection<DataType, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    discussionMembersId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    downloadable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    editView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    embedView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    grantedPrivileges: ({get: <R extends GrantedPrivilegesRequest>(request: R, defaultValue?: ((FieldsSelection<GrantedPrivileges, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<GrantedPrivileges, R> | undefined)[] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    inheritBpmnScheme: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    lifecycle: (LifecyclePromiseChain & {get: <R extends LifecycleRequest>(request: R, defaultValue?: FieldsSelection<Lifecycle, R>) => Promise<FieldsSelection<Lifecycle, R>>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    navigateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    postTemplates: ({get: <R extends PostTemplateRequest>(request: R, defaultValue?: FieldsSelection<PostTemplate, R>[]) => Promise<FieldsSelection<PostTemplate, R>[]>}),
    privilegesInherited: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    properties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    publishable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    reportingView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    rootVersionable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    stateMachine: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    tileView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    typeFilters: ({get: <R extends TypeFilterRequest>(request: R, defaultValue?: FieldsSelection<TypeFilter, R>[]) => Promise<FieldsSelection<TypeFilter, R>[]>}),
    uploadable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    versionIncrement: ({get: <R extends VersionIncrementRequest>(request: R, defaultValue?: FieldsSelection<VersionIncrement, R>[]) => Promise<FieldsSelection<VersionIncrement, R>[]>}),
    versionable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    views: ((args?: {includeArchived?: (Scalars['Boolean'] | null),viewType?: (ViewTypeEnum | null)}) => {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Promise<FieldsSelection<View, R>[]>})&({get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Promise<FieldsSelection<View, R>[]>})
}

export interface DataTypeObservableChain{
    baseType: (DataTypeObservableChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: (FieldsSelection<DataType, R> | undefined)) => Observable<(FieldsSelection<DataType, R> | undefined)>}),
    bpmnMessages: ({get: <R extends BpmnMessageGroupRequest>(request: R, defaultValue?: FieldsSelection<BpmnMessageGroup, R>[]) => Observable<FieldsSelection<BpmnMessageGroup, R>[]>}),
    bpmnProcessType: (XmlAndModelDecorationObservableChain & {get: <R extends XmlAndModelDecorationRequest>(request: R, defaultValue?: (FieldsSelection<XmlAndModelDecoration, R> | undefined)) => Observable<(FieldsSelection<XmlAndModelDecoration, R> | undefined)>}),
    brandingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    calendarView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    canBeUsedAsTemplate: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    canCreateAnother: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    canHaveChildren: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    canHaveDiscussion: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    cardView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    childTableView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    childVersionable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    childrenTypes: ({get: <R extends DataTypeRequest>(request: R, defaultValue?: ((FieldsSelection<DataType, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<DataType, R> | undefined)[] | undefined)>}),
    createFromTemplateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    createView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    dataTypeComment: (DataTypeObservableChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: (FieldsSelection<DataType, R> | undefined)) => Observable<(FieldsSelection<DataType, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    discussionMembersId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    downloadable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    editView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    embedView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    grantedPrivileges: ({get: <R extends GrantedPrivilegesRequest>(request: R, defaultValue?: ((FieldsSelection<GrantedPrivileges, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<GrantedPrivileges, R> | undefined)[] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    inheritBpmnScheme: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    lifecycle: (LifecycleObservableChain & {get: <R extends LifecycleRequest>(request: R, defaultValue?: FieldsSelection<Lifecycle, R>) => Observable<FieldsSelection<Lifecycle, R>>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    navigateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    postTemplates: ({get: <R extends PostTemplateRequest>(request: R, defaultValue?: FieldsSelection<PostTemplate, R>[]) => Observable<FieldsSelection<PostTemplate, R>[]>}),
    privilegesInherited: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    properties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    publishable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    reportingView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    rootVersionable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    stateMachine: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    tileView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    typeFilters: ({get: <R extends TypeFilterRequest>(request: R, defaultValue?: FieldsSelection<TypeFilter, R>[]) => Observable<FieldsSelection<TypeFilter, R>[]>}),
    uploadable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    versionIncrement: ({get: <R extends VersionIncrementRequest>(request: R, defaultValue?: FieldsSelection<VersionIncrement, R>[]) => Observable<FieldsSelection<VersionIncrement, R>[]>}),
    versionable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    views: ((args?: {includeArchived?: (Scalars['Boolean'] | null),viewType?: (ViewTypeEnum | null)}) => {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Observable<FieldsSelection<View, R>[]>})&({get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Observable<FieldsSelection<View, R>[]>})
}

export interface DateDisplayFormatPromiseChain{
    displayFormatEnum: ({get: (request?: boolean|number, defaultValue?: DateDisplayFormatEnum) => Promise<DateDisplayFormatEnum>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface DateDisplayFormatObservableChain{
    displayFormatEnum: ({get: (request?: boolean|number, defaultValue?: DateDisplayFormatEnum) => Observable<DateDisplayFormatEnum>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface DefaultResourcesPromiseChain{
    favicon: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    logo: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    module: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    smallLogo: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    workspace: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface DefaultResourcesObservableChain{
    favicon: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    logo: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    module: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    smallLogo: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    workspace: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface DiscussionDirectMessagesRoomPromiseChain{
    hasUnreadMessages: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    hidden: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    lastMessage: (DiscussionMessagePromiseChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)) => Promise<(FieldsSelection<DiscussionMessage, R> | undefined)>}),
    participant: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface DiscussionDirectMessagesRoomObservableChain{
    hasUnreadMessages: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    hidden: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    lastMessage: (DiscussionMessageObservableChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)) => Observable<(FieldsSelection<DiscussionMessage, R> | undefined)>}),
    participant: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface DiscussionDirectMessagesRoomListPromiseChain{
    items: ({get: <R extends DiscussionDirectMessagesRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionDirectMessagesRoom, R>[]) => Promise<FieldsSelection<DiscussionDirectMessagesRoom, R>[]>}),
    pageInfo: (PageInfoPromiseChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Promise<FieldsSelection<PageInfo, R>>})
}

export interface DiscussionDirectMessagesRoomListObservableChain{
    items: ({get: <R extends DiscussionDirectMessagesRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionDirectMessagesRoom, R>[]) => Observable<FieldsSelection<DiscussionDirectMessagesRoom, R>[]>}),
    pageInfo: (PageInfoObservableChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Observable<FieldsSelection<PageInfo, R>>})
}

export interface DiscussionMessagePromiseChain{
    attachments: ({get: <R extends FileRequest>(request: R, defaultValue?: ((FieldsSelection<File, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<File, R> | undefined)[] | undefined)>}),
    created: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    from: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    info: (DiscussionMessageInfoPromiseChain & {get: <R extends DiscussionMessageInfoRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessageInfo, R> | undefined)) => Promise<(FieldsSelection<DiscussionMessageInfo, R> | undefined)>}),
    message: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    modified: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parent: ({get: <R extends DiscussionMessageParentRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessageParent, R>) => Promise<FieldsSelection<DiscussionMessageParent, R>>}),
    replyId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    sent: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    system: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    whoRead: ({get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>[]) => Promise<FieldsSelection<User, R>[]>})
}

export interface DiscussionMessageObservableChain{
    attachments: ({get: <R extends FileRequest>(request: R, defaultValue?: ((FieldsSelection<File, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<File, R> | undefined)[] | undefined)>}),
    created: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    from: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    info: (DiscussionMessageInfoObservableChain & {get: <R extends DiscussionMessageInfoRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessageInfo, R> | undefined)) => Observable<(FieldsSelection<DiscussionMessageInfo, R> | undefined)>}),
    message: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    modified: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parent: ({get: <R extends DiscussionMessageParentRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessageParent, R>) => Observable<FieldsSelection<DiscussionMessageParent, R>>}),
    replyId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    sent: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    system: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    whoRead: ({get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>[]) => Observable<FieldsSelection<User, R>[]>})
}

export interface DiscussionMessageInfoPromiseChain{
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface DiscussionMessageInfoObservableChain{
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface DiscussionMessageParentStatusPromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: DiscussionMessageParentStatusEnum) => Promise<DiscussionMessageParentStatusEnum>})
}

export interface DiscussionMessageParentStatusObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: DiscussionMessageParentStatusEnum) => Observable<DiscussionMessageParentStatusEnum>})
}

export interface DiscussionRoomPromiseChain{
    dataObject: (DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R> | undefined)) => Promise<(FieldsSelection<DataObject, R> | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    hasUnreadMessages: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    hasUnreadThreadsMessages: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    icon: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: (FieldsSelection<File, R> | undefined)) => Promise<(FieldsSelection<File, R> | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    lastMessage: (DiscussionMessagePromiseChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)) => Promise<(FieldsSelection<DiscussionMessage, R> | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    owner: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    participants: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)[]) => Promise<(Scalars['String'] | undefined)[]>}),
    private: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    status: (DiscussionMessageParentStatusPromiseChain & {get: <R extends DiscussionMessageParentStatusRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessageParentStatus, R>) => Promise<FieldsSelection<DiscussionMessageParentStatus, R>>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface DiscussionRoomObservableChain{
    dataObject: (DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R> | undefined)) => Observable<(FieldsSelection<DataObject, R> | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    hasUnreadMessages: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    hasUnreadThreadsMessages: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    icon: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: (FieldsSelection<File, R> | undefined)) => Observable<(FieldsSelection<File, R> | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    lastMessage: (DiscussionMessageObservableChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)) => Observable<(FieldsSelection<DiscussionMessage, R> | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    owner: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    participants: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)[]) => Observable<(Scalars['String'] | undefined)[]>}),
    private: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    status: (DiscussionMessageParentStatusObservableChain & {get: <R extends DiscussionMessageParentStatusRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessageParentStatus, R>) => Observable<FieldsSelection<DiscussionMessageParentStatus, R>>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface DiscussionRoomListPromiseChain{
    items: ({get: <R extends DiscussionRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoom, R>[]) => Promise<FieldsSelection<DiscussionRoom, R>[]>}),
    pageInfo: (PageInfoPromiseChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Promise<FieldsSelection<PageInfo, R>>})
}

export interface DiscussionRoomListObservableChain{
    items: ({get: <R extends DiscussionRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoom, R>[]) => Observable<FieldsSelection<DiscussionRoom, R>[]>}),
    pageInfo: (PageInfoObservableChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Observable<FieldsSelection<PageInfo, R>>})
}

export interface DiscussionThreadPromiseChain{
    color: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    hasUnreadMessages: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    lastMessage: (DiscussionMessagePromiseChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)) => Promise<(FieldsSelection<DiscussionMessage, R> | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    owner: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: (DiscussionMessageParentStatusPromiseChain & {get: <R extends DiscussionMessageParentStatusRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessageParentStatus, R>) => Promise<FieldsSelection<DiscussionMessageParentStatus, R>>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface DiscussionThreadObservableChain{
    color: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    hasUnreadMessages: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    lastMessage: (DiscussionMessageObservableChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)) => Observable<(FieldsSelection<DiscussionMessage, R> | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    owner: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: (DiscussionMessageParentStatusObservableChain & {get: <R extends DiscussionMessageParentStatusRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessageParentStatus, R>) => Observable<FieldsSelection<DiscussionMessageParentStatus, R>>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface DiscussionThreadListPromiseChain{
    items: ({get: <R extends DiscussionThreadRequest>(request: R, defaultValue?: FieldsSelection<DiscussionThread, R>[]) => Promise<FieldsSelection<DiscussionThread, R>[]>}),
    pageInfo: (PageInfoPromiseChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Promise<FieldsSelection<PageInfo, R>>})
}

export interface DiscussionThreadListObservableChain{
    items: ({get: <R extends DiscussionThreadRequest>(request: R, defaultValue?: FieldsSelection<DiscussionThread, R>[]) => Observable<FieldsSelection<DiscussionThread, R>[]>}),
    pageInfo: (PageInfoObservableChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Observable<FieldsSelection<PageInfo, R>>})
}

export interface DocumentPromiseChain{
    DEFAULT_FILE_CONTENT: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    changeToken: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    checkedOut: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    contextParameters: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_ObjectScalar'] | undefined)) => Promise<(Scalars['Map_String_ObjectScalar'] | undefined)>}),
    dirtyProperties: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_ObjectScalar'] | undefined)) => Promise<(Scalars['Map_String_ObjectScalar'] | undefined)>}),
    facets: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    isCheckedOut: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    lastModified: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    lock: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    lockCreated: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    lockOwner: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    locked: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    parentRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    path: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    properties: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_ObjectScalar'] | undefined)) => Promise<(Scalars['Map_String_ObjectScalar'] | undefined)>}),
    proxy: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    record: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    retainUntil: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    state: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    title: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    trashed: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    type: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    uid: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    underRetentionOrLegalHold: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    version: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    versionLabel: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    versionableId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface DocumentObservableChain{
    DEFAULT_FILE_CONTENT: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    changeToken: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    checkedOut: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    contextParameters: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_ObjectScalar'] | undefined)) => Observable<(Scalars['Map_String_ObjectScalar'] | undefined)>}),
    dirtyProperties: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_ObjectScalar'] | undefined)) => Observable<(Scalars['Map_String_ObjectScalar'] | undefined)>}),
    facets: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    isCheckedOut: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    lastModified: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    lock: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    lockCreated: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    lockOwner: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    locked: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    parentRef: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    path: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    properties: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_ObjectScalar'] | undefined)) => Observable<(Scalars['Map_String_ObjectScalar'] | undefined)>}),
    proxy: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    record: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    retainUntil: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    state: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    title: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    trashed: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    type: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    uid: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    underRetentionOrLegalHold: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    version: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    versionLabel: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    versionableId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface ExternalGroupPromiseChain{
    externalGroupDescription: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    externalGroupDisplayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    externalGroupName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface ExternalGroupObservableChain{
    externalGroupDescription: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    externalGroupDisplayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    externalGroupName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface ExternalGroupListPromiseChain{
    items: ({get: <R extends ExternalGroupRequest>(request: R, defaultValue?: FieldsSelection<ExternalGroup, R>[]) => Promise<FieldsSelection<ExternalGroup, R>[]>}),
    pageInfo: (PageInfoPromiseChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Promise<FieldsSelection<PageInfo, R>>})
}

export interface ExternalGroupListObservableChain{
    items: ({get: <R extends ExternalGroupRequest>(request: R, defaultValue?: FieldsSelection<ExternalGroup, R>[]) => Observable<FieldsSelection<ExternalGroup, R>[]>}),
    pageInfo: (PageInfoObservableChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Observable<FieldsSelection<PageInfo, R>>})
}

export interface ExternalGroupMappingPromiseChain{
    externalGroup: (GroupPromiseChain & {get: <R extends GroupRequest>(request: R, defaultValue?: (FieldsSelection<Group, R> | undefined)) => Promise<(FieldsSelection<Group, R> | undefined)>}),
    mappedRoles: ({get: <R extends RoleRequest>(request: R, defaultValue?: ((FieldsSelection<Role, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Role, R> | undefined)[] | undefined)>})
}

export interface ExternalGroupMappingObservableChain{
    externalGroup: (GroupObservableChain & {get: <R extends GroupRequest>(request: R, defaultValue?: (FieldsSelection<Group, R> | undefined)) => Observable<(FieldsSelection<Group, R> | undefined)>}),
    mappedRoles: ({get: <R extends RoleRequest>(request: R, defaultValue?: ((FieldsSelection<Role, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Role, R> | undefined)[] | undefined)>})
}

export interface FilePromiseChain{
    defaultResource: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    encoding: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    length: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    mimeType: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    resourceId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    thumbnailUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface FileObservableChain{
    defaultResource: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    encoding: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    length: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    mimeType: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    resourceId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    thumbnailUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface GenericValidationResultPromiseChain{
    messages: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    severity: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface GenericValidationResultObservableChain{
    messages: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    severity: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface GrantedPermissionsPromiseChain{
    permissions: ({get: <R extends PermissionRequest>(request: R, defaultValue?: FieldsSelection<Permission, R>[]) => Promise<FieldsSelection<Permission, R>[]>}),
    role: (RolePromiseChain & {get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>) => Promise<FieldsSelection<Role, R>>})
}

export interface GrantedPermissionsObservableChain{
    permissions: ({get: <R extends PermissionRequest>(request: R, defaultValue?: FieldsSelection<Permission, R>[]) => Observable<FieldsSelection<Permission, R>[]>}),
    role: (RoleObservableChain & {get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>) => Observable<FieldsSelection<Role, R>>})
}

export interface GrantedPrivilegesPromiseChain{
    privileges: ({get: <R extends PrivilegeRequest>(request: R, defaultValue?: FieldsSelection<Privilege, R>[]) => Promise<FieldsSelection<Privilege, R>[]>}),
    role: (RolePromiseChain & {get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>) => Promise<FieldsSelection<Role, R>>})
}

export interface GrantedPrivilegesObservableChain{
    privileges: ({get: <R extends PrivilegeRequest>(request: R, defaultValue?: FieldsSelection<Privilege, R>[]) => Observable<FieldsSelection<Privilege, R>[]>}),
    role: (RoleObservableChain & {get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>) => Observable<FieldsSelection<Role, R>>})
}

export interface GroupPromiseChain{
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    groups: ({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Promise<FieldsSelection<Group, R>[]>}),
    isExternal: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    memberGroups: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    memberUsers: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    members: ({get: <R extends MemberRequest>(request: R, defaultValue?: FieldsSelection<Member, R>[]) => Promise<FieldsSelection<Member, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parents: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Promise<FieldsSelection<Role, R>[]>}),
    trashed: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    type: (MemberTypePromiseChain & {get: <R extends MemberTypeRequest>(request: R, defaultValue?: FieldsSelection<MemberType, R>) => Promise<FieldsSelection<MemberType, R>>}),
    uid: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface GroupObservableChain{
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    groups: ({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Observable<FieldsSelection<Group, R>[]>}),
    isExternal: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    memberGroups: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    memberUsers: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    members: ({get: <R extends MemberRequest>(request: R, defaultValue?: FieldsSelection<Member, R>[]) => Observable<FieldsSelection<Member, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parents: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Observable<FieldsSelection<Role, R>[]>}),
    trashed: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    type: (MemberTypeObservableChain & {get: <R extends MemberTypeRequest>(request: R, defaultValue?: FieldsSelection<MemberType, R>) => Observable<FieldsSelection<MemberType, R>>}),
    uid: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface GroupListPromiseChain{
    items: ({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Promise<FieldsSelection<Group, R>[]>}),
    pageInfo: (PageInfoPromiseChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Promise<FieldsSelection<PageInfo, R>>})
}

export interface GroupListObservableChain{
    items: ({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Observable<FieldsSelection<Group, R>[]>}),
    pageInfo: (PageInfoObservableChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Observable<FieldsSelection<PageInfo, R>>})
}

export interface HtmlWidgetPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    css: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    html: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    js: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    widgetJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface HtmlWidgetObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    css: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    html: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    js: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    widgetJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface HtmlWidgetGroupPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    htmlWidgets: ({get: <R extends HtmlWidgetRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidget, R>[]) => Promise<FieldsSelection<HtmlWidget, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    type: ({get: (request?: boolean|number, defaultValue?: HtmlWidgetGroupTypeEnum) => Promise<HtmlWidgetGroupTypeEnum>})
}

export interface HtmlWidgetGroupObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    htmlWidgets: ({get: <R extends HtmlWidgetRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidget, R>[]) => Observable<FieldsSelection<HtmlWidget, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    type: ({get: (request?: boolean|number, defaultValue?: HtmlWidgetGroupTypeEnum) => Observable<HtmlWidgetGroupTypeEnum>})
}

export interface LifecyclePromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    lifecycleJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>})
}

export interface LifecycleObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    lifecycleJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>})
}

export interface LifecycleStatePromiseChain{
    allowedStateTransitions: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Promise<Scalars['String'][]>}),
    backgroundColor: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    completed: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    disallowedActions: ({get: (request?: boolean|number, defaultValue?: AllowedActionsEnum[]) => Promise<AllowedActionsEnum[]>}),
    initial: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    speculative: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    technicalState: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    textColor: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface LifecycleStateObservableChain{
    allowedStateTransitions: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Observable<Scalars['String'][]>}),
    backgroundColor: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    completed: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    disallowedActions: ({get: (request?: boolean|number, defaultValue?: AllowedActionsEnum[]) => Observable<AllowedActionsEnum[]>}),
    initial: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    speculative: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    technicalState: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    textColor: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface LifecycleTransitionPromiseChain{
    customJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    destinationStateName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    prohibitRecursiveTransition: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    speculative: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>})
}

export interface LifecycleTransitionObservableChain{
    customJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    destinationStateName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    prohibitRecursiveTransition: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    speculative: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>})
}

export interface LocaleOptionPromiseChain{
    key: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    label: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface LocaleOptionObservableChain{
    key: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    label: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface MemberPromiseChain{
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    groups: ({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Promise<FieldsSelection<Group, R>[]>}),
    isExternal: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parents: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Promise<FieldsSelection<Role, R>[]>}),
    trashed: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    type: (MemberTypePromiseChain & {get: <R extends MemberTypeRequest>(request: R, defaultValue?: FieldsSelection<MemberType, R>) => Promise<FieldsSelection<MemberType, R>>}),
    uid: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface MemberObservableChain{
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    groups: ({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Observable<FieldsSelection<Group, R>[]>}),
    isExternal: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parents: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Observable<FieldsSelection<Role, R>[]>}),
    trashed: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    type: (MemberTypeObservableChain & {get: <R extends MemberTypeRequest>(request: R, defaultValue?: FieldsSelection<MemberType, R>) => Observable<FieldsSelection<MemberType, R>>}),
    uid: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface MemberTypePromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: MemberTypeEnum) => Promise<MemberTypeEnum>})
}

export interface MemberTypeObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: MemberTypeEnum) => Observable<MemberTypeEnum>})
}

export interface MetadataObjectPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>})
}

export interface MetadataObjectObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>})
}

export interface ModulePromiseChain{
    apiSpecsGroups: ({get: <R extends ApiSpecsGroupRequest>(request: R, defaultValue?: FieldsSelection<ApiSpecsGroup, R>[]) => Promise<FieldsSelection<ApiSpecsGroup, R>[]>}),
    brandingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    calendarView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    cardView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    childTableView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    createView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    dataTypes: ((args?: {includeArchived?: (Scalars['Boolean'] | null)}) => {get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>[]) => Promise<FieldsSelection<DataType, R>[]>})&({get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>[]) => Promise<FieldsSelection<DataType, R>[]>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    editView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    embedView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    filters: ({get: <R extends SystemFilterRequest>(request: R, defaultValue?: FieldsSelection<SystemFilter, R>[]) => Promise<FieldsSelection<SystemFilter, R>[]>}),
    grantedPrivileges: ({get: <R extends GrantedPrivilegesRequest>(request: R, defaultValue?: ((FieldsSelection<GrantedPrivileges, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<GrantedPrivileges, R> | undefined)[] | undefined)>}),
    icon: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Promise<FieldsSelection<File, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    kanbanView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    lifecycleStates: ((args?: {includeArchived?: (Scalars['Boolean'] | null)}) => {get: <R extends LifecycleStateRequest>(request: R, defaultValue?: FieldsSelection<LifecycleState, R>[]) => Promise<FieldsSelection<LifecycleState, R>[]>})&({get: <R extends LifecycleStateRequest>(request: R, defaultValue?: FieldsSelection<LifecycleState, R>[]) => Promise<FieldsSelection<LifecycleState, R>[]>}),
    lifecycles: ((args?: {includeArchived?: (Scalars['Boolean'] | null)}) => {get: <R extends LifecycleRequest>(request: R, defaultValue?: FieldsSelection<Lifecycle, R>[]) => Promise<FieldsSelection<Lifecycle, R>[]>})&({get: <R extends LifecycleRequest>(request: R, defaultValue?: FieldsSelection<Lifecycle, R>[]) => Promise<FieldsSelection<Lifecycle, R>[]>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    navigateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    publish: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    reportingView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    searchPage: (SystemPagePromiseChain & {get: <R extends SystemPageRequest>(request: R, defaultValue?: FieldsSelection<SystemPage, R>) => Promise<FieldsSelection<SystemPage, R>>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    templatesPage: (SystemPagePromiseChain & {get: <R extends SystemPageRequest>(request: R, defaultValue?: FieldsSelection<SystemPage, R>) => Promise<FieldsSelection<SystemPage, R>>}),
    tileView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    views: ((args?: {includeArchived?: (Scalars['Boolean'] | null),viewType?: (ViewTypeEnum | null)}) => {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Promise<FieldsSelection<View, R>[]>})&({get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Promise<FieldsSelection<View, R>[]>}),
    workspaces: ({get: <R extends WorkspaceRequest>(request: R, defaultValue?: FieldsSelection<Workspace, R>[]) => Promise<FieldsSelection<Workspace, R>[]>})
}

export interface ModuleObservableChain{
    apiSpecsGroups: ({get: <R extends ApiSpecsGroupRequest>(request: R, defaultValue?: FieldsSelection<ApiSpecsGroup, R>[]) => Observable<FieldsSelection<ApiSpecsGroup, R>[]>}),
    brandingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    calendarView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    cardView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    childTableView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    createView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    dataTypes: ((args?: {includeArchived?: (Scalars['Boolean'] | null)}) => {get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>[]) => Observable<FieldsSelection<DataType, R>[]>})&({get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>[]) => Observable<FieldsSelection<DataType, R>[]>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    editView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    embedView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    filters: ({get: <R extends SystemFilterRequest>(request: R, defaultValue?: FieldsSelection<SystemFilter, R>[]) => Observable<FieldsSelection<SystemFilter, R>[]>}),
    grantedPrivileges: ({get: <R extends GrantedPrivilegesRequest>(request: R, defaultValue?: ((FieldsSelection<GrantedPrivileges, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<GrantedPrivileges, R> | undefined)[] | undefined)>}),
    icon: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Observable<FieldsSelection<File, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    kanbanView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    lifecycleStates: ((args?: {includeArchived?: (Scalars['Boolean'] | null)}) => {get: <R extends LifecycleStateRequest>(request: R, defaultValue?: FieldsSelection<LifecycleState, R>[]) => Observable<FieldsSelection<LifecycleState, R>[]>})&({get: <R extends LifecycleStateRequest>(request: R, defaultValue?: FieldsSelection<LifecycleState, R>[]) => Observable<FieldsSelection<LifecycleState, R>[]>}),
    lifecycles: ((args?: {includeArchived?: (Scalars['Boolean'] | null)}) => {get: <R extends LifecycleRequest>(request: R, defaultValue?: FieldsSelection<Lifecycle, R>[]) => Observable<FieldsSelection<Lifecycle, R>[]>})&({get: <R extends LifecycleRequest>(request: R, defaultValue?: FieldsSelection<Lifecycle, R>[]) => Observable<FieldsSelection<Lifecycle, R>[]>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    navigateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    publish: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    reportingView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    searchPage: (SystemPageObservableChain & {get: <R extends SystemPageRequest>(request: R, defaultValue?: FieldsSelection<SystemPage, R>) => Observable<FieldsSelection<SystemPage, R>>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    templatesPage: (SystemPageObservableChain & {get: <R extends SystemPageRequest>(request: R, defaultValue?: FieldsSelection<SystemPage, R>) => Observable<FieldsSelection<SystemPage, R>>}),
    tileView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    views: ((args?: {includeArchived?: (Scalars['Boolean'] | null),viewType?: (ViewTypeEnum | null)}) => {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Observable<FieldsSelection<View, R>[]>})&({get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Observable<FieldsSelection<View, R>[]>}),
    workspaces: ({get: <R extends WorkspaceRequest>(request: R, defaultValue?: FieldsSelection<Workspace, R>[]) => Observable<FieldsSelection<Workspace, R>[]>})
}


/** Mutation root */
export interface MutationPromiseChain{
    setMembersForGroup: ((args: {members: MemberInput[],name: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createDataPropertyFiles: ((args: {dataProperty: CreateDataPropertyFilesInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    deleteOauth2ServiceTokens: ((args: {ids: Scalars['ID'][],serviceName: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateWorkbench: ((args: {workbench: UpdateWorkbenchInput}) => WorkbenchPromiseChain & {get: <R extends WorkbenchRequest>(request: R, defaultValue?: FieldsSelection<Workbench, R>) => Promise<FieldsSelection<Workbench, R>>}),
    createReferenceDataGroup: ((args: {referenceDataGroup: CreateReferenceDataGroupInput}) => ReferenceDataGroupPromiseChain & {get: <R extends ReferenceDataGroupRequest>(request: R, defaultValue?: FieldsSelection<ReferenceDataGroup, R>) => Promise<FieldsSelection<ReferenceDataGroup, R>>}),
    createRole: ((args: {role: CreateRoleInput}) => RolePromiseChain & {get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>) => Promise<FieldsSelection<Role, R>>}),
    deleteRoom: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateDataPropertyBoolean: ((args: {dataProperty: UpdateDataPropertyBooleanInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    removeObjectFromFavorites: ((args: {objectId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    startImportMetadataTool: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    deleteAssetUploads: ((args: {assetUploadIds: Scalars['String'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    logout: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    changeRoomOwner: ((args: {owner: Scalars['String'],id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createDataPropertySequence: ((args: {dataProperty: CreateDataPropertySequenceInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateDataPropertyDateTime: ((args: {dataProperty: UpdateDataPropertyDateTimeInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateTypeFilter: ((args: {filter: UpdateTypeFilterInput}) => TypeFilterPromiseChain & {get: <R extends TypeFilterRequest>(request: R, defaultValue?: FieldsSelection<TypeFilter, R>) => Promise<FieldsSelection<TypeFilter, R>>}),
    requestPasswordReset: ((args: {username: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createAssetUploads: ((args: {targetFolderId: Scalars['String'],items: AssetUploadInput[]}) => {get: <R extends AssetUploadRequest>(request: R, defaultValue?: FieldsSelection<AssetUpload, R>[]) => Promise<FieldsSelection<AssetUpload, R>[]>}),
    updateDataPropertyFiles: ((args: {dataProperty: UpdateDataPropertyFilesInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateRoom: ((args: {room: UpdateDiscussionRoomInput}) => DiscussionRoomPromiseChain & {get: <R extends DiscussionRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoom, R>) => Promise<FieldsSelection<DiscussionRoom, R>>}),
    moveReferenceMetadataObject: ((args: {moveInput: MoveReferenceMetadataObjectInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    enablePublishing: ((args: {moduleId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    reindexRepository: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    disablePublishing: ((args: {moduleId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    importToAssets: ((args: {importInput: ImportToAssetsInput}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Promise<FieldsSelection<DataObject, R>[]>}),
    createBpmnMessage: ((args: {dataProperty: CreateBpmnMessageInput}) => BpmnMessagePromiseChain & {get: <R extends BpmnMessageRequest>(request: R, defaultValue?: FieldsSelection<BpmnMessage, R>) => Promise<FieldsSelection<BpmnMessage, R>>}),
    createFilter: ((args: {filter: CreateSystemFilterInput}) => SystemFilterPromiseChain & {get: <R extends SystemFilterRequest>(request: R, defaultValue?: FieldsSelection<SystemFilter, R>) => Promise<FieldsSelection<SystemFilter, R>>}),
    changeThreadOwner: ((args: {owner: Scalars['String'],id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    changeDataObjectStatus: ((args: {id: Scalars['ID'],status: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    deleteThread: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    addObjectToFavorites: ((args: {objectId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    createSavedSearch: ((args: {savedSearch: CreateSavedSearchInput}) => SavedSearchPromiseChain & {get: <R extends SavedSearchRequest>(request: R, defaultValue?: FieldsSelection<SavedSearch, R>) => Promise<FieldsSelection<SavedSearch, R>>}),
    createDataPropertyText: ((args: {dataProperty: CreateDataPropertyTextInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    createDataPropertyBoolean: ((args: {dataProperty: CreateDataPropertyBooleanInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateThread: ((args: {thread: UpdateDiscussionThreadInput}) => DiscussionThreadPromiseChain & {get: <R extends DiscussionThreadRequest>(request: R, defaultValue?: FieldsSelection<DiscussionThread, R>) => Promise<FieldsSelection<DiscussionThread, R>>}),
    updateUserPassword: ((args: {oldPassword: Scalars['String'],name: Scalars['String'],newPassword: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    leaveRoom: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    deleteDataObject: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    readMessages: ((args: {messageIds: Scalars['String'][]}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Promise<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    updateDataPropertyDecimal: ((args: {dataProperty: UpdateDataPropertyDecimalInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    deleteUser: ((args: {name: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createWorkspace: ((args: {workspace: CreateWorkspaceInput}) => WorkspacePromiseChain & {get: <R extends WorkspaceRequest>(request: R, defaultValue?: FieldsSelection<Workspace, R>) => Promise<FieldsSelection<Workspace, R>>}),
    updateMessage: ((args: {message: UpdateDiscussionMessageInput}) => DiscussionMessagePromiseChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessage, R>) => Promise<FieldsSelection<DiscussionMessage, R>>}),
    updateWorkspace: ((args: {workspace: UpdateWorkspaceInput}) => WorkspacePromiseChain & {get: <R extends WorkspaceRequest>(request: R, defaultValue?: FieldsSelection<Workspace, R>) => Promise<FieldsSelection<Workspace, R>>}),
    createDataPropertyString: ((args: {dataProperty: CreateDataPropertyStringInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    createOrUpdateBpmnProcessType: ((args: {dataProperty: CreateOrUpdateBpmnProcessTypeInput}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    removeObjectsFromCollection: ((args: {collectionId: Scalars['String'],objectIds: (Scalars['String'] | null)[]}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R>[] | undefined)) => Promise<(FieldsSelection<DataObject, R>[] | undefined)>}),
    updateGroup: ((args: {group: UpdateGroupInput}) => GroupPromiseChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Promise<FieldsSelection<Group, R>>}),
    login: ((args: {password: Scalars['String'],username: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    moveDataObject: ((args: {targetId: Scalars['ID'],id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateView: ((args: {view: UpdateViewInput}) => ViewPromiseChain & {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>) => Promise<FieldsSelection<View, R>>}),
    createBpmnProcessDataType: ((args: {dataType: CreateBpmnProcessDataTypeInput}) => DataTypePromiseChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>) => Promise<FieldsSelection<DataType, R>>}),
    createTypeFilter: ((args: {filter: CreateTypeFilterInput}) => TypeFilterPromiseChain & {get: <R extends TypeFilterRequest>(request: R, defaultValue?: FieldsSelection<TypeFilter, R>) => Promise<FieldsSelection<TypeFilter, R>>}),
    deleteGroup: ((args: {name: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createView: ((args: {view: CreateViewInput}) => ViewPromiseChain & {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>) => Promise<FieldsSelection<View, R>>}),
    createDataPropertyUsers: ((args: {dataProperty: CreateDataPropertyUsersInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    createDataPropertyObject: ((args: {dataProperty: CreateDataPropertyObjectInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    createFilterView: ((args: {filterId: Scalars['String'],defaultListViewType: FilterDefaultViewEnum}) => ViewPromiseChain & {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>) => Promise<FieldsSelection<View, R>>}),
    createApiSpec: ((args: {apiSpec: CreateApiSpecInput}) => ApiSpecPromiseChain & {get: <R extends ApiSpecRequest>(request: R, defaultValue?: FieldsSelection<ApiSpec, R>) => Promise<FieldsSelection<ApiSpec, R>>}),
    createLifecycle: ((args: {lifecycle: CreateLifecycleInput}) => LifecyclePromiseChain & {get: <R extends LifecycleRequest>(request: R, defaultValue?: FieldsSelection<Lifecycle, R>) => Promise<FieldsSelection<Lifecycle, R>>}),
    updateDataPropertyObjectFilter: ((args: {dataProperty: UpdateDataPropertyObjectFilterInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateUser: ((args: {user: UpdateUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    deleteMessage: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createHtmlWidgetGroup: ((args: {htmlWidgetGroup: CreateHtmlWidgetGroupInput}) => HtmlWidgetGroupPromiseChain & {get: <R extends HtmlWidgetGroupRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidgetGroup, R>) => Promise<FieldsSelection<HtmlWidgetGroup, R>>}),
    createRoom: ((args: {room: CreateDiscussionRoomInput}) => DiscussionRoomPromiseChain & {get: <R extends DiscussionRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoom, R>) => Promise<FieldsSelection<DiscussionRoom, R>>}),
    updateSettings: ((args: {settings: UpdateSettingInput[]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateDataType: ((args: {dataType: UpdateDataTypeInput}) => DataTypePromiseChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>) => Promise<FieldsSelection<DataType, R>>}),
    token: ((args: {code: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    updateDataPropertyText: ((args: {dataProperty: UpdateDataPropertyTextInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    archiveRoom: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createReferenceDataType: ((args: {referenceDataType: CreateReferenceDataTypeInput}) => ReferenceDataTypePromiseChain & {get: <R extends ReferenceDataTypeRequest>(request: R, defaultValue?: FieldsSelection<ReferenceDataType, R>) => Promise<FieldsSelection<ReferenceDataType, R>>}),
    updateApplication: ((args: {application: UpdateApplicationInput}) => ApplicationPromiseChain & {get: <R extends ApplicationRequest>(request: R, defaultValue?: FieldsSelection<Application, R>) => Promise<FieldsSelection<Application, R>>}),
    addObjectsToFavorites: ((args: {objectIds: (Scalars['String'] | null)[]}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R>[] | undefined)) => Promise<(FieldsSelection<DataObject, R>[] | undefined)>}),
    deleteSavedSearch: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateSetting: ((args: {setting: UpdateSettingInput}) => SettingPromiseChain & {get: <R extends SettingRequest>(request: R, defaultValue?: FieldsSelection<Setting, R>) => Promise<FieldsSelection<Setting, R>>}),
    createDataObjectsFromLiveConnect: ((args: {providerId: Scalars['String'],user: Scalars['String'],items: AssetDropboxInput[]}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Promise<FieldsSelection<DataObject, R>[]>}),
    updateUserProfile: ((args: {profile: UpdateUserProfileInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    updateLifecycle: ((args: {lifecycle: UpdateLifecycleInput}) => LifecyclePromiseChain & {get: <R extends LifecycleRequest>(request: R, defaultValue?: FieldsSelection<Lifecycle, R>) => Promise<FieldsSelection<Lifecycle, R>>}),
    changeDataObjectStatusBulk: ((args: {status: Scalars['String'],objectIds: Scalars['ID'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    hideDirectMessagesRoom: ((args: {id: Scalars['ID']}) => DiscussionDirectMessagesRoomPromiseChain & {get: <R extends DiscussionDirectMessagesRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionDirectMessagesRoom, R>) => Promise<FieldsSelection<DiscussionDirectMessagesRoom, R>>}),
    createDataPropertyFile: ((args: {dataProperty: CreateDataPropertyFileInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    deleteDataObjectBulk: ((args: {ids: Scalars['ID'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createUser: ((args: {user: CreateUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    removeObjectFromCollection: ((args: {collectionId: Scalars['String'],objectId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    unarchiveRoom: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createDataType: ((args: {dataType: CreateDataTypeInput}) => DataTypePromiseChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>) => Promise<FieldsSelection<DataType, R>>}),
    resetPassword: ((args: {password: Scalars['String'],key: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createDataPropertyUser: ((args: {dataProperty: CreateDataPropertyUserInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    createDataPropertyDateTime: ((args: {dataProperty: CreateDataPropertyDateTimeInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateRole: ((args: {role: UpdateRoleInput}) => RolePromiseChain & {get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>) => Promise<FieldsSelection<Role, R>>}),
    addObjectToCollection: ((args: {collectionId: Scalars['String'],objectId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    
/** Create data template from data object with GUID = dataObjectId. */
saveDataObjectAsTemplate: ((args: {dataObjectId: Scalars['String']}) => DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Promise<FieldsSelection<DataObject, R>>}),
    createModule: ((args: {module: CreateModuleInput}) => ModulePromiseChain & {get: <R extends ModuleRequest>(request: R, defaultValue?: FieldsSelection<Module, R>) => Promise<FieldsSelection<Module, R>>}),
    updateFilter: ((args: {filter: UpdateSystemFilterInput}) => SystemFilterPromiseChain & {get: <R extends SystemFilterRequest>(request: R, defaultValue?: FieldsSelection<SystemFilter, R>) => Promise<FieldsSelection<SystemFilter, R>>}),
    clearCache: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateAsset: ((args: {assetUpload: AssetUploadInput}) => AssetUploadPromiseChain & {get: <R extends AssetUploadRequest>(request: R, defaultValue?: FieldsSelection<AssetUpload, R>) => Promise<FieldsSelection<AssetUpload, R>>}),
    updateModulePrivileges: ((args: {privileges?: (UpdateGrantedPrivilegesInput[] | null),metadataObjectId: Scalars['String']}) => ModulePromiseChain & {get: <R extends ModuleRequest>(request: R, defaultValue?: FieldsSelection<Module, R>) => Promise<FieldsSelection<Module, R>>}),
    createDataPropertyTime: ((args: {dataProperty: CreateDataPropertyTimeInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateDataPropertyFile: ((args: {dataProperty: UpdateDataPropertyFileInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateDataPropertyMultiSelection: ((args: {dataProperty: UpdateDataPropertyMultiSelectionInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    archiveThread: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateDataPropertyVersion: ((args: {dataProperty: UpdateDataPropertyVersionInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateDataPropertyObject: ((args: {dataProperty: UpdateDataPropertyObjectInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    createDataPropertyDate: ((args: {dataProperty: CreateDataPropertyDateInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateDataPropertySequence: ((args: {dataProperty: UpdateDataPropertySequenceInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateReferenceMetadataObjectPermissions: ((args: {referenceMetadataObjectId: Scalars['String'],permissions?: (UpdateGrantedPermissionsInput[] | null)}) => ReferenceMetadataObjectPromiseChain & {get: <R extends ReferenceMetadataObjectRequest>(request: R, defaultValue?: FieldsSelection<ReferenceMetadataObject, R>) => Promise<FieldsSelection<ReferenceMetadataObject, R>>}),
    joinToPublicRoom: ((args: {id: Scalars['ID']}) => DiscussionRoomPromiseChain & {get: <R extends DiscussionRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoom, R>) => Promise<FieldsSelection<DiscussionRoom, R>>}),
    archiveMetaDataObject: ((args: {id: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateDataPropertySelection: ((args: {dataProperty: UpdateDataPropertySelectionInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    republishDataObject: ((args: {publishDataObjectInput: PublishDataObjectInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createGroup: ((args: {group: CreateGroupInput}) => GroupPromiseChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Promise<FieldsSelection<Group, R>>}),
    updateDataPropertyStatus: ((args: {dataProperty: UpdateDataPropertyStatusInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    unarchiveMetaDataObject: ((args: {id: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    changeDataObjectOwner: ((args: {owner: Scalars['String'],id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateDataPropertyObjects: ((args: {dataProperty: UpdateDataPropertyObjectsInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    deleteMetaDataObject: ((args: {id: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updatePostTemplate: ((args: {postTemplate: UpdatePostTemplateInput}) => PostTemplatePromiseChain & {get: <R extends PostTemplateRequest>(request: R, defaultValue?: FieldsSelection<PostTemplate, R>) => Promise<FieldsSelection<PostTemplate, R>>}),
    updateTheme: ((args: {theme: UpdateThemeInput}) => ThemePromiseChain & {get: <R extends ThemeRequest>(request: R, defaultValue?: FieldsSelection<Theme, R>) => Promise<FieldsSelection<Theme, R>>}),
    createThread: ((args: {thread: CreateDiscussionThreadInput}) => DiscussionThreadPromiseChain & {get: <R extends DiscussionThreadRequest>(request: R, defaultValue?: FieldsSelection<DiscussionThread, R>) => Promise<FieldsSelection<DiscussionThread, R>>}),
    createApiSpecsGroup: ((args: {apiSpecsGroup: CreateApiSpecsGroupInput}) => ApiSpecsGroupPromiseChain & {get: <R extends ApiSpecsGroupRequest>(request: R, defaultValue?: FieldsSelection<ApiSpecsGroup, R>) => Promise<FieldsSelection<ApiSpecsGroup, R>>}),
    createDataPropertyInteger: ((args: {dataProperty: CreateDataPropertyIntegerInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    createDataObjectVersion: ((args: {createVersionInput: CreateDataObjectVersionInput}) => DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Promise<FieldsSelection<DataObject, R>>}),
    createMessage: ((args: {message: CreateDiscussionMessageInput}) => DiscussionMessagePromiseChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessage, R>) => Promise<FieldsSelection<DiscussionMessage, R>>}),
    updateHtmlWidget: ((args: {htmlWidget: UpdateHtmlWidgetInput}) => HtmlWidgetPromiseChain & {get: <R extends HtmlWidgetRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidget, R>) => Promise<FieldsSelection<HtmlWidget, R>>}),
    updateApiSpecsGroup: ((args: {apiSpecsGroup: UpdateApiSpecsGroupInput}) => ApiSpecsGroupPromiseChain & {get: <R extends ApiSpecsGroupRequest>(request: R, defaultValue?: FieldsSelection<ApiSpecsGroup, R>) => Promise<FieldsSelection<ApiSpecsGroup, R>>}),
    createDataObject: ((args: {object: CreateDataObjectInput}) => DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Promise<FieldsSelection<DataObject, R>>}),
    createCollection: ((args: {collectionPath: Scalars['String'],collectionDescription?: (Scalars['String'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    restoreDataObjectVersion: ((args: {versionId: Scalars['ID']}) => DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Promise<FieldsSelection<DataObject, R>>}),
    updateDataPropertyAttributes: ((args: {dataProperty: UpdateDataPropertyAttributesInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    createDataObjectFromTemplate: ((args: {object: CreateDataObjectFromTemplateInput}) => DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Promise<FieldsSelection<DataObject, R>>}),
    updateBpmnMessage: ((args: {dataProperty: UpdateBpmnMessageInput}) => BpmnMessagePromiseChain & {get: <R extends BpmnMessageRequest>(request: R, defaultValue?: FieldsSelection<BpmnMessage, R>) => Promise<FieldsSelection<BpmnMessage, R>>}),
    updateDataPropertyUser: ((args: {dataProperty: UpdateDataPropertyUserInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateDataPropertyUsers: ((args: {dataProperty: UpdateDataPropertyUsersInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    moveDataObjectBulk: ((args: {targetId: Scalars['ID'],ids: Scalars['ID'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    setMembersForRole: ((args: {members: MemberInput[],name: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createDataPropertyObjects: ((args: {dataProperty: CreateDataPropertyObjectsInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    removeObjectsFromFavorites: ((args: {objectIds: (Scalars['String'] | null)[]}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R>[] | undefined)) => Promise<(FieldsSelection<DataObject, R>[] | undefined)>}),
    updateDataPropertyTime: ((args: {dataProperty: UpdateDataPropertyTimeInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    stopImportMetadataTool: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateReferenceDataGroup: ((args: {referenceDataGroup: UpdateReferenceDataGroupInput}) => ReferenceDataGroupPromiseChain & {get: <R extends ReferenceDataGroupRequest>(request: R, defaultValue?: FieldsSelection<ReferenceDataGroup, R>) => Promise<FieldsSelection<ReferenceDataGroup, R>>}),
    sendEmail: ((args: {sendEmailInput: SendEmailInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    restoreUser: ((args: {uid: Scalars['String']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    saveViewCustomization: ((args: {customization: ViewCustomizationInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    failAssetUploads: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    changeDataObjectOwnerBulk: ((args: {owner: Scalars['String'],objectIds: Scalars['ID'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createDirectMessagesRoom: ((args: {room: CreateDiscussionDirectMessagesRoomInput}) => DiscussionDirectMessagesRoomPromiseChain & {get: <R extends DiscussionDirectMessagesRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionDirectMessagesRoom, R>) => Promise<FieldsSelection<DiscussionDirectMessagesRoom, R>>}),
    createDataPropertyObjectFilter: ((args: {dataProperty: CreateDataPropertyObjectFilterInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    changeStatusAndUpdateDataObject: ((args: {currentState?: (Scalars['String'] | null),object: UpdateDataObjectInput,status: (Scalars['String'] | null)[]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateSavedSearch: ((args: {savedSearch: UpdateSavedSearchInput}) => SavedSearchPromiseChain & {get: <R extends SavedSearchRequest>(request: R, defaultValue?: FieldsSelection<SavedSearch, R>) => Promise<FieldsSelection<SavedSearch, R>>}),
    unpublishDataObject: ((args: {unpublishDataObjectInput: UnpublishDataObjectInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateReferenceDataType: ((args: {referenceDataType: UpdateReferenceDataTypeInput}) => ReferenceDataTypePromiseChain & {get: <R extends ReferenceDataTypeRequest>(request: R, defaultValue?: FieldsSelection<ReferenceDataType, R>) => Promise<FieldsSelection<ReferenceDataType, R>>}),
    unarchiveThread: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    publishDataObject: ((args: {publishDataObjectInput: PublishDataObjectInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createPostTemplate: ((args: {postTemplate: CreatePostTemplateInput}) => PostTemplatePromiseChain & {get: <R extends PostTemplateRequest>(request: R, defaultValue?: FieldsSelection<PostTemplate, R>) => Promise<FieldsSelection<PostTemplate, R>>}),
    createDataPropertySelection: ((args: {dataProperty: CreateDataPropertySelectionInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateDataPropertyDate: ((args: {dataProperty: UpdateDataPropertyDateInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateWorkspacePermissions: ((args: {permissions?: (UpdateGrantedPermissionsInput[] | null),metadataObjectId: Scalars['String']}) => WorkspacePromiseChain & {get: <R extends WorkspaceRequest>(request: R, defaultValue?: FieldsSelection<Workspace, R>) => Promise<FieldsSelection<Workspace, R>>}),
    createDataPropertyMultiSelection: ((args: {dataProperty: CreateDataPropertyMultiSelectionInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    readAllMessages: ((args: {parentId: Scalars['String']}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Promise<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    createWorkbench: ((args: {workbench: CreateWorkbenchInput}) => WorkbenchPromiseChain & {get: <R extends WorkbenchRequest>(request: R, defaultValue?: FieldsSelection<Workbench, R>) => Promise<FieldsSelection<Workbench, R>>}),
    addObjectsToCollection: ((args: {collectionId: Scalars['String'],objectIds: (Scalars['String'] | null)[]}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R>[] | undefined)) => Promise<(FieldsSelection<DataObject, R>[] | undefined)>}),
    updateDataTypePrivileges: ((args: {privileges?: (UpdateGrantedPrivilegesInput[] | null),metadataObjectId: Scalars['String']}) => DataTypePromiseChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>) => Promise<FieldsSelection<DataType, R>>}),
    updateDataPropertyInteger: ((args: {dataProperty: UpdateDataPropertyIntegerInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    updateApiSpec: ((args: {apiSpec: UpdateApiSpecInput}) => ApiSpecPromiseChain & {get: <R extends ApiSpecRequest>(request: R, defaultValue?: FieldsSelection<ApiSpec, R>) => Promise<FieldsSelection<ApiSpec, R>>}),
    updateHtmlWidgetGroup: ((args: {htmlWidgetGroup: UpdateHtmlWidgetGroupInput}) => HtmlWidgetGroupPromiseChain & {get: <R extends HtmlWidgetGroupRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidgetGroup, R>) => Promise<FieldsSelection<HtmlWidgetGroup, R>>}),
    deleteGroupBulk: ((args: {names: Scalars['String'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateDataObject: ((args: {object: UpdateDataObjectInput}) => DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Promise<FieldsSelection<DataObject, R>>}),
    publish: ((args: {comment: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    createDataPropertyAttributes: ((args: {dataProperty: CreateDataPropertyAttributesInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    createExternalGroup: ((args: {externalGroup: CreateOrUpdateExternalGroupInput}) => ExternalGroupMappingPromiseChain & {get: <R extends ExternalGroupMappingRequest>(request: R, defaultValue?: FieldsSelection<ExternalGroupMapping, R>) => Promise<FieldsSelection<ExternalGroupMapping, R>>}),
    createDataPropertyDecimal: ((args: {dataProperty: CreateDataPropertyDecimalInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    recalcDataObjectFormulas: ((args: {id: Scalars['String']}) => DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Promise<FieldsSelection<DataObject, R>>}),
    updateModule: ((args: {module: UpdateModuleInput}) => ModulePromiseChain & {get: <R extends ModuleRequest>(request: R, defaultValue?: FieldsSelection<Module, R>) => Promise<FieldsSelection<Module, R>>}),
    createHtmlWidget: ((args: {htmlWidget: CreateHtmlWidgetInput}) => HtmlWidgetPromiseChain & {get: <R extends HtmlWidgetRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidget, R>) => Promise<FieldsSelection<HtmlWidget, R>>}),
    deleteUserBulk: ((args: {names: Scalars['String'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    updateDataPropertyString: ((args: {dataProperty: UpdateDataPropertyStringInput}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>})
}


/** Mutation root */
export interface MutationObservableChain{
    setMembersForGroup: ((args: {members: MemberInput[],name: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createDataPropertyFiles: ((args: {dataProperty: CreateDataPropertyFilesInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    deleteOauth2ServiceTokens: ((args: {ids: Scalars['ID'][],serviceName: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateWorkbench: ((args: {workbench: UpdateWorkbenchInput}) => WorkbenchObservableChain & {get: <R extends WorkbenchRequest>(request: R, defaultValue?: FieldsSelection<Workbench, R>) => Observable<FieldsSelection<Workbench, R>>}),
    createReferenceDataGroup: ((args: {referenceDataGroup: CreateReferenceDataGroupInput}) => ReferenceDataGroupObservableChain & {get: <R extends ReferenceDataGroupRequest>(request: R, defaultValue?: FieldsSelection<ReferenceDataGroup, R>) => Observable<FieldsSelection<ReferenceDataGroup, R>>}),
    createRole: ((args: {role: CreateRoleInput}) => RoleObservableChain & {get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>) => Observable<FieldsSelection<Role, R>>}),
    deleteRoom: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateDataPropertyBoolean: ((args: {dataProperty: UpdateDataPropertyBooleanInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    removeObjectFromFavorites: ((args: {objectId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    startImportMetadataTool: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    deleteAssetUploads: ((args: {assetUploadIds: Scalars['String'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    logout: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    changeRoomOwner: ((args: {owner: Scalars['String'],id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createDataPropertySequence: ((args: {dataProperty: CreateDataPropertySequenceInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateDataPropertyDateTime: ((args: {dataProperty: UpdateDataPropertyDateTimeInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateTypeFilter: ((args: {filter: UpdateTypeFilterInput}) => TypeFilterObservableChain & {get: <R extends TypeFilterRequest>(request: R, defaultValue?: FieldsSelection<TypeFilter, R>) => Observable<FieldsSelection<TypeFilter, R>>}),
    requestPasswordReset: ((args: {username: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createAssetUploads: ((args: {targetFolderId: Scalars['String'],items: AssetUploadInput[]}) => {get: <R extends AssetUploadRequest>(request: R, defaultValue?: FieldsSelection<AssetUpload, R>[]) => Observable<FieldsSelection<AssetUpload, R>[]>}),
    updateDataPropertyFiles: ((args: {dataProperty: UpdateDataPropertyFilesInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateRoom: ((args: {room: UpdateDiscussionRoomInput}) => DiscussionRoomObservableChain & {get: <R extends DiscussionRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoom, R>) => Observable<FieldsSelection<DiscussionRoom, R>>}),
    moveReferenceMetadataObject: ((args: {moveInput: MoveReferenceMetadataObjectInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    enablePublishing: ((args: {moduleId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    reindexRepository: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    disablePublishing: ((args: {moduleId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    importToAssets: ((args: {importInput: ImportToAssetsInput}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Observable<FieldsSelection<DataObject, R>[]>}),
    createBpmnMessage: ((args: {dataProperty: CreateBpmnMessageInput}) => BpmnMessageObservableChain & {get: <R extends BpmnMessageRequest>(request: R, defaultValue?: FieldsSelection<BpmnMessage, R>) => Observable<FieldsSelection<BpmnMessage, R>>}),
    createFilter: ((args: {filter: CreateSystemFilterInput}) => SystemFilterObservableChain & {get: <R extends SystemFilterRequest>(request: R, defaultValue?: FieldsSelection<SystemFilter, R>) => Observable<FieldsSelection<SystemFilter, R>>}),
    changeThreadOwner: ((args: {owner: Scalars['String'],id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    changeDataObjectStatus: ((args: {id: Scalars['ID'],status: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    deleteThread: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    addObjectToFavorites: ((args: {objectId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    createSavedSearch: ((args: {savedSearch: CreateSavedSearchInput}) => SavedSearchObservableChain & {get: <R extends SavedSearchRequest>(request: R, defaultValue?: FieldsSelection<SavedSearch, R>) => Observable<FieldsSelection<SavedSearch, R>>}),
    createDataPropertyText: ((args: {dataProperty: CreateDataPropertyTextInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    createDataPropertyBoolean: ((args: {dataProperty: CreateDataPropertyBooleanInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateThread: ((args: {thread: UpdateDiscussionThreadInput}) => DiscussionThreadObservableChain & {get: <R extends DiscussionThreadRequest>(request: R, defaultValue?: FieldsSelection<DiscussionThread, R>) => Observable<FieldsSelection<DiscussionThread, R>>}),
    updateUserPassword: ((args: {oldPassword: Scalars['String'],name: Scalars['String'],newPassword: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    leaveRoom: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    deleteDataObject: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    readMessages: ((args: {messageIds: Scalars['String'][]}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Observable<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    updateDataPropertyDecimal: ((args: {dataProperty: UpdateDataPropertyDecimalInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    deleteUser: ((args: {name: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createWorkspace: ((args: {workspace: CreateWorkspaceInput}) => WorkspaceObservableChain & {get: <R extends WorkspaceRequest>(request: R, defaultValue?: FieldsSelection<Workspace, R>) => Observable<FieldsSelection<Workspace, R>>}),
    updateMessage: ((args: {message: UpdateDiscussionMessageInput}) => DiscussionMessageObservableChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessage, R>) => Observable<FieldsSelection<DiscussionMessage, R>>}),
    updateWorkspace: ((args: {workspace: UpdateWorkspaceInput}) => WorkspaceObservableChain & {get: <R extends WorkspaceRequest>(request: R, defaultValue?: FieldsSelection<Workspace, R>) => Observable<FieldsSelection<Workspace, R>>}),
    createDataPropertyString: ((args: {dataProperty: CreateDataPropertyStringInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    createOrUpdateBpmnProcessType: ((args: {dataProperty: CreateOrUpdateBpmnProcessTypeInput}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    removeObjectsFromCollection: ((args: {collectionId: Scalars['String'],objectIds: (Scalars['String'] | null)[]}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R>[] | undefined)) => Observable<(FieldsSelection<DataObject, R>[] | undefined)>}),
    updateGroup: ((args: {group: UpdateGroupInput}) => GroupObservableChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Observable<FieldsSelection<Group, R>>}),
    login: ((args: {password: Scalars['String'],username: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    moveDataObject: ((args: {targetId: Scalars['ID'],id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateView: ((args: {view: UpdateViewInput}) => ViewObservableChain & {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>) => Observable<FieldsSelection<View, R>>}),
    createBpmnProcessDataType: ((args: {dataType: CreateBpmnProcessDataTypeInput}) => DataTypeObservableChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>) => Observable<FieldsSelection<DataType, R>>}),
    createTypeFilter: ((args: {filter: CreateTypeFilterInput}) => TypeFilterObservableChain & {get: <R extends TypeFilterRequest>(request: R, defaultValue?: FieldsSelection<TypeFilter, R>) => Observable<FieldsSelection<TypeFilter, R>>}),
    deleteGroup: ((args: {name: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createView: ((args: {view: CreateViewInput}) => ViewObservableChain & {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>) => Observable<FieldsSelection<View, R>>}),
    createDataPropertyUsers: ((args: {dataProperty: CreateDataPropertyUsersInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    createDataPropertyObject: ((args: {dataProperty: CreateDataPropertyObjectInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    createFilterView: ((args: {filterId: Scalars['String'],defaultListViewType: FilterDefaultViewEnum}) => ViewObservableChain & {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>) => Observable<FieldsSelection<View, R>>}),
    createApiSpec: ((args: {apiSpec: CreateApiSpecInput}) => ApiSpecObservableChain & {get: <R extends ApiSpecRequest>(request: R, defaultValue?: FieldsSelection<ApiSpec, R>) => Observable<FieldsSelection<ApiSpec, R>>}),
    createLifecycle: ((args: {lifecycle: CreateLifecycleInput}) => LifecycleObservableChain & {get: <R extends LifecycleRequest>(request: R, defaultValue?: FieldsSelection<Lifecycle, R>) => Observable<FieldsSelection<Lifecycle, R>>}),
    updateDataPropertyObjectFilter: ((args: {dataProperty: UpdateDataPropertyObjectFilterInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateUser: ((args: {user: UpdateUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    deleteMessage: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createHtmlWidgetGroup: ((args: {htmlWidgetGroup: CreateHtmlWidgetGroupInput}) => HtmlWidgetGroupObservableChain & {get: <R extends HtmlWidgetGroupRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidgetGroup, R>) => Observable<FieldsSelection<HtmlWidgetGroup, R>>}),
    createRoom: ((args: {room: CreateDiscussionRoomInput}) => DiscussionRoomObservableChain & {get: <R extends DiscussionRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoom, R>) => Observable<FieldsSelection<DiscussionRoom, R>>}),
    updateSettings: ((args: {settings: UpdateSettingInput[]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateDataType: ((args: {dataType: UpdateDataTypeInput}) => DataTypeObservableChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>) => Observable<FieldsSelection<DataType, R>>}),
    token: ((args: {code: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    updateDataPropertyText: ((args: {dataProperty: UpdateDataPropertyTextInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    archiveRoom: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createReferenceDataType: ((args: {referenceDataType: CreateReferenceDataTypeInput}) => ReferenceDataTypeObservableChain & {get: <R extends ReferenceDataTypeRequest>(request: R, defaultValue?: FieldsSelection<ReferenceDataType, R>) => Observable<FieldsSelection<ReferenceDataType, R>>}),
    updateApplication: ((args: {application: UpdateApplicationInput}) => ApplicationObservableChain & {get: <R extends ApplicationRequest>(request: R, defaultValue?: FieldsSelection<Application, R>) => Observable<FieldsSelection<Application, R>>}),
    addObjectsToFavorites: ((args: {objectIds: (Scalars['String'] | null)[]}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R>[] | undefined)) => Observable<(FieldsSelection<DataObject, R>[] | undefined)>}),
    deleteSavedSearch: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateSetting: ((args: {setting: UpdateSettingInput}) => SettingObservableChain & {get: <R extends SettingRequest>(request: R, defaultValue?: FieldsSelection<Setting, R>) => Observable<FieldsSelection<Setting, R>>}),
    createDataObjectsFromLiveConnect: ((args: {providerId: Scalars['String'],user: Scalars['String'],items: AssetDropboxInput[]}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Observable<FieldsSelection<DataObject, R>[]>}),
    updateUserProfile: ((args: {profile: UpdateUserProfileInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    updateLifecycle: ((args: {lifecycle: UpdateLifecycleInput}) => LifecycleObservableChain & {get: <R extends LifecycleRequest>(request: R, defaultValue?: FieldsSelection<Lifecycle, R>) => Observable<FieldsSelection<Lifecycle, R>>}),
    changeDataObjectStatusBulk: ((args: {status: Scalars['String'],objectIds: Scalars['ID'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    hideDirectMessagesRoom: ((args: {id: Scalars['ID']}) => DiscussionDirectMessagesRoomObservableChain & {get: <R extends DiscussionDirectMessagesRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionDirectMessagesRoom, R>) => Observable<FieldsSelection<DiscussionDirectMessagesRoom, R>>}),
    createDataPropertyFile: ((args: {dataProperty: CreateDataPropertyFileInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    deleteDataObjectBulk: ((args: {ids: Scalars['ID'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createUser: ((args: {user: CreateUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    removeObjectFromCollection: ((args: {collectionId: Scalars['String'],objectId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    unarchiveRoom: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createDataType: ((args: {dataType: CreateDataTypeInput}) => DataTypeObservableChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>) => Observable<FieldsSelection<DataType, R>>}),
    resetPassword: ((args: {password: Scalars['String'],key: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createDataPropertyUser: ((args: {dataProperty: CreateDataPropertyUserInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    createDataPropertyDateTime: ((args: {dataProperty: CreateDataPropertyDateTimeInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateRole: ((args: {role: UpdateRoleInput}) => RoleObservableChain & {get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>) => Observable<FieldsSelection<Role, R>>}),
    addObjectToCollection: ((args: {collectionId: Scalars['String'],objectId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    
/** Create data template from data object with GUID = dataObjectId. */
saveDataObjectAsTemplate: ((args: {dataObjectId: Scalars['String']}) => DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Observable<FieldsSelection<DataObject, R>>}),
    createModule: ((args: {module: CreateModuleInput}) => ModuleObservableChain & {get: <R extends ModuleRequest>(request: R, defaultValue?: FieldsSelection<Module, R>) => Observable<FieldsSelection<Module, R>>}),
    updateFilter: ((args: {filter: UpdateSystemFilterInput}) => SystemFilterObservableChain & {get: <R extends SystemFilterRequest>(request: R, defaultValue?: FieldsSelection<SystemFilter, R>) => Observable<FieldsSelection<SystemFilter, R>>}),
    clearCache: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateAsset: ((args: {assetUpload: AssetUploadInput}) => AssetUploadObservableChain & {get: <R extends AssetUploadRequest>(request: R, defaultValue?: FieldsSelection<AssetUpload, R>) => Observable<FieldsSelection<AssetUpload, R>>}),
    updateModulePrivileges: ((args: {privileges?: (UpdateGrantedPrivilegesInput[] | null),metadataObjectId: Scalars['String']}) => ModuleObservableChain & {get: <R extends ModuleRequest>(request: R, defaultValue?: FieldsSelection<Module, R>) => Observable<FieldsSelection<Module, R>>}),
    createDataPropertyTime: ((args: {dataProperty: CreateDataPropertyTimeInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateDataPropertyFile: ((args: {dataProperty: UpdateDataPropertyFileInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateDataPropertyMultiSelection: ((args: {dataProperty: UpdateDataPropertyMultiSelectionInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    archiveThread: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateDataPropertyVersion: ((args: {dataProperty: UpdateDataPropertyVersionInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateDataPropertyObject: ((args: {dataProperty: UpdateDataPropertyObjectInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    createDataPropertyDate: ((args: {dataProperty: CreateDataPropertyDateInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateDataPropertySequence: ((args: {dataProperty: UpdateDataPropertySequenceInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateReferenceMetadataObjectPermissions: ((args: {referenceMetadataObjectId: Scalars['String'],permissions?: (UpdateGrantedPermissionsInput[] | null)}) => ReferenceMetadataObjectObservableChain & {get: <R extends ReferenceMetadataObjectRequest>(request: R, defaultValue?: FieldsSelection<ReferenceMetadataObject, R>) => Observable<FieldsSelection<ReferenceMetadataObject, R>>}),
    joinToPublicRoom: ((args: {id: Scalars['ID']}) => DiscussionRoomObservableChain & {get: <R extends DiscussionRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoom, R>) => Observable<FieldsSelection<DiscussionRoom, R>>}),
    archiveMetaDataObject: ((args: {id: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateDataPropertySelection: ((args: {dataProperty: UpdateDataPropertySelectionInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    republishDataObject: ((args: {publishDataObjectInput: PublishDataObjectInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createGroup: ((args: {group: CreateGroupInput}) => GroupObservableChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Observable<FieldsSelection<Group, R>>}),
    updateDataPropertyStatus: ((args: {dataProperty: UpdateDataPropertyStatusInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    unarchiveMetaDataObject: ((args: {id: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    changeDataObjectOwner: ((args: {owner: Scalars['String'],id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateDataPropertyObjects: ((args: {dataProperty: UpdateDataPropertyObjectsInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    deleteMetaDataObject: ((args: {id: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updatePostTemplate: ((args: {postTemplate: UpdatePostTemplateInput}) => PostTemplateObservableChain & {get: <R extends PostTemplateRequest>(request: R, defaultValue?: FieldsSelection<PostTemplate, R>) => Observable<FieldsSelection<PostTemplate, R>>}),
    updateTheme: ((args: {theme: UpdateThemeInput}) => ThemeObservableChain & {get: <R extends ThemeRequest>(request: R, defaultValue?: FieldsSelection<Theme, R>) => Observable<FieldsSelection<Theme, R>>}),
    createThread: ((args: {thread: CreateDiscussionThreadInput}) => DiscussionThreadObservableChain & {get: <R extends DiscussionThreadRequest>(request: R, defaultValue?: FieldsSelection<DiscussionThread, R>) => Observable<FieldsSelection<DiscussionThread, R>>}),
    createApiSpecsGroup: ((args: {apiSpecsGroup: CreateApiSpecsGroupInput}) => ApiSpecsGroupObservableChain & {get: <R extends ApiSpecsGroupRequest>(request: R, defaultValue?: FieldsSelection<ApiSpecsGroup, R>) => Observable<FieldsSelection<ApiSpecsGroup, R>>}),
    createDataPropertyInteger: ((args: {dataProperty: CreateDataPropertyIntegerInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    createDataObjectVersion: ((args: {createVersionInput: CreateDataObjectVersionInput}) => DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Observable<FieldsSelection<DataObject, R>>}),
    createMessage: ((args: {message: CreateDiscussionMessageInput}) => DiscussionMessageObservableChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessage, R>) => Observable<FieldsSelection<DiscussionMessage, R>>}),
    updateHtmlWidget: ((args: {htmlWidget: UpdateHtmlWidgetInput}) => HtmlWidgetObservableChain & {get: <R extends HtmlWidgetRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidget, R>) => Observable<FieldsSelection<HtmlWidget, R>>}),
    updateApiSpecsGroup: ((args: {apiSpecsGroup: UpdateApiSpecsGroupInput}) => ApiSpecsGroupObservableChain & {get: <R extends ApiSpecsGroupRequest>(request: R, defaultValue?: FieldsSelection<ApiSpecsGroup, R>) => Observable<FieldsSelection<ApiSpecsGroup, R>>}),
    createDataObject: ((args: {object: CreateDataObjectInput}) => DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Observable<FieldsSelection<DataObject, R>>}),
    createCollection: ((args: {collectionPath: Scalars['String'],collectionDescription?: (Scalars['String'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    restoreDataObjectVersion: ((args: {versionId: Scalars['ID']}) => DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Observable<FieldsSelection<DataObject, R>>}),
    updateDataPropertyAttributes: ((args: {dataProperty: UpdateDataPropertyAttributesInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    createDataObjectFromTemplate: ((args: {object: CreateDataObjectFromTemplateInput}) => DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Observable<FieldsSelection<DataObject, R>>}),
    updateBpmnMessage: ((args: {dataProperty: UpdateBpmnMessageInput}) => BpmnMessageObservableChain & {get: <R extends BpmnMessageRequest>(request: R, defaultValue?: FieldsSelection<BpmnMessage, R>) => Observable<FieldsSelection<BpmnMessage, R>>}),
    updateDataPropertyUser: ((args: {dataProperty: UpdateDataPropertyUserInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateDataPropertyUsers: ((args: {dataProperty: UpdateDataPropertyUsersInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    moveDataObjectBulk: ((args: {targetId: Scalars['ID'],ids: Scalars['ID'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    setMembersForRole: ((args: {members: MemberInput[],name: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createDataPropertyObjects: ((args: {dataProperty: CreateDataPropertyObjectsInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    removeObjectsFromFavorites: ((args: {objectIds: (Scalars['String'] | null)[]}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R>[] | undefined)) => Observable<(FieldsSelection<DataObject, R>[] | undefined)>}),
    updateDataPropertyTime: ((args: {dataProperty: UpdateDataPropertyTimeInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    stopImportMetadataTool: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateReferenceDataGroup: ((args: {referenceDataGroup: UpdateReferenceDataGroupInput}) => ReferenceDataGroupObservableChain & {get: <R extends ReferenceDataGroupRequest>(request: R, defaultValue?: FieldsSelection<ReferenceDataGroup, R>) => Observable<FieldsSelection<ReferenceDataGroup, R>>}),
    sendEmail: ((args: {sendEmailInput: SendEmailInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    restoreUser: ((args: {uid: Scalars['String']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    saveViewCustomization: ((args: {customization: ViewCustomizationInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    failAssetUploads: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    changeDataObjectOwnerBulk: ((args: {owner: Scalars['String'],objectIds: Scalars['ID'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createDirectMessagesRoom: ((args: {room: CreateDiscussionDirectMessagesRoomInput}) => DiscussionDirectMessagesRoomObservableChain & {get: <R extends DiscussionDirectMessagesRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionDirectMessagesRoom, R>) => Observable<FieldsSelection<DiscussionDirectMessagesRoom, R>>}),
    createDataPropertyObjectFilter: ((args: {dataProperty: CreateDataPropertyObjectFilterInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    changeStatusAndUpdateDataObject: ((args: {currentState?: (Scalars['String'] | null),object: UpdateDataObjectInput,status: (Scalars['String'] | null)[]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateSavedSearch: ((args: {savedSearch: UpdateSavedSearchInput}) => SavedSearchObservableChain & {get: <R extends SavedSearchRequest>(request: R, defaultValue?: FieldsSelection<SavedSearch, R>) => Observable<FieldsSelection<SavedSearch, R>>}),
    unpublishDataObject: ((args: {unpublishDataObjectInput: UnpublishDataObjectInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateReferenceDataType: ((args: {referenceDataType: UpdateReferenceDataTypeInput}) => ReferenceDataTypeObservableChain & {get: <R extends ReferenceDataTypeRequest>(request: R, defaultValue?: FieldsSelection<ReferenceDataType, R>) => Observable<FieldsSelection<ReferenceDataType, R>>}),
    unarchiveThread: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    publishDataObject: ((args: {publishDataObjectInput: PublishDataObjectInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createPostTemplate: ((args: {postTemplate: CreatePostTemplateInput}) => PostTemplateObservableChain & {get: <R extends PostTemplateRequest>(request: R, defaultValue?: FieldsSelection<PostTemplate, R>) => Observable<FieldsSelection<PostTemplate, R>>}),
    createDataPropertySelection: ((args: {dataProperty: CreateDataPropertySelectionInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateDataPropertyDate: ((args: {dataProperty: UpdateDataPropertyDateInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateWorkspacePermissions: ((args: {permissions?: (UpdateGrantedPermissionsInput[] | null),metadataObjectId: Scalars['String']}) => WorkspaceObservableChain & {get: <R extends WorkspaceRequest>(request: R, defaultValue?: FieldsSelection<Workspace, R>) => Observable<FieldsSelection<Workspace, R>>}),
    createDataPropertyMultiSelection: ((args: {dataProperty: CreateDataPropertyMultiSelectionInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    readAllMessages: ((args: {parentId: Scalars['String']}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Observable<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    createWorkbench: ((args: {workbench: CreateWorkbenchInput}) => WorkbenchObservableChain & {get: <R extends WorkbenchRequest>(request: R, defaultValue?: FieldsSelection<Workbench, R>) => Observable<FieldsSelection<Workbench, R>>}),
    addObjectsToCollection: ((args: {collectionId: Scalars['String'],objectIds: (Scalars['String'] | null)[]}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R>[] | undefined)) => Observable<(FieldsSelection<DataObject, R>[] | undefined)>}),
    updateDataTypePrivileges: ((args: {privileges?: (UpdateGrantedPrivilegesInput[] | null),metadataObjectId: Scalars['String']}) => DataTypeObservableChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>) => Observable<FieldsSelection<DataType, R>>}),
    updateDataPropertyInteger: ((args: {dataProperty: UpdateDataPropertyIntegerInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    updateApiSpec: ((args: {apiSpec: UpdateApiSpecInput}) => ApiSpecObservableChain & {get: <R extends ApiSpecRequest>(request: R, defaultValue?: FieldsSelection<ApiSpec, R>) => Observable<FieldsSelection<ApiSpec, R>>}),
    updateHtmlWidgetGroup: ((args: {htmlWidgetGroup: UpdateHtmlWidgetGroupInput}) => HtmlWidgetGroupObservableChain & {get: <R extends HtmlWidgetGroupRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidgetGroup, R>) => Observable<FieldsSelection<HtmlWidgetGroup, R>>}),
    deleteGroupBulk: ((args: {names: Scalars['String'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateDataObject: ((args: {object: UpdateDataObjectInput}) => DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Observable<FieldsSelection<DataObject, R>>}),
    publish: ((args: {comment: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createDataPropertyAttributes: ((args: {dataProperty: CreateDataPropertyAttributesInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    createExternalGroup: ((args: {externalGroup: CreateOrUpdateExternalGroupInput}) => ExternalGroupMappingObservableChain & {get: <R extends ExternalGroupMappingRequest>(request: R, defaultValue?: FieldsSelection<ExternalGroupMapping, R>) => Observable<FieldsSelection<ExternalGroupMapping, R>>}),
    createDataPropertyDecimal: ((args: {dataProperty: CreateDataPropertyDecimalInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    recalcDataObjectFormulas: ((args: {id: Scalars['String']}) => DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Observable<FieldsSelection<DataObject, R>>}),
    updateModule: ((args: {module: UpdateModuleInput}) => ModuleObservableChain & {get: <R extends ModuleRequest>(request: R, defaultValue?: FieldsSelection<Module, R>) => Observable<FieldsSelection<Module, R>>}),
    createHtmlWidget: ((args: {htmlWidget: CreateHtmlWidgetInput}) => HtmlWidgetObservableChain & {get: <R extends HtmlWidgetRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidget, R>) => Observable<FieldsSelection<HtmlWidget, R>>}),
    deleteUserBulk: ((args: {names: Scalars['String'][]}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    updateDataPropertyString: ((args: {dataProperty: UpdateDataPropertyStringInput}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>})
}

export interface OAuth2ServiceProviderPromiseChain{
    authorizationServerUrl: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    clientId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    clientSecret: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    enabled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    requestTokenUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    scopes: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    serviceName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    tokenServerUrl: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    userAuthorizationUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface OAuth2ServiceProviderObservableChain{
    authorizationServerUrl: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    clientId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    clientSecret: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    enabled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    requestTokenUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    scopes: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    serviceName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    tokenServerUrl: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    userAuthorizationUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface OAuth2ServiceTokenPromiseChain{
    accessToken: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    clientId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    expirationTimeMilliseconds: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: (Scalars['Long'] | undefined)) => Promise<(Scalars['Long'] | undefined)>}),
    isShared: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    refreshToken: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    serviceLogin: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    serviceName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    sharedWith: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface OAuth2ServiceTokenObservableChain{
    accessToken: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    clientId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    expirationTimeMilliseconds: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: (Scalars['Long'] | undefined)) => Observable<(Scalars['Long'] | undefined)>}),
    isShared: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    refreshToken: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    serviceLogin: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    serviceName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    sharedWith: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface PageInfoPromiseChain{
    hasNextPage: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    hasPreviousPage: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    pageIndex: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    pageSize: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    totalCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>})
}

export interface PageInfoObservableChain{
    hasNextPage: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    hasPreviousPage: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    pageIndex: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    pageSize: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    totalCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>})
}

export interface PermissionPromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: PermissionEnum) => Promise<PermissionEnum>})
}

export interface PermissionObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: PermissionEnum) => Observable<PermissionEnum>})
}

export interface PostTemplatePromiseChain{
    bodyTemplate: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    subjectTemplate: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface PostTemplateObservableChain{
    bodyTemplate: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    subjectTemplate: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface PrivilegePromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: PrivilegeEnum) => Promise<PrivilegeEnum>})
}

export interface PrivilegeObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: PrivilegeEnum) => Observable<PrivilegeEnum>})
}

export interface PropertyGroupPromiseChain{
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    properties: ((args?: {propertyTypeEnum?: (PropertyTypeEnum | null)}) => {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>[]) => Promise<FieldsSelection<DataProperty, R>[]>})&({get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>[]) => Promise<FieldsSelection<DataProperty, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: (MetadataObjectStatusEnum | undefined)) => Promise<(MetadataObjectStatusEnum | undefined)>})
}

export interface PropertyGroupObservableChain{
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    properties: ((args?: {propertyTypeEnum?: (PropertyTypeEnum | null)}) => {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>[]) => Observable<FieldsSelection<DataProperty, R>[]>})&({get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>[]) => Observable<FieldsSelection<DataProperty, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: (MetadataObjectStatusEnum | undefined)) => Observable<(MetadataObjectStatusEnum | undefined)>})
}

export interface PropertyTypePromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    propertyTypeEnum: ({get: (request?: boolean|number, defaultValue?: PropertyTypeEnum) => Promise<PropertyTypeEnum>}),
    systemOnly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface PropertyTypeObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    propertyTypeEnum: ({get: (request?: boolean|number, defaultValue?: PropertyTypeEnum) => Observable<PropertyTypeEnum>}),
    systemOnly: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface PublishedApplicationPromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    htmlWidgets: ({get: <R extends PublishedHtmlWidgetRequest>(request: R, defaultValue?: FieldsSelection<PublishedHtmlWidget, R>[]) => Promise<FieldsSelection<PublishedHtmlWidget, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    modules: ({get: <R extends PublishedModuleRequest>(request: R, defaultValue?: FieldsSelection<PublishedModule, R>[]) => Promise<FieldsSelection<PublishedModule, R>[]>}),
    notificationJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    toolbarJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    workbenches: ({get: <R extends PublishedWorkbenchRequest>(request: R, defaultValue?: FieldsSelection<PublishedWorkbench, R>[]) => Promise<FieldsSelection<PublishedWorkbench, R>[]>})
}

export interface PublishedApplicationObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    htmlWidgets: ({get: <R extends PublishedHtmlWidgetRequest>(request: R, defaultValue?: FieldsSelection<PublishedHtmlWidget, R>[]) => Observable<FieldsSelection<PublishedHtmlWidget, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    modules: ({get: <R extends PublishedModuleRequest>(request: R, defaultValue?: FieldsSelection<PublishedModule, R>[]) => Observable<FieldsSelection<PublishedModule, R>[]>}),
    notificationJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    toolbarJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    workbenches: ({get: <R extends PublishedWorkbenchRequest>(request: R, defaultValue?: FieldsSelection<PublishedWorkbench, R>[]) => Observable<FieldsSelection<PublishedWorkbench, R>[]>})
}

export interface PublishedApplicationVersionPromiseChain{
    comment: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    publishDate: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    user: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    version: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface PublishedApplicationVersionObservableChain{
    comment: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    publishDate: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    user: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    version: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface PublishedApplicationVersionListPromiseChain{
    items: ({get: <R extends PublishedApplicationVersionRequest>(request: R, defaultValue?: FieldsSelection<PublishedApplicationVersion, R>[]) => Promise<FieldsSelection<PublishedApplicationVersion, R>[]>}),
    pageInfo: (PageInfoPromiseChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Promise<FieldsSelection<PageInfo, R>>})
}

export interface PublishedApplicationVersionListObservableChain{
    items: ({get: <R extends PublishedApplicationVersionRequest>(request: R, defaultValue?: FieldsSelection<PublishedApplicationVersion, R>[]) => Observable<FieldsSelection<PublishedApplicationVersion, R>[]>}),
    pageInfo: (PageInfoObservableChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Observable<FieldsSelection<PageInfo, R>>})
}

export interface PublishedDataTypePromiseChain{
    brandingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    canCreateAnother: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    dataTypeComment: (DataTypePromiseChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: (FieldsSelection<DataType, R> | undefined)) => Promise<(FieldsSelection<DataType, R> | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    exportViews: ({get: <R extends PublishedExportViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedExportView, R>[]) => Promise<FieldsSelection<PublishedExportView, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    lifecycle: (PublishedLifecyclePromiseChain & {get: <R extends PublishedLifecycleRequest>(request: R, defaultValue?: FieldsSelection<PublishedLifecycle, R>) => Promise<FieldsSelection<PublishedLifecycle, R>>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    publishedReportingView: (PublishedViewPromiseChain & {get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>) => Promise<FieldsSelection<PublishedView, R>>}),
    stateMachine: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface PublishedDataTypeObservableChain{
    brandingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    canCreateAnother: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    dataTypeComment: (DataTypeObservableChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: (FieldsSelection<DataType, R> | undefined)) => Observable<(FieldsSelection<DataType, R> | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    exportViews: ({get: <R extends PublishedExportViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedExportView, R>[]) => Observable<FieldsSelection<PublishedExportView, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    lifecycle: (PublishedLifecycleObservableChain & {get: <R extends PublishedLifecycleRequest>(request: R, defaultValue?: FieldsSelection<PublishedLifecycle, R>) => Observable<FieldsSelection<PublishedLifecycle, R>>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    publishedReportingView: (PublishedViewObservableChain & {get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>) => Observable<FieldsSelection<PublishedView, R>>}),
    stateMachine: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface PublishedExportViewPromiseChain{
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    fileProperty: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    group: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    template: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: (FieldsSelection<File, R> | undefined)) => Promise<(FieldsSelection<File, R> | undefined)>}),
    viewMode: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    viewTypeEnum: ({get: (request?: boolean|number, defaultValue?: (ViewTypeEnum | undefined)) => Promise<(ViewTypeEnum | undefined)>})
}

export interface PublishedExportViewObservableChain{
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    fileProperty: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    group: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    template: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: (FieldsSelection<File, R> | undefined)) => Observable<(FieldsSelection<File, R> | undefined)>}),
    viewMode: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    viewTypeEnum: ({get: (request?: boolean|number, defaultValue?: (ViewTypeEnum | undefined)) => Observable<(ViewTypeEnum | undefined)>})
}

export interface PublishedFilterPromiseChain{
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface PublishedFilterObservableChain{
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface PublishedHtmlWidgetPromiseChain{
    css: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    html: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    js: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    widgetJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface PublishedHtmlWidgetObservableChain{
    css: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    html: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    js: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    widgetJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface PublishedLifecyclePromiseChain{
    lifecycleJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface PublishedLifecycleObservableChain{
    lifecycleJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface PublishedModulePromiseChain{
    availableUsers: ({get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R>[] | undefined)) => Promise<(FieldsSelection<User, R>[] | undefined)>}),
    brandingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    dataTypes: ({get: <R extends PublishedDataTypeRequest>(request: R, defaultValue?: FieldsSelection<PublishedDataType, R>[]) => Promise<FieldsSelection<PublishedDataType, R>[]>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    filters: ({get: <R extends PublishedFilterRequest>(request: R, defaultValue?: FieldsSelection<PublishedFilter, R>[]) => Promise<FieldsSelection<PublishedFilter, R>[]>}),
    icon: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Promise<FieldsSelection<File, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    import: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    lifecycleStates: ({get: <R extends LifecycleStateRequest>(request: R, defaultValue?: FieldsSelection<LifecycleState, R>[]) => Promise<FieldsSelection<LifecycleState, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    properties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    searchPage: (SystemPagePromiseChain & {get: <R extends SystemPageRequest>(request: R, defaultValue?: FieldsSelection<SystemPage, R>) => Promise<FieldsSelection<SystemPage, R>>}),
    templatesPage: (SystemPagePromiseChain & {get: <R extends SystemPageRequest>(request: R, defaultValue?: FieldsSelection<SystemPage, R>) => Promise<FieldsSelection<SystemPage, R>>}),
    userPrivileges: ({get: (request?: boolean|number, defaultValue?: PrivilegeEnum[]) => Promise<PrivilegeEnum[]>}),
    workspaces: ({get: <R extends PublishedWorkspaceRequest>(request: R, defaultValue?: FieldsSelection<PublishedWorkspace, R>[]) => Promise<FieldsSelection<PublishedWorkspace, R>[]>})
}

export interface PublishedModuleObservableChain{
    availableUsers: ({get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R>[] | undefined)) => Observable<(FieldsSelection<User, R>[] | undefined)>}),
    brandingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    dataTypes: ({get: <R extends PublishedDataTypeRequest>(request: R, defaultValue?: FieldsSelection<PublishedDataType, R>[]) => Observable<FieldsSelection<PublishedDataType, R>[]>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    filters: ({get: <R extends PublishedFilterRequest>(request: R, defaultValue?: FieldsSelection<PublishedFilter, R>[]) => Observable<FieldsSelection<PublishedFilter, R>[]>}),
    icon: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Observable<FieldsSelection<File, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    import: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    lifecycleStates: ({get: <R extends LifecycleStateRequest>(request: R, defaultValue?: FieldsSelection<LifecycleState, R>[]) => Observable<FieldsSelection<LifecycleState, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    properties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    searchPage: (SystemPageObservableChain & {get: <R extends SystemPageRequest>(request: R, defaultValue?: FieldsSelection<SystemPage, R>) => Observable<FieldsSelection<SystemPage, R>>}),
    templatesPage: (SystemPageObservableChain & {get: <R extends SystemPageRequest>(request: R, defaultValue?: FieldsSelection<SystemPage, R>) => Observable<FieldsSelection<SystemPage, R>>}),
    userPrivileges: ({get: (request?: boolean|number, defaultValue?: PrivilegeEnum[]) => Observable<PrivilegeEnum[]>}),
    workspaces: ({get: <R extends PublishedWorkspaceRequest>(request: R, defaultValue?: FieldsSelection<PublishedWorkspace, R>[]) => Observable<FieldsSelection<PublishedWorkspace, R>[]>})
}

export interface PublishedViewPromiseChain{
    childrenTypes: ({get: <R extends PublishedDataTypeRequest>(request: R, defaultValue?: FieldsSelection<PublishedDataType, R>[]) => Promise<FieldsSelection<PublishedDataType, R>[]>}),
    contextId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    customFilterId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    defaultView: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    idCopy: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    import: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    objectId: ({get: (request?: boolean|number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)>}),
    parentForCreation: ({get: (request?: boolean|number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)>}),
    properties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: ((FieldsSelection<PropertyGroup, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<PropertyGroup, R> | undefined)[] | undefined)>}),
    sortingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    upload: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    viewJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    viewMode: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    viewType: ({get: (request?: boolean|number, defaultValue?: ViewTypeEnum) => Promise<ViewTypeEnum>})
}

export interface PublishedViewObservableChain{
    childrenTypes: ({get: <R extends PublishedDataTypeRequest>(request: R, defaultValue?: FieldsSelection<PublishedDataType, R>[]) => Observable<FieldsSelection<PublishedDataType, R>[]>}),
    contextId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    customFilterId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    defaultView: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    idCopy: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    import: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    objectId: ({get: (request?: boolean|number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)>}),
    parentForCreation: ({get: (request?: boolean|number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)>}),
    properties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: ((FieldsSelection<PropertyGroup, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<PropertyGroup, R> | undefined)[] | undefined)>}),
    sortingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    upload: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    viewJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    viewMode: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    viewType: ({get: (request?: boolean|number, defaultValue?: ViewTypeEnum) => Observable<ViewTypeEnum>})
}

export interface PublishedWorkbenchPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    menuJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Promise<FieldsSelection<Role, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>})
}

export interface PublishedWorkbenchObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    menuJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Observable<FieldsSelection<Role, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>})
}

export interface PublishedWorkspacePromiseChain{
    brandingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    icon: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Promise<FieldsSelection<File, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    import: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    objectId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    userPrivileges: ({get: (request?: boolean|number, defaultValue?: PrivilegeEnum[]) => Promise<PrivilegeEnum[]>})
}

export interface PublishedWorkspaceObservableChain{
    brandingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    icon: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Observable<FieldsSelection<File, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    import: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    objectId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    userPrivileges: ({get: (request?: boolean|number, defaultValue?: PrivilegeEnum[]) => Observable<PrivilegeEnum[]>})
}


/** Query root */
export interface QueryPromiseChain{
    publishedTypeFilters: ((args?: {dataTypeId?: (Scalars['String'] | null)}) => {get: <R extends TypeFilterRequest>(request: R, defaultValue?: FieldsSelection<TypeFilter, R>[]) => Promise<FieldsSelection<TypeFilter, R>[]>})&({get: <R extends TypeFilterRequest>(request: R, defaultValue?: FieldsSelection<TypeFilter, R>[]) => Promise<FieldsSelection<TypeFilter, R>[]>}),
    setting: ((args: {key: Scalars['String']}) => SettingPromiseChain & {get: <R extends SettingRequest>(request: R, defaultValue?: FieldsSelection<Setting, R>) => Promise<FieldsSelection<Setting, R>>}),
    fixWorkbenches: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    module: ((args: {id: Scalars['String']}) => ModulePromiseChain & {get: <R extends ModuleRequest>(request: R, defaultValue?: FieldsSelection<Module, R>) => Promise<FieldsSelection<Module, R>>}),
    profile: ((args?: {username?: (Scalars['String'] | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    dataObjectStatusOptions: ((args: {currentState?: (Scalars['String'] | null),objectId: Scalars['ID']}) => {get: <R extends LifecycleTransitionRequest>(request: R, defaultValue?: FieldsSelection<LifecycleTransition, R>[]) => Promise<FieldsSelection<LifecycleTransition, R>[]>}),
    aggredatedDataObjects: ((args: {params: ListParametersInput}) => DataObjectListPromiseChain & {get: <R extends DataObjectListRequest>(request: R, defaultValue?: FieldsSelection<DataObjectList, R>) => Promise<FieldsSelection<DataObjectList, R>>}),
    userSelectionOptions: ((args: {selectionParameters: UserSelectionOptionsInput}) => {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>[]) => Promise<FieldsSelection<User, R>[]>}),
    isApiSpecValid: ((args: {apiSpec: ValidateApiSpecInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    dateDisplayFormats: ({get: <R extends DateDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<DateDisplayFormat, R>[]) => Promise<FieldsSelection<DateDisplayFormat, R>[]>}),
    role: ((args: {id: Scalars['String']}) => RolePromiseChain & {get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>) => Promise<FieldsSelection<Role, R>>}),
    isLifecycleValid: ((args: {lifecycle: ValidateLifecycleInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    savedSearch: ((args: {id: Scalars['String']}) => SavedSearchPromiseChain & {get: <R extends SavedSearchRequest>(request: R, defaultValue?: FieldsSelection<SavedSearch, R>) => Promise<FieldsSelection<SavedSearch, R>>}),
    publishedApplication: (PublishedApplicationPromiseChain & {get: <R extends PublishedApplicationRequest>(request: R, defaultValue?: FieldsSelection<PublishedApplication, R>) => Promise<FieldsSelection<PublishedApplication, R>>}),
    validationResults: ((args?: {severity?: (Scalars['String'] | null)}) => {get: <R extends ValidationResultsRequest>(request: R, defaultValue?: (FieldsSelection<ValidationResults, R> | undefined)[]) => Promise<(FieldsSelection<ValidationResults, R> | undefined)[]>})&({get: <R extends ValidationResultsRequest>(request: R, defaultValue?: (FieldsSelection<ValidationResults, R> | undefined)[]) => Promise<(FieldsSelection<ValidationResults, R> | undefined)[]>}),
    
/** Get template by id if user has privileges to data type. */
dataObjectTemplate: ((args: {id: Scalars['String']}) => DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Promise<FieldsSelection<DataObject, R>>}),
    userCollections: ((args: {searchTerm: Scalars['String']}) => {get: <R extends CollectionRequest>(request: R, defaultValue?: ((FieldsSelection<Collection, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Collection, R> | undefined)[] | undefined)>}),
    serviceDtoJson: ((args: {id: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    dataProperty: ((args: {id: Scalars['String']}) => DataPropertyPromiseChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Promise<FieldsSelection<DataProperty, R>>}),
    auditLogEntries: ((args?: {params?: (ListParametersInput | null)}) => AuditLogEntriesListPromiseChain & {get: <R extends AuditLogEntriesListRequest>(request: R, defaultValue?: FieldsSelection<AuditLogEntriesList, R>) => Promise<FieldsSelection<AuditLogEntriesList, R>>})&(AuditLogEntriesListPromiseChain & {get: <R extends AuditLogEntriesListRequest>(request: R, defaultValue?: FieldsSelection<AuditLogEntriesList, R>) => Promise<FieldsSelection<AuditLogEntriesList, R>>}),
    htmlWidgetGroup: ((args: {id: Scalars['String']}) => HtmlWidgetGroupPromiseChain & {get: <R extends HtmlWidgetGroupRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidgetGroup, R>) => Promise<FieldsSelection<HtmlWidgetGroup, R>>}),
    privileges: ((args: {includeModuleOnly?: (Scalars['Boolean'] | null),moduleId: Scalars['String']}) => {get: <R extends PrivilegeRequest>(request: R, defaultValue?: FieldsSelection<Privilege, R>[]) => Promise<FieldsSelection<Privilege, R>[]>}),
    workspace: ((args: {id: Scalars['String']}) => WorkspacePromiseChain & {get: <R extends WorkspaceRequest>(request: R, defaultValue?: FieldsSelection<Workspace, R>) => Promise<FieldsSelection<Workspace, R>>}),
    htmlWidget: ((args: {id: Scalars['String']}) => HtmlWidgetPromiseChain & {get: <R extends HtmlWidgetRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidget, R>) => Promise<FieldsSelection<HtmlWidget, R>>}),
    lifecycle: ((args: {id: Scalars['String']}) => LifecyclePromiseChain & {get: <R extends LifecycleRequest>(request: R, defaultValue?: FieldsSelection<Lifecycle, R>) => Promise<FieldsSelection<Lifecycle, R>>}),
    view: ((args: {id: Scalars['String']}) => ViewPromiseChain & {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>) => Promise<FieldsSelection<View, R>>}),
    versionDisplayFormats: ({get: <R extends VersionDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<VersionDisplayFormat, R>[]) => Promise<FieldsSelection<VersionDisplayFormat, R>[]>}),
    workbench: ((args: {id: Scalars['String']}) => WorkbenchPromiseChain & {get: <R extends WorkbenchRequest>(request: R, defaultValue?: FieldsSelection<Workbench, R>) => Promise<FieldsSelection<Workbench, R>>}),
    isDataObjectValid: ((args: {dataObject: ValidateDataObjectInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isRoleValid: ((args: {role: ValidateRoleInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    availableMembersForGroup: ((args: {name?: (Scalars['String'] | null),params: ListParametersInput}) => {get: <R extends MemberRequest>(request: R, defaultValue?: FieldsSelection<Member, R>[]) => Promise<FieldsSelection<Member, R>[]>}),
    dataObjectSelectionView: ((args: {customContextJson?: (Scalars['String'] | null),key: Scalars['String']}) => PublishedViewPromiseChain & {get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>) => Promise<FieldsSelection<PublishedView, R>>}),
    passwordResetKeyValid: ((args: {key: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    dataType: ((args: {id: Scalars['String']}) => DataTypePromiseChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>) => Promise<FieldsSelection<DataType, R>>}),
    externalGroups: ((args?: {params?: (ExternalGroupListParametersInput | null)}) => ExternalGroupListPromiseChain & {get: <R extends ExternalGroupListRequest>(request: R, defaultValue?: FieldsSelection<ExternalGroupList, R>) => Promise<FieldsSelection<ExternalGroupList, R>>})&(ExternalGroupListPromiseChain & {get: <R extends ExternalGroupListRequest>(request: R, defaultValue?: FieldsSelection<ExternalGroupList, R>) => Promise<FieldsSelection<ExternalGroupList, R>>}),
    dataObjectVersions: ((args: {id: Scalars['ID']}) => {get: <R extends VersionRequest>(request: R, defaultValue?: FieldsSelection<Version, R>[]) => Promise<FieldsSelection<Version, R>[]>}),
    users: ((args?: {params?: (ListParametersInput | null)}) => UserListPromiseChain & {get: <R extends UserListRequest>(request: R, defaultValue?: FieldsSelection<UserList, R>) => Promise<FieldsSelection<UserList, R>>})&(UserListPromiseChain & {get: <R extends UserListRequest>(request: R, defaultValue?: FieldsSelection<UserList, R>) => Promise<FieldsSelection<UserList, R>>}),
    trashableUsers: ((args?: {params?: (TrashableListParametersInput | null)}) => UserListPromiseChain & {get: <R extends UserListRequest>(request: R, defaultValue?: FieldsSelection<UserList, R>) => Promise<FieldsSelection<UserList, R>>})&(UserListPromiseChain & {get: <R extends UserListRequest>(request: R, defaultValue?: FieldsSelection<UserList, R>) => Promise<FieldsSelection<UserList, R>>}),
    objectsFromFavorites: ((args: {params: ListParametersInput}) => DataObjectListPromiseChain & {get: <R extends DataObjectListRequest>(request: R, defaultValue?: (FieldsSelection<DataObjectList, R> | undefined)) => Promise<(FieldsSelection<DataObjectList, R> | undefined)>}),
    auditUsers: ((args?: {params?: (ListParametersInput | null)}) => UserListPromiseChain & {get: <R extends UserListRequest>(request: R, defaultValue?: FieldsSelection<UserList, R>) => Promise<FieldsSelection<UserList, R>>})&(UserListPromiseChain & {get: <R extends UserListRequest>(request: R, defaultValue?: FieldsSelection<UserList, R>) => Promise<FieldsSelection<UserList, R>>}),
    isLoggedIn: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    apiSpec: ((args: {id: Scalars['String']}) => ApiSpecPromiseChain & {get: <R extends ApiSpecRequest>(request: R, defaultValue?: FieldsSelection<ApiSpec, R>) => Promise<FieldsSelection<ApiSpec, R>>}),
    dataObjects: ((args: {params: ListParametersInput}) => DataObjectListPromiseChain & {get: <R extends DataObjectListRequest>(request: R, defaultValue?: FieldsSelection<DataObjectList, R>) => Promise<FieldsSelection<DataObjectList, R>>}),
    roles: ((args?: {params?: (ListParametersInput | null)}) => RoleListPromiseChain & {get: <R extends RoleListRequest>(request: R, defaultValue?: FieldsSelection<RoleList, R>) => Promise<FieldsSelection<RoleList, R>>})&(RoleListPromiseChain & {get: <R extends RoleListRequest>(request: R, defaultValue?: FieldsSelection<RoleList, R>) => Promise<FieldsSelection<RoleList, R>>}),
    isWorkbenchValid: ((args: {workbench: ValidateWorkbenchInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    postTemplate: ((args: {id: Scalars['String']}) => PostTemplatePromiseChain & {get: <R extends PostTemplateRequest>(request: R, defaultValue?: FieldsSelection<PostTemplate, R>) => Promise<FieldsSelection<PostTemplate, R>>}),
    textFormatTypes: ({get: <R extends TextFormatTypeRequest>(request: R, defaultValue?: FieldsSelection<TextFormatType, R>[]) => Promise<FieldsSelection<TextFormatType, R>[]>}),
    isGroupValid: ((args: {group: ValidateGroupInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isReferenceDataTypeValid: ((args: {referenceDataType: ValidateReferenceDataTypeInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    workbenches: ({get: <R extends WorkbenchRequest>(request: R, defaultValue?: FieldsSelection<Workbench, R>[]) => Promise<FieldsSelection<Workbench, R>[]>}),
    canChangeMetadataObjectStatus: ((args: {action: MetadataObjectChangeStatusActionsEnum,ids?: (Scalars['String'][] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    savedSearches: ((args?: {moduleId?: (Scalars['String'] | null)}) => {get: <R extends SavedSearchRequest>(request: R, defaultValue?: FieldsSelection<SavedSearch, R>[]) => Promise<FieldsSelection<SavedSearch, R>[]>})&({get: <R extends SavedSearchRequest>(request: R, defaultValue?: FieldsSelection<SavedSearch, R>[]) => Promise<FieldsSelection<SavedSearch, R>[]>}),
    getCollection: ((args: {collectionPath: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isObjectInFavorites: ((args: {objectId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    publicRooms: ((args?: {params?: (ListParametersInput | null)}) => DiscussionRoomListPromiseChain & {get: <R extends DiscussionRoomListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoomList, R>) => Promise<FieldsSelection<DiscussionRoomList, R>>})&(DiscussionRoomListPromiseChain & {get: <R extends DiscussionRoomListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoomList, R>) => Promise<FieldsSelection<DiscussionRoomList, R>>}),
    booleanDisplayFormats: ({get: <R extends BooleanDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<BooleanDisplayFormat, R>[]) => Promise<FieldsSelection<BooleanDisplayFormat, R>[]>}),
    message: ((args: {messageId: Scalars['String']}) => DiscussionMessagePromiseChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessage, R>) => Promise<FieldsSelection<DiscussionMessage, R>>}),
    room: ((args: {id: Scalars['ID']}) => DiscussionRoomPromiseChain & {get: <R extends DiscussionRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoom, R>) => Promise<FieldsSelection<DiscussionRoom, R>>}),
    isPostTemplateValid: ((args: {postTemplate: ValidatePostTemplateInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    bpmnProcessType: ((args: {id: Scalars['String']}) => BpmnProcessTypePromiseChain & {get: <R extends BpmnProcessTypeRequest>(request: R, defaultValue?: FieldsSelection<BpmnProcessType, R>) => Promise<FieldsSelection<BpmnProcessType, R>>}),
    systemDefaults: (SystemDefaultsPromiseChain & {get: <R extends SystemDefaultsRequest>(request: R, defaultValue?: FieldsSelection<SystemDefaults, R>) => Promise<FieldsSelection<SystemDefaults, R>>}),
    
/** Get list of all available templates, filtered by user data type privileges. */
dataObjectTemplates: ((args: {dataTypeIds?: (Scalars['String'][] | null),parentId: Scalars['String']}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Promise<FieldsSelection<DataObject, R>[]>}),
    propertyTypes: ({get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>[]) => Promise<FieldsSelection<PropertyType, R>[]>}),
    isTypeFilterValid: ((args: {filter: ValidateTypeFilterInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    availableSelections: ((args: {referenceDataTypeId: Scalars['String'],parentId: Scalars['String']}) => {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>[]) => Promise<FieldsSelection<DataProperty, R>[]>}),
    publishedViews: ((args: {params: ViewParametersInput}) => {get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>[]) => Promise<FieldsSelection<PublishedView, R>[]>}),
    referenceMetadataObjects: ((args?: {includeArchived?: (Scalars['Boolean'] | null),parentId?: (Scalars['String'] | null),objectType?: (ReferenceMetadataObjectTypeEnum | null)}) => {get: <R extends ReferenceMetadataObjectRequest>(request: R, defaultValue?: FieldsSelection<ReferenceMetadataObject, R>[]) => Promise<FieldsSelection<ReferenceMetadataObject, R>[]>})&({get: <R extends ReferenceMetadataObjectRequest>(request: R, defaultValue?: FieldsSelection<ReferenceMetadataObject, R>[]) => Promise<FieldsSelection<ReferenceMetadataObject, R>[]>}),
    isDataPropertyValid: ((args: {property: ValidateDataPropertyInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    currentUserRooms: ((args?: {params?: (ListParametersInput | null)}) => DiscussionRoomListPromiseChain & {get: <R extends DiscussionRoomListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoomList, R>) => Promise<FieldsSelection<DiscussionRoomList, R>>})&(DiscussionRoomListPromiseChain & {get: <R extends DiscussionRoomListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoomList, R>) => Promise<FieldsSelection<DiscussionRoomList, R>>}),
    nextMessages: ((args: {count: Scalars['Int'],messageId: Scalars['String']}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Promise<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    isUserValid: ((args: {user: ValidateUserInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    permissions: ((args: {moduleId: Scalars['String']}) => {get: <R extends PermissionRequest>(request: R, defaultValue?: FieldsSelection<Permission, R>[]) => Promise<FieldsSelection<Permission, R>[]>}),
    defaultResources: (DefaultResourcesPromiseChain & {get: <R extends DefaultResourcesRequest>(request: R, defaultValue?: FieldsSelection<DefaultResources, R>) => Promise<FieldsSelection<DefaultResources, R>>}),
    enabledLocales: ({get: <R extends LocaleOptionRequest>(request: R, defaultValue?: (FieldsSelection<LocaleOption, R> | undefined)[]) => Promise<(FieldsSelection<LocaleOption, R> | undefined)[]>}),
    apiSpecsGroup: ((args: {id: Scalars['String']}) => ApiSpecsGroupPromiseChain & {get: <R extends ApiSpecsGroupRequest>(request: R, defaultValue?: FieldsSelection<ApiSpecsGroup, R>) => Promise<FieldsSelection<ApiSpecsGroup, R>>}),
    bpmnMessage: ((args: {id: Scalars['String']}) => BpmnMessagePromiseChain & {get: <R extends BpmnMessageRequest>(request: R, defaultValue?: FieldsSelection<BpmnMessage, R>) => Promise<FieldsSelection<BpmnMessage, R>>}),
    publishedAggregatedViews: ((args: {route: Scalars['String']}) => {get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>[]) => Promise<FieldsSelection<PublishedView, R>[]>}),
    typeFilter: ((args: {id: Scalars['String']}) => TypeFilterPromiseChain & {get: <R extends TypeFilterRequest>(request: R, defaultValue?: FieldsSelection<TypeFilter, R>) => Promise<FieldsSelection<TypeFilter, R>>}),
    apiSpecsGroups: ((args: {parentId: Scalars['String']}) => {get: <R extends ApiSpecsGroupRequest>(request: R, defaultValue?: FieldsSelection<ApiSpecsGroup, R>[]) => Promise<FieldsSelection<ApiSpecsGroup, R>[]>}),
    dataObjectVersionOptions: ((args: {id: Scalars['ID']}) => {get: <R extends VersionIncrementRequest>(request: R, defaultValue?: FieldsSelection<VersionIncrement, R>[]) => Promise<FieldsSelection<VersionIncrement, R>[]>}),
    objectsFromCollection: ((args: {params: ListParametersInput}) => DataObjectListPromiseChain & {get: <R extends DataObjectListRequest>(request: R, defaultValue?: (FieldsSelection<DataObjectList, R> | undefined)) => Promise<(FieldsSelection<DataObjectList, R> | undefined)>}),
    analyzerMap: ({get: (request?: boolean|number, defaultValue?: Scalars['Map_String_StringScalar']) => Promise<Scalars['Map_String_StringScalar']>}),
    assetUploads: ((args?: {batchIds?: (Scalars['String'][] | null),params?: (ListParametersInput | null)}) => AssetUploadListPromiseChain & {get: <R extends AssetUploadListRequest>(request: R, defaultValue?: FieldsSelection<AssetUploadList, R>) => Promise<FieldsSelection<AssetUploadList, R>>})&(AssetUploadListPromiseChain & {get: <R extends AssetUploadListRequest>(request: R, defaultValue?: FieldsSelection<AssetUploadList, R>) => Promise<FieldsSelection<AssetUploadList, R>>}),
    isDataObjectValid2: ((args: {dataObject: ValidateDataObjectInput}) => DataObjectChangesPromiseChain & {get: <R extends DataObjectChangesRequest>(request: R, defaultValue?: FieldsSelection<DataObjectChanges, R>) => Promise<FieldsSelection<DataObjectChanges, R>>}),
    isModuleValid: ((args: {module: ValidateModuleInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    theme: (ThemePromiseChain & {get: <R extends ThemeRequest>(request: R, defaultValue?: FieldsSelection<Theme, R>) => Promise<FieldsSelection<Theme, R>>}),
    isDataTypeValid: ((args: {dataType: ValidateDataTypeInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isReferenceDataGroupValid: ((args: {referenceDataGroup: ValidateReferenceDataGroupInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isApiSpecsGroupValid: ((args: {apiSpecsGroup: ValidateApiSpecsGroupInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    publishedApplicationVersions: ((args?: {params?: (ListParametersInput | null)}) => PublishedApplicationVersionListPromiseChain & {get: <R extends PublishedApplicationVersionListRequest>(request: R, defaultValue?: FieldsSelection<PublishedApplicationVersionList, R>) => Promise<FieldsSelection<PublishedApplicationVersionList, R>>})&(PublishedApplicationVersionListPromiseChain & {get: <R extends PublishedApplicationVersionListRequest>(request: R, defaultValue?: FieldsSelection<PublishedApplicationVersionList, R>) => Promise<FieldsSelection<PublishedApplicationVersionList, R>>}),
    filter: ((args: {id: Scalars['String']}) => SystemFilterPromiseChain & {get: <R extends SystemFilterRequest>(request: R, defaultValue?: FieldsSelection<SystemFilter, R>) => Promise<FieldsSelection<SystemFilter, R>>}),
    viewTypes: ({get: <R extends ViewTypeRequest>(request: R, defaultValue?: FieldsSelection<ViewType, R>[]) => Promise<FieldsSelection<ViewType, R>[]>}),
    canDeleteLifecycleState: ((args: {state: Scalars['String'],lifecycleId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    previousMessages: ((args: {count: Scalars['Int'],messageId: Scalars['String']}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Promise<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    validateUpdateUserPassword: ((args: {oldPassword: Scalars['String'],name: Scalars['String'],newPassword: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    translate: ((args: {sourceLocale: Scalars['String'],targetLocales: (Scalars['String'] | null)[],value: Scalars['String']}) => TranslatePromiseChain & {get: <R extends TranslateRequest>(request: R, defaultValue?: FieldsSelection<Translate, R>) => Promise<FieldsSelection<Translate, R>>}),
    publishedModuleFilters: ((args?: {moduleId?: (Scalars['String'] | null)}) => {get: <R extends SystemFilterRequest>(request: R, defaultValue?: FieldsSelection<SystemFilter, R>[]) => Promise<FieldsSelection<SystemFilter, R>[]>})&({get: <R extends SystemFilterRequest>(request: R, defaultValue?: FieldsSelection<SystemFilter, R>[]) => Promise<FieldsSelection<SystemFilter, R>[]>}),
    routes: ({get: <R extends RouteRequest>(request: R, defaultValue?: FieldsSelection<Route, R>[]) => Promise<FieldsSelection<Route, R>[]>}),
    publishedFilterViews: ((args: {params: FilterViewParametersInput}) => {get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>[]) => Promise<FieldsSelection<PublishedView, R>[]>}),
    isBpmnMessageValid: ((args: {property: ValidateBpmnMessageInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    group: ((args: {name: Scalars['String']}) => GroupPromiseChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Promise<FieldsSelection<Group, R>>}),
    oauth2ServiceProviders: ({get: <R extends OAuth2ServiceProviderRequest>(request: R, defaultValue?: (FieldsSelection<OAuth2ServiceProvider, R> | undefined)[]) => Promise<(FieldsSelection<OAuth2ServiceProvider, R> | undefined)[]>}),
    settings: ((args: {key: Scalars['String']}) => {get: <R extends SettingRequest>(request: R, defaultValue?: FieldsSelection<Setting, R>[]) => Promise<FieldsSelection<Setting, R>[]>}),
    availableMembersForRole: ((args: {name?: (Scalars['String'] | null),params: ListParametersInput}) => {get: <R extends MemberRequest>(request: R, defaultValue?: FieldsSelection<Member, R>[]) => Promise<FieldsSelection<Member, R>[]>}),
    isBpmnProcessValid: ((args: {property: CreateOrUpdateBpmnProcessTypeInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    directMessagesRoom: ((args: {id: Scalars['ID']}) => DiscussionDirectMessagesRoomPromiseChain & {get: <R extends DiscussionDirectMessagesRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionDirectMessagesRoom, R>) => Promise<FieldsSelection<DiscussionDirectMessagesRoom, R>>}),
    dataObjectGenericStatus: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: DataObjectGenericStatus) => Promise<DataObjectGenericStatus>}),
    isFilterValid: ((args: {filter: ValidateSystemFilterInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    referenceDataGroup: ((args: {id: Scalars['String']}) => ReferenceDataGroupPromiseChain & {get: <R extends ReferenceDataGroupRequest>(request: R, defaultValue?: FieldsSelection<ReferenceDataGroup, R>) => Promise<FieldsSelection<ReferenceDataGroup, R>>}),
    isViewValid: ((args: {view: ValidateViewInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    dataObject: ((args: {id: Scalars['ID']}) => DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Promise<FieldsSelection<DataObject, R>>}),
    passwordValid: ((args: {password: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    canChangeLifecycle: ((args: {dataTypeId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    publishedReportingViews: ((args?: {dataTypeIds?: (Scalars['String'][] | null)}) => {get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>[]) => Promise<FieldsSelection<PublishedView, R>[]>})&({get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>[]) => Promise<FieldsSelection<PublishedView, R>[]>}),
    oauth2ServiceTokens: ({get: <R extends OAuth2ServiceTokenRequest>(request: R, defaultValue?: (FieldsSelection<OAuth2ServiceToken, R> | undefined)[]) => Promise<(FieldsSelection<OAuth2ServiceToken, R> | undefined)[]>}),
    offsetMessages: ((args: {count: Scalars['Int'],messageId: Scalars['String']}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Promise<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    offsetMessagesFromFirstUnread: ((args: {count: Scalars['Int'],parentId: Scalars['String']}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Promise<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    referenceDataType: ((args: {id: Scalars['String']}) => ReferenceDataTypePromiseChain & {get: <R extends ReferenceDataTypeRequest>(request: R, defaultValue?: FieldsSelection<ReferenceDataType, R>) => Promise<FieldsSelection<ReferenceDataType, R>>}),
    directMessagesRooms: ((args?: {params?: (ListParametersInput | null)}) => DiscussionDirectMessagesRoomListPromiseChain & {get: <R extends DiscussionDirectMessagesRoomListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionDirectMessagesRoomList, R>) => Promise<FieldsSelection<DiscussionDirectMessagesRoomList, R>>})&(DiscussionDirectMessagesRoomListPromiseChain & {get: <R extends DiscussionDirectMessagesRoomListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionDirectMessagesRoomList, R>) => Promise<FieldsSelection<DiscussionDirectMessagesRoomList, R>>}),
    attributesSelectionOptions: ((args: {referenceDataTypeId: Scalars['String'],parentValues?: (Scalars['String'][] | null)}) => {get: <R extends AttributeRequest>(request: R, defaultValue?: FieldsSelection<Attribute, R>[]) => Promise<FieldsSelection<Attribute, R>[]>}),
    isWorkspaceValid: ((args: {workspace: ValidateWorkspaceInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    threads: ((args: {params?: (ListParametersInput | null),roomId: Scalars['String']}) => DiscussionThreadListPromiseChain & {get: <R extends DiscussionThreadListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionThreadList, R>) => Promise<FieldsSelection<DiscussionThreadList, R>>}),
    groups: ((args?: {params?: (ListParametersInput | null)}) => GroupListPromiseChain & {get: <R extends GroupListRequest>(request: R, defaultValue?: FieldsSelection<GroupList, R>) => Promise<FieldsSelection<GroupList, R>>})&(GroupListPromiseChain & {get: <R extends GroupListRequest>(request: R, defaultValue?: FieldsSelection<GroupList, R>) => Promise<FieldsSelection<GroupList, R>>}),
    thread: ((args: {id: Scalars['ID']}) => DiscussionThreadPromiseChain & {get: <R extends DiscussionThreadRequest>(request: R, defaultValue?: FieldsSelection<DiscussionThread, R>) => Promise<FieldsSelection<DiscussionThread, R>>}),
    lastMessages: ((args: {count: Scalars['Int'],parentId: Scalars['String']}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Promise<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    
/** Select available target folder or workspace for data object creation.Method considers current user privileges and permissions. */
dataObjectHierarchy: ((args?: {
/** Root target. Can be GUID in case of workspace or folderish data object or module id (in format "/modules/module1"). */
parentTargetId?: (Scalars['ID'] | null),
/** Types of data object you are going to create. If omitted all available types of module's data types are used. */
dataTypeIds?: (Scalars['String'][] | null),
/** Source data object ids (required parameter if you are going to move objects. */
objectIds?: (Scalars['ID'][] | null)}) => {get: <R extends DataObjectHierarchyRequest>(request: R, defaultValue?: FieldsSelection<DataObjectHierarchy, R>[]) => Promise<FieldsSelection<DataObjectHierarchy, R>[]>})&({get: <R extends DataObjectHierarchyRequest>(request: R, defaultValue?: FieldsSelection<DataObjectHierarchy, R>[]) => Promise<FieldsSelection<DataObjectHierarchy, R>[]>}),
    application: (ApplicationPromiseChain & {get: <R extends ApplicationRequest>(request: R, defaultValue?: FieldsSelection<Application, R>) => Promise<FieldsSelection<Application, R>>}),
    dataObjectSelectionOptions: ((args: {referenceDataTypeId: Scalars['String'],selectedDate?: (DataPropertyDateTimeValueInput | null),parentValues?: (Scalars['String'][] | null)}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Promise<FieldsSelection<DataObject, R>[]>}),
    user: ((args: {name: Scalars['String']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})
}


/** Query root */
export interface QueryObservableChain{
    publishedTypeFilters: ((args?: {dataTypeId?: (Scalars['String'] | null)}) => {get: <R extends TypeFilterRequest>(request: R, defaultValue?: FieldsSelection<TypeFilter, R>[]) => Observable<FieldsSelection<TypeFilter, R>[]>})&({get: <R extends TypeFilterRequest>(request: R, defaultValue?: FieldsSelection<TypeFilter, R>[]) => Observable<FieldsSelection<TypeFilter, R>[]>}),
    setting: ((args: {key: Scalars['String']}) => SettingObservableChain & {get: <R extends SettingRequest>(request: R, defaultValue?: FieldsSelection<Setting, R>) => Observable<FieldsSelection<Setting, R>>}),
    fixWorkbenches: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    module: ((args: {id: Scalars['String']}) => ModuleObservableChain & {get: <R extends ModuleRequest>(request: R, defaultValue?: FieldsSelection<Module, R>) => Observable<FieldsSelection<Module, R>>}),
    profile: ((args?: {username?: (Scalars['String'] | null)}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})&(UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    dataObjectStatusOptions: ((args: {currentState?: (Scalars['String'] | null),objectId: Scalars['ID']}) => {get: <R extends LifecycleTransitionRequest>(request: R, defaultValue?: FieldsSelection<LifecycleTransition, R>[]) => Observable<FieldsSelection<LifecycleTransition, R>[]>}),
    aggredatedDataObjects: ((args: {params: ListParametersInput}) => DataObjectListObservableChain & {get: <R extends DataObjectListRequest>(request: R, defaultValue?: FieldsSelection<DataObjectList, R>) => Observable<FieldsSelection<DataObjectList, R>>}),
    userSelectionOptions: ((args: {selectionParameters: UserSelectionOptionsInput}) => {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>[]) => Observable<FieldsSelection<User, R>[]>}),
    isApiSpecValid: ((args: {apiSpec: ValidateApiSpecInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    dateDisplayFormats: ({get: <R extends DateDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<DateDisplayFormat, R>[]) => Observable<FieldsSelection<DateDisplayFormat, R>[]>}),
    role: ((args: {id: Scalars['String']}) => RoleObservableChain & {get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>) => Observable<FieldsSelection<Role, R>>}),
    isLifecycleValid: ((args: {lifecycle: ValidateLifecycleInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    savedSearch: ((args: {id: Scalars['String']}) => SavedSearchObservableChain & {get: <R extends SavedSearchRequest>(request: R, defaultValue?: FieldsSelection<SavedSearch, R>) => Observable<FieldsSelection<SavedSearch, R>>}),
    publishedApplication: (PublishedApplicationObservableChain & {get: <R extends PublishedApplicationRequest>(request: R, defaultValue?: FieldsSelection<PublishedApplication, R>) => Observable<FieldsSelection<PublishedApplication, R>>}),
    validationResults: ((args?: {severity?: (Scalars['String'] | null)}) => {get: <R extends ValidationResultsRequest>(request: R, defaultValue?: (FieldsSelection<ValidationResults, R> | undefined)[]) => Observable<(FieldsSelection<ValidationResults, R> | undefined)[]>})&({get: <R extends ValidationResultsRequest>(request: R, defaultValue?: (FieldsSelection<ValidationResults, R> | undefined)[]) => Observable<(FieldsSelection<ValidationResults, R> | undefined)[]>}),
    
/** Get template by id if user has privileges to data type. */
dataObjectTemplate: ((args: {id: Scalars['String']}) => DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Observable<FieldsSelection<DataObject, R>>}),
    userCollections: ((args: {searchTerm: Scalars['String']}) => {get: <R extends CollectionRequest>(request: R, defaultValue?: ((FieldsSelection<Collection, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Collection, R> | undefined)[] | undefined)>}),
    serviceDtoJson: ((args: {id: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    dataProperty: ((args: {id: Scalars['String']}) => DataPropertyObservableChain & {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>) => Observable<FieldsSelection<DataProperty, R>>}),
    auditLogEntries: ((args?: {params?: (ListParametersInput | null)}) => AuditLogEntriesListObservableChain & {get: <R extends AuditLogEntriesListRequest>(request: R, defaultValue?: FieldsSelection<AuditLogEntriesList, R>) => Observable<FieldsSelection<AuditLogEntriesList, R>>})&(AuditLogEntriesListObservableChain & {get: <R extends AuditLogEntriesListRequest>(request: R, defaultValue?: FieldsSelection<AuditLogEntriesList, R>) => Observable<FieldsSelection<AuditLogEntriesList, R>>}),
    htmlWidgetGroup: ((args: {id: Scalars['String']}) => HtmlWidgetGroupObservableChain & {get: <R extends HtmlWidgetGroupRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidgetGroup, R>) => Observable<FieldsSelection<HtmlWidgetGroup, R>>}),
    privileges: ((args: {includeModuleOnly?: (Scalars['Boolean'] | null),moduleId: Scalars['String']}) => {get: <R extends PrivilegeRequest>(request: R, defaultValue?: FieldsSelection<Privilege, R>[]) => Observable<FieldsSelection<Privilege, R>[]>}),
    workspace: ((args: {id: Scalars['String']}) => WorkspaceObservableChain & {get: <R extends WorkspaceRequest>(request: R, defaultValue?: FieldsSelection<Workspace, R>) => Observable<FieldsSelection<Workspace, R>>}),
    htmlWidget: ((args: {id: Scalars['String']}) => HtmlWidgetObservableChain & {get: <R extends HtmlWidgetRequest>(request: R, defaultValue?: FieldsSelection<HtmlWidget, R>) => Observable<FieldsSelection<HtmlWidget, R>>}),
    lifecycle: ((args: {id: Scalars['String']}) => LifecycleObservableChain & {get: <R extends LifecycleRequest>(request: R, defaultValue?: FieldsSelection<Lifecycle, R>) => Observable<FieldsSelection<Lifecycle, R>>}),
    view: ((args: {id: Scalars['String']}) => ViewObservableChain & {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>) => Observable<FieldsSelection<View, R>>}),
    versionDisplayFormats: ({get: <R extends VersionDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<VersionDisplayFormat, R>[]) => Observable<FieldsSelection<VersionDisplayFormat, R>[]>}),
    workbench: ((args: {id: Scalars['String']}) => WorkbenchObservableChain & {get: <R extends WorkbenchRequest>(request: R, defaultValue?: FieldsSelection<Workbench, R>) => Observable<FieldsSelection<Workbench, R>>}),
    isDataObjectValid: ((args: {dataObject: ValidateDataObjectInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isRoleValid: ((args: {role: ValidateRoleInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    availableMembersForGroup: ((args: {name?: (Scalars['String'] | null),params: ListParametersInput}) => {get: <R extends MemberRequest>(request: R, defaultValue?: FieldsSelection<Member, R>[]) => Observable<FieldsSelection<Member, R>[]>}),
    dataObjectSelectionView: ((args: {customContextJson?: (Scalars['String'] | null),key: Scalars['String']}) => PublishedViewObservableChain & {get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>) => Observable<FieldsSelection<PublishedView, R>>}),
    passwordResetKeyValid: ((args: {key: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    dataType: ((args: {id: Scalars['String']}) => DataTypeObservableChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>) => Observable<FieldsSelection<DataType, R>>}),
    externalGroups: ((args?: {params?: (ExternalGroupListParametersInput | null)}) => ExternalGroupListObservableChain & {get: <R extends ExternalGroupListRequest>(request: R, defaultValue?: FieldsSelection<ExternalGroupList, R>) => Observable<FieldsSelection<ExternalGroupList, R>>})&(ExternalGroupListObservableChain & {get: <R extends ExternalGroupListRequest>(request: R, defaultValue?: FieldsSelection<ExternalGroupList, R>) => Observable<FieldsSelection<ExternalGroupList, R>>}),
    dataObjectVersions: ((args: {id: Scalars['ID']}) => {get: <R extends VersionRequest>(request: R, defaultValue?: FieldsSelection<Version, R>[]) => Observable<FieldsSelection<Version, R>[]>}),
    users: ((args?: {params?: (ListParametersInput | null)}) => UserListObservableChain & {get: <R extends UserListRequest>(request: R, defaultValue?: FieldsSelection<UserList, R>) => Observable<FieldsSelection<UserList, R>>})&(UserListObservableChain & {get: <R extends UserListRequest>(request: R, defaultValue?: FieldsSelection<UserList, R>) => Observable<FieldsSelection<UserList, R>>}),
    trashableUsers: ((args?: {params?: (TrashableListParametersInput | null)}) => UserListObservableChain & {get: <R extends UserListRequest>(request: R, defaultValue?: FieldsSelection<UserList, R>) => Observable<FieldsSelection<UserList, R>>})&(UserListObservableChain & {get: <R extends UserListRequest>(request: R, defaultValue?: FieldsSelection<UserList, R>) => Observable<FieldsSelection<UserList, R>>}),
    objectsFromFavorites: ((args: {params: ListParametersInput}) => DataObjectListObservableChain & {get: <R extends DataObjectListRequest>(request: R, defaultValue?: (FieldsSelection<DataObjectList, R> | undefined)) => Observable<(FieldsSelection<DataObjectList, R> | undefined)>}),
    auditUsers: ((args?: {params?: (ListParametersInput | null)}) => UserListObservableChain & {get: <R extends UserListRequest>(request: R, defaultValue?: FieldsSelection<UserList, R>) => Observable<FieldsSelection<UserList, R>>})&(UserListObservableChain & {get: <R extends UserListRequest>(request: R, defaultValue?: FieldsSelection<UserList, R>) => Observable<FieldsSelection<UserList, R>>}),
    isLoggedIn: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    apiSpec: ((args: {id: Scalars['String']}) => ApiSpecObservableChain & {get: <R extends ApiSpecRequest>(request: R, defaultValue?: FieldsSelection<ApiSpec, R>) => Observable<FieldsSelection<ApiSpec, R>>}),
    dataObjects: ((args: {params: ListParametersInput}) => DataObjectListObservableChain & {get: <R extends DataObjectListRequest>(request: R, defaultValue?: FieldsSelection<DataObjectList, R>) => Observable<FieldsSelection<DataObjectList, R>>}),
    roles: ((args?: {params?: (ListParametersInput | null)}) => RoleListObservableChain & {get: <R extends RoleListRequest>(request: R, defaultValue?: FieldsSelection<RoleList, R>) => Observable<FieldsSelection<RoleList, R>>})&(RoleListObservableChain & {get: <R extends RoleListRequest>(request: R, defaultValue?: FieldsSelection<RoleList, R>) => Observable<FieldsSelection<RoleList, R>>}),
    isWorkbenchValid: ((args: {workbench: ValidateWorkbenchInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    postTemplate: ((args: {id: Scalars['String']}) => PostTemplateObservableChain & {get: <R extends PostTemplateRequest>(request: R, defaultValue?: FieldsSelection<PostTemplate, R>) => Observable<FieldsSelection<PostTemplate, R>>}),
    textFormatTypes: ({get: <R extends TextFormatTypeRequest>(request: R, defaultValue?: FieldsSelection<TextFormatType, R>[]) => Observable<FieldsSelection<TextFormatType, R>[]>}),
    isGroupValid: ((args: {group: ValidateGroupInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isReferenceDataTypeValid: ((args: {referenceDataType: ValidateReferenceDataTypeInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    workbenches: ({get: <R extends WorkbenchRequest>(request: R, defaultValue?: FieldsSelection<Workbench, R>[]) => Observable<FieldsSelection<Workbench, R>[]>}),
    canChangeMetadataObjectStatus: ((args: {action: MetadataObjectChangeStatusActionsEnum,ids?: (Scalars['String'][] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    savedSearches: ((args?: {moduleId?: (Scalars['String'] | null)}) => {get: <R extends SavedSearchRequest>(request: R, defaultValue?: FieldsSelection<SavedSearch, R>[]) => Observable<FieldsSelection<SavedSearch, R>[]>})&({get: <R extends SavedSearchRequest>(request: R, defaultValue?: FieldsSelection<SavedSearch, R>[]) => Observable<FieldsSelection<SavedSearch, R>[]>}),
    getCollection: ((args: {collectionPath: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isObjectInFavorites: ((args: {objectId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    publicRooms: ((args?: {params?: (ListParametersInput | null)}) => DiscussionRoomListObservableChain & {get: <R extends DiscussionRoomListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoomList, R>) => Observable<FieldsSelection<DiscussionRoomList, R>>})&(DiscussionRoomListObservableChain & {get: <R extends DiscussionRoomListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoomList, R>) => Observable<FieldsSelection<DiscussionRoomList, R>>}),
    booleanDisplayFormats: ({get: <R extends BooleanDisplayFormatRequest>(request: R, defaultValue?: FieldsSelection<BooleanDisplayFormat, R>[]) => Observable<FieldsSelection<BooleanDisplayFormat, R>[]>}),
    message: ((args: {messageId: Scalars['String']}) => DiscussionMessageObservableChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessage, R>) => Observable<FieldsSelection<DiscussionMessage, R>>}),
    room: ((args: {id: Scalars['ID']}) => DiscussionRoomObservableChain & {get: <R extends DiscussionRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoom, R>) => Observable<FieldsSelection<DiscussionRoom, R>>}),
    isPostTemplateValid: ((args: {postTemplate: ValidatePostTemplateInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    bpmnProcessType: ((args: {id: Scalars['String']}) => BpmnProcessTypeObservableChain & {get: <R extends BpmnProcessTypeRequest>(request: R, defaultValue?: FieldsSelection<BpmnProcessType, R>) => Observable<FieldsSelection<BpmnProcessType, R>>}),
    systemDefaults: (SystemDefaultsObservableChain & {get: <R extends SystemDefaultsRequest>(request: R, defaultValue?: FieldsSelection<SystemDefaults, R>) => Observable<FieldsSelection<SystemDefaults, R>>}),
    
/** Get list of all available templates, filtered by user data type privileges. */
dataObjectTemplates: ((args: {dataTypeIds?: (Scalars['String'][] | null),parentId: Scalars['String']}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Observable<FieldsSelection<DataObject, R>[]>}),
    propertyTypes: ({get: <R extends PropertyTypeRequest>(request: R, defaultValue?: FieldsSelection<PropertyType, R>[]) => Observable<FieldsSelection<PropertyType, R>[]>}),
    isTypeFilterValid: ((args: {filter: ValidateTypeFilterInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    availableSelections: ((args: {referenceDataTypeId: Scalars['String'],parentId: Scalars['String']}) => {get: <R extends DataPropertyRequest>(request: R, defaultValue?: FieldsSelection<DataProperty, R>[]) => Observable<FieldsSelection<DataProperty, R>[]>}),
    publishedViews: ((args: {params: ViewParametersInput}) => {get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>[]) => Observable<FieldsSelection<PublishedView, R>[]>}),
    referenceMetadataObjects: ((args?: {includeArchived?: (Scalars['Boolean'] | null),parentId?: (Scalars['String'] | null),objectType?: (ReferenceMetadataObjectTypeEnum | null)}) => {get: <R extends ReferenceMetadataObjectRequest>(request: R, defaultValue?: FieldsSelection<ReferenceMetadataObject, R>[]) => Observable<FieldsSelection<ReferenceMetadataObject, R>[]>})&({get: <R extends ReferenceMetadataObjectRequest>(request: R, defaultValue?: FieldsSelection<ReferenceMetadataObject, R>[]) => Observable<FieldsSelection<ReferenceMetadataObject, R>[]>}),
    isDataPropertyValid: ((args: {property: ValidateDataPropertyInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    currentUserRooms: ((args?: {params?: (ListParametersInput | null)}) => DiscussionRoomListObservableChain & {get: <R extends DiscussionRoomListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoomList, R>) => Observable<FieldsSelection<DiscussionRoomList, R>>})&(DiscussionRoomListObservableChain & {get: <R extends DiscussionRoomListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionRoomList, R>) => Observable<FieldsSelection<DiscussionRoomList, R>>}),
    nextMessages: ((args: {count: Scalars['Int'],messageId: Scalars['String']}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Observable<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    isUserValid: ((args: {user: ValidateUserInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    permissions: ((args: {moduleId: Scalars['String']}) => {get: <R extends PermissionRequest>(request: R, defaultValue?: FieldsSelection<Permission, R>[]) => Observable<FieldsSelection<Permission, R>[]>}),
    defaultResources: (DefaultResourcesObservableChain & {get: <R extends DefaultResourcesRequest>(request: R, defaultValue?: FieldsSelection<DefaultResources, R>) => Observable<FieldsSelection<DefaultResources, R>>}),
    enabledLocales: ({get: <R extends LocaleOptionRequest>(request: R, defaultValue?: (FieldsSelection<LocaleOption, R> | undefined)[]) => Observable<(FieldsSelection<LocaleOption, R> | undefined)[]>}),
    apiSpecsGroup: ((args: {id: Scalars['String']}) => ApiSpecsGroupObservableChain & {get: <R extends ApiSpecsGroupRequest>(request: R, defaultValue?: FieldsSelection<ApiSpecsGroup, R>) => Observable<FieldsSelection<ApiSpecsGroup, R>>}),
    bpmnMessage: ((args: {id: Scalars['String']}) => BpmnMessageObservableChain & {get: <R extends BpmnMessageRequest>(request: R, defaultValue?: FieldsSelection<BpmnMessage, R>) => Observable<FieldsSelection<BpmnMessage, R>>}),
    publishedAggregatedViews: ((args: {route: Scalars['String']}) => {get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>[]) => Observable<FieldsSelection<PublishedView, R>[]>}),
    typeFilter: ((args: {id: Scalars['String']}) => TypeFilterObservableChain & {get: <R extends TypeFilterRequest>(request: R, defaultValue?: FieldsSelection<TypeFilter, R>) => Observable<FieldsSelection<TypeFilter, R>>}),
    apiSpecsGroups: ((args: {parentId: Scalars['String']}) => {get: <R extends ApiSpecsGroupRequest>(request: R, defaultValue?: FieldsSelection<ApiSpecsGroup, R>[]) => Observable<FieldsSelection<ApiSpecsGroup, R>[]>}),
    dataObjectVersionOptions: ((args: {id: Scalars['ID']}) => {get: <R extends VersionIncrementRequest>(request: R, defaultValue?: FieldsSelection<VersionIncrement, R>[]) => Observable<FieldsSelection<VersionIncrement, R>[]>}),
    objectsFromCollection: ((args: {params: ListParametersInput}) => DataObjectListObservableChain & {get: <R extends DataObjectListRequest>(request: R, defaultValue?: (FieldsSelection<DataObjectList, R> | undefined)) => Observable<(FieldsSelection<DataObjectList, R> | undefined)>}),
    analyzerMap: ({get: (request?: boolean|number, defaultValue?: Scalars['Map_String_StringScalar']) => Observable<Scalars['Map_String_StringScalar']>}),
    assetUploads: ((args?: {batchIds?: (Scalars['String'][] | null),params?: (ListParametersInput | null)}) => AssetUploadListObservableChain & {get: <R extends AssetUploadListRequest>(request: R, defaultValue?: FieldsSelection<AssetUploadList, R>) => Observable<FieldsSelection<AssetUploadList, R>>})&(AssetUploadListObservableChain & {get: <R extends AssetUploadListRequest>(request: R, defaultValue?: FieldsSelection<AssetUploadList, R>) => Observable<FieldsSelection<AssetUploadList, R>>}),
    isDataObjectValid2: ((args: {dataObject: ValidateDataObjectInput}) => DataObjectChangesObservableChain & {get: <R extends DataObjectChangesRequest>(request: R, defaultValue?: FieldsSelection<DataObjectChanges, R>) => Observable<FieldsSelection<DataObjectChanges, R>>}),
    isModuleValid: ((args: {module: ValidateModuleInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    theme: (ThemeObservableChain & {get: <R extends ThemeRequest>(request: R, defaultValue?: FieldsSelection<Theme, R>) => Observable<FieldsSelection<Theme, R>>}),
    isDataTypeValid: ((args: {dataType: ValidateDataTypeInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isReferenceDataGroupValid: ((args: {referenceDataGroup: ValidateReferenceDataGroupInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isApiSpecsGroupValid: ((args: {apiSpecsGroup: ValidateApiSpecsGroupInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    publishedApplicationVersions: ((args?: {params?: (ListParametersInput | null)}) => PublishedApplicationVersionListObservableChain & {get: <R extends PublishedApplicationVersionListRequest>(request: R, defaultValue?: FieldsSelection<PublishedApplicationVersionList, R>) => Observable<FieldsSelection<PublishedApplicationVersionList, R>>})&(PublishedApplicationVersionListObservableChain & {get: <R extends PublishedApplicationVersionListRequest>(request: R, defaultValue?: FieldsSelection<PublishedApplicationVersionList, R>) => Observable<FieldsSelection<PublishedApplicationVersionList, R>>}),
    filter: ((args: {id: Scalars['String']}) => SystemFilterObservableChain & {get: <R extends SystemFilterRequest>(request: R, defaultValue?: FieldsSelection<SystemFilter, R>) => Observable<FieldsSelection<SystemFilter, R>>}),
    viewTypes: ({get: <R extends ViewTypeRequest>(request: R, defaultValue?: FieldsSelection<ViewType, R>[]) => Observable<FieldsSelection<ViewType, R>[]>}),
    canDeleteLifecycleState: ((args: {state: Scalars['String'],lifecycleId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    previousMessages: ((args: {count: Scalars['Int'],messageId: Scalars['String']}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Observable<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    validateUpdateUserPassword: ((args: {oldPassword: Scalars['String'],name: Scalars['String'],newPassword: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    translate: ((args: {sourceLocale: Scalars['String'],targetLocales: (Scalars['String'] | null)[],value: Scalars['String']}) => TranslateObservableChain & {get: <R extends TranslateRequest>(request: R, defaultValue?: FieldsSelection<Translate, R>) => Observable<FieldsSelection<Translate, R>>}),
    publishedModuleFilters: ((args?: {moduleId?: (Scalars['String'] | null)}) => {get: <R extends SystemFilterRequest>(request: R, defaultValue?: FieldsSelection<SystemFilter, R>[]) => Observable<FieldsSelection<SystemFilter, R>[]>})&({get: <R extends SystemFilterRequest>(request: R, defaultValue?: FieldsSelection<SystemFilter, R>[]) => Observable<FieldsSelection<SystemFilter, R>[]>}),
    routes: ({get: <R extends RouteRequest>(request: R, defaultValue?: FieldsSelection<Route, R>[]) => Observable<FieldsSelection<Route, R>[]>}),
    publishedFilterViews: ((args: {params: FilterViewParametersInput}) => {get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>[]) => Observable<FieldsSelection<PublishedView, R>[]>}),
    isBpmnMessageValid: ((args: {property: ValidateBpmnMessageInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    group: ((args: {name: Scalars['String']}) => GroupObservableChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Observable<FieldsSelection<Group, R>>}),
    oauth2ServiceProviders: ({get: <R extends OAuth2ServiceProviderRequest>(request: R, defaultValue?: (FieldsSelection<OAuth2ServiceProvider, R> | undefined)[]) => Observable<(FieldsSelection<OAuth2ServiceProvider, R> | undefined)[]>}),
    settings: ((args: {key: Scalars['String']}) => {get: <R extends SettingRequest>(request: R, defaultValue?: FieldsSelection<Setting, R>[]) => Observable<FieldsSelection<Setting, R>[]>}),
    availableMembersForRole: ((args: {name?: (Scalars['String'] | null),params: ListParametersInput}) => {get: <R extends MemberRequest>(request: R, defaultValue?: FieldsSelection<Member, R>[]) => Observable<FieldsSelection<Member, R>[]>}),
    isBpmnProcessValid: ((args: {property: CreateOrUpdateBpmnProcessTypeInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    directMessagesRoom: ((args: {id: Scalars['ID']}) => DiscussionDirectMessagesRoomObservableChain & {get: <R extends DiscussionDirectMessagesRoomRequest>(request: R, defaultValue?: FieldsSelection<DiscussionDirectMessagesRoom, R>) => Observable<FieldsSelection<DiscussionDirectMessagesRoom, R>>}),
    dataObjectGenericStatus: ((args: {id: Scalars['ID']}) => {get: (request?: boolean|number, defaultValue?: DataObjectGenericStatus) => Observable<DataObjectGenericStatus>}),
    isFilterValid: ((args: {filter: ValidateSystemFilterInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    referenceDataGroup: ((args: {id: Scalars['String']}) => ReferenceDataGroupObservableChain & {get: <R extends ReferenceDataGroupRequest>(request: R, defaultValue?: FieldsSelection<ReferenceDataGroup, R>) => Observable<FieldsSelection<ReferenceDataGroup, R>>}),
    isViewValid: ((args: {view: ValidateViewInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    dataObject: ((args: {id: Scalars['ID']}) => DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>) => Observable<FieldsSelection<DataObject, R>>}),
    passwordValid: ((args: {password: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    canChangeLifecycle: ((args: {dataTypeId: Scalars['String']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    publishedReportingViews: ((args?: {dataTypeIds?: (Scalars['String'][] | null)}) => {get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>[]) => Observable<FieldsSelection<PublishedView, R>[]>})&({get: <R extends PublishedViewRequest>(request: R, defaultValue?: FieldsSelection<PublishedView, R>[]) => Observable<FieldsSelection<PublishedView, R>[]>}),
    oauth2ServiceTokens: ({get: <R extends OAuth2ServiceTokenRequest>(request: R, defaultValue?: (FieldsSelection<OAuth2ServiceToken, R> | undefined)[]) => Observable<(FieldsSelection<OAuth2ServiceToken, R> | undefined)[]>}),
    offsetMessages: ((args: {count: Scalars['Int'],messageId: Scalars['String']}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Observable<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    offsetMessagesFromFirstUnread: ((args: {count: Scalars['Int'],parentId: Scalars['String']}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Observable<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    referenceDataType: ((args: {id: Scalars['String']}) => ReferenceDataTypeObservableChain & {get: <R extends ReferenceDataTypeRequest>(request: R, defaultValue?: FieldsSelection<ReferenceDataType, R>) => Observable<FieldsSelection<ReferenceDataType, R>>}),
    directMessagesRooms: ((args?: {params?: (ListParametersInput | null)}) => DiscussionDirectMessagesRoomListObservableChain & {get: <R extends DiscussionDirectMessagesRoomListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionDirectMessagesRoomList, R>) => Observable<FieldsSelection<DiscussionDirectMessagesRoomList, R>>})&(DiscussionDirectMessagesRoomListObservableChain & {get: <R extends DiscussionDirectMessagesRoomListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionDirectMessagesRoomList, R>) => Observable<FieldsSelection<DiscussionDirectMessagesRoomList, R>>}),
    attributesSelectionOptions: ((args: {referenceDataTypeId: Scalars['String'],parentValues?: (Scalars['String'][] | null)}) => {get: <R extends AttributeRequest>(request: R, defaultValue?: FieldsSelection<Attribute, R>[]) => Observable<FieldsSelection<Attribute, R>[]>}),
    isWorkspaceValid: ((args: {workspace: ValidateWorkspaceInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    threads: ((args: {params?: (ListParametersInput | null),roomId: Scalars['String']}) => DiscussionThreadListObservableChain & {get: <R extends DiscussionThreadListRequest>(request: R, defaultValue?: FieldsSelection<DiscussionThreadList, R>) => Observable<FieldsSelection<DiscussionThreadList, R>>}),
    groups: ((args?: {params?: (ListParametersInput | null)}) => GroupListObservableChain & {get: <R extends GroupListRequest>(request: R, defaultValue?: FieldsSelection<GroupList, R>) => Observable<FieldsSelection<GroupList, R>>})&(GroupListObservableChain & {get: <R extends GroupListRequest>(request: R, defaultValue?: FieldsSelection<GroupList, R>) => Observable<FieldsSelection<GroupList, R>>}),
    thread: ((args: {id: Scalars['ID']}) => DiscussionThreadObservableChain & {get: <R extends DiscussionThreadRequest>(request: R, defaultValue?: FieldsSelection<DiscussionThread, R>) => Observable<FieldsSelection<DiscussionThread, R>>}),
    lastMessages: ((args: {count: Scalars['Int'],parentId: Scalars['String']}) => {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: (FieldsSelection<DiscussionMessage, R> | undefined)[]) => Observable<(FieldsSelection<DiscussionMessage, R> | undefined)[]>}),
    
/** Select available target folder or workspace for data object creation.Method considers current user privileges and permissions. */
dataObjectHierarchy: ((args?: {
/** Root target. Can be GUID in case of workspace or folderish data object or module id (in format "/modules/module1"). */
parentTargetId?: (Scalars['ID'] | null),
/** Types of data object you are going to create. If omitted all available types of module's data types are used. */
dataTypeIds?: (Scalars['String'][] | null),
/** Source data object ids (required parameter if you are going to move objects. */
objectIds?: (Scalars['ID'][] | null)}) => {get: <R extends DataObjectHierarchyRequest>(request: R, defaultValue?: FieldsSelection<DataObjectHierarchy, R>[]) => Observable<FieldsSelection<DataObjectHierarchy, R>[]>})&({get: <R extends DataObjectHierarchyRequest>(request: R, defaultValue?: FieldsSelection<DataObjectHierarchy, R>[]) => Observable<FieldsSelection<DataObjectHierarchy, R>[]>}),
    application: (ApplicationObservableChain & {get: <R extends ApplicationRequest>(request: R, defaultValue?: FieldsSelection<Application, R>) => Observable<FieldsSelection<Application, R>>}),
    dataObjectSelectionOptions: ((args: {referenceDataTypeId: Scalars['String'],selectedDate?: (DataPropertyDateTimeValueInput | null),parentValues?: (Scalars['String'][] | null)}) => {get: <R extends DataObjectRequest>(request: R, defaultValue?: FieldsSelection<DataObject, R>[]) => Observable<FieldsSelection<DataObject, R>[]>}),
    user: ((args: {name: Scalars['String']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})
}

export interface RdmContentPayloadPromiseChain{
    referenceDataTypeId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface RdmContentPayloadObservableChain{
    referenceDataTypeId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface ReferenceDataGroupPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    grantedPermissions: ({get: <R extends GrantedPermissionsRequest>(request: R, defaultValue?: FieldsSelection<GrantedPermissions, R>[]) => Promise<FieldsSelection<GrantedPermissions, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    permissionsInherited: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    referenceMetadataObjectType: ({get: (request?: boolean|number, defaultValue?: ReferenceMetadataObjectTypeEnum) => Promise<ReferenceMetadataObjectTypeEnum>}),
    referenceMetadataObjects: ((args?: {includeArchived?: (Scalars['Boolean'] | null),objectType?: (ReferenceMetadataObjectTypeEnum | null)}) => {get: <R extends ReferenceMetadataObjectRequest>(request: R, defaultValue?: FieldsSelection<ReferenceMetadataObject, R>[]) => Promise<FieldsSelection<ReferenceMetadataObject, R>[]>})&({get: <R extends ReferenceMetadataObjectRequest>(request: R, defaultValue?: FieldsSelection<ReferenceMetadataObject, R>[]) => Promise<FieldsSelection<ReferenceMetadataObject, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>})
}

export interface ReferenceDataGroupObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    grantedPermissions: ({get: <R extends GrantedPermissionsRequest>(request: R, defaultValue?: FieldsSelection<GrantedPermissions, R>[]) => Observable<FieldsSelection<GrantedPermissions, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    permissionsInherited: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    referenceMetadataObjectType: ({get: (request?: boolean|number, defaultValue?: ReferenceMetadataObjectTypeEnum) => Observable<ReferenceMetadataObjectTypeEnum>}),
    referenceMetadataObjects: ((args?: {includeArchived?: (Scalars['Boolean'] | null),objectType?: (ReferenceMetadataObjectTypeEnum | null)}) => {get: <R extends ReferenceMetadataObjectRequest>(request: R, defaultValue?: FieldsSelection<ReferenceMetadataObject, R>[]) => Observable<FieldsSelection<ReferenceMetadataObject, R>[]>})&({get: <R extends ReferenceMetadataObjectRequest>(request: R, defaultValue?: FieldsSelection<ReferenceMetadataObject, R>[]) => Observable<FieldsSelection<ReferenceMetadataObject, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>})
}

export interface ReferenceDataTypePromiseChain{
    createRecordView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    dataFile: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: (FieldsSelection<File, R> | undefined)) => Promise<(FieldsSelection<File, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    editRecordView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    grantedPermissions: ({get: <R extends GrantedPermissionsRequest>(request: R, defaultValue?: FieldsSelection<GrantedPermissions, R>[]) => Promise<FieldsSelection<GrantedPermissions, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isDateSpecific: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    navigateRecordView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentReferenceDataType: (ReferenceDataTypePromiseChain & {get: <R extends ReferenceDataTypeRequest>(request: R, defaultValue?: (FieldsSelection<ReferenceDataType, R> | undefined)) => Promise<(FieldsSelection<ReferenceDataType, R> | undefined)>}),
    permissionsInherited: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    properties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    recordTableView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    referenceMetadataObjectType: ({get: (request?: boolean|number, defaultValue?: ReferenceMetadataObjectTypeEnum) => Promise<ReferenceMetadataObjectTypeEnum>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    views: ((args?: {includeArchived?: (Scalars['Boolean'] | null),viewType?: (ViewTypeEnum | null)}) => {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Promise<FieldsSelection<View, R>[]>})&({get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Promise<FieldsSelection<View, R>[]>})
}

export interface ReferenceDataTypeObservableChain{
    createRecordView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    dataFile: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: (FieldsSelection<File, R> | undefined)) => Observable<(FieldsSelection<File, R> | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    editRecordView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    grantedPermissions: ({get: <R extends GrantedPermissionsRequest>(request: R, defaultValue?: FieldsSelection<GrantedPermissions, R>[]) => Observable<FieldsSelection<GrantedPermissions, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isDateSpecific: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    navigateRecordView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentReferenceDataType: (ReferenceDataTypeObservableChain & {get: <R extends ReferenceDataTypeRequest>(request: R, defaultValue?: (FieldsSelection<ReferenceDataType, R> | undefined)) => Observable<(FieldsSelection<ReferenceDataType, R> | undefined)>}),
    permissionsInherited: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    properties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    recordTableView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    referenceMetadataObjectType: ({get: (request?: boolean|number, defaultValue?: ReferenceMetadataObjectTypeEnum) => Observable<ReferenceMetadataObjectTypeEnum>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    views: ((args?: {includeArchived?: (Scalars['Boolean'] | null),viewType?: (ViewTypeEnum | null)}) => {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Observable<FieldsSelection<View, R>[]>})&({get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Observable<FieldsSelection<View, R>[]>})
}

export interface ReferenceMetadataObjectPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    grantedPermissions: ({get: <R extends GrantedPermissionsRequest>(request: R, defaultValue?: FieldsSelection<GrantedPermissions, R>[]) => Promise<FieldsSelection<GrantedPermissions, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    permissionsInherited: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    referenceMetadataObjectType: ({get: (request?: boolean|number, defaultValue?: ReferenceMetadataObjectTypeEnum) => Promise<ReferenceMetadataObjectTypeEnum>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>})
}

export interface ReferenceMetadataObjectObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    grantedPermissions: ({get: <R extends GrantedPermissionsRequest>(request: R, defaultValue?: FieldsSelection<GrantedPermissions, R>[]) => Observable<FieldsSelection<GrantedPermissions, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    permissionsInherited: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    referenceMetadataObjectType: ({get: (request?: boolean|number, defaultValue?: ReferenceMetadataObjectTypeEnum) => Observable<ReferenceMetadataObjectTypeEnum>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>})
}

export interface RolePromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    members: ({get: <R extends MemberRequest>(request: R, defaultValue?: ((FieldsSelection<Member, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Member, R> | undefined)[] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: ((FieldsSelection<Role, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Role, R> | undefined)[] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    visible: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>})
}

export interface RoleObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    members: ({get: <R extends MemberRequest>(request: R, defaultValue?: ((FieldsSelection<Member, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Member, R> | undefined)[] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: ((FieldsSelection<Role, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Role, R> | undefined)[] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    visible: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>})
}

export interface RoleListPromiseChain{
    items: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Promise<FieldsSelection<Role, R>[]>}),
    pageInfo: (PageInfoPromiseChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Promise<FieldsSelection<PageInfo, R>>})
}

export interface RoleListObservableChain{
    items: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Observable<FieldsSelection<Role, R>[]>}),
    pageInfo: (PageInfoObservableChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Observable<FieldsSelection<PageInfo, R>>})
}

export interface RoutePromiseChain{
    description: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    routes: ({get: <R extends RouteRequest>(request: R, defaultValue?: FieldsSelection<Route, R>[]) => Promise<FieldsSelection<Route, R>[]>})
}

export interface RouteObservableChain{
    description: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    routes: ({get: <R extends RouteRequest>(request: R, defaultValue?: FieldsSelection<Route, R>[]) => Observable<FieldsSelection<Route, R>[]>})
}

export interface SavedSearchPromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    moduleName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    owner: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    sortingJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    viewJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface SavedSearchObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    moduleName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    owner: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    sortingJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    viewJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface SettingPromiseChain{
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface SettingObservableChain{
    key: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface StaticContentFilePromiseChain{
    defaultResource: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    encoding: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    htmlFiles: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Promise<(Scalars['Map_String_StringScalar'] | undefined)>}),
    length: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    mimeType: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    resourceId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    thumbnailUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface StaticContentFileObservableChain{
    defaultResource: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    encoding: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    htmlFiles: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Observable<(Scalars['Map_String_StringScalar'] | undefined)>}),
    length: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    mimeType: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    resourceId: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    thumbnailUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}


/** Subscription root */
export interface SubscriptionPromiseChain{
    messages: ((args: {topics: (Scalars['String'] | null)[]}) => SubscriptionMessagePromiseChain & {get: <R extends SubscriptionMessageRequest>(request: R, defaultValue?: (FieldsSelection<SubscriptionMessage, R> | undefined)) => Promise<(FieldsSelection<SubscriptionMessage, R> | undefined)>}),
    unspecifiedPayloadMessages: ((args: {topics: (Scalars['String'] | null)[]}) => SubscriptionUnspecifiedMessagePromiseChain & {get: <R extends SubscriptionUnspecifiedMessageRequest>(request: R, defaultValue?: (FieldsSelection<SubscriptionUnspecifiedMessage, R> | undefined)) => Promise<(FieldsSelection<SubscriptionUnspecifiedMessage, R> | undefined)>}),
    csvImports: ((args: {topics: (Scalars['String'] | null)[]}) => SubscriptionCsvImportStatusPromiseChain & {get: <R extends SubscriptionCsvImportStatusRequest>(request: R, defaultValue?: (FieldsSelection<SubscriptionCsvImportStatus, R> | undefined)) => Promise<(FieldsSelection<SubscriptionCsvImportStatus, R> | undefined)>}),
    actions: ((args: {topics: (Scalars['String'] | null)[]}) => SubscriptionActionPromiseChain & {get: <R extends SubscriptionActionRequest>(request: R, defaultValue?: (FieldsSelection<SubscriptionAction, R> | undefined)) => Promise<(FieldsSelection<SubscriptionAction, R> | undefined)>}),
    dataObjectChanges: ((args: {id: Scalars['ID']}) => DataObjectPromiseChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R> | undefined)) => Promise<(FieldsSelection<DataObject, R> | undefined)>}),
    rdmContentChanges: ((args: {topics: (Scalars['String'] | null)[]}) => SubscriptionRdmContentChangesPromiseChain & {get: <R extends SubscriptionRdmContentChangesRequest>(request: R, defaultValue?: (FieldsSelection<SubscriptionRdmContentChanges, R> | undefined)) => Promise<(FieldsSelection<SubscriptionRdmContentChanges, R> | undefined)>})
}


/** Subscription root */
export interface SubscriptionObservableChain{
    messages: ((args: {topics: (Scalars['String'] | null)[]}) => SubscriptionMessageObservableChain & {get: <R extends SubscriptionMessageRequest>(request: R, defaultValue?: (FieldsSelection<SubscriptionMessage, R> | undefined)) => Observable<(FieldsSelection<SubscriptionMessage, R> | undefined)>}),
    unspecifiedPayloadMessages: ((args: {topics: (Scalars['String'] | null)[]}) => SubscriptionUnspecifiedMessageObservableChain & {get: <R extends SubscriptionUnspecifiedMessageRequest>(request: R, defaultValue?: (FieldsSelection<SubscriptionUnspecifiedMessage, R> | undefined)) => Observable<(FieldsSelection<SubscriptionUnspecifiedMessage, R> | undefined)>}),
    csvImports: ((args: {topics: (Scalars['String'] | null)[]}) => SubscriptionCsvImportStatusObservableChain & {get: <R extends SubscriptionCsvImportStatusRequest>(request: R, defaultValue?: (FieldsSelection<SubscriptionCsvImportStatus, R> | undefined)) => Observable<(FieldsSelection<SubscriptionCsvImportStatus, R> | undefined)>}),
    actions: ((args: {topics: (Scalars['String'] | null)[]}) => SubscriptionActionObservableChain & {get: <R extends SubscriptionActionRequest>(request: R, defaultValue?: (FieldsSelection<SubscriptionAction, R> | undefined)) => Observable<(FieldsSelection<SubscriptionAction, R> | undefined)>}),
    dataObjectChanges: ((args: {id: Scalars['ID']}) => DataObjectObservableChain & {get: <R extends DataObjectRequest>(request: R, defaultValue?: (FieldsSelection<DataObject, R> | undefined)) => Observable<(FieldsSelection<DataObject, R> | undefined)>}),
    rdmContentChanges: ((args: {topics: (Scalars['String'] | null)[]}) => SubscriptionRdmContentChangesObservableChain & {get: <R extends SubscriptionRdmContentChangesRequest>(request: R, defaultValue?: (FieldsSelection<SubscriptionRdmContentChanges, R> | undefined)) => Observable<(FieldsSelection<SubscriptionRdmContentChanges, R> | undefined)>})
}

export interface SubscriptionActionPromiseChain{
    payload: (SubscriptionActionPayloadPromiseChain & {get: <R extends SubscriptionActionPayloadRequest>(request: R, defaultValue?: FieldsSelection<SubscriptionActionPayload, R>) => Promise<FieldsSelection<SubscriptionActionPayload, R>>}),
    topic: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface SubscriptionActionObservableChain{
    payload: (SubscriptionActionPayloadObservableChain & {get: <R extends SubscriptionActionPayloadRequest>(request: R, defaultValue?: FieldsSelection<SubscriptionActionPayload, R>) => Observable<FieldsSelection<SubscriptionActionPayload, R>>}),
    topic: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface SubscriptionActionPayloadPromiseChain{
    actionKey: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    relatedObjects: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Promise<(Scalars['Map_String_StringScalar'] | undefined)>})
}

export interface SubscriptionActionPayloadObservableChain{
    actionKey: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    relatedObjects: ({get: (request?: boolean|number, defaultValue?: (Scalars['Map_String_StringScalar'] | undefined)) => Observable<(Scalars['Map_String_StringScalar'] | undefined)>})
}

export interface SubscriptionCsvImportStatusPromiseChain{
    payload: (CsvImportStatusPromiseChain & {get: <R extends CsvImportStatusRequest>(request: R, defaultValue?: FieldsSelection<CsvImportStatus, R>) => Promise<FieldsSelection<CsvImportStatus, R>>}),
    topic: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface SubscriptionCsvImportStatusObservableChain{
    payload: (CsvImportStatusObservableChain & {get: <R extends CsvImportStatusRequest>(request: R, defaultValue?: FieldsSelection<CsvImportStatus, R>) => Observable<FieldsSelection<CsvImportStatus, R>>}),
    topic: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface SubscriptionMessagePromiseChain{
    payload: (DiscussionMessagePromiseChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessage, R>) => Promise<FieldsSelection<DiscussionMessage, R>>}),
    topic: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface SubscriptionMessageObservableChain{
    payload: (DiscussionMessageObservableChain & {get: <R extends DiscussionMessageRequest>(request: R, defaultValue?: FieldsSelection<DiscussionMessage, R>) => Observable<FieldsSelection<DiscussionMessage, R>>}),
    topic: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface SubscriptionRdmContentChangesPromiseChain{
    payload: (RdmContentPayloadPromiseChain & {get: <R extends RdmContentPayloadRequest>(request: R, defaultValue?: FieldsSelection<RdmContentPayload, R>) => Promise<FieldsSelection<RdmContentPayload, R>>}),
    topic: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface SubscriptionRdmContentChangesObservableChain{
    payload: (RdmContentPayloadObservableChain & {get: <R extends RdmContentPayloadRequest>(request: R, defaultValue?: FieldsSelection<RdmContentPayload, R>) => Observable<FieldsSelection<RdmContentPayload, R>>}),
    topic: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface SubscriptionUnspecifiedMessagePromiseChain{
    payload: ({get: (request?: boolean|number, defaultValue?: Scalars['ObjectScalar']) => Promise<Scalars['ObjectScalar']>}),
    topic: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface SubscriptionUnspecifiedMessageObservableChain{
    payload: ({get: (request?: boolean|number, defaultValue?: Scalars['ObjectScalar']) => Observable<Scalars['ObjectScalar']>}),
    topic: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface SystemDefaultsPromiseChain{
    locale: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    passwordSettings: ({get: <R extends SettingRequest>(request: R, defaultValue?: FieldsSelection<Setting, R>[]) => Promise<FieldsSelection<Setting, R>[]>}),
    timezone: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface SystemDefaultsObservableChain{
    locale: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    passwordSettings: ({get: <R extends SettingRequest>(request: R, defaultValue?: FieldsSelection<Setting, R>[]) => Observable<FieldsSelection<Setting, R>[]>}),
    timezone: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface SystemFilterPromiseChain{
    calendarView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    childrenTypes: ({get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>[]) => Promise<FieldsSelection<DataType, R>[]>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    dataObjectContext: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    defaultListView: ({get: (request?: boolean|number, defaultValue?: (FilterDefaultViewEnum | undefined)) => Promise<(FilterDefaultViewEnum | undefined)>}),
    defaultViewType: ({get: (request?: boolean|number, defaultValue?: (ViewTypeEnum | undefined)) => Promise<(ViewTypeEnum | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    exactDataType: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    kanbanView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    navigateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    tileView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface SystemFilterObservableChain{
    calendarView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    childrenTypes: ({get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>[]) => Observable<FieldsSelection<DataType, R>[]>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    dataObjectContext: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    defaultListView: ({get: (request?: boolean|number, defaultValue?: (FilterDefaultViewEnum | undefined)) => Observable<(FilterDefaultViewEnum | undefined)>}),
    defaultViewType: ({get: (request?: boolean|number, defaultValue?: (ViewTypeEnum | undefined)) => Observable<(ViewTypeEnum | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    exactDataType: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    kanbanView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    navigateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    tileView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface SystemPagePromiseChain{
    calendarView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    enabled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    navigateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    tileView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface SystemPageObservableChain{
    calendarView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    enabled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    navigateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    tileView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface TextFormatTypePromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    textFormatTypeEnum: ({get: (request?: boolean|number, defaultValue?: TextFormatTypeEnum) => Promise<TextFormatTypeEnum>})
}

export interface TextFormatTypeObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    textFormatTypeEnum: ({get: (request?: boolean|number, defaultValue?: TextFormatTypeEnum) => Observable<TextFormatTypeEnum>})
}

export interface ThemePromiseChain{
    applicationTitle: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    favicon: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Promise<FieldsSelection<File, R>>}),
    leftPanelDarkMode: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    logo: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Promise<FieldsSelection<File, R>>}),
    logoSmall: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Promise<FieldsSelection<File, R>>}),
    primaryColor: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    staticContent: (StaticContentFilePromiseChain & {get: <R extends StaticContentFileRequest>(request: R, defaultValue?: (FieldsSelection<StaticContentFile, R> | undefined)) => Promise<(FieldsSelection<StaticContentFile, R> | undefined)>}),
    uid: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface ThemeObservableChain{
    applicationTitle: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    favicon: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Observable<FieldsSelection<File, R>>}),
    leftPanelDarkMode: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    logo: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Observable<FieldsSelection<File, R>>}),
    logoSmall: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Observable<FieldsSelection<File, R>>}),
    primaryColor: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    staticContent: (StaticContentFileObservableChain & {get: <R extends StaticContentFileRequest>(request: R, defaultValue?: (FieldsSelection<StaticContentFile, R> | undefined)) => Observable<(FieldsSelection<StaticContentFile, R> | undefined)>}),
    uid: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface TranslatePromiseChain{
    items: ({get: <R extends TranslateOptionRequest>(request: R, defaultValue?: ((FieldsSelection<TranslateOption, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<TranslateOption, R> | undefined)[] | undefined)>})
}

export interface TranslateObservableChain{
    items: ({get: <R extends TranslateOptionRequest>(request: R, defaultValue?: ((FieldsSelection<TranslateOption, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<TranslateOption, R> | undefined)[] | undefined)>})
}

export interface TranslateOptionPromiseChain{
    locale: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    value: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface TranslateOptionObservableChain{
    locale: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    value: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface TypeFilterPromiseChain{
    calendarView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    childrenTypes: ({get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>[]) => Promise<FieldsSelection<DataType, R>[]>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    dataObjectContext: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    defaultListView: ({get: (request?: boolean|number, defaultValue?: (FilterDefaultViewEnum | undefined)) => Promise<(FilterDefaultViewEnum | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    exactDataType: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    kanbanView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    navigateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    tileView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface TypeFilterObservableChain{
    calendarView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    childrenTypes: ({get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>[]) => Observable<FieldsSelection<DataType, R>[]>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    dataObjectContext: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    defaultListView: ({get: (request?: boolean|number, defaultValue?: (FilterDefaultViewEnum | undefined)) => Observable<(FilterDefaultViewEnum | undefined)>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    exactDataType: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    kanbanView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    navigateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    tileView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface UserPromiseChain{
    allGroups: ({get: <R extends GroupRequest>(request: R, defaultValue?: (FieldsSelection<Group, R>[] | undefined)) => Promise<(FieldsSelection<Group, R>[] | undefined)>}),
    allRoles: ({get: <R extends RoleRequest>(request: R, defaultValue?: (FieldsSelection<Role, R>[] | undefined)) => Promise<(FieldsSelection<Role, R>[] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    groups: ({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Promise<FieldsSelection<Group, R>[]>}),
    isExternal: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSuperUser: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parents: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Promise<FieldsSelection<Role, R>[]>}),
    trashed: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    type: (MemberTypePromiseChain & {get: <R extends MemberTypeRequest>(request: R, defaultValue?: FieldsSelection<MemberType, R>) => Promise<FieldsSelection<MemberType, R>>}),
    uid: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    userprofile: (UserProfilePromiseChain & {get: <R extends UserProfileRequest>(request: R, defaultValue?: FieldsSelection<UserProfile, R>) => Promise<FieldsSelection<UserProfile, R>>}),
    visible: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>})
}

export interface UserObservableChain{
    allGroups: ({get: <R extends GroupRequest>(request: R, defaultValue?: (FieldsSelection<Group, R>[] | undefined)) => Observable<(FieldsSelection<Group, R>[] | undefined)>}),
    allRoles: ({get: <R extends RoleRequest>(request: R, defaultValue?: (FieldsSelection<Role, R>[] | undefined)) => Observable<(FieldsSelection<Role, R>[] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    groups: ({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Observable<FieldsSelection<Group, R>[]>}),
    isExternal: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSuperUser: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parents: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Observable<FieldsSelection<Role, R>[]>}),
    trashed: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    type: (MemberTypeObservableChain & {get: <R extends MemberTypeRequest>(request: R, defaultValue?: FieldsSelection<MemberType, R>) => Observable<FieldsSelection<MemberType, R>>}),
    uid: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    userprofile: (UserProfileObservableChain & {get: <R extends UserProfileRequest>(request: R, defaultValue?: FieldsSelection<UserProfile, R>) => Observable<FieldsSelection<UserProfile, R>>}),
    visible: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>})
}

export interface UserListPromiseChain{
    items: ({get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>[]) => Promise<FieldsSelection<User, R>[]>}),
    pageInfo: (PageInfoPromiseChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Promise<FieldsSelection<PageInfo, R>>})
}

export interface UserListObservableChain{
    items: ({get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>[]) => Observable<FieldsSelection<User, R>[]>}),
    pageInfo: (PageInfoObservableChain & {get: <R extends PageInfoRequest>(request: R, defaultValue?: FieldsSelection<PageInfo, R>) => Observable<FieldsSelection<PageInfo, R>>})
}

export interface UserProfilePromiseChain{
    avatar: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: (FieldsSelection<File, R> | undefined)) => Promise<(FieldsSelection<File, R> | undefined)>}),
    birthdate: ({get: (request?: boolean|number, defaultValue?: (Scalars['Date'] | undefined)) => Promise<(Scalars['Date'] | undefined)>}),
    email: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    firstName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    gender: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    lastName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    locale: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    phonenumber: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    timezone: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface UserProfileObservableChain{
    avatar: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: (FieldsSelection<File, R> | undefined)) => Observable<(FieldsSelection<File, R> | undefined)>}),
    birthdate: ({get: (request?: boolean|number, defaultValue?: (Scalars['Date'] | undefined)) => Observable<(Scalars['Date'] | undefined)>}),
    email: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    firstName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    gender: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    lastName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    locale: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    phonenumber: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    timezone: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface ValidationResultsPromiseChain{
    dataType: (DataTypePromiseChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: (FieldsSelection<DataType, R> | undefined)) => Promise<(FieldsSelection<DataType, R> | undefined)>}),
    isValid: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    module: (ModulePromiseChain & {get: <R extends ModuleRequest>(request: R, defaultValue?: (FieldsSelection<Module, R> | undefined)) => Promise<(FieldsSelection<Module, R> | undefined)>}),
    validation: ({get: <R extends GenericValidationResultRequest>(request: R, defaultValue?: ((FieldsSelection<GenericValidationResult, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<GenericValidationResult, R> | undefined)[] | undefined)>})
}

export interface ValidationResultsObservableChain{
    dataType: (DataTypeObservableChain & {get: <R extends DataTypeRequest>(request: R, defaultValue?: (FieldsSelection<DataType, R> | undefined)) => Observable<(FieldsSelection<DataType, R> | undefined)>}),
    isValid: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    module: (ModuleObservableChain & {get: <R extends ModuleRequest>(request: R, defaultValue?: (FieldsSelection<Module, R> | undefined)) => Observable<(FieldsSelection<Module, R> | undefined)>}),
    validation: ({get: <R extends GenericValidationResultRequest>(request: R, defaultValue?: ((FieldsSelection<GenericValidationResult, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<GenericValidationResult, R> | undefined)[] | undefined)>})
}

export interface VersionPromiseChain{
    majorVersion: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    minorVersion: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    qualifier: (VersionQualifierPromiseChain & {get: <R extends VersionQualifierRequest>(request: R, defaultValue?: (FieldsSelection<VersionQualifier, R> | undefined)) => Promise<(FieldsSelection<VersionQualifier, R> | undefined)>}),
    versionInfo: (VersionInfoPromiseChain & {get: <R extends VersionInfoRequest>(request: R, defaultValue?: (FieldsSelection<VersionInfo, R> | undefined)) => Promise<(FieldsSelection<VersionInfo, R> | undefined)>})
}

export interface VersionObservableChain{
    majorVersion: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    minorVersion: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    qualifier: (VersionQualifierObservableChain & {get: <R extends VersionQualifierRequest>(request: R, defaultValue?: (FieldsSelection<VersionQualifier, R> | undefined)) => Observable<(FieldsSelection<VersionQualifier, R> | undefined)>}),
    versionInfo: (VersionInfoObservableChain & {get: <R extends VersionInfoRequest>(request: R, defaultValue?: (FieldsSelection<VersionInfo, R> | undefined)) => Observable<(FieldsSelection<VersionInfo, R> | undefined)>})
}

export interface VersionDisplayFormatPromiseChain{
    displayFormatEnum: ({get: (request?: boolean|number, defaultValue?: (VersionDisplayFormatEnum | undefined)) => Promise<(VersionDisplayFormatEnum | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface VersionDisplayFormatObservableChain{
    displayFormatEnum: ({get: (request?: boolean|number, defaultValue?: (VersionDisplayFormatEnum | undefined)) => Observable<(VersionDisplayFormatEnum | undefined)>}),
    displayName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface VersionIncrementPromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    version: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    versionIncrementEnum: ({get: (request?: boolean|number, defaultValue?: VersionIncrementEnum) => Promise<VersionIncrementEnum>})
}

export interface VersionIncrementObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    version: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    versionIncrementEnum: ({get: (request?: boolean|number, defaultValue?: VersionIncrementEnum) => Observable<VersionIncrementEnum>})
}

export interface VersionInfoPromiseChain{
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['Date'] | undefined)) => Promise<(Scalars['Date'] | undefined)>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    user: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>})
}

export interface VersionInfoObservableChain{
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['Date'] | undefined)) => Observable<(Scalars['Date'] | undefined)>}),
    route: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    user: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>})
}

export interface VersionQualifierPromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    versionQualifierEnum: ({get: (request?: boolean|number, defaultValue?: VersionQualifierEnum) => Promise<VersionQualifierEnum>})
}

export interface VersionQualifierObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    versionQualifierEnum: ({get: (request?: boolean|number, defaultValue?: VersionQualifierEnum) => Observable<VersionQualifierEnum>})
}

export interface ViewPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    fileProperty: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    group: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    managementMode: ({get: (request?: boolean|number, defaultValue?: (ViewManagementModeEnum | undefined)) => Promise<(ViewManagementModeEnum | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    properties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    sortingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    template: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: (FieldsSelection<File, R> | undefined)) => Promise<(FieldsSelection<File, R> | undefined)>}),
    viewJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    viewMode: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    viewType: (ViewTypePromiseChain & {get: <R extends ViewTypeRequest>(request: R, defaultValue?: FieldsSelection<ViewType, R>) => Promise<FieldsSelection<ViewType, R>>})
}

export interface ViewObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    fileProperty: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    group: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    managementMode: ({get: (request?: boolean|number, defaultValue?: (ViewManagementModeEnum | undefined)) => Observable<(ViewManagementModeEnum | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    properties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    sortingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    template: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: (FieldsSelection<File, R> | undefined)) => Observable<(FieldsSelection<File, R> | undefined)>}),
    viewJson: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    viewMode: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    viewType: (ViewTypeObservableChain & {get: <R extends ViewTypeRequest>(request: R, defaultValue?: FieldsSelection<ViewType, R>) => Observable<FieldsSelection<ViewType, R>>})
}

export interface ViewTypePromiseChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    viewTypeEnum: ({get: (request?: boolean|number, defaultValue?: ViewTypeEnum) => Promise<ViewTypeEnum>})
}

export interface ViewTypeObservableChain{
    displayName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    viewTypeEnum: ({get: (request?: boolean|number, defaultValue?: ViewTypeEnum) => Observable<ViewTypeEnum>})
}

export interface WorkbenchPromiseChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    menuJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Promise<FieldsSelection<Role, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>})
}

export interface WorkbenchObservableChain{
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    menuJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Observable<FieldsSelection<Role, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>})
}

export interface WorkspacePromiseChain{
    brandingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    calendarView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    cardView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    childTableView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    childrenTypes: ({get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>[]) => Promise<FieldsSelection<DataType, R>[]>}),
    createView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    editView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    embedView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    grantedPermissions: ({get: <R extends GrantedPermissionsRequest>(request: R, defaultValue?: FieldsSelection<GrantedPermissions, R>[]) => Promise<FieldsSelection<GrantedPermissions, R>[]>}),
    icon: (FilePromiseChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Promise<FieldsSelection<File, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    isImportAllowed: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    kanbanView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Promise<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    navigateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Promise<FieldsSelection<PropertyGroup, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Promise<MetadataObjectStatusEnum>}),
    tileView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    views: ((args?: {includeArchived?: (Scalars['Boolean'] | null),viewType?: (ViewTypeEnum | null)}) => {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Promise<FieldsSelection<View, R>[]>})&({get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Promise<FieldsSelection<View, R>[]>})
}

export interface WorkspaceObservableChain{
    brandingJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    calendarView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    cardView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    childTableView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    childrenTypes: ({get: <R extends DataTypeRequest>(request: R, defaultValue?: FieldsSelection<DataType, R>[]) => Observable<FieldsSelection<DataType, R>[]>}),
    createView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    creationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    description: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    displayName: ((args?: {multilanguage?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})&({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    editView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    embedView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    filterJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    grantedPermissions: ({get: <R extends GrantedPermissionsRequest>(request: R, defaultValue?: FieldsSelection<GrantedPermissions, R>[]) => Observable<FieldsSelection<GrantedPermissions, R>[]>}),
    icon: (FileObservableChain & {get: <R extends FileRequest>(request: R, defaultValue?: FieldsSelection<File, R>) => Observable<FieldsSelection<File, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    isImportAllowed: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isPreconfigured: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    isSystem: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    kanbanView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    modificationDate: ({get: (request?: boolean|number, defaultValue?: Scalars['Date']) => Observable<Scalars['Date']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    navigateView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    parentId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    searchPanelProperties: ({get: <R extends PropertyGroupRequest>(request: R, defaultValue?: FieldsSelection<PropertyGroup, R>[]) => Observable<FieldsSelection<PropertyGroup, R>[]>}),
    status: ({get: (request?: boolean|number, defaultValue?: MetadataObjectStatusEnum) => Observable<MetadataObjectStatusEnum>}),
    tileView: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    views: ((args?: {includeArchived?: (Scalars['Boolean'] | null),viewType?: (ViewTypeEnum | null)}) => {get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Observable<FieldsSelection<View, R>[]>})&({get: <R extends ViewRequest>(request: R, defaultValue?: FieldsSelection<View, R>[]) => Observable<FieldsSelection<View, R>[]>})
}

export interface XmlAndModelDecorationPromiseChain{
    bpmnXml: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    decorJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    valid: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    validationResultsJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface XmlAndModelDecorationObservableChain{
    bpmnXml: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    decorJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    valid: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    validationResultsJson: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}