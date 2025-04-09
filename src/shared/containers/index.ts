import { container } from 'tsyringe';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import OrdersRepository from '@modules/orders/infra/database/repositories/OrderRepositories';
import ProductsRepository from '@modules/products/infra/database/repositories/ProductsRepositories';
import { ICostumerRepository } from '@modules/costumers/domain/repositories/ICostumersRepositories';
import costumerRepository from '@modules/costumers/infra/database/repositories/CostumerRepositories';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepositories';
import UserRepository from '@modules/users/infra/database/repositories/UsersRepositories';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepositorys';
import UserTokensRepository from '@modules/users/infra/database/repositories/UserTokensRepositories';

container.registerSingleton<ICostumerRepository>(
  'CustomersRepository',
  costumerRepository,
);
container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UserRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
