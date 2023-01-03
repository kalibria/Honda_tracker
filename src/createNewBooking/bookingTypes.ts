import { Dayjs } from 'dayjs';
import { FormikProps } from 'formik';

export interface InitialValues {
  driver: string;
  startDate: Dayjs;
  startTime: Dayjs;
  endDate?: Dayjs;
  endTime?: Dayjs;
  car: string[];
  description: string;
}
export interface ICreatingNewBooking {
  firstName: string;
  isLoading: boolean;
  currentDate: Dayjs;
  currentTime: Dayjs;
  availableCars: string[];
  nickname: string;
}

export interface IDatePicker extends FormikProps<InitialValues> {
  name: string;
  label: string;
  newDate?: Dayjs;
}

export interface IResponsiveTimePickers extends FormikProps<InitialValues> {
  name: string;
  label: string;
  newTime?: string;
}

export interface IBookingRequest {
  username: string;
  carId: string[];
  startDateTime: number;
  endDateTime: number;
  description: string;
}
