import express from 'express';
import {
  bodyParserMiddleware,
  morganMiddleware,
} from './middlewares/middlewares';
import starRouter from './routes/star';
import exoplanetRouter from './routes/exoplanet';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// using middlewares
app.use(morganMiddleware);
app.use(bodyParserMiddleware);

// using routers in app
app.use('/exoplanet', exoplanetRouter);
app.use('/star', starRouter);

export default app;
