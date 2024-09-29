import express, { Request, Response, NextFunction } from 'express';
import {
  bodyParserMiddleware,
  morganMiddleware,
  globalErrorHandlerMiddleware,
  cookieParserMiddleware,
} from './middlewares/middlewares';
import starRouter from './routes/star';
import exoplanetRouter from './routes/exoplanet';
import path from 'path';
import userRouter from './routes/userRotues';
import reviewRouter from './routes/reviews';
import viewRouter from './routes/viewRoutes';

const app = express();

// setup the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//to processing data from forms correctly
app.use(express.urlencoded({ extended: true }));

// setup static files
app.use(express.static(path.join(__dirname, 'public')));

// using middlewares
app.use(morganMiddleware);
app.use(bodyParserMiddleware);
app.use(cookieParserMiddleware);

// using routers in app
app.use('/', viewRouter);
app.use('/exoplanet', exoplanetRouter);
app.use('/star', starRouter);
app.use('/users', userRouter);
app.use('/reviews', reviewRouter);

// default route to response if the user input a wrong route
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(401).json({
    status: 'fail',
    message: `The route provided ${req.originalUrl} is not found`,
  });
});

// handle errors globally
app.use(globalErrorHandlerMiddleware);
export default app;
