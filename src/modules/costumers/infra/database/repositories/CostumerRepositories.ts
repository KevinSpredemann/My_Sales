import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { Costumer } from '../entities/Costumer';
import {
  ICostumerRepository,
  Pagination,
} from '@modules/costumers/domain/repositories/ICostumersRepositories';
import { ICostumer } from '@modules/costumers/domain/models/ICostumer';
import { ICreateCostumer } from '@modules/costumers/domain/models/ICreateUsers';
import { Repository } from 'typeorm';

export default class costumerRepository implements ICostumerRepository {
  private ormRepository: Repository<Costumer>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Costumer);
  }
  async findByEmail(email: string): Promise<ICostumer | null> {
    const costumer = await this.ormRepository.findOneBy({
      email,
    });

    return costumer;
  }
  async create({ name, email }: ICreateCostumer): Promise<ICostumer> {
    const costumer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(costumer);

    return costumer;
  }
  async save(costumer: ICostumer): Promise<ICostumer> {
    await this.ormRepository.save(costumer);

    return costumer;
  }
  async remove(costumer: ICostumer): Promise<void> {
    await this.ormRepository.remove(costumer);

    return;
  }
  async findById(id: number): Promise<ICostumer | null > {
    const costumer = await this.ormRepository.findOneBy({
      id,
    });

    return costumer;
  }
  async findAndCount({
    take,
    skip,
  }: Pagination): Promise<[ICostumer[], number]> {
    const [costumers, total] = await this.ormRepository.findAndCount({
      take,
      skip,
    });

    return [costumers, total];
  }
  async findByName(name: string): Promise<ICostumer | null> {
    const costumer = await this.ormRepository.findOneBy({
      name,
    });

    return costumer;
  }
}
