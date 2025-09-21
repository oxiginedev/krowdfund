/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Campaign` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `campaign` ADD COLUMN `slug` VARCHAR(50) NOT NULL,
    MODIFY `featuredImage` VARCHAR(100) NULL,
    MODIFY `endsAt` DATE NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Campaign_slug_key` ON `Campaign`(`slug`);
