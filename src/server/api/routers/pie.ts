import { TRPCError } from '@trpc/server';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import {
  createPieInput,
  deletePieInput,
  getPieByIdInput,
  getPieBySlugInput,
  updatePieInput,
} from '@/types/pie';
import { convertStringToURLSlug } from '@/utils/format';

export const pieRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPieInput)
    .mutation(async ({ ctx, input }) => {
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

  getById: protectedProcedure
    .input(getPieByIdInput)
    .query(async ({ ctx, input }) => {
      return ctx.db.pie.findFirst({
        where: {
          id: input.id,
          owner: {
            id: ctx.session.user.id,
          },
        },
      });
    }),

  getBySlug: protectedProcedure
    .input(getPieBySlugInput)
    .query(async ({ ctx, input }) => {
      return ctx.db.pie.findFirst({
        where: {
          slug: input.slug,
          owner: {
            id: ctx.session.user.id,
          },
        },
        include: {
          slices: true,
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

  update: protectedProcedure
    .input(updatePieInput)
    .mutation(async ({ ctx, input }) => {
      const pie = await ctx.db.pie.findFirstOrThrow({
        where: {
          id: input.id,
        },
        include: {
          owner: true,
        },
      });

      if (pie.owner.id !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: "You cannot edit a pie you don't own.",
        });
      }

      return ctx.db.pie.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name.trim(),
          description: input.description,
          slug: convertStringToURLSlug(input.name.trim()),
        },
      });
    }),

  delete: protectedProcedure
    .input(deletePieInput)
    .mutation(async ({ ctx, input }) => {
      const pie = await ctx.db.pie.findFirstOrThrow({
        where: {
          id: input.id,
        },
        include: {
          owner: true,
        },
      });

      if (pie.owner.id !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: "You cannot edit a pie you don't own.",
        });
      }

      return ctx.db.pie.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
