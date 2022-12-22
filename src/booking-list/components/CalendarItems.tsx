import React from 'react';
import { Link } from 'react-router-dom';
import { IUICalendarItems } from 'src/booking-list/types';

export const CalendarItems = ({ datesRidesForUI }: IUICalendarItems) => {
  const items = datesRidesForUI.map((item, index) => {
    return (
      <div className={'calendar'} key={item.id}>
        <li className={'cellDecoration'}>{item.date}</li>
        <li className={'cellDecoration'}>
          {item.info.username ? (
            <ul>
              <li className={'fontBold'}>{item.info.username}</li>
              <li className={'fontBold'} key={item.id}>
                <Link to={`/booking-details/${item.id}`}>
                  {item.info.description}
                </Link>
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
