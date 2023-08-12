/*
  Warnings:

  - The primary key for the `BillBoard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `BillBoard` table. All the data in the column will be lost.
  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[privateKey]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `BillBoard` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Company` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `privateKey` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BillBoard" DROP CONSTRAINT "BillBoard_renterId_fkey";

-- AlterTable
ALTER TABLE "BillBoard" DROP CONSTRAINT "BillBoard_pkey",
DROP COLUMN "Id",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "renterId" DROP NOT NULL,
ADD CONSTRAINT "BillBoard_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
DROP COLUMN "Id",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "privateKey" SET NOT NULL,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Company_privateKey_key" ON "Company"("privateKey");

-- AddForeignKey
ALTER TABLE "BillBoard" ADD CONSTRAINT "BillBoard_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
