import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from 'src/services/hondaApi';
import { myLocalStorage } from 'src/services/localStorage';
import { BasicTextFields, SwitchesGroup } from 'src/settings/components';
import { carProvider } from 'src/settings/constants';

export const SettingsPage = () => {
  const userRole = myLocalStorage.getItem('userRole');

  return (
    <main className={'sm:w-60 mainContainer'}>
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
        <Form className={'flex flex-col space-y-3.5'}>
          {userRole === carProvider ? (
            <SwitchesGroup
              note1={'booking is created'}
              note2={'booking is changed'}
              title={'Get notifications when ...'}
              isCreatedFieldName={'isCreated'}
              isChangedFieldName={'isChanged'}
            />
          ) : null}
          <BasicTextFields
            label={'Where the car was left?'}
            name={'textField'}
          />
          <Button
            className={'place-self-center'}
            variant="contained"
            type="submit"
            size={'small'}>
            {'save'}
          </Button>
        </Form>
      </Formik>
    </main>
  );
};
