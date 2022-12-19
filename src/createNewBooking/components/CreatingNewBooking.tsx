import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useGetMeQuery, useLazyGetUserQuery } from 'src/services/hondaApi';
import { MySelect, MyTextInputWithBorder } from 'src/ui-kit/components';

import InputAdornment from '@mui/material/InputAdornment';
import { Loading } from 'src/ui-kit/Loading';

export const CreatingNewBooking = () => {
  const { data, isSuccess, isError } = useGetMeQuery({});
  const [trigger, result] = useLazyGetUserQuery();
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (isSuccess) {
      trigger(data.username);
    }
  }, [data, isSuccess, trigger]);

  useEffect(() => {
    if (result.isSuccess) {
      setFirstName(result.currentData.user.firstName);
      console.log('firstName', result.currentData.user.firstName);
    }
  }, [result]);

  return (
    <div>
      <Formik
        initialValues={{
          driver: firstName,
          startDate: '',
          startMonth: '',
          startHour: '',
          startMinutes: '',
          endDate: '',
          endMonth: '',
          endHour: '',
          endMinutes: '',
          car: '',
          description: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}>
        <Form className={'creationRidePage'}>
          <div className={'box1'}>
            <MyTextInputWithBorder
              label={'Инициатор поездки'}
              name={'driver'}
              disabled={true}
              value={firstName}
              loading={result.isLoading}
            />
          </div>

          <div className={'formGroup box2'}>
            <MySelect label={'Дата'} name={'startDate'} />
            <MySelect label={'Месяц'} name={'startMonth'} />
            <p className={'label'}>Дата поездки</p>
          </div>

          <div className={'formGroup box3'}>
            <MySelect label={'Час'} name={'startHour'} />
            <MySelect label={'Минуты'} name={'startMinutes'} />
            <p className={'label'}>Время поездки</p>
          </div>

          <div className={'formGroup box4'}>
            <MySelect label={'Дата'} name={'endDate'} />
            <MySelect label={'Месяц'} name={'endMonth'} />
            <p className={'label'}>Дата завершения поездки</p>
          </div>

          <div className={'formGroup box5'}>
            <MySelect label={'Час'} name={'endHour'} />
            <MySelect label={'Минуты'} name={'endMinutes'} />
            <p className={'label'}>Время завершения поездки</p>
          </div>

          <div className={'box6'}>
            <MySelect label={'Автомобиль'} name={'car'} />
          </div>

          <div className={'box7'}>
            <MyTextInputWithBorder
              label={'Описание поездки'}
              name={'description'}
            />
          </div>

          <div className={'button box8'}>
            <Button variant="contained" type="submit">
              {'Сохранить'}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
