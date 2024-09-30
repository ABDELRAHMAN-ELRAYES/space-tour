import morgan from 'morgan';
import bodyParser from 'body-parser';
import { iError } from '../interfaces/iError';
import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { createMulterMiddleware } from './createFileUploader';

export const morganMiddleware = morgan('dev');
export const bodyParserMiddleware = bodyParser.json();
export const cookieParserMiddleware = cookieParser();
export const uploadUserPhotoMiddleware = createMulterMiddleware(
  'users',
  'photo'
);
export const uploadPostPhotoMiddleWare = createMulterMiddleware(
  'posts',
  'photo'
);
export const globalErrorHandlerMiddleware = (
  error: iError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.status = error.status || 'Error';
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    location: error.stack,
  });
};
