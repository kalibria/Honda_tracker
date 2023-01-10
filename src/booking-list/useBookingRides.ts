import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IBookingInfo, IRTKQueryBookingResponse } from 'src/booking-list/types';
import { setBookingsInfo } from 'src/redux/bookingSlice';
import {
  useGetMeQuery,
  useLazyGetBookingsQuery,
  useLazyGetUserQuery,
} from 'src/services/hondaApi';

export const useBookingRides = () => {
  const { data: meData, isSuccess } = useGetMeQuery({});
  const [triggerUserInfo, resultUserInfo] = useLazyGetUserQuery();

  const [trigger, data] = useLazyGetBookingsQuery();

  const dispatch = useDispatch();

  const [allBookingInfo, setAllBookingInfo] = useState<IBookingInfo[]>([]);

  useEffect(() => {
    if (isSuccess) {
      triggerUserInfo(meData.username);
    }
  }, [isSuccess, meData, triggerUserInfo]);

  useEffect(() => {
    if (resultUserInfo.isSuccess) {
      trigger({
        carId: resultUserInfo.currentData.user.availableCars[0],
        username: resultUserInfo.currentData.user.username,
      });
    }
  }, [resultUserInfo.currentData, resultUserInfo.isSuccess, trigger]);

  useEffect(() => {
    if (data.isSuccess) {
      const bookingRides = data.currentData.bookings.reduce(
        (accum: IBookingInfo[], item: IRTKQueryBookingResponse) => {
          let tripInfo: IBookingInfo = {
            username: item.bookingOwner.firstName,
            bookingOwner: item.bookingOwnerId,
            startTime: Date.parse(item.bookingStartTime),
            description: item.bookingDescription,
            carId: item.carNumber,
            id: Date.parse(item.bookingStartTime) / 1000, //id in seconds
          };
          accum.push(tripInfo);

          return accum;
        },
        [],
      );
      setAllBookingInfo(bookingRides);
      dispatch(setBookingsInfo(bookingRides));
    }
  }, [data.currentData, data.isSuccess, dispatch]);

  return allBookingInfo;
};
