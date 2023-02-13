import { create } from 'zustand';
import { api } from '../../api';
// import { persist, devtools } from 'zustand/middleware'

type Data = {
  point_id: string;
  date: string;
}

export const useOrders = create<unknown>((set) => ({
  loading: false,
  error: null,
  cities: [],
  points: [],
  allItems: [],
  orders: [],

  getDataForm: async (method: string) => {
    set({ loading: true });

    try {
      const data = new FormData();
      data.append('type', method);

      const result: any = await api.post('', { body: data }).json();

      if (result.st === false && result.type == 'redir') {
        window.location.pathname = '/';
        return;
      }

      if (result.st === false && result.type == 'auth') {
        window.location.pathname = '/auth';
        return;
      }

      // console.log(result);

      set({
        cities: result.cities,
        points: result.points,
        allItems: result.all_items,
        error: null,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  getDataTable: async (method: string, data: Data) => {
    set({ loading: true });

    try {
      const formData = new FormData();
      formData.append('type', method);
      formData.append('point_id', data.point_id);
      formData.append('date', data.date);

      const result: any = await api.post('', { body: formData }).json();

      if (result.st === false && result.type == 'redir') {
        window.location.pathname = '/';
        return;
      }

      if (result.st === false && result.type == 'auth') {
        window.location.pathname = '/auth';
        return;
      }

      // console.log(result);

      set({
        orders: result.orders,
        error: null,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
