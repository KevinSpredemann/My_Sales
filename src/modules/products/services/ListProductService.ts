import RedisCache from '@shared/cache/RedisCache';
import { Product } from '../infra/database/entities/Product';
import { inject, injectable } from 'tsyringe';
import { IProductPaginate } from '../domain/models/IProductPaginate';
import { SearchParams } from '@modules/users/domain/repositories/IUserRepositories';
import { IProductsRepository } from '../domain/repositories/IProductRepository';
@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({
    page,
    skip,
    take,
  }: SearchParams): Promise<IProductPaginate> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<IProductPaginate>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productsRepository.findAll({ page, skip, take });

      await redisCache.save(
        'api-vendas-PRODUCT_LIST',
        JSON.stringify(products),
      );
    }

    return products as IProductPaginate;
  }
}

export default ListProductService;
