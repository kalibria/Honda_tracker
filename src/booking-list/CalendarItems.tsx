import React from 'react';
import { datesManager } from 'src/booking-list/datesManager';
import { bookingItemsManager } from 'src/booking-list/BookingItemsManager';
import { useBookingRides } from 'src/booking-list/useBookingRides';

export const CalendarItems = () => {
  const requestRides = useBookingRides();

  const datesMS = datesManager.getDatesMS();

  const startEndDay = datesManager.getStartAndEndOfDays(datesMS);

  const datesWithRides = bookingItemsManager.makeOneArrayFromTwo(
    startEndDay,
    requestRides,
  );
  console.log('obj', Object.entries(datesWithRides));
  console.log(
    'uiObj',
    bookingItemsManager.calendarItemMapToUI(Object.entries(datesWithRides)),
  );

  const items = Object.entries(datesWithRides).map((info, index) => {
    return (
      <div className={'calendar'} key={index}>
        <li className={'cellDecoration'}>
          {datesManager.getFormattingDate(+info[0])}
        </li>
        <li className={'cellDecoration'}>{}</li>
      </div>
    );
  });

  return <ul>{items}</ul>;
};
