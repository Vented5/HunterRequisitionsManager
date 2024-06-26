/*
  Warnings:

  - You are about to drop the column `validatorId` on the `requisitons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `requisitons` DROP FOREIGN KEY `Requisitons_validatorId_fkey`;

-- AlterTable
ALTER TABLE `requisitons` DROP COLUMN `validatorId`,
    MODIFY `validatedAt` DATETIME(3) NULL;
