import { Drink } from "~/model";
import { prisma } from "~/server/db";

export async function getDrinkById(id: string): Promise<Drink> {
  const dbQuery = {
    where: {
      id: id
    },
    include: {
      ingredients: {
        select: {
          ingredient: {
            select: {
              name: true,
              id: true
            }
          },
          amount: true,
          unit: true
        }
      },
      categories: {
        select: {
          id: true,
          name: true
        }
      }
    }
  }
  const drink = await prisma.drink.findFirst(dbQuery);
  if (!drink) {
    throw new Error(`Drink with id ${id} not found`);
  }
  return {
    id: drink.id,
    name: drink.name,
    imageUrl: drink.imageUrl,
    tutorialUrl: drink.tutorialUrl,
    categories: drink.categories,
    ingredients: drink.ingredients.map(x => {
      return {
        name: x.ingredient.name,
        id: x.ingredient.id,
        amount: Number(x.amount),
        unit: x.unit
      }
    })
  }
}

