import 'reflect-metadata';
import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories';
import CreateUserService from './CreateUserService';
import { hash } from 'bcrypt';
import AppError from '@shared/errors/AppError';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

let fakeUserRepositories: FakeUserRepositories;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepositories = new FakeUserRepositories();
    createUserService = new CreateUserService(fakeUserRepositories);
  });
  it('should be able to create a new user', async () => {
    (hash as jest.Mock).mockResolvedValue('hashedPassword');

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'jW9tI@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('jW9tI@example.com');
  });
  it('should not be able to create a user with an existing email', async () => {
      await createUserService.execute({
      name: 'John Doe',
      email: 'jW9tI@example.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Jane Doe',
        email: 'jW9tI@example.com',
        password: '654321',
    })).rejects.toBeInstanceOf(AppError);
    });
  it('should hash the password before saving the user', async () => {
    const hashSpy = jest
    .spyOn(require('bcrypt'), 'hash')
    .mockResolvedValue('hashedPassword');

    await createUserService.execute({
      name: 'John Doe',
      email: 'jW9tI@example.com',
      password: '123456',
    });

    expect(hashSpy).toHaveBeenCalledWith('123456', 8);
  })
});
