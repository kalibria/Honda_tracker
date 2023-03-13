import { FieldHookConfig } from 'formik';
import React from 'react';
import { bool } from 'yup';

export interface IHandleQueryResult {
  isSuccess: boolean;
  isError: boolean;
  errorMsg: string;
  errorCode: number;
}

export interface MyTextInputProps {
  label: string;
  name: string;
  [key: string]: string | boolean | FieldHookConfig<any>;
}

export interface MyTextInputWithBorderProps {
  label: string;
  name: string;
  id: string;
  disabled?: boolean;
  value?: string;
  loading: boolean;
  onChange?: (e: React.ChangeEvent<any>) => void;
}

export interface MyCheckboxProps {
  name: string;
  [key: string]: string | FieldHookConfig<any>;
}

export interface MySelectProps {
  label: string;
  name: string;
  id: string;
  data?: string[];
  value?: string;
}

export interface IAlertForm {
  message: string;
}

export interface IButtonEl {
  text: string;
  onClick?: () => void;
  size?: string;
}
