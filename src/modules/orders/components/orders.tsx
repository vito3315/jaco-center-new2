import { useEffect } from 'react';
import { useOrders } from '../store';
import { HeadOrders } from './headOrders';
import { api } from '../../../api';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

async function getDataHeaders() {

  useOrders.setState({ 
    loading: true 
  });

  try {

    const data = new FormData();
    data.append('type','get_center_all');

    const result: any = await api.post('', { body: data, cache: "no-store" }).json();

    if (result.st === false && result.type == 'redir') {
      window.location.pathname = '/';
      return;
    }

    if (result.st === false && result.type == 'auth') {
      window.location.pathname = '/auth';
      return;
    }

    console.log(result);

    setTimeout( () => {
      useOrders.setState({ cities: result.cities,
        points: result.points,
        allItems: result.all_items,
        error: null,
        loading: false 
      });
    }, 300 )

   
  } catch (error: any) {
    useOrders.setState({ error: error.message });
  }

  console.log("fetching Products");
}

export const Orders = () => {
  // if((window.location.protocol == 'http:' || window.location.protocol == 'http') && window.location.hostname != 'localhost'){
  //   window.location.href = 'https://jacocallcenter.ru'+window.location.pathname;
  // }

  const loading = useOrders((state: any) => state.loading);

  console.log('render Orders');

  // console.log(loading);

  useEffect(() => {
    getDataHeaders();
    document.title = 'Оформленные заказы';
  }, []);

  return (
    <>
      <Backdrop open={loading} style={{ zIndex: 99, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <HeadOrders />
    </>
  );
};
