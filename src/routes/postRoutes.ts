import { Router } from 'express';
import {
  createPost,
  getAllPosts,
  putLike,
} from '../controllers/postControllers';
import { uploadPostPhotoMiddleWare } from '../middlewares/middlewares';
import { isLoggedIn, protect } from '../controllers/authControllers';
import CommentRouter from './commentsRoutes';

const postRouter = Router();

postRouter.use('/:postId/comments', CommentRouter);

postRouter
  .route('/')
  .post(protect, isLoggedIn, uploadPostPhotoMiddleWare, createPost)
  .get(getAllPosts);
postRouter.route('/like/:postId').get(protect, isLoggedIn, putLike);

export default postRouter;
