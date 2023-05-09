/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `instructions` to the `Drink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "MeasurementUnit" ADD VALUE 'PINCH';

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "Drink" ADD COLUMN     "instructions" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "imageUrl";
