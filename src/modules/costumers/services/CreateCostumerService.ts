import AppError from "@shared/errors/AppError";
import { Costumer } from "../database/entities/Costumer";
import { costumerRepositories } from "../database/repositories/CostumerRepositories";

interface ICreateCostumer {
  name: string;
  email: string;
}

export default class CreateCostumerService {
  public async execute({ name, email}: ICreateCostumer): Promise<Costumer> {
    const emailExists = await costumerRepositories.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already exists', 409);
    }

    const costumer = costumerRepositories.create({
      name,
      email,
    });

    await costumerRepositories.save(costumer);

    return costumer;
  }
}

