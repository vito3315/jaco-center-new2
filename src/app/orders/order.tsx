'use client';

import { useOrders } from './store';
import { ordersState } from './types';
import { shallow } from 'zustand/shallow';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Order() {
  console.log('render Order');

  const { showOrder, openOrder } = useOrders((state: ordersState) => state, shallow);

  // сделать после страницы Оформить заказ
  const repeatOrder = () => {};
  const fakeUser = () => {};

  return (
    <Dialog
      open={openOrder}
      onClose={() => useOrders.setState({ openOrder: false })}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle style={{ textAlign: 'center' }}>
        Заказ #{showOrder?.order.order_id}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <span>
              {showOrder?.order.type_order}:{' '}
              {showOrder?.order.type_order_addr_new}
            </span>
          </Grid>
          {parseInt(showOrder?.order.type_order_) == 1 ? (
            parseInt(showOrder?.order.fake_dom) == 0 ? (
              <Grid item xs={12}>
                <b style={{ color: 'red', fontWeight: 900 }}>
                  Домофон не работает
                </b>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <b style={{ color: 'green', fontWeight: 900 }}>
                  Домофон работает
                </b>
              </Grid>
            )
          ) : null}
          <Grid item xs={12}>
            <span>
              {showOrder?.order.time_order_name}: {showOrder?.order.time_order}
            </span>
          </Grid>

          {showOrder?.order.number.length > 1 ? (
            <Grid item xs={12}>
              <b>Телефон: </b>
              <span>{showOrder?.order.number}</span>
            </Grid>
          ) : null}

          {showOrder?.order.delete_reason.length > 0 ? (
            <Grid item xs={12}>
              <span style={{ color: 'red' }}>
                Удален: {showOrder?.order.date_time_delete}
              </span>
            </Grid>
          ) : null}
          {showOrder?.order.delete_reason.length > 0 ? (
            <Grid item xs={12}>
              <span style={{ color: 'red' }}>
                {showOrder?.order.delete_reason}
              </span>
            </Grid>
          ) : null}

          {parseInt(showOrder?.order.is_preorder) == 1 ? null : (
            <Grid item xs={12}>
              <span>
                {showOrder?.order.text_time}
                {showOrder?.order.time_to_client}
              </span>
            </Grid>
          )}

          <Grid item xs={12}>
            <span>{showOrder?.order.textTime}</span>
          </Grid>

          {showOrder?.order.promo_name == null ||
          showOrder?.order.promo_name.length == 0 ? null : (
            <>
              <Grid item xs={12}>
                <b>Промокод: </b>
                <span>{showOrder?.order.promo_name}</span>
              </Grid>
              <Grid item xs={12}>
                <span>{showOrder?.order.promo_text}</span>
              </Grid>
            </>
          )}

          {showOrder?.order.comment == null ||
          showOrder?.order.comment.length == 0 ? null : (
            <Grid item xs={12}>
              <b>Комментарий: </b>
              <span>{showOrder?.order.comment}</span>
            </Grid>
          )}

          {showOrder?.order.sdacha == null ||
          parseInt(showOrder?.order.sdacha) == 0 ? null : (
            <Grid item xs={12}>
              <b>Сдача: </b>
              <span>{showOrder?.order.sdacha}</span>
            </Grid>
          )}

          <Grid item xs={12}>
            <b>Сумма заказа: </b>
            <span>{showOrder?.order.sum_order} р</span>
          </Grid>

          {showOrder?.order.check_pos_drive == null ||
          !showOrder?.order.check_pos_drive ? null : (
            <Grid item xs={12}>
              <b>Довоз оформлен: </b>
              <span>{showOrder?.order.check_pos_drive.comment}</span>
            </Grid>
          )}

          <Grid item xs={12}>
            <Table size={'small'} style={{ marginTop: 15 }}>
              <TableBody>
                {showOrder?.order_items.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.count}</TableCell>
                    <TableCell>{item.price} р</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', color: '#000' }}>
                    Сумма закза
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#000' }}>
                    {showOrder?.order.sum_order} р
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Grid>

          <Accordion style={{ width: '100%' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Расформировка</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table size={'small'} style={{ marginTop: 15 }}>
                <TableBody>
                  {showOrder?.order_items_.map((item, key) => (
                    <TableRow key={key}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell
                        style={{
                          backgroundColor:
                            parseInt(item.ready) > 0 ? '#6ab04c' : '#eb4d4b',
                        }}
                      ></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </DialogContent>

      {parseInt(showOrder?.order.is_delete) == 0 &&
      parseInt(showOrder?.order.status_order) !== 6 ? (
        <DialogActions
          style={{ justifyContent: 'flex-end', padding: '15px 0px' }}
        >
          <ButtonGroup
            disableElevation={true}
            disableRipple={true}
            variant="contained"
            style={{ marginRight: 24 }}
          >
            <Button
              variant="contained"
              onClick={() => useOrders.setState({ openClose: true })}
            >
              Отменить заказ
            </Button>
          </ButtonGroup>
        </DialogActions>
      ) : null}

      {parseInt(showOrder?.order.is_delete) == 1 ||
      parseInt(showOrder?.order.status_order) == 6 ? (
        <DialogActions
          style={{ justifyContent: 'flex-end', padding: '15px 0px' }}
        >
          <ButtonGroup
            disableElevation={true}
            disableRipple={true}
            variant="contained"
            style={{ marginRight: 24 }}
          >
            <Button variant="contained" 
            onClick={repeatOrder}
            >
              Повторить заказ
            </Button>
          </ButtonGroup>
        </DialogActions>
      ) : null}

      {parseInt(showOrder?.order.type_order_) == 1 &&
      parseInt(showOrder?.order.status_order) > 4 &&
      parseInt(showOrder?.order.check_pos) >= 0 ? (
        <DialogActions
          style={{ justifyContent: 'flex-end', padding: '15px 0px' }}
        >
          <ButtonGroup
            disableElevation={true}
            disableRipple={true}
            variant="contained"
            style={{ marginRight: 24 }}
          >
            <Button
              variant="contained"
              onClick={fakeUser}
            >
              Клиент не вышел на связь
            </Button>
          </ButtonGroup>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
