const {
  linkTypeMap,
  createClient: createClientOriginal,
  generateGraphqlOperation,
  assertSameVersion,
} = require('@genql/runtime')
var typeMap = linkTypeMap(require('./types.cjs'))

var version = '2.10.0'
assertSameVersion(version)

module.exports.version = version

module.exports.createClient = function(options) {
  options = options || {}
  var optionsCopy = {
    url: 'https://smk-night-dev.bacup.ru/graphql',
    queryRoot: typeMap.Query,
    mutationRoot: typeMap.Mutation,
    subscriptionRoot: typeMap.Subscription,
  }
  for (var name in options) {
    optionsCopy[name] = options[name]
  }
  return createClientOriginal(optionsCopy)
}

module.exports.enumActionEnum = {
  CREATE: 'CREATE',
  CREATE_FROM_TEMPLATE: 'CREATE_FROM_TEMPLATE',
  EDIT: 'EDIT',
  EMBED: 'EMBED',
  NAVIGATE: 'NAVIGATE',
  OTHER: 'OTHER',
  RESPOND: 'RESPOND',
}

module.exports.enumAllowedActionsEnum = {
  CHANGE_OWNER: 'CHANGE_OWNER',
  CHANGE_STATE: 'CHANGE_STATE',
  CREATE_VERSION: 'CREATE_VERSION',
  DELETE: 'DELETE',
  DOWNLOAD: 'DOWNLOAD',
  EDIT: 'EDIT',
  MANAGE_FAVORITES: 'MANAGE_FAVORITES',
  MANAGE_PERMISSIONS: 'MANAGE_PERMISSIONS',
  MANAGE_TEMPLATES: 'MANAGE_TEMPLATES',
  MOVE: 'MOVE',
  OPEN_MARKUP: 'OPEN_MARKUP',
  PUBLISH: 'PUBLISH',
  RESPOND: 'RESPOND',
  RESTORE_VERSION: 'RESTORE_VERSION',
  SEE_HISTORY: 'SEE_HISTORY',
  SEE_VERSIONS: 'SEE_VERSIONS',
}

module.exports.enumAssetUploadStatusEnum = {
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  IN_PROGRESS: 'IN_PROGRESS',
}

module.exports.enumAuditCategoryEnum = {
  rabisAuthCategory: 'rabisAuthCategory',
  rabisDataObjects: 'rabisDataObjects',
  rabisSettingsCategory: 'rabisSettingsCategory',
}

module.exports.enumAuditEventEnum = {
  rabisAuthException: 'rabisAuthException',
  rabisAuthTokenExpired: 'rabisAuthTokenExpired',
  rabisAuthUserSynced: 'rabisAuthUserSynced',
  rabisAuthUserSyncedAndLoggedIn: 'rabisAuthUserSyncedAndLoggedIn',
  rabisDataObjectCreated: 'rabisDataObjectCreated',
  rabisDataObjectDeleted: 'rabisDataObjectDeleted',
  rabisDataObjectDownloaded: 'rabisDataObjectDownloaded',
  rabisDataObjectModified: 'rabisDataObjectModified',
  rabisDataObjectMoved: 'rabisDataObjectMoved',
  rabisDataObjectOwnerChanged: 'rabisDataObjectOwnerChanged',
  rabisDataObjectPublished: 'rabisDataObjectPublished',
  rabisDataObjectRepublished: 'rabisDataObjectRepublished',
  rabisDataObjectRestored: 'rabisDataObjectRestored',
  rabisDataObjectStatusChanged: 'rabisDataObjectStatusChanged',
  rabisDataObjectUnpublished: 'rabisDataObjectUnpublished',
  rabisDataObjectVersionCreated: 'rabisDataObjectVersionCreated',
  rabisDataObjectVersionRestored: 'rabisDataObjectVersionRestored',
  rabisForcedLogout: 'rabisForcedLogout',
  rabisLogout: 'rabisLogout',
  rabisNuxeoLoginFailed: 'rabisNuxeoLoginFailed',
  rabisNuxeoLoginSuccess: 'rabisNuxeoLoginSuccess',
  rabisReadMembers: 'rabisReadMembers',
  rabisReadUserProfile: 'rabisReadUserProfile',
  rabisRefreshToken: 'rabisRefreshToken',
  rabisResourceDownloaded: 'rabisResourceDownloaded',
  rabisSecuritySettingsChanged: 'rabisSecuritySettingsChanged',
  rabisSetMembers: 'rabisSetMembers',
}

module.exports.enumAuthMethod = {
  BASIC_AUTH: 'BASIC_AUTH',
  CLIENT_CREDENTIALS_FLOW: 'CLIENT_CREDENTIALS_FLOW',
  NO_AUTH: 'NO_AUTH',
  RABIS_AUTH: 'RABIS_AUTH',
}

module.exports.enumBooleanDisplayFormatEnum = {
  ICON: 'ICON',
  TEXT: 'TEXT',
}

module.exports.enumDataObjectGenericStatus = {
  INACTIVE: 'INACTIVE',
  TRANSIENT: 'TRANSIENT',
  USER_TASK: 'USER_TASK',
  WORKLOG: 'WORKLOG',
}

module.exports.enumDateDisplayFormatEnum = {
  FULL: 'FULL',
  LONG: 'LONG',
  SHORT: 'SHORT',
}

module.exports.enumDiscussionMessageParentStatusEnum = {
  ACTUAL: 'ACTUAL',
  ARCHIVED: 'ARCHIVED',
}

module.exports.enumFilterDefaultViewEnum = {
  calendarView: 'calendarView',
  kanbanView: 'kanbanView',
  navigateView: 'navigateView',
  tileView: 'tileView',
}

