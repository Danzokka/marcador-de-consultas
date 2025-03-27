/*
  Warnings:

  - You are about to drop the `Schedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedules" DROP CONSTRAINT "Schedules_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Schedules" DROP CONSTRAINT "Schedules_userId_fkey";

-- DropTable
DROP TABLE "Schedules";

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
