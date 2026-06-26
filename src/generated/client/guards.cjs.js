
var ApiSpec_possibleTypes = ['ApiSpec']
module.exports.isApiSpec = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isApiSpec"')
  return ApiSpec_possibleTypes.includes(obj.__typename)
}



var ApiSpecsGroup_possibleTypes = ['ApiSpecsGroup']
module.exports.isApiSpecsGroup = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isApiSpecsGroup"')
  return ApiSpecsGroup_possibleTypes.includes(obj.__typename)
}



var Application_possibleTypes = ['Application']
module.exports.isApplication = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isApplication"')
  return Application_possibleTypes.includes(obj.__typename)
}



var AssetUpload_possibleTypes = ['AssetUpload']
module.exports.isAssetUpload = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAssetUpload"')
  return AssetUpload_possibleTypes.includes(obj.__typename)
}



var AssetUploadList_possibleTypes = ['AssetUploadList']
module.exports.isAssetUploadList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAssetUploadList"')
  return AssetUploadList_possibleTypes.includes(obj.__typename)
}



var AssetUploadStatus_possibleTypes = ['AssetUploadStatus']
module.exports.isAssetUploadStatus = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAssetUploadStatus"')
  return AssetUploadStatus_possibleTypes.includes(obj.__typename)
}



var Attribute_possibleTypes = ['Attribute']
module.exports.isAttribute = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAttribute"')
  return Attribute_possibleTypes.includes(obj.__typename)
}



var AttributeValue_possibleTypes = ['AttributeValue']
module.exports.isAttributeValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAttributeValue"')
  return AttributeValue_possibleTypes.includes(obj.__typename)
}



var AuditCategory_possibleTypes = ['AuditCategory']
module.exports.isAuditCategory = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAuditCategory"')
  return AuditCategory_possibleTypes.includes(obj.__typename)
}



var AuditEvent_possibleTypes = ['AuditEvent']
module.exports.isAuditEvent = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAuditEvent"')
  return AuditEvent_possibleTypes.includes(obj.__typename)
}



var AuditLogEntriesList_possibleTypes = ['AuditLogEntriesList']
module.exports.isAuditLogEntriesList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAuditLogEntriesList"')
  return AuditLogEntriesList_possibleTypes.includes(obj.__typename)
}



var AuditLogEntry_possibleTypes = ['AuditLogEntry']
module.exports.isAuditLogEntry = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAuditLogEntry"')
  return AuditLogEntry_possibleTypes.includes(obj.__typename)
}



var BooleanDisplayFormat_possibleTypes = ['BooleanDisplayFormat']
module.exports.isBooleanDisplayFormat = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isBooleanDisplayFormat"')
  return BooleanDisplayFormat_possibleTypes.includes(obj.__typename)
}



var BpmnMessage_possibleTypes = ['BpmnMessage']
module.exports.isBpmnMessage = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isBpmnMessage"')
  return BpmnMessage_possibleTypes.includes(obj.__typename)
}



var BpmnMessageGroup_possibleTypes = ['BpmnMessageGroup']
module.exports.isBpmnMessageGroup = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isBpmnMessageGroup"')
  return BpmnMessageGroup_possibleTypes.includes(obj.__typename)
}



var BpmnProcessType_possibleTypes = ['BpmnProcessType']
module.exports.isBpmnProcessType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isBpmnProcessType"')
  return BpmnProcessType_possibleTypes.includes(obj.__typename)
}



var Collection_possibleTypes = ['Collection']
module.exports.isCollection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCollection"')
  return Collection_possibleTypes.includes(obj.__typename)
}



var CsvImportStatus_possibleTypes = ['CsvImportStatus']
module.exports.isCsvImportStatus = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCsvImportStatus"')
  return CsvImportStatus_possibleTypes.includes(obj.__typename)
}



var DataObject_possibleTypes = ['DataObject']
module.exports.isDataObject = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataObject"')
  return DataObject_possibleTypes.includes(obj.__typename)
}



var DataObjectChanges_possibleTypes = ['DataObjectChanges']
module.exports.isDataObjectChanges = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataObjectChanges"')
  return DataObjectChanges_possibleTypes.includes(obj.__typename)
}



var DataObjectHierarchy_possibleTypes = ['DataObjectHierarchy']
module.exports.isDataObjectHierarchy = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataObjectHierarchy"')
  return DataObjectHierarchy_possibleTypes.includes(obj.__typename)
}



