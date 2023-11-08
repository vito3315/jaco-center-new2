import { memo } from "react";
import { Order } from './types';
import Ceil from './ceil';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

type Props = {
  item: Order;
}

function Row ({ item }: Props) {
  //console.log('render Row');

  return (
    <TableRow style={parseInt(item.is_delete) == 1 ? { backgroundColor: 'red', color: '#fff', fontWeight: 'bold' } : {}}>
      <Ceil item={item} />
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.type_user}</TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.number}</TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.street} {item.home}</TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.date_time_order}</TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit', backgroundColor: parseInt(item.is_preorder) == 1 ? '#bababa' : 'inherit' }}>
        {item.need_time}
      </TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.give_data_time == '00:00:00' ? '' : item.give_data_time}</TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.close_order}</TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.to_time}</TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>
        {item.unix_time_to_client == '0' || parseInt(item.is_preorder) == 1 ? '' : item.unix_time_to_client}
      </TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.type_order}</TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.status}</TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.order_price}</TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.type_pay}</TableCell>
      <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.driver}</TableCell>
    </TableRow>
  );
};

export default memo(Row);
