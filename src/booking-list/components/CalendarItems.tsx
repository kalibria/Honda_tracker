import React from 'react';
import { Link } from 'react-router-dom';
import { IUICalendarItems } from 'src/booking-list/types';

export const CalendarItems = ({ datesRidesForUI }: IUICalendarItems) => {
  const items = datesRidesForUI.map((item, index) => {
    return (
      <ul className={'calendar'} key={item.date}>
        <li className={'cellDecoration'}>{item.date}</li>
        <ul>
          {item.info.map((el, indexEl) => {
            return (
              <li key={el.id} className={'cellDecoration'}>
                {el.username ? (
                  <ul>
                    <li className={'fontBold'}>{el.username}</li>

                    <li className={'fontBold'} key={el.id}>
                      <Link to={`/booking-details/${el.id}`}>
                        {el.description}
                      </Link>
                    </li>
                    <li>{el.time}</li>
                  </ul>
                ) : (
                  <ul>
                    <li>{el.username}</li>
                    <li>{el.description}</li>
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </ul>
    );
  });

  return <ul>{items}</ul>;
};
