import { memo } from 'react';
import { Order } from './types';
import { useOrders } from './store';
import { ordersState } from './types';

import TableCell from '@mui/material/TableCell';

type Props = {
  item: Order;
};

function Ceil({ item }: Props) {
  //console.log('render Ceil');

  const getOrder = useOrders((state: ordersState) => state.getOrder);

  return (
    <TableCell style={parseInt(item.dist) >= 0 ? {backgroundColor: 'yellow', color: '#000', cursor: 'pointer', fontWeight: 'inherit'} : { color: 'inherit', cursor: 'pointer', fontWeight: 'inherit' }}
      onClick={() => getOrder(item.id)}>
      {item.id}
    </TableCell>
  );
}

export default memo(Ceil);
