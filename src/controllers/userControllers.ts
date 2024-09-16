import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import User from '../models/userModel';

// get the data of user by its id
export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      user,
    });
  }
);
// get all users
export const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      users: {
        users,
      },
    });
  }
);
//create new user
export const createNewUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);

    res.status(200).json({
      status: 'success',
      user,
    });
  }
);

//update user
export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.updateOne({ _id: req.params.id }, req.body);

    res.status(200).json({
      status: 'success',
      user,
    });
  }
);
// delete user
export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.deleteOne({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
    });
  }
);
