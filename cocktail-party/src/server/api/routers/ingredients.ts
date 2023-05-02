import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { getIngredientsByUser } from "~/server/domain/ingredient";

export const ingredientsRouter = createTRPCRouter({
  getByUserId: protectedProcedure
  .query(({ ctx }) => {
    return getIngredientsByUser(ctx.prisma, ctx.session.user.id);
  })
});
