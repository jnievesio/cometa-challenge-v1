import { Item } from './item';
import { Round } from './round';

export type IOrder = {
  id: number;
  created: Date;
  paid: boolean;
  subtotal: number;
  taxes: number;
  discounts: number;
  items: Item[];
  rounds: Round[];
};
