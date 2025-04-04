import { inject, injectable } from 'tsyringe';
import { IUserRepository, SearchParams } from '../domain/repositories/IUserRepositories';
import { IPaginateUser } from '../domain/models/IPaginateUser';
@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}
  public async execute({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateUser> {
    const users = this.usersRepository.findAll({ page, skip, take });
    return users;
  }
}

export default ListUserService;
