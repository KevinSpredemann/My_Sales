import AppError from "@shared/errors/AppError";
import { costumerRepositories } from "../database/repositories/CostumerRepositories";

interface IDeleteCostumer {
  id: number;
}

export default class DeleteCostumerService {
  public async execute({ id }: IDeleteCostumer): Promise<void> {
    const costumer = await costumerRepositories.findById(id);

    if (!costumer) {
      throw new AppError('Costumer not found', 404);
    }

    await costumerRepositories.remove(costumer);
  }
}
