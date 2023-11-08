export interface Order {
  point_id: string;
  id: string;
  client_id: string;
  user_id: string;
  date_time_order: string;
  date_time_preorder: string;
  date_time_preorder_or: string;
  give_data_time: string;
  date_time_delete?: any;
  close_order: string;
  unix_time: string;
  is_preorder: string;
  street: string;
  home: string;
  order_price: string;
  is_delete: string;
  type_order: string;
  type_origin: string;
  unix_time_to_client: string;
  type_pay: string;
  status: string;
  status_order: string;
  number: string;
  driver?: any;
  login?: any;
  dist: string;
  type_user: string;
  time: string;
  need_time: string;
  to_time_sec: number;
  to_time: string;
}

export interface City {
  id: string;
  name: string;
}

export interface Point {
  id: string;
  name: string;
  city_id: string;
}

export interface DateTimePred {
  date: string;
  time: string;
}

export interface showOrder {
  order_id: string;
  number: string;
  sum_order: string;
  sum_div: string;
  type_order_: string;
  status_order: string;
  point_id: string;
  is_delete: string;
  date_time_delete?: any;
  sdacha: string;
  textTime: string;
  time: string;
  street: string;
  home: string;
  pd: string;
  kv: string;
  et: string;
  fake_dom: string;
  comment: string;
  type_order: string;
  type_order_addr: string;
  type_order_addr_new: string;
  time_order: string;
  time_order_name: string;
  is_preorder: string;
  promo_name?: any;
  promo_text?: any;
  unix_time_to_client: string;
  del_name?: any;
  del_type: string;
  delete_reason: string;
  date_time_preorder_or: string;
  date_time_pred: DateTimePred;
  this_status_order: string;
  time_to_client: number;
  text_time: string;
  check_pos: any;
  check_pos_drive?: any;
}

export interface OrderItem {
  id: string;
  name: string;
  item_id: string;
  count: string;
  price: string;
}

export interface OrderItem2 {
  name: string;
  count: string;
  ready: string;
  isready: string;
  noready: string;
}

export interface Summ {
  min?: any;
  max?: any;
}

export interface Dows {
  1?: any;
  2?: any;
  3?: any;
  4?: any;
  5?: any;
  6?: any;
  7?: any;
}

export interface DateTime {
  min?: any;
  max?: any;
}

export interface Time {
  min?: any;
  max?: any;
}

export interface Limits {
  type_order?: any;
  type_order_info: string;
  only_site?: any;
  only_kassa?: any;
  only_site_kassa_info: string;
  summ: Summ;
  free_drive?: any;
  items: any[];
  point_id?: any;
  dows: Dows;
  dows_info: string;
  date: DateTime;
  time: Time;
}

export interface PromoText {
  true?: any;
  false: string;
}

export interface PromoInfo {
  promo_action?: any;
  limits: Limits;
  items_on_price: any[];
  sale: any[];
  promo_text: PromoText;
  items_add: any[];
  status_promo: boolean;
}

export interface Name {
  id: string;
  street: string;
  home: string;
  point_id: string;
  xy: string;
  kv: string;
  pd: string;
  et: string;
  dom_true: string;
  fake_dom: string;
  city_name: string;
  sum_div: string;
  free_drive: string;
}

export interface Street {
  id: string;
  name: Name;
}

export interface orderRootObject {
  order: showOrder;
  order_items: OrderItem[];
  order_items_: OrderItem2[];
  promo_info: PromoInfo;
  street: Street;
}

export interface ordersState {
  loading: boolean;
  cities: City[];
  points: Point[];
  pointsCopy: Point[];
  allItems: Array<{ id: string; name: string; price: string }>;
  number: string;
  address: string;
  date: any;
  orders: Order[];
  ordersCopy: Order[];
  order: Order | null;
  pointId: number | string;
  cityId: string;
  indexTab: number;
  showOrder: orderRootObject;
  openOrder: boolean;
  openClose: boolean;
  openAlert: boolean;
  status: boolean;
  text: string;
  getDataForm: () => void;
  getOrders: (obj: {date: Date | string, point_id: number | string} ) => void;
  changeCity: (event: { target: { value: string } }) => void;
  changeAddress: (event: { target: { value: string } }) => void;
  changeNumber: (event: { target: { value: string } }) => void;
  changeDate: (value: string | Date | null) => void;
  setData: (point_id?: number | string, index?: number) => void;
  filterPoints: (city_id: string) => void;
  filterOrders: () => void;
  getOrder: (order_id: string | number) => void;
  closeOrder: (obj: {typeCreate: string, order_id: string, point_id: string, ans: string}) => void;
  repeatOrder: () => void;
  fakeUser: () => void;
}
