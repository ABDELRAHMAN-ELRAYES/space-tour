import { Router } from 'express';
import {
  getAllComments,
  getComment,
  createNewComment,
  updateComment,
  deleteComment,
  setPostUserRequestId,
} from '../controllers/commentsControllers';
import { isLoggedIn, protect } from '../controllers/authControllers';
const CommentRouter = Router({ mergeParams: true });

CommentRouter.use(protect);

CommentRouter.route('/')
  .get(setPostUserRequestId, getAllComments)
  .post(isLoggedIn,setPostUserRequestId, createNewComment);

CommentRouter.route('/:id')
  .get(getComment)
  .patch(updateComment)
  .delete(deleteComment);

export default CommentRouter;
