import React from 'react';
import { DateItems } from 'src/booking-list/DateItems';

export const BookingList = () => {
  return (
    <div className={'bookingPage'}>
      <div className={'bookingWrapper'}>
        <div className={'bookingHeader cellDecoration'}>Booking list</div>
        <DateItems />
        <ul>booking time</ul>
      </div>
    </div>
  );
};
