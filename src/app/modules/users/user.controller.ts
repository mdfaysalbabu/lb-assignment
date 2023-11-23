import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
import { ZodError } from 'zod';

const createUser = async (req: Request, res: Response) => {
  try {
    const  userData  = req.body;

    const zodParseData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDb(zodParseData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: error.message || 'validation Error',
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }
};






export const UserController = {
  createUser,
  
};
