import AppError from '@shared/errors/AppError';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import { IUserRepository } from '../domain/repositories/IUserRepositories';
import { inject, injectable } from 'tsyringe';
import { User } from '../infra/database/entities/User';

interface IRequest {
  userId: string;
  avatarFileName: string;
}
@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(Number(userId));

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
