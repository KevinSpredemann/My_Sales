import { Costumer } from '../database/entities/Costumer';
import { costumerRepositories } from '../database/repositories/CostumerRepositories';

export default class ListCostumerService {
  public async execute(): Promise<Costumer[]> {
    const costumers = await costumerRepositories.find();
    return costumers;
  }
}
