import AppError from "@shared/errors/AppError";
import { Costumer } from "../database/entities/Costumer";
import { costumerRepositories } from "../database/repositories/CostumerRepositories";

interface IShowService {
  id: number;
}

export default class CreateCostumerService {
  public async execute({ id }: IShowService): Promise<Costumer> {
    const costumer = await costumerRepositories.findById(id);

    if (!costumer) {
      throw new AppError('Costumer not found', 404);
    }

    return costumer;

  }
}
