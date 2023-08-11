import { PrismaClient } from "@prisma/client";
import { Bar } from "~/model"

export async function getBarById(prisma: PrismaClient, id: string): Promise<Bar | null> {
  return await prisma.bar.findFirst({
    where: {
      id: id
    },
  })
}

export async function getAllBarIds(prisma: PrismaClient): Promise<string[]> {
  const bars = await prisma.bar.findMany({
    select: {
      id: true
    }
  });
  return bars.map(bars => bars.id);
}

export async function findBarByPin(prisma: PrismaClient, pin: string): Promise<Bar | null> {
  return await prisma.bar.findFirst({
    where: {
      AND: [
        {
          id: {
            startsWith: pin,
          }
        },
      ],
    },
  });
}

