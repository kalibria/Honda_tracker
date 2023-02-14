import dayjs from 'dayjs';
import { Formik } from 'formik';
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
  const [initStartTimeForFormik, setInitStartTimeForFormik] = useState('');
  const [endTime, setEndTime] = useState('');
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

      trigger({ username, carId, startTime: timeSec });

      if (result.isSuccess) {
        setIsComplete(result.currentData.booking.isFinished);
        setCarLocation(result.currentData.booking.carLocationAfterRideText);

        setInitStartTimeForFormik(
          dayjs(result.currentData.booking.bookingStartTime).format(
            'YYYY-MM-DDTHH:mm',
          ),
        );

        setEndTime(
          dayjs(result.currentData.booking.bookingEndTime).format(
            'YYYY-MM-DDTHH:mm',
          ),
        );

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
            <div className={'bookingHeader '}>Сведения о поездке</div>
            {result.isSuccess && (
              <Formik
                initialValues={{
                  firstname: result.currentData.booking.bookingOwner.firstName,
                  carId: result.currentData.booking.carNumber,
                  startTime: initStartTimeForFormik,
                  endTime: endTime,
                  description: result.currentData.booking.bookingDescription,
                  isCompleted: isComplete ? 'Да' : 'Нет',
                  carLocation: carLocation,
                }}
                onSubmit={(values, formikHelpers) => {}}
                enableReinitialize={true}>
                {(props) => {
                  return (
                    <form onSubmit={props.handleSubmit}>
                      <div className={'cellDecoration'}>
                        <label htmlFor={'firstname'}>Инициатор поездки</label>
                        <input
                          id={'firstname'}
                          name={'firstname'}
                          type="text"
                          defaultValue={props.values.firstname}
                          readOnly={true}
                        />
                      </div>

                      <div className={'cellDecoration'}>
                        <label htmlFor={'carId'}>Автомобиль</label>
                        <input
                          id={'carId'}
                          name={'carId'}
                          type="text"
                          defaultValue={props.values.carId}
                          readOnly={true}
                        />
                      </div>

                      <div className={'cellDecoration'}>
                        <label htmlFor={'startTime'}>
                          Время начала поездки
                        </label>
                        <input
                          id={'startTime'}
                          name={'startTime'}
                          type={'datetime-local'}
                          defaultValue={props.values.startTime}
                        />
                      </div>

                      <div className={'cellDecoration'}>
                        <label htmlFor={'endTime'}>
                          Время завершения поездки
                        </label>
                        <input
                          id={'endTime'}
                          name={'endTime'}
                          type={'datetime-local'}
                          defaultValue={props.values.endTime}
                        />
                      </div>

                      <div className={'cellDecoration'}>
                        <label htmlFor={'description'}>Описание поездки</label>
                        <input
                          id={'description'}
                          name={'description'}
                          type={'text'}
                          defaultValue={props.values.description}
                        />
                      </div>

                      <div className={'cellDecoration'}>
                        <label htmlFor={'isCompleted'}>
                          Поездка завершена?
                        </label>
                        <input
                          id={'isCompleted'}
                          name={'isCompleted'}
                          type={'text'}
                          defaultValue={props.values.isCompleted}
                        />
                      </div>

                      <div className={'cellDecoration'}>
                        <label htmlFor={'carLocation'}>
                          Местонахождение автомобиля по окончании поездки
                        </label>
                        <input
                          id={'carLocation'}
                          name={'carLocation'}
                          type={'text'}
                          defaultValue={props.values.carLocation}
                        />
                      </div>
                    </form>
                  );
                }}
                {/*<table>*/}
                {/*  <caption className={'bookingHeader cellDecoration'}>*/}
                {/*    Сведения о поездке*/}
                {/*  </caption>*/}
                {/*  <tbody>*/}
                {/*    <tr>*/}
                {/*      <td className={'cellDecoration'}>Инициатор поездки</td>*/}
                {/*      <td className={'cellDecoration'}>*/}
                {/*        {result.currentData.booking.bookingOwner.firstName}*/}
                {/*      </td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*      <td className={'cellDecoration'}>Автомобиль</td>*/}
                {/*      <td className={'cellDecoration'}>*/}
                {/*        {result.currentData.booking.carNumber}*/}
                {/*      </td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*      <td className={'cellDecoration'}>Время начала поездки</td>*/}
                {/*      <td className={'cellDecoration'}>*/}
                {/*        {datesManager.getFormattingDateTime(*/}
                {/*          +new Date(*/}
                {/*            result.currentData.booking.bookingStartTime,*/}
                {/*          ),*/}
                {/*        )}*/}
                {/*      </td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*      <td className={'cellDecoration'}>*/}
                {/*        Время завершения поездки*/}
                {/*      </td>*/}
                {/*      <td className={'cellDecoration'}>{endTime}</td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*      <td className={'cellDecoration'}>Описание поездки</td>*/}
                {/*      <td className={'cellDecoration'}>*/}
                {/*        {result.currentData.booking.bookingDescription}*/}
                {/*      </td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*      <td className={'cellDecoration'}>Поездка завершена?</td>*/}
                {/*      <td className={'cellDecoration'}>*/}
                {/*        {isComplete ? 'Да' : 'Нет'}*/}
                {/*      </td>*/}
                {/*    </tr>*/}
                {/*    {isComplete && (*/}
                {/*      <tr>*/}
                {/*        <td className={'cellDecoration'}>*/}
                {/*          Местонахождение автомобиля по окончании поездки*/}
                {/*        </td>*/}
                {/*        <td className={'cellDecoration'}>{carLocation}</td>*/}
                {/*      </tr>*/}
                {/*    )}*/}
                {/*    /!*<tr>*!/*/}
                {/*    /!*  <td className={'cellDecoration'}>Широта</td>*!/*/}
                {/*    /!*  <td className={'cellDecoration'}></td>*!/*/}
                {/*    /!*</tr>*!/*/}
                {/*    /!*<tr>*!/*/}
                {/*    /!*  <td className={'cellDecoration'}>Долгота</td>*!/*/}
                {/*    /!*  <td className={'cellDecoration'}></td>*!/*/}
                {/*    /!*</tr>*!/*/}
                {/*  </tbody>*/}
                {/*</table>*/}
              </Formik>
            )}
          </div>
          <ButtonsBar
            startTimeSec={startTimeSec}
            isComplete={isComplete}
            requestData={requestData}
          />
        </>
      )}
    </div>
  );
};
