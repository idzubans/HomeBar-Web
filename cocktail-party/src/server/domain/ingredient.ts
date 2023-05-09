import { PrismaClient } from "@prisma/client";
import { Ingredient } from "~/model";

export async function getIngredientsByUser(prisma: PrismaClient, userId: string): Promise<Ingredient[]> {
  const result = await prisma.ingredient.findMany({ include: { bartenders: { select: { id: true } } } });
  const ingredients = result.map(ingredient => {
    return {
      id: ingredient.id,
      name: ingredient.name,
      isAvailable: ingredient.bartenders.some(user => user.id === userId)
    };
  });
  return ingredients;
}

export async function getIngredients(prisma: PrismaClient): Promise<Ingredient[]> {
  const response = await prisma.ingredient.findMany();
  return response.map(ingredient => {
    return {
      id: ingredient.id,
      name: ingredient.name,
      isAvailable: true
    }
  })
}

export async function updateIngredientsStock(prisma: PrismaClient, userId: string, ingredients: Ingredient[]): Promise<Ingredient[]> {
  const promises = ingredients.map(async ingredient => {
    return await prisma.ingredient.update({
      where: { id: ingredient.id },
      data: {
        bartenders:
          ingredient.isAvailable
            ? { disconnect: { id: userId } }
            : { connect: { id: userId } }
      },
      include: { bartenders: { select: { id: true } } }
    })
  })
  const response = await Promise.all(promises);
  return response.map(ingredient => {
    return {
      id: ingredient.id,
      name: ingredient.name,
      isAvailable: ingredient.bartenders.some(user => user.id === userId)
    }
  });
}