var DataObjectList_possibleTypes = ['DataObjectList']
module.exports.isDataObjectList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataObjectList"')
  return DataObjectList_possibleTypes.includes(obj.__typename)
}



var DataObjectProperty_possibleTypes = ['DataObjectProperty']
module.exports.isDataObjectProperty = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataObjectProperty"')
  return DataObjectProperty_possibleTypes.includes(obj.__typename)
}



var DataObjectPublishInfo_possibleTypes = ['DataObjectPublishInfo']
module.exports.isDataObjectPublishInfo = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataObjectPublishInfo"')
  return DataObjectPublishInfo_possibleTypes.includes(obj.__typename)
}



var DataProperty_possibleTypes = ['DataPropertyAttributes','DataPropertyBoolean','DataPropertyDate','DataPropertyDateTime','DataPropertyDecimal','DataPropertyFile','DataPropertyFiles','DataPropertyInteger','DataPropertyMultiSelection','DataPropertyObject','DataPropertyObjectFilter','DataPropertyObjects','DataPropertySelection','DataPropertySequence','DataPropertyStatus','DataPropertyString','DataPropertyText','DataPropertyTime','DataPropertyUser','DataPropertyUserCommon','DataPropertyUsers','DataPropertyVersion']
module.exports.isDataProperty = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataProperty"')
  return DataProperty_possibleTypes.includes(obj.__typename)
}



var DataPropertyAttributes_possibleTypes = ['DataPropertyAttributes']
module.exports.isDataPropertyAttributes = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyAttributes"')
  return DataPropertyAttributes_possibleTypes.includes(obj.__typename)
}



var DataPropertyAttributesValue_possibleTypes = ['DataPropertyAttributesValue']
module.exports.isDataPropertyAttributesValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyAttributesValue"')
  return DataPropertyAttributesValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyAttributesValueUnion_possibleTypes = ['DataPropertyBooleanValue','DataPropertyDateTimeValue','DataPropertyDateValue','DataPropertyDecimalValue','DataPropertyIntegerValue','DataPropertyMultiSelectionValue','DataPropertySelectionValue','DataPropertyStringValue','DataPropertyTextValue','DataPropertyTimeValue']
module.exports.isDataPropertyAttributesValueUnion = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyAttributesValueUnion"')
  return DataPropertyAttributesValueUnion_possibleTypes.includes(obj.__typename)
}



var DataPropertyBoolean_possibleTypes = ['DataPropertyBoolean']
module.exports.isDataPropertyBoolean = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyBoolean"')
  return DataPropertyBoolean_possibleTypes.includes(obj.__typename)
}



var DataPropertyBooleanValue_possibleTypes = ['DataPropertyBooleanValue']
module.exports.isDataPropertyBooleanValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyBooleanValue"')
  return DataPropertyBooleanValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyDate_possibleTypes = ['DataPropertyDate']
module.exports.isDataPropertyDate = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyDate"')
  return DataPropertyDate_possibleTypes.includes(obj.__typename)
}



var DataPropertyDateTime_possibleTypes = ['DataPropertyDateTime']
module.exports.isDataPropertyDateTime = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyDateTime"')
  return DataPropertyDateTime_possibleTypes.includes(obj.__typename)
}



var DataPropertyDateTimeValue_possibleTypes = ['DataPropertyDateTimeValue']
module.exports.isDataPropertyDateTimeValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyDateTimeValue"')
  return DataPropertyDateTimeValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyDateValue_possibleTypes = ['DataPropertyDateValue']
module.exports.isDataPropertyDateValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyDateValue"')
  return DataPropertyDateValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyDecimal_possibleTypes = ['DataPropertyDecimal']
module.exports.isDataPropertyDecimal = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyDecimal"')
  return DataPropertyDecimal_possibleTypes.includes(obj.__typename)
}



var DataPropertyDecimalValue_possibleTypes = ['DataPropertyDecimalValue']
module.exports.isDataPropertyDecimalValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyDecimalValue"')
  return DataPropertyDecimalValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyFile_possibleTypes = ['DataPropertyFile']
module.exports.isDataPropertyFile = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyFile"')
  return DataPropertyFile_possibleTypes.includes(obj.__typename)
}



var DataPropertyFileValue_possibleTypes = ['DataPropertyFileValue']
module.exports.isDataPropertyFileValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyFileValue"')
  return DataPropertyFileValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyFiles_possibleTypes = ['DataPropertyFiles']
