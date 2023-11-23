import { z } from 'zod';

export const OrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userFullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().max(20),
  fullName: userFullNameValidationSchema,
  age: z.number(),
  email: z.string().email('Invalid email format.'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).default([]),
  address: addressValidationSchema,
  orders: z.array(OrderSchema).default([]),
});

export default userValidationSchema;
