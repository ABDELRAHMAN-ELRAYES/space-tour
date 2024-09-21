import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Review from './../models/reviewModel';

export const setDrawUserRequestId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.draw) req.body.draw = req.params.drawId;
  next();
};
export const getReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      Review,
    });
  }
);
export const getAllReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const reviews = await Review.find(req.body);
    res.status(200).json({
      status: 'success',
      results: reviews.length,
      reviews,
    });
  }
);
export const createNewReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    const review = await Review.create(req.body);

    res.status(200).json({
      status: 'success',
      review,
    });
  }
);
export const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      review,
    });
  }
);

export const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
    });
  }
);