module.exports.isDataPropertyFiles = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyFiles"')
  return DataPropertyFiles_possibleTypes.includes(obj.__typename)
}



var DataPropertyFilesValue_possibleTypes = ['DataPropertyFilesValue']
module.exports.isDataPropertyFilesValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyFilesValue"')
  return DataPropertyFilesValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyInteger_possibleTypes = ['DataPropertyInteger']
module.exports.isDataPropertyInteger = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyInteger"')
  return DataPropertyInteger_possibleTypes.includes(obj.__typename)
}



var DataPropertyIntegerValue_possibleTypes = ['DataPropertyIntegerValue']
module.exports.isDataPropertyIntegerValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyIntegerValue"')
  return DataPropertyIntegerValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyMultiSelection_possibleTypes = ['DataPropertyMultiSelection']
module.exports.isDataPropertyMultiSelection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyMultiSelection"')
  return DataPropertyMultiSelection_possibleTypes.includes(obj.__typename)
}



var DataPropertyMultiSelectionValue_possibleTypes = ['DataPropertyMultiSelectionValue']
module.exports.isDataPropertyMultiSelectionValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyMultiSelectionValue"')
  return DataPropertyMultiSelectionValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyObject_possibleTypes = ['DataPropertyObject']
module.exports.isDataPropertyObject = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyObject"')
  return DataPropertyObject_possibleTypes.includes(obj.__typename)
}



var DataPropertyObjectFilter_possibleTypes = ['DataPropertyObjectFilter']
module.exports.isDataPropertyObjectFilter = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyObjectFilter"')
  return DataPropertyObjectFilter_possibleTypes.includes(obj.__typename)
}



var DataPropertyObjectFilterValue_possibleTypes = ['DataPropertyObjectFilterValue']
module.exports.isDataPropertyObjectFilterValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyObjectFilterValue"')
  return DataPropertyObjectFilterValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyObjectValue_possibleTypes = ['DataPropertyObjectValue']
module.exports.isDataPropertyObjectValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyObjectValue"')
  return DataPropertyObjectValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyObjects_possibleTypes = ['DataPropertyObjects']
module.exports.isDataPropertyObjects = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyObjects"')
  return DataPropertyObjects_possibleTypes.includes(obj.__typename)
}



var DataPropertyObjectsValue_possibleTypes = ['DataPropertyObjectsValue']
module.exports.isDataPropertyObjectsValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyObjectsValue"')
  return DataPropertyObjectsValue_possibleTypes.includes(obj.__typename)
}



var DataPropertySelection_possibleTypes = ['DataPropertySelection']
module.exports.isDataPropertySelection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertySelection"')
  return DataPropertySelection_possibleTypes.includes(obj.__typename)
}



var DataPropertySelectionValue_possibleTypes = ['DataPropertySelectionValue']
module.exports.isDataPropertySelectionValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertySelectionValue"')
  return DataPropertySelectionValue_possibleTypes.includes(obj.__typename)
}



var DataPropertySequence_possibleTypes = ['DataPropertySequence']
module.exports.isDataPropertySequence = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertySequence"')
  return DataPropertySequence_possibleTypes.includes(obj.__typename)
}



var DataPropertySequenceValue_possibleTypes = ['DataPropertySequenceValue']
module.exports.isDataPropertySequenceValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertySequenceValue"')
  return DataPropertySequenceValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyStatus_possibleTypes = ['DataPropertyStatus']
module.exports.isDataPropertyStatus = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyStatus"')
  return DataPropertyStatus_possibleTypes.includes(obj.__typename)
}



var DataPropertyStatusValue_possibleTypes = ['DataPropertyStatusValue']
module.exports.isDataPropertyStatusValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyStatusValue"')
  return DataPropertyStatusValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyString_possibleTypes = ['DataPropertyString']
module.exports.isDataPropertyString = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyString"')
  return DataPropertyString_possibleTypes.includes(obj.__typename)
}



var DataPropertyStringValue_possibleTypes = ['DataPropertyStringValue']
module.exports.isDataPropertyStringValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyStringValue"')
  return DataPropertyStringValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyText_possibleTypes = ['DataPropertyText']
module.exports.isDataPropertyText = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyText"')
  return DataPropertyText_possibleTypes.includes(obj.__typename)
}



var DataPropertyTextValue_possibleTypes = ['DataPropertyTextValue']
module.exports.isDataPropertyTextValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyTextValue"')
  return DataPropertyTextValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyTime_possibleTypes = ['DataPropertyTime']
