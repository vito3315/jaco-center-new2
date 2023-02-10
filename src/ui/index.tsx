import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import TextField from '@mui/material/TextField';

// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

// import Autocomplete from '@mui/material/Autocomplete';
// import Stack from '@mui/material/Stack';

import ruLocale from 'date-fns/locale/ru';

// import DateRangePicker from '@mui/lab/DateRangePicker';
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import Typography from '@mui/material/Typography';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import formatDate from '../helpers';

import { TextInputProps, SelectProps, DatePickerProps } from './types';

export const MyTextInput = (props: TextInputProps) => {
  const type = 'text';

  return (
    <TextField
      label={props.label}
      value={props.value}
      onChange={props.func}
      onBlur={props.onBlur}
      // onBlur={props.onBlur ? props.onBlur : null}
      disabled={props.disabled ? true : false}
      variant="outlined"
      size={'small'}
      color="primary"
      autoComplete="off"
      placeholder={props.placeholder ? props.placeholder : ''}
      multiline={props.multiline ? props.multiline : false}
      maxRows={props.maxRows ? props.maxRows : 1}
      type={props.type ? props.type : type}
      style={{ width: '100%' }}
    />
  );
};

export const MySelect = (props: SelectProps) => {
  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value}
        label={props.label}
        onChange={props.func}
        multiple={props.multiple && props.multiple === true ? true : false}
      >
        {props.is_none === false ? null : (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {props.data.map((item: { id: string; name: string }, key: number) => (
          <MenuItem key={key} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

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
