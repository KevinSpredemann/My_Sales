import AppError from '@shared/errors/AppError';
import { IUserRepository } from '../domain/repositories/IUserRepositories';
import { inject } from 'tsyringe';
import { User } from '../infra/database/entities/User';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}
  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(Number(user_id));

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }
}

export default ShowProfileService;
