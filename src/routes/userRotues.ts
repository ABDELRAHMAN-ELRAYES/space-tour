import { Router } from 'express';
import {
  getUser,
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
} from '../controllers/userControllers';
import {
  login,
  signup,
  resetPassword,
  forgetPassword,
  protect,
  restrictTo,
} from '../controllers/authControllers';
import { uploadUserPhotoMiddleware } from '../middlewares/middlewares';

const userRouter = Router();

userRouter.post('/signup', uploadUserPhotoMiddleware, signup);
userRouter.post('/login', login);

userRouter.use(restrictTo('admin'));
userRouter.route('/').get(getAllUser).post(createNewUser);
userRouter.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default userRouter;
