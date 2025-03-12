import { IPagination } from '@shared/interfaces/pagination.interface';
import { costumerRepositories } from '../database/repositories/CostumerRepositories';
import { Costumer } from '../database/entities/Costumer';

export default class ListCostumerService {
  public async execute(page: number = 1, limit: number = 10): Promise<IPagination<Costumer[]>> {
    const [data, total] = await costumerRepositories.findAndCount({
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
