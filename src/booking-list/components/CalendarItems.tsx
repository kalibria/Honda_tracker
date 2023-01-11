import React from 'react';
import { Link } from 'react-router-dom';
import { IUICalendarItems } from 'src/booking-list/types';

export const CalendarItems = ({ datesRidesForUI }: IUICalendarItems) => {
  const items = datesRidesForUI.map((item, index) => {
    const prevItems = item.info.map((el, indexEl) => {
      return (
        <div className={'calendar'} key={el.id}>
          <li className={'cellDecoration'}>{item.date}</li>
          <li className={'cellDecoration'}>
            {el.username ? (
              <ul>
                <li className={'fontBold'}>{el.username}</li>
                <li className={'fontBold'} key={el.id}>
                  <Link to={`/booking-details/${el.id}`}>{el.description}</Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li>{el.username}</li>
                <li>{el.description}</li>
              </ul>
            )}
          </li>
        </div>
      );
    });
    return prevItems;
  });

  return <ul>{items}</ul>;
};
