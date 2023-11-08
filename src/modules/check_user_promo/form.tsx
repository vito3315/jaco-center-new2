import { MyTextInput } from '@/ui';
import { usePromo } from './store';
import { promoState } from './types';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function Form() {
  //console.log('render Form');

  const [number, getPromoList, changeNumber] = usePromo((state: promoState) => [state.number, state.getPromoList, state.changeNumber]);

  return (
    <>
      <Grid item xs={12} sm={3}>
        <MyTextInput label="Номер телефона" value={number} func={changeNumber} />
      </Grid>
      
      <Grid item xs={12} sm={3}>
        <Button variant="contained" onClick={getPromoList}>
          Обновить
        </Button>
      </Grid>
    </>
  );
}
