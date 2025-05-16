import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import dayjs from 'dayjs';

export default function DatePicker({value, setData}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateTimePicker
    value={dayjs(value || new Date())}
    label="Pick date and time"
    onChange={value => setData((prev)=>({...prev, "date_happened": value})) }
    />
    </LocalizationProvider>
  )
}