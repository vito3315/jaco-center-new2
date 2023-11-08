import { useHome } from './store';
import { homeState, AddrChoose } from './types';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function ChooseAddress() {
  //console.log('render ChooseAddress');

  const [list_addr_choose, list_addr_for_choose, chooseAddrFunction] = useHome((state: homeState) => [state.list_addr_choose, state.list_addr_for_choose, state.chooseAddrFunction]);

  return (
    <Dialog onClose={() => useHome.setState({ list_addr_choose: false })} open={list_addr_choose}>
      <DialogTitle style={{ textAlign: 'center' }}>Выбор адреса</DialogTitle>
      <List sx={{ pt: 0 }}>
        {list_addr_for_choose.map((addr: AddrChoose, key: number) => (
          <ListItemButton key={key} onClick={() => chooseAddrFunction(addr)}>
            <ListItemText primary={addr.city_name + ', ' + (addr.city_name_dop.length > 0 ? addr.city_name_dop + ', ' : '') + addr.street + ', ' + addr.home} />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
}
