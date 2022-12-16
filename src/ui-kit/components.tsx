import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import React from 'react';
import {
  IAlertForm,
  MyCheckboxProps,
  MySelectProps,
  MyTextInputProps,
} from 'src/ui-kit/components.types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

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

export const MyTextInputWithBorder: React.FC<MyTextInputProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="component-outlined">{label}</InputLabel>
        <OutlinedInput
          id="component-outlined"
          defaultValue="Composed TextField"
          label={label}
          {...props}
          {...field}
        />
      </FormControl>

      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </>
  );
};

export const MySelect: React.FC<MySelectProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label={label}
          onChange={handleChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
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
