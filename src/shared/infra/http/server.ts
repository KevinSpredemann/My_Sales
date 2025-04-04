import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';

import { errors } from 'celebrate';
import routes from './routes';
import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';
import '@shared/containers';

import { AppDataSource } from '../typeorm/data-source';
import rateLimiter from '@shared/middlewares/rateLimiter';

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(rateLimiter);
    app.use(routes);
    app.use(errors());
    app.use(ErrorHandleMiddleware.handleError);

    console.log('Connected to database!');

    app.listen(3333, () => {
      console.log('Server is running on port 3333');
    });
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
