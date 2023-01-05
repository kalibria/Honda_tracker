import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React from 'react';
import { MyTextInput } from 'src/ui-kit/components';

export const SignUpForm = () => {
  return (
    <div className="mainContainer ">
      <div className="flex flex-col justify-center items-center formWrapper">
        <div className="w-24 mb-4">
          <img
            src="https://www.nicepng.com/png/detail/138-1388174_login-account-icon.png"
            alt="Sign-up"
          />
        </div>
        <h1 className="text-center">Sign-up</h1>
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, { setSubmitting }) => {}}>
        <Form className="flex flex-col space-y-3.5 widthFormItem">
          <MyTextInput
            id={'outlined-login-input'}
            label={'email'}
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
  );
};
