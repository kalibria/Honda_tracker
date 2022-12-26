import { PickerStateProps } from '@mui/x-date-pickers/internals/hooks/usePickerState';
import { FormikHandlers, FormikProps, FormikValues } from 'formik';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { InitialValues } from 'src/createNewBooking/components/CreatingNewBooking';
import { datesManager } from 'src/dates/datesTimeManager';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

interface IMUComponentsForCreatingBooking {
  name: string;
  label: string;
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T,
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}

const locales = ['en', 'fr', 'de', 'ru', 'ar-sa'] as const;

export default function MUComponentsForCreatingBooking({
  name,
  label,
  onChange,
}: IMUComponentsForCreatingBooking) {
  const currentDate = datesManager.getCurrentDate();

  const [locale, setLocale] = React.useState<typeof locales[number]>('ru');

  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
    dayjs(currentDate),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <Stack spacing={3}>
        <MobileDatePicker
          label={label}
          value={datePickerValue}
          onChange={(newValue) => setDatePickerValue(newValue)}
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

interface IResponsiveTimePickers extends FormikProps<InitialValues> {
  name: string;
  label: string;
  newTime?: string;
}

export function ResponsiveTimePickers({
  name,
  label,
  ...props
}: IResponsiveTimePickers) {
  const currentDate = datesManager.getCurrentDateTime();

  const [locale, setLocale] = React.useState<typeof locales[number]>('ru');

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
        {/*<DesktopTimePicker*/}
        {/*  label="For desktop"*/}
        {/*  value={value}*/}
        {/*  onChange={(newValue) => {*/}
        {/*    setValue(newValue);*/}
        {/*  }}*/}
        {/*  renderInput={(params) => <TextField {...params} />}*/}
        {/*/>*/}
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
  const [locale, setLocale] = React.useState<typeof locales[number]>('ru');

  const endTime = datesManager.addHours(props.values.startTime, 2);

  const [timePickerValue, setTimePickerValue] = React.useState<Dayjs | null>(
    null,
    // dayjs(newTime)
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <Stack spacing={3}>
        <MobileTimePicker
          label={label}
          value={timePickerValue || endTime}
          onChange={(newTime) => {
            props.setFieldValue('endTime', newTime);
            setTimePickerValue(newTime);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        {/*<DesktopTimePicker*/}
        {/*  label="For desktop"*/}
        {/*  value={value}*/}
        {/*  onChange={(newValue) => {*/}
        {/*    setValue(newValue);*/}
        {/*  }}*/}
        {/*  renderInput={(params) => <TextField {...params} />}*/}
        {/*/>*/}
      </Stack>
    </LocalizationProvider>
  );
}
