import { isExpression } from 'typescript';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
