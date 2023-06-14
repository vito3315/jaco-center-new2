import { shallow } from 'zustand/shallow';

import { useHome } from './store';
import { homeState } from './types';
import { MySelect } from '@/ui';
import { a11yProps } from '@/lib';

import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';

export default function Time() {
  console.log('render Time');

  const [typeTime, changeTypeTime, textAvgTime, date_pred, timePred, date, time, changeTime, changeDate] = useHome((state: homeState) => 
    [state.typeTime, state.changeTypeTime, state.textAvgTime, state.date_pred, state.timePred, state.date, state.time, state.changeTime, state.changeDate], shallow);

  return (
    <Grid container spacing={2} marginTop={0}>
    <Grid item xs={12}>
      <AppBar position="static" style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' }}>
        <Tabs value={typeTime}  onChange={changeTypeTime} indicatorColor="secondary" variant="fullWidth" style={{ height: 40, minHeight: 40 }}>
          
          <Tab label={'По текущему'} style={{ minWidth: 'auto', height: 40, minHeight: 40 }} {...a11yProps(0)} />
          <Tab label={'Ко времени'} style={{ minWidth: 'auto', height: 40, minHeight: 40 }} {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
    </Grid>

    {typeTime == 0 ?
        <Grid item xs={12}>
          <Typography variant="h6" component="span">{textAvgTime}</Typography>
        </Grid>
          :
        <>
          <Grid item xs={6}>
            <MySelect data={date_pred} value={date} func={(event) => changeDate(event)} label='Дата' />
          </Grid>
          <Grid item xs={6}>
            <MySelect data={timePred} value={time} func={(event) => changeTime(event)} label='Время' />
          </Grid>
        </>
    }

  </Grid>
  );
}
