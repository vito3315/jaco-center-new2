import { create } from 'zustand';

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

export interface ordersState {
  loading: boolean,
  error: null | Error;
  cities: City[];
  points: Point[];
  allItems: Array<{ id: string, name: string, price: string }> | [];
  orders: Order[];
  number: string;
  address: string;
}

export const useOrders = create<ordersState>((set) => ({
  number: '',
  address: '',
  loading: false,
  error: null,
  cities: [],
  points: [],
  allItems: [],
  orders: [],
}));
