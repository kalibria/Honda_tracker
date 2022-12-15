import React from 'react';
import { CalendarItemsWrapper } from 'src/booking-list/components/CalendarItemsWrapper';
import { ButtonUI } from 'src/commonComponents/ButtonUI';

export const BookingList = () => {
  const createNewRide = () => {};

  return (
    <div className={'bookingPage'}>
      <div className={'button'}>
        <ButtonUI onClick={createNewRide}>{'Создать поездку'}</ButtonUI>
      </div>
      <div className={'bookingWrapper'}>
        <div className={'bookingHeader cellDecoration'}>Booking list</div>
        <CalendarItemsWrapper />
      </div>
    </div>
  );
};
