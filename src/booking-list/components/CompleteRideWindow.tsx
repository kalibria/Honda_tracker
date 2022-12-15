import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React from 'react';
import { BasicTextFields } from 'src/settings/components';

export const CompleteRideWindow = () => {
  return (
    <div className={'completeRideWindow'}>
      <Formik
        initialValues={{
          carLocation: '',
        }}
        onSubmit={(values, { setSubmitting }) => {}}>
        <Form className={'completeRideForm'}>
          <BasicTextFields
            label={'Где оставлен автомобиль?'}
            name={'carLocation'}
          />

          <div className={'button'}>
            <Button
              className={'place-self-center '}
              variant="contained"
              type="submit"
              size={'small'}>
              {'Подтвердить'}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
