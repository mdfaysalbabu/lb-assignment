import { Schema, model } from 'mongoose';
import { TOrders, TUser, userModel } from './users/users.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const OrderSchema = new Schema<TOrders>({
  productName: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
  },
  orders: { type: [OrderSchema], default: [] },
});

userSchema.statics.isUserExist = async function (userId: number) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = ' ';

  next();
});

const User = model<TUser,userModel>('user', userSchema);

export default User;