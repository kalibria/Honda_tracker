import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useCheckIsLoggedIn } from 'src/auth/authenticationManager';
import { IUsersSettings } from 'src/createNewBooking/bookingTypes';
import {
  useGetMeQuery,
  useLazyGetUserQuery,
  useLazyUpdateUserDataQuery,
} from 'src/services/hondaApi';
import { BasicTextFields, SwitchesGroup } from 'src/settings/components';
import { carProvider } from 'src/settings/constants';
import { debounce } from 'lodash';

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

  const [triggerUpdate, resultAfterUpdate] = useLazyUpdateUserDataQuery();

  const debounceUpdate = debounce(async (rideCompletionText) => {
    const settings: IUsersSettings = {
      ...userResult.currentData.user.settings,
      rideCompletionText: rideCompletionText,
    };

    triggerUpdate({ username: meCurrentData?.username, settings });
  }, 1000);

  const handleOnChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    debounceUpdate(event.target.value);
  };

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
          <Form
            className={'flex flex-col space-y-3.5 formWrapper'}
            onChange={handleOnChange}>
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
          </Form>
        </Formik>
      )}
    </div>
  );
};
