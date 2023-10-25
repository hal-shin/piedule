import { z } from 'zod';

export const createPieInput = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});
