import AppError from '@shared/errors/AppError';
import { productRepositories } from '../infra/database/repositories/ProductsRepositories';
import RedisCache from '@shared/cache/RedisCache';

interface IDeleteProductService {
  id: string;
}
export default class DeleteProductService {
  async execute({ id }: IDeleteProductService): Promise<void> {
    const redisCache = new RedisCache();

    const product = await productRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await redisCache.invalidate('products-list');

    await productRepositories.remove(product);
  }
}
