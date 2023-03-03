import { useOrders, ordersState, Form, TableData, Order, Close } from "@/modules/orders";
import Loading from "@/components/loading";

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
