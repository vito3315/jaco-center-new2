import { useHome } from './store';
import { homeState } from './types';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PlaceOrder() {
  //console.log('render PlaceOrder');

  const [sumDiv, AllPrice, startOrderNext] = useHome((state: homeState) => [state.sumDiv, state.AllPrice, state.startOrderNext]);

  return (
    <Grid container spacing={2} marginTop={0}>
      <Grid item xs={12}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" component="span" style={{ fontSize: '0.8rem', color: '#bababa' }}>Доставка: {sumDiv} р</Typography>
            <Typography variant="h6" component="span">К оплате: { parseInt(AllPrice) + parseInt(sumDiv) } р</Typography>
          </div>

          <Button style={{ height: 'fit-content', color: '#fff' }} variant="contained" color="secondary" onClick={startOrderNext}>Оформить заказ</Button>
        </div>
      </Grid>
    </Grid>
  );
}
