import { shallow } from 'zustand/shallow';

import { useHome } from './store';
import { homeState, Cat, CatItem } from './types';
import { a11yProps, TabPanel } from '@/lib';
import MyToolTip from './toolTip'

import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function AllItems() {
  console.log('render AllItems');

  const [allItems, cats, addToCart, activeCat, changeCat] = useHome(
    (state: homeState) => [state.allItems, state.cats, state.addToCart, state.activeCat, state.changeCat], shallow);

  return (
    <Grid item xs={12}>
    { /* все позиции */ }
    {cats.length > 0 && allItems.length > 0 ?
      <>
        <AppBar position="static" style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' }}>
          <Tabs value={activeCat} onChange={changeCat} indicatorColor="secondary" variant="fullWidth">
            {cats.map((item: Cat, key: number) =>
              <Tab label={item.name} style={{ minWidth: 'auto' }} key={key} {...a11yProps(key)} />
            ) }
          </Tabs>
        </AppBar>

        {cats.map((cat: Cat, key: number) =>
          <TabPanel value={activeCat} index={key} key={key}>
            <Grid container spacing={2} className='container' style={{ paddingTop: 0 }}>
              {cat.items.map( (item: CatItem, k: number) =>
                <Grid key={k} item xs={2}>
                  <Paper className={'paperCat'} style={{ display: 'flex', flexDirection: 'column', height: 70, justifyContent: 'space-around', position: 'relative' }}>
                    
                    <Typography component="span" className={'bthCat'} onClick={() => addToCart(item.id)}>{item.name}</Typography>
                    <Typography component="span" className={'bthCat'} onClick={() => addToCart(item.id)}>{item.price} р.</Typography>
                    
                    <MyToolTip tmp_desc={item.tmp_desc} info_weight={item.info_weight} />

                  </Paper>
                </Grid>
              ) }
            </Grid>
          </TabPanel>
        )}
      </>
        :
      null
    }
    { /* /все позиции/ */ }
  </Grid>
  );
}
