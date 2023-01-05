import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useLazySignUpQuery } from 'src/services/hondaApi';
import { myLocalStorage } from 'src/services/localStorage';
import { MyTextInput } from 'src/ui-kit/components';

export const SignUpForm = () => {
  const [trigger, result] = useLazySignUpQuery();

  useEffect(() => {
    if (result.isSuccess) {
      myLocalStorage.setItem('RefreshToken', result.currentData.RefreshToken);
      sessionStorage.setItem('AccessToken', result.currentData.AccessToken);
    }
  }, [result]);

  return (
    <div className="mainContainer">
      <div className="flex flex-col justify-center items-center formWrapper">
        <div className="w-24 mb-4">
          <img
            src="https://www.nicepng.com/png/detail/138-1388174_login-account-icon.png"
            alt="Sign-up"
          />
        </div>
        <h1 className="text-center">Регистрация</h1>

        <Formik
          initialValues={{
            nickname: '',
            email: '',
            password: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            trigger({
              firstName: values.nickname,
              username: values.email,
              password: values.password,
              providedCarIds: [],
              availableCarIds: ['ho-12345'],
            });

            setSubmitting(false);
          }}>
          <Form className="flex flex-col space-y-3.5 widthFormItem">
            <MyTextInput
              id={'outlined-nickname-input'}
              label={'Nickname'}
              type={'text'}
              autoComplete={'current-nickname'}
              name={'nickname'}
            />
            <MyTextInput
              id={'outlined-login-input'}
              label={'Email'}
              type={'email'}
              autoComplete={'current-login'}
              name={'email'}
            />
            <MyTextInput
              id={'outlined-password-input'}
              label={'Password'}
              type={'password'}
              autoComplete={'current-password'}
              name={'password'}
            />

            <div className={'button'}>
              <Button variant="contained" type="submit">
                {'Зарегистрироваться'}
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
