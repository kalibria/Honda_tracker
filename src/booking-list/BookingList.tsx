import React from 'react';
import { CalendarItems } from 'src/booking-list/CalendarItems';

export const BookingList = () => {
  return (
    <div className={'bookingPage'}>
      <div className={'bookingWrapper'}>
        <div className={'bookingHeader cellDecoration'}>Booking list</div>
        <CalendarItems />
      </div>
    </div>
  );
};
