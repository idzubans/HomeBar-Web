import { PrismaClient } from "@prisma/client";
import { Category, Drink, SearchDrinksParams } from "~/model";
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

export async function getCategories(): Promise<Category[]> {
  return await prisma.category.findMany()
}

export async function getDrinks(prisma: PrismaClient, params: SearchDrinksParams): Promise<Drink[]> {
  const dbResponse = await prisma.drink.findMany(
    {
      where: {
        AND: [
          {
            ...(params.barId && {
              ingredients: {
                every: {
                  ingredient: {
                    bars: {
                      some: {
                        id: params.barId
                      }
                    }
                  }
                }
              },
            })
          },
          {
            ...(params.categories && {
              categories: {
                some: {
                  name: {
                    in: params.categories
                  }
                }
              }
            })
          },
          {
            ...(params.ingredients && {
              ingredients: {
                some: {
                  ingredient: {
                    name: {
                      in: params.ingredients
                    }
                  }
                }
              }
            })
          },
          {
            ...(params.searchString && {
              name: {
                contains: params.searchString
              }
            })
          },
        ]

      },
      skip: params.skip ? params.skip : 0,
      take: params.take ? params.take : 20,
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
  );
  return dbResponse.map(drink => {
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
  });
}