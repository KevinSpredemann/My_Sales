import { Costumer } from '@modules/costumers/infra/database/entities/Costumer';
import { ICostumer } from '../../models/ICostumer';
import { ICreateCostumer } from '../../models/ICreateUsers';
import { ICostumerRepository, Pagination } from '../ICostumersRepositories';

export default class FakeCostumerRepositories implements ICostumerRepository {
  private costumers: ICostumer[] = [];

  public async create({ name, email }: ICreateCostumer): Promise<ICostumer> {
    const costumer = new Costumer();

    costumer.id = this.costumers.length + 1;
    costumer.name = name;
    costumer.email = email;

    this.costumers.push(costumer);

    return costumer;
  }

  public async save(costumer: Costumer): Promise<ICostumer> {
    const findIndex = this.costumers.findIndex(
      findCostumer => findCostumer.id === costumer.id,
    );

    this.costumers[findIndex] = costumer;

    return costumer;
  }

  public async remove(costumer: Costumer): Promise<void> {
    const findIndex = this.costumers.findIndex(
      findCostumer => findCostumer.id === costumer.id,
    );

    if (findIndex !== -1) {
      this.costumers.splice(findIndex, 1);
    }
  }

  public async findAll(): Promise<ICostumer[] | undefined> {
    return this.costumers;
  }

  public async findById(id: number): Promise<ICostumer | null> {
    const costumer = this.costumers.find(costumer => costumer.id === id);
    return costumer as Costumer | null;
  }

  public async findByName(name: string): Promise<ICostumer | null> {
    const costumer = this.costumers.find(costumer => costumer.name === name);
    return costumer as Costumer | null;
  }

  public async findByEmail(email: string): Promise<ICostumer | null> {
    const costumer = this.costumers.find(costumer => costumer.email === email);
    return costumer as Costumer | null;
  }

  findAndCount(pagination: Pagination): Promise<[ICostumer[], number]> {
    throw new Error('Method not implemented.');
  }
}
