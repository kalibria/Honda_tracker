import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IBookingInfo, IRTKQueryBookingResponse } from 'src/booking-list/types';
import { setBookingsInfo } from 'src/redux/bookingSlice';
import { RootState } from 'src/redux/store';
import { useLazyGetBookingsQuery } from 'src/services/hondaApi';

export const useBookingRides = () => {
  const selectCarId = useSelector((state: RootState) => state.userData.carId);
  const firstSelectedCar = selectCarId[0]; //assume user has only one car

  const selectUsername = useSelector(
    (state: RootState) => state.userData.username,
  );

  const [trigger, data] = useLazyGetBookingsQuery();

  const dispatch = useDispatch();

  const [allBookingInfo, setAllBookingInfo] = useState<IBookingInfo[]>([]);

  useEffect(() => {
    trigger({ carId: firstSelectedCar, username: selectUsername });
  }, [firstSelectedCar, selectUsername, trigger]);

  useEffect(() => {
    if (data.isSuccess) {
      dispatch(setBookingsInfo(data.currentData));

      const bookingRides = data.currentData.bookings.reduce(
        (accum: IBookingInfo[], item: IRTKQueryBookingResponse) => {
          let tripInfo: IBookingInfo = {
            username: item.bookingOwner.firstName,
            startTime: Date.parse(item.bookingStartTime),
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

  return allBookingInfo;
};
