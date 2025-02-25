import AppError from '@shared/errors/AppError';
import { User } from '../entities/User';
import { usersRepositories } from '../repositories/UsersRepositories';
import { compare, hash } from 'bcrypt';

interface IUpdateProfile {
  user_id: number;
  name: string;
  email: string;
  password?: string;
  old_passorword?: string;
}
export default class UpdateProfileService {
  async execute({
    user_id,
    name,
    email,
    password,
    old_passorword,
  }: IUpdateProfile): Promise<User> {
    const user = await usersRepositories.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (email) {
      const userUpdateEmail = await usersRepositories.findByEmail(email);

      if (userUpdateEmail) {
        throw new AppError('There is already one user with this email', 409);
      }

      user.email = email;
    }

    if (password && !old_passorword) {
      throw new AppError(
        'You need to inform the old password to set a new password',
        400,
      );
    }

    if (password && old_passorword) {
      const checkOldPassword = await compare(old_passorword, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match', 401);
      }

      user.password = await hash(password, 10);
    }

    if (name) {
      user.name = name;
    }

    await usersRepositories.save(user);

    return user;
  }
}
