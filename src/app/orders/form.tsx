'use client';

import { useState, useEffect, useCallback } from 'react';

import { MyTextInput, MySelect, MyDatePickerNew } from '../../ui';
import { useOrders, ordersState, City, Point } from './store';
import { formatDate, a11yProps } from '../../lib';
import { getData } from './hooks';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

type Data = {
  point_id: number | string;
  date: Date | string;
};


export const Form = () => {
  console.log('render Form');

  const citiesData = useOrders((state: ordersState) => state.cities);
  const points = useOrders((state: ordersState) => state.points);

  const [address, setAddress] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [date, setDate] = useState<Date | string>(formatDate(new Date()));

  const [cities, setCities] = useState<City[] | []>([]);
  const [cityId, setCityId] = useState<string>('');

  const [pointId, setPointId] = useState<number | string>(0);
  const [pointsList, setPointsList] = useState<Point[] | []>([]);

  const [indexTab, setIndexTab] = useState<number>(0);

  const getOrders = useCallback((point_id?: number | string, index?: number) => {
    
    setNumber('');
    setAddress('');
    useOrders.setState({ number: '', address: '' });

    if(point_id) {
      setPointId(point_id);
    }

    if(index || index === 0) {
      setIndexTab(index);
    }

    const data: Data = {
      point_id: point_id ?? pointId,
      date,
    };

    getData('get_orders', data);

  }, [date, pointId]);

  useEffect(() => {
    const pointsList = points.filter((item: { city_id: string }) => parseInt(item.city_id) == parseInt(citiesData[0].id));
    setPointsList(pointsList);
    setPointId(pointsList[0]?.id);
    setCities(citiesData);
    setCityId(citiesData[0]?.id);
  }, [citiesData, points]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const changeAddress = (event: { target: { value: string } }) => {
    setAddress(event.target.value);
    useOrders.setState({ address: event.target.value });
  };

  const changeNumber = (event: { target: { value: string } }) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');

    if (onlyNums.length < 11) {
      setNumber(onlyNums);
    }

    if (onlyNums.length === 11) {
      const number = onlyNums.replace(/(\8)(\d{3})(\d{3})(\d{2})(\d{2})/gi, '$1 ($2) $3 $4-$5');
      setNumber(number);
    }

    useOrders.setState({ number: onlyNums });
  };

  const changeCity = (event: { target: { value: string } }) => {

    const pointsList = points.filter((item) => parseInt(item.city_id) == parseInt(event.target.value));

    setCityId(event.target.value);
    setPointsList(pointsList);
    setPointId(pointsList[0].id);
    setIndexTab(0);
  };

  const changeDate = (value: string | Date | null) => {
    setDate(value ? formatDate(value) : '');
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
        <MyTextInput label="Номер телефона" value={number} func={changeNumber} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <MyTextInput label="Адрес" value={address} func={changeAddress} />
      </Grid>

      <Grid item xs={12} sm={3}>
        <Button variant="contained" onClick={() => getOrders()}>
          Обновить
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Tabs
          value={indexTab}
          TabIndicatorProps={{ style: { backgroundColor: 'inherit' }}}
          className="TabsOrders"
        >
          {pointsList.map((item: { id: string; name: string; city_id: string }, key: number) => (
              <Tab
                key={key}
                label={item.name}
                onClick={() => getOrders(parseInt(item.id), key)}
                {...a11yProps(parseInt(item.id))}
              />
            )
          )}
        </Tabs>
      </Grid>
    </Grid>
  );
};
