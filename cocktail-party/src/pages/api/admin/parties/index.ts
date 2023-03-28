import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;
  switch (req.method) {
    case "GET":
      const parties = await prisma.party.findMany({
        where: {
          userId: userId
        },
      })
      res.status(200).json(parties);
      break;
    case "POST":
      const request = req.body;
      const result = await prisma.party.create({
        data: {
          userId: request.userId,
          name: request.name,
          endDate: request.endDate
        },
      })

      res.status(201).json({
        id: result.id,
        name: result.name,
        endDate: result.endDate,
      });

      break;
    default:
      res.status(405).end();
  }

}