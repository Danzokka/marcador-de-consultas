/*
  Warnings:

  - You are about to drop the column `date` on the `Schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_userId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "date",
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
