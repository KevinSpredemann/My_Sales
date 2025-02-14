import AppError from "@shared/errors/AppError";
import { productRepositories } from "../repositories/ProductsRepositories";

interface IDeleteProductService {
  id: string
}
export default class DeleteProductService {
  async execute({ id }: IDeleteProductService): Promise<void> {
    const product = await productRepositories.findById(id);

        if (!product) {
          throw new AppError('Product not found', 404);
        }

        await productRepositories.remove(product);
  }
}
