export interface Onstol {
  id: string;
  status_order: string;
  stol_sborki: string;
  date_time_preorder: string;
  unix_date_time_preorder: string;
  preorder: string;
  date: string;
  date_time_order: string;
  unix_date_time_order: string;
  unix_start_stol: string;
  unix_start_stol_or: string;
  give_data_time_unix?: any;
  give_data_time: string;
  unix_remove_stol: string;
  type_: string;
  type_order: string;
  status: string;
  full_time: string;
  is_delete: string;
  unix_date_time_delete?: any;
  unix_time_to_client: string;
  close_date_time_order?: any;
  date_time_preorder_: string;
  time_: number;
  give_data_time_: string;
  test_time: number;
  time_test: string[];
  color: string;
}

export interface Ready {
  id: string;
  status_order: string;
  stol_sborki: string;
  date_time_preorder: string;
  unix_date_time_preorder: string;
  preorder: string;
  date: string;
  date_time_order: string;
  unix_date_time_order: string;
  unix_start_stol: string;
  unix_start_stol_or: string;
  give_data_time_unix: string;
  give_data_time: string;
  unix_remove_stol: string;
  type_: string;
  type_order: string;
  status: string;
  full_time: string;
  is_delete: string;
  unix_date_time_delete?: any;
  unix_time_to_client: string;
  close_date_time_order?: any;
  date_time_preorder_: string;
  time_: number;
  give_data_time_: string;
  test_time: number;
  color: string;
  time_test: string[];
}

export interface Read {
  id: string;
  status_order: string;
  stol_sborki: string;
  date_time_preorder: string;
  unix_date_time_preorder: string;
  preorder: string;
  date: string;
  date_time_order: string;
  unix_date_time_order: string;
  unix_start_stol: string;
  unix_start_stol_or: string;
  give_data_time_unix: string;
  give_data_time: string;
  unix_remove_stol: string;
  type_: string;
  type_order: string;
  status: string;
  full_time: string;
  is_delete: string;
  unix_date_time_delete?: any;
  unix_time_to_client: string;
  close_date_time_order: string;
  date_time_preorder_: string;
  time_: number;
  give_data_time_: string;
  test_time: number;
  time_test: string[];
  color: string;
}

export interface Test {
  h: number;
  time_sec: number;
  time_min: number;
  users: number;
  users_time: number;
}

export interface PrestolNew {
  id: string;
  is_preorder: string;
  time_start_order: string;
  time_end_order: string;
  preorder: string;
  unix_time_to_client: string;
  date_time_order: string;
  date_time_preorder: string;
  type_order: string;
  status: string;
  close_date_time_order?: any;
  time_?: number;
  test_time?: number;
  give_data_time_?: string;
}

export interface Orders {
  onstol: Onstol[];
  prestol: any[];
  ready: Ready[];
  read: Read[];
  orders: any[];
  ther: any[];
  test: Test[];
  tmp?: any;
  prestol_new: PrestolNew[];
}

export interface Point {
  id: string;
  name: string;
  base: string;
}

export interface ordercookState {
  loading: boolean;
  points: Point[];
  point: string;
  orders: Orders | null;
  changePoint: (event: { target: { value: string } }) => void;
  getDataForm: (city_id: string | number) => void;
  getCookOrders: () => void;
}
