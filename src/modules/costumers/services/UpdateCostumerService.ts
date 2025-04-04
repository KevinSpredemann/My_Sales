import AppError from '@shared/errors/AppError';

import { Costumer } from '../infra/database/entities/Costumer';
import { ICostumerRepository } from '../domain/repositories/ICostumersRepositories';

interface ICreateCostumer {
  id: number;
  name: string;
  email: string;
}

export default class UpdateCostumerService {
  constructor(private readonly costumerRepository: ICostumerRepository) {}
  public async execute({
    id,
    name,
    email,
  }: ICreateCostumer): Promise<Costumer> {
    const costumer = await this.costumerRepository.findById(id);

    if (!costumer) {
      throw new AppError('Costumer not found', 404);
    }

    const costumerExists = await this.costumerRepository.findByEmail(email);

    if (costumerExists && email !== costumer.email) {
      throw new AppError('There is already one costumer with this email', 409);
    }

    costumer.name = name;
    costumer.email = email;

    await this.costumerRepository.save(costumer);

    return costumer;
  }
}
