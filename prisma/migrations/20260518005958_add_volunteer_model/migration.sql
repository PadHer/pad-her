/*
  Warnings:

  - The primary key for the `Volunteer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `emailAddress` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `interest` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `isAgree` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `whyVolunteer` on the `Volunteer` table. All the data in the column will be lost.
  - The `id` column on the `Volunteer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `email` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Volunteer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Volunteer_emailAddress_key";

-- AlterTable
ALTER TABLE "Volunteer" DROP CONSTRAINT "Volunteer_pkey",
DROP COLUMN "emailAddress",
DROP COLUMN "fullName",
DROP COLUMN "interest",
DROP COLUMN "isAgree",
DROP COLUMN "phoneNumber",
DROP COLUMN "whyVolunteer",
ADD COLUMN     "availability" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "opportunityId" INTEGER,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id");
