import { z } from 'zod';

export type ToolDef = {
  name: string;
  config: { title: string; description: string; inputSchema: z.ZodObject<any> };
  cb: (args: any) => Promise<any>;
};
