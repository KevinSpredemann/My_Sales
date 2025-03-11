import { AppDataSource } from '@shared/typeorm/data-source';
import { Product } from '../entities/Products';
import { In } from 'typeorm';

interface  IFindProducts {
  id: string;
}

export const productRepositories = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    return this.findOneBy({ name });
  },
  async findById(id: string): Promise<Product | null> {
    return this.findOneBy({ id });
  },
  async findAllIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }
});
