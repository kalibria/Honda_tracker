import React, { useEffect, useState } from 'react';
import { CreatingNewBooking } from 'src/createNewBooking/components/CreatingNewBooking';
import { datesManager } from 'src/dates/datesManager';
import { useGetMeQuery, useLazyGetUserQuery } from 'src/services/hondaApi';

export const WrapperForCreatingBooking = () => {
  const { data, isSuccess, isError } = useGetMeQuery({});
  const [trigger, result] = useLazyGetUserQuery();
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const currentDate = datesManager.getCurrentDate();
  const currentTime = datesManager.getCurrentTime();

  useEffect(() => {
    if (isSuccess) {
      trigger(data.username);
    }
  }, [data, isSuccess, trigger]);

  useEffect(() => {
    if (result.isSuccess) {
      setFirstName(result.currentData.user.firstName);
      setIsLoading(false);
    }
  }, [result]);
  return (
    <CreatingNewBooking
      firstName={firstName}
      isLoading={isLoading}
      currentDate={currentDate}
      currentTime={currentTime}></CreatingNewBooking>
  );
};
