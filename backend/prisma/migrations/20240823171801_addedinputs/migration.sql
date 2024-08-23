/*
  Warnings:

  - You are about to drop the column `details` on the `Data` table. All the data in the column will be lost.
  - Added the required column `cropName` to the `Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soilType` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "details",
ADD COLUMN     "cropName" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "soilType" TEXT NOT NULL;
