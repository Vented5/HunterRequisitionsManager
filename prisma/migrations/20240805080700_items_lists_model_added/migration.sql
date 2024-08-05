/*
  Warnings:

  - You are about to alter the column `price` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the column `categoryId` on the `requisitons` table. All the data in the column will be lost.
  - Made the column `name` on table `items` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `requisitons` DROP FOREIGN KEY `Requisitons_categoryId_fkey`;

-- AlterTable
ALTER TABLE `items` ADD COLUMN `categoryId` INTEGER NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `requisitons` DROP COLUMN `categoryId`;

-- CreateTable
CREATE TABLE `ItemsLists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `itemId` INTEGER NOT NULL,
    `requisitionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemsLists` ADD CONSTRAINT `ItemsLists_requisitionId_fkey` FOREIGN KEY (`requisitionId`) REFERENCES `Requisitons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemsLists` ADD CONSTRAINT `ItemsLists_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
