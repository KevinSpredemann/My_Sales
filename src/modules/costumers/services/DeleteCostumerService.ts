import AppError from '@shared/errors/AppError';
import { ICostumerRepository } from '../domain/repositories/ICostumersRepositories';

interface IDeleteCostumer {
  id: number;
}

export default class DeleteCostumerService {
  constructor(private readonly costumerRepository: ICostumerRepository) {}
  public async execute({ id }: IDeleteCostumer): Promise<void> {
    const costumer = await this.costumerRepository.findById(id);

    if (!costumer) {
      throw new AppError('Costumer not found', 404);
    }

    await this.costumerRepository.remove(costumer);
  }
}
