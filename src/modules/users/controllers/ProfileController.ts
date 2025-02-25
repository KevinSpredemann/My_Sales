import { Request, Response } from "express";
import ShowProfileService from "../database/services/ShowProfileService";
import UpdateProfileService from "../database/services/UpdateProfileService";
export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user_id = Number(request.user.id);

    const user = await showProfile.execute({ user_id });
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.user.id);
    const { name, email, password, old_password } = request.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_passorword: old_password,
    });

    return response.json(user);
  }
}
