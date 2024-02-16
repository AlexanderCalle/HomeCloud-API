import { Prisma } from '@prisma/client';

import { ServiceError } from '../core/serviceError';

const handleDBError = (error: Error) => {

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch(error.code) {
      case 'P2001':
        return ServiceError.validationFailed('Search condition does not exist');
      case 'P2002':
        return ServiceError.validationFailed('Item already exists', error.meta);
      case 'P2003':
        return ServiceError.notFound('This item does not exist', error.meta);
      case 'P2015':
        return ServiceError.notFound('Record could not be found', error.meta);
      case 'P2018':
        return ServiceError.notFound('Record could not be found', error.meta);
      case 'P2024':
        return Error('Timed out fetching data from database');
    } 
  }

  return error;

};

export {handleDBError};