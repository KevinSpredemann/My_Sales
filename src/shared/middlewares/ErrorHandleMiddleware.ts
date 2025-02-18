import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

export default class ErrorHandleMiddleware {
  public static handleError(error: Error, _req: Request, res: Response): void {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        type: 'error',
        message: error.message,
      });
    } else {
      // Caso seja um erro genérico, respondemos com erro 500
      res.status(500).json({
        type: 'error',
        message: `Internal server error - ${error.message}`,
      });
    }
  }
}
