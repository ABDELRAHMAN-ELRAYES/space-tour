import { Request, Response, NextFunction } from 'express';
import Exoplanet from '../models/exoplanetModel';

// get all exoplanets found in space
export const getAllExoplanets = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const exoplanets = await Exoplanet.find({});
  res.status(200).json({
    status: 'success',
    exoplanets,
  });
};

// get exoplanet using id in the route
export const getExoplanetById = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const exoplanet = await Exoplanet.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    exoplanet,
  });
};
// get exoplanet using name in the route
export const getExoplanetByName = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const exoplanet = await Exoplanet.findOne({ name: req.params.name });
  res.status(200).json({
    status: 'success',
    exoplanet,
  });
};

// get all exoplanets found in space with habitability is true
export const getHabitabilityExopolanets = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const exoplanets = await Exoplanet.find({});
  res.status(200).json({
    status: 'success',
    exoplanets,
  });
};
// get all exoplanets found in space with habitability is false
export const getNonHabitabilityExopolanets = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const exoplanets = await Exoplanet.find({});
  res.status(200).json({
    status: 'success',
    exoplanets,
  });
};
// create a new exoplanet
export const createExoplanet = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newExoplanet = await Exoplanet.create(req.body);
  res.status(200).json({
    status: 'success',
    newExoplanet,
  });
};
// update a new exoplanet
export const updatedExoplanet = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const updatedExoplanet = await Exoplanet.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.status(200).json({
    status: 'success',
    updatedExoplanet,
  });
};
// delete Exoplanet
export const destroyedExoplanet = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const destroyedExoplanet = await Exoplanet.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    destroyedExoplanet,
  });
};
