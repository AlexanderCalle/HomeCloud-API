/*
  Warnings:

  - A unique constraint covering the columns `[homeFolderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `homeFolderId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `homeFolderId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_homeFolderId_key` ON `User`(`homeFolderId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_homeFolderId_fkey` FOREIGN KEY (`homeFolderId`) REFERENCES `Folder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
