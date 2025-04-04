import { IPagination } from '@shared/interfaces/pagination.interface';
import { Costumer } from '../infra/database/entities/Costumer';
import { ICostumerRepository } from '../domain/repositories/ICostumersRepositories';

export default class ListCostumerService {
  constructor(private readonly costumerRepository: ICostumerRepository) {}
  public async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<IPagination<Costumer[]>> {
    const [data, total] = await this.costumerRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      per_page: limit,
      total,
      current_page: page,
      total_pages: totalPages,
      data,
      next_page: page < totalPages ? page + 1 : null,
      prev_page: page > 1 ? page - 1 : null,
    } as IPagination<Costumer[]>;
  }
}
