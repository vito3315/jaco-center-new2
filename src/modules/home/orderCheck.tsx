import { useHome } from './store';
import { homeState } from './types';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export default function OrderCheck() {
  //console.log('render OrderCheck');

  const [orderCheck, newOrder, sumDiv, AllPrice, trueOrder] = useHome((state: homeState) => [state.orderCheck, state.newOrder, state.sumDiv, state.AllPrice, state.trueOrder]);

  return (
  <>
    {orderCheck === true ?
      <Dialog
        open={orderCheck}
        fullWidth={true}
        onClose={() => useHome.setState({ orderCheck: false })}
        className="DialogOrderCheckDialog"
      >
        <DialogTitle className="DialogOrderCheckDialogTitle">
          <Typography variant="h5" component="span" className="orderCheckTitle"> {newOrder.typeOrder} #{newOrder.order_id} на {newOrder.point_name}</Typography>
        </DialogTitle>

        <CloseIcon className="closeDialog" onClick={() => useHome.setState({ orderCheck: false })} />

        <DialogContent className="DialogOrderCheckDialogBody">
          {newOrder.timePred !== '' ?
            <Typography variant="h5" component="span" className="orderCheckText">Время предзаказа: {newOrder.timePred}</Typography>
              :
            <Typography variant="h5" component="span" className="orderCheckText">Время ожидания: {newOrder.time_wait}</Typography>
          }
          
          {newOrder.typeOrder == 'Доставка' ?
            <Typography variant="h5" component="span" className="orderCheckText">Доставка: { newOrder.addr ?
              //this.state.newOrder.addr.city_name+', '+
              newOrder.addr.street+' '+
              newOrder.addr.home+
              (newOrder.addr.pd.length == 0 ? '' : ', Пд. '+newOrder.addr.pd )+
              (newOrder.addr.et.length == 0 ? '' : ', Эт. '+newOrder.addr.et )+
              (newOrder.addr.kv.length == 0 ? '' : ', Кв. '+newOrder.addr.kv )
                  :
              null
            }</Typography>
              :
            <Typography variant="h5" component="span" className="orderCheckText">Самовывоз: {newOrder.point_name}</Typography>
          }
          {newOrder.typeOrder == 'Доставка' ?
            newOrder.addr && parseInt(newOrder.addr.dom_true) == 0 ?
              <Typography variant="h5" component="span" className="orderCheckText" style={{ color: 'red', fontWeight: 900 }}>Домофон не работает</Typography>
                :
              <Typography variant="h5" component="span" className="orderCheckText" style={{ color: 'green', fontWeight: 900 }}>Домофон работает</Typography>
              :
            null
          }
          
          <Typography variant="h5" component="span" className="orderCheckText">Номер телефона: {newOrder.number}</Typography>
          
          {newOrder.promoName ?
            <Typography variant="h5" component="span" className="orderCheckText">Промокод: {newOrder.promoName}</Typography>
              :
            null
          }
              
          {newOrder.typeOrder == 'Доставка' ?
            newOrder.comment && newOrder.comment.length > 0 ?
              <Typography variant="h5" component="span" className="nameSdacha orderCheckText">Комментарий: {newOrder.comment}</Typography>
                :
              null
              :
            null
          }    
          {newOrder.typeOrder == 'Доставка' ?
            newOrder.sdacha && newOrder.sdacha.length > 0 ?
              <Typography variant="h5" component="span" className="nameSdacha orderCheckText">Сдача с: {newOrder.sdacha}р</Typography>
                :
              null
              :
            null
          }
              
          {newOrder.typeOrder == 'Доставка' ?
            null
              :
              newOrder.dop_text && newOrder.dop_text.length > 0 ?
                <Typography variant="h5" component="span" style={{ fontWeight: 'bold' }} className="nameSdacha orderCheckText">{newOrder.dop_text}</Typography>
                  :
                null
          }     
              
          <Table size="small">
            <TableBody>
              {newOrder.cart.map( (item: { count: string; name: any; new_full_price: number; full_price: any; }, key: number) =>
                parseInt(item.count) > 0 ?
                  <TableRow key={key}>
                    <TableCell style={{ width: '60%', paddingLeft: 0, fontSize: '1rem' }}>{item.name}</TableCell>
                    <TableCell style={{fontSize: '1rem'}}>{item.count}</TableCell>
                    <TableCell style={{fontSize: '1rem'}}>{item.new_full_price || item.new_full_price == 0 ? item.new_full_price : item.full_price} р</TableCell>
                  </TableRow>
                    :
                  null
              )}

              {newOrder.typeOrder == 'Доставка' ?
                <TableRow>
                  <TableCell style={{ width: '60%', paddingLeft: 0, fontSize: '1rem' }}>Доставка</TableCell>
                  <TableCell style={{fontSize: '1rem'}}>1</TableCell>
                  <TableCell style={{fontSize: '1rem'}}>{sumDiv} р</TableCell>
                </TableRow>
                  :
                null
              }
            </TableBody>
            <TableFooter>
              <TableRow style={{ borderBottom: 0 }}>
                <TableCell style={{ paddingLeft: 0, fontSize: '1rem', fontWeight: 'bolder', color: '#000' }}>Сумма заказа</TableCell>
                <TableCell></TableCell>
                <TableCell style={{ fontSize: '1rem', fontWeight: 'bolder', color: '#000' }}>{ parseInt(AllPrice) + parseInt(sumDiv) } р</TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          
        </DialogContent>
        <DialogActions style={{ padding: '12px 24px', paddingBottom: 24 }}>
          <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" style={{ width: '100%' }} onClick={trueOrder}>
            <Button variant="contained" style={{ width: '100%' }} className="BtnCardMain CardInCardItem">Подтвердить заказ</Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
      : null
    }
  </>
  );
}
