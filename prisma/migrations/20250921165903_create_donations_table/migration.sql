/*
  Warnings:

  - Added the required column `currency` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endsAt` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetAmount` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `campaign` ADD COLUMN `currency` CHAR(3) NOT NULL,
    ADD COLUMN `endsAt` DATE NOT NULL,
    ADD COLUMN `targetAmount` INTEGER UNSIGNED NOT NULL;

-- CreateTable
CREATE TABLE `Donation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `campaignId` INTEGER NOT NULL,
    `donorName` VARCHAR(100) NOT NULL,
    `amount` INTEGER UNSIGNED NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
