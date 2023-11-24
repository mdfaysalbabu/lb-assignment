import { z } from 'zod';

export const OrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userFullNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'FirstName required' }).min(1).max(20),
  lastName: z.string({ required_error: 'LastName required' }).min(1).max(20),
});

const addressValidationSchema = z.object({
  street: z.string({ required_error: 'Street required' }),
  city: z.string({ required_error: 'city required' }),
  country: z.string({ required_error: 'country required' }),
});

const userValidationSchema = z.object({
  userId: z.number({ required_error: 'UserID  required' }),
  username: z.string({ required_error: 'Username required' }),
  password: z.string({ required_error: 'Password  required' }).max(20),
  fullName: userFullNameValidationSchema,
  age: z.number({ required_error: 'Age  required' }),
  email: z
    .string({ required_error: 'Email required' })
    .email('Invalid email format.'),
  isActive: z.boolean({ required_error: 'isActive  required' }),
  hobbies: z.array(z.string()).default([]),
  address: addressValidationSchema,
  orders: z.array(OrderSchema).default([]),
});

export default userValidationSchema;
