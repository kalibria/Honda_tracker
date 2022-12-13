import { IUser } from 'src/user/types';

export interface IBookingInfo {
  username: string;
  bookingOwner: string;
  startTime: number;
  description: string;
  carId: string;
  id: number;
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

export interface ICalendarRide {
  [date: number]: IBookingInfo[] | null;
}

export interface IUIRideInfo {
  username: string;
  description: string;
}

export interface IUICalendar {
  date: string;
  info: IUIRideInfo;
  id: string;
}

export interface IUICalendarItems {
  datesRidesForUI: IUICalendar[];
}
