import { useOrderCook } from '@/modules/ordercook/store';
import { ordercookState } from '@/modules/ordercook/types';

import Loading from '@/components/loading';
import Meta from '@/components/meta';
import Form from '@/modules/ordercook/form';
import TableData from '@/modules/ordercook/table';

export default function OrderCookPage() {
  const loading = useOrderCook((state: ordercookState) => state.loading);

  return (
    <Meta title="Заказы на кухне">
      <Loading loading={loading} />
      <Form />
      <TableData />
    </Meta>
  );
}
