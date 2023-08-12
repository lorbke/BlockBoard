-- CreateEnum
CREATE TYPE "BillBoardStatus" AS ENUM ('FREE', 'RENTED');

-- AlterTable
ALTER TABLE "BillBoard" ADD COLUMN     "status" "BillBoardStatus" NOT NULL DEFAULT 'FREE';
