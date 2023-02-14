'use client';

import { useEffect } from 'react';
import { getData } from './hooks';

import Loading from './loading';
import { Form } from './form';
import { TableData } from './table';

export default function OrdersPage() {
  console.log('render PageOrders');

  useEffect(() => {
    getData('get_center_all');
    document.title = 'Оформленные заказы';
  }, []);

  return (
    <>
      <Loading />
      <Form />
      <TableData />
    </>
  );
}
