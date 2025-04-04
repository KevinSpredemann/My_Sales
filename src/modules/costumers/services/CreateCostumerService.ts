import AppError from '@shared/errors/AppError';
import { Costumer } from '../infra/database/entities/Costumer';
import { ICreateCostumer } from '../domain/models/ICreateUsers';
import { ICostumerRepository } from '../domain/repositories/ICostumersRepositories';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class CreateCostumerService {
  constructor(
    @inject('CostumerRepository')
    private costumerRepository: ICostumerRepository,
  ) {}
  public async execute({ name, email }: ICreateCostumer): Promise<Costumer> {
    const emailExists = await this.costumerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already exists', 409);
    }

    const costumer = await this.costumerRepository.create({
      name,
      email,
    });

    return costumer;
  }
}
