import { pieRouter } from '@/server/api/routers/pie';
import { postRouter } from '@/server/api/routers/post';
import { sliceRouter } from '@/server/api/routers/slice';
import { createTRPCRouter } from '@/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  pie: pieRouter,
  slice: sliceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
