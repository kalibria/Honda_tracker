import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { Formik } from 'formik';
import React from 'react';
import {
  ResponsiveEndDatePicker,
  ResponsiveStartDatePicker,
  ResponsiveTimePickers,
  ResponsiveTimePickersEndTime,
} from 'src/createNewBooking/components/MUComponentsForCreatingBooking';

import { datesManager } from 'src/dates/datesTimeManager';
import {
  AlertForm,
  MySelect,
  MyTextInputWithBorder,
} from 'src/ui-kit/components';
import * as Yup from 'yup';

export interface InitialValues {
  driver: string;
  startDate: Dayjs;
  startTime: Dayjs;
  endDate?: Dayjs;
  endTime?: Dayjs;
  car: string[];
  description: string;
}
export interface ICreatingNewBooking {
  firstName: string;
  isLoading: boolean;
  currentDate: Dayjs;
  currentTime: Dayjs;
  availableCars: string[];
}

export const CreatingNewBooking: React.FC<ICreatingNewBooking> = ({
  firstName,
  isLoading,
  currentDate,
  currentTime,
  availableCars,
}) => {
  const curDate = datesManager.getCurrentDateTime();

  const initialValues: InitialValues = {
    driver: firstName,
    startDate: currentDate,
    startTime: currentTime,
    endDate: undefined,
    endTime: undefined,
    car: availableCars,
    description: '',
  };

  const SignupSchema = Yup.object().shape({
    startDate: Yup.date()
      .typeError('Заполните поле')
      .required('Заполните поле'),
    endDate: Yup.date()
      .typeError('Заполните поле')
      .required('Заполните поле')
      .when('startDate', (startDate) => {
        return Yup.date()
          .test(
            'is after',
            'Дата завершения поездки должна быть больше даты начала поездки',
            (val: Date | undefined) => {
              if (val) {
                return dayjs(val).isAfter(dayjs(startDate));
              } else {
                return true;
              }
            },
          )
          .typeError('Заполните поле');
      }),

    startTime: Yup.date()
      .typeError('Заполните поле')
      .required('Заполните поле'),
    endTime: Yup.date()
      .typeError('Заполните поле')
      .required('Заполните поле')
      .when('startTime', (startTime: Dayjs) => {
        return Yup.date()
          .min(
            startTime,
            'Время завершения поездки должна быть больше времени начала поездки',
          )
          .typeError('Заполните поле');
      }),
  });

  return (
    <div className={'creationRidePage'}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}>
        {(props) => {
          console.log('props', props);
          // console.log('props.errors.endTime', props.errors.endTime);
          return (
            <form onSubmit={props.handleSubmit} className={'creationRidePage'}>
              <div className={'box1'}>
                <MyTextInputWithBorder
                  label={'Инициатор поездки'}
                  name={'driver'}
                  id={'driver'}
                  value={props.values.driver}
                  disabled={true}
                  loading={isLoading}
                  onChange={props.handleChange}
                />
              </div>
              <div className={'box2 box'}>
                <ResponsiveStartDatePicker
                  name={'startDate'}
                  label={'Дата поездки'}
                  {...props}
                />
                <ResponsiveTimePickers
                  name={'startTime'}
                  label={'Время поездки'}
                  {...props}
                />
              </div>
              <div className={'box3 box'}>
                <ResponsiveEndDatePicker
                  name={'endDate'}
                  label={'Дата завершения поездки'}
                  newDate={props.values.startDate}
                  {...props}
                />

                <ResponsiveTimePickersEndTime
                  name={'endTime'}
                  label={'Время завершения поездки'}
                  newTime={curDate}
                  {...props}
                />
              </div>
              {props.errors.endDate ? (
                <AlertForm message={props.errors.endDate} />
              ) : null}
              {props.errors.endTime ? (
                <AlertForm message={props.errors.endTime} />
              ) : null}
              <div className={'box6'}>
                <MySelect
                  label={'Автомобиль'}
                  name={'car'}
                  id={'car'}
                  data={availableCars}
                />
              </div>

              <div className={'box7'}>
                <MyTextInputWithBorder
                  loading={false}
                  label={'Описание поездки'}
                  name={'description'}
                  id={'description'}
                  onChange={props.handleChange}
                />
              </div>

              <div className={'button box8'}>
                <Button variant="contained" type="submit">
                  {'Сохранить'}
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
