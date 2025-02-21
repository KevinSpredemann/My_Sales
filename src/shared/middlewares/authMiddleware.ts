import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import 'dotenv/config';

interface ITokenPaiload {
  iat: number;
  exp: number;
  sub: string;
}
export default class AuthMiddleware {
  static execute(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
      const decodedToken = verify(token, process.env.APP_SECRET as Secret);

      const { sub } = decodedToken as ITokenPaiload;

      request.user = {
        id: sub,
      };

      return next();
    } catch {
      throw new AppError('Invalid JWT token', 401);
    }
  }
}
