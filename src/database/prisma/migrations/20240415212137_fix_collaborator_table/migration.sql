/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `collaborator` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `collaborator` ADD COLUMN `privilege` TINYINT NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX `collaborator_email_key` ON `collaborator`(`email`);
