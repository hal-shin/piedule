import { z } from 'zod';

export const createSliceInput = z.object({
  name: z.string().min(1),
  pieId: z.string().optional(),
  start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  color: z.string().optional(),
});

export const getSlices = z.object({
  pieId: z.string(),
});

export const updateSlice = z.object({
  name: z.string().min(1),
  sliceId: z.string(),
  start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  color: z.string().optional(),
});

export const deleteSlice = z.object({
  sliceId: z.string(),
});
