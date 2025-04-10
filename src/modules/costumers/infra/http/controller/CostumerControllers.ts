import { Request, Response } from 'express';
import ListCostumerService from '../../../services/ListCostumersService';
import ShowCostumerService from '../../../services/ShowCostumerServices';
import CreateCostumerService from '../../../services/CreateCostumerService';
import UpdateCostumerService from '../../../services/UpdateCostumerService';
import DeleteCostumerService from '../../../services/DeleteCostumerService';
import { container } from 'tsyringe';

export default class CostumerControllers {
  async index(request: Request, response: Response): Promise<Response> {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    const listCostumers = container.resolve(ListCostumerService);

    const costumers = await listCostumers.execute(page, limit);
    return response.json(costumers);
  }
  async show(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const showCostumer = container.resolve(ShowCostumerService);
    const costumer = await showCostumer.execute({ id });
    return response.json(costumer);
  }
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCostumerService = container.resolve(CreateCostumerService);
    const costumer = await createCostumerService.execute({ name, email });
    return response.json(costumer);
  }
  async update(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const { name, email } = request.body;
    const updateCostumerService = container.resolve(UpdateCostumerService);
    const costumer = await updateCostumerService.execute({ id, name, email });
    return response.json(costumer);
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const deleteCostumerService = container.resolve(DeleteCostumerService);
    await deleteCostumerService.execute({ id });
    return response.status(204).json([]);
  }
}
