/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import User from '../users.model';

const cleanUser = (userObject: any) => {
  const { password, ...cleanUser } = userObject;
  return cleanUser;
};

const createUserIntoDb = async (userData: any) => {
  

  const result = await User.create(userData);

  const { password, ...cleanUser } = result.toObject();

  return cleanUser;
};

const getAllUsersFromDb = async () => {
  const result = await User.find({});

  const userAll = result.map((user) => cleanUser(user.toObject()));
  return userAll;
};

const getSingleUserFromDb = async (userId: number) => {
  const user = await User.findOne({ userId }, '-password');

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }
  const someUser = cleanUser(user.toObject());
  return someUser;
};

const getUserUpdateFromDb = async (userId: number, userData: any) => {
  const user = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
    select: '-password',
  });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }

  const userUpdate = cleanUser(user.toObject());
  return userUpdate;
};

const deletedUserFromDb = async (userId: number) => {
  const user = await User.findOneAndDelete({ userId });
  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }
  return user;
};

// orders
const addProductToDB = async (userId: number, productData: any) => {
  const user = await User.findOne({ userId });
  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(productData);
  await user.save();
  const finalOrders = user.orders;

  return finalOrders;
};

const getOrdersFromDB = async (userId: number) => {
  const user = await User.findOne({ userId });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }
  const allOrders = user ? user.orders : null;
  return allOrders;
};

const calculatePrice = async (userId: number): Promise<number> => {
  const user = await User.findOne({ userId });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }

  const totalPrice: number =
    user.orders?.reduce(
      (data, order) => data + order.price * order.quantity,
      0,
    ) || 0;
  return totalPrice;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
  getUserUpdateFromDb,
  deletedUserFromDb,
  addProductToDB,
  getOrdersFromDB,
  calculatePrice
};
