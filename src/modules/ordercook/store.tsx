import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { ordercookState } from './types';
import { api } from '@/components/api';

export const useOrderCook = createWithEqualityFn<ordercookState>((set, get) => ({
  loading: false,
  points: [],
  point: '',
  orders: null,

  // изменения Точки в селекте
  changePoint(event){
    set({point: event.target.value});

    get().getCookOrders();
  },

  // получение данных для Form
  getDataForm: async (city_id) => {
    set({ loading: true });

    const data = {
      type: 'get_points_center',
      city_id,
    }

    const result = await api(data);

    set({
      points: result,
      point: result[0].id,
      loading: false,
    });

    get().getCookOrders();

  },
  
  // получение заказов Точки
  getCookOrders: async () => {
    set({ loading: true });

    const data = {
      type: 'getCookOrders',
      point_id: get().point,
    }

    const result = await api(data);

    set({
      orders: result,
      loading: false,
    });

  }
}), shallow);
