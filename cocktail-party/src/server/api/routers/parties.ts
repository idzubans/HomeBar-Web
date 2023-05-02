import { string, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { createGuest } from "~/server/domain/guest";
import { findPartyByPin } from "~/server/domain/party";

export const partiesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string(), endDate: z.date() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.party.create({
        data: {
          userId: ctx.session?.user.id,
          name: input.name,
          endDate: input.endDate
        },
      })
    }),

  getAllByBartender: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.party.findMany({
      where: {
        userId: ctx.session?.user.id
      }
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.party.findMany();
  }),

  findParty: publicProcedure
    .input(z.object({ pin: z.string() }))
    .mutation(({ ctx, input }) => {
      return findPartyByPin(ctx.prisma, input.pin);
    }),

  join: publicProcedure
    .input(z.object({ partyId: z.string(), guestName: z.string() }))
    .mutation(({ ctx, input }) => {
      return createGuest(ctx.prisma, input.guestName, input.partyId);
    }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
