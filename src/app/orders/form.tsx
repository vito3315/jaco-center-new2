'use client';

import { SetStateAction, useState, useEffect, useCallback } from 'react';

import { MyTextInput, MySelect, MyDatePickerNew } from '../../ui';

import { useOrders } from './store';
import formatDate from '../../lib';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TableData } from './table';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type Data = {
  point_id: number | string;
  date: Date | string;
};

export const Form = () => {
  const citiesData = useOrders((state: any) => state.cities);
  const points = useOrders((state: any) => state.points);
  const getDataTable = useOrders((state: any) => state.getDataTable);

  const [address, setAddress] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [date, setDate] = useState<Date | string>(formatDate(new Date()));
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState<string>('');
  const [pointId, setPointId] = useState<number | string>(0);
  const [pointsList, setPointsList] = useState([]);
  const [indexTab, setIndexTab] = useState<number>(0);

  const getOrders = useCallback(
    (point_id: number | string, indexTab: number) => {
      // console.log(point_id);
      // console.log(indexTab);

      setNumber('');
      setAddress('');
      setIndexTab(indexTab);
      setPointId(point_id);

      const data: Data = {
        point_id,
        date: date,
      };

      // console.log(data);

      getDataTable('get_orders', data);
    },
    [date, getDataTable]
  );

  useEffect(() => {
    const pointsList = points.filter(
      (item: { city_id: string }) =>
        parseInt(item.city_id) == parseInt(citiesData[0].id)
    );

    getOrders(pointsList[0]?.id, 0);

    setPointsList(pointsList);
    setPointId(pointsList[0]?.id);
    setCities(citiesData);
    setCityId(citiesData[0]?.id);
  }, [citiesData, getOrders, points]);

  console.log('render Form');

  // console.log(points);

  const changeAddress = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setAddress(event.target.value);

    // setTimeout( () => {
    //   filterNumber();
    // }, 300 )
  };

  const changeNumber = (event: { target: { value: string } }) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');

    if (onlyNums.length < 11) {
      setNumber(onlyNums);
    }

    if (onlyNums.length === 11) {
      const number = onlyNums.replace(
        /(\8)(\d{3})(\d{3})(\d{2})(\d{2})/gi,
        '$1 ($2) $3 $4-$5'
      );
      setNumber(number);
    }

    // setTimeout( () => {
    //   this.filterNumber();
    // }, 300 )
  };

  const changeCity = (event: { target: { value: SetStateAction<string> } }) => {
    setNumber('');
    setAddress('');

    setCityId(event.target.value);

    // let data = event.target.value;

    // let need_points = this.state.point_list.filter( (item, key) => parseInt(item.city_id) == parseInt(data) );

    // this.setState({
    //   city_id: data,
    //   need_point_list: need_points,
    //   point_id: parseInt(need_points[0].id),
    //   indexTab: 0
    // })

    //setTimeout( () => {
    // this.getOrders(parseInt(need_points[0].id), 0);
    //}, 300 )

    // let res = await this.getData('get_center_all');

    // this.setState({
    //   allItems: res.all_items
    // })
  };

  const changeDate = (value: string | Date | null) => {
    setNumber('');
    setAddress('');

    setDate(value ? formatDate(value) : '');

    // setTimeout( () => {
    //   this.getOrders(this.state.point_id, this.state.indexTab);
    // }, 300 )
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <MySelect
          is_none={false}
          data={cities}
          value={cityId}
          func={changeCity}
          label="Город"
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
        <Button
          variant="contained"
          onClick={() => getOrders(pointId, indexTab)}
        >
          Обновить
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Tabs
          value={indexTab}
          TabIndicatorProps={{
            style: {
              backgroundColor: 'inherit',
            },
          }}
          className="TabsOrders"
        >
          {pointsList.map((item: any, key: number) => (
            <Tab
              key={key}
              label={item.name}
              onClick={() => getOrders(parseInt(item.id), key)}
              {...a11yProps(parseInt(item.id))}
            />
          ))}
        </Tabs>
      </Grid>

      <TableData number={number} address={address} />
    </Grid>
  );
};
