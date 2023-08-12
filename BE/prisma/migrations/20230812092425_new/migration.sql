/*
  Warnings:

  - You are about to drop the column `publicKey` on the `Company` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Company_publicKey_key";

-- AlterTable
ALTER TABLE "BillBoard" ALTER COLUMN "videoUrl" DROP NOT NULL,
ALTER COLUMN "renterId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "publicKey";
