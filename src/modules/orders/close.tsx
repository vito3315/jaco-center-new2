import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useOrders } from './store';
import { ordersState } from './types';
import { MyAlert, MyTextInput } from '../../ui';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function Close() {
  console.log('render Close');

  const [showOrder, openClose, openAlert, status, text, closeOrder] = useOrders((state: ordersState) => [state.showOrder, state.openClose, state.openAlert, state.status, state.text, state.closeOrder], shallow);

  const radiogroup_options = [
    { id: '0', label: 'Решили отредактировать заказ', value: 0 },
    { id: '1', label: 'Не устраивает время ожидания', value: 0 },
    { id: '2', label: 'Изменились планы', value: 0 },
    { id: '3', label: 'Недостаточно средств', value: 0 },
    { id: '4', label: 'Другое', value: 0 },
  ];

  const [comment, setComment] = useState<string>('');
  const [type, setType] = useState<string>('-1');
  const [confirm, setConfirm] = useState<boolean>(false);

  const changeType = (event: { target: { value: string } }) => {
    setComment('');
    setType(event.target.value);
  };

  const changeComment = (event: { target: { value: string } }) => {
    setType('4');
    setComment(event.target.value);
  };

  const openConfirm = () => {
    setConfirm(true);
  };

  const closeDialog = () => {
    setType('-1');
    setComment('');
    useOrders.setState({ openClose: false });
  }

  const close = () => {
    setConfirm(false);
    setType('-1');
    setComment('');

    const deltype: {id: string, label: string, value: number} = radiogroup_options.find((item) => item.id === type) ?? { id: '4', label: 'Другое', value: 0 };

    const data = {
      typeCreate: 'center',
      order_id: showOrder.order.order_id,
      point_id: showOrder.order.point_id,
      ans: parseInt(deltype.id) == 4 ? comment : deltype.label,
    };

    closeOrder(data);
  };

  return (
    <>
      <MyAlert
        isOpen={openAlert}
        onClose={() => useOrders.setState({ openAlert: false })}
        status={status}
        text={text}
      />

      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="sm"
        open={confirm}
        onClose={() => setConfirm(false)}
      >
        <DialogTitle align="center" sx={{ fontWeight: 'bold' }}>Подтвердите отмену заказа!</DialogTitle>
        <DialogContent sx={{ fontWeight: 'bold', textAlign: 'center' }}>{`Отменить заказ # ${showOrder?.order?.order_id} ?`}</DialogContent>
        <DialogActions>
          <Button style={{ color: '#00a550' }} onClick={closeDialog}>Нет</Button>
          <Button onClick={close}>Да</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openClose}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ textAlign: 'center' }}>Отмена заказа {showOrder?.order?.order_id}</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup name="type" value={type} onChange={changeType}>
              {radiogroup_options.map((item, key) => (
                <FormControlLabel
                  key={key}
                  value={item.id}
                  control={<Radio />}
                  label={item.label}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <MyTextInput label="Причина отмены" value={comment} func={changeComment} />
         
        </DialogContent>

        <DialogActions style={{ paddingBottom: 24 }}>
          <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" style={{ marginRight: 24 }}>
            <Button variant="contained" onClick={closeDialog}>К заказу</Button>
          </ButtonGroup>

          <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" style={{ marginRight: 24 }}>
            <Button variant="contained" onClick={openConfirm}>Отменить заказ</Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </>
  );
}
