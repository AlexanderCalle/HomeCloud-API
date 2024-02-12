import { PrismaClient } from '@prisma/client';

import { getLogger } from '../core/logging';


let prismaInstance: PrismaClient;

async function initializeData(): Promise<PrismaClient> {
  const logger = getLogger();
  logger.info('Initializing connection to the database');

  prismaInstance = new PrismaClient({
    errorFormat: 'pretty',
  });

  return prismaInstance;
}

function getPrisma(): PrismaClient {
  if(!prismaInstance) 
    throw new Error('Please initialize the data layer before getting the Prisma instance');
    

  return prismaInstance;
}

async function shutdownData() {
  const logger = getLogger();

  logger.info('Shutting down database connection');

  await prismaInstance.$disconnect();
  prismaInstance = null;

  logger.info('Database connection closed');
}


export {initializeData, getPrisma, shutdownData};