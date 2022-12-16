import { FieldHookConfig } from 'formik';

export interface IHandleQueryResult {
  isSuccess: boolean;
  isError: boolean;
  errorMsg: string;
  errorCode: number;
}

export interface MyTextInputProps {
  label: string;
  name: string;
  [key: string]: string | FieldHookConfig<any>;
}

export interface MyCheckboxProps {
  name: string;
  [key: string]: string | FieldHookConfig<any>;
}

export interface MySelectProps {
  label: string;
  name: string;
  [key: string]: string | FieldHookConfig<any>;
}

export interface IAlertForm {
  message: string;
}

export interface IButtonEl {
  text: string;
  onClick?: () => void;
  size?: string;
}
