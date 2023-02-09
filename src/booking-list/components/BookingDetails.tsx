import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { datesManager } from 'src/dates/datesTimeManager';
import { Loading } from 'src/ui-kit/Loading';
import { useLazyGetBookingsIdQuery } from 'src/services/hondaApi';
import { ButtonsBar } from './ButtonsBar';

export const BookingDetails = () => {
  const params = useParams();

  const [trigger, result] = useLazyGetBookingsIdQuery();

  const idParams = params.bookingId;

  const [isComplete, setIsComplete] = useState(false);

  const [startTimeSec, setStartTimeSec] = useState('');

  const [carLocation, setCarLocation] = useState('');

  useEffect(() => {
    if (idParams) {
      const parsedParams = idParams.split('$');
      const username = parsedParams[0];
      const carId = parsedParams[1];
      const timeSec = parsedParams[2];
      setStartTimeSec(timeSec);

      trigger({ username, carId, startTime: timeSec });

      if (result.isSuccess) {
        setIsComplete(result.currentData.booking.isFinished);

        if (isComplete) {
          setCarLocation(
            result.currentData.booking.bookingOwner.settings.rideCompletionText,
          );
        }
      }
    }
  }, [idParams, result.currentData, result.isSuccess, trigger]);

  return (
    <div className={'bookingPage'}>
      {result.isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={'bookingWrapper'}>
            {result.isSuccess && (
              <table>
                <caption className={'bookingHeader cellDecoration'}>
                  Сведения о поездке
                </caption>
                <tbody>
                  <tr>
                    <td className={'cellDecoration'}>Инициатор поездки</td>
                    <td className={'cellDecoration'}>
                      {result.currentData.booking.bookingOwner.firstName}
                    </td>
                  </tr>
                  <tr>
                    <td className={'cellDecoration'}>Автомобиль</td>
                    <td className={'cellDecoration'}>
                      {result.currentData.booking.carNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className={'cellDecoration'}>Время начала поездки</td>
                    <td className={'cellDecoration'}>
                      {datesManager.getFormattingDateTime(
                        +new Date(result.currentData.booking.bookingStartTime),
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={'cellDecoration'}>
                      Время завершения поездки
                    </td>
                    <td className={'cellDecoration'}></td>
                  </tr>
                  <tr>
                    <td className={'cellDecoration'}>Описание поездки</td>
                    <td className={'cellDecoration'}>
                      {result.currentData.booking.bookingDescription}
                    </td>
                  </tr>
                  <tr>
                    <td className={'cellDecoration'}>Поездка завершена?</td>
                    <td className={'cellDecoration'}>
                      {isComplete ? 'Да' : 'Нет'}
                    </td>
                  </tr>
                  {isComplete && (
                    <tr>
                      <td className={'cellDecoration'}>
                        Местонахождение автомобиля по окончании поездки
                      </td>
                      <td className={'cellDecoration'}>{carLocation}</td>
                    </tr>
                  )}
                  {/*<tr>*/}
                  {/*  <td className={'cellDecoration'}>Широта</td>*/}
                  {/*  <td className={'cellDecoration'}></td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                  {/*  <td className={'cellDecoration'}>Долгота</td>*/}
                  {/*  <td className={'cellDecoration'}></td>*/}
                  {/*</tr>*/}
                </tbody>
              </table>
            )}
          </div>
          <ButtonsBar startTimeSec={startTimeSec} isComplete={isComplete} />
        </>
      )}
    </div>
  );
};
