import React, { useEffect, useState } from 'react';
import { CreatingNewBooking } from 'src/createNewBooking/components/CreatingNewBooking';
import { defaultCar } from 'src/createNewBooking/constantCreateNewBooking';
import { datesManager } from 'src/dates/datesTimeManager';
import { useGetMeQuery, useLazyGetUserQuery } from 'src/services/hondaApi';

export const WrapperForCreatingBooking = () => {
  const { data, isSuccess } = useGetMeQuery({});
  const [trigger, result] = useLazyGetUserQuery();
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const currentDate = datesManager.getCurrentDate();
  const currentTime = datesManager.getCurrentTime();
  const [availableCars, setAvailableCars] = useState<string[]>([defaultCar]);

  useEffect(() => {
    if (isSuccess) {
      trigger(data.username);
    }
  }, [data, isSuccess, trigger]);

  useEffect(() => {
    if (result.isSuccess) {
      setFirstName(result.currentData.user.firstName);
      setIsLoading(false);
      setAvailableCars(
        result.currentData.user.availableCars.sort((a: string, b: string) =>
          a.localeCompare(b),
        ),
      );
    }
  }, [result]);
  return (
    <CreatingNewBooking
      firstName={firstName}
      isLoading={isLoading}
      currentDate={currentDate}
      currentTime={currentTime}
      availableCars={availableCars}></CreatingNewBooking>
  );
};
