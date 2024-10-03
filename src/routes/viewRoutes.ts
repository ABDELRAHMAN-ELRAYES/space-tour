import { Router } from 'express';
import {
  renderLogin,
  renderSignup,
  renderBuildExoplanet,
  renderSharePage,
  renderIndex,
  renderQuiz, // Import the render function for the index page
} from '../controllers/viewsControllers';
import { isLoggedIn } from '../controllers/authControllers';

const viewRouter = Router();

// Route for the homepage (index page)
viewRouter.route('/').get(renderIndex); // Add this line

viewRouter.route('/login').get(isLoggedIn, renderLogin);
viewRouter.route('/signup').get(isLoggedIn, renderSignup);
viewRouter.route('/build').get(renderBuildExoplanet);
viewRouter.route('/quiz').get(renderQuiz);
viewRouter.route('/share').get(isLoggedIn, renderSharePage);

export default viewRouter;

