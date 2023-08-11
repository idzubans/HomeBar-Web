import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createOrder } from "~/server/domain/order";

export const ordersRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        guestName: z.string(),
        drinkId: z.string(),
        barId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return createOrder(ctx.prisma, input);
    }),
});