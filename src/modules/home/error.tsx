import { useHome } from './store';
import { homeState } from './types';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

export default function ErrorData() {
  //console.log('render ErrorData');

  const [errorOpen, error] = useHome((state: homeState) => [state.errorOpen, state.error]);

  return (
    <Dialog
      open={errorOpen}
      onClose={() => useHome.setState({ errorOpen: false })}
      fullWidth={true}
      className="DialogOrderCheckDialog"
    >
      <DialogTitle className="DialogOrderCheckDialogTitle">{error.title}</DialogTitle>
      <CloseIcon className="closeDialog" color="inherit" onClick={() => useHome.setState({ errorOpen: false })}/>
      <DialogContent>
        <DialogContentText>{error.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => useHome.setState({ errorOpen: false })}>Хорошо</Button>
      </DialogActions>
    </Dialog>
  );
}
