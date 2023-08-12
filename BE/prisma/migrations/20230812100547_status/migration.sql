-- DropForeignKey
ALTER TABLE "BillBoard" DROP CONSTRAINT "BillBoard_renterId_fkey";

-- AddForeignKey
ALTER TABLE "BillBoard" ADD CONSTRAINT "BillBoard_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Company"("publicKey") ON DELETE CASCADE ON UPDATE CASCADE;
