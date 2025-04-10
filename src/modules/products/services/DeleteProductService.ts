import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { Product } from '../infra/database/entities/Product';
import { IProductsRepository } from '../domain/repositories/IProductRepository';

interface IRequest {
  id: string;
}
@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(Number(id));

    if (!product) {
      throw new AppError('Product not found.');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.remove(product as unknown as Product);
  }
}

export default DeleteProductService;
