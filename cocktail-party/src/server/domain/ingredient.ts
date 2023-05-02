import { PrismaClient } from "@prisma/client";
import { Ingredient } from "~/model";

export async function getIngredientsByUser(prisma: PrismaClient, userId: string): Promise<Ingredient[]>  {
  const result = await prisma.ingredient.findMany({ include: { bartenders: { select: { id: true } } } });
  const ingredients = result.map(ingredient => {
    return {
      id: ingredient.id,
      name: ingredient.name,
      imageUrl: ingredient.imageUrl,
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
      imageUrl: ingredient.imageUrl,
      isAvailable: true
    }
  })
}