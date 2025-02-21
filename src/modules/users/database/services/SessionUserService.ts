import AppError from '@shared/errors/AppError';
import { User } from '../entities/User';
import { usersRepositories } from '../repositories/UsersRepositories';
import { compare } from 'bcrypt';
import { Secret, sign } from 'jsonwebtoken';
import 'dotenv/config';

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

    const token = sign({}, process.env.APP_SECRET as Secret, {
      subject: user.id.toString(),
      expiresIn: '1d',
    });

    return {
      user,
      token,
    }
  }
}
