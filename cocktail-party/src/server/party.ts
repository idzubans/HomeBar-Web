

import { Ingredient, Party } from "~/model";
import { prisma } from "~/server/db";

export async function getPartyById(partyId: string): Promise<Party | null> {
  const dbQuery = {
    where: {
      id: partyId
    },
  }
  return await prisma.party.findFirst(dbQuery)
}