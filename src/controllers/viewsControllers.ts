import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import User from '../models/userModel';
import Post from '../models/postModel';

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

// render the build exoplanet page
export const renderBuildExoplanet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('build', {
      title: 'Buld Exoplanet',
    });
  }
);
// render the share exoplanet page
export const renderSharePage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find().populate({
      path: 'comments',
      populate: {
        path: 'user',
        model: 'User',
      },
    });
    res.status(200).render('share', {
      title: 'Share Page',
      posts,
    });
  }
);
