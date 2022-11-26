import React from 'react';
import { datesManager } from 'src/booking-list/datesManager';
import { bookingItemsManager } from 'src/booking-list/BookingItemsManager';
import { useBookingRides } from 'src/booking-list/useBookingRides';

export const DateItems = () => {
  const arrFormattingDates = datesManager.getFormattingAllDates(
    datesManager.getDatesMS(),
  );

  const datesMS = datesManager.getDatesMS();
  console.log('dates', datesMS);

  const requestRides = useBookingRides();
  console.log('requestRides', requestRides);

  const rides = bookingItemsManager.highlightKeys(requestRides);
  console.log('rides', rides);

  const startEndDay = datesManager.getStartAndEndOfDays(datesMS);
  console.log('startEnd', startEndDay);

  const dateItems = arrFormattingDates.map((date, index) => {
    return (
      <li className={'cellDecoration'} key={index}>
        {date}
      </li>
    );
  });

  console.log(
    'endres',
    bookingItemsManager.makeOneArrayFromTwo(startEndDay, requestRides),
  );

  return <ul>{dateItems}</ul>;
};
