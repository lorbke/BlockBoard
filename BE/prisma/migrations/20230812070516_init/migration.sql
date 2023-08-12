-- CreateTable
CREATE TABLE "BillBoard" (
    "Id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videoUrl" TEXT,

    CONSTRAINT "BillBoard_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Company" (
    "Id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BillBoard_walletAddress_key" ON "BillBoard"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
