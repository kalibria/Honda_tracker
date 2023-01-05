import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React from 'react';
import { MyTextInput } from 'src/ui-kit/components';

export const SignUpForm = () => {
  return (
    <div>
      <div>
        <img
          src="https://www.nicepng.com/png/detail/138-1388174_login-account-icon.png"
          alt="Sign-up"
        />
        <h1 className="text-center">Sign-up</h1>
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, { setSubmitting }) => {}}>
        <Form>
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
              {'Войти'}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
