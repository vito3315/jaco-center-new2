import { useOrderCook, ordercookState, Form, TableData } from "@/modules/ordercook";
import Loading from "@/components/loading";

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
