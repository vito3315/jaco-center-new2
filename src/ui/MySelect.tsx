import { ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type SelectProps = {
  label?: string;
  value: string;
  func: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  multiple?: boolean;
  is_none?: boolean;
  data:Array<{ id: string, name: string }> | [];
}

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
