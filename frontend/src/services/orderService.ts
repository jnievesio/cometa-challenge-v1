import axios from 'axios';
import { IOrder } from '../types/order';
import { Item } from '../types/item';
import { API_URL } from '../config';

export const orderService = {
  getOrders: async (): Promise<IOrder[]> => {
    const { data } = await axios.get(`${API_URL}/orders`);
    return data;
  },

  getOrder: async (orderId: number): Promise<IOrder> => {
    const { data } = await axios.get(`${API_URL}/orders/${orderId}`);
    return data;
  },

  createOrder: async (): Promise<IOrder> => {
    const { data } = await axios.post(`${API_URL}/orders`);
    return data;
  },

  addItem: async (orderId: number, item: Item): Promise<IOrder> => {
    const { data } = await axios.post(`${API_URL}/orders/${orderId}/items`, item);
    return data;
  },

  updateOrder: async (order: IOrder) => {
    const response = await axios.put(`${API_URL}/orders/${order.id}`, order);
    return response.data;
  },
  deleteOrder: async (orderId: number) => {
    const response = await axios.delete(`${API_URL}/orders/${orderId}`);
    return response.data;
  },
  markOrderAsPaid: async (orderId: number) => {
    const response = await axios.patch(`${API_URL}/orders/${orderId}/pay`);
    return response.data;
  },
};
