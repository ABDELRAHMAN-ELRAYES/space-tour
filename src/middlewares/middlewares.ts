import morgan from 'morgan';
import bodyParser from 'body-parser';

export const morganMiddleware = morgan('dev');
export const bodyParserMiddleware = bodyParser.json();