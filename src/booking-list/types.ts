import { IUser } from 'src/user/types';

export interface IBookingInfo {
  username: string;
  startTime: number;
  description: string;
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
}

export interface IRideInfoWithFormattingDates {
  username: string;
  startDate: string;
  startTime: number;
  description: string;
}

export interface IConnectedDatesAndRides {
  date: string;
  rideInfo: IRideInfoWithFormattingDates | null;
}

export interface ICalendarRide {
  [date: number]: IBookingInfo[] | null;
}

export interface IRidesWithKeys {
  [key: string]: IRideInfoWithFormattingDates;
}

export interface IUIRideInfo {
  username: string;
  description: string;
}

export interface IUICalendar {
  date: string;
  info: IUIRideInfo;
}
