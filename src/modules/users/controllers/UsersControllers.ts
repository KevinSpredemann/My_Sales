import { Request, Response } from 'express';
import ListUserService from '../database/services/ListUserService';
import CreateUserService from '../database/services/CreateUserService';
import { instanceToInstance } from 'class-transformer';
export default class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();
    const users = await listUserService.execute();
    return response.json(instanceToInstance(users));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });
    return response.json(instanceToInstance(user));
  }
}
