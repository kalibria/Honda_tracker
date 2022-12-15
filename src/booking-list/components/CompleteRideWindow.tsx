import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React from 'react';
import { IButtonsBar } from 'src/booking-list/components/ButtonsBar';
import { BasicTextFields } from 'src/settings/components';

export interface ICompleteRideWindow extends IButtonsBar {}

export const CompleteRideWindow = ({
  rideCompletionText,
}: ICompleteRideWindow) => {
  return (
    <div className={'completeRideWindow'}>
      <Formik
        initialValues={{
          carLocation: rideCompletionText,
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
