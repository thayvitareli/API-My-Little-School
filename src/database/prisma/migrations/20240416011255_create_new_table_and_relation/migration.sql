/*
  Warnings:

  - You are about to drop the column `responsible_name` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `responsible_phone` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `student` DROP COLUMN `responsible_name`,
    DROP COLUMN `responsible_phone`,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `responsible` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(75) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `phone` VARCHAR(13) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_responsibleTostudent` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_responsibleTostudent_AB_unique`(`A`, `B`),
    INDEX `_responsibleTostudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_responsibleTostudent` ADD CONSTRAINT `_responsibleTostudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `responsible`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_responsibleTostudent` ADD CONSTRAINT `_responsibleTostudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
