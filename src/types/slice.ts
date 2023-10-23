import { z } from 'zod';

export interface Slice {
  name: string;
  start: string;
  end: string;
  color: string;
}

export const createSliceInput = z.object({
  name: z.string().min(1),
  pieId: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const getSlices = z.object({
  pieId: z.string(),
});
