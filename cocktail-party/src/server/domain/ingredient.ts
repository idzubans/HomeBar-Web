import { PrismaClient } from "@prisma/client";
import { Ingredient } from "~/model";

export async function getIngredientsByUser(prisma: PrismaClient, barId: string): Promise<Ingredient[]> {
  console.log("getIngredientsByUser");
  const result = await prisma.ingredient.findMany({ include: { bars: { select: { id: true } } } });
  const ingredients = result.map(ingredient => {
    return {
      id: ingredient.id,
      name: ingredient.name,
      isAvailable: ingredient.bars.some(bar => bar.id === barId),
      category: ingredient.category
    };
  });
  return ingredients;
}

export async function getAvailableIngredients(prisma: PrismaClient, barId: string): Promise<Ingredient[]> {
  const response = await prisma.ingredient.findMany({
    where: {
      bars: {
        some: {
          id: barId
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

export async function updateIngredientsStock(prisma: PrismaClient, barId: string, ingredients: Ingredient[]): Promise<boolean> {
  const promises = ingredients.map(async ingredient => {
    return await prisma.ingredient.update({
      where: { id: ingredient.id },
      data: {
        bars:
          ingredient.isAvailable
            ? { disconnect: { id: barId } }
            : { connect: { id: barId } }
      },
      include: { bars: { select: { id: true } } }
    })
  })
  const response = await Promise.allSettled(promises);
  return response.some(promise => promise.status === 'rejected') ? false : true;
}

