import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { ordersState, orderRootObject } from './types';
import { api } from '@/components/api';
import { formatDate } from '@/lib';
import dayjs from 'dayjs';

export const useOrders = createWithEqualityFn<ordersState>((set, get) => ({
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
  showOrder: {} as orderRootObject,
  openOrder: false,
  openClose: false,
  openAlert: false,
  status: false,
  text: '',

  // фильтр для заказов в таблице по номеру или адресу клиента
  filterOrders: () => {
    let orders = get().ordersCopy;

    if (get().number.length > 0) {
      orders = orders.filter((item: { number: string }) => item.number.indexOf(get().number) !== -1);
    }

    if (get().address.length > 0) {
      orders = orders.filter((item: { street: string; home: string }) => (item.street + ' ' + item.home).toLowerCase().indexOf(get().address.toLowerCase()) !== -1);
    }

    set({ orders });
  },

  // фильтр точек по городам
  filterPoints: (city_id) => {
    let points = get().pointsCopy;

    points = points.filter((item: { city_id: string }) => parseInt(item.city_id) == parseInt(city_id));

    set({ points });
  },

  // выбор города
  changeCity: (event) => {
    let points = get().pointsCopy;

    points = points.filter((item: { city_id: string }) => parseInt(item.city_id) == parseInt(event.target.value));

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
    set({ address: event.target.value });

    get().filterOrders();
  },

  // поиск по телефону клиента
  changeNumber: (event) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');

    if (onlyNums.length < 12) set({ number: onlyNums });

    get().filterOrders();
  },

  // изменение даты
  changeDate: (value) => {
    set({ date: value ? dayjs(value) : '' });

    get().setData();
  },

  // получение и сброс данных в таблице
  setData: (point_id, index) => {
    set({ number: '', address: '', orders: [] });

    if (point_id) set({ pointId: point_id });

    if (index || index === 0) set({ indexTab: index });

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
      date: dayjs(obj.date).format('YYYY-MM-DD'),
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

    const token = localStorage.getItem('token');
   
    const data = {
      type: 'close_order_center',
      token,
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

  // повтор выбранного заказа
  repeatOrder: () => {
    let item_info = null;
    let my_cart: {name: any; id: any; count: any; price: any; all_price: any}[] = [];
    const all_items = get().allItems;
    const showOrder = get().showOrder;

    localStorage.setItem('cityID', get().cityId);

    // if( showOrder.order.promo_name && showOrder.order.promo_name != '' ){
    //   itemsStore.setPromo( JSON.stringify(showOrder.promo_info), showOrder.order.promo_name );

    //   if( parseInt(showOrder.promo_info.promo_action) == 2 ){

    //   }
    // }

    showOrder.order_items.map((item) => {
      item_info = all_items.find((item_) => item_.id == item.item_id);

      if (item_info) {
        const price = parseInt(item_info.price),
          all_price = parseInt(item.count) * parseInt(item_info.price);

        my_cart.push({
          price,
          all_price,
          name: item.name,
          id: item.item_id,
          count: item.count,
        });
      }
    });

    if (showOrder.order.promo_name && showOrder.order.promo_name != '') {
      if (parseInt(showOrder.promo_info.promo_action) == 2) {
        showOrder.promo_info.items_add.map((item_add) => {
          my_cart.map((item_cart, key_cart) => {
            if (parseInt(item_cart.id) == parseInt(item_add.item_id)) {
              my_cart[key_cart].count -= parseInt(item_add.count);
              my_cart[key_cart].all_price = parseInt(my_cart[key_cart].count) * parseInt(item_cart.price);
            }
          });
        });
      }
    }

    localStorage.setItem('clientNumber', showOrder.order.number);

    const data = {
      orderType: parseInt(showOrder.order.type_order_) - 1 == 0 ? 0 : 1,
      orderAddr: showOrder.street.name,
      orderPic: parseInt(showOrder.order.point_id),
      orderComment: showOrder.order.comment,
      orderTimes: parseInt(showOrder.order.is_preorder),
      orderPredDay: parseInt(showOrder.order.is_preorder) == 1 ? showOrder.order.date_time_pred.date : '',
      orderPredTime: parseInt(showOrder.order.is_preorder) == 1 ? showOrder.order.date_time_pred.time : '',
      orderPay: parseInt(showOrder.order.type_order_) == 1 ? 'cash' : 'in',
      orderSdacha: showOrder.order.sdacha,
    };

    localStorage.setItem('cartData', JSON.stringify(data));

    const cart = my_cart.filter((item) => item.count > 0);
    localStorage.setItem('my_cart', JSON.stringify(cart));

    setTimeout(() => {
      window.location.pathname = '/';
    }, 500);
  },

  // клиент не вышел на связь
  fakeUser: async () => {
    set({ loading: true });

    let type_check = 0;

    if (parseInt(get().showOrder.order.check_pos) >= 0) {
      if (parseInt(get().showOrder.order.check_pos) <= 100) {
        type_check = 1;
      } else {
        type_check = 2;
      }
    } else {
      type_check = 0;
    }

    //0 - не активно
    //1 - сразу
    //2 - уточнить

    if (type_check) {
      set({
        status: false,
        text: 'Создать обращение не возможно',
        openAlert: true,
        loading: false,
      });
      return;
    }

    if (type_check === 1) {
      const text: any = prompt('Комментарий к ситуации', '');

      if (text.length > 0) {
        const data = {
          text,
          type: 'fake_user',
          point_id: parseInt(get().showOrder.order.point_id),
          order_id: parseInt(get().showOrder.order.order_id),
        };

        const res = await api(data);

        if (res.st) {
          set({
            status: true,
            text: 'Обращение зафиксировано',
            openOrder: true,
            loading: false,
          });
        } else {
          set({
            status: false,
            text: res.text,
            openOrder: true,
            loading: false,
          });
        }
      } else {
        set({
          status: false,
          text: 'надо указать комментарий',
          openOrder: true,
          loading: false,
        });
      }
    }

    if (type_check === 2) {
      const result = confirm(
        'Курьер, предположительно, находиться далеко от клиента, точно оформить довоз ?'
      );

      if (result) {
        const text: any = prompt('Комментарий к ситуации', '');

        if (text.length > 0) {
          const data = {
            text,
            type: 'fake_user',
            point_id: parseInt(get().showOrder.order.point_id),
            order_id: parseInt(get().showOrder.order.order_id),
          };

          const res = await api(data);

          if (res.st) {
            set({
              status: true,
              text: 'Обращение зафиксировано',
              openOrder: true,
              loading: false,
            });
          } else {
            set({
              status: false,
              text: res.text,
              openOrder: true,
              loading: false,
            });
          }
        } else {
          set({
            status: false,
            text: 'надо указать комментарий',
            openOrder: true,
            loading: false,
          });
        }
      }
    }
  },
}), shallow);
