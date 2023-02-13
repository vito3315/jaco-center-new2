import { ChangeEvent, FocusEvent } from 'react';
import TextField from '@mui/material/TextField';

type TextInputProps = {
  label?: string;
  value: string | number;
  func: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  multiline?: boolean;
  maxRows?: number;
  type?: string;
}

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
