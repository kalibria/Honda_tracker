import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { redirect, useLocation, useNavigate } from 'react-router-dom';

import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';

import { bookingListPath } from 'src/router/rootConstants';
import {
  hondaApi,
  useLazyGetUserQuery,
  useLazyStatusLoginQuery,
} from 'src/services/hondaApi';

import { myLocalStorage } from 'src/services/localStorage';

import { AlertForm, MyTextInput } from 'src/ui-kit/components';

import * as Yup from 'yup';
import 'src/css/App.css';

const LoginForm = () => {
  const [trigger, loginResult] = useLazyStatusLoginQuery();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [triggerUser, resultUser] = useLazyGetUserQuery();

  const location = useLocation();

  useEffect(() => {
    if (resultUser.isSuccess) {
      navigate(location.state || bookingListPath);
    }
  });

  useEffect(() => {
    const { isSuccess, isError, errorMsg } =
      myRtkQueryResultProcessor.parseQueryResult(loginResult);

    if (isSuccess) {
      setError('');
      myLocalStorage.setItem('RefreshToken', loginResult.data.RefreshToken);

      sessionStorage.setItem('AccessToken', loginResult.data.AccessToken);

      sessionStorage.setItem('IdToken', loginResult.data.IdToken);

      triggerUser(username);
    }
    if (isError) {
      setError(errorMsg);
      myRtkQueryResultProcessor.handleErrorCode(loginResult, dispatch);
    }
  }, [dispatch, navigate, loginResult, triggerUser, username]);

  useEffect(() => {
    if (resultUser.isSuccess && resultUser.data) {
      dispatch(hondaApi.util.invalidateTags(['Me']));

      redirect(bookingListPath);
    }
  }, [resultUser.isSuccess, resultUser.data, dispatch, navigate]);

  return (
    <div className="mainContainer appBackground">
      {error && <AlertForm message={error} />}

      <main className="flex flex-col justify-center items-center formWrapper">
        <div className="w-24 mb-4">
          <img
            src="https://www.nicepng.com/png/detail/138-1388174_login-account-icon.png"
            alt="logIn"
          />
          <h1 className="text-center">Sign in</h1>
        </div>
        <Formik
          initialValues={{
            login: '',
            password: '',
            rememberMe: false,
          }}
          validationSchema={Yup.object({
            login: Yup.string()
              // .max(15, 'Must be 15 characters or less')
              .required('Required'),
            password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            let password = values.password;
            let username = values.login;
            trigger({ password, username });
            setUsername(username);
            setSubmitting(false);
          }}>
          <Form className="flex flex-col space-y-3.5 widthFormItem">
            <MyTextInput
              id={'outlined-login-input'}
              label={'Login'}
              type={'login'}
              autoComplete={'current-login'}
              name={'login'}
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
                {'Sign in'}
              </Button>
            </div>
          </Form>
        </Formik>
      </main>
    </div>
  );
};

export default LoginForm;
