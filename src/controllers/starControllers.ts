import { Request, Response, NextFunction } from 'express';
import Star from '../models/starModel';

// get all Stars found in space
export const getAllStars = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const Stars = await Star.find({});
  res.status(200).json({
    status: 'success',
    Stars,
  });
};

// get Star using id in the route
export const getStarById = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const star = await Star.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    Star,
  });
};
// get Star using name in the route
export const getStarByName = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const star = await Star.findOne({ name: req.params.name });
  res.status(200).json({
    status: 'success',
    Star,
  });
};


// create a new Star
export const createStar = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newStar = await Star.create(req.body);
  res.status(200).json({
    status: 'success',
    newStar,
  });
};
// update a new Star
export const updatedStar = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const updatedStar = await Star.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.status(200).json({
    status: 'success',
    updatedStar,
  });
};
// delete Star
export const destroyedStar = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const destroyedStar = await Star.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    destroyedStar,
  });
};
