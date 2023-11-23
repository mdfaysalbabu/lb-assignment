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



export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDb,
};
