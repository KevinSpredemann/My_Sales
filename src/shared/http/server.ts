import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';

import { AppDataSource } from '@shared/typeorm/data-source';

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(routes);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      ErrorHandleMiddleware.handleError(err, req, res, next);
    });

    console.log('Connected to database!');

    app.listen(3333, () => {
      console.log('Server is running on port 3333');
    });
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
