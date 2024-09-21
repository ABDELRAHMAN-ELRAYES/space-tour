import { Router } from 'express';
import {
  getAllReviews,
  getReview,
  createNewReview,
  updateReview,
  deleteReview,
  setDrawUserRequestId,
} from '../controllers/reviewsControllers';
import { protect } from '../controllers/authControllers';
const reviewRouter = Router({ mergeParams: true });

reviewRouter.use(protect);

reviewRouter
  .route('/')
  .get(setDrawUserRequestId, getAllReviews)
  .post(setDrawUserRequestId, createNewReview);

reviewRouter
  .route('/:id')
  .get(getReview)
  .patch(updateReview)
  .delete(deleteReview);

export default reviewRouter;
