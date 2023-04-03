import { shallow } from 'zustand/shallow';

import { useHome } from './store';
import { homeState } from './types';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function CheckClear() {
  console.log('render CheckClear');

  const [checkClear, clear] = useHome((state: homeState) => [state.checkClear, state.clear], shallow);

  return (
    <Dialog onClose={ () => {} } open={checkClear}>
    <DialogTitle>Точно очистить ?</DialogTitle>
    <List sx={{ pt: 0, pb: 0 }}>
      
      <ListItemButton onClick={() => useHome.setState({ checkClear: false })} className="checkClearFalse">
        <ListItemText primary={'Отмена'} />
      </ListItemButton>

      <ListItemButton onClick={clear} className="checkClearTrue">
        <ListItemText primary={'Очистить'} />
      </ListItemButton>
    
    </List>
  </Dialog>
  );
}
