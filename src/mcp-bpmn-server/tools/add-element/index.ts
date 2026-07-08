import { addGenericElementTools } from './add-element.js';
import { addUserTaskTools } from './add-user-task.js';
import { addServiceTaskTools } from './add-service-task.js';
import { addSendTaskTools } from './add-send-task.js';
import { addScriptTaskTools } from './add-script-task.js';
import { addExclusiveGatewayTools } from './add-exclusive-gateway.js';
import { addInclusiveGatewayTools } from './add-inclusive-gateway.js';
import { addStartEventTools } from './add-start-event.js';
import { addEndEventTools } from './add-end-event.js';
import { addIntermediateCatchEventTools } from './add-intermediate-catch-event.js';
import { addIntermediateThrowEventTools } from './add-intermediate-throw-event.js';
import { addBoundaryEventTools } from './add-boundary-event.js';
import { addSubProcessTools } from './add-sub-process.js';

export const addElementTools = [
  ...addGenericElementTools,
  ...addUserTaskTools,
  ...addServiceTaskTools,
  ...addSendTaskTools,
  ...addScriptTaskTools,
  ...addExclusiveGatewayTools,
  ...addInclusiveGatewayTools,
  ...addStartEventTools,
  ...addEndEventTools,
  ...addIntermediateCatchEventTools,
  ...addIntermediateThrowEventTools,
  ...addBoundaryEventTools,
  ...addSubProcessTools,
];
