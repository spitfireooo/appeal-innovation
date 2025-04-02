-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NEW', 'WORKED', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "Appeal" (
    "id" SERIAL NOT NULL,
    "theme" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppealFeedback" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "type" "Status" NOT NULL,
    "appealId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppealFeedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppealFeedback" ADD CONSTRAINT "AppealFeedback_appealId_fkey" FOREIGN KEY ("appealId") REFERENCES "Appeal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
