import { useEffect } from 'react';

import dynamic from 'next/dynamic';

import { useMap } from '@/modules/map/store';
import { mapState } from '@/modules/map/types';
const MapPage = dynamic(() => import('@/modules/map/page'));

export default function Map() {
  //console.log('render Map');

  const [getDataForm] = useMap((state: mapState) => [state.getDataForm]);

  useEffect(() => {
    if ((window.location.protocol == 'http:' || window.location.protocol == 'http') && window.location.hostname != 'localhost') {
      window.location.href = 'https://jacocallcenter.ru' + window.location.pathname;
    }

    getDataForm();
  }, [getDataForm]);

  return <MapPage />;
}
