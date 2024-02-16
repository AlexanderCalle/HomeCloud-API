import { Folder, PrismaClient } from '@prisma/client';

import { getPrisma } from '../data';

const prisma: PrismaClient = getPrisma();

const getFolders = async (): Promise<Folder[]> => {
  return await prisma.folder.findMany();
};

const getFolderById = async (id: number): Promise<Folder> => {
  return await prisma.folder.findFirst({
    where: { id },
  });
};

const createFolder = async (data: Folder): Promise<Folder> => {
  const folder = await prisma.folder.create({ data });

  return folder;
};

interface UpdateFolder {
    name?: string;
    url?: string;
    modifiedAt?: Date;
    size?: number;
}

const updateFolder = async (id: number, data: UpdateFolder): Promise<Folder> => {
  const folder = await prisma.folder.update({
    where: { id },
    data,
  });

  return folder;
};

const deleteFolder = async (id: number): Promise<boolean> => {
  const folder = await prisma.folder.delete({
    where: {id},
  });

  return folder !== null;
};

export { getFolders, getFolderById, createFolder, updateFolder, deleteFolder };