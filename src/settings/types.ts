import { FieldHookConfig } from 'formik';

export interface ISwitchesGroup {
  note1: string;
  // valueIsChanged: boolean;
  // valueIsCreated: boolean;
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

export interface ISettings {
  rideCompletionText: string;
  notifications: {
    getNotifiedAboutBookingChanges: boolean;
    getNotifiedAboutNewBookings: boolean;
  };
}
