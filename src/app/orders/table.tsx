'use client';

import { useState, useEffect, useCallback } from 'react';
import { useOrders } from './store';

import Grid from '@mui/material/Grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
//import TableFooter from '@mui/material/TableFooter';

type Props = {
  address: string,
  number: string,
}

export const TableData = ({address, number}: Props) => {

  const ordersData = useOrders((state: any) => state.orders);

  console.log('render Table');

  const [orders, setOrders] = useState([]);

  const filterNumber = useCallback(() => {
    let renderOrders = ordersData;

    if(number.length > 0 ){
      renderOrders = renderOrders.filter( (item: { number: string | any[]; }) => item.number.indexOf(number) !== -1 );
    }

    if(address.length > 0 ){
      renderOrders = renderOrders.filter( (item: { street: string; home: string; }) => (item.street + ' ' + item.home).toLowerCase() .indexOf(address.toLowerCase()) !== -1 );
    }
    setOrders(renderOrders);
  }, [address, number, ordersData]);
  
  useEffect(() => {
    filterNumber();
  }, [filterNumber]);

  // console.log(orders);

  return (
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
          {orders.map((item: any, key) => (
            <TableRow
              key={key}
              style={
                parseInt(item.is_delete) == 1
                  ? {
                      backgroundColor: 'red',
                      color: '#fff',
                      fontWeight: 'bold',
                    }
                  : {}
              }
            >
              <TableCell
                style={
                  parseInt(item.dist) >= 0
                    ? {
                        backgroundColor: 'yellow',
                        color: '#000',
                        cursor: 'pointer',
                        fontWeight: 'inherit',
                      }
                    : {
                        color: 'inherit',
                        cursor: 'pointer',
                        fontWeight: 'inherit',
                      }
                }
                // onClick={this.showOrder.bind(this, item.id)}
              >
                {item.id}
              </TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.type_user}
              </TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.number}
              </TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.street} {item.home}
              </TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.date_time_order}
              </TableCell>

              <TableCell
                style={{
                  color: 'inherit',
                  fontWeight: 'inherit',
                  backgroundColor:
                    parseInt(item.is_preorder) == 1 ? '#bababa' : 'inherit',
                }}
              >
                {item.need_time}
              </TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.give_data_time == '00:00:00' ? '' : item.give_data_time}
              </TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.close_order}
              </TableCell>

              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.to_time}
              </TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.unix_time_to_client == '0' ||
                parseInt(item.is_preorder) == 1
                  ? ''
                  : item.unix_time_to_client}
              </TableCell>

              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.type_order}
              </TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.status}
              </TableCell>

              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.order_price}
              </TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.type_pay}
              </TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
                {item.driver}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};
