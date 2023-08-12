/*
  Warnings:

  - You are about to drop the column `GEoY` on the `BillBoard` table. All the data in the column will be lost.
  - Added the required column `GeoY` to the `BillBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillBoard" DROP COLUMN "GEoY",
ADD COLUMN     "GeoY" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "privateKey" TEXT;
