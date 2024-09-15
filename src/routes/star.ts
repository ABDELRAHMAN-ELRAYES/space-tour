import { Router } from 'express';
import {
  createStar,
  destroyedStar,
  getAllStars,
  getStarById,
  getStarByName,
  updatedStar,
} from '../controllers/starControllers';
const starRouter = Router();

starRouter.get('/', getAllStars);
starRouter.get('/:id', getStarById);
starRouter.get('/:search/:name', getStarByName);
starRouter.post('/', createStar);
starRouter.put('/:id', updatedStar);
starRouter.delete('/:id', destroyedStar);

export default starRouter;
