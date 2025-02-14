import { AppDataSource } from '@shared/typeorm/data-source';
import { Product } from '../entities/Products';

export const productRepositories = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    return this.findOneBy({ name });
  },
});