module.exports.isDataPropertyTime = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyTime"')
  return DataPropertyTime_possibleTypes.includes(obj.__typename)
}



var DataPropertyTimeValue_possibleTypes = ['DataPropertyTimeValue']
module.exports.isDataPropertyTimeValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyTimeValue"')
  return DataPropertyTimeValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyUser_possibleTypes = ['DataPropertyUser']
module.exports.isDataPropertyUser = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyUser"')
  return DataPropertyUser_possibleTypes.includes(obj.__typename)
}



var DataPropertyUserCommon_possibleTypes = ['DataPropertyUserCommon']
module.exports.isDataPropertyUserCommon = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyUserCommon"')
  return DataPropertyUserCommon_possibleTypes.includes(obj.__typename)
}



var DataPropertyUserValue_possibleTypes = ['DataPropertyUserValue']
module.exports.isDataPropertyUserValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyUserValue"')
  return DataPropertyUserValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyUsers_possibleTypes = ['DataPropertyUsers']
module.exports.isDataPropertyUsers = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyUsers"')
  return DataPropertyUsers_possibleTypes.includes(obj.__typename)
}



var DataPropertyUsersValue_possibleTypes = ['DataPropertyUsersValue']
module.exports.isDataPropertyUsersValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyUsersValue"')
  return DataPropertyUsersValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyValue_possibleTypes = ['DataPropertyAttributesValue','DataPropertyBooleanValue','DataPropertyDateTimeValue','DataPropertyDateValue','DataPropertyDecimalValue','DataPropertyFileValue','DataPropertyFilesValue','DataPropertyIntegerValue','DataPropertyMultiSelectionValue','DataPropertyObjectFilterValue','DataPropertyObjectValue','DataPropertyObjectsValue','DataPropertySelectionValue','DataPropertySequenceValue','DataPropertyStatusValue','DataPropertyStringValue','DataPropertyTextValue','DataPropertyTimeValue','DataPropertyUserValue','DataPropertyUsersValue','DataPropertyVersionValue']
module.exports.isDataPropertyValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyValue"')
  return DataPropertyValue_possibleTypes.includes(obj.__typename)
}



var DataPropertyVersion_possibleTypes = ['DataPropertyVersion']
module.exports.isDataPropertyVersion = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyVersion"')
  return DataPropertyVersion_possibleTypes.includes(obj.__typename)
}



var DataPropertyVersionValue_possibleTypes = ['DataPropertyVersionValue']
module.exports.isDataPropertyVersionValue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataPropertyVersionValue"')
  return DataPropertyVersionValue_possibleTypes.includes(obj.__typename)
}



var DataType_possibleTypes = ['DataType']
module.exports.isDataType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDataType"')
  return DataType_possibleTypes.includes(obj.__typename)
}



var DateDisplayFormat_possibleTypes = ['DateDisplayFormat']
module.exports.isDateDisplayFormat = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDateDisplayFormat"')
  return DateDisplayFormat_possibleTypes.includes(obj.__typename)
}



var DefaultResources_possibleTypes = ['DefaultResources']
module.exports.isDefaultResources = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDefaultResources"')
  return DefaultResources_possibleTypes.includes(obj.__typename)
}



var DiscussionDirectMessagesRoom_possibleTypes = ['DiscussionDirectMessagesRoom']
module.exports.isDiscussionDirectMessagesRoom = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscussionDirectMessagesRoom"')
  return DiscussionDirectMessagesRoom_possibleTypes.includes(obj.__typename)
}



var DiscussionDirectMessagesRoomList_possibleTypes = ['DiscussionDirectMessagesRoomList']
module.exports.isDiscussionDirectMessagesRoomList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscussionDirectMessagesRoomList"')
  return DiscussionDirectMessagesRoomList_possibleTypes.includes(obj.__typename)
}



var DiscussionMessage_possibleTypes = ['DiscussionMessage']
module.exports.isDiscussionMessage = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscussionMessage"')
  return DiscussionMessage_possibleTypes.includes(obj.__typename)
}



var DiscussionMessageInfo_possibleTypes = ['DiscussionMessageInfo']
module.exports.isDiscussionMessageInfo = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscussionMessageInfo"')
  return DiscussionMessageInfo_possibleTypes.includes(obj.__typename)
}



var DiscussionMessageParent_possibleTypes = ['DiscussionDirectMessagesRoom','DiscussionRoom','DiscussionThread']
module.exports.isDiscussionMessageParent = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscussionMessageParent"')
  return DiscussionMessageParent_possibleTypes.includes(obj.__typename)
}



