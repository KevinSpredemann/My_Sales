import uploadConfig from '@config/upload';
import costumersRouter from '@modules/costumers/infra/http/routes/CostumerRoutes';
import ordersRouter from '@modules/orders/infra/http/routes/OrdersRoutes';
import productsRouter from '@modules/products/infra/http/routes/ProductRoutes';
import avatarRouter from '@modules/users/infra/http/routes/AvatarRoutes';
import passwordRouter from '@modules/users/infra/http/routes/PasswordRoutes';
import profileRouter from '@modules/users/infra/http/routes/ProfileRoutes';
import sessionRouter from '@modules/users/infra/http/routes/SessionRoutes';
import usersRouter from '@modules/users/infra/http/routes/UserRoutes';
import express, { Router } from 'express';

const routes = Router();

routes.get('/health', (req: any, res: any) => {
  return res.json({ message: "Hello Dev! I'm Alive" });
});

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/avatar', avatarRouter);
routes.use('/files', express.static(uploadConfig.directory));
routes.use('/password', passwordRouter);
routes.use('/profiles', profileRouter);
routes.use('/costumers', costumersRouter);
routes.use('/orders', ordersRouter);

export default routes;
