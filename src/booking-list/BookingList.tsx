import React from 'react';
import { CalendarItemsWrapper } from 'src/booking-list/CalendarItemsWrapper';

export const BookingList = () => {
  return (
    <div className={'bookingPage'}>
      <div className={'bookingWrapper'}>
        <div className={'bookingHeader cellDecoration'}>Booking list</div>
        <CalendarItemsWrapper />
      </div>
    </div>
  );
};
