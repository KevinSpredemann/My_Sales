import { Repository } from 'typeorm';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { Order } from '../entities/Order';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepositorys';
import { OrdersProducts } from '../entities/OrdersProducts';


type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Order);
  }

  public async findById(id: number): Promise<IOrder | null> {
    const order = this.ormRepository.findOne({
      where: { id: Number(id) },
      relations: ['order_products', 'customer'],
    });

    return order as unknown as IOrder;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IOrderPaginate> {
    const [orders, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };

    return result as unknown as IOrderPaginate;
  }

  public async create({ customer, products }: ICreateOrder): Promise<IOrder> {
    const order = this.ormRepository.create({
      costumer: customer,
    });

    await this.ormRepository.save(order);

    const ordersProductsRepository = AppDataSource.getRepository(OrdersProducts);
    const ordersProducts = products.map(product => ({
      order,
      product_id: product.product_id.toString(),
      price: product.price,
      quantity: product.quantity,
    }));

    await ordersProductsRepository.save(ordersProducts);

    return order as unknown as IOrder;
  }
}

export default OrdersRepository;
