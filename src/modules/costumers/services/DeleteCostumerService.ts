import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICostumerRepository } from '../domain/repositories/ICostumersRepositories';

interface IDeleteCustomer {
  id: number;
}
@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICostumerRepository,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    await this.customerRepository.remove(customer);
  }
}
