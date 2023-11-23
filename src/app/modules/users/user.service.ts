import User from '../users.model';

const createUserIntoDb = async (userData: any) => {
  if (await User.isUserExist(userData.id)) {
    throw new Error('user already exist');
  }

  const result = await User.create(userData);

  const { password, ...cleanUser } = result.toObject();

  return cleanUser;
};













export const UserServices = {
  createUserIntoDb,
};
