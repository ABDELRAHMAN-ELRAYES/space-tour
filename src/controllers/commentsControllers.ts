import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Comment from '../models/commentModel';

export const setPostUserRequestId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.post) req.body.post = req.params.postId;
  next();
};
export const getComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const comment = await Comment.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      Comment,
    });
  }
);
export const getAllComments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const comments = await Comment.find(req.body);
    res.status(200).json({
      status: 'success',
      results: comments.length,
      comments,
    });
  }
);
export const createNewComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const comment = await Comment.create({
      post: req.params.postId,
      user: req.user._id,
      comment: req.body.comment,
    });

    // res.status(200).json({
    //   status: 'success',
    //   comment,
    // });
    res.redirect('/share');
  }
);
export const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      comment,
    });
  }
);

export const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
    });
  }
);
