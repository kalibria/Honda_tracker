import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useLazyGetBookingsQuery } from 'src/services/hondaApi';
import { IUser } from 'src/user/types';

export interface IBookingInfo {
  username: string;
  startTime: string;
  description: string;
}

export interface IRTKQueryBookingResponse {
  bookingDescription: string;
  bookingOwner: IUser;
  bookingOwnerId: string;
  bookingStartTime: string;
  carNumber: string;
}

export const BookingInfoItems = () => {
  const selectCarId = useSelector((state: RootState) => state.userData.carId); //assume user has only one car
  const firstSelectedCar = selectCarId[0];

  const selectUsername = useSelector(
    (state: RootState) => state.userData.username,
  );

  const [trigger, data] = useLazyGetBookingsQuery();

  const [allBookingInfo, setAllBookingInfo] = useState([]);

  useEffect(() => {
    trigger({ carId: firstSelectedCar, username: selectUsername });
  }, [firstSelectedCar, selectUsername, trigger]);

  useEffect(() => {
    if (data.isSuccess) {
      const bookingRides = data.currentData.bookings.reduce(
        (accum: IBookingInfo[], item: IRTKQueryBookingResponse) => {
          let tripInfo: IBookingInfo = {
            username: item.bookingOwner.firstName,
            startTime: item.bookingStartTime,
            description: item.bookingDescription,
          };
          accum.push(tripInfo);

          return accum;
        },
        [],
      );
      setAllBookingInfo(bookingRides);
    }
  }, [data.currentData, data.isSuccess]);

  console.log('allBookingInfo', allBookingInfo);

  return <li>booking info</li>;
};
