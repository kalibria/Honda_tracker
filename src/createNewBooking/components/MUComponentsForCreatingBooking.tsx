import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {
  IDatePicker,
  IResponsiveTimePickers,
} from 'src/createNewBooking/bookingTypes';
import { datesManager } from 'src/dates/datesTimeManager';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

const locales = ['en', 'fr', 'de', 'ru', 'ar-sa'] as const;

export function ResponsiveStartDatePicker({
  name,
  label,
  ...props
}: IDatePicker) {
  const currentDate = datesManager.getCurrentDate();

  const [locale] = React.useState<typeof locales[number]>('ru');

  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
    dayjs(currentDate),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <Stack spacing={3}>
        <MobileDatePicker
          label={label}
          value={datePickerValue}
          onChange={(newValue) => {
            props.setFieldValue('startDate', newValue);
            setDatePickerValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          inputFormat={'DD/MM/YYYY'}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export function ResponsiveEndDatePicker({
  name,
  label,
  ...props
}: IDatePicker) {
  const newEndDate = props.values.startDate;

  const [locale] = React.useState<typeof locales[number]>('ru');

  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
    null,
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <Stack spacing={3}>
        <MobileDatePicker
          label={label}
          value={datePickerValue || newEndDate}
          onChange={(newDate) => {
            props.setFieldValue('endDate', newDate);
            setDatePickerValue(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
          inputFormat={'DD/MM/YYYY'}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export function ResponsiveTimePickers({
  name,
  label,
  ...props
}: IResponsiveTimePickers) {
  const currentDate = datesManager.getCurrentDateTime();

  const [locale] = React.useState<typeof locales[number]>('ru');

  const [timePickerValue, setTimePickerValue] = React.useState<Dayjs | null>(
    dayjs(currentDate),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <Stack spacing={3}>
        <MobileTimePicker
          label={label}
          value={timePickerValue}
          onChange={(newValue) => {
            setTimePickerValue(newValue);
            props.setFieldValue(name, newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export function ResponsiveTimePickersEndTime({
  name,
  label,
  newTime,
  ...props
}: IResponsiveTimePickers) {
  const [locale] = React.useState<typeof locales[number]>('ru');

  const endTime = datesManager.addHours(props.values.startTime, 2);

  const [timePickerValue, setTimePickerValue] = React.useState<Dayjs | null>(
    null,
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <Stack spacing={3}>
        <MobileTimePicker
          label={label}
          value={timePickerValue || endTime}
          onChange={(newValue) => {
            props.setFieldValue('endTime', newValue);
            setTimePickerValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
