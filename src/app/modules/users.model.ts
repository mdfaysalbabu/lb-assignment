/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TOrders, TUser } from './users/users.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const OrderSchema = new Schema<TOrders>({
  productName: { type: String, required: true, trim: true, _id: false },
  price: { type: Number, required: true, _id: false },
  quantity: { type: Number, required: true, _id: false },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true, trim: true, _id: false },
    lastName: { type: String, required: true, trim: true, _id: false },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true, trim: true, _id: false },
    city: { type: String, required: true, trim: true, _id: false },
    country: { type: String, required: true, trim: true, _id: false },
  },
  orders: { type: [OrderSchema], default: [], _id: false },
});

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

const User = model<TUser>('user', userSchema);

export default User;
