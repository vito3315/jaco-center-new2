'use client';

import { useOrders, ordersState } from './store';

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

  const showOrder = useOrders((state: ordersState) => state.showOrder);
  const openOrder = useOrders((state: ordersState) => state.openOrder);
  // const allItems = useOrders((state: ordersState) => state.allItems);

  const repeatOrder = () => {};

  // const repeatOrder = () => {
  //   let my_cart = [];
  //   let item_info = null;

  //   localStorage.setItem('cityID', city_id);

  //   if (showOrder.order.promo_name && showOrder.order.promo_name != '') {
  //     itemsStore.setPromo(
  //       JSON.stringify(showOrder.promo_info),
  //       showOrder.order.promo_name
  //     );

  //     if (parseInt(showOrder.promo_info.promo_action) == 2) {
  //     }
  //   }

  //   showOrder.order_items.map((item) => {
  //     item_info = allItems.find((it) => it.id === item.item_id);

  //     if (item_info) {
  //       const price = parseInt(item_info.price);
  //       const all_price = parseInt(item.count) * parseInt(item_info.price);

  //       my_cart.push({
  //         name: item.name,
  //         item_id: item.item_id,
  //         count: item.count,

  //         one_price: price,
  //         all_price,
  //       });
  //     }
  //   });

  //   if (showOrder.order.promo_name && showOrder.order.promo_name != '') {
  //     if (parseInt(showOrder.promo_info.promo_action) == 2) {
  //       showOrder.promo_info.items_add.map((item_add, key) => {
  //         my_cart.map((item_cart, key_cart) => {
  //           if (parseInt(item_cart.item_id) == parseInt(item_add.item_id)) {
  //             my_cart[key_cart]['count'] -= parseInt(item_add.count);
  //             my_cart[key_cart]['all_price'] =
  //               parseInt(my_cart[key_cart]['count']) *
  //               parseInt(item_cart.price);
  //           }
  //         });
  //       });
  //     }
  //   }

  //   localStorage.setItem('clientNumber', showOrder.order.number);

  //   let data = {
  //     orderType: parseInt(showOrder.order.type_order_) - 1 == 0 ? 0 : 1,
  //     orderAddr: showOrder.street.name,
  //     orderPic: parseInt(showOrder.order.point_id),
  //     orderComment: showOrder.order.comment,

  //     orderTimes: parseInt(showOrder.order.is_preorder),
  //     orderPredDay:
  //       parseInt(showOrder.order.is_preorder) == 1
  //         ? showOrder.order.date_time_pred.date
  //         : '',
  //     orderPredTime:
  //       parseInt(showOrder.order.is_preorder) == 1
  //         ? showOrder.order.date_time_pred.time
  //         : '',

  //     orderPay: parseInt(showOrder.order.type_order_) == 1 ? 'cash' : 'in',
  //     orderSdacha: showOrder.order.sdacha,
  //   };

  //   itemsStore.saveCartData(data);

  //   itemsStore.setItems(my_cart);

  //   // setTimeout(()=>{
  //   //   window.location.pathname = '/';
  //   // }, 500)
  // };

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
            <Button variant="contained" onClick={repeatOrder}>
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
              // onClick={this.fakeUser.bind(this)}
            >
              Клиент не вышел на связь
            </Button>
          </ButtonGroup>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
