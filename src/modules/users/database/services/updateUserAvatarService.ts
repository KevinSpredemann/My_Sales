import AppError from '@shared/errors/AppError';
import { User } from '../entities/User';
import { usersRepositories } from '../repositories/UsersRepositories';
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

interface IUpdateUserAvatar {
  userId: number;
  avatarFilename: string;
}

export default class updateUserAvatarService {
  async execute({ userId, avatarFilename }: IUpdateUserAvatar): Promise<User> {
    const user = await usersRepositories.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepositories.save(user);

    return user;
  }
}
