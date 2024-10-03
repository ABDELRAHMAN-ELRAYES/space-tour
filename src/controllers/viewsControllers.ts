// src/controllers/viewsControllers.ts
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import User from '../models/userModel';
import Post from '../models/postModel';

// Render the index page
export const renderIndex = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('index', {
      title: 'Welcome to Space Tour',
    });
  }
);

// Render login page
export const renderLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('login', {
      title: 'Login',
    });
  }
);

// Render signup page
export const renderSignup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('signup', {
      title: 'Signup',
    });
  }
);

// Render the build exoplanet page
export const renderBuildExoplanet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('build', {
      title: 'Build Exoplanet',
    });
  }
);

export const renderQuiz = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('quiz', {
      title: 'Quiz!',
    });
  }
);

// Render the share exoplanet page
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

