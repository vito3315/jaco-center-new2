import { SyntheticEvent, FocusEvent } from 'react';

import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

type AutocompliteProps = {
  label?: string;
  placeholder?: string;
  data: any;
  id?: string;
  value?: string | string[] | (string | string[])[] | null;
  freeSolo?: boolean;
  multiple?: boolean;
  type?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  func: ((event: SyntheticEvent<Element, Event>, value: string | string[] | (string | string[])[] | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any>) => void);
}

export const MyAutocomplite = (props: AutocompliteProps) => {

    if(props.id && props.id == 'promoName'){
      return (
        <Stack spacing={3}>
          <Autocomplete
            freeSolo={props.freeSolo ? props.freeSolo : false}
            size="small"
            disableCloseOnSelect={true}
            onBlur={props.onBlur}
            id={props.id ?? null}
            options={ props.type && props.type == 'MyPromos' ? props.data.map((option: { promo: any; }) => option.promo) : props.data}
            value={props.value}
            onChange={props.func}
            filterSelectedOptions
            multiple={props.multiple && props.multiple === true ? true : false }
            renderInput={(params) => (
              <TextField
                {...params}
                label={props.label}
                placeholder={props.placeholder}
              />
            )}
          />
        </Stack>
      )
    }

      return (
        <Stack spacing={3}>
          <Autocomplete
            freeSolo={ props.freeSolo ? props.freeSolo : false }
            size="small"
            onBlur={props.onBlur}
            id={props.id}
            options={props.data.map((option: { name: any; }) => option.name)}
            value={props.value}
            onChange={props.func}
            multiple={ props.multiple && props.multiple === true ? true : false }
            isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label={props.label}
                placeholder={props.placeholder}
              />
            )}
          />
        </Stack>
      )
    

  }

