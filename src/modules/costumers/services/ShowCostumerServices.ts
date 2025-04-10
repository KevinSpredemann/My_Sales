import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowCustomer } from '../domain/models/IShowCostumer';
import { ICostumerRepository } from '../domain/repositories/ICostumersRepositories';
import { Costumer } from '../infra/database/entities/Costumer';


@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICostumerRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<Costumer> {
    const customer = await this.customersRepository.findById(Number(id));

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    return customer;
  }
}

export default ShowCustomerService;
