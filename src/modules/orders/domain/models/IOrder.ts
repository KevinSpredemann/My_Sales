import { ICostumer } from "@modules/costumers/domain/models/ICostumer";
import { ICreateOrderProducts } from "./ICreateOrderProduct";

export interface IOrder {
  id: string;
  order?: number;
  customer: ICostumer;
  order_products: ICreateOrderProducts[];
  created_at: Date;
  updated_at: Date;
}
