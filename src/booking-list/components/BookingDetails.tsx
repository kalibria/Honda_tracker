import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from 'src/commonComponents/Loading';
import { useLazyGetBookingsIdQuery } from 'src/services/hondaApi';

export const BookingDetails = () => {
  const params = useParams();

  const [trigger, result] = useLazyGetBookingsIdQuery();

  const idParams = params.bookingId;

  useEffect(() => {
    if (idParams) {
      const parsedParams = idParams.split('$');
      const username = parsedParams[0];
      const carId = parsedParams[1];
      const timeSec = parsedParams[2];

      console.log('time', timeSec);

      trigger({ username, carId, timeSec });

      if (result.isSuccess) {
        console.log('result', result.currentData.booking);
      }
    }
  }, [idParams, trigger]);

  return (
    <div>
      {result.isLoading ? (
        <Loading />
      ) : (
        <>
          {result.isSuccess && (
            <table>
              <caption>Booking details</caption>
              <tbody>
                <tr className={'cellDecoration'}>
                  <td>Инициатор поездки</td>
                  <td>{result.currentData.booking.bookingOwner.firstName}</td>
                </tr>
                <tr className={'cellDecoration'}>
                  <td>Автомобиль</td>
                  <td>
                    {result.currentData.booking.bookingOwner.availableCars}
                  </td>
                </tr>
                <tr className={'cellDecoration'}>
                  <td>Время начала поездки</td>
                  <td>{result.currentData.booking.bookingStartTime}</td>
                </tr>
                <tr className={'cellDecoration'}>
                  <td>Время завершения поездки</td>
                  <td></td>
                </tr>
                <tr className={'cellDecoration'}>
                  <td>Описание поездки</td>
                  <td>{result.currentData.booking.bookingDescription}</td>
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
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};
