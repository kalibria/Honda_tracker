import { Formik } from 'formik';
import React from 'react';
import { IRTKQueryBookingResponse } from 'src/booking-list/types';
import { ButtonUI } from 'src/ui-kit/ButtonUI';

interface IEditBookingPage {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  dataForFormik: {
    firstname: string;
    carId: string;
    startTime: string;
    endTime: string;
    description: string;
    isCompleted: string;
    carLocation: string;
  };
}

export const EditBookingPage = ({
  setIsEdit,
  dataForFormik,
}: IEditBookingPage) => {
  return (
    <div className={'bookingWrapper'}>
      <div className={'bookingHeader '}>Сведения о поездке</div>

      <Formik
        initialValues={{
          firstname: dataForFormik.firstname,
          carId: dataForFormik.carId,
          startTime: dataForFormik.startTime,
          endTime: dataForFormik.endTime,
          description: dataForFormik.description,
          isCompleted: dataForFormik.isCompleted,
          carLocation: dataForFormik.carLocation,
        }}
        onSubmit={(values, formikHelpers) => {
          setIsEdit(false);
        }}
        enableReinitialize={true}>
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit} aria-readonly={true}>
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
                <label htmlFor={'startTime'}>Время начала поездки</label>
                <input
                  id={'startTime'}
                  name={'startTime'}
                  type={'datetime-local'}
                  defaultValue={props.values.startTime}
                />
              </div>

              <div className={'cellDecoration'}>
                <label htmlFor={'endTime'}>Время завершения поездки</label>
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
                <label htmlFor={'isCompleted'}>Поездка завершена?</label>
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
              <ButtonUI onClick={props.handleSubmit}>{'Сохранить'}</ButtonUI>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
