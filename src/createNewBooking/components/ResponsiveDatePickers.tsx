import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { datesManager } from 'src/dates/datesManager';

export default function ResponsiveDatePickers({ name }: { name: string }) {
  const currentDate = datesManager.getCurrentDate();

  const [value, setValue] = React.useState<Dayjs | null>(dayjs(currentDate));

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      desktopModeMediaQuery={'@media (pointer: fine)'}>
      <Stack spacing={3}>
        <MobileDatePicker
          label="Дата поездки"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          inputFormat={'DD/MM/YYYY'}
        />
        {/*<DesktopDatePicker*/}
        {/*  label="Дата поездки"*/}
        {/*  value={value}*/}
        {/*  minDate={dayjs('2017-01-01')}*/}
        {/*  onChange={(newValue) => {*/}
        {/*    setValue(newValue);*/}
        {/*  }}*/}
        {/*  renderInput={(params) => <TextField {...params} />}*/}
        {/*/>*/}
      </Stack>
    </LocalizationProvider>
  );
}
