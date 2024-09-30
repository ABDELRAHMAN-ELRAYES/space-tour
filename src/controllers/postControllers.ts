import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Post from '../models/postModel';
import { ErrorHandler } from '../utils/error';

export const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.create({
      user: req.user._id,
      description: req.body.description,
      photo: req.file?.filename,
    });
    res.redirect('/share');
  }
);
export const putLike = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user._id;
    const post = await Post.findById(req.params.postId);
    let checkIfLiked = post?.likes.some(
      (like) => like.toString() == user.toString()
    );
    if (checkIfLiked) {
      return next(new ErrorHandler('You already have liked this post', 401));
    }
    post?.likes.push(user);
    await post?.save();

    res.redirect('/share');
  }
);
export const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find();
    res.status(200).json({
      status: 'success',
      posts,
    });
  }
);
