import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';

type DatePickerProps = {
  label?: string;
  value: any;
  func: (value: string | Date | null) => void;
}

export const MyDatePickerNew = (props: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DatePicker
        format="YYYY-MM-DD"
        label={props.label}
        value={props.value}
        onChange={props.func}
        slotProps={{
          textField: { size: "small" }
        }}
        className={'datePicker'}
      />
    </LocalizationProvider>
  );
};
