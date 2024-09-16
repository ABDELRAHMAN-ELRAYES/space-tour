import { iError } from '../interfaces/iError';
// form an error class to throw errors according to specific conditions
export class ErrorHandler implements iError {
  statusCode: number;
  status: string;
  message: string;
  name: string = '';
  constructor(msg: string, statusCode: number) {
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'Error';
    this.message = msg;
    // to determine the location of the error
    Error.captureStackTrace(this, this.constructor);
  }
}
