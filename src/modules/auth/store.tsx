import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { authState } from './types';
import { api } from '@/components/api';

export const useAuth = createWithEqualityFn<authState>((set, get) => ({
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

    const res = await api(data);

    if (res.st) {
      localStorage.setItem('token', res.token);

      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } else {
      set({
        status: res.st,
        text: res.text ?? 'Ошибка авторизации!',
        openAlert: true,
      });
    }

    set({ loading: false });
  },

  // проверка авторизации
  checkLogin: async () => {
    const token = localStorage.getItem('token');

    if (token) {
      const data = {
        type: 'check_login_center',
        token,
      };

      const res = await api(data);

      if (res) {
      } else {
        localStorage.removeItem('token');
        setTimeout(() => {
          window.location.href = '/auth';
        }, 500);
      }
    } else {
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.href = '/auth';
      }, 500);
    }
  },
}), shallow);
