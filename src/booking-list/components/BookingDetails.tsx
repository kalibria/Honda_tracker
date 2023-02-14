import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { datesManager } from 'src/dates/datesTimeManager';
import { EditBookingPage } from 'src/editBooking/editBookingPage';
import { Loading } from 'src/ui-kit/Loading';
import { useLazyGetBookingsIdQuery } from 'src/services/hondaApi';
import { ButtonsBar } from './ButtonsBar';

export const BookingDetails = () => {
  const params = useParams();

  const [bookingsIdTrigger, bookingsIdResult] = useLazyGetBookingsIdQuery();

  const idParams = params.bookingId;

  const [isComplete, setIsComplete] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [startTimeSec, setStartTimeSec] = useState('');

  const [dataForFormik, setDataForFormik] = useState({
    firstname: '',
    carId: '',
    startTime: '',
    endTime: '',
    description: '',
    isCompleted: '',
    carLocation: '',
  });

  const [requestData, setRequestData] = useState({
    username: '',
    carId: '',
    startTimeSec: '',
  });

  const [carLocation, setCarLocation] = useState('');

  useEffect(() => {
    if (idParams) {
      const parsedParams = idParams.split('$');
      const username = parsedParams[0];

      const carId = parsedParams[1];
      const timeSec = parsedParams[2];
      setStartTimeSec(timeSec);

      setRequestData({
        username: username,
        carId: carId,
        startTimeSec: timeSec,
      });

      bookingsIdTrigger({ username, carId, startTime: timeSec });

      if (bookingsIdResult.isSuccess) {
        setIsComplete(bookingsIdResult.currentData.booking.isFinished);
        setCarLocation(
          bookingsIdResult.currentData.booking.carLocationAfterRideText,
        );

        setDataForFormik({
          firstname:
            bookingsIdResult.currentData.booking.bookingOwner.firstName,
          carId: bookingsIdResult.currentData.booking.carNumber,
          startTime: dayjs(
            bookingsIdResult.currentData.booking.bookingStartTime,
          ).format('YYYY-MM-DDTHH:mm'),
          endTime: dayjs(
            bookingsIdResult.currentData.booking.bookingEndTime,
          ).format('YYYY-MM-DDTHH:mm'),
          description: bookingsIdResult.currentData.booking.bookingDescription,
          isCompleted: isComplete ? 'Да' : 'Нет',
          carLocation: carLocation,
        });

        if (isComplete) {
          setCarLocation(
            bookingsIdResult.currentData.booking.bookingOwner.settings
              .rideCompletionText,
          );
        }
      }
    }
  }, [
    idParams,
    bookingsIdResult.currentData,
    bookingsIdResult.isSuccess,
    bookingsIdTrigger,
  ]);

  return (
    <div className={'bookingPage'}>
      {bookingsIdResult.isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={'bookingWrapper'}>
            {bookingsIdResult.isSuccess && !isEdit && (
              <table>
                <caption className={'bookingHeader cellDecoration'}>
                  Сведения о поездке
                </caption>
                <tbody>
                  <tr>
                    <td className={'cellDecoration'}>Инициатор поездки</td>
                    <td className={'cellDecoration'}>
                      {
                        bookingsIdResult.currentData.booking.bookingOwner
                          .firstName
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className={'cellDecoration'}>Автомобиль</td>
                    <td className={'cellDecoration'}>
                      {bookingsIdResult.currentData.booking.carNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className={'cellDecoration'}>Время начала поездки</td>
                    <td className={'cellDecoration'}>
                      {datesManager.getFormattingDateTime(
                        +new Date(
                          bookingsIdResult.currentData.booking.bookingStartTime,
                        ),
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={'cellDecoration'}>
                      Время завершения поездки
                    </td>
                    <td className={'cellDecoration'}>
                      {datesManager.getFormattingDateTime(
                        +new Date(
                          bookingsIdResult.currentData.booking.bookingEndTime,
                        ),
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={'cellDecoration'}>Описание поездки</td>
                    <td className={'cellDecoration'}>
                      {bookingsIdResult.currentData.booking.bookingDescription}
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
                </tbody>
              </table>
            )}
          </div>
          <ButtonsBar
            startTimeSec={startTimeSec}
            isComplete={isComplete}
            requestData={requestData}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </>
      )}
      {bookingsIdResult.isSuccess && isEdit && (
        <EditBookingPage setIsEdit={setIsEdit} dataForFormik={dataForFormik} />
      )}
    </div>
  );
};