var DiscussionMessageParentStatus_possibleTypes = ['DiscussionMessageParentStatus']
module.exports.isDiscussionMessageParentStatus = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscussionMessageParentStatus"')
  return DiscussionMessageParentStatus_possibleTypes.includes(obj.__typename)
}



var DiscussionRoom_possibleTypes = ['DiscussionRoom']
module.exports.isDiscussionRoom = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscussionRoom"')
  return DiscussionRoom_possibleTypes.includes(obj.__typename)
}



var DiscussionRoomList_possibleTypes = ['DiscussionRoomList']
module.exports.isDiscussionRoomList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscussionRoomList"')
  return DiscussionRoomList_possibleTypes.includes(obj.__typename)
}



var DiscussionThread_possibleTypes = ['DiscussionThread']
module.exports.isDiscussionThread = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscussionThread"')
  return DiscussionThread_possibleTypes.includes(obj.__typename)
}



var DiscussionThreadList_possibleTypes = ['DiscussionThreadList']
module.exports.isDiscussionThreadList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscussionThreadList"')
  return DiscussionThreadList_possibleTypes.includes(obj.__typename)
}



var Document_possibleTypes = ['Document']
module.exports.isDocument = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDocument"')
  return Document_possibleTypes.includes(obj.__typename)
}



var ExternalGroup_possibleTypes = ['ExternalGroup']
module.exports.isExternalGroup = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isExternalGroup"')
  return ExternalGroup_possibleTypes.includes(obj.__typename)
}



var ExternalGroupList_possibleTypes = ['ExternalGroupList']
module.exports.isExternalGroupList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isExternalGroupList"')
  return ExternalGroupList_possibleTypes.includes(obj.__typename)
}



var ExternalGroupMapping_possibleTypes = ['ExternalGroupMapping']
module.exports.isExternalGroupMapping = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isExternalGroupMapping"')
  return ExternalGroupMapping_possibleTypes.includes(obj.__typename)
}



var File_possibleTypes = ['File']
module.exports.isFile = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isFile"')
  return File_possibleTypes.includes(obj.__typename)
}



var GenericValidationResult_possibleTypes = ['GenericValidationResult']
module.exports.isGenericValidationResult = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGenericValidationResult"')
  return GenericValidationResult_possibleTypes.includes(obj.__typename)
}



var GrantedPermissions_possibleTypes = ['GrantedPermissions']
module.exports.isGrantedPermissions = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGrantedPermissions"')
  return GrantedPermissions_possibleTypes.includes(obj.__typename)
}



var GrantedPrivileges_possibleTypes = ['GrantedPrivileges']
module.exports.isGrantedPrivileges = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGrantedPrivileges"')
  return GrantedPrivileges_possibleTypes.includes(obj.__typename)
}



var Group_possibleTypes = ['Group']
module.exports.isGroup = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGroup"')
  return Group_possibleTypes.includes(obj.__typename)
}



var GroupList_possibleTypes = ['GroupList']
module.exports.isGroupList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGroupList"')
  return GroupList_possibleTypes.includes(obj.__typename)
}



var HtmlWidget_possibleTypes = ['HtmlWidget']
module.exports.isHtmlWidget = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isHtmlWidget"')
  return HtmlWidget_possibleTypes.includes(obj.__typename)
}



var HtmlWidgetGroup_possibleTypes = ['HtmlWidgetGroup']
module.exports.isHtmlWidgetGroup = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isHtmlWidgetGroup"')
  return HtmlWidgetGroup_possibleTypes.includes(obj.__typename)
}



var Lifecycle_possibleTypes = ['Lifecycle']
module.exports.isLifecycle = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isLifecycle"')
  return Lifecycle_possibleTypes.includes(obj.__typename)
}



var LifecycleState_possibleTypes = ['LifecycleState']
module.exports.isLifecycleState = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isLifecycleState"')
  return LifecycleState_possibleTypes.includes(obj.__typename)
}



var LifecycleTransition_possibleTypes = ['LifecycleTransition']
module.exports.isLifecycleTransition = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isLifecycleTransition"')
  return LifecycleTransition_possibleTypes.includes(obj.__typename)
}



var LocaleOption_possibleTypes = ['LocaleOption']
module.exports.isLocaleOption = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isLocaleOption"')
  return LocaleOption_possibleTypes.includes(obj.__typename)
}



