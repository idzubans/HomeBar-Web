import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { getIngredientsByUser, updateIngredientsStock } from "~/server/domain/ingredient";

export const ingredientsRouter = createTRPCRouter({
  getByBarId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return getIngredientsByUser(ctx.prisma, input.id);
    }),

  update: protectedProcedure
    .input(
      z.object({
        barId: z.string(),
        ingredients: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            isAvailable: z.boolean(),
            category: z.nullable(z.string()),
          })
        )
      }),
      )
    .mutation(async ({ ctx, input }) => {
      const response = await updateIngredientsStock(ctx.prisma, input.barId, input.ingredients);
      ctx.res.revalidate(`/bar/${input.barId}`);
      return response;
    }),
});
