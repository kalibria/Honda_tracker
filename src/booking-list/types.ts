import { IUser } from 'src/user/types';

export interface IBookingInfo {
  username: string;
  bookingOwner: string;
  startTime: number;
  description: string;
  carId: string;
  id: number;
  isFinished: boolean;
}

export interface IStartEndDates {
  date: number;
  start: number | Date;
  end: number | Date;
}

export interface IRTKQueryBookingResponse {
  bookingDescription: string;
  bookingOwner: IUser;
  bookingOwnerId: string;
  bookingStartTime: string;
  carNumber: string;
  isFinished: boolean;
}

export interface ICalendarRide {
  [date: number]: IBookingInfo[] | null;
}

export interface IUIRideInfo {
  username: string;
  description: string;
  time: string;
  id: string;
  isFinished: boolean;
}

export interface IUICalendar {
  date: string;
  info: IUIRideInfo[];
}

export interface IUICalendarItems {
  datesRidesForUI: IUICalendar[];
}
