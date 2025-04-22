-- CreateTable
CREATE TABLE "Contest" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" TEXT,
    "boxer1Id" INTEGER NOT NULL,
    "boxer2Id" INTEGER NOT NULL,
    "winnerId" INTEGER,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contest_boxer1Id_idx" ON "Contest"("boxer1Id");

-- CreateIndex
CREATE INDEX "Contest_boxer2Id_idx" ON "Contest"("boxer2Id");

-- CreateIndex
CREATE INDEX "Contest_winnerId_idx" ON "Contest"("winnerId");

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_boxer1Id_fkey" FOREIGN KEY ("boxer1Id") REFERENCES "Boxer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_boxer2Id_fkey" FOREIGN KEY ("boxer2Id") REFERENCES "Boxer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Boxer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
