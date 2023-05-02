import { PrismaClient } from "@prisma/client";

export async function createGuest(prisma: PrismaClient, guestName: string, partyId: string) {
  const result = await prisma.guest.create({
    data: {
      name: guestName,
      party: { connect: { id: partyId } }
    },
  });
  return result.id;
}