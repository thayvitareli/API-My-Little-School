/*
  Warnings:

  - You are about to drop the `class_team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `class_team` DROP FOREIGN KEY `class_team_schoolId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `student_class_teamId_fkey`;

-- DropTable
DROP TABLE `class_team`;

-- CreateTable
CREATE TABLE `class_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `maxStudents` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `schoolId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_class_teamId_fkey` FOREIGN KEY (`class_teamId`) REFERENCES `class_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_group` ADD CONSTRAINT `class_group_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `school`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