var Member_possibleTypes = ['Member']
module.exports.isMember = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMember"')
  return Member_possibleTypes.includes(obj.__typename)
}



var MemberType_possibleTypes = ['MemberType']
module.exports.isMemberType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMemberType"')
  return MemberType_possibleTypes.includes(obj.__typename)
}



var MetadataObject_possibleTypes = ['ApiSpec','ApiSpecsGroup','Application','BpmnMessage','BpmnProcessType','Collection','DataPropertyAttributes','DataPropertyBoolean','DataPropertyDate','DataPropertyDateTime','DataPropertyDecimal','DataPropertyFile','DataPropertyFiles','DataPropertyInteger','DataPropertyMultiSelection','DataPropertyObject','DataPropertyObjectFilter','DataPropertyObjects','DataPropertySelection','DataPropertySequence','DataPropertyStatus','DataPropertyString','DataPropertyText','DataPropertyTime','DataPropertyUser','DataPropertyUserCommon','DataPropertyUsers','DataPropertyVersion','DataType','HtmlWidget','HtmlWidgetGroup','Lifecycle','Module','PostTemplate','ReferenceDataGroup','ReferenceDataType','Role','SystemFilter','TypeFilter','View','Workbench','Workspace']
module.exports.isMetadataObject = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMetadataObject"')
  return MetadataObject_possibleTypes.includes(obj.__typename)
}



var Module_possibleTypes = ['Module']
module.exports.isModule = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isModule"')
  return Module_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
module.exports.isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var OAuth2ServiceProvider_possibleTypes = ['OAuth2ServiceProvider']
module.exports.isOAuth2ServiceProvider = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isOAuth2ServiceProvider"')
  return OAuth2ServiceProvider_possibleTypes.includes(obj.__typename)
}



var OAuth2ServiceToken_possibleTypes = ['OAuth2ServiceToken']
module.exports.isOAuth2ServiceToken = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isOAuth2ServiceToken"')
  return OAuth2ServiceToken_possibleTypes.includes(obj.__typename)
}



var PageInfo_possibleTypes = ['PageInfo']
module.exports.isPageInfo = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPageInfo"')
  return PageInfo_possibleTypes.includes(obj.__typename)
}



var Permission_possibleTypes = ['Permission']
module.exports.isPermission = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPermission"')
  return Permission_possibleTypes.includes(obj.__typename)
}



var PostTemplate_possibleTypes = ['PostTemplate']
module.exports.isPostTemplate = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPostTemplate"')
  return PostTemplate_possibleTypes.includes(obj.__typename)
}



var Privilege_possibleTypes = ['Privilege']
module.exports.isPrivilege = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPrivilege"')
  return Privilege_possibleTypes.includes(obj.__typename)
}



var PropertyGroup_possibleTypes = ['PropertyGroup']
module.exports.isPropertyGroup = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPropertyGroup"')
  return PropertyGroup_possibleTypes.includes(obj.__typename)
}



var PropertyType_possibleTypes = ['PropertyType']
module.exports.isPropertyType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPropertyType"')
  return PropertyType_possibleTypes.includes(obj.__typename)
}



var PublishedApplication_possibleTypes = ['PublishedApplication']
module.exports.isPublishedApplication = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPublishedApplication"')
  return PublishedApplication_possibleTypes.includes(obj.__typename)
}



var PublishedApplicationVersion_possibleTypes = ['PublishedApplicationVersion']
module.exports.isPublishedApplicationVersion = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPublishedApplicationVersion"')
  return PublishedApplicationVersion_possibleTypes.includes(obj.__typename)
}



var PublishedApplicationVersionList_possibleTypes = ['PublishedApplicationVersionList']
module.exports.isPublishedApplicationVersionList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPublishedApplicationVersionList"')
  return PublishedApplicationVersionList_possibleTypes.includes(obj.__typename)
}



var PublishedDataType_possibleTypes = ['PublishedDataType']
module.exports.isPublishedDataType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPublishedDataType"')
  return PublishedDataType_possibleTypes.includes(obj.__typename)
}



var PublishedExportView_possibleTypes = ['PublishedExportView']
module.exports.isPublishedExportView = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPublishedExportView"')
  return PublishedExportView_possibleTypes.includes(obj.__typename)
}



var PublishedFilter_possibleTypes = ['PublishedFilter']
module.exports.isPublishedFilter = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPublishedFilter"')
  return PublishedFilter_possibleTypes.includes(obj.__typename)
}



