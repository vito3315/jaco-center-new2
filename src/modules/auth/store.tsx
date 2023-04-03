import { create } from 'zustand';
import { authState } from './types';
import { api } from '@/components/api';

export const useAuth = create<authState>((set, get) => ({
  loading: false,
  number: '',
  password: '',
  openAlert: false,
  status: false,
  text: '',

  // изменение/введение номера телефона/логина
  changeNumber: (event) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');

    if (onlyNums.length < 12) set({ number: onlyNums });
  },

  // изменение/введение пароля
  changePassword: (event) => {
    set({ password: event.target.value });
  },

  // авторизации при нажатии enter
  enter: (event) => {
    if (event.key === 'Enter') {
      get().login();
    }
  },

  // авторизация
  login: async () => {
    if (get().number.length < 1 && get().password.length < 1) {
      set({
        status: false,
        text: 'Введите логин/пароль!',
        openAlert: true,
      });

      return;
    }

    set({ loading: true });

    const data = {
      type: 'login_center',
      number: get().number,
      pass: get().password,
    };

    let res = await api(data);

    if (res.st) {
      // itemsStore.setToken(res.token, res.name);

      // setTimeout( () => {
      window.location.href = '/';
      // }, 500)
    } else {
      set({
        status: res.st,
        text: res.text ?? 'Ошибка авторизации!',
        openAlert: true,
      });
    }

    set({ loading: false });
  },
}));
