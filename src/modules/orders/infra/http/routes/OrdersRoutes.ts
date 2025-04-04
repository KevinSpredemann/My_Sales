import { Router } from 'express';
import OrdersControllers from '../controller/OrdersControllers';
import AuthMiddleware from '@shared/middlewares/authMiddleware';
import {
  createOrderValidate,
  idParamsValidate,
} from '../schemas/OrdersSchemas';

const ordersRouter = Router();
const orderController = new OrdersControllers();

ordersRouter.use(AuthMiddleware.execute);
ordersRouter.get('/:id', idParamsValidate, orderController.show);
ordersRouter.post('/', createOrderValidate, orderController.create);

export default ordersRouter;
