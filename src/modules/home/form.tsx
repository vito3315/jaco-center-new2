import React from 'react';

import { MyTextInput, MySelect, MyAutocomplite } from '@/ui';
import { a11yProps } from '@/lib';
import { useHome } from './store';
import { homeState } from './types';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloseIcon from '@mui/icons-material/Close';

export default function Form() {
  //console.log('render Form');

  const [cityId, cityList, changeCity, checkPromo, MyPromos, promo_name, orderPromoText, promoST, saveNumber, number, changeNumber, activeTab, changeTab] = useHome((state: homeState) => 
    [state.cityId, state.cityList, state.changeCity, state.checkPromo, state.MyPromos, state.promo_name, state.orderPromoText, state.promoST, state.saveNumber, state.number, state.changeNumber, state.activeTab, state.changeTab]);

  return (

    <AppBar style={{ backgroundColor: 'transparent', position: 'absolute', overflow: 'hidden', width: 'calc(100% - 50px)', left: 50, zIndex: 5 }} elevation={0}>
    <Toolbar >
      <Grid container spacing={3}>

        <Grid item xs={2}>
          <MySelect is_none={false} data={cityList} value={cityId} func={changeCity} label='Город' />
        </Grid>

        <Grid item xs={2}>
          <MyAutocomplite 
            id="promoName" 
            onBlur={checkPromo} 
            freeSolo={true} 
            type={'MyPromos'}
            data={MyPromos}
            value={promo_name} 
            func={(event, val) => useHome.setState({ promo_name: val })} 
            multiple={false} 
            label='Промокод' 
          />
        </Grid>

        <Grid item xs={1}>
          <ButtonGroup disableElevation variant="contained">

            {orderPromoText.length == 0 ?
              <Button style={{ height: 40, backgroundColor: '#bababa' }}> <QuestionMarkIcon /> </Button>
                :
              <Tooltip 
                placement="bottom"
                title={
                  <React.Fragment>
                    <Typography color="inherit">{orderPromoText}</Typography>
                  </React.Fragment>
                }>
                <Button variant="contained" color="primary" style={{ height: 40, backgroundColor: promoST === false && orderPromoText.length == 0 ? '#bababa' : promoST === false && orderPromoText.length > 0 ? 'red' : 'green' }}> <QuestionMarkIcon /> </Button>
              </Tooltip>
            }
            
            <Button style={{ height: 40 }} onClick={() => useHome.setState({ checkClear: true })}> <CloseIcon /> </Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={2}>
          <MyTextInput onBlur={saveNumber} value={number} func={changeNumber} placeholder={"8 (999) 999-99-99"} label='Телефон'/>
        </Grid>

        <Grid item xs={1}>
        </Grid>

        <Grid item xs={4}>

          <AppBar position="static" style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' }}>
            <Tabs value={activeTab} onChange={changeTab} indicatorColor="secondary" variant="fullWidth" style={{ height: 40, minHeight: 40 }}>
              
              <Tab label={'Доставка'} style={{ minWidth: 'auto', height: 40, minHeight: 40 }} {...a11yProps(0)} />
              <Tab label={'Самовывоз'} style={{ minWidth: 'auto', height: 40, minHeight: 40 }} {...a11yProps(1)} />
              <Tab label={'Адрес клиента'} style={{ minWidth: 'auto', height: 40, minHeight: 40 }} {...a11yProps(2)} />
              
            </Tabs>
          </AppBar>

        </Grid>

      </Grid>
    </Toolbar>
  </AppBar>
  );
}
