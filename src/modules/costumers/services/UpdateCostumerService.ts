import AppError from '@shared/errors/AppError';
import { costumerRepositories } from '../database/repositories/CostumerRepositories';
import { Costumer } from '../database/entities/Costumer';

interface ICreateCostumer {
  id: number;
  name: string;
  email: string;
}

export default class UpdateCostumerService {
  public async execute({
    id,
    name,
    email,
  }: ICreateCostumer): Promise<Costumer> {
    const costumer = await costumerRepositories.findById(id);

    if (!costumer) {
      throw new AppError('Costumer not found', 404);
    }

    const costumerExists = await costumerRepositories.findByEmail(email);

    if (costumerExists && email !== costumer.email) {
      throw new AppError('There is already one costumer with this email', 409);
    }

    costumer.name = name;
    costumer.email = email;

    await costumerRepositories.save(costumer);
    
    return costumer;
  }
}
