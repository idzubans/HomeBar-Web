import { Ingredient } from "~/model";
import { prisma } from "~/server/db";

export async function getIngredients(): Promise<Ingredient[]> {
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