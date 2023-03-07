import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IBookingInfo, IRTKQueryBookingResponse } from 'src/booking-list/types';
import { useLazyGetBookingsQuery } from 'src/services/hondaApi';
import { useQueryUserInfo } from 'src/services/useQueryUserInfo';

export const useBookingRides = () => {
  const { resultUserInfoIsSuccess, resultUserInfo } = useQueryUserInfo();
  const [trigger, data] = useLazyGetBookingsQuery();

  const dispatch = useDispatch();

  const [allBookingInfo, setAllBookingInfo] = useState<IBookingInfo[]>([]);

  useEffect(() => {
    if (resultUserInfoIsSuccess) {
      trigger({
        carId: resultUserInfo.availableCars[0],
        username: resultUserInfo.username,
      });
    }
  }, [resultUserInfoIsSuccess, resultUserInfo, trigger]);

  useEffect(() => {
    if (data.isSuccess) {
      const bookingRides = data.data.bookings.reduce(
        (accum: IBookingInfo[], item: IRTKQueryBookingResponse) => {
          let tripInfo: IBookingInfo = {
            username: item.bookingOwner.firstName,
            bookingOwner: item.bookingOwnerId,
            startTime: Date.parse(item.bookingStartTime),
            description: item.bookingDescription,
            carId: item.carNumber,
            id: Date.parse(item.bookingStartTime) / 1000, //id in seconds
            isFinished: item.isFinished,
          };
          accum.push(tripInfo);

          return accum;
        },
        [],
      );
      setAllBookingInfo(bookingRides);
    }
  }, [data.data, data.isSuccess, dispatch]);

  return allBookingInfo;
};
