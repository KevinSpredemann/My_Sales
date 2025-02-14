import { Interface } from 'readline';
import { Product } from '../entities/Products';
import { productRepositories } from '../repositories/ProductsRepositories';
import AppError from '@shared/errors/AppError';

interface IShowProductService {
  id: string;
}
export default class ShowProductService {
  async execute({ id }: IShowProductService): Promise<Product> {
    const product = await productRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}
