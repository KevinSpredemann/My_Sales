import { IProduct } from '../models/IProduct';
import { IFindProducts } from '../models/IFindProducts';
import { ICreateProduct } from '../models/ICreateProduct';
import { IProductPaginate } from '../models/IProductPaginate';
import { Product } from '@modules/products/infra/database/entities/Product';
import { IUpdateStockProduct } from '../models/IUpdatedStockProduct';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | null>;
  findById(id: number): Promise<IProduct | null>;
  findAll({ page, skip, take }: SearchParams): Promise<IProductPaginate>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: Product): Promise<IProduct>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
  remove(product: Product): Promise<void>;
}
