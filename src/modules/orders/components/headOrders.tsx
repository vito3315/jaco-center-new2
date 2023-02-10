import { SetStateAction, useState, useEffect } from 'react';

import { MyTextInput, MySelect, MyDatePickerNew } from '../../../ui';
import { useOrders } from '../store';
import formatDate from '../../../helpers';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export const HeadOrders = () => {
  const { citiesData } = useOrders(
    (state: any) => ({
      citiesData: state.cities,
    })
    // shallow
  );

  const [address, setAddress] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [date, setDate] = useState<Date | string>(formatDate(new Date()));
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState<string>('');

  useEffect(() => {
    setCities(citiesData);
    setCityId(citiesData[0]?.id);
  }, [citiesData]);

  console.log('render HeadOrders');

  // console.log(citiesData);

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
          // onClick={this.btnGetOrders.bind(this)}
        >
          Обновить
        </Button>
      </Grid>
    </Grid>
  );
};
