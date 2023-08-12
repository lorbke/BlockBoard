/*
  Warnings:

  - You are about to drop the column `name` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Company_name_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "name",
DROP COLUMN "passwordHash",
ADD COLUMN     "password" VARCHAR(100) NOT NULL,
ADD COLUMN     "username" VARCHAR(45) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_username_key" ON "Company"("username");
