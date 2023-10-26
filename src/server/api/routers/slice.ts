import { TRPCError } from '@trpc/server';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import {
  createSliceInput,
  deleteSlice,
  getSlices,
  updateSlice,
} from '@/types/slice';

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
          color: input.color,
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

  update: protectedProcedure
    .input(updateSlice)
    .mutation(async ({ ctx, input }) => {
      const slice = await ctx.db.slice.findFirstOrThrow({
        where: {
          id: input.sliceId,
        },
        include: {
          pie: {
            include: {
              owner: true,
            },
          },
        },
      });

      if (slice.pie.owner.id !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: "You cannot edit slice for a pie you don't own.",
        });
      }

      return ctx.db.slice.update({
        where: {
          id: input.sliceId,
        },
        data: {
          name: input.name,
          start: input.start,
          end: input.end,
          color: input.color,
        },
      });
    }),

  delete: protectedProcedure
    .input(deleteSlice)
    .mutation(async ({ ctx, input }) => {
      const slice = await ctx.db.slice.findFirstOrThrow({
        where: {
          id: input.sliceId,
        },
        include: {
          pie: {
            include: {
              owner: true,
            },
          },
        },
      });

      if (slice.pie.owner.id !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: "You cannot edit slice for a pie you don't own.",
        });
      }

      return ctx.db.slice.delete({
        where: {
          id: input.sliceId,
        },
      });
    }),
});
