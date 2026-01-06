/*
  Warnings:

  - You are about to drop the column `amount` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `donationAmount` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donationType` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donorEmail` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donorName` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "amount",
DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "donationAmount" INTEGER NOT NULL,
ADD COLUMN     "donationType" TEXT NOT NULL,
ADD COLUMN     "donorEmail" TEXT NOT NULL,
ADD COLUMN     "donorName" TEXT NOT NULL,
ADD COLUMN     "isAnon" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "status" SET DEFAULT 'pending';
