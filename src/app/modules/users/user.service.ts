import User from '../users.model';

const cleanUser = (userObject: any) => {
  const { password, ...cleanUser } = userObject;
  return cleanUser;
};

const createUserIntoDb = async (userData: any) => {
  if (await User.isUserExist(userData.id)) {
    throw new Error('user already exist');
  }

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
  const user = await User.findOne({ userId }, 'password');

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }
  const someUser= cleanUser(user.toObject());
  return someUser;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDb
};
