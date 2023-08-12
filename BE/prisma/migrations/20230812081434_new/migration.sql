/*
  Warnings:

  - You are about to drop the column `renterId` on the `BillBoard` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BillBoard" DROP CONSTRAINT "BillBoard_renterId_fkey";

-- AlterTable
ALTER TABLE "BillBoard" DROP COLUMN "renterId";
