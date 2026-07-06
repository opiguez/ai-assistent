declare module 'bpmn-moddle' {
  class BpmnModdle {
    constructor(packages?: any[], options?: any);
    fromXML(xmlStr: string, typeName?: string, options?: any): Promise<{
      rootElement: any;
      elementsById: Record<string, any>;
      warnings: any[];
    }>;
    toXML(definitions: any, options?: any): Promise<{ xml: string }>;
  }
  export default BpmnModdle;
}

declare module 'moddle' {
  class Moddle {
    constructor(packages?: any[], options?: any);
  }
  export { Moddle };
}

declare module 'moddle-xml' {
  export function read(data: any, options?: any): any;
  export function write(definitions: any, options?: any): any;
}
