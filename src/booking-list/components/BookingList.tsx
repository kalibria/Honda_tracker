import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarItemsWrapper } from 'src/booking-list/components/CalendarItemsWrapper';
import { creatingNewBooking } from 'src/router/rootConstants';
import { useQueryUserInfo } from 'src/services/useQueryUserInfo';
import { ButtonUI } from 'src/ui-kit/ButtonUI';
import { Roles } from 'src/user/types';

export const BookingList = () => {
  const { resultUserInfo } = useQueryUserInfo();
  const userRoles = resultUserInfo.roles;

  const isDriverRole = userRoles.includes(Roles.DRIVER);

  return (
    <div className={'bookingPage'}>
      {isDriverRole && (
        <div className={'button'}>
          <Link to={creatingNewBooking}>
            <ButtonUI>{'Создать поездку'}</ButtonUI>
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
