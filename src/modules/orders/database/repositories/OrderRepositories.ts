import { AppDataSource } from '@shared/typeorm/data-source';
import { Order } from '../entities/Order';
import { Costumer } from '@modules/costumers/database/entities/Costumer';
import { OrdersProducts } from '../entities/OrdersProducts';

interface ICreateOrder {
  costumer: Costumer;
  products: OrdersProducts[];
}

export const orderRepositories = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ['order_products', 'costumer'],
    });
    return order;
  },

  async createOrder({ costumer, products }: ICreateOrder): Promise<Order> {
    const order = this.create({
      costumer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
});
