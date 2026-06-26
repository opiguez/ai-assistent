import {
  FieldsSelection,
  GraphqlOperation,
  ClientOptions,
  Observable,
} from '@genql/runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';
export * from './schema';
import {
  QueryRequest,
  QueryPromiseChain,
  Query,
  MutationRequest,
  MutationPromiseChain,
  Mutation,
  SubscriptionRequest,
  SubscriptionObservableChain,
  Subscription,
} from './schema';
export declare const createClient: (options?: ClientOptions) => Client;
export declare const everything: { __scalar: boolean };
export declare const version: string;

export interface Client {
  wsClient?: SubscriptionClient;

  query<R extends QueryRequest>(
    request: R & { __name?: string },
  ): Promise<FieldsSelection<Query, R>>;

  mutation<R extends MutationRequest>(
    request: R & { __name?: string },
  ): Promise<FieldsSelection<Mutation, R>>;

  subscription<R extends SubscriptionRequest>(
    request: R & { __name?: string },
  ): Observable<FieldsSelection<Subscription, R>>;

  chain: {
    query: QueryPromiseChain;

    mutation: MutationPromiseChain;

    subscription: SubscriptionObservableChain;
  };
}

export type QueryResult<fields extends QueryRequest> = FieldsSelection<
  Query,
  fields
>;

export declare const generateQueryOp: (
  fields: QueryRequest & { __name?: string },
) => GraphqlOperation;
export type MutationResult<fields extends MutationRequest> = FieldsSelection<
  Mutation,
  fields
>;

export declare const generateMutationOp: (
  fields: MutationRequest & { __name?: string },
) => GraphqlOperation;
export type SubscriptionResult<fields extends SubscriptionRequest> =
  FieldsSelection<Subscription, fields>;

export declare const generateSubscriptionOp: (
  fields: SubscriptionRequest & { __name?: string },
) => GraphqlOperation;

export declare const enumActionEnum: {
  readonly CREATE: 'CREATE';
  readonly CREATE_FROM_TEMPLATE: 'CREATE_FROM_TEMPLATE';
  readonly EDIT: 'EDIT';
  readonly EMBED: 'EMBED';
  readonly NAVIGATE: 'NAVIGATE';
  readonly OTHER: 'OTHER';
  readonly RESPOND: 'RESPOND';
};

export declare const enumAllowedActionsEnum: {
  readonly CHANGE_OWNER: 'CHANGE_OWNER';
  readonly CHANGE_STATE: 'CHANGE_STATE';
  readonly CREATE_VERSION: 'CREATE_VERSION';
  readonly DELETE: 'DELETE';
  readonly DOWNLOAD: 'DOWNLOAD';
  readonly EDIT: 'EDIT';
  readonly MANAGE_FAVORITES: 'MANAGE_FAVORITES';
  readonly MANAGE_PERMISSIONS: 'MANAGE_PERMISSIONS';
  readonly MANAGE_TEMPLATES: 'MANAGE_TEMPLATES';
  readonly MOVE: 'MOVE';
  readonly OPEN_MARKUP: 'OPEN_MARKUP';
  readonly PUBLISH: 'PUBLISH';
  readonly RESPOND: 'RESPOND';
  readonly RESTORE_VERSION: 'RESTORE_VERSION';
  readonly SEE_HISTORY: 'SEE_HISTORY';
  readonly SEE_VERSIONS: 'SEE_VERSIONS';
};

export declare const enumAssetUploadStatusEnum: {
  readonly COMPLETED: 'COMPLETED';
  readonly FAILED: 'FAILED';
  readonly IN_PROGRESS: 'IN_PROGRESS';
};

export declare const enumAuditCategoryEnum: {
  readonly rabisAuthCategory: 'rabisAuthCategory';
  readonly rabisDataObjects: 'rabisDataObjects';
  readonly rabisSettingsCategory: 'rabisSettingsCategory';
};

