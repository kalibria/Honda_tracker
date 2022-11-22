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
