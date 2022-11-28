import React from 'react';
import { Link } from 'react-router-dom';
import { IUICalendarItems } from 'src/booking-list/types';
import { bookingDetailsPath } from 'src/router/rootConstants';

export const CalendarItems = ({ datesRidesForUI }: IUICalendarItems) => {
  const items = datesRidesForUI.map((item, index) => {
    return (
      <div className={'calendar'} key={index}>
        <li className={'cellDecoration'}>{item.date}</li>
        <li className={'cellDecoration'}>
          {item.info.username ? (
            <ul>
              <li className={'fontBold'}>{item.info.username}</li>
              <li className={'fontBold'}>
                <Link to={bookingDetailsPath}>{item.info.description}</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>{item.info.username}</li>
              <li>{item.info.description}</li>
            </ul>
          )}
        </li>
      </div>
    );
  });

  return <ul>{items}</ul>;
};
