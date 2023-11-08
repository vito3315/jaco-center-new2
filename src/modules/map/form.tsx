import { MySelect } from '@/ui';
import { useMap } from './store';
import { mapState } from './types';

import Grid from '@mui/material/Grid';

export default function Form() {
  //console.log('render Form');

  const [cities, city, changeCity] = useMap((state: mapState) => [state.cities, state.city, state.changeCity]);

  return (
    <Grid item xs={12} sm={3}>
      <MySelect label="Город" is_none={false} data={cities} value={city} func={changeCity} />
    </Grid>
  );
}
