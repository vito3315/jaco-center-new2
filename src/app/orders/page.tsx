'use client';

import { useOrders } from './store';
import { ordersState } from './types';

import Loading from '../../components/loading';
import Form from './form';
import TableData from './table';
import Order from './order';
import Close from './close';

export default function OrdersPage() {
  console.log('render PageOrders');

  const loading = useOrders((state: ordersState) => state.loading);

  return (
    <>
      <Loading loading={loading}/>
      <Form />
      <TableData />
      <Order />
      <Close />
    </>
  );
}
