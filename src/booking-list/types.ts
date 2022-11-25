import { IUser } from 'src/user/types';

export interface IBookingInfo {
  username: string;
  startTime: number;
  description: string;
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

export interface INewRide {
  date: string;
  info: IRideInfoWithFormattingDates;
}

export interface IRidesWithKeys {
  date: string;
  info: IRideInfoWithFormattingDates;
}
