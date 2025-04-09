import { ICostumer } from "@modules/costumers/domain/models/ICostumer";
import { ICreateOrderProducts } from "./ICreateOrderProduct";

export interface ICreateOrder {
  customer: ICostumer;
  products: ICreateOrderProducts[];
}
