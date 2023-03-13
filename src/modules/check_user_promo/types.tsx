export interface Promo_lk {
  user_name: string;
  promo_name: string;
  date_bir: string;
  login: string;
  coment: string;
}

export interface Promo_sms {
  id: string;
  date_time: string;
  phone: string;
  text: string;
  type: string;
}

export interface promoState {
  loading: boolean;
  number: string;
  promos_sms: Promo_sms[],
  promos: Promo_lk[],
  changeNumber: (event: { target: { value: string } }) => void;
  getPromoList: () => void;
}
