import React from 'react';
import { datesManager } from 'src/booking-list/datesManager';

export const BookingList = () => {
  const arrFormattingDates = datesManager.getFormattingDates();
  const datesList = arrFormattingDates.map((date, index) => {
    return (
      <li className={'cellDecoration'} key={index}>
        {date}
      </li>
    );
  });

  return (
    <div className={'bookingPage'}>
      <div className={'bookingWrapper'}>
        <div className={'bookingHeader cellDecoration'}>Booking list</div>
        <ul>{datesList}</ul>
        <ul>booking time</ul>
      </div>
    </div>
  );
};
