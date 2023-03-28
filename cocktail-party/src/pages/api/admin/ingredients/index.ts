import { NextApiRequest, NextApiResponse } from "next";
import { Ingredient } from "~/model";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;
  switch (req.method) {
    case "GET":
      const result = await prisma.ingredient.findMany({ include: { bartenders: { select: { id: true } } } });
      const ingredients = result.map(ingredient => {
        return {
          id: ingredient.id,
          name: ingredient.name,
          imageUrl: ingredient.imageUrl,
          isAvailable: ingredient.bartenders.some(user => user.id === userId)
        }
      });
      res.status(200).json(ingredients);
      break;
    case "PUT":
      const newIngredients: Ingredient[] = req.body;
      const promises = newIngredients.map(async ingredient => {
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
      response.map(ingredient => {
        return {
          id: ingredient.id,
          name: ingredient.name,
          imageUrl: ingredient.imageUrl,
          isAvailable: ingredient.bartenders.some(user => user.id === userId)
        }
      })

      res.status(200).json(response);
      break;
    default:
      res.status(405).end();
  }

}