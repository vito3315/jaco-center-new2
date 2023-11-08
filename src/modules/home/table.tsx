import { useHome } from './store';
import { homeState, CatItem } from './types';

import { Row } from './row';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

export default function TableData() {
  //console.log('render Table');

  const [mainItems, dopItems, promoItems] = useHome((state: homeState) => [state.mainItems, state.dopItems, state.promoItems]);

  return (
    <Grid item xs={8} style={{ paddingTop: 5 }}>
      <Paper style={{ width: '100%' }}>
        <TableContainer style={{ maxHeight: 420, overflow: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Наименование</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Кол-во</TableCell>
                <TableCell>Сумма</TableCell>
                <TableCell>Скидка</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mainItems.map((item: CatItem, key: number) => (
                <Row key={key} item={item} type="main" />
              ))}

              {dopItems.map((item: any, key: number) => (
                <Row key={key} item={item} type="dop" />
              ))}

              {promoItems.map((item: any, key: number) => (
                <Row key={key} item={item} type="promo" />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
}
