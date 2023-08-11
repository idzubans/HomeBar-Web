/*
  Warnings:

  - You are about to drop the column `partyId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Party` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IngredientToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `barId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_partyId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_partyId_fkey";

-- DropForeignKey
ALTER TABLE "Party" DROP CONSTRAINT "Party_userId_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToUser" DROP CONSTRAINT "_IngredientToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToUser" DROP CONSTRAINT "_IngredientToUser_B_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "partyId",
ADD COLUMN     "barId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Guest";

-- DropTable
DROP TABLE "Party";

-- DropTable
DROP TABLE "_IngredientToUser";

-- CreateTable
CREATE TABLE "Bar" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "bartenderId" TEXT NOT NULL,

    CONSTRAINT "Bar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BarToIngredient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Bar_name_key" ON "Bar"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_BarToIngredient_AB_unique" ON "_BarToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_BarToIngredient_B_index" ON "_BarToIngredient"("B");

-- AddForeignKey
ALTER TABLE "Bar" ADD CONSTRAINT "Bar_bartenderId_fkey" FOREIGN KEY ("bartenderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_barId_fkey" FOREIGN KEY ("barId") REFERENCES "Bar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BarToIngredient" ADD CONSTRAINT "_BarToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Bar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BarToIngredient" ADD CONSTRAINT "_BarToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
