import { PrismaClient } from "@prisma/client";
import { Ingredient } from "~/model";

export async function getIngredientsByUser(prisma: PrismaClient, bartenderId: string): Promise<Ingredient[]> {
  const result = await prisma.ingredient.findMany({ include: { bartenders: { select: { id: true } } } });
  const ingredients = result.map(ingredient => {
    return {
      id: ingredient.id,
      name: ingredient.name,
      isAvailable: ingredient.bartenders.some(user => user.id === bartenderId),
      category: ingredient.category
    };
  });
  return ingredients;
}

export async function getAvailableIngredients(prisma: PrismaClient, bartenderId: string): Promise<Ingredient[]> {
  const response = await prisma.ingredient.findMany({
    where: {
      bartenders: {
        some: {
          id: bartenderId
        }
      }
    }
  });
  return response.map(ingredient => {
    return {
      id: ingredient.id,
      name: ingredient.name,
      isAvailable: true,
      category: ingredient.category
    }
  })
}

export async function getAllIngredients(prisma: PrismaClient): Promise<Ingredient[]> {
  const response = await prisma.ingredient.findMany();
  return response.map(ingredient => {
    return {
      id: ingredient.id,
      name: ingredient.name,
      isAvailable: true,
      category: ingredient.category
    }
  })
}

export async function updateIngredientsStock(prisma: PrismaClient, userId: string, ingredients: Ingredient[]): Promise<boolean> {
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
  const response = await Promise.allSettled(promises);
  return response.some(promise => promise.status === 'rejected') ? false : true;
}