export declare const enumAuditEventEnum: {
  readonly rabisAuthException: 'rabisAuthException';
  readonly rabisAuthTokenExpired: 'rabisAuthTokenExpired';
  readonly rabisAuthUserSynced: 'rabisAuthUserSynced';
  readonly rabisAuthUserSyncedAndLoggedIn: 'rabisAuthUserSyncedAndLoggedIn';
  readonly rabisDataObjectCreated: 'rabisDataObjectCreated';
  readonly rabisDataObjectDeleted: 'rabisDataObjectDeleted';
  readonly rabisDataObjectDownloaded: 'rabisDataObjectDownloaded';
  readonly rabisDataObjectModified: 'rabisDataObjectModified';
  readonly rabisDataObjectMoved: 'rabisDataObjectMoved';
  readonly rabisDataObjectOwnerChanged: 'rabisDataObjectOwnerChanged';
  readonly rabisDataObjectPublished: 'rabisDataObjectPublished';
  readonly rabisDataObjectRepublished: 'rabisDataObjectRepublished';
  readonly rabisDataObjectRestored: 'rabisDataObjectRestored';
  readonly rabisDataObjectStatusChanged: 'rabisDataObjectStatusChanged';
  readonly rabisDataObjectUnpublished: 'rabisDataObjectUnpublished';
  readonly rabisDataObjectVersionCreated: 'rabisDataObjectVersionCreated';
  readonly rabisDataObjectVersionRestored: 'rabisDataObjectVersionRestored';
  readonly rabisForcedLogout: 'rabisForcedLogout';
  readonly rabisLogout: 'rabisLogout';
  readonly rabisNuxeoLoginFailed: 'rabisNuxeoLoginFailed';
  readonly rabisNuxeoLoginSuccess: 'rabisNuxeoLoginSuccess';
  readonly rabisReadMembers: 'rabisReadMembers';
  readonly rabisReadUserProfile: 'rabisReadUserProfile';
  readonly rabisRefreshToken: 'rabisRefreshToken';
  readonly rabisResourceDownloaded: 'rabisResourceDownloaded';
  readonly rabisSecuritySettingsChanged: 'rabisSecuritySettingsChanged';
  readonly rabisSetMembers: 'rabisSetMembers';
};

export declare const enumAuthMethod: {
  readonly BASIC_AUTH: 'BASIC_AUTH';
  readonly CLIENT_CREDENTIALS_FLOW: 'CLIENT_CREDENTIALS_FLOW';
  readonly NO_AUTH: 'NO_AUTH';
  readonly RABIS_AUTH: 'RABIS_AUTH';
};

export declare const enumBooleanDisplayFormatEnum: {
  readonly ICON: 'ICON';
  readonly TEXT: 'TEXT';
};

export declare const enumDataObjectGenericStatus: {
  readonly INACTIVE: 'INACTIVE';
  readonly TRANSIENT: 'TRANSIENT';
  readonly USER_TASK: 'USER_TASK';
  readonly WORKLOG: 'WORKLOG';
};

export declare const enumDateDisplayFormatEnum: {
  readonly FULL: 'FULL';
  readonly LONG: 'LONG';
  readonly SHORT: 'SHORT';
};

export declare const enumDiscussionMessageParentStatusEnum: {
  readonly ACTUAL: 'ACTUAL';
  readonly ARCHIVED: 'ARCHIVED';
};

export declare const enumFilterDefaultViewEnum: {
  readonly calendarView: 'calendarView';
  readonly kanbanView: 'kanbanView';
  readonly navigateView: 'navigateView';
  readonly tileView: 'tileView';
};

export declare const enumHtmlWidgetGroupTypeEnum: {
  readonly APPLICATION: 'APPLICATION';
  readonly DATATYPE: 'DATATYPE';
  readonly MODULE: 'MODULE';
  readonly WORKSPACE: 'WORKSPACE';
};

export declare const enumMemberTypeEnum: {
  readonly GROUP: 'GROUP';
  readonly ROLE: 'ROLE';
  readonly USER: 'USER';
};

export declare const enumMetadataObjectChangeStatusActionsEnum: {
  readonly ARCHIVE: 'ARCHIVE';
  readonly DELETE: 'DELETE';
  readonly UNARCHIVE: 'UNARCHIVE';
};

export declare const enumMetadataObjectStatusEnum: {
  readonly ACTUAL: 'ACTUAL';
  readonly ARCHIVED: 'ARCHIVED';
  readonly MODIFIED: 'MODIFIED';
  readonly NOT_PUBLISHED: 'NOT_PUBLISHED';
};

export declare const enumPermissionEnum: {
  readonly CREATE: 'CREATE';
  readonly MANAGE: 'MANAGE';
  readonly READ: 'READ';
  readonly REMOVE: 'REMOVE';
  readonly WRITE: 'WRITE';
};

