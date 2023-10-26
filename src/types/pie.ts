import { z } from 'zod';

export const createPieInput = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  slug: z.string().min(2).optional(),
});
