import { useOrders } from '../../modules/orders/store';
import { ordersState } from '../../modules/orders/types';

import Loading from '../../components/loading';
import Form from '../../modules/orders/form';

export default function Orders() {
  console.log('render OrdersPAge');

  const loading = useOrders((state: ordersState) => state.loading);

  return (
    <>
      <Loading loading={loading}/>
      <Form />
    </>
  );
}
