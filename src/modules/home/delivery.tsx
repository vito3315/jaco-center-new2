import { useHome } from './store';
import { homeState } from './types';

import { MyTextInput, MyAutocomplite } from '@/ui';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Delivery() {
  //console.log('render Delivery');

  const [checkNewAddr, all_addr, newAddrStreet, changeAddrCustom, newAddrHome, changeAddrHome, pd, et, kv, changeAddrEt, changeAddrPd, changeAddrKv, newAddrDom, changeDomTrue] = useHome((state: homeState) => [state.checkNewAddr, state.all_addr, state.newAddrStreet, state.changeAddrCustom, state.newAddrHome, state.changeAddrHome, state.pd, state.et, state.kv, state.changeAddrEt, state.changeAddrPd, state.changeAddrKv, state.newAddrDom, state.changeDomTrue]);

  return (
    <Grid container spacing={2}>
      {/* адрес доставки */}

      <Grid item xs={8}>
        <MyAutocomplite
          id="newAddrStreet"
          onBlur={() => checkNewAddr(true)}
          freeSolo={true}
          data={all_addr}
          value={newAddrStreet}
          func={changeAddrCustom}
          multiple={false}
          label="Улица"
        />
      </Grid>

      <Grid item xs={4}>
        <MyTextInput
          onBlur={() => checkNewAddr(true)}
          value={newAddrHome}
          func={(event) => changeAddrHome(event)}
          label="Дом"
        />
      </Grid>

      <Grid item xs={4}>
        <MyTextInput value={pd} func={changeAddrPd} label="Подъезд" />
      </Grid>
      <Grid item xs={4}>
        <MyTextInput value={et} func={changeAddrEt} label="Этаж" />
      </Grid>
      <Grid item xs={4}>
        <MyTextInput value={kv} func={changeAddrKv} label="Квартира" />
      </Grid>

      <Grid item xs={12}>
        <ButtonGroup disableElevation variant="contained" className="chooseDomTrue">
          <Button className={newAddrDom === true ? 'active' : ''} onClick={() => changeDomTrue(true)}>Домофон работает</Button>
          <Button className={newAddrDom === false ? 'active' : ''} onClick={() => changeDomTrue(false)}>Домофон не работает</Button>
        </ButtonGroup>
      </Grid>
      {/* адрес доставки */}
    </Grid>
  );
}
