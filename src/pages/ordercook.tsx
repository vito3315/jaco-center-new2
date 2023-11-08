import { useEffect } from 'react';

import dynamic from 'next/dynamic';

import { useAuth } from '@/modules/auth/store';
import { authState } from '@/modules/auth/types';
import { useOrderCook } from '@/modules/ordercook/store';
import { ordercookState } from '@/modules/ordercook/types';

const OrderCookPage = dynamic(() => import('@/modules/ordercook/page'));

export default function OrderCook() {
  //console.log('render OrderCook');

  const getDataForm = useOrderCook((state: ordercookState) => state.getDataForm);
  const checkLogin = useAuth((state: authState) => state.checkLogin);

  useEffect(() => {
    if ((window.location.protocol == 'http:' || window.location.protocol == 'http') && window.location.hostname != 'localhost') {
      window.location.href = 'https://jacocallcenter.ru' + window.location.pathname;
    }

    checkLogin();

    getDataForm(1);
  }, [checkLogin, getDataForm]);

  return <OrderCookPage />;
}
