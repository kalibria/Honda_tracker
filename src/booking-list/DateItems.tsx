import React from 'react';
import { datesManager } from 'src/booking-list/datesManager';

export const DateItems = () => {
  const arrFormattingDates = datesManager.getFormattingDates();

  const dateItems = arrFormattingDates.map((date, index) => {
    return (
      <li className={'cellDecoration'} key={index}>
        {date}
      </li>
    );
  });

  return <ul>{dateItems}</ul>;
};
