import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CalendarItemsWrapper } from 'src/booking-list/components/CalendarItemsWrapper';
import { driverRole } from 'src/booking-list/constants';
import { ButtonUI } from 'src/commonComponents/ButtonUI';
import { RootState } from 'src/redux/store';
import { creatingNewBooking } from 'src/router/rootConstants';

export const BookingList = () => {
  const selectUserRole = useSelector((state: RootState) => state.userData.role);

  const isDriverRole = selectUserRole.includes(driverRole);
  const createNewRide = () => {};

  return (
    <div className={'bookingPage'}>
      {isDriverRole && (
        <div className={'button'}>
          <Link to={creatingNewBooking}>
            <ButtonUI onClick={createNewRide}>{'Создать поездку'}</ButtonUI>
          </Link>
        </div>
      )}
      <div className={'bookingWrapper'}>
        <div className={'bookingHeader cellDecoration'}>Список поездок</div>
        <CalendarItemsWrapper />
      </div>
    </div>
  );
};
