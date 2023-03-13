import { useOrders } from './store';
import { ordersState, Order } from './types';
import Row from './row';

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

export default function TableData() {
  console.log('render Table');

  const orders = useOrders((state: ordersState) => state.orders);

  return (
    <>
      {!orders?.length ? null : (
        <Grid item xs={12}>
          <TableContainer>
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
          </TableContainer>
        </Grid>
      )}
    </>
  );
}
