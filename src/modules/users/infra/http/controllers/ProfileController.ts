import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/updateUserAvatarService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);

    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(instanceToInstance(user));
  }
}
