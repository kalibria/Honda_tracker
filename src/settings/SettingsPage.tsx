import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useCheckIsLoggedIn } from 'src/auth/authenticationManager';
import { useGetMeQuery, useLazyGetUserQuery } from 'src/services/hondaApi';
import { BasicTextFields, SwitchesGroup } from 'src/settings/components';
import { carProvider } from 'src/settings/constants';

export const SettingsPage = () => {
  const { isSuccess: meSuccess, currentData: meCurrentData } = useGetMeQuery(
    {},
  );
  const [getUserTrigger, userResult] = useLazyGetUserQuery();
  const [myRoles, setMyRoles] = useState<string[]>([]);
  const [rideCompletionText, setRideCompletionText] = useState('');

  const { isSuccess } = useCheckIsLoggedIn();

  const isCarProvider = myRoles.includes(carProvider);

  useEffect(() => {
    if (meSuccess && meCurrentData) {
      getUserTrigger(meCurrentData.username);
    }
  }, [meSuccess, meCurrentData, getUserTrigger]);

  useEffect(() => {
    if (userResult.isSuccess && userResult.currentData) {
      setMyRoles(userResult.currentData.user.roles);
      setRideCompletionText(
        userResult.currentData.user.settings.rideCompletionText,
      );
    }
  }, [userResult.isSuccess, userResult.currentData]);

  return (
    <div className={'sm:w-60 mainContainer'}>
      {isSuccess && (
        <Formik
          initialValues={{
            isCreated: false,
            isChanged: false,
            textField: rideCompletionText,
          }}
          onSubmit={(values, { setSubmitting }) => {
            alert(values.isChanged);
            setSubmitting(false);
          }}
          enableReinitialize={true}>
          <Form className={'flex flex-col space-y-3.5 formWrapper'}>
            {isCarProvider && (
              <SwitchesGroup
                note1={'booking is created'}
                note2={'booking is changed'}
                title={'Get notifications when ...'}
                isCreatedFieldName={'isCreated'}
                isChangedFieldName={'isChanged'}
              />
            )}
            <div className={'widthFormItem'}>
              <BasicTextFields
                label={'Где оставлен автомобиль?'}
                name={'textField'}
              />
            </div>
            <Button
              className={'place-self-center'}
              variant="contained"
              type="submit"
              size={'small'}>
              {'Сохранить'}
            </Button>
          </Form>
        </Formik>
      )}
    </div>
  );
};
