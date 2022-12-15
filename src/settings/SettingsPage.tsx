import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from 'src/redux/store';
import { loginPath } from 'src/router/rootConstants';
import { myLocalStorage } from 'src/services/localStorage';
import { BasicTextFields, SwitchesGroup } from 'src/settings/components';
import { carProvider } from 'src/settings/constants';

export const SettingsPage = () => {
  const isAuth = myLocalStorage.isAuth();
  const selectMyRole = useSelector((state: RootState) => state.userData.role);
  const navigate = useNavigate();

  const isCarProvider = selectMyRole.includes(carProvider);
  const { pathname } = useLocation();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate(loginPath, { state: pathname });
  //   }
  // });

  return (
    <div className={'sm:w-60 mainContainer'}>
      {isAuth && (
        <Formik
          initialValues={{
            isCreated: false,
            isChanged: false,
            textField: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            alert(values.isChanged);
            setSubmitting(false);
          }}>
          <Form className={'flex flex-col space-y-3.5 w-4/5 md:w-4/12'}>
            {isCarProvider && (
              <SwitchesGroup
                note1={'booking is created'}
                note2={'booking is changed'}
                title={'Get notifications when ...'}
                isCreatedFieldName={'isCreated'}
                isChangedFieldName={'isChanged'}
              />
            )}
            <BasicTextFields
              label={'Где оставлен автомобиль?'}
              name={'textField'}
            />
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
