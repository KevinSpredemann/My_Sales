import { User } from "../entities/User";
import { usersRepositories } from "../repositories/UsersRepositories";

export default class ListUserService {
  async execute(): Promise<User[]> {
    const users = await usersRepositories.find();
    return users;
  }
}
