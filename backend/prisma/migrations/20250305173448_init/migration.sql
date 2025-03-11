-- CreateTable
CREATE TABLE "Boxer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "profileImage" TEXT,
    "club" TEXT,
    "province" TEXT,
    "age" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "stance" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "fightsWon" INTEGER NOT NULL DEFAULT 0,
    "fightsLost" INTEGER NOT NULL DEFAULT 0,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Boxer_pkey" PRIMARY KEY ("id")
);
