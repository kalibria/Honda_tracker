import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IButtonsBar } from 'src/booking-list/components/ButtonsBar';
import { bookingListPath } from 'src/router/rootConstants';
import { BasicTextFields } from 'src/settings/components';
import * as Yup from 'yup';

export interface ICompleteRideWindow extends IButtonsBar {
  setIsOpenCompleteRideWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CompleteRideWindow = ({
  rideCompletionText,
  setIsOpenCompleteRideWindow,
}: ICompleteRideWindow) => {
  const navigate = useNavigate();

  return (
    <div className={'completeRideWindow'}>
      <Formik
        initialValues={{
          carLocation: rideCompletionText,
        }}
        validationSchema={Yup.object({
          carLocation: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setIsOpenCompleteRideWindow(false);
          navigate(bookingListPath);
        }}>
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
