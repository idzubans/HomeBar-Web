import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { getIngredientsByUser, updateIngredientsStock } from "~/server/domain/ingredient";

export const ingredientsRouter = createTRPCRouter({
  getByUserId: protectedProcedure
    .query(({ ctx }) => {
      return getIngredientsByUser(ctx.prisma, ctx.session.user.id);
    }),

  update: protectedProcedure
    .input(z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        isAvailable: z.boolean(),
      })
    ))
    .mutation(({ ctx, input }) => {
      return updateIngredientsStock(ctx.prisma, ctx.session.user.id, input);
    }),
});
