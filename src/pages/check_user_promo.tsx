import { useEffect } from 'react';

import dynamic from 'next/dynamic';

import { usePromo } from '@/modules/check_user_promo/store';
import { useAuth } from '@/modules/auth/store';
import { authState } from '@/modules/auth/types';

const CheckUserPromoPage = dynamic(() => import('@/modules/check_user_promo/page'));

export default function CheckUserPromo() {
  //console.log('render CheckUserPromo');

  const checkLogin = useAuth((state: authState) => state.checkLogin);

  useEffect(() => {
    if ((window.location.protocol == 'http:' || window.location.protocol == 'http') && window.location.hostname != 'localhost') {
      window.location.href = 'https://jacocallcenter.ru' + window.location.pathname;
    }

    usePromo.setState({ promos: [], promos_sms: [], number: '' });

    checkLogin();
  }, [checkLogin]);

  return <CheckUserPromoPage />;
}
