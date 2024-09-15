import { Router } from 'express';
import {
  createExoplanet,
  destroyedExoplanet,
  getAllExoplanets,
  getExoplanetById,
  getExoplanetByName,
  getHabitabilityExopolanets,
  getNonHabitabilityExopolanets,
  updatedExoplanet,
} from '../controllers/exoplanetControllers';

const exoplanetRouter = Router();

exoplanetRouter.get('/', getAllExoplanets);
exoplanetRouter.get('/:id', getExoplanetById);
exoplanetRouter.get('/:search/:name', getExoplanetByName);
exoplanetRouter.get('/:habitable/zone/true', getHabitabilityExopolanets);
exoplanetRouter.get('/:habitable/zone/false', getNonHabitabilityExopolanets);
exoplanetRouter.post('/', createExoplanet);
exoplanetRouter.put('/:id', updatedExoplanet);
exoplanetRouter.delete('/:id', destroyedExoplanet);

export default exoplanetRouter;
