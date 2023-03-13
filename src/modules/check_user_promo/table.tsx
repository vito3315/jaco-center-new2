import { shallow } from 'zustand/shallow';
import { usePromo } from './store';
import { promoState } from './types';

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

export default function TableData() {
  console.log('render Table');

  const [promos, promos_sms] = usePromo((state: promoState) => [state.promos, state.promos_sms], shallow);
  
  return (
    <>
      {/* Таблица Промо из ЛК */}
      {!promos.length ? null : (
        <Grid item xs={12}>
          <span>Промокоды из ЛК</span>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Телефон</TableCell>
                  <TableCell>Имя</TableCell>
                  <TableCell>День рождения</TableCell>
                  <TableCell>Промокод</TableCell>
                  <TableCell>Описание</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promos.map((item: {user_name: string, promo_name: string, date_bir: string, login: string, coment: string}, key: number) => (
                    <TableRow key={key}>
                      <TableCell style={{ color: 'inherit' }}>{item.login}</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{item.user_name}</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{item.date_bir}</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{item.promo_name}</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{item.coment}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}

      {/* Таблица отправленные промокоды в смс */}
      {!promos_sms.length ? null : (
        <Grid item xs={12}>
          <span>Отправленные в смс промокоды</span>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Телефон</TableCell>
                  <TableCell>Сообщение</TableCell>
                  <TableCell>Дата время</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promos_sms.map((item: {id: string, date_time: string, phone: string, text: string, type: string}, key: number) => (
                    <TableRow key={key}>
                      <TableCell style={{ color: 'inherit' }}>{item.phone}</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{item.text}</TableCell>
                      <TableCell style={{ color: 'inherit' }}>{item.date_time}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </>
  );
}
