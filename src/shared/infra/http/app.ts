import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';
import rateLimiter from '@shared/middlewares/rateLimiter';
import '@shared/containers';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(routes);
app.use(errors());
app.use(ErrorHandleMiddleware.handleError);

export default app;
