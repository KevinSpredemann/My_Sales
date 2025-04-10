import { ICreateUser } from '../models/ICreateUser';
import { IPaginateUser } from '../models/IPaginateUser';
import { IUser } from '../models/IUser';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IUserRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findByName(name: string): Promise<IUser | null>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<void>;
}
