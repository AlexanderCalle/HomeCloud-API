-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_homeFolderId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `homeFolderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_homeFolderId_fkey` FOREIGN KEY (`homeFolderId`) REFERENCES `Folder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
