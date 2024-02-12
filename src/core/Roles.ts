export const Role: {
    USER: 'USER'
    ADMIN: 'ADMIN'
  } = {
    USER: 'USER',
    ADMIN: 'ADMIN',
  };
  
export type Role = typeof Role[keyof typeof Role]