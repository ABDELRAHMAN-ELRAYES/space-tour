import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import User from '../models/userModel';

// render login page
export const renderLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('login', {
      title: 'Login',
    });
  }
);

// render signup page
export const renderSignup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('signup', {
      title: 'Signup',
    });
  }
);
