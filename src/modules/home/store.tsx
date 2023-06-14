import { create } from 'zustand';
import { homeState, AllItem, CatItem } from './types';
import { api } from '@/components/api';
import moment from 'moment';

export const useHome = create<homeState>((set, get) => ({
  loading: false,
  cityId: '1',
  cityList: [],
  cats: [],
  allItems: [],
  promo_name: '',
  orderPromoText: '',
  promoST: false,
  checkClear: false,
  check_home_true: true,
  newAddrDom: true,
  errorOpen: false,
  error: {
    title: '',
    text: '',
  },
  number: '',
  newAddrHome: '',
  pd: '',
  et: '',
  kv: '',
  comment: '',
  sdacha: '',
  newOrderData: null,
  thisItem: null,
  textAvgTime: 'Среднее время: ~',
  orderPic: 0,
  sumDiv: '0',
  AllPrice: '0',
  activeCat: 0,
  picPointInfo: null,
  clientAddr: [],
  activeTab: 0,
  date: '', //дата предзаказа
  time: '', //время предзаказа
  typeTime: 0, // 0 - быстрее / 1 - пред
  pic_point: [],
  all_addr: [],
  date_pred: [],
  list_addr_for_choose: [],
  timePred: [],
  orderCheck: false,
  list_addr_choose: false,
  clickOrderStart: false,
  newAddrInfo: null,
  newAddrStreet: null,
  point_id: 0,
  chooseAddr: null,
  openAlert: false,
  status: false,
  text: '',
  location: null,
  MyPromos: [
    {
      date: moment(new Date()).format('YYYY-MM-DD'),
      promo: 'ЛЕГКО',
      name: 'ЛЕГКО',
      count: 3,
    },
  ],

  newOrder: null,
  startOrderIntervalTimer: null,
  startOrderInterval: null,

  mainItems: [],

  // выбор города
  changeCity: (event) => {
    set({ cityId: event.target.value });

    get().getDataForm();
  },

  // данные для Form
  getDataForm: async () => {
    set({ loading: true });

    let mainItems = get().mainItems;

    let data = {
      type: 'get_cat_center_new',
      city_id: get().cityId,
    };

    let res = await api(data);

    // console.log('getDataForm====>', res);

    set({
      loading: false,
      cats: res.arr,
      cityList: res.city_list,
      allItems: res.all_items,
    });

    let allItems = get().allItems;

    mainItems = mainItems.map((item: CatItem) => {
      allItems.map((it) => {
        if (parseInt(item.id) == parseInt(it.id)) {
          item.price = it.price;
          item.all_price = parseInt(it.price) * parseInt(item.count);
        }
        return it;
      });
      return item;
    });

    const AllPrice = mainItems.reduce((all: any, it: { all_price: any; }) => all + Number(it.all_price), 0); // без суммы доставки

    data = {
      type: 'get_by_mi_new',
      city_id: get().cityId,
      // user_id: itemsStore.getToken() // нужен будет здесь токен?
    };

    res = await api(data);

    // console.log('getDataForm 2 ====>', res);

    set({
      pic_point: res.get_addr_pic.points,
      all_addr: res.get_addr,
      date_pred: res.date_pred,
      mainItems,
      AllPrice,
    });

    get().loadSavedData(); /// что делает эта функция?
  },

  // проверка промика
  checkPromo: async (event) => {
    // itemsStore.setItemsPromo([]);

    const promo = event.target.value;

    const data = {
      type: 'get_promo',
      city_id: get().cityId,
      promo_name: promo,
    };

    const res = await api(data);

    console.log('checkPromo ===>', res);

    // itemsStore.setPromo( JSON.stringify(res), promo );
    // let check_promo = itemsStore.checkPromo();

    // if( check_promo.st === false ){
    //   localStorage.removeItem('promo_name')
    // }

    // if( promo.length == 0 ){
    //   this.setState({
    //     orderPromoText: '',
    //     promo_name: '',
    //     promoST: false
    //   })
    //   localStorage.removeItem('promo_name')
    // }else{
    //   this.setState({
    //     orderPromoText: check_promo.text,
    //     promoST: check_promo.st,
    //     promo_name: promo
    //   })
    // }
  },

  // валидация/сохранение номер телефона
  saveNumber: (event) => {
    let number: string = event.target.value;
    let str: string[] = [];

    if (number.length > 0) {
      number = number.split(' ').join('');
      number = number.split('(').join('');
      number = number.split(')').join('');
      number = number.split('-').join('');
      number = number.split('+').join('');

      if (number[0] == '7') {
        str = number.split('');
        str[0] = '8';
        number = str.join('');
      }

      if (number.length != 11) {
        set({
          openAlert: true,
          status: false,
          text: 'Номер введен в не верном формате',
        });
        return;
      }
    }

    set({ number });

    if (!number.length) {
      set({ clientAddr: [] });
    } else {
      get().getAddr(); // установка адресов клиента по номеру телефона во вкладке Адрес клиента
    }
  },

  // получение адресов клиента по введенному номеру телефона
  getAddr: async () => {
    const data = {
      type: 'get_user_addrs',
      city_id: get().cityId,
      login: get().number,
    };

    const res = await api(data);

    console.log('getAddr ===>', res);

    set({ clientAddr: res });
  },

  // введение/изменение номера телефона
  changeNumber: (event) => {
    const number = event.target.value;

    set({ number });
  },

  // переключение таба доставка/самовывоз/адрес клиента
  changeTab: (event, newValue) => {
    // if (parseInt(newValue) == 1) {
    //   itemsStore.setSumDiv(0);
    // }

    // if (parseInt(newValue) == 0 || parseInt(newValue) == 2) {
    //   let addr = this.state.newAddrInfo;

    //   if (addr) {
    //     let allPrice = itemsStore.getAllPrice();

    //     if (
    //       parseInt(addr.free_drive) == 1 ||
    //       parseInt(itemsStore.free_drive) == 1
    //     ) {
    //       if (parseInt(allPrice) > 0) {
    //         itemsStore.setSumDiv(0);
    //       } else {
    //         itemsStore.setSumDiv(1);
    //       }
    //     } else {
    //       itemsStore.setSumDiv(parseInt(addr.sum_div));
    //     }
    //   }
    // }

    set({ activeTab: newValue });

    get().saveData(); // что делает эта функция ?

    setTimeout(() => {
      if (parseInt(get().typeTime) == 0) {
        get().loadTimeWait(); // устанавливает время ожидания заказа ?
      } else {
        get().loadTimePred(); // что делает эта функция ?
      }

      if (get().promo_name.length > 0) {
        get().checkPromo({ target: { value: get().promo_name } }); // проверяет промик указанный клиентом ?
      }
    }, 300);
  },

  // проверка адреса клиента введенного для доставки
  checkNewAddr: async (is_check) => {
    setTimeout(() => {
      get().clickOrderStart = true;
    }, 10);

    set({ check_home_true: true });

    const street = (document.querySelector('#newAddrStreet') as HTMLInputElement).value;

    //console.log('checkNewAddr street===>', street) 

    if (street.length > 0 && get().newAddrHome.length > 0) {

      const data = {
        type: 'check_addr',
        city_id: get().cityId,
        street,
        home: get().newAddrHome, // номер дома указанный в доставке
        //user_id: itemsStore.getToken()
      };

      const res = await api(data);

      console.log('checkNewAddr ===>', res);

      if (parseInt(res.count) == 0) {
        if (is_check === true) {
          set({
            openAlert: true,
            status: false,
            text: 'Адрес не найден, или не входит в зону доставки',
          });
        }

        set({
          newAddrInfo: null,
          point_id: 0,
          check_home_true: false,
        });

        setTimeout(() => {
          get().saveDataOther(); // что делает эта функция ?

          get().clickOrderStart = false; // устанавливает что заказ не надо оформлять
        }, 100);

        return;
      }

      if (parseInt(res.count) > 1 && is_check === true) {
        set({
          list_addr_for_choose: res.addrs,
          list_addr_choose: true,
          openAlert: false,
        });

        setTimeout(() => {
          get().clickOrderStart = false; 
        }, 100);
      }

      if (parseInt(res.count) == 1) {
        res.addrs = res.addrs[0];

        set({
          newAddrInfo: res.addrs,
          point_id: res.addrs.point_id,
          openAlert: false,
        });


        // установление суммы доставка заказа ?
        // let allPrice = itemsStore.getAllPrice();

        // if( parseInt(res.addrs.free_drive) == 1 || parseInt(itemsStore.free_drive) == 1 ){
        //     if( parseInt(allPrice) > 0 ){
        //         itemsStore.setSumDiv(0);
        //     }else{
        //         itemsStore.setSumDiv(1);
        //     }
        // }else{
        //     itemsStore.setSumDiv(parseInt(res.addrs.sum_div));
        // }

        setTimeout(() => {
          get().saveDataOther(); // что делает эта функция?

          setTimeout(() => {
            if (parseInt(get().typeTime) == 0) {
              get().loadTimeWait(); // эта функция устанавливает время ожидания?
            } else {
              get().loadTimePred(); // что делает эта функция?
            }

            get().clickOrderStart = false; // устанавливает состояния необходимости проверки адреса клиента?

            if (get().promo_name.length > 0) {
              get().checkPromo({ target: { value: get().promo_name } }); // проверка промика клиента?
            }
          }, 300);
        }, 100);
      }
    } else {
      set({
        newAddrInfo: null,
        point_id: 0,
      });

      setTimeout(() => {
        get().saveDataOther(); // что делает эта функция?

        get().clickOrderStart = false;
      }, 300);
    }
  },

  // введение/изменение адреса клиента для доставки
  changeAddrCustom: (event, value) => {
    set({ newAddrStreet: value });
  },

  //изменение номера дома в адресе клиента
  changeAddrHome: (event) => {
    set({ newAddrHome: event.target.value });

    setTimeout(() => {
      get().checkNewAddr(false);
    }, 10);
  },

  // изменения подъезда в адресе клиента
  changeAddrPd: (event) => {
    set({ pd: event.target.value });

    get().saveDataOther();
  },

  // изменения этажа в адресе клиента
  changeAddrEt: (event) => {
    set({ et: event.target.value });

    get().saveDataOther();
  },

  // изменения квартиры в адресе клиента
  changeAddrKv: (event) => {
    set({ kv: event.target.value });

    get().saveDataOther();
  },

  // переключение домофон работает/не работает в адресе клиента
  changeDomTrue: (type) => {
    set({
      newAddrDom: type,
    });

    // this.changeDataOther('dom_true', {target: {value: type ? 1 : 0}})  // эта функция необходима ? dom_true нет в state ??
  },

  // в самовывозе выбор адреса точки
  choosePic: (point, is_save = true) => {
    console.log('choosePic ===>', point);

    set({
      orderPic: point.id,
      picPointInfo: point,

      activeTab: 1,

      point_id: point.id,
      sumDiv: '0',
    });

    if (is_save === true) {
      get().saveData(); // что делает эта функция ?
    }

    setTimeout(() => {
      if (get().promo_name.length > 0) {
        get().checkPromo({ target: { value: get().promo_name } }); // проверяет промик клиента
      }

      if (parseInt(get().typeTime) == 0) {
        get().loadTimeWait(); // устанавливает время ожидания заказа ?
      } else {
        get().loadTimePred(); // что делает эта функция ?
      }

      // itemsStore.setSumDiv(0); // это удалить ?
    }, 300);
  },

  // функция выбора адреса клиента при клике на адрес во вкладке Адрес Клиента
  chooseAddrFull: (addr, key = -1) => {
    console.log('chooseAddrFull ==> ', addr);

    set({
      newAddrStreet: addr.street,
      newAddrHome: addr.home,
      pd: addr.pd,
      et: addr.et,
      kv: addr.kv,
      newAddrDom: parseInt(addr.fake_dom) == 0 ? false : true,
      newAddrInfo: addr,
      point_id: addr.point_id,
      chooseAddr: key,
      list_addr_for_choose: [],
      list_addr_choose: false,
    });

    // let allPrice = itemsStore.getAllPrice();

    // сумма доставки в зависимости от данных в адресе клиента ??

    // if(parseInt(addr.free_drive) == 1 || parseInt(itemsStore.free_drive) == 1){
    //     if( parseInt(allPrice) > 0 ){
    //         itemsStore.setSumDiv(0);
    //     }else{
    //         itemsStore.setSumDiv(1);
    //     }
    // }else{
    //     itemsStore.setSumDiv(parseInt(addr.sum_div));
    // }

    setTimeout(() => {
      get().saveDataOther(); // что делате эта функция?

      if (parseInt(get().typeTime) == 0) {
        get().loadTimeWait(); // функция устанавливает время ожидания заказа??
      } else {
        get().loadTimePred(); // что делает эта функция?
      }

      if (get().promo_name.length > 0) {
        get().checkPromo({ target: { value: get().promo_name } }); // проверка промика клиента?
      }
    }, 300);
  },

  // комментарий курьеру
  changeComment: (event) => {
    if (event.target.value.length > 100) {
      return;
    }

    set({ comment: event.target.value });

    get().saveData(); // что делает эта функция ?
  },

  // указание сдачи клиенту
  changeSdacha: (event) => {
    set({ sdacha: event.target.value });

    get().saveData(); // что делает эта функция ?
  },

  // изменить тип времени
  changeTypeTime: (event, newValue) => {
    
    console.log('changeTypeTime===>', newValue);
    
    set({ typeTime: newValue });
    
    if (parseInt(newValue) == 0) {
      get().loadTimeWait();
    } else {
      get().loadTimePred();
    }
    
    get().saveData();
  },

  // указание время предзаказ
  changeTime: (event) => {
    set({ time: event.target.value });

    get().saveData();
  },

  // указание даты предзаказ
  changeDate: (event) => {
    set({ date: event.target.value });

    get().saveData();

    get().loadTimePred();
  },

  // кнопка Оформить заказ
  startOrderNext: async () => {

    set({ loading: true });

    if (get().clickOrderStart == false || get().loading == true) {

      set({ clickOrderStart: true });

      // clearTimeout(this.startOrderIntervalTimer);

      // let cartData = itemsStore.getCartData();

      // if( cartData.orderAddr.street.length == 0 || cartData.orderAddr.home.length == 0 ){
      //   this.checkNewAddr(true);

      //   cartData = itemsStore.getCartData();
      // }

      let new_cart: { name: any; count: any; price: any; id: any }[] = [];
      let cartItems = get().mainItems;
      let AllPrice = get().AllPrice;

      cartItems.forEach((item: CatItem) => {
        if(item.count > 0){
          new_cart.push({
            name: item.name,
            count: item.count,
            price: item.all_price,
            id: item.id,
          })
        }
      })

      // if( parseInt( cartData.orderTimes ) !== 0 ){
      //   if( cartData.orderPredDay.length == 0 && cartData.orderPredTime.length == 0 ){
      //     this.setState({
      //       error: {
      //         title: 'Предупреждение',
      //         text: 'Не выбрано дата / время предзаказа'
      //       },
      //       errorOpen: true,
      //       spiner: false
      //     })

      //     this.clickOrderStart = false;

      //     this.setState({
      //       is_load: false
      //     })

      //     return;
      //   }
      // }

      // if( parseInt(cartData.orderType) == 0){

      //   if( this.state.check_home_true === false ){

      //this.checkNewAddr(true);

      //     this.setState({
      //       error: {
      //         title: 'Предупреждение',
      //         text: 'Адрес не найден, или не входит в зону доставки'
      //       },
      //       errorOpen: true,
      //       spiner: false
      //     })

      //     this.clickOrderStart = false;

      //     this.setState({
      //       is_load: false
      //     })

      //     return;
      //   }

      //   if( cartData.orderAddr.et.length == 0 ){
      //     this.setState({
      //       error: {
      //         title: 'Предупреждение',
      //         text: 'Не указан этаж'
      //       },
      //       errorOpen: true,
      //       spiner: false
      //     })

      //     this.clickOrderStart = false;

      //     this.setState({
      //       is_load: false
      //     })

      //     return;
      //   }
      //   if( cartData.orderAddr.pd.length == 0 ){
      //     this.setState({
      //       error: {
      //         title: 'Предупреждение',
      //         text: 'Не указан подъезд'
      //       },
      //       errorOpen: true,
      //       spiner: false
      //     })

      //     this.clickOrderStart = false;

      //     this.setState({
      //       is_load: false
      //     })

      //     return;
      //   }
      //   if( cartData.orderAddr.kv.length == 0 ){
      //     this.setState({
      //       error: {
      //         title: 'Предупреждение',
      //         text: 'Не указана квартира'
      //       },
      //       errorOpen: true,
      //       spiner: false
      //     })

      //     this.clickOrderStart = false;

      //     this.setState({
      //       is_load: false
      //     })

      //     return;
      //   }
      // }

      let promo_name = get().promo_name;

      const data = {
        type: 'createOrder',
        typeCreate: 'center',
        city_id: get().cityId,
        // user_id: itemsStore.getToken(),

        // timePred: JSON.stringify( { value: parseInt( cartData.orderTimes ) == 0 ? 0 : cartData.orderPredDay + ' ' + cartData.orderPredTime } ),
        // typeOrder: cartData.orderType,
        // addrPic: cartData.orderPic,
        // comment: cartData.orderComment,
        // sdacha: cartData.orderSdacha,
        // addrDev: cartData.orderAddr ? JSON.stringify(cartData.orderAddr) : '',
        payFull: JSON.stringify({ type: 'cash' }),
        cart: JSON.stringify(new_cart),
        promo_name: promo_name,
        // number: itemsStore.clientNumber
      };

      const json = await api(data);

      setTimeout(() => {
        get().clickOrderStart = false;
      }, 500);

      if (json.st) {
        let new_cart: { type: string }[] = [];

        json.my_cart.map((item: { type: string }) => {
          if (parseInt(item.type) != 3 && parseInt(item.type) != 4) {
            new_cart.push(item);
          }
        });

        json.my_cart.map((item: { type: string }) => {
          if (parseInt(item.type) == 3 || parseInt(item.type) == 4) {
            new_cart.push(item);
          }
        });

        set({
          newOrder: {
            cart: new_cart,
            order_id: json.order_id,
            point_id: json.point_id,
            point_name: json.point_name,
            time_wait: json.time_wait_order,
            // typeOrder: parseInt(cartData.orderType) == 0 ? 'Доставка' : 'Самовывоз',
            // number: itemsStore.clientNumber,
            // comment: parseInt(cartData.orderType) == 0 ? cartData.orderComment : '',
            // sdacha: parseInt(cartData.orderType) == 0 ? cartData.orderSdacha : '',
            // timePred: parseInt( cartData.orderTimes ) == 0 ? '' : cartData.orderPredDay + ' ' + cartData.orderPredTime,
            // addr: parseInt(cartData.orderType) == 0 ? cartData.orderAddr : {},
            promoName: localStorage.getItem('promo_name'),
            dop_text: json.dop_text,
          },
        });

        setTimeout(() => {
          set({
            orderCheck: true,
          });
        }, 500);

        get().startOrderIntervalTimer = setTimeout(() => {
          set({
            orderCheck: false,
            newOrderData: null,
          });
        }, get().startOrderInterval * 1000);
      } else {
        if (json.type && json.type == 'new_pred') {
          set({
            timePred: json.times,
          });
        }

        // изменить на snackbar
        // set({
        //   error: {
        //     title: 'Предупреждение',
        //     text: json.text_err
        //   },
        //   errorOpen: true
        // })
      }
    }
  },

  //создание Нового заказа - добавление в корзину Товара из строчки поиска Товара
  addItemCustom: (event, value) => {
    const additem: any = get().allItems.find(
      (item: AllItem) => item.name === value
    );

    get().addToCart(additem.id);

    set({
      thisItem: value,
    });

    setTimeout(() => {
      set({
        thisItem: null,
      });
    }, 100);
  },

  //создание Нового заказа - добавление в корзину Товара
  addToCart: (item_id) => {
    let check = false;
    let mainItems = get().mainItems;
    const allItems = get().allItems;

    mainItems = mainItems.map((item: CatItem) => {
      if (item.id === item_id) {
        item.count++;
        item.all_price = Number(item.count) * Number(item.price);
        check = true;
        return item;
      }
      return item;
    });

    if (!check) {
      const item = allItems.find((item) => item.id === item_id);
      if (item) {
        item.count = 1;
        item.all_price = item.price;
        mainItems = [...mainItems, ...[item]];
      }
    }

    const AllPrice = mainItems.reduce((all: any, it: { all_price: any; }) => all + Number(it.all_price), 0); // без суммы доставки

    set({ mainItems, AllPrice });
  },

  //создание Нового заказа - удаление из корзины Товара
  minusToCart: (item_id) => {
    let mainItems = get().mainItems;

    mainItems = mainItems.reduce((newItems: CatItem[], item: CatItem) => {
      if (item.id === item_id) {
        item.count--;
        item.all_price = Number(item.all_price) - Number(item.price);
      }
      return item.count ? (newItems = [...newItems, ...[item]]) : newItems;
    }, []);

    const AllPrice = mainItems.reduce((all: any, it: { all_price: any; }) => all + Number(it.all_price), 0); // без суммы доставки

    set({ mainItems, AllPrice });
  },

  // создание Нового заказа - удаление полностью из корзины Товара
  delToCart: (item_id) => {
    let mainItems = get().mainItems;

    mainItems = mainItems.filter((item: CatItem) => item.id !== item_id);

    const AllPrice = mainItems.reduce((all: any, it: { all_price: any; }) => all + Number(it.all_price), 0); // без суммы доставки

    set({ mainItems, AllPrice });
  },

  // создание Нового заказа - указать в инпуте необходимое количество Товара
  changeCount: (event, item_id) => {
    let mainItems = get().mainItems;
    const count = event.target.value;

    mainItems = mainItems.map((item: CatItem) => {
      if (item.id === item_id) {
        item.count = count ? count : item.count;
        item.all_price = Number(item.count) * Number(item.price);
        return item;
      }
      return item;
    });

    const AllPrice = mainItems.reduce((all: any, it: { all_price: any; }) => all + Number(it.all_price), 0); // без суммы доставки

    set({ mainItems, AllPrice });
  },

  // изменить категорию товара во всех позициях
  changeCat: (event, newValue) => {
    set({
      activeCat: newValue,
    });
  },

  // выбор адреса клиента в каком модальном окне ??
  chooseAddrFunction: (addr) => {

    console.log('chooseAddrFunction ===>', addr)
    set({
      newAddrInfo: addr,
      point_id: addr.point_id,

      list_addr_for_choose: [],
      list_addr_choose: false,
    });

    // расчет суммы доставки ??
    // let allPrice = itemsStore.getAllPrice();

    // if( parseInt(addr.free_drive) == 1 || parseInt(itemsStore.free_drive) == 1 ){
    //     if( parseInt(allPrice) > 0 ){
    //         itemsStore.setSumDiv(0);
    //     }else{
    //         itemsStore.setSumDiv(1);
    //     }
    // }else{
    //     itemsStore.setSumDiv(parseInt(addr.sum_div));
    // }

    setTimeout(() => {
      get().saveDataOther();

      if (parseInt(get().typeTime) == 0) {
        get().loadTimeWait();
      } else {
        get().loadTimePred();
      }

      if (get().promo_name.length > 0) {
        get().checkPromo({ target: { value: get().promo_name } });
      }
    }, 300);
  },

  // очистить все данные при нажатии на крестик и кнопки Очистить
  clear: () => {
    // itemsStore.clientNumber = '';
    // localStorage.removeItem('clientNumber')
    // localStorage.removeItem('promo_name')

    // itemsStore.setItems([]);
    // itemsStore.setItemsPromo([]);

    const data = {
      orderType: '0',
      orderAddr: '',
      orderPic: 0,
      orderComment: '',

      orderTimes: 0,
      orderPredDay: '',
      orderPredTime: '',

      orderPay: '',
      orderSdacha: '',

      dateTime: new Date(),

      date: '', //дата предзаказа
      time: '', //дата предзаказа
      typeTime: 0, //0 - быстрее / 1 - пред
    };

    // itemsStore.dateTimeDel = new Date();

    // itemsStore.saveCartData(data);

    // setTimeout( () => {
    //   itemsStore.setPromo(null, '');
    // }, 300)

    set({
      number: '',
      promo_name: '',
      orderPromoText: '',
      newAddrStreet: '',
      newAddrHome: '',
      pd: '',
      et: '',
      kv: '',
      newAddrDom: true,

      newAddrInfo: '',
      chooseAddr: -1,

      orderPic: 0,
      picPointInfo: null,
      point_id: 0,

      comment: '',
      sdacha: '',

      // clientNumber: '',

      checkClear: false,

      clientAddr: [],
      typeTime: 0,

      date: '',
      time: '',

      mainItems: [],
      AllPrice: '0',
    });

    // itemsStore.setSumDiv(0);
    // itemsStore.setAllPrice(0);

    setTimeout(() => {
      get().changeTypeTime(null, 0);
    }, 300);
  },

  // подтверждения заказ в модалке после прохождения проверки
  async trueOrder() {
    let data = {
      type: 'trueOrder',
      city_id: get().cityId,
      order_id: get().newOrder.order_id,
      point_id: get().newOrder.point_id,
    };

    const json = await api(data);

    if (json['st'] == false) {
      set({
        error: {
          title: 'При подтверждении оплаты произошла ошибка',
          text: json.text_err,
        },
        errorOpen: true,
      });
    } else {
      set({
        error: {
          title: 'Подтверждение заказа',
          text: 'Заказ успешно оформлен',
        },
        errorOpen: true,
        orderCheck: false,
        newOrderData: null,
      });

      get().clear();

      // clearTimeout(this.startOrderIntervalTimer);
    }
  },

  // проверка авторизации
  async checkLogin() {
    const data = {
      type: 'check_login_center',
      // token: itemsStore.getToken()
    };

    const res = await api(data);

    if (res) {
    } else {
      // localStorage.removeItem('token');
      // clearInterval(this.interval);
      setTimeout(() => {
        window.location.href = '/auth';
      }, 500);
    }
  },

  // закрытие snackbar
  closeAlert: () => {
    if (document.activeElement === document.body) {
      return;
    }

    set({ openAlert: false });
  },




  // что делает эта функция ?
  saveData: () => {
    // let cartData = itemsStore.getCartData();
    // setTimeout(()=>{
    //   let data = {
    //     orderType: parseInt(this.state.activeTab) == 0 || parseInt(this.state.activeTab) == 1 ? parseInt(this.state.activeTab) : 0,
    //     orderAddr: cartData && cartData.orderAddr ? cartData.orderAddr : '',
    //     orderPic: this.state.orderPic,
    //     orderComment: this.state.comment,
    //     orderTimes: this.state.typeTime,
    //     orderPredDay: this.state.date,
    //     orderPredTime: this.state.time,
    //     orderPay: cartData && cartData.orderPay ? cartData.orderPay : '0',
    //     orderSdacha: this.state.sdacha,
    //   };
    //   itemsStore.saveCartData(data);
    // }, 100)
  },

  // устанавливает время ожидания заказа 7
  loadTimeWait: async () => {
    // let items = JSON.stringify( itemsStore.getItems() );

    /*if( items == this.loadTimeCheck ){
        return ;
      }
  
      this.loadTimeCheck = items;*/

    // let cartData = itemsStore.getCartData();

    const data = {
      types: 'load_time_wait_test',
      // point_id: cartData.orderType+1 == 1 ? cartData.orderAddr.point_id ?? 0 : cartData.orderPic ?? 0,
      // type_order: cartData.orderType,
      city_id: get().cityId,

      // cart: JSON.stringify( itemsStore.getItems() ),
      // cartPromo: JSON.stringify( itemsStore.getItemsPromo() )
    };

    const res = await api(data);

    console.log('loadTimeWait ===>', res);

    set({
      textAvgTime: res?.text ?? 'Среднее время: ~', // временно пока не работает функция loadTimeWait();
    });
  },

  // что делает эта функция ?
  loadTimePred: async () => {
    // let my_cart = [];
    // let cartItems = itemsStore.getItems();
    // let cartData = itemsStore.getCartData();

    // cartItems.forEach(el => {
    //     my_cart.push({
    //         item_id: el.item_id,
    //         count: el.count,
    //     });
    // });

    const data = {
      type: 'get_times_pred_center',
      // point_id: cartData.orderType+1 == 1 ? cartData.orderAddr.point_id ?? 0 : cartData.orderPic ?? 0,
      // type_order: cartData.orderType+1,
      date: get().date,
      // cart: JSON.stringify( my_cart ),
    };

    const res = await api(data);

    if (!res.st) {
      /*this.setState({
            error: {
                title: 'Предупреждение', 
                text: json.text
            },
            errorOpen: true
        })*/
    } else {
      set({
        timePred: res.data,
      });
    }
  },

  // что делает эта функция ?
  saveDataOther: () => {
    // let cartData = itemsStore.getCartData();
    // let addrInfo = this.state.newAddrInfo ? this.state.newAddrInfo : cartData.orderAddr;
    // setTimeout(()=>{
    //     let data = {
    //         orderType: parseInt(this.state.activeTab) == 0 || parseInt(this.state.activeTab) == 1 ? parseInt(this.state.activeTab) : 0,
    //         orderAddr: {
    //           id: -1,
    //           //city_name: itemsStore.getCityRU(),
    //           street: this.state.newAddrInfo && addrInfo.street ? addrInfo.street : '',
    //           home: addrInfo.home ? addrInfo.home : '',
    //           kv: this.state.kv,
    //           pd: this.state.pd,
    //           et: this.state.et,
    //           dom_true: this.state.newAddrDom ? 1 : 0,
    //           free_drive: addrInfo.free_drive ? addrInfo.free_drive : 0,
    //           sum_div: addrInfo.sum_div ? addrInfo.sum_div : 0,
    //           point_id: addrInfo.point_id ? addrInfo.point_id : 0,
    //           xy: addrInfo.xy ? addrInfo.xy : '',
    //           pay_active: addrInfo.pay_active ? addrInfo.pay_active : 0,
    //         },
    //       orderPic: this.state.orderPic,
    //       orderComment: this.state.comment,
    //       orderTimes: this.state.typeTime,
    //       orderPredDay: this.state.date,
    //       orderPredTime: this.state.time,
    //       orderPay: cartData && cartData.orderPay ? cartData.orderPay : '0',
    //       orderSdacha: this.state.sdacha,
    //     };
    //     itemsStore.saveCartData(data);
    // }, 100)
  },

  // что делает эта функция ?
  loadSavedData: () => {
    // let cartData = itemsStore.getCartData();
    // if( cartData && cartData.orderType && parseInt(cartData.orderType) == 1 ){
    //   let my_point = this.state.pic_point.find( (item) => item.id == parseInt(cartData.orderPic) );
    //   if( my_point ){
    //     this.choosePic(my_point, false);
    //   }
    // }
    // if( cartData && parseInt(cartData.orderType) == 0 ){
    //   this.setState({
    //     newAddrInfo: cartData.orderAddr ? cartData.orderAddr : null,
    //     point_id: cartData.orderAddr ? cartData.orderAddr.point_id : 0,
    //     newAddrStreet: cartData.orderAddr && cartData.orderAddr.street,
    //     newAddrHome: cartData.orderAddr && cartData.orderAddr.home ? cartData.orderAddr.home : '',
    //     pd: cartData.orderAddr && cartData.orderAddr.pd ? cartData.orderAddr.pd : '',
    //     et: cartData.orderAddr && cartData.orderAddr.et ? cartData.orderAddr.et : '',
    //     kv: cartData.orderAddr && cartData.orderAddr.kv ? cartData.orderAddr.kv : '',
    //     newAddrDom: cartData.orderAddr && parseInt(cartData.orderAddr.dom_true) == 0 ? false : true,
    //     activeTab: 0
    //   })
    //   let allPrice = itemsStore.getAllPrice();
    //   if( parseInt(cartData.orderAddr ? cartData.orderAddr.free_drive : 0) == 1 || parseInt(itemsStore.free_drive) == 1 ){
    //     if( parseInt(allPrice) > 0 ){
    //         itemsStore.setSumDiv(0);
    //     }else{
    //       itemsStore.setSumDiv(1);
    //     }
    //   }else{
    //     itemsStore.setSumDiv(parseInt(cartData.orderAddr ? cartData.orderAddr.sum_div : 0));
    //   }
    // }
    // if( cartData && cartData.orderComment != this.state.comment ){
    //   this.setState({
    //     comment: cartData.orderComment
    //   })
    // }
    // if( cartData && cartData.orderSdacha && parseInt(cartData.orderSdacha) != parseInt(this.state.sdacha) ){
    //   this.setState({
    //     sdacha: cartData.orderSdacha
    //   })
    // }
    // if( localStorage.getItem('clientNumber') ){
    //   let defValue = localStorage.getItem('clientNumber');
    //   itemsStore.clientNumber = defValue;
    //   this.setState({
    //     number: defValue,
    //   })
    //   setTimeout( () => {
    //     this.getAddr();
    //   }, 300 )
    // }
    // if( localStorage.getItem('promo_name') ){
    //   let promo = localStorage.getItem('promo_name');
    //   setTimeout( ()=>{
    //     this.setState({
    //       promo_name: promo
    //     })
    //     this.checkPromo( {target: {value: promo}} )
    //   }, 500 )
    // }
    // if( parseInt(this.state.typeTime) != parseInt(cartData.orderTimes) ){
    //   this.setState({
    //     typeTime: cartData.orderTimes
    //   })
    //   this.setState({
    //     time: cartData.orderPredTime,
    //     date: cartData.orderPredDay,
    //     typeTime: cartData.orderTimes,
    //   })
    //   if( cartData.orderType == 0 ){
    //     if( parseInt(cartData.orderTimes) == 1 ){
    //       this.loadTimePred();
    //     }else{
    //       this.loadTimeWait();
    //     }
    //   }
    //   if( parseInt(cartData.orderTimes) == 1 ){
    //     this.loadTimePred();
    //   }else{
    //     this.loadTimeWait();
    //   }
    // }
  },


  // эта функция необходима ?

  // changeDataTime: (event) => {

  //   set({ typeTime: event.target.value });

    // if( type == 'date' ){
    //   setTimeout(() => {
    //     this.loadTimePred();
    //   }, 300)
    // }

  //   get().saveData();
  // }
}));
