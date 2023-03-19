import { NextApiRequest, NextApiResponse } from "next/types"
import { Drink } from "~/model";
import { prisma } from "~/server/db";
import { getDrinks } from "~/server/drinks/getDrinks";

type ResponseData = {
  guestId: string,
  drinks: Drink[],
}

type RequestData = {
  guestName: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { id } = req.query;
  const partyId = id as string;
  const Payload: RequestData = req.body;
  const result = await prisma.guest.create({
    data: {
      name: Payload.guestName,
      party: { connect: { id: partyId } }
    },
  });

  if (!result) {
    res.status(400).json({ guestId: "", drinks: [] });
  }

  const drinks = await getDrinks({ partyId: partyId });

  res.status(200).json({ guestId: result.id, drinks })
}