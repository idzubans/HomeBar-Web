import { Category } from "@prisma/client";
import { prisma } from "../db";

export async function getCategories(): Promise<Category[]> {
  return await prisma.category.findMany()
}