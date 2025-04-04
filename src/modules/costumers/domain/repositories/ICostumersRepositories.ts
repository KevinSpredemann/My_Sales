import { ICostumer } from "../models/ICostumer";
import { ICreateCostumer } from "../models/ICreateUsers";

export interface Pagination {
  take: number;
  skip: number;
}

export interface ICostumerRepository {
  findByEmail(email: string): Promise<ICostumer | null>;
  create(data: ICreateCostumer): Promise<ICostumer>;
  save(costumer: ICostumer): Promise<ICostumer>;
  remove(costumer: ICostumer): Promise<void>;
  findById(id: number): Promise<ICostumer | null>;
  findAndCount(pagination: Pagination): Promise<[ICostumer[], number]>;
  findByName(name: string): Promise<ICostumer | null>;
}
