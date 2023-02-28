'use client';

import { useOrders, ordersState, Order } from './store';
import { Row } from './row';

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function TableData() {
  console.log('render Table');

  const ordersData = useOrders((state: ordersState) => state.orders);
  const number = useOrders((state: ordersState) => state.number);
  const address = useOrders((state: ordersState) => state.address);

  const filterOrders = () => {
    let renderOrders = ordersData;

    if (number.length > 0) {
      renderOrders = ordersData.filter(
        (item: { number: string }) => item.number.indexOf(number) !== -1
      );
    }

    if (address.length > 0) {
      renderOrders = ordersData.filter(
        (item: { street: string; home: string }) =>
          (item.street + ' ' + item.home)
            .toLowerCase()
            .indexOf(address.toLowerCase()) !== -1
      );
    }

    return renderOrders;
  };

  const orders = filterOrders();

  return (
    <>
      {!orders?.length ? null : (
        <Grid item xs={12}>
          <Table size={'small'}>
            <TableHead>
              <TableRow>
                <TableCell>Заказ</TableCell>
                <TableCell>Оформил</TableCell>
                <TableCell>Номер клиента</TableCell>
                <TableCell>Адрес доставки</TableCell>
                <TableCell>Время открытия заказа</TableCell>

                <TableCell>Ко времени</TableCell>
                <TableCell>Закрыт на кухне</TableCell>
                <TableCell>Получен клиентом</TableCell>

                <TableCell>До просрочки</TableCell>
                <TableCell>Время обещ</TableCell>

                <TableCell>Тип</TableCell>
                <TableCell>Статус</TableCell>

                <TableCell>Сумма</TableCell>
                <TableCell>Оплата</TableCell>
                <TableCell>Водитель</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((item: Order, key: number) => (
                <Row item={item} key={key} />
              ))}
            </TableBody>
          </Table>
        </Grid>
      )}
    </>
  );
}
