import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { createPieInput } from '@/types/pie';
import { convertStringToURLSlug } from '@/utils/format';

export const pieRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPieInput)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call

      return ctx.db.pie.create({
        data: {
          name: input.name.trim(),
          description: input.description,
          slug: convertStringToURLSlug(input.name.trim()),
          owner: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.pie.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        owner: {
          id: ctx.session.user.id,
        },
      },
    });
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.pie.findMany({
      where: { owner: ctx.session.user },
      include: {
        slices: true,
      },
    });
  }),
});
