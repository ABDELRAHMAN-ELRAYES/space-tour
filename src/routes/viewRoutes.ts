import exp from 'constants';
import { Router } from 'express';
import {
  renderLogin,
  renderSignup,
  renderBuildExoplanet,
  renderSharePage,
} from '../controllers/viewsControllers';
import { isLoggedIn } from '../controllers/authControllers';
const viewRouter = Router();

viewRouter.route('/login').get(isLoggedIn, renderLogin);
viewRouter.route('/signup').get(isLoggedIn, renderSignup);

viewRouter.route('/build').get(renderBuildExoplanet);
viewRouter.route('/share').get(isLoggedIn, renderSharePage);
export default viewRouter;
