'use client';

import { useEffect } from 'react';
import Loading from './loading';
import { Form } from './form';
import { useOrders } from './store';

export default function OrdersPage() {

  console.log('render PageOrders');

  const getDataForm = useOrders((state: any) => state.getDataForm);

  useEffect(() => {
    getDataForm('get_center_all');
    document.title = 'Оформленные заказы';
  }, [getDataForm]);

  return (
    <>
      <Loading />
      <Form />
    </>
  );
}
