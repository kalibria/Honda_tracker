import React from 'react';
import { datesManager } from 'src/booking-list/datesManager';

export const BookingList = () => {
  const datesList = datesManager.getFormattingDates();
  return (
    <div>
      <div>Calendar</div>
    </div>
  );
};
