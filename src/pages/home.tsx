import { useEffect } from 'react';

import dynamic from 'next/dynamic';

import { useAuth } from '@/modules/auth/store';
import { authState } from '@/modules/auth/types';
import { useHome } from '@/modules/home/store';
import { homeState } from '@/modules/home/types';

const HomePage = dynamic(() => import('@/modules/home/page'));

export default function Home() {
  //console.log('render Home');

  const [getDataForm, setCityID] = useHome((state: homeState) => [state.getDataForm, state.setCityID]);
  const checkLogin = useAuth((state: authState) => state.checkLogin);

  useEffect(() => {
    if ((window.location.protocol == 'http:' || window.location.protocol == 'http') && window.location.hostname != 'localhost') {
      window.location.href = 'https://jacocallcenter.ru' + window.location.pathname;
    }

    const cityID = localStorage.getItem('cityID');

    if (cityID) {
      setCityID(cityID);
    } else {
      localStorage.setItem('cityID', '1');
    }

    checkLogin();

    getDataForm();
  }, [getDataForm, setCityID, checkLogin]);

  return <HomePage />;
}
