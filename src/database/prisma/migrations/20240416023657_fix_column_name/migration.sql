/*
  Warnings:

  - The primary key for the `collaborator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user` on the `collaborator` table. All the data in the column will be lost.
  - Added the required column `id` to the `collaborator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collaborator` DROP PRIMARY KEY,
    DROP COLUMN `id_user`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
