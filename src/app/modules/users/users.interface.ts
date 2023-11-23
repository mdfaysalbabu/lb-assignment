import { Model } from 'mongoose';

export type TUser = {
  userId: number;
  username: string;
  password: string; // This should be the hashed password
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: TOrders[];
};

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export interface userModel extends Model<TUser> {
  isUserExist(userId: number): Promise<TUser | null>;
 
}
