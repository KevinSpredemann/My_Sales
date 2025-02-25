import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../database/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotEmailPasswordService = new SendForgotPasswordEmailService();
    await sendForgotEmailPasswordService.execute({ email });
    return response.status(204).json();
  }
}
