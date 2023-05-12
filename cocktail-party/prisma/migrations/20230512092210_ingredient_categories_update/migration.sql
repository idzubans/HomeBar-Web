/*
  Warnings:

  - The values [WHOLE] on the enum `MeasurementUnit` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MeasurementUnit_new" AS ENUM ('OZ', 'ML', 'DASH', 'SLICE', 'WHEEL', 'PEEL', 'TWIST', 'WEDGE', 'PIECE', 'SPOON', 'PINCH');
ALTER TABLE "RecipePart" ALTER COLUMN "unit" TYPE "MeasurementUnit_new" USING ("unit"::text::"MeasurementUnit_new");
ALTER TYPE "MeasurementUnit" RENAME TO "MeasurementUnit_old";
ALTER TYPE "MeasurementUnit_new" RENAME TO "MeasurementUnit";
DROP TYPE "MeasurementUnit_old";
COMMIT;
