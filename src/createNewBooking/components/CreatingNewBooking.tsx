import Button from '@mui/material/Button';
import { Dayjs } from 'dayjs';
import { Formik } from 'formik';
import React from 'react';
import MUComponentsForCreatingBooking, {
  ResponsiveTimePickers,
  ResponsiveTimePickersEndTime,
} from 'src/createNewBooking/components/MUComponentsForCreatingBooking';
import { datesManager } from 'src/dates/datesTimeManager';
import { MySelect, MyTextInputWithBorder } from 'src/ui-kit/components';

export interface InitialValues {
  driver: string;
  startDate: string;
  startTime: Dayjs;
  endDate: string;
  endTime?: Dayjs;
  car: string[];
  description: string;
}
export interface ICreatingNewBooking {
  firstName: string;
  isLoading: boolean;
  currentDate: string;
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
    endDate: '',
    endTime: undefined,
    car: availableCars,
    description: '',
  };

  return (
    <div className={'creationRidePage'}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}>
        {(props) => {
          // console.log('props.errors.startTime', props.errors.startTime);
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
                <MUComponentsForCreatingBooking
                  name={'startDate'}
                  label={'Дата поездки'}
                  onChange={props.handleChange}
                />
                <ResponsiveTimePickers
                  name={'startTime'}
                  label={'Время поездки'}
                  {...props}
                />
              </div>
              <div className={'box3 box'}>
                <MUComponentsForCreatingBooking
                  name={'endDate'}
                  label={'Дата завершения поездки'}
                  onChange={props.handleChange}
                />
                <ResponsiveTimePickersEndTime
                  name={'endTime'}
                  label={'Время завершения поездки'}
                  newTime={curDate}
                  {...props}
                />
              </div>
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
