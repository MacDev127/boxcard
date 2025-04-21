/*
  Warnings:

  - You are about to drop the `Contest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contest" DROP CONSTRAINT "Contest_boxer1Id_fkey";

-- DropForeignKey
ALTER TABLE "Contest" DROP CONSTRAINT "Contest_boxer2Id_fkey";

-- DropTable
DROP TABLE "Contest";