var PublishedHtmlWidget_possibleTypes = ['PublishedHtmlWidget']
module.exports.isPublishedHtmlWidget = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPublishedHtmlWidget"')
  return PublishedHtmlWidget_possibleTypes.includes(obj.__typename)
}



var PublishedLifecycle_possibleTypes = ['PublishedLifecycle']
module.exports.isPublishedLifecycle = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPublishedLifecycle"')
  return PublishedLifecycle_possibleTypes.includes(obj.__typename)
}



var PublishedModule_possibleTypes = ['PublishedModule']
module.exports.isPublishedModule = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPublishedModule"')
  return PublishedModule_possibleTypes.includes(obj.__typename)
}



var PublishedView_possibleTypes = ['PublishedView']
module.exports.isPublishedView = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPublishedView"')
  return PublishedView_possibleTypes.includes(obj.__typename)
}



var PublishedWorkbench_possibleTypes = ['PublishedWorkbench']
module.exports.isPublishedWorkbench = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPublishedWorkbench"')
  return PublishedWorkbench_possibleTypes.includes(obj.__typename)
}



var PublishedWorkspace_possibleTypes = ['PublishedWorkspace']
module.exports.isPublishedWorkspace = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPublishedWorkspace"')
  return PublishedWorkspace_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
module.exports.isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var RdmContentPayload_possibleTypes = ['RdmContentPayload']
module.exports.isRdmContentPayload = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRdmContentPayload"')
  return RdmContentPayload_possibleTypes.includes(obj.__typename)
}



var ReferenceDataGroup_possibleTypes = ['ReferenceDataGroup']
module.exports.isReferenceDataGroup = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isReferenceDataGroup"')
  return ReferenceDataGroup_possibleTypes.includes(obj.__typename)
}



var ReferenceDataType_possibleTypes = ['ReferenceDataType']
module.exports.isReferenceDataType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isReferenceDataType"')
  return ReferenceDataType_possibleTypes.includes(obj.__typename)
}



var ReferenceMetadataObject_possibleTypes = ['ReferenceDataGroup','ReferenceDataType']
module.exports.isReferenceMetadataObject = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isReferenceMetadataObject"')
  return ReferenceMetadataObject_possibleTypes.includes(obj.__typename)
}



var Role_possibleTypes = ['Role']
module.exports.isRole = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRole"')
  return Role_possibleTypes.includes(obj.__typename)
}



var RoleList_possibleTypes = ['RoleList']
module.exports.isRoleList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRoleList"')
  return RoleList_possibleTypes.includes(obj.__typename)
}



var Route_possibleTypes = ['Route']
module.exports.isRoute = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRoute"')
  return Route_possibleTypes.includes(obj.__typename)
}



var SavedSearch_possibleTypes = ['SavedSearch']
module.exports.isSavedSearch = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSavedSearch"')
  return SavedSearch_possibleTypes.includes(obj.__typename)
}



var Setting_possibleTypes = ['Setting']
module.exports.isSetting = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSetting"')
  return Setting_possibleTypes.includes(obj.__typename)
}



var StaticContentFile_possibleTypes = ['StaticContentFile']
module.exports.isStaticContentFile = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStaticContentFile"')
  return StaticContentFile_possibleTypes.includes(obj.__typename)
}



var Subscription_possibleTypes = ['Subscription']
module.exports.isSubscription = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSubscription"')
  return Subscription_possibleTypes.includes(obj.__typename)
}



var SubscriptionAction_possibleTypes = ['SubscriptionAction']
module.exports.isSubscriptionAction = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSubscriptionAction"')
  return SubscriptionAction_possibleTypes.includes(obj.__typename)
}



var SubscriptionActionPayload_possibleTypes = ['SubscriptionActionPayload']
module.exports.isSubscriptionActionPayload = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSubscriptionActionPayload"')
  return SubscriptionActionPayload_possibleTypes.includes(obj.__typename)
}



var SubscriptionCsvImportStatus_possibleTypes = ['SubscriptionCsvImportStatus']
module.exports.isSubscriptionCsvImportStatus = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSubscriptionCsvImportStatus"')
  return SubscriptionCsvImportStatus_possibleTypes.includes(obj.__typename)
}



var SubscriptionMessage_possibleTypes = ['SubscriptionMessage']
module.exports.isSubscriptionMessage = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSubscriptionMessage"')
  return SubscriptionMessage_possibleTypes.includes(obj.__typename)
}



