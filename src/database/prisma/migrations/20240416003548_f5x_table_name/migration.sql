/*
  Warnings:

  - You are about to drop the `students` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `students_class_teamId_fkey`;

-- DropTable
DROP TABLE `students`;

-- CreateTable
CREATE TABLE `student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(75) NOT NULL,
    `ra` VARCHAR(11) NOT NULL,
    `responsible_name` VARCHAR(75) NOT NULL,
    `responsible_phone` VARCHAR(13) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `class_teamId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_class_teamId_fkey` FOREIGN KEY (`class_teamId`) REFERENCES `class_team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
