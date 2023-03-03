import { memo } from "react";

import { useOrders } from './store';
import { ordersState } from './types';

import TableCell from '@mui/material/TableCell';

function Ceil ({ item }) {
  console.log('render Ceil');

  const getOrder = useOrders((state: ordersState) => state.getOrder);

  return (
      <TableCell style={parseInt(item.dist) >= 0 ? {backgroundColor: 'yellow', color: '#000', cursor: 'pointer', fontWeight: 'inherit' } : 
      {color: 'inherit', cursor: 'pointer', fontWeight: 'inherit'}} onClick={() => getOrder(item.id)}>
        {item.id}
      </TableCell>
      
  );
};

export default memo(Ceil);
