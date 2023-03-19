import { NextApiRequest, NextApiResponse } from "next";
import { SearchDrinksParams } from "~/model";
import { getDrinks } from "~/server/drinks/getDrinks";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const filterParams = query as SearchDrinksParams;
  const drinks = await getDrinks(filterParams);
  res.status(200).json(drinks);
}