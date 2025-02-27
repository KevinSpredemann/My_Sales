import { Request, Response } from 'express';
import ListCostumerService from '../services/ListCostumersService';
import ShowCostumerService from '../services/ShowCostumerServices';
import CreateCostumerService from '../services/CreateCostumerService';
import UpdateCostumerService from '../services/UpdateCostumerService';
import DeleteCostumerService from '../services/DeleteCostumerService';

export default class CostumerControllers {
  async index(request: Request, response: Response): Promise<Response> {
    const listCostumers = new ListCostumerService();

    const costumers = await listCostumers.execute();
    return response.json(costumers);
  }
  async show(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const showCostumer = new ShowCostumerService();
    const costumer = await showCostumer.execute({ id });
    return response.json(costumer);
  }
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCostumerService = new CreateCostumerService();
    const costumer = await createCostumerService.execute({ name, email });
    return response.json(costumer);
  }
  async update(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const { name, email } = request.body;
    const updateCostumerService = new UpdateCostumerService();
    const costumer = await updateCostumerService.execute({ id, name, email });
    return response.json(costumer);
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const deleteCostumerService = new DeleteCostumerService();
    await deleteCostumerService.execute({ id });
    return response.status(204).json([]);
  }
}
