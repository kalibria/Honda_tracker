import React from 'react';
import { amountOfDays } from 'src/booking-list/constants';

export const BookingList = () => {
  const arrOfDays: number[] = [];
  arrOfDays.length = amountOfDays - 1;
  arrOfDays.fill(0);
  console.log('arrOfDays', arrOfDays);

  let formatter = new Intl.DateTimeFormat('ru', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  let currentDate = new Date();
  let currentDateMS = currentDate.getTime();

  const arrDatesMs = arrOfDays.reduce(
    (acc: number[], item, index) => {
      let currentDate = new Date(acc[index]);
      let nextDateMS = new Date().setDate(currentDate.getDate() + 1);
      acc.push(nextDateMS);

      return acc;
    },
    [currentDateMS],
  );

  console.log('arrDates', arrDatesMs);

  const formattingArrDates = arrDatesMs.map((item) => {
    return formatter.format(item);
  });

  console.log('formattingDates', formattingArrDates);

  return (
    <div>
      <div>Calendar</div>
    </div>
  );
};
