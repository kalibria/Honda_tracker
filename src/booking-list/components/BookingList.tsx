import React from 'react';
import { useSelector } from 'react-redux';
import { CalendarItemsWrapper } from 'src/booking-list/components/CalendarItemsWrapper';
import { driverRole } from 'src/booking-list/constants';
import { ButtonUI } from 'src/commonComponents/ButtonUI';
import { RootState } from 'src/redux/store';

export const BookingList = () => {
  const selectUserRole = useSelector((state: RootState) => state.userData.role);

  const isDriverRole = selectUserRole.includes(driverRole);
  const createNewRide = () => {};

  return (
    <div className={'bookingPage'}>
      {isDriverRole && (
        <div className={'button'}>
          <ButtonUI onClick={createNewRide}>{'Создать поездку'}</ButtonUI>
        </div>
      )}
      <div className={'bookingWrapper'}>
        <div className={'bookingHeader cellDecoration'}>Список поездок</div>
        <CalendarItemsWrapper />
      </div>
    </div>
  );
};
