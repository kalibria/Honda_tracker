import React from 'react';

export const BookingDetails = () => {
  return (
    <div>
      <table>
        <caption>Booking details</caption>
        <tr className={'cellDecoration'}>
          <td>Инициатор поездки</td>
          <td></td>
        </tr>
        <tr className={'cellDecoration'}>
          <td>Автомобиль</td>
          <td></td>
        </tr>
        <tr className={'cellDecoration'}>
          <td>Время начала поездки</td>
          <td></td>
        </tr>
        <tr className={'cellDecoration'}>
          <td>Время завершения поездки</td>
          <td></td>
        </tr>
        <tr className={'cellDecoration'}>
          <td>Описание поездки</td>
          <td></td>
        </tr>
        <tr className={'cellDecoration'}>
          <td>Поездка завершена?</td>
          <td></td>
        </tr>
        <tr className={'cellDecoration'}>
          <td>Местонахождение автомобиля по окончании поездки</td>
          <td></td>
        </tr>
        <tr className={'cellDecoration'}>
          <td>Широта</td>
          <td></td>
        </tr>
        <tr className={'cellDecoration'}>
          <td>Долгота</td>
          <td></td>
        </tr>
      </table>
    </div>
  );
};
