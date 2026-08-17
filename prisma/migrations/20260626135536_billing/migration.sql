/*
  Warnings:

  - You are about to drop the column `razorpaySubscriptionID` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "razorpaySubscriptionID",
ADD COLUMN     "razorpaySubscriptionId" TEXT;
