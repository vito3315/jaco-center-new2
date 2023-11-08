import { useOrderCook } from './store';
import { ordercookState } from './types';

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

export default function TableData() {
  //console.log('render Table');

  const orders = useOrderCook((state: ordercookState) => state.orders);

  return (
  <>
  {!orders ? null : (
  <Grid item xs={12}>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Тип</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Время заказа / предзаказа</TableCell>
            <TableCell>Время выхода на стол</TableCell>
            <TableCell>Во сколько собрали</TableCell>
            <TableCell>Закрыли</TableCell>
            <TableCell>Приготовили</TableCell>
            <TableCell>Отдали</TableCell>
            <TableCell>Обещали</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.ready ?
             orders.ready.map((item, key) =>
              <TableRow key={key} style={{ backgroundColor: 'green', color: '#fff', fontWeight: '700' }}>
                <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.id}</TableCell>
                <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.type_order}</TableCell>
                <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.status}</TableCell>
                <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{ parseInt(item['preorder']) == 1 ? item.date_time_preorder_ : item.date_time_order }</TableCell>
                <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.unix_start_stol_or}</TableCell>
                <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{ item.give_data_time_ }</TableCell>
                <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{ item.close_date_time_order }</TableCell>
                <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.time_}</TableCell>
                <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.test_time}</TableCell>
                <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{ parseInt(item['preorder']) == 0 ? item['unix_time_to_client'] : '' }</TableCell>
              </TableRow>
            ) : null}
          {orders.onstol ?
           orders.onstol.map( (item, key) =>
            <TableRow key={key} style={{ backgroundColor: 'yellow', color: '#000', fontWeight: '700' }}>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.id}</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.type_order}</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.status}</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{ parseInt(item['preorder']) == 1 ? item.date_time_preorder_ : item.date_time_order }</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.unix_start_stol_or}</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{ item.give_data_time_ }</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{ item.close_date_time_order }</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.time_}</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.test_time}</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{ parseInt(item['preorder']) == 0 ? item['unix_time_to_client'] : '' }</TableCell>
            </TableRow>
          ) : null}
          {orders.prestol_new ?
           orders.prestol_new.map( (item, key) =>
            <TableRow key={key} style={{ backgroundColor: '#fff', color: '#000', fontWeight: '500' }}>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.id}</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.type_order}</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.status}</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{ parseInt(item['preorder']) == 1 ? item.date_time_preorder : item.date_time_order }</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.time_start_order}</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{ item.give_data_time_ }</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{ item.close_date_time_order }</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.time_}</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.test_time}</TableCell>
              <TableCell style={{ color: 'inherit', fontWeight: 'inherit' }}>{ parseInt(item['preorder']) == 0 ? item['unix_time_to_client'] : '' }</TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>
)}
</>
);
}
