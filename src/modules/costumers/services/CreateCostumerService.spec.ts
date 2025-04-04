import AppError from '@shared/errors/AppError';
import { costumerMock } from '../domain/factories/costumerFactory';
import FakeCostumerRepositories from '../domain/repositories/fakes/FakeCostumerRepositories';
import CreateCostumerService from './CreateCostumerService';

let fakeCostumerRepositories = new FakeCostumerRepositories();
let createCostumerService = new CreateCostumerService(fakeCostumerRepositories);

describe('CreateCostumerService', () => {
  it('should be able to create a new costumer', async () => {
    fakeCostumerRepositories = new FakeCostumerRepositories();
    createCostumerService = new CreateCostumerService(
      fakeCostumerRepositories,
    );

    const costumer = await createCostumerService.execute(costumerMock);

    expect(costumer).toHaveProperty('id');
    expect(costumer.email).toBe('johndoe@gmail.com');
  });

  it('should not be able to create a new costumer with email that is already use', async () => {
     fakeCostumerRepositories = new FakeCostumerRepositories();
     createCostumerService = new CreateCostumerService(
      fakeCostumerRepositories,
    );

    await createCostumerService.execute(costumerMock);

    await expect(
      createCostumerService.execute(costumerMock),
    ).rejects.toBeInstanceOf(AppError);
  });
});
