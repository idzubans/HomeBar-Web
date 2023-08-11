import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { getDrinks } from "~/server/domain/drink";

export const drinksRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({
      barId: z.string().optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      categories: z.array(z.string()).optional(),
      ingredients: z.array(z.string()).optional(),
      searchString: z.string().optional(),
    }))
    .query(({ ctx, input }) => {
      return getDrinks(ctx.prisma, input);
    })
});
