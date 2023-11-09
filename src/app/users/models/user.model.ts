export enum UserRole {
  USER = 'user',
  OWNER = 'owner',
  ADMIN = 'admin',
}

export interface IUser {
  id?: number;
  email: string;
  username: string;
  password: string;
  role?: UserRole;
  firstname: string;
  lastname: string;
  phone: string;
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
}
