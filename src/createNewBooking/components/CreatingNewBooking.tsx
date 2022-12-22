import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Formik, useFormik } from 'formik';
import React, { FormEvent, useEffect } from 'react';
import { FormObserver } from 'src/createNewBooking/components/FormObserver';
import MUComponentsForCreatingBooking, {
  ResponsiveTimePickers,
} from 'src/createNewBooking/components/MUComponentsForCreatingBooking';
import { datesManager } from 'src/dates/datesTimeManager';
import { MySelect, MyTextInputWithBorder } from 'src/ui-kit/components';
import { Loading } from 'src/ui-kit/Loading';

export interface ICreatingNewBooking {
  firstName: string;
  isLoading: boolean;
  currentDate: string;
  currentTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
}

export const CreatingNewBooking: React.FC<ICreatingNewBooking> = ({
  firstName,
  isLoading,
  currentDate,
  currentTime,
  setStartTime,
}) => {
  return (
    <div className={'creationRidePage'}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          driver: firstName,
          startDate: currentDate,
          startTime: currentTime,
          endDate: '',
          endTime: '',
          car: '',
          description: '',
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}>
        {(props) => {
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
                />
                <ResponsiveTimePickers
                  name={'startTime'}
                  label={'Время поездки'}
                />
              </div>
              <div className={'box3 box'}>
                <MUComponentsForCreatingBooking
                  name={'endDate'}
                  label={'Дата завершения поездки'}
                />
                <ResponsiveTimePickers
                  name={'startTime'}
                  label={'Время завершения поездки'}
                />
              </div>
              <div className={'box6'}>
                <MySelect label={'Автомобиль'} name={'car'} id={'car'} />
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
              <FormObserver />

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
