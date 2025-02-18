import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // Não remova, é necessário para lidar com erros assíncronos
import 'reflect-metadata';
import cors from 'cors';

import routes from './routes';
import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';

import { AppDataSource } from '@shared/typeorm/data-source';

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(routes);
    app.use(ErrorHandleMiddleware.handleError);

    console.log('Connected to database!');

    app.listen(3333, () => {
      console.log('Server is running on port 3333');
    });
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
