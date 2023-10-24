import { TRPCError } from '@trpc/server';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { createSliceInput, getSlices } from '@/types/slice';

export const sliceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createSliceInput)
    .mutation(async ({ ctx, input }) => {
      const pie = await ctx.db.pie.findFirstOrThrow({
        where: {
          id: input.pieId,
        },
        include: {
          owner: true,
        },
      });

      if (pie.owner.id !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: "You cannot create slice for a pie you don't own.",
        });
      }

      return ctx.db.slice.create({
        data: {
          name: input.name,
          start: input.start,
          end: input.end,
          pie: {
            connect: {
              id: pie.id,
            },
          },
        },
      });
    }),

  getAll: protectedProcedure.input(getSlices).query(async ({ ctx, input }) => {
    const pie = await ctx.db.pie.findFirstOrThrow({
      where: {
        id: input.pieId,
      },
      include: {
        owner: true,
      },
    });

    if (pie.owner.id !== ctx.session.user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Pie does not belong to you.',
      });
    }

    return ctx.db.slice.findMany({
      where: { pieId: input.pieId },
    });
  }),
});
