import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import React from 'react';
import Button from '@mui/material/Button';
import {
  IAlertForm,
  IButtonEl,
  MyCheckboxProps,
  MyTextInputProps,
} from 'src/auth/auth.types';

export const MyTextInput: React.FC<MyTextInputProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField label={label} {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
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
