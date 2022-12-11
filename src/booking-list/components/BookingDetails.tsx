import React from 'react';
import { useParams } from 'react-router-dom';
import { hondaApi, useGetBookingsIdQuery } from 'src/services/hondaApi';

export const BookingDetails = () => {
  const params = useParams();
  console.log('params', params.bookingId);

  // export const bookingIdLoader = (dispatch) => {
  //   async ({ params, request }) => {
  //     const promise = dispatch(
  //       hondaApi.endpoints.getBookingsId.initiate({params.username, params.carId, params.startTime }),
  //     );
  //     request.signal.onabort = promise.abort;
  //     const res = await promise;
  //     const {data, isError, error, isLoading, isSuccess} = res;
  //     console.log(res);
  //
  //     if(isError){
  //       const {status  =403, data} = error;
  //       throw new Response('',{
  //         status,
  //         statusText: data?.message || "Booking not found",
  //       })
  //     }
  //     return data
  //   };
  // };

  return (
    <div>
      <table>
        <caption>Booking details</caption>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
};
