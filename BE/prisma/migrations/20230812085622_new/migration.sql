-- AlterTable
ALTER TABLE "BillBoard" ADD COLUMN     "renterId" TEXT;

-- AddForeignKey
ALTER TABLE "BillBoard" ADD CONSTRAINT "BillBoard_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
