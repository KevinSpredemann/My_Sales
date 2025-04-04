import { ICostumerRepository } from '@modules/costumers/domain/repositories/ICostumersRepositories';
import costumerRepository from '@modules/costumers/infra/database/repositories/CostumerRepositories';
import { container } from 'tsyringe';

container.registerSingleton<ICostumerRepository>(
  'CostumerRepository',
  costumerRepository,
);
