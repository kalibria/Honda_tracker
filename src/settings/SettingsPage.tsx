import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { useCheckIsLoggedIn } from 'src/auth/authenticationManager';
import { RootState } from 'src/redux/store';
import { BasicTextFields, SwitchesGroup } from 'src/settings/components';
import { carProvider } from 'src/settings/constants';

export const SettingsPage = () => {
  const { isSuccess } = useCheckIsLoggedIn();
  const selectMyRole = useSelector((state: RootState) => state.userData.role);

  const isCarProvider = selectMyRole.includes(carProvider);

  return (
    <div className={'sm:w-60 mainContainer'}>
      {isSuccess && (
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
