import TextField from '@mui/material/TextField';
import { FieldHookConfig, useField } from 'formik';
import React from 'react';

interface MyTextInputProps {
  label: string;
  name: string;
  [key: string]: string | FieldHookConfig<any>;
}

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

interface MyCheckboxProps {
  name: string;
  [key: string]: string | FieldHookConfig<any>;
}

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
