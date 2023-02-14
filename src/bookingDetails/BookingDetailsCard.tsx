import React from 'react';
import { IDataForBookingDetailPage } from 'src/bookingDetails/types';
import { datesManager } from 'src/dates/datesTimeManager';

export interface IBookingDetailsCard {
  dataForCard: IDataForBookingDetailPage;
  isComplete: boolean;
}

export const BookingDetailsCard = ({
  dataForCard,
  isComplete,
}: IBookingDetailsCard) => {
  console.log('data', dataForCard);

  return (
    <table>
      <caption className={'bookingHeader cellDecoration'}>
        Сведения о поездке
      </caption>
      <tbody>
        <tr>
          <td className={'cellDecoration'}>Инициатор поездки</td>
          <td className={'cellDecoration'}>{dataForCard.firstname}</td>
        </tr>
        <tr>
          <td className={'cellDecoration'}>Автомобиль</td>
          <td className={'cellDecoration'}>{dataForCard.carId}</td>
        </tr>
        {/*<tr>*/}
        {/*  <td className={'cellDecoration'}>Время начала поездки</td>*/}
        {/*  <td className={'cellDecoration'}>*/}
        {/*    {datesManager.getFormattingDateTime(*/}
        {/*      +new Date(dataForCard.startTime),*/}
        {/*    )}*/}
        {/*  </td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  <td className={'cellDecoration'}>Время завершения поездки</td>*/}
        {/*  <td className={'cellDecoration'}>*/}
        {/*    {datesManager.getFormattingDateTime(+new Date(dataForCard.endTime))}*/}
        {/*  </td>*/}
        {/*</tr>*/}
        <tr>
          <td className={'cellDecoration'}>Описание поездки</td>
          <td className={'cellDecoration'}>{dataForCard.description}</td>
        </tr>
        <tr>
          <td className={'cellDecoration'}>Поездка завершена?</td>
          <td className={'cellDecoration'}>{dataForCard.isCompleted}</td>
        </tr>
        {isComplete && (
          <tr>
            <td className={'cellDecoration'}>
              Местонахождение автомобиля по окончании поездки
            </td>
            <td className={'cellDecoration'}>{dataForCard.carLocation}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
