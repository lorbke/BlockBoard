/*
  Warnings:

  - A unique constraint covering the columns `[publicKey]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Made the column `videoUrl` on table `BillBoard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `renterId` on table `BillBoard` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `publicKey` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillBoard" ALTER COLUMN "videoUrl" SET NOT NULL,
ALTER COLUMN "renterId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "publicKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_publicKey_key" ON "Company"("publicKey");
