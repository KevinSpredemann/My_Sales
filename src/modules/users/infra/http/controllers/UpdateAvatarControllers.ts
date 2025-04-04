import { Request, Response } from 'express';
import updateUserAvatarService from '../../../services/updateUserAvatarService';

export default class UpdateAvatarControllers {
  async update(request: Request, response: Response): Promise<Response> {
    const updateAvatarService = new updateUserAvatarService();

    const user = await updateAvatarService.execute({
      userId: Number(request.user.id),
      avatarFilename: request.file?.filename as string,
    });

    return response.json(user);
  }
}
