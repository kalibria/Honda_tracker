import React from 'react';
import { datesManager } from 'src/booking-list/datesManager';
import { bookingItemsManager } from 'src/booking-list/BookingItemsManager';
import { useBookingRides } from 'src/booking-list/useBookingRides';

export const DateItems = () => {
  const arrFormattingDates = datesManager.getFormattingAllDates(
    datesManager.getDatesMS(),
  );
  console.log('dates', arrFormattingDates);
  const rides = useBookingRides();
  console.log('bookingRides', rides);

  const dateItems = arrFormattingDates.map((date, index) => {
    return (
      <li className={'cellDecoration'} key={index}>
        {date}
      </li>
    );
  });

  return <ul>{dateItems}</ul>;
};
