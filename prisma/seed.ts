import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@homecloud.be' },
    update: {},
    create: {
      id: 1,
      email: 'admin@homecloud.be',
      firstname: 'admin',
      lastname: 'admin',
      profilePic: '/uploads/default.png',
      role: Role.ADMIN,
      home: {
        create: {
          id: 1,
          name: 'home',
          url: '/storage/users/1/',
        },
      },
    },
  });

  console.log(admin);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  }).catch(async (e) => {

    console.error(e);
    await prisma.$disconnect();
    process.exit(1);

  });