import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { hondaApi, useLazyGetBookingsQuery } from 'src/services/hondaApi';

export const BookingInfoItems = () => {
  const selectCarId = useSelector((state: RootState) => state.userData.carId); //assume user has only one car
  const firstSelectedCar = selectCarId[0];

  const selectUsername = useSelector(
    (state: RootState) => state.userData.username,
  );

  const [trigger, data] = useLazyGetBookingsQuery();

  useEffect(() => {
    console.log('carId', firstSelectedCar);
    console.log('username', selectUsername);
    trigger({ carId: firstSelectedCar, username: selectUsername });
  }, [firstSelectedCar, selectUsername, trigger]);

  return <li>booking info</li>;
};
