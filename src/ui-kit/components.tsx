import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import React from 'react';
import { datesManager } from 'src/dates/datesManager';
import {
  IAlertForm,
  MyCheckboxProps,
  MySelectProps,
  MyTextInputProps,
  MyTextInputWithBorderProps,
} from 'src/ui-kit/components.types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { Loading } from 'src/ui-kit/Loading';

export const MyTextInput: React.FC<MyTextInputProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField fullWidth id="fullWidth" label={label} {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </>
  );
};

export const MyTextInputWithBorder: React.FC<MyTextInputWithBorderProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  console.log('props', props);
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="component-outlined">{label}</InputLabel>
        <OutlinedInput
          {...field}
          id="component-outlined"
          label={label}
          startAdornment={
            props.loading && (
              <InputAdornment position="start">
                <Loading />
              </InputAdornment>
            )
          }
        />
      </FormControl>

      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </>
  );
};

export const MySelect: React.FC<MySelectProps> = ({
  label,
  dates,
  ...props
}) => {
  const [field, meta] = useField(props);

  const menuItems = dates?.map((item, index) => {
    return (
      <MenuItem key={index} value={item}>
        {item}
      </MenuItem>
    );
  });

  const [data, setData] = React.useState(props.name);

  const handleChange = (event: SelectChangeEvent) => {
    setData(event.target.value);
  };
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label={label}
          {...field}>
          {menuItems}
        </Select>
      </FormControl>
    </>
  );
};

export const MyCheckbox: React.FC<MyCheckboxProps> = ({
  children,
  ...props
}) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label>
        <>
          <input type="checkbox" {...field} {...props} className="mr-1.5" />
          {children}
        </>
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const AlertForm: React.FC<IAlertForm> = ({ message }: IAlertForm) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};
