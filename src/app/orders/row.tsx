'use client';

import { getData } from './hooks';
import { useOrders, ordersState } from './store';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const Row = ({ item }) => {
  console.log('render Row');

  const pointId = useOrders((state: ordersState) => state.pointId);

  const showOrder = (order_id: string | number) => {
    const data = {
      point_id: pointId,
      order_id,
    };

    getData('get_order', data);

    useOrders.setState({ openOrder: true });
  };

  return (
    <TableRow
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
        onClick={() => showOrder(item.id)}
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
        {item.unix_time_to_client == '0' || parseInt(item.is_preorder) == 1
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
  );
};
