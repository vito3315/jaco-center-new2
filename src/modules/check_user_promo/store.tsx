import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { promoState } from './types';
import { api } from '@/components/api';

export const usePromo = createWithEqualityFn<promoState>((set, get) => ({
  loading: false,
  number: '',
  promos: [],
  promos_sms: [],

  // изменения номера телефона клиента
  changeNumber: (event: { target: { value: string } }) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');

    if (onlyNums.length < 12) {
      set({ number: onlyNums });
    }
  },

  // получение информации о промо клиента
  getPromoList: async () => {
    set({ loading: true });

    const data = {
      type: 'check_user_promo_new',
      number: get().number,
    };

    const result = await api(data);

    set({
      promos: result.promo_lk,
      promos_sms: result.promo_sms,
      loading: false,
    });
  },
}), shallow);
