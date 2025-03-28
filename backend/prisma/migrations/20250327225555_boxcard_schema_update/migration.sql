-- CreateTable
CREATE TABLE "Contest" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boxer1Id" INTEGER NOT NULL,
    "boxer2Id" INTEGER NOT NULL,
    "winnerId" INTEGER,
    "result" TEXT,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_boxer1Id_fkey" FOREIGN KEY ("boxer1Id") REFERENCES "Boxer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_boxer2Id_fkey" FOREIGN KEY ("boxer2Id") REFERENCES "Boxer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
