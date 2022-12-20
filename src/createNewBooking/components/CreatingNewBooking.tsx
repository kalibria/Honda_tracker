import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Formik, useFormik } from 'formik';
import React from 'react';
import { datesManager } from 'src/dates/datesManager';
import { MySelect, MyTextInputWithBorder } from 'src/ui-kit/components';
import { Loading } from 'src/ui-kit/Loading';

export interface ICreatingNewBooking {
  firstName: string;
  isLoading: boolean;
  currentMonth: string;
}

export const CreatingNewBooking: React.FC<ICreatingNewBooking> = ({
  firstName,
  isLoading,
  currentMonth,
}) => {
  const allMonths = datesManager.getAllMonths();

  return (
    <div className={'creationRidePage'}>
      <Formik
        initialValues={{
          driver: firstName,
          startDate: '',
          startMonth: currentMonth,
          startHour: '',
          startMinutes: '',
          endDate: '',
          endMonth: '',
          endHour: '',
          endMinutes: '',
          car: '',
          description: '',
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}>
        {(props) => (
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

            <div className={'formGroup box2'}>
              <MySelect
                label={'Месяц'}
                name={'startMonth'}
                id={'startMonth'}
                dates={allMonths}
                value={props.values.startMonth}
              />
              <MySelect label={'Дата'} name={'startDate'} id={'startDate'} />
              <p className={'label'}>Дата поездки</p>
            </div>

            <div className={'formGroup box3'}>
              <MySelect label={'Час'} name={'startHour'} id={'startHour'} />
              <MySelect
                label={'Минуты'}
                name={'startMinutes'}
                id={'startMinutes'}
              />
              <p className={'label'}>Время поездки</p>
            </div>

            <div className={'formGroup box4'}>
              <MySelect label={'Дата'} name={'endDate'} id={'endDate'} />
              <MySelect label={'Месяц'} name={'endMonth'} id={'endMonth'} />
              <p className={'label'}>Дата завершения поездки</p>
            </div>

            <div className={'formGroup box5'}>
              <MySelect label={'Час'} name={'endHour'} id={'endHour'} />
              <MySelect
                label={'Минуты'}
                name={'endMinutes'}
                id={'endMinutes'}
              />
              <p className={'label'}>Время завершения поездки</p>
            </div>

            <div className={'box6'}>
              <MySelect label={'Автомобиль'} name={'car'} id={'car'} />
            </div>

            <div className={'box7'}>
              <MyTextInputWithBorder
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
        )}
      </Formik>
    </div>
  );
};