var SubscriptionRdmContentChanges_possibleTypes = ['SubscriptionRdmContentChanges']
module.exports.isSubscriptionRdmContentChanges = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSubscriptionRdmContentChanges"')
  return SubscriptionRdmContentChanges_possibleTypes.includes(obj.__typename)
}



var SubscriptionUnspecifiedMessage_possibleTypes = ['SubscriptionUnspecifiedMessage']
module.exports.isSubscriptionUnspecifiedMessage = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSubscriptionUnspecifiedMessage"')
  return SubscriptionUnspecifiedMessage_possibleTypes.includes(obj.__typename)
}



var SystemDefaults_possibleTypes = ['SystemDefaults']
module.exports.isSystemDefaults = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSystemDefaults"')
  return SystemDefaults_possibleTypes.includes(obj.__typename)
}



var SystemFilter_possibleTypes = ['SystemFilter']
module.exports.isSystemFilter = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSystemFilter"')
  return SystemFilter_possibleTypes.includes(obj.__typename)
}



var SystemPage_possibleTypes = ['SystemPage']
module.exports.isSystemPage = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSystemPage"')
  return SystemPage_possibleTypes.includes(obj.__typename)
}



var TextFormatType_possibleTypes = ['TextFormatType']
module.exports.isTextFormatType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTextFormatType"')
  return TextFormatType_possibleTypes.includes(obj.__typename)
}



var Theme_possibleTypes = ['Theme']
module.exports.isTheme = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTheme"')
  return Theme_possibleTypes.includes(obj.__typename)
}



var Translate_possibleTypes = ['Translate']
module.exports.isTranslate = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTranslate"')
  return Translate_possibleTypes.includes(obj.__typename)
}



var TranslateOption_possibleTypes = ['TranslateOption']
module.exports.isTranslateOption = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTranslateOption"')
  return TranslateOption_possibleTypes.includes(obj.__typename)
}



var TypeFilter_possibleTypes = ['TypeFilter']
module.exports.isTypeFilter = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTypeFilter"')
  return TypeFilter_possibleTypes.includes(obj.__typename)
}



var User_possibleTypes = ['User']
module.exports.isUser = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}



var UserList_possibleTypes = ['UserList']
module.exports.isUserList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUserList"')
  return UserList_possibleTypes.includes(obj.__typename)
}



var UserProfile_possibleTypes = ['UserProfile']
module.exports.isUserProfile = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUserProfile"')
  return UserProfile_possibleTypes.includes(obj.__typename)
}



var ValidationResults_possibleTypes = ['ValidationResults']
module.exports.isValidationResults = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isValidationResults"')
  return ValidationResults_possibleTypes.includes(obj.__typename)
}



var Version_possibleTypes = ['Version']
module.exports.isVersion = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isVersion"')
  return Version_possibleTypes.includes(obj.__typename)
}



var VersionDisplayFormat_possibleTypes = ['VersionDisplayFormat']
module.exports.isVersionDisplayFormat = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isVersionDisplayFormat"')
  return VersionDisplayFormat_possibleTypes.includes(obj.__typename)
}



var VersionIncrement_possibleTypes = ['VersionIncrement']
module.exports.isVersionIncrement = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isVersionIncrement"')
  return VersionIncrement_possibleTypes.includes(obj.__typename)
}



var VersionInfo_possibleTypes = ['VersionInfo']
module.exports.isVersionInfo = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isVersionInfo"')
  return VersionInfo_possibleTypes.includes(obj.__typename)
}



var VersionQualifier_possibleTypes = ['VersionQualifier']
module.exports.isVersionQualifier = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isVersionQualifier"')
  return VersionQualifier_possibleTypes.includes(obj.__typename)
}



var View_possibleTypes = ['View']
module.exports.isView = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isView"')
  return View_possibleTypes.includes(obj.__typename)
}



var ViewType_possibleTypes = ['ViewType']
module.exports.isViewType = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isViewType"')
  return ViewType_possibleTypes.includes(obj.__typename)
}



var Workbench_possibleTypes = ['Workbench']
module.exports.isWorkbench = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isWorkbench"')
  return Workbench_possibleTypes.includes(obj.__typename)
}



var Workspace_possibleTypes = ['Workspace']
module.exports.isWorkspace = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isWorkspace"')
  return Workspace_possibleTypes.includes(obj.__typename)
}



var XmlAndModelDecoration_possibleTypes = ['XmlAndModelDecoration']
module.exports.isXmlAndModelDecoration = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isXmlAndModelDecoration"')
  return XmlAndModelDecoration_possibleTypes.includes(obj.__typename)
}
