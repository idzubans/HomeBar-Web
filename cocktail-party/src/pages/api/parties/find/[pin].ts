import { NextApiRequest, NextApiResponse } from "next/types"
import { Party } from "~/model";
import { prisma } from "~/server/db";

type ResponseData = {
  partyDetail: Party | null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { pin } = req.query;

  const dbQuery = {
    where: {
      AND: [
        {
          id: {
            startsWith: pin as string,
          }
        },
        {
          endDate: {
            gte: new Date()
          }
        }
      ],
    },
  }
  const partyDetail = await prisma.party.findFirst(dbQuery);

  partyDetail
    ? res.status(200).json({ partyDetail })
    : res.status(404).json({ partyDetail: null })
}