import { MySelect } from '@/ui';
import { useOrderCook } from './store';
import { ordercookState } from './types';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function Form() {
  //console.log('render Form');

  const [points, point, changePoint, getCookOrders] = useOrderCook((state: ordercookState) => [state.points, state.point, state.changePoint, state.getCookOrders]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <MySelect label="Точка" is_none={false} data={points} value={point} func={changePoint} />
      </Grid>

      <Grid item xs={12} sm={3}>
        <Button variant="contained" onClick={() => getCookOrders()}>
          Обновить
        </Button>
      </Grid>
    </Grid>
  );
}
