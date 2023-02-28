'use client';

import dynamic from 'next/dynamic';

import { useEffect } from 'react';
import { getData } from './hooks';

import Loading from './loading';
const Form = dynamic<{}>(() => import('./form'), { loading: () =>  <Loading />, ssr: false });
import TableData from './table';
import Order from './order';
import Close from './close';

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
      <Order />
      <Close />
    </>
  );
}
