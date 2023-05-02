import { NextApiRequest, NextApiResponse } from "next/types"
import { Drink } from "~/model";
import { getDrinks } from "~/server/domain/drink";
import { createGuest } from "~/server/domain/guest";

type ResponseData = {
  guestId: string,
  drinks: Drink[],
}

type RequestData = {
  guestName: string,
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
//   const { id } = req.query;
//   const partyId = id as string;
//   const payload: RequestData = req.body;
//   const result = await createGuest(payload.guestName, partyId);

//   if (!result) {
//     res.status(400).json({ guestId: "", drinks: [] });
//   }

//   const drinks = await getDrinks({ partyId: partyId });

//   res.status(200).json({ guestId: result.id, drinks })
// }


