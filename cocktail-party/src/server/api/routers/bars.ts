import { string, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { findBarByPin } from "~/server/domain/bar";

export const barsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.bar.create({
        data: {
          bartenderId: ctx.session?.user.id,
          name: input.name,

        },
      })
    }),

  getAllByBartender: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.bar.findMany({
      where: {
        bartenderId: ctx.session?.user.id
      }
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: string() }))
    .query(({ ctx, input}) => {

      return ctx.prisma.bar.findFirst({
        where: {
          id: input.id
        },
        include: {
          order: {
            include: {
              drink: true
            }
          }
        }
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.bar.findMany();
  }),

  findByPin: publicProcedure
    .input(z.object({ pin: z.string() }))
    .mutation(({ ctx, input }) => {
      return findBarByPin(ctx.prisma, input.pin);
    }),

  // join: publicProcedure
  //   .input(z.object({ partyId: z.string(), guestName: z.string() }))
  //   .mutation(({ ctx, input }) => {
  //     return createGuest(ctx.prisma, input.guestName, input.partyId);
  //   }),
});
