import { AppDataSource } from '@shared/typeorm/data-source';
import { Costumer } from '../entities/Costumer';

export const costumerRepositories = AppDataSource.getRepository(
  Costumer,
).extend({
  async findByName(name: string): Promise<Costumer | null> {
    const costumer = await this.findOneBy({ name });
    return costumer;
  },
  async findByEmail(email: string): Promise<Costumer | null> {
    const costumer = await this.findOneBy({ email });
    return costumer;
  },
  async findById(id: number): Promise<Costumer | null> {
    const costumer = await this.findOneBy({ id });
    return costumer;
  },
});
