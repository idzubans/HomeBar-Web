import { PrismaClient } from "@prisma/client";
import { Order } from "~/model";

export async function createOrder(prisma: PrismaClient, order: Order): Promise<Order> {
  const response = await prisma.order.create({
    data: {
      guestName: order.guestName,
      drinkId: order.drinkId,
      partyId: order.partyId
    }
  });
  return response;
}