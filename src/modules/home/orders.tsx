import { useHome } from './store';
import { homeState } from './types';
import { MyAutocomplite } from '@/ui';

import Grid from '@mui/material/Grid';

export default function Orders() {
  //console.log('render Orders');

  const [allItems, cats, thisItem, addItemCustom] = useHome((state: homeState) => [state.allItems, state.cats, state.thisItem, state.addItemCustom]);

  return (
    <Grid item xs={4}>
      {cats.length > 0 && allItems.length > 0 ? (
        <MyAutocomplite
          id="addItemsAll"
          data={allItems}
          value={thisItem}
          func={addItemCustom}
          multiple={false}
          label="Товары"
        />
      ) : null}
    </Grid>
  );
}
