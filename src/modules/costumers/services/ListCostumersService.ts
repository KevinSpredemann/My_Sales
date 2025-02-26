import { Costumer } from '../database/entities/Costumer';
import { costumerRepositories } from '../database/repositories/CostumerRepositories';

export default class CreateCostumerService {
  public async execute(): Promise<Costumer[]> {
    const costumers = await costumerRepositories.find();
    return costumers;
  }
}
