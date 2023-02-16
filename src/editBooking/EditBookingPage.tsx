import dayjs from 'dayjs';
import { Formik } from 'formik';
import React from 'react';
import { IDataForBookingDetailPage } from 'src/bookingDetails/types';
import { useEditBookingMutation } from 'src/services/hondaApi';
import { ButtonUI } from 'src/ui-kit/ButtonUI';

interface IEditBookingPage {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  dataForFormik: IDataForBookingDetailPage;
  isComplete: boolean;
  username: string;
}

export const EditBookingPage = ({
  setIsEdit,
  dataForFormik,
  isComplete,
  username,
}: IEditBookingPage) => {
  const [editTrigger, resultEditTrigger] = useEditBookingMutation();

  return (
    <div className={'bookingEditWrapper'}>
      <div className={'bookingHeader '}>Сведения о поездке</div>

      <Formik
        initialValues={{
          firstname: dataForFormik.firstname,
          carId: dataForFormik.carId,
          startTime: dayjs(dataForFormik.startTime).format('YYYY-MM-DDTHH:mm'),
          endTime: dayjs(dataForFormik.endTime).format('YYYY-MM-DDTHH:mm'),
          description: dataForFormik.description,
          isCompleted: dataForFormik.isCompleted,
          carLocation: dataForFormik.carLocation,
        }}
        onSubmit={(values, formikHelpers) => {
          console.log('values', values);
          setIsEdit(false);
          editTrigger({
            username: username,
            carId: values.carId,
            startTimeSec: +new Date(dataForFormik.startTime) / 1000,
            startDateTime: +new Date(values.startTime) / 1000,
            // endDateTime: +new Date(values.endTime) / 1000,
            description: values.description,
          });
        }}
        enableReinitialize={true}>
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit} aria-readonly={true}>
              <div className={'formInputs'}>
                <div className={'formCellDecoration'}>
                  <label htmlFor={'firstname'}>Инициатор поездки</label>
                  <input
                    id={'firstname'}
                    name={'firstname'}
                    type="text"
                    defaultValue={props.values.firstname}
                    readOnly={true}
                  />
                </div>

                <div className={'formCellDecoration'}>
                  <label htmlFor={'carId'}>Автомобиль</label>
                  <input
                    id={'carId'}
                    name={'carId'}
                    type="text"
                    defaultValue={props.values.carId}
                    readOnly={true}
                  />
                </div>

                <div className={'formCellDecoration'}>
                  <label htmlFor={'startTime'}>Время начала поездки</label>
                  <input
                    id={'startTime'}
                    name={'startTime'}
                    type={'datetime-local'}
                    defaultValue={props.values.startTime}
                    onChange={props.handleChange}
                  />
                </div>
                {isComplete && (
                  <div className={'formCellDecoration'}>
                    <label htmlFor={'endTime'}>Время завершения поездки</label>
                    <input
                      id={'endTime'}
                      name={'endTime'}
                      type={'datetime-local'}
                      defaultValue={props.values.endTime}
                      onChange={props.handleChange}
                    />
                  </div>
                )}

                <div className={'formCellDecoration'}>
                  <label htmlFor={'description'}>Описание поездки</label>
                  <input
                    id={'description'}
                    name={'description'}
                    type={'text'}
                    defaultValue={props.values.description}
                    onChange={props.handleChange}
                  />
                </div>

                <div className={'formCellDecoration'}>
                  <label htmlFor={'isCompleted'}>Поездка завершена?</label>
                  <input
                    id={'isCompleted'}
                    name={'isCompleted'}
                    type={'text'}
                    defaultValue={props.values.isCompleted}
                    onChange={props.handleChange}
                  />
                </div>

                {isComplete && (
                  <div className={'formCellDecoration'}>
                    <label htmlFor={'carLocation'}>
                      Местонахождение автомобиля по окончании поездки
                    </label>
                    <input
                      id={'carLocation'}
                      name={'carLocation'}
                      type={'text'}
                      defaultValue={props.values.carLocation}
                      onChange={props.handleChange}
                    />
                  </div>
                )}
              </div>
              <div className={'editButtonsWrapper'}>
                <ButtonUI>{'Отмена'}</ButtonUI>
                <ButtonUI onClick={props.handleSubmit}>{'Сохранить'}</ButtonUI>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
