import { costumerRepositories } from '@modules/costumers/database/repositories/CostumerRepositories';
import { Product } from '@modules/products/database/entities/Products';
import { productRepositories } from '@modules/products/database/repositories/ProductsRepositories';
import AppError from '@shared/errors/AppError';
import { Order } from '../database/entities/Order';
import { orderRepositories } from '../database/repositories/OrderRepositories';

interface ICreateOrder {
  costumer_id: string;
  products: Product[];
}

export default class createOrderService {
  async execute({ costumer_id, products }: ICreateOrder): Promise<Order> {
    const costumerExists = await costumerRepositories.findById(
      Number(costumer_id),
    );

    if (!costumerExists) {
      throw new AppError(
        'Costumer not find any costumer with thr given id.',
        404,
      );
    }

    const existentProducts = await productRepositories.findAllIds(products);

    if (!existentProducts.length) {
      throw new AppError('Could not find any products with the given ids', 404);
    }

    const existentProductsIds = products.map(product => product.id);

    const checkInexistentProducts = existentProducts.filter(
      product => !existentProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`,
        404,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existentProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
        409,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existentProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await orderRepositories.createOrder({
      costumer: costumerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existentProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productRepositories.save(updatedProductQuantity);

    return order;

  }
}
