import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React from 'react';
import { MySelect, MyTextInputWithBorder } from 'src/ui-kit/components';

export const CreatingNewBooking = () => {
  return (
    <div>
      <Formik
        initialValues={{
          driver: '',
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
