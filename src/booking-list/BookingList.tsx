import React from 'react';
import { BookingInfoItems } from 'src/booking-list/BookingInfoItems';
import { DateItems } from 'src/booking-list/DateItems';

export const BookingList = () => {
  return (
    <div className={'bookingPage'}>
      <div className={'bookingWrapper'}>
        <div className={'bookingHeader cellDecoration'}>Booking list</div>
        <DateItems />
        <BookingInfoItems />
      </div>
    </div>
  );
};
