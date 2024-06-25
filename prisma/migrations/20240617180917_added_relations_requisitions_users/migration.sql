/*
  Warnings:

  - You are about to drop the `userroles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `requisitorId` to the `Requisitons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validatorId` to the `Requisitons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessLvl` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `requisitons` ADD COLUMN `requisitorId` INTEGER NOT NULL,
    ADD COLUMN `validatorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `accessLvl` INTEGER NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `userroles`;

-- AddForeignKey
ALTER TABLE `Requisitons` ADD CONSTRAINT `Requisitons_requisitorId_fkey` FOREIGN KEY (`requisitorId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requisitons` ADD CONSTRAINT `Requisitons_validatorId_fkey` FOREIGN KEY (`validatorId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