module.exports.enumHtmlWidgetGroupTypeEnum = {
  APPLICATION: 'APPLICATION',
  DATATYPE: 'DATATYPE',
  MODULE: 'MODULE',
  WORKSPACE: 'WORKSPACE',
}

module.exports.enumMemberTypeEnum = {
  GROUP: 'GROUP',
  ROLE: 'ROLE',
  USER: 'USER',
}

module.exports.enumMetadataObjectChangeStatusActionsEnum = {
  ARCHIVE: 'ARCHIVE',
  DELETE: 'DELETE',
  UNARCHIVE: 'UNARCHIVE',
}

module.exports.enumMetadataObjectStatusEnum = {
  ACTUAL: 'ACTUAL',
  ARCHIVED: 'ARCHIVED',
  MODIFIED: 'MODIFIED',
  NOT_PUBLISHED: 'NOT_PUBLISHED',
}

module.exports.enumPermissionEnum = {
  CREATE: 'CREATE',
  MANAGE: 'MANAGE',
  READ: 'READ',
  REMOVE: 'REMOVE',
  WRITE: 'WRITE',
}

module.exports.enumPrivacyStatusEnum = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
}

module.exports.enumPrivilegeEnum = {
  CAN_CHANGE_OWNER: 'CAN_CHANGE_OWNER',
  CAN_CHANGE_STATE: 'CAN_CHANGE_STATE',
  CAN_CREATE: 'CAN_CREATE',
  CAN_DELETE: 'CAN_DELETE',
  CAN_DOWNLOAD: 'CAN_DOWNLOAD',
  CAN_EDIT: 'CAN_EDIT',
  CAN_IMPORT: 'CAN_IMPORT',
  CAN_MANAGE_FAVORITES: 'CAN_MANAGE_FAVORITES',
  CAN_MANAGE_PERMISSIONS: 'CAN_MANAGE_PERMISSIONS',
  CAN_MANAGE_SHARED_SEARCHES: 'CAN_MANAGE_SHARED_SEARCHES',
  CAN_MANAGE_TEMPLATES: 'CAN_MANAGE_TEMPLATES',
  CAN_MANAGE_VERSIONS: 'CAN_MANAGE_VERSIONS',
  CAN_MOVE: 'CAN_MOVE',
  CAN_PUBLISH: 'CAN_PUBLISH',
  CAN_READ: 'CAN_READ',
  CAN_SEE_HISTORY: 'CAN_SEE_HISTORY',
}

module.exports.enumPropertyTypeEnum = {
  ATTRIBUTES: 'ATTRIBUTES',
  BOOLEAN: 'BOOLEAN',
  DATA_OBJECT: 'DATA_OBJECT',
  DATA_OBJECTS: 'DATA_OBJECTS',
  DATE: 'DATE',
  DATETIME: 'DATETIME',
  DECIMAL: 'DECIMAL',
  FILE: 'FILE',
  FILES: 'FILES',
  INTEGER: 'INTEGER',
  MULTI_SELECTION: 'MULTI_SELECTION',
  OBJECT_FILTER: 'OBJECT_FILTER',
  SELECTION: 'SELECTION',
  SEQUENCE: 'SEQUENCE',
  STATUS: 'STATUS',
  STRING: 'STRING',
  TEXT: 'TEXT',
  TIME: 'TIME',
  USER: 'USER',
  USERS: 'USERS',
  VERSION: 'VERSION',
}

module.exports.enumReferenceMetadataObjectTypeEnum = {
  DATA_TYPE: 'DATA_TYPE',
  GROUP: 'GROUP',
}

module.exports.enumSequenceRestartInterval = {
  month: 'month',
  never: 'never',
  year: 'year',
}

module.exports.enumTextFormatTypeEnum = {
  HTML: 'HTML',
  PLAIN: 'PLAIN',
}

module.exports.enumVersionDisplayFormatEnum = {
  LONG: 'LONG',
  SHORT: 'SHORT',
}

module.exports.enumVersionIncrementEnum = {
  MAJOR: 'MAJOR',
  MINOR: 'MINOR',
}

module.exports.enumVersionQualifierEnum = {
  ACTUAL: 'ACTUAL',
  DRAFT: 'DRAFT',
}

module.exports.enumViewManagementModeEnum = {
  AUTO_MANAGEMENT: 'AUTO_MANAGEMENT',
  USER_MANAGEMENT: 'USER_MANAGEMENT',
}

module.exports.enumViewTypeEnum = {
  CALENDAR: 'CALENDAR',
  CARD: 'CARD',
  CONTAINER: 'CONTAINER',
  EXPORT: 'EXPORT',
  FORM: 'FORM',
  KANBAN: 'KANBAN',
  REPORTING: 'REPORTING',
  TABLE: 'TABLE',
  TILE: 'TILE',
}

module.exports.enumWorkStateEnum = {
  COMPLETED: 'COMPLETED',
  ERROR: 'ERROR',
  RUNNING: 'RUNNING',
  SCHEDULED: 'SCHEDULED',
}

module.exports.generateQueryOp = function(fields) {
  return generateGraphqlOperation('query', typeMap.Query, fields)
}
module.exports.generateMutationOp = function(fields) {
  return generateGraphqlOperation('mutation', typeMap.Mutation, fields)
}
module.exports.generateSubscriptionOp = function(fields) {
  return generateGraphqlOperation('subscription', typeMap.Subscription, fields)
}
module.exports.everything = {
  __scalar: true,
}

var schemaExports = require('./guards.cjs')
for (var k in schemaExports) {
  module.exports[k] = schemaExports[k]
}
