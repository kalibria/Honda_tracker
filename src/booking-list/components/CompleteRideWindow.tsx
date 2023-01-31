import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingListPath } from 'src/router/rootConstants';
import { useGetMeQuery, useLazyGetUserQuery } from 'src/services/hondaApi';
import { BasicTextFields } from 'src/settings/components';
import * as Yup from 'yup';

export interface ICompleteRideWindow {
  setIsOpenCompleteRideWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CompleteRideWindow = ({
  setIsOpenCompleteRideWindow,
}: ICompleteRideWindow) => {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetMeQuery({});
  const [trigger, result] = useLazyGetUserQuery();
  const [carLocationResult, setCarLocationResult] = useState('');

  useEffect(() => {
    if (isSuccess) {
      trigger(data.username);
    }
  }, [data, isSuccess, trigger]);

  useEffect(() => {
    if (result.isSuccess) {
      setCarLocationResult(result.currentData.user.settings.rideCompletionText);
    }
  }, [result.currentData, result.isSuccess]);

  return (
    <div className={'completeRideWindow'}>
      <Formik
        initialValues={{
          carLocation: carLocationResult,
        }}
        validationSchema={Yup.object({
          carLocation: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setIsOpenCompleteRideWindow(false);
          navigate(bookingListPath);
        }}
        enableReinitialize={true}>
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
