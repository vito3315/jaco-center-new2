export interface Promos {
  date: Date | string;
  promo: string;
  name: string;
  count: number;
}

export interface City {
  id: string;
  name: string;
  link: string;
}

export interface Cat {
  id: string;
  name: string;
  main_id: string;
  link: string;
  count: string;
  items: CatItem[];
}

export interface CatItem {
  id: string;
  name: string;
  tmp_desc: string;
  size_pizza: string;
  count_part: string;
  weight: string;
  price: string;
  type: string;
  cat_id: string;
  items: CatItem2[];
  info_weight: string;
  info_weight_dop: string;
}

export interface CatItem2 {
  id: string;
  name: string;
  tmp_desc: string;
  size_pizza: string;
  count_part: string;
  weight: string;
  price: string;
  type: string;
  cat_id: string;
  info_weight: string;
  info_weight_dop: string;
}

export interface AllItem {
  id: string;
  name: string;
  tmp_desc: string;
  size_pizza: string;
  count_part: string;
  weight: string;
  price: string;
  type: string;
  cat_id: string;
  items: AllItem1[];
  info_weight: string;
  info_weight_dop: string;
}

export interface AllItem1 {
  id: string;
  name: string;
  tmp_desc: string;
  size_pizza: string;
  count_part: string;
  weight: string;
  price: string;
  type: string;
  cat_id: string;
}

export interface PicPoint {
  id: string;
  addr: string;
  raion: string;
  xy_point: string;
}

export interface Addr {
  id: string;
  name: string;
}

export interface DatePred {
  date: string;
  text: string;
  id: string;
  name: string;
}

export interface AddrChoose {
  addressLine: string;
  area: string;
  district: string;
  city_name: string;
  city_name_dop: string;
  street: string;
  home: any;
  postal_code: string;
  zone_id: string;
  free_drive: string;
  sum_div: string;
  point_id: string;
  xy: string;
}

export interface PicPointInfo {
  id: string;
  addr: string;
  raion: string;
  xy_point: string;
}

export interface homeState {
  MyPromos: Promos[];
  loading: boolean;
  cityId: string;
  promo_name: string | string[] | (string | string[])[] | null;
  orderPromoText: string;
  promoST: boolean;
  checkClear: boolean;
  clickOrderStart: boolean;
  check_home_true: boolean;
  newAddrDom: boolean;
  orderCheck: boolean;
  errorOpen: boolean;
  error: {
    title: string;
    text: string;
  };
  newAddrHome: string;
  number: string | number;
  cityList: City[];
  cats: Cat[];
  allItems: AllItem[];
  clientAddr: []; // ??
  pic_point: PicPoint[];
  all_addr: Addr[];
  date_pred: DatePred[];
  list_addr_for_choose: AddrChoose[];
  timePred: []; // ??
  list_addr_choose: boolean;
  activeTab: number | string;
  typeTime: number | string;
  date: string;
  time: string;
  point_id: number | string;
  orderPic: number | string;
  newAddrInfo: string | null;
  picPointInfo: PicPointInfo | null;
  chooseAddr: number | null;
  sumDiv: number | string;
  AllPrice: number | string;
  activeCat: number | string;
  newAddrStreet: string | string[] | (string | string[])[] | null;
  pd: string;
  et: string;
  kv: string;
  comment: string;
  sdacha: string;
  textAvgTime: string;
  openAlert: boolean;
  status: boolean;
  text: string;
  getDataForm: () => void;
  getAddr: () => void;
  saveData: () => void;
  loadTimeWait: () => void;
  loadTimePred: () => void;
  loadSavedData: () => void;
  saveDataOther: () => void;
  startOrderNext: () => void;
  checkNewAddr: (is_check: boolean) => void;
  changeCity: (event: { target: { value: string } }) => void;
  changeComment: (event: { target: { value: string } }) => void;
  changeSdacha: (event: { target: { value: string } }) => void;
  changeTime: (event: { target: { value: string } }) => void;
  changeDate: (event: { target: { value: string } }) => void;
  checkPromo: (event: {
    target: { value: string | string[] | (string | string[])[] | null };
  }) => void;
  saveNumber: (event: { target: { value: string } }) => void;
  changeNumber: (event: { target: { value: string } }) => void;
  changeAddrHome: (event: { target: { value: string } }) => void;
  changeTab: (event: any, newValue: string) => void;
  changeAddrCustom: (
    event: any,
    value: string | string[] | (string | string[])[] | null
  ) => void;
  changeAddrPd: (event: { target: { value: string } }) => void;
  changeAddrEt: (event: { target: { value: string } }) => void;
  changeAddrKv: (event: { target: { value: string } }) => void;
  changeDomTrue: (type: boolean) => void;
  choosePic: (point: PicPointInfo, is_save: boolean) => void;
  chooseAddrFull: (addr: any, key: number) => void; // ??
  changeTypeTime: (
    event: { target: { value: string } } | null,
    newValue?: number | string
  ) => void;
  newOrder: any; // ??
  newOrderData: any; // ??
  thisItem: string | null;
  addItemCustom: (
    event: any,
    value: string | string[] | (string | string[])[] | null
  ) => void;
  addToCart: (item_id: number | string) => void;
  changeCat: (event: any, value: number | string) => void;
  chooseAddrFunction: (addr: string | null) => void;
  clear: () => void;
  trueOrder: () => void;
  checkLogin: () => void;
  closeAlert: () => void;
}
