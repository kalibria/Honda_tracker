import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingListPath } from 'src/router/rootConstants';
import {
  useGetMeQuery,
  useLazyFinishRideQuery,
  useLazyGetUserQuery,
} from 'src/services/hondaApi';
import { BasicTextFields } from 'src/settings/components';
import * as Yup from 'yup';
import { datesManager } from '../../dates/datesTimeManager';
import dayjs from 'dayjs';

export interface ICompleteRideWindow {
  startTimeSec: string;
  setIsOpenCompleteRideWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFinishRide {
  username: string;
  carId: string;
  startTimeSec: string;
}

export const CompleteRideWindow = ({
  startTimeSec,
  setIsOpenCompleteRideWindow,
}: ICompleteRideWindow) => {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetMeQuery({});
  const [triggerUser, resultUser] = useLazyGetUserQuery();
  const [carLocationResult, setCarLocationResult] = useState('');
  const [triggerFinish, resultFinish] = useLazyFinishRideQuery();

  const currentTime = dayjs(new Date().toString()).format('YYYY-MM-DDTHH:MM');

  console.log('completeT2', currentTime);

  const initParamsForFinish = {
    username: '',
    carId: '',
    startTimeSec: startTimeSec,
  };
  const [queryParams, setQueryParams] =
    useState<IFinishRide>(initParamsForFinish);

  useEffect(() => {
    if (isSuccess) {
      triggerUser(data.username);
    }
  }, [isSuccess, triggerUser]);

  useEffect(() => {
    if (resultUser.isSuccess) {
      setCarLocationResult(
        resultUser.currentData.user.settings.rideCompletionText,
      );
      setQueryParams({
        ...initParamsForFinish,
        username: resultUser.currentData.user.username,
        carId: resultUser.currentData.user.availableCars[0],
      });
    }
  }, [resultUser.isSuccess, resultUser.currentData]);

  return (
    <div className={'completeRideWindow'}>
      <Formik
        initialValues={{
          carLocation: carLocationResult,
          completeTime: currentTime,
        }}
        validationSchema={Yup.object({
          carLocation: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          triggerFinish(queryParams);
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
            <div>
              <label htmlFor={'completeTime'}>Время завершения</label>
              <input
                name={'completeTime'}
                id={'completeTime'}
                type={'datetime-local'}
                defaultValue={currentTime}
              />
            </div>
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
