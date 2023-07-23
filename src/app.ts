import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import express, { Application, Request, Response, NextFunction } from 'express';

import v1Routes from '@src/routes';
import notFoundHandler from '@src/middleware/not-found';
import errorHandler from '@src/middleware/error-handler';

import { buildDevLogger } from '@src/middleware/logger/dev-logger';
import { buildProdLogger } from '@src/middleware/logger/prod-logger';

const logger =
  process.env.NODE_ENV === 'development'
    ? buildDevLogger('express-boilerplate')
    : buildProdLogger('express-boilerplate');

const createServer = (): Application => {
  const app = express();

  app.use(cors());
  app.use(helmet());

  app.use(express.json());

  app.disable('x-powered-by');

  app.use('/gf/api/v1', v1Routes);

  app.use(notFoundHandler);

  // Middleware to log the error or send it to a 3rd party error monitoring software
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    next(err);
  });

  // Error handler middleware
  app.use(errorHandler);

  return app;
};

export { createServer };
