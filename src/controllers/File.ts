import { File } from '@prisma/client';

import { getPrisma } from '../data';

const prisma = getPrisma();

const getFiles = async (): Promise<File[]> => {
  return await prisma.file.findMany();
};

const getFile = async (id: number): Promise<File> => {
  return await prisma.file.findUnique({
    where: {id},
  });
};

interface CreateFile {
  name: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
  type: string;
  size: number;
  userId: number;
  folderId: number;
}

const createFile = async (data: CreateFile): Promise<File> => {
  const file = prisma.file.create({ data });
  return file;
};

interface UpdateFile {
  name?: string;
  url?: string;
  folderId?: number;
}

const updateFile = async (id: number, data: UpdateFile): Promise<File> => {
  const file = await prisma.file.update({
    where: { id },
    data,
  });

  return file;
};

const deleteFile = async (id: number): Promise<boolean> => {
  const file = await prisma.file.delete({
    where: { id },
  });

  return file !== null;
};

export { getFiles, getFile, createFile, updateFile, deleteFile };