export declare const enumPrivacyStatusEnum: {
  readonly PRIVATE: 'PRIVATE';
  readonly PUBLIC: 'PUBLIC';
};

export declare const enumPrivilegeEnum: {
  readonly CAN_CHANGE_OWNER: 'CAN_CHANGE_OWNER';
  readonly CAN_CHANGE_STATE: 'CAN_CHANGE_STATE';
  readonly CAN_CREATE: 'CAN_CREATE';
  readonly CAN_DELETE: 'CAN_DELETE';
  readonly CAN_DOWNLOAD: 'CAN_DOWNLOAD';
  readonly CAN_EDIT: 'CAN_EDIT';
  readonly CAN_IMPORT: 'CAN_IMPORT';
  readonly CAN_MANAGE_FAVORITES: 'CAN_MANAGE_FAVORITES';
  readonly CAN_MANAGE_PERMISSIONS: 'CAN_MANAGE_PERMISSIONS';
  readonly CAN_MANAGE_SHARED_SEARCHES: 'CAN_MANAGE_SHARED_SEARCHES';
  readonly CAN_MANAGE_TEMPLATES: 'CAN_MANAGE_TEMPLATES';
  readonly CAN_MANAGE_VERSIONS: 'CAN_MANAGE_VERSIONS';
  readonly CAN_MOVE: 'CAN_MOVE';
  readonly CAN_PUBLISH: 'CAN_PUBLISH';
  readonly CAN_READ: 'CAN_READ';
  readonly CAN_SEE_HISTORY: 'CAN_SEE_HISTORY';
};

export declare const enumPropertyTypeEnum: {
  readonly ATTRIBUTES: 'ATTRIBUTES';
  readonly BOOLEAN: 'BOOLEAN';
  readonly DATA_OBJECT: 'DATA_OBJECT';
  readonly DATA_OBJECTS: 'DATA_OBJECTS';
  readonly DATE: 'DATE';
  readonly DATETIME: 'DATETIME';
  readonly DECIMAL: 'DECIMAL';
  readonly FILE: 'FILE';
  readonly FILES: 'FILES';
  readonly INTEGER: 'INTEGER';
  readonly MULTI_SELECTION: 'MULTI_SELECTION';
  readonly OBJECT_FILTER: 'OBJECT_FILTER';
  readonly SELECTION: 'SELECTION';
  readonly SEQUENCE: 'SEQUENCE';
  readonly STATUS: 'STATUS';
  readonly STRING: 'STRING';
  readonly TEXT: 'TEXT';
  readonly TIME: 'TIME';
  readonly USER: 'USER';
  readonly USERS: 'USERS';
  readonly VERSION: 'VERSION';
};

export declare const enumReferenceMetadataObjectTypeEnum: {
  readonly DATA_TYPE: 'DATA_TYPE';
  readonly GROUP: 'GROUP';
};

export declare const enumSequenceRestartInterval: {
  readonly month: 'month';
  readonly never: 'never';
  readonly year: 'year';
};

export declare const enumTextFormatTypeEnum: {
  readonly HTML: 'HTML';
  readonly PLAIN: 'PLAIN';
};

export declare const enumVersionDisplayFormatEnum: {
  readonly LONG: 'LONG';
  readonly SHORT: 'SHORT';
};

export declare const enumVersionIncrementEnum: {
  readonly MAJOR: 'MAJOR';
  readonly MINOR: 'MINOR';
};

export declare const enumVersionQualifierEnum: {
  readonly ACTUAL: 'ACTUAL';
  readonly DRAFT: 'DRAFT';
};

export declare const enumViewManagementModeEnum: {
  readonly AUTO_MANAGEMENT: 'AUTO_MANAGEMENT';
  readonly USER_MANAGEMENT: 'USER_MANAGEMENT';
};

export declare const enumViewTypeEnum: {
  readonly CALENDAR: 'CALENDAR';
  readonly CARD: 'CARD';
  readonly CONTAINER: 'CONTAINER';
  readonly EXPORT: 'EXPORT';
  readonly FORM: 'FORM';
  readonly KANBAN: 'KANBAN';
  readonly REPORTING: 'REPORTING';
  readonly TABLE: 'TABLE';
  readonly TILE: 'TILE';
};

export declare const enumWorkStateEnum: {
  readonly COMPLETED: 'COMPLETED';
  readonly ERROR: 'ERROR';
  readonly RUNNING: 'RUNNING';
  readonly SCHEDULED: 'SCHEDULED';
};
