import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import { MyDatePickerNew, MySelect, MyTextInput } from '@/ui';
import { a11yProps } from '@/lib';
import { useOrders } from './store';
import { ordersState } from './types';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Form() {
  console.log('render Form');

  const {cities, points, cityId, number, address, date, indexTab, 
    changeCity, changeAddress, changeNumber, setData, changeDate, getDataForm} = useOrders((state: ordersState) => state, shallow);

  useEffect(() => {
    getDataForm();
    document.title = 'Оформленные заказы';
  }, [getDataForm]);

  return (
    <>
    {!points.length ? null :
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <MySelect
          label="Город"
          is_none={false}
          data={cities}
          value={cityId}
          func={changeCity}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <MyDatePickerNew label="Дата" value={date} func={changeDate} />
      </Grid>

      <Grid item xs={12} sm={3}>
        <MyTextInput
          label="Номер телефона"
          value={number}
          func={changeNumber}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <MyTextInput label="Адрес" value={address} func={changeAddress} />
      </Grid>

      <Grid item xs={12} sm={3}>
        <Button variant="contained" onClick={() => setData()}>
          Обновить
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Tabs
          value={indexTab}
          TabIndicatorProps={{ style: { backgroundColor: 'inherit' } }}
          className="TabsOrders"
        >
          {points.map((item: { id: string; name: string; city_id: string }, key: number) => (
              <Tab
                key={key}
                label={item.name}
                onClick={() => setData(parseInt(item.id), key)}
                {...a11yProps(parseInt(item.id))}
              />
            )
          )}
        </Tabs>
      </Grid>
    </Grid>
}
    </>
  );
}
