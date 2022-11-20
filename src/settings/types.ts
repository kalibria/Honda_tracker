import { FieldHookConfig } from 'formik';

export interface ISwitchesGroup {
  note1: string;
  note2: string;
  title: string;
  isCreatedFieldName: string;
  isChangedFieldName: string;
}

export interface IBasicTextFields {
  label: string;
  name: string;
  [key: string]: string | FieldHookConfig<any>;
}
