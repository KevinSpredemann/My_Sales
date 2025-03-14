import RedisCache from "@shared/cache/rediscache";
import { Product } from "../entities/Products";
import { productRepositories } from "../repositories/ProductsRepositories";

export default class ListProductService {
  async execute(): Promise<Product[]> {

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>("products-list");

    if (!products) {
      products = await productRepositories.find();
      await redisCache.save("products-list", JSON.stringify(products));
    };

    return products;
  }
}
