'use client';

import { useState, useEffect } from 'react';

import { MyTextInput, MySelect, MyDatePickerNew } from '../../ui';
import { useOrders, ordersState, Point } from './store';
import { formatDate, a11yProps } from '../../lib';
import { getData } from './hooks';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Form() {
  console.log('render Form');

  const cities = useOrders((state: ordersState) => state.cities);
  const points = useOrders((state: ordersState) => state.points);
  const status = useOrders((state: ordersState) => state.status);

  const pointsFilter = points.filter((item: { city_id: string }) => parseInt(item.city_id) == parseInt(cities[0].id));

  const [address, setAddress] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [date, setDate] = useState<Date | string>(formatDate(new Date()));

  const [cityId, setCityId] = useState<string>(cities[0]?.id ?? '');
  const [pointId, setPointId] = useState<number | string>(pointsFilter[0]?.id ?? 0);
  const [pointsList, setPointsList] = useState<Point[]>(pointsFilter);

  const [indexTab, setIndexTab] = useState<number>(0);

  useEffect(() => {
    if (status) {
      useOrders.setState({ pointId });

      const data = {
        point_id: pointId,
        date,
      };

      getData('get_orders', data);

      useOrders.setState({ status: false });
    }
  }, [date, pointId, status]);

  const changeAddress = (event: { target: { value: string } }) => {
    setAddress(event.target.value);
    useOrders.setState({ address: event.target.value });
  };

  const changeNumber = (event: { target: { value: string } }) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');

    if (onlyNums.length < 11) {
      setNumber(onlyNums);
      useOrders.setState({ number: onlyNums });
    }
  };

  const changeCity = (event: { target: { value: string } }) => {
    const pointsList = points.filter(
      (item) => parseInt(item.city_id) == parseInt(event.target.value)
    );

    setCityId(event.target.value);
    setPointsList(pointsList);
    setPointId(pointsList[0].id);
    setIndexTab(0);

    setData();
  };

  const changeDate = (value: string | Date | null) => {
    setDate(value ? formatDate(value) : '');

    setData();
  };

  const setData = (point_id?: number | string, index?: number) => {
    setNumber('');
    setAddress('');
    useOrders.setState({ number: '', address: '', orders: [], status: true });

    if (point_id) {
      setPointId(point_id);
    }

    if (index || index === 0) {
      setIndexTab(index);
    }
  };

  const updateData = () => {
    const data = {
      point_id: pointId,
      date,
    };

    getData('get_orders', data);

    setData();
  };

  return (
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
        <Button variant="contained" onClick={() => updateData()}>
          Обновить
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Tabs
          value={indexTab}
          TabIndicatorProps={{ style: { backgroundColor: 'inherit' } }}
          className="TabsOrders"
        >
          {pointsList.map(
            (
              item: { id: string; name: string; city_id: string },
              key: number
            ) => (
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
  );
}
