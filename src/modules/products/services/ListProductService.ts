import RedisCache from '@shared/cache/RedisCache';
import { Product } from '../infra/database/entities/Products';
import { productRepositories } from '../infra/database/repositories/ProductsRepositories';

export default class ListProductService {
  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>('products-list');

    if (!products) {
      products = await productRepositories.find();
      await redisCache.save('products-list', JSON.stringify(products));
    }

    return products;
  }
}
