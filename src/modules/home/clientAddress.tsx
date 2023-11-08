import { useHome } from './store';
import { homeState } from './types';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function ClientAddress() {
  //console.log('render ClientAddress');

  const [clientAddr, chooseAddr, chooseAddrFull] = useHome((state: homeState) => [state.clientAddr, state.chooseAddr, state.chooseAddrFull]);

  return (
    <List component="nav" aria-label="main mailbox folders" style={{ maxHeight: 150, overflow: 'auto' }}>
      {/* Адрес клиента */}
      {clientAddr.map((item: any, key: number) => (
        <ListItemButton key={key} selected={chooseAddr === key} onClick={() => chooseAddrFull(item, key)} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <ListItemText primary={item.street + ' ' + item.home + (item.pd.length == 0 ? '' : ', Пд. ' + item.pd) + (item.et.length == 0 ? '' : ', Эт. ' + item.et) + (item.kv.length == 0 ? '' : ', Кв. ' + item.kv)} />
        </ListItemButton>
      ))}
      {/* Адрес клиента */}
    </List>
  );
}
