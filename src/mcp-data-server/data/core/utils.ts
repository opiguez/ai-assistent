import { z } from 'zod';

export const success = (id: string, message: string) => ({
  content: [
    {
      type: 'text' as const,
      text: JSON.stringify({ id, status: 'success', message }),
    },
  ],
});

export const successList = (items: unknown[], message: string) => ({
  content: [
    {
      type: 'text' as const,
      text: JSON.stringify({
        items,
        totalCount: items.length,
        status: 'success',
        message,
      }),
    },
  ],
});

export const error = (e: any, fallback: string) => {
  console.error(`[MCP Error]`, e);
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({
          status: 'error',
          message: e?.message || e?.toString() || fallback,
        }),
      },
    ],
  };
};

export function deriveUpdateSchema<T extends z.ZodRawShape>(
  createSchema: z.ZodObject<T>,
  options?: { omitFields?: string[]; extraFields?: Record<string, z.ZodTypeAny> },
) {
  const omit = new Set(options?.omitFields || ['parentId']);
  const shape = createSchema.shape as any as Record<string, z.ZodTypeAny>;
  const updateShape: Record<string, z.ZodTypeAny> = {
    id: z.string().describe('ID'),
  };
  for (const [key, schema] of Object.entries(shape)) {
    if (omit.has(key)) continue;
    updateShape[key] = schema.optional();
  }
  if (options?.extraFields) {
    Object.assign(updateShape, options.extraFields);
  }
  return z.object(updateShape);
}
