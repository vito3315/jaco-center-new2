import { useEffect } from 'react';

import dynamic from 'next/dynamic';

const AuthPage = dynamic(() => import('@/modules/auth/page'));

export default function Auth() {
  //console.log('render Auth');

  useEffect(() => {
    if ((window.location.protocol == 'http:' || window.location.protocol == 'http') && window.location.hostname != 'localhost') {
      window.location.href = 'https://jacocallcenter.ru' + window.location.pathname;
    }
  }, []);

  return <AuthPage />;
}
