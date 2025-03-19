import { IItem } from './item';
import { IRound } from './round';

export type IOrder = {
  id: number;
  created: Date;
  paid: boolean;
  subtotal: number;
  taxes: number;
  discounts: number;
  items: IItem[];
  rounds: IRound[];
};
