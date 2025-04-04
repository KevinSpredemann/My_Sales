import AppError from '@shared/errors/AppError';
import { Costumer } from '../infra/database/entities/Costumer';
import { ICostumerRepository } from '../domain/repositories/ICostumersRepositories';
interface IShowService {
  id: number;
}

export default class ShowCostumerService {
  constructor(private readonly costumerRepository: ICostumerRepository) {}
  public async execute({ id }: IShowService): Promise<Costumer> {
    const costumer = await this.costumerRepository.findById(id);

    if (!costumer) {
      throw new AppError('Costumer not found', 404);
    }

    return costumer;
  }
}
