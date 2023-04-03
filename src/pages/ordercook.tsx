import dynamic from 'next/dynamic';

import { useOrderCook } from '@/modules/ordercook/store';
import { ordercookState } from '@/modules/ordercook/types';
import Loading from "@/components/loading";

const Form = dynamic(() => import('@/modules/ordercook/form'));
const TableData = dynamic(() => import('@/modules/ordercook/table'));

export default function OrderCook() {
  console.log('render OrderCook');

  const loading = useOrderCook((state: ordercookState) => state.loading);

  return (
    <>
      <Loading loading={loading}/>
      <Form />
      <TableData />
    </>
  );
}
