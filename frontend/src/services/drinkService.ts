import axios from 'axios';
import { Drink } from '../types/drink';
import { API_URL } from '../config';

export const drinkService = {
  getDrinks: async (): Promise<Drink[]> => {
    const response = await axios.get<Drink[]>(`${API_URL}/drinks`);
    return response.data;
  },
};
