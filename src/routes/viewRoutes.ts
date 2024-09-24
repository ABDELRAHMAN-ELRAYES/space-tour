import exp from 'constants';
import { Router } from 'express';
import { renderLogin, renderSignup } from '../controllers/viewsControllers';
import { isLoggedIn } from '../controllers/authControllers';
const viewRouter = Router();

viewRouter.route('/login').get(isLoggedIn, renderLogin);
viewRouter.route('/signup').get(isLoggedIn, renderSignup);

export default viewRouter;
