import { useEffect } from 'react';

import dynamic from 'next/dynamic';

import { useOrders } from '@/modules/orders/store';
import { ordersState } from '@/modules/orders/types';
import { useAuth } from '@/modules/auth/store';
import { authState } from '@/modules/auth/types';

const OrdersPage = dynamic(() => import('@/modules/orders/page'));

export default function Orders() {
  //console.log('render OrdersPage');

  const getDataForm = useOrders((state: ordersState) => state.getDataForm);
  const checkLogin = useAuth((state: authState) => state.checkLogin);

  useEffect(() => {
    if ((window.location.protocol == 'http:' || window.location.protocol == 'http') && window.location.hostname != 'localhost') {
      window.location.href = 'https://jacocallcenter.ru' + window.location.pathname;
    }

    checkLogin();

    getDataForm();
  }, [getDataForm, checkLogin]);

  return <OrdersPage />;
}
