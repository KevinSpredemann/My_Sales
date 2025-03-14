import AppError from '@shared/errors/AppError';
import { Product } from '../entities/Products';
import { productRepositories } from '../repositories/ProductsRepositories';
import RedisCache from '@shared/cache/rediscache';

interface ICreateProduct {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {

    const redisCache = new RedisCache();
    const productExists = await productRepositories.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    const product = productRepositories.create({
      name,
      price,
      quantity,
    });

    await productRepositories.save(product);

    await redisCache.invalidate('products-list');

    return product;
  }
}
