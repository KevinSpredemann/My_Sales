import AppError from '@shared/errors/AppError';
import { User } from '../entities/User';
import { usersRepositories } from '../repositories/UsersRepositories';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface ISessionUser {
  email: string;
  password: string;
}

interface ISessionResponse {
  user: User;
  token: string;
}

export default class SessionUserService {
  async execute({ email, password }: ISessionUser): Promise<ISessionResponse> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination ', 401);
    }

    const passwordConfirmation = await compare(password, user.password);

    if (!passwordConfirmation) {
      throw new AppError('Incorrect email/password combination ', 401);
    }

    const token = sign({}, "343566", {
      subject: user.id.toString(),
      expiresIn: '1d',
    });

    return {
      user,
      token,
    }
  }
}
