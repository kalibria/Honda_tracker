import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import React from 'react';
import {
  IAlertForm,
  MySelectProps,
  MyTextInputProps,
  MyTextInputWithBorderProps,
} from 'src/ui-kit/components.types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="component-outlined">{label}</InputLabel>
        <OutlinedInput
          {...field}
          id="component-outlined"
          label={label}
          disabled={props.disabled}
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
  data,
  ...props
}) => {
  const [field] = useField(props);
  const menuItems = data?.map((item, index) => {
    return (
      <MenuItem key={index} value={item}>
        {item}
      </MenuItem>
    );
  });

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label={label}
          {...field}
          value={field.value}>
          {menuItems}
        </Select>
      </FormControl>
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
