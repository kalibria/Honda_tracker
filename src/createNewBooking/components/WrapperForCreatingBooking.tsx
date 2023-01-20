import React, { useEffect, useState } from 'react';
import { CreatingNewBooking } from 'src/createNewBooking/components/CreatingNewBooking';
import { datesManager } from 'src/dates/datesTimeManager';
import { useQueryUserInfo } from 'src/services/useQueryUserInfo';

export const WrapperForCreatingBooking = () => {
  const { resultUserInfoIsSuccess, resultUserInfo } = useQueryUserInfo();

  const [firstName, setFirstName] = useState('');
  const [username, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const currentDate = datesManager.getCurrentDateTimeDayJs();
  const currentTime = datesManager.getCurrentDateTimeDayJs();
  const [availableCars, setAvailableCars] = useState<string[]>(['']);

  useEffect(() => {
    if (resultUserInfoIsSuccess) {
      setFirstName(resultUserInfo.firstName);
      setUserName(resultUserInfo.username);
      setIsLoading(false);
      setAvailableCars(
        [...resultUserInfo.availableCars].sort((a: string, b: string) =>
          a.localeCompare(b),
        ),
      );
    }
  }, [resultUserInfoIsSuccess, resultUserInfo]);
  return (
    <CreatingNewBooking
      firstName={firstName}
      isLoading={isLoading}
      currentDate={currentDate}
      currentTime={currentTime}
      availableCars={availableCars}
      nickname={username}></CreatingNewBooking>
  );
};
