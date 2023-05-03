import { PrismaClient } from "@prisma/client";
import { Party } from "~/model"

export async function getPartyById(prisma: PrismaClient, partyId: string): Promise<Party | null> {
  return await prisma.party.findFirst({
    where: {
      id: partyId
    },
  })
}

export async function findPartyByPin(prisma: PrismaClient, pin: string): Promise<Party | null> {
  return await prisma.party.findFirst({
    where: {
      AND: [
        {
          id: {
            startsWith: pin,
          }
        },
        {
          endDate: {
            gte: new Date()
          }
        }
      ],
    },
  });
}

