/*
  Warnings:

  - Added the required column `GEoY` to the `BillBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GeoX` to the `BillBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renterId` to the `BillBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillBoard" ADD COLUMN     "GEoY" TEXT NOT NULL,
ADD COLUMN     "GeoX" TEXT NOT NULL,
ADD COLUMN     "renterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "BillBoard" ADD CONSTRAINT "BillBoard_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Company"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
