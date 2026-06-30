import { z } from 'zod';

export function defineTool<T extends z.ZodObject<any, any>>(
  name: string,
  config: { title: string; description: string; inputSchema: T },
  cb: (args: z.infer<T>) => Promise<any>,
) {
  return { name, config, cb };
}
