/*
  Warnings:

  - You are about to drop the column `pgone` on the `providers` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Budgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Providers` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pwd` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `requisitons` DROP FOREIGN KEY `Requisitons_requisitorId_fkey`;

-- AlterTable
ALTER TABLE `budgets` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `creatorId` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT 'First quarter',
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `providers` DROP COLUMN `pgone`,
    ADD COLUMN `phone` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `requisitons` ADD COLUMN `categoryId` INTEGER NULL,
    ADD COLUMN `departmentId` INTEGER NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `dueDate` DATETIME(3) NULL,
    ADD COLUMN `justification` VARCHAR(191) NULL,
    ADD COLUMN `providerId` INTEGER NULL,
    ADD COLUMN `validatorId` INTEGER NULL,
    MODIFY `status` VARCHAR(20) NOT NULL DEFAULT 'requested';

-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `pwd` VARCHAR(191) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'Admin';

-- AddForeignKey
ALTER TABLE `Requisitons` ADD CONSTRAINT `Requisitons_requisitorId_fkey` FOREIGN KEY (`requisitorId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requisitons` ADD CONSTRAINT `Requisitons_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `Providers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requisitons` ADD CONSTRAINT `Requisitons_validatorId_fkey` FOREIGN KEY (`validatorId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requisitons` ADD CONSTRAINT `Requisitons_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Departments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requisitons` ADD CONSTRAINT `Requisitons_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Budgets` ADD CONSTRAINT `Budgets_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
