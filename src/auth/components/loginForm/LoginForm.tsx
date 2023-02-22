import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { batch, useDispatch } from 'react-redux';
import { redirect, useLocation, useNavigate } from 'react-router-dom';

import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';
import {
  setCarId,
  setCurrentUsername,
  setFirstName,
  setUserRole,
} from 'src/redux/userDataSlice';
import { bookingListPath } from 'src/router/rootConstants';
import {
  useLazyGetUserQuery,
  useLazyStatusLoginQuery,
} from 'src/services/hondaApi';
// import { authenticationManager } from 'src/auth/authenticationManager';
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

  // useEffect(() => {
  //   if (resultUser.isSuccess) {
  //     batch(() => {
  //       dispatch(setCarId(resultUser.data.user.availableCars));
  //       dispatch(setFirstName(resultUser.data.user.firstName));
  //     });
  //
  //     navigate(location.state || bookingListPath);
  //   }
  // }, [dispatch, location.state, navigate, resultUser, resultUser.isSuccess]);

  useEffect(() => {
    const { isSuccess, isError, errorMsg } =
      myRtkQueryResultProcessor.parseQueryResult(loginResult);

    if (isSuccess) {
      // authenticationManager.setAuthenticated(dispatch, username);
      dispatch(setCurrentUsername(username));
      setError('');
      console.log("'refreshToken", loginResult.data.RefreshToken);
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
    if (resultUser.isSuccess && resultUser.currentData) {
      dispatch(setUserRole(resultUser.currentData.user.roles));
      redirect(bookingListPath);
    }
  }, [resultUser.isSuccess, resultUser.currentData, dispatch, navigate]);

  return (
    <div className="mainContainer ">
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
            console.log('login', values.login);
            console.log('password', values.password);
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
                {'Войти'}
              </Button>
            </div>
          </Form>
        </Formik>
      </main>
    </div>
  );
};

export default LoginForm;
