import { Role, User } from '@prisma/client';

import { getPrisma } from '../data';

const prisma = getPrisma();

const getUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

const getAdmins = async (): Promise<User[]> => {
  return await prisma.user.findMany({
    where: { role: Role.ADMIN },
  });
};

const getUserById = async (id: number): Promise<User> => {
  return await prisma.user.findFirst({
    where: { id },
  });
};

const createUser = async (data: User): Promise<User> => {
  const user = await prisma.user.create({ data });

  return user;
};

interface UpdateUser {
    id: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    profilePic?: string;
    role?: Role;
}

const updateUser = async (id: number, data: UpdateUser) => {

  const user = await prisma.user.update({
    where: { id },
    data,
  });

  return user;
};

const deleteUser = async (id: number): Promise<boolean> => {
  const user = await prisma.user.delete({
    where: { id },
  });

  return user !== null;
};

export { getUsers, getAdmins, getUserById, createUser, updateUser, deleteUser };