import Image from 'next/image';

import { MyTextInput, MyAlert } from '@/ui';
import { useAuth } from './store';
import { authState } from './types';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function Form() {
  //console.log('render Form');

  const [number, password, changeNumber, changePassword, login, openAlert, status, text, enter] = useAuth((state: authState) => [state.number, state.password, state.changeNumber, state.changePassword, state.login, state.openAlert, state.status, state.text, state.enter]);

  return (
    <>
      <MyAlert
        isOpen={openAlert}
        onClose={() => useAuth.setState({ openAlert: false })}
        status={status}
        text={text}
      />

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12} sm={4}>
              <Image
                alt="Жако доставка роллов и пиццы"
                src="/logo.png"
                height={1000}
                width={3700}
                style={{ height: 'auto', width: '100%' }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MyTextInput
                label={'Номер телефона'}
                value={number}
                func={(event) => changeNumber(event)}
                enter={(event) => enter(event)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MyTextInput
                label={'Пароль'}
                type={'password'}
                value={password}
                func={(event) => changePassword(event)}
                enter={(event) => enter(event)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button variant="contained" style={{ width: '100%' }} onClick={login}>Войти</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
