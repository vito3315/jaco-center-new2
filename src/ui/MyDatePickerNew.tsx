import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

import ruLocale from 'date-fns/locale/ru';

import { formatDate } from '../lib';

type DatePickerProps = {
  label?: string;
  value: Date | string;
  // func: (value: string | Date | null, keyboardInputValue?: string | undefined) => void;
  func: (value: string | Date | null) => void;
}

export const MyDatePickerNew = (props: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
      <DatePicker
        mask="____-__-__"
        inputFormat="yyyy-MM-dd"
        label={props.label}
        value={formatDate(props.value)}
        onChange={props.func}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            size={'small'}
            color="primary"
            style={{ width: '100%' }}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
};
