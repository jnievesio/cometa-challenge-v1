import axios from 'axios';
import { IDrink } from '../types/drink';
import { API_URL } from '../config';

export const drinkService = {
  getDrinks: async (): Promise<IDrink[]> => {
    const response = await axios.get<IDrink[]>(`${API_URL}/drinks`);
    return response.data;
  },
};
