import React, { useEffect, useState } from 'react';
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
  const [startTimeUi, setStartTimeUi] = useState('');
  const [endTimeUI, setEndTimeUI] = useState('');

  useEffect(() => {
    if (dataForCard.startTime && dataForCard.endTime) {
      setStartTimeUi(
        datesManager.getFormattingDateTime(+new Date(dataForCard.startTime)),
      );

      setEndTimeUI(
        datesManager.getFormattingDateTime(+new Date(dataForCard.endTime)),
      );
    }
  }, [dataForCard.startTime, dataForCard.endTime]);

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
        <tr>
          <td className={'cellDecoration'}>Время начала поездки</td>
          <td className={'cellDecoration'}>{startTimeUi}</td>
        </tr>
        {isComplete && (
          <tr>
            <td className={'cellDecoration'}>Время завершения поездки</td>
            <td className={'cellDecoration'}>{endTimeUI}</td>
          </tr>
        )}

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
