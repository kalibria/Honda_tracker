import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AlertForm,
  ButtonEl,
  MyCheckbox,
  MyTextInput,
} from 'src/auth/components/loginForm/componentsForLoginForm';
import { unauthorized } from 'src/auth/constants';
import { isAuth } from 'src/redux/authSlice';
import { useLazyStatusLoginQuery } from 'src/services/hondaApi';
import { processingNetworkRequests } from 'src/auth/authenticationManager';

import * as Yup from 'yup';
import 'src/App.css';

const LoginForm = () => {
  const [trigger, result] = useLazyStatusLoginQuery();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    processingNetworkRequests.isAuthenticated(result);

    const { isSuccess, errorMsg, errorCode } =
      processingNetworkRequests.handleQueryResult(result);

    if (isSuccess) {
      dispatch(isAuth());
      setError('');
      navigate('/calendar');
    } else {
      setError(errorMsg);

      if (errorCode === unauthorized) {
        // redirect to login page, but not needed on this page
      }
    }
  }, [dispatch, navigate, result]);

  return (
    <div className="mainContainer ">
      {error && <AlertForm message={error} />}
      <main className="flex flex-col justify-center items-center ">
        <div className="w-24 mb-4">
          <img
            src="https://www.nicepng.com/png/detail/138-1388174_login-account-icon.png"
            alt="logIn"
          />
          <h1 className="text-center">Sigh in</h1>
        </div>
        <Formik
          initialValues={{
            login: '',
            password: '',
            rememberMe: false,
          }}
          validationSchema={Yup.object({
            login: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            let password = values.password;
            let username = values.login;
            trigger({ password, username });
            setSubmitting(false);
          }}>
          <Form className="flex flex-col sm:w-96 space-y-3.5">
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
            <MyCheckbox name={'rememberMe'}>Remember me</MyCheckbox>
            <ButtonEl text={'Sign in'} />
          </Form>
        </Formik>
      </main>
    </div>
  );
};

export default LoginForm;
