import { create } from 'zustand';
import { promoState } from './types';
import { api } from '@/components/api';

export const usePromo = create<promoState>((set, get) => ({
  loading: false,
  number: '',
  promos: [],
  promos_sms: [],

  // изменения номера телефона клиента
  changeNumber: (event: { target: { value: string } }) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');

    if (onlyNums.length < 11) {
      set({ number: onlyNums });
    }

    if (onlyNums.length === 11) {
      const number = onlyNums.replace(/(\8)(\d{3})(\d{3})(\d{2})(\d{2})/gi, '$1 ($2) $3 $4-$5');
      set({ number });
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
}));
