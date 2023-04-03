import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AlertProps } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type MyAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  status?: boolean;
  text?: string;
  location?: boolean;
};

export const MyAlert = (props: MyAlertProps) => {
  return (
    <Snackbar
      open={props.isOpen}
      autoHideDuration={30000}
      anchorOrigin={props.location ? { vertical: 'top', horizontal: 'right' } : { vertical: 'top', horizontal: 'center' }}
      onClose={props.onClose}
    >
      <Alert
        onClose={props.onClose}
        severity={props.status ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {props.status ? props.text ? props.text : 'Запрос успешно обработан!' : props.text}
      </Alert>
    </Snackbar>
  );
};
