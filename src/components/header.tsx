import { useState } from 'react';

import Link from 'next/link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

export const Header = () => {

  // if((window.location.protocol == 'http:' || window.location.protocol == 'http') && window.location.hostname != 'localhost'){
  //   window.location.href = 'https://jacocallcenter.ru'+window.location.pathname;
  // }

  // logOut(){
  // }

  // if( this.state.page == 'auth' ){
  //   return null;
  // }

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(open);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#fff' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={'left'}
        open={open}
        onClick={() => toggleDrawer(false)}
      >
        <div role="presentation">
          <Link
            href="/"
            passHref
            onClick={() => toggleDrawer(false)}
          >
            <ListItemButton style={{ color: '#000' }}>
              <Typography variant="body1">Оформить заказ</Typography>
            </ListItemButton>
          </Link>
          <Link
            href="/orders"
            passHref
            onClick={() => toggleDrawer(false)}
          >
            <ListItemButton style={{ color: '#000' }}>
              <Typography variant="body1">Список заказов</Typography>
            </ListItemButton>
          </Link>
          <Link
            href="/ordercook"
            passHref
            onClick={() => toggleDrawer(false)}
          >
            <ListItemButton style={{ color: '#000' }}>
              <Typography variant="body1">Заказы на кухне</Typography>
            </ListItemButton>
          </Link>

          <Link
            href="/check_user_promo"
            passHref
            onClick={() => toggleDrawer(false)}
          >
            <ListItemButton style={{ color: '#000' }}>
              <Typography variant="body1">
                Проверка промокода клиента
              </Typography>
            </ListItemButton>
          </Link>

          <Link
            href="/map"
            passHref
            onClick={() => toggleDrawer(false)}
          >
            <ListItemButton style={{ color: '#000' }}>
              <Typography variant="body1">Карта</Typography>
            </ListItemButton>
          </Link>

          <Divider />
          <List>
            <ListItemButton
            //onClick={this.logOut.bind(this)}
            >
              <ListItemText primary={'Выйти'} />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
    </Box>
  );
};
