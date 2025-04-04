import { User } from '@modules/users/infra/database/entities/User';
import { IUser } from '../../models/IUser';
import { IUserRepository, SearchParams } from '../IUserRepositories';
import { v4 as uuidv4 } from 'uuid';
import { IPaginateUser } from '../../models/IPaginateUser';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class FakeUserRepositories implements IUserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find(user => user.email === email) as IUser;
  }

  async create(userData: IRequest): Promise<IUser> {
    const user = new User();

    user.id = uuidv4();
    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;

    this.users.push(user);

    return user as IUser;
  }

  public async save(user: User): Promise<void> {
    const findIndex = this.users.findIndex(
      findUser => findUser.id === user.id,
    );

    if (findIndex !== -1) {
      this.users[findIndex] = user;
    } else {
      this.users.push(user);
    }
  }

  findAll({ page, skip, take }: {page: number, skip: number, take: number}): Promise<IPaginateUser> {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Promise<IUser | null> {
    throw new Error('Method not implemented.');
  }

  findByName(name: string): Promise<IUser | null> {
    throw new Error('Method not implemented.');
  }
}

export default FakeUserRepositories;
