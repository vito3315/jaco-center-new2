import { ChangeEvent, FocusEvent, ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

export interface TextInputProps {
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

export interface SelectProps {
  label?: string;
  value: string;
  func: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  multiple?: boolean;
  is_none?: boolean;
  data:Array<{ id: string, name: string }> | [];
}

export interface DatePickerProps {
  label?: string;
  value: Date | string;
  func: (value: string | Date | null, keyboardInputValue?: string | undefined) => void
}


