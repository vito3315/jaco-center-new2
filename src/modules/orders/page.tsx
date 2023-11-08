import { useOrders } from '@/modules/orders/store';
import { ordersState } from '@/modules/orders/types';

import Loading from '@/components/loading';
import Meta from '@/components/meta';

import Form from '@/modules/orders/form';
import TableData from '@/modules/orders/table';
import Order from '@/modules/orders/order';
import Close from '@/modules/orders/close';

export default function OrdersPage() {
  const loading = useOrders((state: ordersState) => state.loading);

  return (
    <Meta title="Оформленные заказы">
      <Loading loading={loading} />
      <Form />
      <TableData />
      <Order />
      <Close />
    </Meta>
  );
}
