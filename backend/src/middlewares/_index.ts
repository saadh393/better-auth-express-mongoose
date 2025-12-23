import { errorHandlingMiddleware } from './errorhandle-middleware';
import notfoundMiddleware from './notfound-middleware';

const middlewares = {
  errorHandler: errorHandlingMiddleware,
  notFoundHandler: notfoundMiddleware,
};

export default middlewares;
