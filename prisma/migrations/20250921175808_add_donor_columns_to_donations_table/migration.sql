/*
  Warnings:

  - Added the required column `donorEmail` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAnonymous` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `donation` ADD COLUMN `donorEmail` VARCHAR(100) NOT NULL,
    ADD COLUMN `isAnonymous` TINYINT UNSIGNED NOT NULL;
