import dynamic from 'next/dynamic';

import { useOrders } from "@/modules/orders/store";
import { ordersState } from "@/modules/orders/types";
import Loading from "@/components/loading";

const Form = dynamic(() => import('@/modules/orders/form'));
const TableData = dynamic(() => import('@/modules/orders/table'));
const Order = dynamic(() => import('@/modules/orders/order'));
const Close = dynamic(() => import('@/modules/orders/close'));

export default function Orders() {
  console.log('render OrdersPAge');

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
