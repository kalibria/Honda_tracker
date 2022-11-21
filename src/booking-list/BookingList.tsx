import React from 'react';
import { datesManager } from 'src/booking-list/datesManager';

export const BookingList = () => {
  const arrFormattingDates = datesManager.getFormattingDates();
  const datesList = arrFormattingDates.map((date, index) => {
    return <li key={index}>{date}</li>;
  });

  return <ul>{datesList}</ul>;
};
