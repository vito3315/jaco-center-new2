import dynamic from 'next/dynamic';

import { useOrderCook, ordercookState } from "@/modules/ordercook";
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
