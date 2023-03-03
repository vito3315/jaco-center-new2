import { create } from 'zustand';
import { ordersState } from './types';
import { api } from '@/components/api';
import { formatDate } from '@/lib';

export const useOrders = create<ordersState>((set, get) => ({
  number: '',
  address: '',
  loading: false,
  cities: [],
  points: [],
  pointsCopy: [],
  allItems: [],
  orders: [],
  ordersCopy: [],
  order: null,
  pointId: 0,
  cityId: '',
  indexTab: 0,
  date: formatDate(new Date()),
  showOrder: null,
  openOrder: false,
  openClose: false,
  openAlert: false,
  status: false,
  text: '',

  // фильтр для заказов в таблице по номеру или адресу клиента
  filterOrders: () => {
    let ordersCopy = structuredClone(get().ordersCopy);

    if (get().number.length > 0) {
      ordersCopy = ordersCopy.filter((item: { number: string }) => item.number.indexOf(get().number) !== -1);
    }

    if (get().address.length > 0) {
      ordersCopy = ordersCopy.filter((item: { street: string; home: string }) => (item.street + ' ' + item.home).toLowerCase().indexOf(get().address.toLowerCase()) !== -1);
    }

    set({orders: ordersCopy});
  },

  // фильтр точек по городам
  filterPoints: (city_id) => {
    const pointsCopy = structuredClone(get().pointsCopy);

    const points = pointsCopy.filter((item) => parseInt(item.city_id) == parseInt(city_id));

    set({points});
  },

  // выбор города
  changeCity: (event) => {
    const pointsCopy = structuredClone(get().pointsCopy);

    const points = pointsCopy.filter((item) => parseInt(item.city_id) == parseInt(event.target.value));

    set({
      points,
      pointId: points[0].id,
      cityId: event.target.value,
      indexTab: 0,
    });

    get().setData();
  },

  // поиск по адресу клиента
  changeAddress: (event) => {
    set({address: event.target.value});

    get().filterOrders();
  },

  // поиск по телефону клиента
  changeNumber: (event) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');

    if (onlyNums.length < 11) set({number: onlyNums});

    get().filterOrders();
  },

  // изменение даты
  changeDate: (value) => {
    set({date: value ? formatDate(value) : ''});

    get().setData();
  },

  // получение и сброс данных в таблице
  setData: (point_id, index) => {
    set({number: '', address: '', orders: []});

    if (point_id) set({pointId: point_id});

    if (index || index === 0) set({indexTab: index});

    const data = {
      point_id: point_id ?? get().pointId,
      date: get().date,
    };

    get().getOrders(data);
  },

  // получение данных для Form
  getDataForm: async () => {
    set({ loading: true });

    const data = {
      type: 'get_center_all',
    };

    const result = await api(data);

    set({
      status: true,
      pointId: result.cities[0].id,
      cityId: result.cities[0].id,
      cities: result.cities,
      points: result.points,
      pointsCopy: result.points,
      allItems: result.all_items,
      loading: false,
    });

    get().filterPoints(result.cities[0].id);

    const obj = {
      point_id: result.cities[0].id,
      date: get().date,
    };

    get().getOrders(obj);
  },

  // получения заказок точки
  getOrders: async (obj) => {
    set({ loading: true });

    const data = {
      type: 'get_orders',
      date: obj.date,
      point_id: obj.point_id,
    };

    const result = await api(data);

    set({
      orders: result.orders,
      ordersCopy: result.orders,
      loading: false,
    });
  },

  // получения заказа клиента
  getOrder: async (order_id) => {

    set({ loading: true });

    const data = {
      type: 'get_order',
      point_id: get().pointId,
      order_id,
    };

    const result = await api(data);

    set({
      openOrder: true,
      showOrder: result,
      loading: false,
    });
  },

  // закрытие заказа клиента
  closeOrder: async (obj) => {
    set({ loading: true });

    const data = {
      type: 'close_order_center',
      // token: localStorage.getItem('token'),
      typeCreate: obj.typeCreate,
      order_id: obj.order_id,
      point_id: obj.point_id,
      ans: obj.ans,
    };

    const result = await api(data);

    if (result.st) {
      set({
        openOrder: false,
        openClose: false,
        loading: false,
      });

      const obj = {
        point_id: get().pointId,
        date: get().date,
      };

      get().getOrders(obj);
    } else {
      set({
        status: result.st,
        text: result.text,
        openAlert: true,
        loading: false,
      });
    }
  },
}));
